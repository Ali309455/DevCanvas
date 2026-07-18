import React, { useId } from "react";
import { motion } from "framer-motion";

export default function InputSkeleton({
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
        w-full space-y-1.5
        ${className}
        cursor-not-allowed
      `}
      {...props}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 1 }}
    >
      {/* Label placeholder */}
      <div className="h-4 w-36 bg-neutral-accent/40 rounded-[var(--radius-input),12px]">
      </div>

      {/* Input field placeholder */}
      <div className="mt-2">
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

          <input
            type="text"
            disabled
            className={`
              px-4 py-3 bg-surface/20 text-transparent outline-none
              border-[${theme.border}] w-full
              rounded-[var(--radius-input),12px]
              appearance-none
              cursor-not-allowed
            `}
            placeholder=" "
          />
        </div>
      </div>

      {/* Helper text placeholder (optional) */}
      <div className="mt-1">
        <div className="h-4 w-24 bg-neutral-accent/40 rounded-[var(--radius-input),12px]">
        </div>
      </div>
    </motion.div>
  );
}