/* GALLERY.JS - builds the 12-photo grid and the lightbox. Edit photos in data-gallery.js */
(function () {
  const grid = document.getElementById("gallery-grid"), lb = document.getElementById("lightbox");
  if (!grid) return;
  const img = lb.querySelector("img"), cap = lb.querySelector(".lb-cap");
  let cur = 0, opener = null;
  grid.innerHTML = GALLERY_IMAGES.map((g, i) => `<button class="g-item reveal" data-i="${i}" aria-label="Open photo: ${g.title}">
    <img src="${g.src}" alt="${g.title}" loading="lazy"><span class="g-cap"><strong>${g.title}</strong>${g.caption}</span></button>`).join("");
  function show(i) {
    cur = (i + GALLERY_IMAGES.length) % GALLERY_IMAGES.length; const g = GALLERY_IMAGES[cur];
    img.classList.remove("in"); setTimeout(() => { img.src = g.src; img.alt = g.title; cap.textContent = g.title + " - " + g.caption; img.classList.add("in"); }, 120);
  }
  function open(i, btn) { opener = btn; lb.hidden = false; document.body.style.overflow = "hidden"; show(i); lb.querySelector(".lb-close").focus(); }
  function close() { lb.hidden = true; document.body.style.overflow = ""; if (opener) opener.focus(); }
  grid.addEventListener("click", e => { const b = e.target.closest(".g-item"); if (b) open(+b.dataset.i, b); });
  lb.querySelector(".lb-close").onclick = close;
  lb.querySelector(".lb-prev").onclick = () => show(cur - 1);
  lb.querySelector(".lb-next").onclick = () => show(cur + 1);
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); });
})();
