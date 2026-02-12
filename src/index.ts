import type { Editor } from "@tiptap/core";
import type { TailTipOptions } from "./types";
import { createEditor } from "./editor";
import { bindToolbar } from "./bindToolbar";

export type { TailTipOptions, ToolbarSelectors } from "./types";

export type TailTipInstance = {
  editor: Editor;
  getHTML: () => string;
  setHTML: (html: string) => void;
  destroy: () => void;
};

export function createTailTip(options: TailTipOptions): TailTipInstance {
  const editor = createEditor(options);

  // If you want toolbar wiring, just run it (selectors can be customized)
  bindToolbar(editor, options);

  return {
    editor,
    getHTML: () => editor.getHTML(),
    setHTML: (html) => editor.commands.setContent(html),
    destroy: () => editor.destroy(),
  };
}
