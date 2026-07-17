import React from "react";

export default function AISummaryView({ data }) {
  if (!data) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 bg-background border-2 border-border rounded-[var(--radius-card)] shadow-brutal text-primary-text font-mono text-sm whitespace-pre-wrap leading-relaxed">
        {data}
      </div>
    </div>
  );
}
