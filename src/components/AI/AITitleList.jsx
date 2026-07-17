import React from "react";

export default function AITitleList({ data, selectedTitle, onSelectTitle }) {
  if (!data || !Array.isArray(data)) return null;

  return (
    <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-1">
      <div className="text-xs font-mono text-secondary-text uppercase tracking-widest mb-1">
        Select a Title Suggestion:
      </div>
      <div className="flex flex-col gap-3">
        {data.map((title, index) => {
          const isSelected = selectedTitle === title;
          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectTitle(title)}
              className={`w-full text-left p-4 border-2 rounded-[var(--radius-card)] cursor-pointer transition-all duration-150 flex items-center gap-3 font-mono text-sm
                ${
                  isSelected
                    ? "bg-soft-accent border-primary-accent shadow-brutal-accent"
                    : "bg-surface border-border shadow-brutal hover:bg-surface-hover hover:translate-y-[-1px]"
                }
              `}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center
                  ${
                    isSelected
                      ? "border-primary-accent bg-primary-accent"
                      : "border-border bg-white"
                  }
                `}
              >
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <span className={`flex-1 ${isSelected ? "font-bold text-primary-text" : "text-primary-text"}`}>
                {title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
