import { useState, useCallback } from "react";

/**
 * Custom hook to manage the visibility state and actions of the Command Palette.
 * @returns {{ isOpen: boolean, open: () => void, close: () => void, toggle: () => void }}
 */
export const useCommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);

  // useCallback keeps reference identities stable so child components don't re-render unnecessarily
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
