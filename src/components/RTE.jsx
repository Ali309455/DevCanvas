import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../config/config";

const DESKTOP_TOOLBAR =
  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help";

const MOBILE_TOOLBAR =
  "undo redo | bold italic | bullist numlist | link image | removeformat";

function getEditorHeight() {
  if (typeof window === "undefined") return 500;
  return window.matchMedia("(max-width: 767px)").matches
    ? Math.min(window.innerHeight * 0.55, 420)
    : 700;
}

function RTE({ label, control, defaultValues = "", name, onEditorInit }) {
  const isNarrow =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-auto">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={name}>
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={config.tinymceApiKey}
            value={value || defaultValues}
            onInit={(evt, editor) => {
              if (onEditorInit) onEditorInit(editor);
            }}
            init={{
              initialValue: defaultValues,
              height: getEditorHeight(),
              menubar: !isNarrow,
              toolbar_mode: "sliding",
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar: isNarrow ? MOBILE_TOOLBAR : DESKTOP_TOOLBAR,
              mobile: {
                menubar: false,
                toolbar_mode: "sliding",
                toolbar: MOBILE_TOOLBAR,
              },
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
