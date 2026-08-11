import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../config/config";

const DESKTOP_TOOLBAR =
  "undo redo | blocks | image codesample | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help";

const MOBILE_TOOLBAR =
  "undo redo | bold italic | bullist numlist | link image codesample | removeformat";

function getEditorHeight() {
  if (typeof window === "undefined") return 500;
  return window.matchMedia("(max-width: 767px)").matches
    ? Math.min(window.innerHeight * 0.55, 420)
    : 700;
}

function RTE({ label, control, defaultValues = "", name, onEditorInit, rules }) {
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
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className="space-y-1.5 w-full">
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
                  "codesample",
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
                codesample_global_prismjs: true,
                codesample_languages: [
                  { text: "HTML/XML", value: "markup" },
                  { text: "JavaScript", value: "javascript" },
                  { text: "TypeScript", value: "typescript" },
                  { text: "JSX / TSX", value: "jsx" },
                  { text: "CSS", value: "css" },
                  { text: "Python", value: "python" },
                  { text: "Bash / Shell", value: "bash" },
                  { text: "JSON", value: "json" },
                  { text: "SQL", value: "sql" },
                  { text: "Go", value: "go" },
                  { text: "Rust", value: "rust" },
                  { text: "Java", value: "java" },
                  { text: "C / C++", value: "cpp" },
                  { text: "Markdown", value: "markdown" },
                ],
                content_style: `
                  body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }
                  pre[class*="language-"] {
                    background: #0d1117;
                    color: #e6edf3;
                    border-radius: 8px;
                    padding: 16px;
                    overflow-x: auto;
                    font-size: 13px;
                    line-height: 1.6;
                    margin: 1em 0;
                  }
                  code[class*="language-"] {
                    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                    background: transparent;
                    color: inherit;
                  }
                `,
              }}
              onEditorChange={onChange}
            />
            {error && (
              <p className="text-sm text-danger font-mono">
                {error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}

export default RTE;
