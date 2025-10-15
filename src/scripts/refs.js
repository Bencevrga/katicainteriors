export default function initRefs() {
  const dataEl = document.getElementById("refs-data");
  const galleryData = dataEl ? JSON.parse(dataEl.textContent || "[]") : [];

  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));

  const lb = qs("#lightbox");
  const img = qs("#lb-image");
  const titleEl = qs("#lb-title");
  const countEl = qs("#lb-count");
  if (!lb || !img || !titleEl || !countEl) return;

  let currentSet = [];
  let currentTitle = "";
  let idx = 0;

  const updateImage = () => {
    if (!currentSet.length) return;
    img.src = currentSet[idx];
    img.alt = `${currentTitle} — ${idx + 1}/${currentSet.length}`;
    titleEl.textContent = currentTitle;
    countEl.textContent = `${idx + 1} / ${currentSet.length}`;
  };

  const openLightbox = (set, title, startIndex = 0) => {
    currentSet = set; currentTitle = title; idx = startIndex;
    updateImage();
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("lb-open");
  };

  const closeLightbox = () => {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lb-open");
  };

  const next = () => { idx = (idx + 1) % currentSet.length; updateImage(); };
  const prev = () => { idx = (idx - 1 + currentSet.length) % currentSet.length; updateImage(); };

  // kártyák
  qsa(".ref-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      const refIndex = Number(btn.getAttribute("data-ref-index"));
      const ref = galleryData[refIndex];
      if (!ref) return;
      openLightbox(ref.images, ref.title, 0);
    });
  });

  // vezérlés
  qs(".lb-next")?.addEventListener("click", next);
  qs(".lb-prev")?.addEventListener("click", prev);
  qsa("[data-lb-close]").forEach(el => el.addEventListener("click", closeLightbox));
  qs(".lb-close")?.addEventListener("click", closeLightbox);

  window.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
}
