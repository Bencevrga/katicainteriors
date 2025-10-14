// DRAWER.JS
// --- a régi drawer logika külön fájlban

export default () => {
  const drawer = document.getElementById("siteDrawer");
  const btn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const scrim = document.getElementById("scrim");

  if (!drawer || !btn) return;

  const open = () => {
    drawer.classList.add("open");
    drawer.removeAttribute("inert");
    btn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    drawer.classList.remove("open");
    drawer.setAttribute("inert", "");
    btn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  btn.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  scrim?.addEventListener("click", close);
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
};
