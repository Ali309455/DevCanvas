import React from "react";

export default function AIGrammarView({ originalContent, correctedContent }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Original Content Column */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-danger inline-block rounded-full"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-danger">Original</span>
        </div>
        <div className="p-4 bg-background border-2 border-border rounded-[var(--radius-card)] text-secondary-text font-mono text-sm whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto">
          {originalContent}
        </div>
      </div>

      {/* Corrected Content Column */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-success inline-block rounded-full"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-success">Corrected</span>
        </div>
        <div className="p-4 bg-soft-accent border-2 border-primary-accent rounded-[var(--radius-card)] text-primary-text font-mono text-sm whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto shadow-brutal-accent">
          {correctedContent}
        </div>
      </div>
    </div>
  );
}
