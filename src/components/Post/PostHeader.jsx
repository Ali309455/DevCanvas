import React from "react";
import { Input } from "../index";

const PostHeader = React.memo(({ register, setValue, slugTransform }) => {
  return (
    <section className="max-w-6xl mx-auto space-y-6 w-full">
      <Input
        label="Title"
        placeholder="Enter post title"
        {...register("title", { required: true })}
      />
      <Input
        label="Slug"
        placeholder="URL slug (auto-generated from title)"
        {...register("slug", { required: true })}
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
