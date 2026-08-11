import React from "react";
import { Input } from "../index";

const PostHeader = React.memo(({ register, setValue, slugTransform, errors = {} }) => {
  return (
    <section className="max-w-6xl mx-auto space-y-6 w-full">
      <Input
        label="Title"
        placeholder="Enter post title"
        error={!!errors.title}
        helperText={errors.title?.message}
        {...register("title", { required: "Title is required" })}
      />
      <Input
        label="Slug"
        placeholder="URL slug (auto-generated from title)"
        error={!!errors.slug}
        helperText={errors.slug?.message}
        {...register("slug", { required: "Slug is required" })}
        onInput={(e) => {
          setValue("slug", slugTransform(e.currentTarget.value), {
            shouldValidate: true,
          });
        }}
      />
    </section>
  );
});

PostHeader.displayName = "PostHeader";

export default PostHeader;
