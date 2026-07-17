import { useEffect } from 'react';

/**
 * Custom hook to listen for global hotkey combinations (Ctrl+K / ⌘+K).
 * @param {Function} callback - The action to trigger when the shortcut is detected.
 */
export const useKeyboardShortcut = (callback) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if 'K' is pressed AND either Ctrl (Windows/Linux) or Cmd (macOS) is held down
      const isModifierPressed = event.ctrlKey || event.metaKey;
      const isKeyK = event.key.toLowerCase() === 'k';

      if (isModifierPressed && isKeyK) {
        // Prevent default browser behavior (e.g., focusing the URL bar or opening default search)
        event.preventDefault();
        
        // Fire the state modifier function
        callback();
      }
    };

    // Attach listener globally to the window object
    window.addEventListener('keydown', handleKeyDown);

    // Lifecycle Cleanup: strip the event listener away on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]); // Re-bind safely if the reference callback logic changes
};