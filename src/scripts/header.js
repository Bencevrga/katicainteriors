// src/scripts/header.js
(() => {
  const header = document.querySelector(".header");
  const menuBtn = document.getElementById("menuBtn");
  const sideNav = document.getElementById("sideNav");
  const overlay = document.getElementById("overlay");

  // header magasság CSS változóba, hogy a többi rész igazodni tudjon
  const setHeaderHeight = () => {
    if (!header) return;
    document.documentElement.style.setProperty(
      "--header-h",
      `${header.getBoundingClientRect().height}px`
    );
  };
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);

  if (!menuBtn || !sideNav) return;

  const open = () => {
    sideNav.classList.add("open");
    overlay?.classList.add("show");
    document.body.classList.add("nav-open");
  };
  const close = () => {
    sideNav.classList.remove("open");
    overlay?.classList.remove("show");
    document.body.classList.remove("nav-open");
  };

  let isOpen = false;
  menuBtn.addEventListener("click", () => {
    isOpen ? close() : open();
    isOpen = !isOpen;
  });
  overlay?.addEventListener("click", () => {
    close();
    isOpen = false;
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      close();
      isOpen = false;
    }
  });
})();
