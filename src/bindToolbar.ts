import type { Editor } from "@tiptap/core";
import type { TailTipOptions, ToolbarSelectors } from "./types";
import { onAllClick, onClick } from "./utils";

const DEFAULT_SELECTORS: Required<ToolbarSelectors> = {
  bold: "#toggleBoldButton",
  italic: "#toggleItalicButton",
  underline: "#toggleUnderlineButton",
  strike: "#toggleStrikeButton",
  highlight: "#toggleHighlightButton",
  code: "#toggleCodeButton",

  link: "#toggleLinkButton",
  unlink: "#removeLinkButton",

  alignLeft: "#toggleLeftAlignButton",
  alignCenter: "#toggleCenterAlignButton",
  alignRight: "#toggleRightAlignButton",

  bulletList: "#toggleListButton",
  orderedList: "#toggleOrderedListButton",
  blockquote: "#toggleBlockquoteButton",
  hr: "#toggleHRButton",

  image: "#addImageButton",
  youtube: "#addVideoButton",

  paragraph: "#toggleParagraphButton",
  headingButtons: "[data-heading-level]",

  textSizeButtons: "[data-text-size]",
  colorPicker: "#color",
  colorButtons: "[data-hex-color]",
  resetColor: "#reset-color",

  fontFamilyButtons: "[data-font-family]",
};

function mergeSelectors(custom?: ToolbarSelectors): Required<ToolbarSelectors> {
  return { ...DEFAULT_SELECTORS, ...(custom ?? {}) };
}

export function bindToolbar(editor: Editor, options: TailTipOptions): void {
  const sel = mergeSelectors(options.selectors);

  // Marks
  onClick(sel.bold, () => editor.chain().focus().toggleBold().run());
  onClick(sel.italic, () => editor.chain().focus().toggleItalic().run());
  onClick(sel.underline, () => editor.chain().focus().toggleUnderline().run());
  onClick(sel.strike, () => editor.chain().focus().toggleStrike().run());
  onClick(sel.code, () => editor.chain().focus().toggleCode().run());

  onClick(sel.highlight, () => {
    const active = editor.isActive("highlight");
    if (active) {
      editor.chain().focus().unsetHighlight().run();
      return;
    }

    editor.chain().focus().setHighlight({ color: "#ffc078" }).run();
  });

  // Link
  onClick(sel.link, async () => {
    const promptFn =
      options.prompts?.link ??
      ((d) => window.prompt("Enter link URL:", d));
    const url = await promptFn("https://example.com");
    if (!url) return;
    editor.chain().focus().toggleLink({ href: url }).run();
  });

  onClick(sel.unlink, () => editor.chain().focus().unsetLink().run());

  // Align
  onClick(sel.alignLeft, () => editor.chain().focus().setTextAlign("left").run());
  onClick(sel.alignCenter, () =>
    editor.chain().focus().setTextAlign("center").run()
  );
  onClick(sel.alignRight, () =>
    editor.chain().focus().setTextAlign("right").run()
  );

  // Blocks
  onClick(sel.bulletList, () => editor.chain().focus().toggleBulletList().run());
  onClick(sel.orderedList, () =>
    editor.chain().focus().toggleOrderedList().run()
  );
  onClick(sel.blockquote, () =>
    editor.chain().focus().toggleBlockquote().run()
  );
  onClick(sel.hr, () => editor.chain().focus().setHorizontalRule().run());

  // Media
  onClick(sel.image, async () => {
    const promptFn =
      options.prompts?.image ??
      ((d) => window.prompt("Enter image URL:", d));
    const url = await promptFn("https://placehold.co/600x400");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  });

  onClick(sel.youtube, async () => {
    const promptFn =
      options.prompts?.youtube ??
      ((d) => window.prompt("Enter YouTube URL:", d));
    const url = await promptFn("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    if (!url) return;
    editor.commands.setYoutubeVideo({ src: url, width: 640, height: 480 });
  });

  // Typography
  onClick(sel.paragraph, () => editor.chain().focus().setParagraph().run());

  onAllClick(sel.headingButtons, (btn) => {
    const level = (btn as HTMLElement).getAttribute("data-heading-level");
    if (!level) return;

    const parsedLevel = Number.parseInt(level, 10);
    if (parsedLevel < 1 || parsedLevel > 6) return;

    editor
      .chain()
      .focus()
      .toggleHeading({ level: parsedLevel as 1 | 2 | 3 | 4 | 5 | 6 })
      .run();
  });

  // Text size
  onAllClick(sel.textSizeButtons, (btn) => {
    const fontSize = (btn as HTMLElement).getAttribute("data-text-size");
    if (!fontSize) return;
    editor.chain().focus().setMark("textStyle", { fontSize }).run();
  });

  // Color picker
  const colorPicker = document.querySelector(sel.colorPicker) as
    | HTMLInputElement
    | null;

  if (colorPicker) {
    colorPicker.addEventListener("input", (event) => {
      const value = (event.target as HTMLInputElement).value;
      editor.chain().focus().setColor(value).run();
    });
  }

  onAllClick(sel.colorButtons, (btn) => {
    const hex = (btn as HTMLElement).getAttribute("data-hex-color");
    if (!hex) return;
    editor.chain().focus().setColor(hex).run();
  });

  onClick(sel.resetColor, () => editor.commands.unsetColor());

  // Font family
  onAllClick(sel.fontFamilyButtons, (btn) => {
    const family = (btn as HTMLElement).getAttribute("data-font-family");
    if (!family) return;
    editor.chain().focus().setFontFamily(family).run();
  });
}
