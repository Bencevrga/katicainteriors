// SMOOTHSCROLL.JS
// --- minden belső hivatkozás (#szekció) finoman odagörget

export default () => {
  const links = document.querySelectorAll('a[href^="#"]');
  if (!links.length) return;

  links.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80, // header magassága
          behavior: "smooth",
        });
      }
    });
  });
};
