import React from "react";

export default function AITakeawayView({ data }) {
  if (!data) return null;

  // Split content by lines and filter out empty ones
  const bulletPoints = data
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      // Remove leading dash, asterisk, or bullet characters
      return line.replace(/^[-*•\s]+/, "");
    });

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-3 p-4 bg-background border-2 border-border rounded-[var(--radius-card)] shadow-brutal text-primary-text font-mono text-sm leading-relaxed">
        {bulletPoints.map((point, index) => (
          <li key={index} className="flex gap-2 items-start">
            <span className="text-primary-accent font-bold shrink-0 mt-0.5">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
