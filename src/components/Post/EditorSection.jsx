import React from "react";
import { RTE } from "../index";

const EditorSection = React.memo(({ control, getValues, onEditorInit }) => {
  return (
    <section className="w-full">
      <RTE
        label="Content"
        name="content"
        control={control}
        defaultValue={getValues("content")}
        onEditorInit={onEditorInit}
      />
    </section>
  );
});

EditorSection.displayName = "EditorSection";

export default EditorSection;
