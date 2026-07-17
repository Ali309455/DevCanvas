import React from "react";
import { motion } from "framer-motion";

export default function ErrorState({
  title = "Something went wrong",
  description = "A connection error occurred. Please try again.",
  onRetry,
  retryLabel = "Try Again",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto p-8 border-2 border-danger rounded-[var(--radius-card)] bg-surface text-center shadow-[4px_4px_0px_#EF4444] flex flex-col items-center gap-6"
    >
      <div className="text-danger w-16 h-16 flex items-center justify-center bg-red-50 dark:bg-red-950/20 rounded-full mb-2">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold font-heading text-primary-text">{title}</h3>
        {description && (
          <p className="text-secondary-text text-sm font-sans">{description}</p>
        )}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-danger text-white font-bold uppercase tracking-wider text-sm rounded-[var(--radius-button)] shadow-[4px_4px_0px_#EF4444] hover:shadow-[6px_6px_0px_#EF4444] active:translate-y-0.5 hover:-translate-y-0.5 transition-all"
        >
          {retryLabel}
        </button>
      )}
    </motion.div>
  );
}
