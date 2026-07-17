import React, { useState } from "react";
import { Button, AIResultModal } from "../index";
import aiService from "../../appwrite/ai";

export default function ReaderAISidebar({
  post,
  className = "",
  showTitle = true,
}) {
  const [summary, setSummary] = useState(null);
  const [takeaways, setTakeaways] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateSummary = async (forceRegen = false) => {
    if (!post) return;

    setModalType("summary");
    setModalOpen(true);

    if (summary && !forceRegen) {
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await aiService.getAISummary(post.title, post.content);
      if (res.data) {
        setSummary(res.data);
      } else if (res.error) {
        setError(res.error);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateTakeaways = async (forceRegen = false) => {
    if (!post) return;

    setModalType("takeaways");
    setModalOpen(true);

    if (takeaways && !forceRegen) {
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await aiService.getAITakeaways(post.title, post.content);
      if (res.data) {
        setTakeaways(res.data);
      } else if (res.error) {
        setError(res.error);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setModalOpen(false);
    }
  };

  return (
    <div
      className={`w-full max-w-full min-w-0 p-6 border-2 border-border bg-surface flex flex-col gap-6 rounded-[var(--radius-card)] shadow-brutal text-primary-text ${className}`}
    >
      {showTitle && (
        <h3 className="text-sm font-bold tracking-widest text-primary-text uppercase font-heading flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-primary-accent inline-block animate-pulse shrink-0"></span>
          AI Assistant
        </h3>
      )}

      <div className="flex flex-col gap-4 w-full min-w-0">
        {/* Summary Tool */}
        <div className="flex flex-col gap-2 w-full mb-2 min-w-0">
          <div className="flex justify-between items-center text-xs font-mono w-full min-w-0">
            <span className="text-secondary-text uppercase tracking-wider">Summary</span>
            <span className={`font-mono text-xs font-bold ${summary ? "text-success" : "text-secondary-text"}`}>
              {summary ? "Summary Ready ✓" : "No Summary Yet"}
            </span>
          </div>
          <Button
            variant={summary ? "outline" : "primary"}
            size="medium"
            onClick={() => handleGenerateSummary(false)}
            className="w-full"
          >
            {summary ? "View Summary" : "Summarize Article"}
          </Button>
        </div>

        {/* Takeaways Tool */}
        <div className="flex flex-col gap-2 border-t-2 mt-2 border-border pt-4 w-full min-w-0">
          <div className="flex justify-between items-center text-xs font-mono w-full min-w-0">
            <span className="text-secondary-text uppercase tracking-wider">Takeaways</span>
            <span className={`font-mono text-xs font-bold ${takeaways ? "text-success" : "text-secondary-text"}`}>
              {takeaways ? "Takeaways Ready ✓" : "No Takeaways Yet"}
            </span>
          </div>
          <Button
            variant={takeaways ? "outline" : "secondary"}
            size="medium"
            onClick={() => handleGenerateTakeaways(false)}
            className="w-full"
          >
            {takeaways ? "View Takeaways" : "Extract Takeaways"}
          </Button>
        </div>
      </div>

      <AIResultModal
        isOpen={modalOpen}
        onClose={handleClose}
        mode={modalType}
        data={modalType === "summary" ? summary : takeaways}
        loading={loading}
        error={error}
        onRegenerate={
          modalType === "summary" ? () => handleGenerateSummary(true) : null
        }
      />
    </div>
  );
}