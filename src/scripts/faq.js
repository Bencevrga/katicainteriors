export default function initFaq() {
  const root = document.querySelector(".faq-list");
  if (!root) return;
  const items = Array.from(root.querySelectorAll(".faq-item"));
  items.forEach((d) => {
    d.addEventListener("toggle", () => {
      if (d.open) items.forEach(x => { if (x !== d) x.open = false; });
    });
  });
}
