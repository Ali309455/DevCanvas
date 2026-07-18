import React from "react";
import { Input, Select, Button } from "../index";
import dbservice from "../../appwrite/dbconfig";

const PublishPanel = React.memo(({
  register,
  post,
  autoSaveStatus,
}) => {
  return (
    <div className="w-full max-w-full min-w-0 border-2 border-border bg-surface rounded-[var(--radius-card)] shadow-brutal p-4 sm:p-5 lg:p-6 space-y-5 lg:space-y-6 text-primary-text">
      <Input
        label="Featured Image"
        type="file"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        className="w-full"
        {...register("image", { required: !post })}
      />

      {post && post.featuredImage && (
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
        {...register("authorName", { required: true })}
      />
      
      <Input
        type="date"
        label="Published Date"
        className="w-full"
        {...register("publishedDate")}
      />
      
      <Select
        options={["Web", "App", "AI", "Data", "Coding", "Design", "Other"]}
        label="Category"
        className="w-full"
        {...register("category", { required: true })}
      />
      
      <Select
        options={["draft", "published", "archived"]}
        label="Status"
        className="w-full"
        {...register("status", { required: true })}
      />
      
      <div className="text-xs uppercase tracking-wider font-mono text-secondary-text w-full break-words">
        Status:{" "}
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
      
      <Button
        type="submit"
        variant="primary"
        size="large"
        className="w-full"
      >
        {post ? "Update" : "Submit"}
      </Button>
    </div>
  );
});

PublishPanel.displayName = "PublishPanel";

export default PublishPanel;
