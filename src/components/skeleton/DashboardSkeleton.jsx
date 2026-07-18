import React from "react";
import { SkeletonBase } from "./SkeletonBase";

export default function DashboardSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 flex flex-col gap-8">
      <SkeletonBase className="h-10 w-1/3" />
      <SkeletonBase className="h-6 w-2/3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <SkeletonBase className="h-36 rounded-[var(--radius-card)]" />
        <SkeletonBase className="h-36 rounded-[var(--radius-card)]" />
      </div>
    </div>
  );
}
