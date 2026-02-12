import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "TailTip",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "tail-tip.mjs" : "tail-tip.cjs"),
    },
    rollupOptions: {
      // Do NOT bundle tiptap core into your library (users will install it)
      external: [
        "@tiptap/core",
        "@tiptap/starter-kit",
        "@tiptap/extension-bold",
        "@tiptap/extension-highlight",
        "@tiptap/extension-underline",
        "@tiptap/extension-link",
        "@tiptap/extension-text-align",
        "@tiptap/extension-image",
        "@tiptap/extension-youtube",
        "@tiptap/extension-text-style",
        "@tiptap/extension-font-family",
        "@tiptap/extension-color",
      ],
    },
  },
});
