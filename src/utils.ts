export function getEl(input?: string | HTMLElement): HTMLElement | null {
  if (!input) return null;
  if (typeof input === "string") return document.querySelector<HTMLElement>(input);
  return input;
}

export function onClick(selector: string, cb: (ev: MouseEvent) => void): void {
  const el = document.querySelector(selector);
  if (!el) return;
  el.addEventListener("click", (event) => cb(event as MouseEvent));
}

export function onAllClick(selector: string, cb: (el: Element) => void): void {
  document.querySelectorAll(selector).forEach((node) => {
    node.addEventListener("click", () => cb(node));
  });
}
