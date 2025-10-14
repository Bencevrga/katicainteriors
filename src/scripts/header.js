function initHeader() {
  const menuBtn = document.getElementById("menuBtn");
  const sideNav = document.getElementById("sideNav");
  const overlay = document.getElementById("overlay");
  const header = document.querySelector(".header");

  if (!menuBtn || !sideNav) return;

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

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
}
const header = document.querySelector(".header");
const setHeaderHeight = () => {
  if (!header) return;
  document.documentElement.style.setProperty("--header-h",
    `${header.getBoundingClientRect().height}px`);
};
setHeaderHeight();
window.addEventListener("resize", setHeaderHeight);


initHeader();
export default initHeader;
