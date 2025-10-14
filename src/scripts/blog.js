const root = document.querySelector(".blog-carousel");
const cards = Array.from(document.querySelectorAll(".blog-card"));
const prev = document.querySelector(".blog-btn.prev");
const next = document.querySelector(".blog-btn.next");

if (!root || cards.length === 0) {
  // no-op
} else {
  let current = Math.floor(cards.length / 2);
  let shift = 0;

  function setShift(px) {
    shift = px;
    root.style.transform = `translateX(${Math.round(shift)}px)`;
  }

  function centerCurrent() {
    const viewport = root.parentElement?.getBoundingClientRect() ?? root.getBoundingClientRect();
    const vpCenter = (viewport.left + viewport.right) / 2;
    const card = cards[current];
    const r = card.getBoundingClientRect();
    const cardCenter = (r.left + r.right) / 2;
    const delta = cardCenter - vpCenter;
    setShift(shift - delta);
  }

  function updateClasses() {
    cards.forEach((card, i) => {
      card.classList.remove("center","near-left","near-right","far-left","far-right","hidden");
      const offset = i - current;

      if (offset === 0) {
        card.classList.add("center");
      } else if (offset === -1) {
        card.classList.add("near-left");
      } else if (offset === 1) {
        card.classList.add("near-right");
      } else if (offset === -2) {
        card.classList.add("far-left");
      } else if (offset === 2) {
        card.classList.add("far-right");
      } else {
        card.classList.add("hidden"); // csak 5 kártya legyen látható
      }
    });
  }

  function clampIndex(i) {
    if (i < 0) return cards.length - 1;
    if (i >= cards.length) return 0;
    return i;
  }

  function goto(i) {
    current = clampIndex(i);
    updateClasses();
    centerCurrent();
  }

  // nyilak
  next?.addEventListener("click", () => goto(current + 1));
  prev?.addEventListener("click", () => goto(current - 1));

  // kártyára kattintás
  cards.forEach((card, i) => card.addEventListener("click", () => goto(i)));

  // egér drag
  let isDown = false, startX = 0, moved = 0;
  const DRAG_THRESHOLD = 40;

  root.addEventListener("mousedown", (e) => { isDown = true; startX = e.clientX; moved = 0; root.classList.add("dragging"); });
  window.addEventListener("mousemove", (e) => { if (isDown) moved = e.clientX - startX; });
  window.addEventListener("mouseup", () => {
    if (!isDown) return; isDown = false; root.classList.remove("dragging");
    if (moved > DRAG_THRESHOLD) goto(current - 1);
    else if (moved < -DRAG_THRESHOLD) goto(current + 1);
  });

  // touch
  let touchStartX = 0, touchMoved = 0;
  root.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; touchMoved = 0; }, { passive: true });
  root.addEventListener("touchmove", (e) => { touchMoved = e.touches[0].clientX - touchStartX; }, { passive: true });
  root.addEventListener("touchend", () => {
    if (touchMoved > DRAG_THRESHOLD) goto(current - 1);
    else if (touchMoved < -DRAG_THRESHOLD) goto(current + 1);
  });

  // görgő / trackpad
  let wheelLock = false;
  const WHEEL_DELAY = 220;
  root.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (wheelLock) return;
    wheelLock = true;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta > 0) goto(current + 1);
    else if (delta < 0) goto(current - 1);
    setTimeout(() => { wheelLock = false; }, WHEEL_DELAY);
  }, { passive: false });

  // resize → maradjon középen
  window.addEventListener("resize", () => { setShift(0); centerCurrent(); });

  // init
  updateClasses();
  setShift(0);
  centerCurrent();
}
