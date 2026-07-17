import React from "react";
import { SkeletonBase, SkeletonText } from "./SkeletonBase";

export default function ProfileSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 flex flex-col gap-12 animate-pulse">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b-2 border-border pb-12">
        <SkeletonBase className="w-32 h-32 rounded-[var(--radius-card)] shrink-0" />
        <div className="flex flex-col gap-4 w-full justify-center h-32">
          <SkeletonBase className="h-8 w-48" />
          <SkeletonBase className="h-4 w-36" />
          <SkeletonBase className="h-6 w-24" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonBase className="h-28 rounded-[var(--radius-card)]" />
        <SkeletonBase className="h-28 rounded-[var(--radius-card)]" />
        <SkeletonBase className="h-28 rounded-[var(--radius-card)]" />
      </div>
    </div>
  );
}
