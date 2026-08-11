import React, { useEffect } from "react";
import { Input, Select, Button } from "../index";
import dbservice from "../../appwrite/dbconfig";

const PublishPanel = React.memo(({
  register,
  post,
  autoSaveStatus,
  status = "draft",
  errors = {},
  isSubmitting = false,
  onPublish,
  onSaveDraft,
  onRevertToDraft,
}) => {
  return (
    <div className="w-full max-w-full min-w-0 border-2 border-border bg-surface rounded-[var(--radius-card)] shadow-brutal p-4 sm:p-5 lg:p-6 space-y-5 lg:space-y-6 text-primary-text">
      
      {/* Lifecycle Status Badge */}
      <div className="flex items-center justify-between border-b-2 border-border pb-4">
        <span className="font-mono text-xs uppercase tracking-wider text-secondary-text">Lifecycle Status</span>
        <span className={`px-3 py-1 border-2 border-border text-xs uppercase font-mono font-bold rounded-full shadow-[2px_2px_0px_var(--color-border)] transition-all ${
          status === "published"
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500"
            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500"
        }`}>
          {status === "published" ? "Published" : "Draft"}
        </span>
      </div>

      <Input
        label="Featured Image"
        type="file"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        className="w-full"
        error={!!errors.featuredImage}
        helperText={errors.featuredImage?.message}
        {...register("featuredImage")}
      />

      {post && post.featuredImage && post.featuredImage !== "none" && (
        <div className="w-full min-w-0 overflow-hidden rounded-[var(--radius-image)]">
          <img
            src={dbservice.getFilePreview(post.featuredImage)}
            alt={post.title || "Featured Image Preview"}
            className="w-full aspect-video object-cover border-2 border-border rounded-[var(--radius-image)]"
          />
        </div>
      )}

      <Input
        label="Author Name"
        placeholder="Enter author name"
        className="w-full"
        error={!!errors.authorName}
        helperText={errors.authorName?.message}
        {...register("authorName")}
      />
      
      <Input
        type="date"
        label="Published Date"
        className="w-full"
        error={!!errors.publishedDate}
        helperText={errors.publishedDate?.message}
        {...register("publishedDate")}
      />
      
      <Select
        options={["Web", "App", "AI", "Data", "Coding", "Design", "Other"]}
        label="Category"
        className="w-full"
        error={!!errors.category}
        helperText={errors.category?.message}
        {...register("category")}
      />
      
      <div className="text-xs uppercase tracking-wider font-mono text-secondary-text w-full break-words border-t border-gray-100 dark:border-neutral-850 pt-4">
        Save Status:{" "}
        <span
          className={
            autoSaveStatus === "Saving..."
              ? "text-primary-accent animate-pulse"
              : "text-primary-text font-bold"
          }
        >
          {autoSaveStatus}
        </span>
      </div>

      <div className="space-y-3 pt-2">
        {status === "published" ? (
          <>
            <Button
              type="button"
              variant="primary"
              size="large"
              className="w-full"
              onClick={onPublish}
              loading={isSubmitting}
            >
              Update Post
            </Button>
            <Button
              type="button"
              variant="danger"
              size="large"
              className="w-full"
              onClick={onRevertToDraft}
              loading={isSubmitting}
            >
              Revert to Draft
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="primary"
              size="large"
              className="w-full"
              onClick={onPublish}
              loading={isSubmitting}
            >
              Publish
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="large"
              className="w-full"
              onClick={onSaveDraft}
              loading={isSubmitting}
            >
              Save Draft
            </Button>
          </>
        )}
      </div>
    </div>
  );
});

PublishPanel.displayName = "PublishPanel";

export default PublishPanel;
