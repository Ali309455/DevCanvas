import React, { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import dbservice from "../../appwrite/dbconfig";
import { useForm } from "react-hook-form";
import slugTransform from "../../utils/slugTransform";
import AuthorAISidebar from "../Sidebar/AuthorAISidebar";
import aiService from "../../appwrite/ai";
import { AIResultModal } from "../index";
import { clearPostsstore } from "../../Store/postSlice";

import PostHeader from "./PostHeader";
import EditorSection from "./EditorSection";
import PublishPanel from "./PublishPanel";

function PostForm({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, watch, setValue, control, getValues, reset, formState: { errors, isSubmitting } } =
    useForm({
      defaultValues: {
        title: "",
        content: "",
        status: "draft",
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
  const savingRef = useRef(false);
  const pendingValuesRef = useRef(null);
  const isInitializingRef = useRef(false);
  const autoSaveTimerRef = useRef(null);
  const saveFnRef = useRef(null);
  const isSubmittingRef = useRef(false);

  // AI Author Experience States
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("continue"); // "continue" | "grammar" | "titles"
  const [modalData, setModalData] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [originalContent, setOriginalContent] = useState("");
  const [isGrammarSelection, setIsGrammarSelection] = useState(false);

  const currentStatus = watch("status") || "draft";

  const prepareDraftPayload = (currentFormValues, isNew = true) => {
    // const currentImg = getValues("featuredImage");
    // const activeImage = (typeof currentImg === "string" && currentImg) 
    //   ? currentImg 
    //   : (post?.featuredImage || "none");

    return {
      title: currentFormValues.title,
      slug: currentFormValues.slug,
      content: currentFormValues.content,
      category: currentFormValues.category,
      status: isNew ? "draft" : (currentFormValues.status || "draft"),
      authorId: userData?.$id,
      publishedDate: isNew
        ? new Date().toISOString().slice(0, 10)
        : (currentFormValues.publishedDate || new Date().toISOString().slice(0, 10)),
      authorName: currentFormValues.authorName || userData?.name,
      featuredImage: post?.featuredImage || "none",
    };
  };

  const cancelPendingAutoSave = useCallback(() => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }
    pendingValuesRef.current = null;
  }, []);

  // Stable save function definition that updates ref on every render to prevent stale closures
  saveFnRef.current = async (currentValues) => {
    if (savingRef.current || isSubmittingRef.current) {
      pendingValuesRef.current = currentValues;
      return;
    }
    savingRef.current = true;
    try {
      const currentSlug = getValues("slug");
      const existingId = post?.$id || getValues("$id");

      if (existingId) {
        const payload = prepareDraftPayload(currentValues, false);
        const result = await dbservice.updatePost(existingId, payload);
        if (result) {
          if (result.featuredImage) {
            setValue("featuredImage", result.featuredImage);
          }
          const newSlug = getValues("slug");
          if (newSlug && !window.location.pathname.endsWith(`/edit-post/${newSlug}`)) {
            window.history.replaceState(null, "", `/edit-post/${newSlug}`);
          }
          setAutoSaveStatus("Saved");
        } else {
          setAutoSaveStatus("Failed");
        }
      } else if (currentValues.title.trim() !== "" && currentSlug) {
        const payload = prepareDraftPayload(currentValues);
        const result = await dbservice.createPost(payload);

        if (result) {
          setValue("$id", result.$id);
          if (result.featuredImage) {
            setValue("featuredImage", result.featuredImage);
          }
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
    } finally {
      savingRef.current = false;
      if (pendingValuesRef.current && !isSubmittingRef.current) {
        const next = pendingValuesRef.current;
        pendingValuesRef.current = null;
        saveFnRef.current(next);
      }
    }
  };

  // Debounced auto-save trigger function
  const debouncedAutoSave = useCallback((currentValues) => {
    if (isSubmittingRef.current) return;
    setAutoSaveStatus("Saving...");
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    autoSaveTimerRef.current = setTimeout(() => {
      if (!isSubmittingRef.current) {
        saveFnRef.current(currentValues);
      }
    }, 2000);
  }, []);

  useEffect(() => {
    if (post?.$id) {
      isInitializingRef.current = true;
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
      requestAnimationFrame(() => {
        isInitializingRef.current = false;
      });
    }
  }, [post, reset]);

  const submit = async (data) => {
    isSubmittingRef.current = true;
    cancelPendingAutoSave();
    
    const existingId = post?.$id || getValues("$id");

    const pickedImage =
      data.featuredImage &&
      typeof data.featuredImage === "object" &&
      data.featuredImage.length > 0 &&
      data.featuredImage[0] instanceof File
        ? data.featuredImage[0]
        : null;

    try {
      if (existingId) {
        const targetId = existingId;
        const file = pickedImage ? await dbservice.uploadFile(pickedImage) : null;
        if (file && post?.featuredImage && post.featuredImage !== "none") {
          await dbservice.deleteFile(post.featuredImage);
        }
        
        const imageId = file ? file.$id : (typeof data.featuredImage === "string" ? data.featuredImage : (post?.featuredImage || "none"));

        const result = await dbservice.updatePost(targetId, {
          ...data,
          featuredImage: imageId,
        });
        if (result) {
          dispatch(clearPostsstore());
          const targetSlug = result?.slug || data.slug;
          navigate(targetSlug ? `/post/${targetSlug}` : "/drafts");
        }
      } else {
        const file = pickedImage
          ? await dbservice.uploadFile(pickedImage)
          : null;
        const imageId = file ? file.$id : "none";

        const result = await dbservice.createPost({
          ...data,
          featuredImage: imageId,
        });
        if (result) {
          dispatch(clearPostsstore());
          navigate(result.slug ? `/post/${result.slug}` : "/drafts");
        }
      }
    } catch (error) {
      console.error("Manual submit error:", error);
      isSubmittingRef.current = false;
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (isInitializingRef.current) return;
      if (name === "title") {
        setValue("slug", slugTransform(value.title));
      }
      // Trigger auto-save if any of the core creative fields are modified
      if (["title", "slug", "content", "category", "status", "authorName", "publishedDate"].includes(name)) {
        setAutoSaveStatus("Not Saved"); // Instantly show there are unsaved changes
        debouncedAutoSave(getValues());
      }
    });

    return () => {
      subscription.unsubscribe();
      cancelPendingAutoSave();
    };
  }, [watch, setValue, slugTransform, debouncedAutoSave, getValues, cancelPendingAutoSave]);

  const triggerSubmitWithStatus = useCallback((targetStatus) => {
    return async () => {
      isSubmittingRef.current = true;
      cancelPendingAutoSave();

      setValue("status", targetStatus);
      if (targetStatus === "published") {
        setValue("publishedDate", new Date().toISOString().slice(0, 10));
      }

      // Defer validation and submission to the next tick to ensure React Hook Form
      // has fully registered the updated validation rules based on the new status.
      setTimeout(() => {
        handleSubmit(submit, (errs) => {
          isSubmittingRef.current = false;
          console.log("Validation errors occurred:", errs);
        })();
      }, 50);
    };
  }, [setValue, handleSubmit, submit, cancelPendingAutoSave]);

  const handlePublish = useMemo(() => triggerSubmitWithStatus("published"), [triggerSubmitWithStatus]);
  const handleSaveDraft = useMemo(() => triggerSubmitWithStatus("draft"), [triggerSubmitWithStatus]);
  const handleRevertToDraft = useMemo(() => triggerSubmitWithStatus("draft"), [triggerSubmitWithStatus]);

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
        onSubmit={handleSubmit(submit, (errs) => { isSubmittingRef.current = false; })}
        className="w-full mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10 py-8 md:py-12"
      >
        <section className="flex flex-col w-full lg:flex-1 min-w-0 gap-6">
          <PostHeader register={register} setValue={setValue} slugTransform={slugTransform} errors={errors} />
          <EditorSection
            control={control}
            getValues={getValues}
            rules={{ required: currentStatus === "published" ? "Content is required to publish" : false }}
            onEditorInit={(editor) => {
              editorRef.current = editor;
            }}
          />
        </section>
        <aside className="flex flex-col w-full lg:w-80 xl:w-96 2xl:w-[26rem] lg:shrink-0 gap-5 order-first lg:order-none lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100dvh-4rem)] lg:overflow-y-auto">
          <PublishPanel
            register={register}
            post={post}
            autoSaveStatus={autoSaveStatus}
            status={currentStatus}
            errors={errors}
            isSubmitting={isSubmitting}
            onPublish={handlePublish}
            onSaveDraft={handleSaveDraft}
            onRevertToDraft={handleRevertToDraft}
          />
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
