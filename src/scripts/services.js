const root = document.querySelector(".services-list");
if (root) {
  const items = [...root.querySelectorAll(".service")];
  items.forEach((d) => {
    d.addEventListener("toggle", () => {
      if (d.open) items.forEach(x => { if (x !== d) x.open = false; });
    });
  });
}
