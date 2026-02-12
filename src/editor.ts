import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import YouTube from "@tiptap/extension-youtube";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { Color } from "@tiptap/extension-color";
import Bold from "@tiptap/extension-bold";

import type { TailTipOptions } from "./types";
import { getEl } from "./utils";

export function createEditor(options: TailTipOptions): Editor {
  const mount = getEl(options.editor);
  if (!mount) {
    throw new Error("[tail-tip] Editor mount element not found.");
  }

  const editor = new Editor({
    element: mount,
    extensions: [
      StarterKit.configure({
        bold: false,
      }),
      Bold,
      TextStyle,
      Color,
      FontFamily,
      Highlight,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image,
      YouTube,
    ],
    content: options.content ?? "",
    editorProps: {
      attributes: {
        class:
          options.editorClass ??
          "prose max-w-none focus:outline-none text-gray-800 dark:text-white",
      },
    },
    onCreate: ({ editor }) => options.onCreate?.(editor),
    onUpdate: ({ editor }) => options.onUpdate?.(editor),
  });

  return editor;
}
