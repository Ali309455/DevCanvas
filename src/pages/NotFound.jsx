import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="min-h-[70dvh] w-full flex items-center justify-center px-6 py-12 overflow-x-clip">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-xl text-center flex flex-col items-center gap-6"
      >
        <motion.div variants={itemVariants} className="relative select-none">
          <h1 className="text-7xl sm:text-9xl md:text-[12rem] font-bold font-heading text-primary-text leading-none tracking-tighter uppercase drop-shadow-[8px_8px_0px_var(--color-primary-accent)]">
            404
          </h1>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold font-heading text-primary-text uppercase tracking-tight"
        >
          [ Page Out of Sync ]
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-secondary-text font-mono text-base max-w-md"
        >
          The page you are looking for does not exist, has been archived, or was moved to another sector of the terminal.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 mt-4 justify-center"
        >
          <Link
            to="/"
            className="px-8 py-3.5 bg-border text-background dark:bg-border dark:text-background font-bold uppercase tracking-wider text-sm rounded-[var(--radius-button)] shadow-brutal hover:shadow-brutal-hover active:translate-y-0.5 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Terminal Home
          </Link>
          <Link
            to="/all-posts"
            className="px-8 py-3.5 border-2 border-border bg-surface text-primary-text font-bold uppercase tracking-wider text-sm rounded-[var(--radius-button)] shadow-brutal-accent hover:shadow-brutal-accent-hover active:translate-y-0.5 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            All Stories
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
