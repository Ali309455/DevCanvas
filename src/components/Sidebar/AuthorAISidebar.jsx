import React from "react";
import { Button } from "../index";

export default function AuthorAISidebar({ onTriggerAction, loading, activeAction }) {
  return (
    <div className="w-full max-w-full min-w-0 p-4 sm:p-5 lg:p-6 border-2 border-border bg-surface flex flex-col gap-4 lg:gap-6 rounded-[var(--radius-card)] shadow-brutal text-primary-text">
      <h3 className="text-sm font-bold tracking-widest text-primary-text uppercase font-heading flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-primary-accent inline-block animate-pulse shrink-0"></span>
        Author AI Tools
      </h3>

      <div className="flex flex-col gap-3 w-full min-w-0">
        <Button
          variant="secondary"
          size="medium"
          onClick={() => onTriggerAction("continue")}
          disabled={loading}
          className="w-full"
        >
          {loading && activeAction === "continue" ? "Thinking..." : "Continue Writing"}
        </Button>

        <Button
          variant="outline"
          size="medium"
          onClick={() => onTriggerAction("grammar")}
          disabled={loading}
          className="w-full"
        >
          {loading && activeAction === "grammar" ? "Thinking..." : "Fix Grammar"}
        </Button>

        <Button
          variant="outline"
          size="medium"
          onClick={() => onTriggerAction("titles")}
          disabled={loading}
          className="w-full"
        >
          {loading && activeAction === "titles" ? "Thinking..." : "Suggest Title"}
        </Button>
      </div>

      <div className="border-t-2 border-border pt-4 w-full min-w-0">
        <h4 className="text-xs font-bold text-secondary-text uppercase tracking-widest mb-2 font-mono">
          AI Suggestions
        </h4>
        <div className="p-3 bg-background border border-dashed border-border text-xs text-secondary-text font-mono rounded-[var(--radius-card)] break-words">
          Select a block of text or click a tool above to generate AI suggestions for your draft.
        </div>
      </div>
    </div>
  );
}
