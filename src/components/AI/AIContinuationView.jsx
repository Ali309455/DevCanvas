import React from "react";

export default function AIContinuationView({ data }) {
  if (!data) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs font-mono text-secondary-text uppercase tracking-widest">
        AI Generated Continuation:
      </div>
      <div className="p-4 bg-soft-accent border-2 border-primary-accent rounded-[var(--radius-card)] text-primary-text font-mono text-sm whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto shadow-brutal-accent">
        {data}
      </div>
    </div>
  );
}
