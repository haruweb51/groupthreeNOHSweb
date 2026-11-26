/* MAIN.JS - builds the shared header/footer and fills in content from the
   config and data files. You normally do NOT need to edit this file. */
(function () {
  const C = SCHOOL_CONFIG, page = document.body.dataset.page;
  const NAV = [["home","index.html","Home"],["about","about.html","About"],["academics","academics.html","Academics"],
               ["gallery","gallery.html","Gallery"],["members","members.html","Website Members"],["contact","contact.html","Contact Us"]];
  const FB_ICON = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.55-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.34l-.53 3.49h-2.81V24C19.61 23.1 24 18.1 24 12.07z"/></svg>';
  const $ = (s, r = document) => r.querySelector(s);

  // ----- Fixed page background (SCHOOL_CONFIG.background). It stays still while scrolling. -----
  if (C.background) {
    const bg = document.createElement("div"); bg.className = "site-bg"; bg.setAttribute("aria-hidden", "true");
    bg.style.backgroundImage = `url("${C.background}")`; document.body.prepend(bg);
  }

  // ----- Header -----
  $("#site-header").outerHTML = `
  <header class="site-header"><div class="container nav-wrap">
    <a class="brand" href="index.html"><img src="${C.logo}" alt="${C.shortName} logo" width="56" height="56"><span class="brand-text"><span class="brand-name">${C.name}</span><span class="brand-sub">${C.location.split(",")[0]} &middot; Est. ${C.established}</span></span></a>
    <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
    <nav id="nav" class="nav" aria-label="Main">${NAV.map(n =>
      `<a href="${n[1]}" ${n[0] === page ? 'class="active" aria-current="page"' : ""}>${n[2]}</a>`).join("")}</nav>
  </div></header>`;

  // ----- Footer -----
  $("#site-footer").outerHTML = `
  <footer class="site-footer"><div class="container footer-grid">
    <div><a class="brand" href="index.html"><img src="${C.logo}" alt="${C.shortName} logo" width="56" height="56"><span class="brand-text"><span class="brand-name">${C.name}</span><span class="brand-sub">${C.location.split(",")[0]} &middot; Est. ${C.established}</span></span></a>
      <p>${C.footerDescription}</p></div>
    <div><h3>Quick links</h3><ul>${NAV.map(n => `<li><a href="${n[1]}">${n[2]}</a></li>`).join("")}</ul></div>
    <div><h3>Follow us</h3><a class="btn btn-fb" href="${C.facebook}" target="_blank" rel="noopener">${FB_ICON}<span>Facebook</span></a></div>
  </div>
  <div class="container footer-bottom"><p>&copy; <span id="yr"></span> ${C.name}. All rights reserved.</p><p>${C.creditsLine} <a href="members.html">Meet the team</a></p></div></footer>
  <button class="to-top" id="toTop" aria-label="Back to top">&#8593;</button>`;
  $("#yr").textContent = new Date().getFullYear();

  // ----- Fill text from config: <span data-cfg="contact.phone"> -----
  document.querySelectorAll("[data-cfg]").forEach(el => {
    const v = el.dataset.cfg.split(".").reduce((o, k) => (o ? o[k] : undefined), C);
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll(".js-logo").forEach(i => (i.src = C.logo));
  document.querySelectorAll(".js-facebook").forEach(a => { a.href = C.facebook; a.target = "_blank"; a.rel = "noopener"; });
  document.querySelectorAll(".js-fb-icon").forEach(s => (s.innerHTML = FB_ICON));
  const hero = $(".hero");
  if (hero) {
    // Banner: big images fill the hero. Small images are NOT stretched: they stay at their own size,
    // centered, and a blurred copy of the same picture fills the rest of the space.
    hero.insertAdjacentHTML("afterbegin", `<div class="hero-bg" aria-hidden="true"><div class="hero-bg-blur"></div><img class="hero-bg-img" src="${C.banner}" alt=""></div>`);
    hero.querySelector(".hero-bg-blur").style.backgroundImage = `url("${C.banner}")`;
    const bi = hero.querySelector(".hero-bg-img");
    const fit = () => hero.classList.toggle("hero-small", !(bi.naturalWidth >= hero.offsetWidth && bi.naturalHeight >= hero.offsetHeight));
    bi.addEventListener("load", fit); if (bi.complete) fit(); addEventListener("resize", fit);
  }
  document.querySelectorAll(".js-intro-img").forEach(i => (i.src = C.introImage));

  // ----- Card lists -----
  const fill = (id, arr, fn) => { const el = document.getElementById(id); if (el) el.innerHTML = arr.map(fn).join(""); };
  fill("highlights", C.highlights, h => `<a class="card reveal" href="${h.link}"><h3>${h.title}</h3><p>${h.text}</p><span class="more">Read more</span></a>`);
  fill("quicknav", NAV.filter(n => ["about","academics","gallery","contact"].includes(n[0])), n =>
    `<a class="card quick reveal" href="${n[1]}"><h3>${n[2]}</h3><span class="more">Open ${n[2]}</span></a>`);
  fill("programs", ACADEMIC_PROGRAMS, p => `<article class="card reveal"><img src="${p.image}" alt="${p.name}" loading="lazy"><div class="card-body"><h3>${p.name}</h3><p>${p.description}</p></div></article>`);
  fill("learning", C.academics.learning, l => `<article class="card reveal"><img src="${l.images[0]}" alt="${l.title} - click to view photos" loading="lazy"><div class="card-body"><h3>${l.title}</h3><p>${l.text}</p></div></article>`);
  fill("activities", SCHOOL_ACTIVITIES, a => `<article class="card reveal"><h3>${a.title}</h3><p>${a.text}</p></article>`);
  fill("members-grid", WEBSITE_MEMBERS, m => `<article class="card member reveal"><img src="${m.photo}" alt="Photo of ${m.name}" loading="lazy"><div class="card-body"><h3>${m.name}</h3><p class="role">${m.role}</p><p>${m.description}</p><p><strong>Contribution:</strong> ${m.contribution}</p></div></article>`);
  fill("goals", C.about.goals, g => `<li>${g}</li>`);
  fill("values", C.about.values, v => `<li>${v}</li>`);
  fill("profile", C.about.profile, r => `<tr><th scope="row">${r.label}</th><td>${r.value}</td></tr>`);
  fill("timeline", C.about.timeline, t => `<li class="reveal"><span class="year">${t.year}</span><p>${t.text}</p></li>`);
  fill("history-photos", C.about.historyPhotos, p => `<figure class="reveal"><img src="${p.src}" alt="${p.alt}" loading="lazy"><figcaption>${p.caption}</figcaption></figure>`);

  // ----- Menu, back-to-top, page transitions -----
  const toggle = $(".nav-toggle"), nav = $("#nav");
  toggle.addEventListener("click", () => { const o = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", o); });
  const top = $("#toTop");
  addEventListener("scroll", () => top.classList.toggle("show", scrollY > 500), { passive: true });
  top.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  document.querySelectorAll("a[href]").forEach(a => a.addEventListener("click", e => {
    const h = a.getAttribute("href");
    if (a.target || e.ctrlKey || e.metaKey || /^(https?:|mailto:|#)/.test(h)) return;
    e.preventDefault(); document.body.classList.add("leaving"); setTimeout(() => (location.href = h), 250);
  }));
  addEventListener("pageshow", () => document.body.classList.remove("leaving"));
  addEventListener("load", () => setTimeout(() => document.body.classList.add("loaded"), 450));
})();
