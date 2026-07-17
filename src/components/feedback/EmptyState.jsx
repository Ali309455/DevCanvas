import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-md mx-auto p-8 border-2 border-border rounded-[var(--radius-card)] bg-surface text-center shadow-brutal flex flex-col items-center gap-6"
    >
      {icon && (
        <div className="text-primary-accent dark:text-primary-accent w-16 h-16 flex items-center justify-center bg-soft-accent rounded-full mb-2">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold font-heading text-primary-text">{title}</h3>
        {description && (
          <p className="text-secondary-text text-sm font-sans">{description}</p>
        )}
      </div>
      {(actionLabel && (actionHref || onAction)) && (
        actionHref ? (
          <Link
            to={actionHref}
            className="px-6 py-2.5 bg-primary-accent text-white font-bold uppercase tracking-wider text-sm rounded-[var(--radius-button)] shadow-brutal-accent hover:shadow-brutal-accent-hover active:translate-y-0.5 hover:-translate-y-0.5 transition-all"
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="px-6 py-2.5 bg-primary-accent text-white font-bold uppercase tracking-wider text-sm rounded-[var(--radius-button)] shadow-brutal-accent hover:shadow-brutal-accent-hover active:translate-y-0.5 hover:-translate-y-0.5 transition-all"
          >
            {actionLabel}
          </button>
        )
      )}
    </motion.div>
  );
}
