import type { Editor } from "@tiptap/core";

export type ToolbarSelectors = Partial<{
  bold: string;
  italic: string;
  underline: string;
  strike: string;
  highlight: string;
  code: string;

  link: string;
  unlink: string;

  alignLeft: string;
  alignCenter: string;
  alignRight: string;

  bulletList: string;
  orderedList: string;
  blockquote: string;
  hr: string;

  image: string;
  youtube: string;

  paragraph: string;
  headingButtons: string; // selector for `[data-heading-level]`

  textSizeButtons: string; // selector for `[data-text-size]`
  colorPicker: string; // selector for `<input type="color">`
  colorButtons: string; // selector for `[data-hex-color]`
  resetColor: string;

  fontFamilyButtons: string; // selector for `[data-font-family]`
}>;

export type TailTipOptions = {
  /**
   * Element (or selector) that becomes the TipTap editor mount.
   * Example: "#content-editor"
   */
  editor: string | HTMLElement;

  /**
   * Optional: toolbar container element (or selector). Used for event delegation if you want.
   * You can leave this out if you’re passing explicit selectors.
   */
  toolbar?: string | HTMLElement;

  /**
   * Initial content (HTML string).
   */
  content?: string;

  /**
   * Extra class(es) on the editor root.
   */
  editorClass?: string;

  /**
   * Customize toolbar selectors (IDs in your Blade).
   */
  selectors?: ToolbarSelectors;

  /**
   * Prompts can be replaced (so you can use your own modal).
   */
  prompts?: Partial<{
    link: (defaultUrl: string) => Promise<string | null> | string | null;
    image: (defaultUrl: string) => Promise<string | null> | string | null;
    youtube: (defaultUrl: string) => Promise<string | null> | string | null;
  }>;

  /**
   * Hook: called after editor is created.
   */
  onCreate?: (editor: Editor) => void;

  /**
   * Hook: called whenever editor updates.
   */
  onUpdate?: (editor: Editor) => void;
};
