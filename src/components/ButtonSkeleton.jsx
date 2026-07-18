import React from "react";
import { motion } from "framer-motion";

export default function ButtonSkeleton({
  variant = "primary",
  size = "medium",
  className = "",
  leftIcon = false,
  rightIcon = false,
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

  // Define sizes
  const sizes = {
    small: {
      px: "px-3",
      py: "py-1.5",
      text: "text-sm",
      iconSize: "h-4 w-4",
    },
    medium: {
      px: "px-4",
      py: "py-2",
      text: "text-base",
      iconSize: "h-5 w-5",
    },
    large: {
      px: "px-6",
      py: "py-3",
      text: "text-lg",
      iconSize: "h-6 w-6",
    },
  };

  const sizeStyle = sizes[size] || sizes.medium;

  return (
    <motion.button
      disabled
      className={`
        flex items-center justify-center gap-2
        bg-neutral-accent/20
        ${sizeStyle.px} ${sizeStyle.py} ${sizeStyle.text}
        rounded-[var(--radius-button),12px] /* Button radius: 12px from Design System */
        ${className}
        cursor-not-allowed
      `}
      {...props}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 1 }}
    >
      {/* Shimmer animation effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
          }}
        />
      </div>

      {/* Content structure with placeholders */}
      <div className="relative z-10 flex items-center justify-center pointer-events-none">
        {leftIcon && (
          <span className={`${sizeStyle.iconSize} flex-shrink-0 bg-neutral-accent/40 rounded-[var(--radius-icon),9999px] `}>
          </span>
        )}
        <span className="h-4 w-24 bg-neutral-accent/40 rounded-[var(--radius-input),12px]">
        </span>
        {rightIcon && (
          <span className={`${sizeStyle.iconSize} flex-shrink-0 bg-neutral-accent/40 rounded-[var(--radius-icon),9999px] `}>
          </span>
        )}
      </div>
    </motion.button>
  );
}