// MENU CLOSE ON ESC
// --- extra kiegészítés, ha az ESC lenyomásával is zárni akarod a menüt

export default () => {
  const sideNav = document.getElementById("sideNav");
  const overlay = document.getElementById("overlay");
  if (!sideNav) return;

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      sideNav.classList.remove("open");
      overlay?.classList.remove("show");
      document.body.style.overflow = "";
    }
  });
};
