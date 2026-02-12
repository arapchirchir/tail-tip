import { createTailTip } from "@tecworld/tail-tip";

window.addEventListener("load", () => {
  const mount = document.getElementById("content-editor");
  if (!mount) return;

  const tip = createTailTip({
    editor: "#content-editor",
    content: "<p>Hello Tail-Tip 👋</p>",
    onUpdate: (editor) => {
      // example: sync to hidden input
      const hidden = document.getElementById("content_html");
      if (hidden) hidden.value = editor.getHTML();
    },
  });

  // optional: expose for debugging
  window.tailTip = tip;
});
