import React from "react";
import { motion } from "framer-motion";

export default function SelectSkeleton({
  className = "",
  ...props
}) {
  // Check for dark mode (assuming 'dark' class on html element)
  const isDark = typeof window !== 'undefined' &&
                 document.documentElement.classList.contains('dark');

  // Define color palette for skeleton (neutral tones)
  const colors = {
    // Light theme colors
    light: {
      surface: "#FFFFFF",
      border: "#111111",
    },
    // Dark theme colors
    dark: {
      surface: "#1B1B1B",
      border: "#F4F4F4",
    }
  };

  // Get current theme colors
  const theme = isDark ? colors.dark : colors.light;

  return (
    <motion.div
      className={`
        w-full
        ${className}
        cursor-not-allowed
      `}
      {...props}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 1 }}
    >
      {/* Shimmer animation effect */}
      <div className="relative overflow-hidden">
        <div
          className="h-full w-full bg-gradient-to-r from-transparent via-neutral-accent/40 to-transparent"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transform: "translateX(-100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s ease-in-out infinite",
            pointerEvents: "none",
            borderRadius: "var(--radius-input),12px"
          }}
        />
      </div>

      {/* Select structure with placeholders */}
      <div className="relative z-10">
        <select
          disabled
          className={`
            px-4 py-3 bg-surface/20 text-transparent outline-none
            border-[${theme.border}] w-full
            rounded-[var(--radius-input),12px]
            appearance-none
            bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9%22 12 15%22 18 9%22></polyline></svg>)']
            bg-right-[0.75rem] bg-center-no-repeat bg-[contain] bg-[size:1.5rem_1.5rem]
            cursor-not-allowed
          `}
        >
          <option disabled>Select option</option>
          <option disabled>Option 1</option>
          <option disabled>Option 2</option>
          <option disabled>Option 3</option>
        </select>

        {/* Arrow icon placeholder */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 bg-neutral-accent/40 rounded-md pointer-events-none">
        </div>
      </div>
    </motion.div>
  );
}