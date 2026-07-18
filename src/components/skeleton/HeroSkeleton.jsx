import React from "react";
import { SkeletonBase, SkeletonText } from "./SkeletonBase";

export default function HeroSkeleton() {
  return (
    <section className="w-full pt-16 pb-24 border-b-2 border-border flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 flex flex-col gap-6 w-full">
        <SkeletonBase className="h-16 w-3/4" />
        <SkeletonBase className="h-16 w-1/2" />
        <SkeletonText lines={3} className="mt-4" />
        <div className="flex gap-4 mt-8">
          <SkeletonBase className="h-12 w-32" />
          <SkeletonBase className="h-12 w-32" />
        </div>
      </div>
      <div className="flex-1 w-full relative hidden md:block">
        <div className="border-2 border-border bg-surface p-4 rounded-[var(--radius-card)] shadow-brutal">
          <SkeletonBase className="w-full aspect-video rounded-[var(--radius-image)]" />
          <div className="mt-6 flex flex-col gap-4">
            <SkeletonBase className="h-4 w-1/4" />
            <SkeletonBase className="h-8 w-3/4" />
            <SkeletonBase className="h-4 w-1/3" />
          </div>
        </div>
      </div>
    </section>
  );
}
