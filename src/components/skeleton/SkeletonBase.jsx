import React from "react";

export function SkeletonBase({ className = "", rounded = "rounded-lg" }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 dark:bg-neutral-800 ${rounded} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-neutral-700/20 to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}

export function SkeletonText({ className = "", lines = 1 }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonBase
          key={index}
          className={`h-4 ${index === lines - 1 && lines > 1 ? "w-4/5" : "w-full"} ${className}`}
        />
      ))}
    </div>
  );
}
