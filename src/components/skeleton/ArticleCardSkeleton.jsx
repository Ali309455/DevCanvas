import React from "react";
import { SkeletonBase, SkeletonText } from "./SkeletonBase";

export default function ArticleCardSkeleton() {
  return (
    <div className="w-full flex flex-col gap-5 p-4 sm:p-6 md:p-8 border-2 border-border rounded-[var(--radius-card)] bg-surface shadow-brutal">
      <SkeletonBase className="w-full aspect-[4/3] rounded-[var(--radius-image)]" />
      <div className="flex flex-col gap-4">
        <SkeletonBase className="h-4 w-1/3" />
        <SkeletonText lines={2} />
      </div>
    </div>
  );
}
