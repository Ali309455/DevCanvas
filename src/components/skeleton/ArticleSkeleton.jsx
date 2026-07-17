import React from "react";
import { SkeletonBase, SkeletonText } from "./SkeletonBase";

export default function ArticleSkeleton() {
  return (
    <div className="relative w-full py-8 md:py-12">
      <div className="w-full grid grid-cols-1 xl:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,16rem)] 2xl:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_minmax(0,18rem)] gap-6 xl:gap-8 items-start">
        <aside className="hidden xl:block sticky top-8 self-start min-w-0 w-full">
          <div className="border-2 border-border p-6 rounded-[var(--radius-card)] bg-surface shadow-brutal flex flex-col gap-4">
            <SkeletonBase className="h-6 w-1/2" />
            <SkeletonBase className="h-4 w-3/4" />
            <SkeletonBase className="h-4 w-5/6" />
            <SkeletonBase className="h-4 w-2/3" />
          </div>
        </aside>

        <div className="w-full max-w-[800px] mx-auto flex flex-col gap-8 md:gap-12 min-w-0">
          <div className="w-full flex flex-col">
            <SkeletonBase className="w-full aspect-[16/7] rounded-[var(--radius-image)] mb-8 md:mb-12" />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <SkeletonBase className="h-4 w-1/4" />
                <SkeletonBase className="h-4 w-1/6" />
              </div>
              <SkeletonBase className="h-10 w-5/6" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <SkeletonText lines={4} />
            <SkeletonBase className="h-48 w-full rounded-[var(--radius-image)]" />
            <SkeletonText lines={5} />
          </div>
        </div>

        <aside className="hidden xl:block sticky top-8 self-start min-w-0 w-full">
          <div className="border-2 border-border p-6 rounded-[var(--radius-card)] bg-surface shadow-brutal flex flex-col gap-4">
            <SkeletonBase className="h-8 w-3/4" />
            <SkeletonText lines={3} />
            <SkeletonBase className="h-10 w-full" />
          </div>
        </aside>
      </div>
    </div>
  );
}
