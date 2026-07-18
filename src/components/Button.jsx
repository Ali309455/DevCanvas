import React from "react";
import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  leftIcon = null,
  rightIcon = null,
  asChild = false,
  disabled = false,
  loading = false,
  className = "",
  type = "button",
  onClick,
  ...props
}) {

  // Define variants using clean compile-safe tailwind classes
  const variants = {
    primary: {
      bg: "bg-primary-accent text-white border-2 border-border",
      hoverBg: "hover:bg-primary-accent/90",
      shadow: "shadow-brutal-accent hover:shadow-brutal-accent-hover",
    },
    secondary: {
      bg: "bg-surface text-primary-text border-2 border-border",
      hoverBg: "hover:bg-surface-hover",
      shadow: "shadow-brutal hover:shadow-brutal-accent-hover",
    },
    ghost: {
      bg: "bg-transparent text-primary-text border-2 border-transparent",
      hoverBg: "hover:bg-soft-accent hover:text-primary-text",
      shadow: "shadow-none hover:shadow-none",
    },
    outline: {
      bg: "bg-transparent text-primary-text border-2 border-border",
      hoverBg: "hover:bg-surface-hover",
      shadow: "shadow-brutal hover:shadow-brutal-accent-hover",
    },
    danger: {
      bg: "bg-danger text-white border-2 border-border",
      hoverBg: "hover:bg-danger/90",
      shadow: "shadow-[4px_4px_0px_var(--color-border)] hover:shadow-[6px_6px_0px_var(--color-border)]",
    },
    success: {
      bg: "bg-success text-white border-2 border-border",
      hoverBg: "hover:bg-success/90",
      shadow: "shadow-[4px_4px_0px_var(--color-border)] hover:shadow-[6px_6px_0px_var(--color-border)]",
    },
  };

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

  const variantStyle = variants[variant] || variants.primary;
  const sizeStyle = sizes[size] || sizes.medium;

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  };

  const Component = asChild ? "span" : motion.button;

  return (
    <Component
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wider font-bold
        ${variantStyle.bg}
        ${sizeStyle.px} ${sizeStyle.py} ${sizeStyle.text}
        ${variantStyle.hoverBg} transition-all duration-200
        ${variantStyle.shadow}
        rounded-[var(--radius-button)]
        focus-visible:outline-2 focus-visible:outline-primary-accent
        ${disabled || loading ? "cursor-not-allowed opacity-50 shadow-none hover:shadow-none" : "cursor-pointer"}
        ${className}
      `}
      {...props}
      whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
    >
      {leftIcon && (
        <span className={`${sizeStyle.iconSize} flex-shrink-0 flex items-center justify-center`}>
          {leftIcon}
        </span>
      )}
      {loading ? (
        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      ) : (
        <>
          {children}
          {rightIcon && (
            <span className={`${sizeStyle.iconSize} flex-shrink-0 flex items-center justify-center`}>
              {rightIcon}
            </span>
          )}
        </>
      )}
    </Component>
  );
}