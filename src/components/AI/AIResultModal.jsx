import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Button from "../Button";
import AISummaryView from "./AISummaryView";
import AITakeawayView from "./AITakeawayView";
import AITitleList from "./AITitleList";
import AIGrammarView from "./AIGrammarView";
import AIContinuationView from "./AIContinuationView";

export default function AIResultModal({
  isOpen,
  onClose,
  mode,
  data,
  originalContent = "",
  loading = false,
  error = null,
  isGrammarSelection = false, // True if grammar check was on selection, false if entire article
  onAction,
  onRegenerate,
}) {
  const [selectedTitle, setSelectedTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const modalRef = useRef(null);

  // Close on ESC keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !loading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, loading]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset selected title when opening or data changes
  useEffect(() => {
    if (isOpen) {
      setSelectedTitle("");
    }
  }, [isOpen, data]);

  // Trap focus utility
  useEffect(() => {
    const currentModal = modalRef.current;
    if (!isOpen || !currentModal) return;
    
    const focusableElements = currentModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleFocusTrap = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    currentModal.addEventListener("keydown", handleFocusTrap);
    // Focus first element on open
    setTimeout(() => firstElement.focus(), 50);

    return () => {
      currentModal.removeEventListener("keydown", handleFocusTrap);
    };
  }, [isOpen, loading]);

  if (typeof window === "undefined") return null;

  const handleCopy = () => {
    let textToCopy = "";
    if (mode === "titles") {
      if (selectedTitle) {
        textToCopy = selectedTitle;
      } else if (Array.isArray(data)) {
        textToCopy = data.join("\n");
      }
    } else if (mode === "grammar") {
      textToCopy = data; // corrected content
    } else {
      textToCopy = data; // summary, takeaways, or continuation
    }

    if (!textToCopy) return;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setToastMessage("Copied ✓");
        setTimeout(() => setToastMessage(""), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const getTitle = () => {
    switch (mode) {
      case "summary":
        return "AI Summary";
      case "takeaways":
        return "Key Takeaways";
      case "titles":
        return "Title Suggestions";
      case "grammar":
        return "Grammar Check";
      case "continue":
        return "Continue Writing";
      default:
        return "AI Writing Assistant";
    }
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="p-4 border-2 border-danger bg-red-50 dark:bg-red-950/20 text-danger rounded-[var(--radius-card)] font-mono text-sm shadow-brutal flex flex-col gap-2">
          <div className="font-bold">AI Operation Failed:</div>
          <div>{error}</div>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="py-12 flex flex-col items-center justify-center gap-4">
          <div className="flex gap-2">
            <span className="w-3.5 h-3.5 bg-primary-accent inline-block animate-bounce shrink-0" style={{ animationDelay: "0ms" }}></span>
            <span className="w-3.5 h-3.5 bg-primary-accent inline-block animate-bounce shrink-0" style={{ animationDelay: "150ms" }}></span>
            <span className="w-3.5 h-3.5 bg-primary-accent inline-block animate-bounce shrink-0" style={{ animationDelay: "300ms" }}></span>
          </div>
          <p className="font-mono text-sm text-secondary-text animate-pulse">Thinking...</p>
        </div>
      );
    }

    switch (mode) {
      case "summary":
        return <AISummaryView data={data} />;
      case "takeaways":
        return <AITakeawayView data={data} />;
      case "titles":
        return (
          <AITitleList
            data={data}
            selectedTitle={selectedTitle}
            onSelectTitle={setSelectedTitle}
          />
        );
      case "grammar":
        return (
          <AIGrammarView
            originalContent={originalContent}
            correctedContent={data}
          />
        );
      case "continue":
        return <AIContinuationView data={data} />;
      default:
        return null;
    }
  };

  const renderFooterButtons = () => {
    if (loading) return null;

    // Helper for buttons
    const copyButton = (
      <Button variant="outline" size="small" onClick={handleCopy} key="copy">
        Copy
      </Button>
    );

    const closeButton = (
      <Button variant="secondary" size="small" onClick={onClose} key="close">
        Close
      </Button>
    );

    const regenerateButton = onRegenerate ? (
      <Button variant="outline" size="small" onClick={onRegenerate} key="regen">
        Regenerate
      </Button>
    ) : null;

    if (error) {
      return (
        <div className="flex justify-end gap-3 w-full">
          {regenerateButton}
          {closeButton}
        </div>
      );
    }

    switch (mode) {
      case "summary":
        return (
          <div className="flex justify-end gap-3 w-full">
            {copyButton}
            {regenerateButton}
            {closeButton}
          </div>
        );
      case "takeaways":
        return (
          <div className="flex justify-end gap-3 w-full">
            {copyButton}
            {closeButton}
          </div>
        );
      case "titles":
        return (
          <div className="flex justify-end gap-3 w-full flex-wrap">
            {copyButton}
            {regenerateButton}
            <Button
              variant="primary"
              size="small"
              disabled={!selectedTitle}
              onClick={() => onAction("useTitle", selectedTitle)}
            >
              Use Title
            </Button>
            {closeButton}
          </div>
        );
      case "grammar":
        return (
          <div className="flex justify-end gap-3 w-full flex-wrap">
            {copyButton}
            {regenerateButton}
            <Button
              variant="primary"
              size="small"
              onClick={() => onAction("replace", data)}
            >
              {isGrammarSelection ? "Replace Selection" : "Replace Entire Content"}
            </Button>
            <Button variant="secondary" size="small" onClick={onClose}>
              Discard
            </Button>
          </div>
        );
      case "continue":
        return (
          <div className="flex justify-end gap-3 w-full flex-wrap">
            {copyButton}
            {regenerateButton}
            <Button
              variant="primary"
              size="small"
              onClick={() => onAction("insertBelow", data)}
            >
              Insert Below Cursor
            </Button>
            <Button
              variant="outline"
              size="small"
              onClick={() => onAction("replace", data)}
            >
              Replace Selection
            </Button>
            <Button variant="secondary" size="small" onClick={onClose}>
              Discard
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop Blur/Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !loading && onClose()}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-2xl bg-surface border-2 border-border rounded-[var(--radius-card)] shadow-brutal flex flex-col max-h-[90vh] text-primary-text z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b-2 border-border bg-surface shrink-0">
              <h3 className="text-base sm:text-lg font-bold tracking-wider font-heading uppercase flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-primary-accent inline-block shrink-0 animate-pulse"></span>
                {getTitle()}
              </h3>
              {!loading && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 border-2 border-transparent hover:border-border hover:bg-surface-hover transition-colors rounded-lg cursor-pointer"
                  aria-label="Close modal"
                >
                  <IoClose className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-surface">
              {renderContent()}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-t-2 border-border bg-surface shrink-0">
              {renderFooterButtons()}
            </div>

            {/* Copy Toast Alert inside Modal */}
            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-ink-black border-2 border-border text-page-white px-4 py-2 text-xs font-mono uppercase tracking-widest font-bold shadow-brutal rounded-lg"
                >
                  {toastMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
