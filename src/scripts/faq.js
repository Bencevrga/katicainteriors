// Egy időben csak egy kérdés legyen nyitva
const root = document.querySelector(".faq-list");
if (root) {
  const items = Array.from(root.querySelectorAll(".faq-item"));
  items.forEach((d) => {
    d.addEventListener("toggle", () => {
      if (d.open) items.forEach(x => { if (x !== d) x.open = false; });
    });
  });
}
