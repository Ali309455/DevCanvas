import React, { useId } from "react";
import { motion } from "framer-motion";

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  placeholder = "",
  disabled = false,
  error = false,
  helperText = "",
  ...props
}, ref) {
  const id = useId();

  return (
    <motion.div
      className="w-full space-y-1.5"
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      {label && (
        <label
          htmlFor={id}
          className={`inline-block mb-1 pl-1 text-[14px] font-mono uppercase tracking-wider text-primary-text ${
            error ? "text-danger" : ""
          }`}
        >
          {label}
        </label>
      )}

      <motion.input
        {...props}
        type={type}
        id={id}
        ref={ref}
        disabled={disabled}
        className={`
          px-4 py-3 bg-surface text-primary-text outline-none
          border-2 border-border focus:border-primary-accent
          duration-200 w-full rounded-[var(--radius-input)]
          focus:shadow-brutal-accent transition-all
          ${error ? "border-danger focus:border-danger focus:shadow-[2px_2px_0px_#EF4444]" : ""}
          ${disabled ? "cursor-not-allowed opacity-50" : ""}
          ${className}
        `}
        placeholder={placeholder}
        whileTap={{ scale: disabled ? 1 : 0.99 }}
      />

      {error && helperText && (
        <p className="text-sm text-danger font-mono">
          {helperText}
        </p>
      )}

      {!error && helperText && (
        <p className="text-sm text-secondary-text font-mono">
          {helperText}
        </p>
      )}
    </motion.div>
  );
});

export default Input;