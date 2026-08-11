import React from "react";
import { RTE } from "../index";

const EditorSection = React.memo(({ control, getValues, onEditorInit, rules }) => {
  return (
    <section className="w-full">
      <RTE
        label="Content"
        name="content"
        control={control}
        rules={rules}
        defaultValues={getValues("content")}
        onEditorInit={onEditorInit}
      />
    </section>
  );
});

EditorSection.displayName = "EditorSection";

export default EditorSection;
