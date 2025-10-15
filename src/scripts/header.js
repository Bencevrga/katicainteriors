export default function initHeader() {
  const menuBtn = document.getElementById("menuBtn");
  const sideNav = document.getElementById("sideNav");
  const overlay = document.getElementById("overlay");
  const header = document.querySelector(".header");
  if (!menuBtn || !sideNav || !header) return;

  const open = () => {
    sideNav.classList.add("open");
    overlay?.classList.add("show");
    document.body.classList.add("nav-open");
    menuBtn.setAttribute("aria-expanded", "true");
  };
  const close = () => {
    sideNav.classList.remove("open");
    overlay?.classList.remove("show");
    document.body.classList.remove("nav-open");
    menuBtn.setAttribute("aria-expanded", "false");
  };

  let isOpen = false;
  menuBtn.addEventListener("click", () => { isOpen ? close() : open(); isOpen = !isOpen; });
  overlay?.addEventListener("click", () => { close(); isOpen = false; });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape" && isOpen) { close(); isOpen = false; } });

  const setHeaderHeight = () => {
    document.documentElement.style.setProperty("--header-h", `${header.getBoundingClientRect().height}px`);
  };
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);

  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll);
}
