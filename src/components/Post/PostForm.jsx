import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dbservice from "../../appwrite/dbconfig";
import { useForm } from "react-hook-form";
import slugTransform from "../../utils/slugTransform";
import AuthorAISidebar from "../Sidebar/AuthorAISidebar";
import aiService from "../../appwrite/ai";
import { AIResultModal } from "../index";

import PostHeader from "./PostHeader";
import EditorSection from "./EditorSection";
import PublishPanel from "./PublishPanel";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit,handleCollateral, watch, setValue, control, getValues, reset } =
    useForm({
      defaultValues: {
        title: "",
        content: "",
        status: "active",
        category: "Other",
        authorName: "",
        authorId: userData?.$id || "",
        publishedDate: new Date().toISOString().slice(0, 10),
        featuredImage: "",
        slug: "",
      },
    });
  
  const [autoSaveStatus, setAutoSaveStatus] = useState("Saved"); // "Not Saved" | "Saving..." | "Saved" | "Failed"
  
  const editorRef = useRef(null);

  // AI Author Experience States
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("continue"); // "continue" | "grammar" | "titles"
  const [modalData, setModalData] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [originalContent, setOriginalContent] = useState("");
  const [isGrammarSelection, setIsGrammarSelection] = useState(false);

  const watchedFields = watch(["title", "slug", "content", "category"]);

  const prepareDraftPayload = (currentFormValues) => {
    return {
      title: currentFormValues.title,
      slug: currentFormValues.slug,
      content: currentFormValues.content,
      category: currentFormValues.category,
      status: "draft", // Force background saves to always remain drafts
      authorId: userData?.$id,
      publishedDate: new Date().toISOString().slice(0, 10),
      authorName: currentFormValues.authorName || userData?.name,
      featuredImage: currentFormValues.featuredImage? currentFormValues.featuredImage : "none",
    };
  };

  // Debounced auto-save function
  const debouncedAutoSave = useCallback(
    (() => {
      let timer;
      return (currentValues) => {
        setAutoSaveStatus("Saving...");
        clearTimeout(timer);

        timer = setTimeout(async () => {
          try {
            const currentSlug = getValues("slug");
            const isAlreadyCreated = post?.$id || getValues("$id_initialized");

            // STRATEGY A: The post already exists in Appwrite. Run an UPDATE.
            if (isAlreadyCreated) {
              const targetId = post?.$id || getValues("$id");
              const payload = prepareDraftPayload(currentValues);

              const result = await dbservice.updatePost(targetId, payload);
              if (result) setAutoSaveStatus("Saved");
              else setAutoSaveStatus("Failed");

            }
            // STRATEGY B: Brand new post. Create the document.
            else if (currentValues.title.trim() !== "" && currentSlug) {
              const payload = prepareDraftPayload(currentValues);

              const result = await dbservice.createPost({
                ...payload,
                userId: userData.$id,
              });

              if (result) {
                // CRUCIAL: Save the new Appwrite document ID and flip the flag
                setValue("$id", result.$id);
                setValue("$id_initialized", true);

                // Silently update the browser URL bar so refreshing keeps them in editing mode
                window.history.replaceState(null, "", `/edit-post/${currentSlug}`);

                setAutoSaveStatus("Saved");
              } else {
                setAutoSaveStatus("Failed");
              }
            } else {
              setAutoSaveStatus("Saved");
            }
          } catch (error) {
            console.error("Auto-save error:", error);
            setAutoSaveStatus("Failed");
          }
        }, 2000);
      };
    })(),
    [post, userData, setValue, getValues]
  );

  useEffect(() => {
    if (post?.$id) {
      reset({
        title: post.title,
        content: post.content,
        status: post.status,
        category: post.category,
        authorName: post.authorName,
        authorId: post.authorId,
        publishedDate: post.publishedDate
          ? post.publishedDate.split("T")[0]
          : "",
        featuredImage: post.featuredImage,
        slug: post.slug,
      });
    }
  }, [post, reset]);

  const submit = async (data) => {
    const isAlreadyCreated = post?.$id || getValues("$id_initialized");

    if (isAlreadyCreated) {
      const targetId = post?.$id || getValues("$id");
      const file = data.image && data.image[0]
        ? await dbservice.uploadFile(data.image[0])
        : null;
      if (file && post?.featuredImage && post.featuredImage !== "none") {
        await dbservice.deleteFile(post.featuredImage);
      }
      const result = await dbservice.updatePost(targetId, {
        ...data,
        featuredImage: file ? file.$id : (post?.featuredImage || "none"),
      });
      if (result) {
        navigate(`/post/${data.slug}`);
      }
    } else {
      const file = data.image && data.image[0]
        ? await dbservice.uploadFile(data.image[0])
        : null;
      if (file) {
        data.featuredImage = file.$id;
      } else {
        data.featuredImage = "none";
      }
      const result = await dbservice.createPost({
        ...data,
        userId: userData.$id,
      });
      if (result) {
        navigate(`/post/${result.slug}`);
      }
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title));
      }
      // Trigger auto-save if any of the core creative fields are modified
      if (["title", "slug", "content", "category"].includes(name)) {
        setAutoSaveStatus("Not Saved"); // Instantly show there are unsaved changes
        debouncedAutoSave(getValues());
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform, debouncedAutoSave, getValues]);

  // AI Author Experience Trigger Action Handler
  const handleTriggerAuthorAIAction = useCallback(async (actionType) => {
    const editor = editorRef.current;
    const currentTitle = getValues("title");
    const currentContent = editor ? editor.getContent() : getValues("content");

    setModalType(actionType);
    setModalOpen(true);
    setAiLoading(true);
    setAiError(null);
    setModalData(null);

    try {
      let res;
      if (actionType === "continue") {
        res = await aiService.continueWriting(currentTitle, currentContent);
      } else if (actionType === "grammar") {
        const selectedText = editor ? editor.selection.getContent({ format: "text" }) : "";
        const selectedHtml = editor ? editor.selection.getContent({ format: "html" }) : "";
        const hasSelection = !!selectedText.trim();
        setIsGrammarSelection(hasSelection);
        
        const contentToSend = hasSelection ? selectedHtml : currentContent;
        // Store original text for comparison
        setOriginalContent(hasSelection ? selectedText : (editor ? editor.getContent({ format: "text" }) : currentContent));
        
        res = await aiService.fixGrammar(contentToSend);
      } else if (actionType === "titles") {
        res = await aiService.suggestTitles(currentContent);
      }

      if (res.error) {
        setAiError(res.error);
      } else {
        setModalData(res.data);
      }
    } catch (err) {
      setAiError(err.message || "An unexpected error occurred.");
    } finally {
      setAiLoading(false);
    }
  }, [getValues]);

  // AI Author Experience Regenerate Action Handler
  const handleAIRegenerate = useCallback(() => {
    handleTriggerAuthorAIAction(modalType);
  }, [handleTriggerAuthorAIAction, modalType]);

  // AI Author Experience Modal Action Confirmer Handler
  const handleAIModalAction = useCallback((actionName, payload) => {
    const editor = editorRef.current;
    
    if (actionName === "useTitle") {
      setValue("title", payload, { shouldDirty: true });
      setValue("slug", slugTransform(payload), { shouldDirty: true });
      setModalOpen(false);
    } else if (actionName === "insertBelow") {
      if (editor) {
        editor.focus();
        
        let formattedContinuation = payload;
        if (typeof payload === "string" && !payload.trim().startsWith("<")) {
          formattedContinuation = payload
            .split(/\n\n+/)
            .map(para => `<p>${para.trim().replace(/\n/g, "<br />")}</p>`)
            .join("");
        }

        editor.insertContent(formattedContinuation);
        setValue("content", editor.getContent(), { shouldDirty: true });
      }
      setModalOpen(false);
    } else if (actionName === "replace") {
      if (editor) {
        editor.focus();
        
        let formattedReplacement = payload;
        if (typeof payload === "string" && modalType !== "grammar" && !payload.trim().startsWith("<")) {
          formattedReplacement = payload
            .split(/\n\n+/)
            .map(para => `<p>${para.trim().replace(/\n/g, "<br />")}</p>`)
            .join("");
        }

        if (modalType === "grammar" && isGrammarSelection) {
          editor.selection.setContent(formattedReplacement);
        } else if (modalType === "continue") {
          editor.selection.setContent(formattedReplacement);
        } else {
          editor.setContent(formattedReplacement);
        }
        setValue("content", editor.getContent(), { shouldDirty: true });
      }
      setModalOpen(false);
    }
  }, [setValue, modalType, isGrammarSelection]);

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10 py-8 md:py-12"
      >
        <section className="flex flex-col w-full lg:flex-1 min-w-0 gap-6">
          <PostHeader register={register} setValue={setValue} slugTransform={slugTransform} />
          <EditorSection
            control={control}
            getValues={getValues}
            onEditorInit={(editor) => {
              editorRef.current = editor;
            }}
          />
        </section>
        <aside className="flex flex-col w-full lg:w-80 xl:w-96 2xl:w-[26rem] lg:shrink-0 gap-5 order-first lg:order-none lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100dvh-4rem)] lg:overflow-y-auto">
          <PublishPanel register={register} post={post} autoSaveStatus={autoSaveStatus} />
          <AuthorAISidebar
            onTriggerAction={handleTriggerAuthorAIAction}
            loading={aiLoading}
            activeAction={aiLoading ? modalType : null}
          />
        </aside>
      </form>

      <AIResultModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalType}
        data={modalData}
        originalContent={originalContent}
        loading={aiLoading}
        error={aiError}
        isGrammarSelection={isGrammarSelection}
        onAction={handleAIModalAction}
        onRegenerate={handleAIRegenerate}
      />
    </div>
  );
}

export default PostForm;