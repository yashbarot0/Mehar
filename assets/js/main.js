(function () {
  var PHONE = "919898976381";
  var data = window.SITE_DATA || { projects: [], ventures: [] };

  var ICONS = {
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    photos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>'
  };

  var STATUS_LABEL = { completed: "Completed", ongoing: "Ongoing", booking: "Booking Open", upcoming: "Coming Soon" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function waLink(text) {
    return "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(text);
  }

  /* ---------- Header: mobile menu, active link, year ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  var page = location.pathname.split("/").pop().replace(".html", "") || "index";
  document.querySelectorAll(".nav-links a[data-page]").forEach(function (a) {
    if (a.dataset.page === page) a.setAttribute("aria-current", "page");
  });

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Lightbox ---------- */
  var lb, lbImg, lbCap, lbSet = [], lbIdx = 0, lbTitle = "";

  function buildLightbox() {
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.hidden = true;
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.innerHTML =
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button class="lb-btn lb-close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
      '<button class="lb-btn lb-prev" aria-label="Previous photo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m15 18-6-6 6-6"/></svg></button>' +
      '<button class="lb-btn lb-next" aria-label="Next photo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg></button>';
    document.body.appendChild(lb);
    lbImg = lb.querySelector("img");
    lbCap = lb.querySelector("figcaption");
    lb.querySelector(".lb-close").onclick = closeLightbox;
    lb.querySelector(".lb-prev").onclick = function () { showSlide(lbIdx - 1); };
    lb.querySelector(".lb-next").onclick = function () { showSlide(lbIdx + 1); };
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showSlide(lbIdx - 1);
      if (e.key === "ArrowRight") showSlide(lbIdx + 1);
    });
  }

  function showSlide(i) {
    lbIdx = (i + lbSet.length) % lbSet.length;
    var title = Array.isArray(lbTitle) ? lbTitle[lbIdx] : lbTitle;
    lbImg.src = lbSet[lbIdx];
    lbImg.alt = title + " photo " + (lbIdx + 1);
    lbCap.textContent = title + (lbSet.length > 1 ? "  ·  " + (lbIdx + 1) + " / " + lbSet.length : "");
    var multi = lbSet.length > 1;
    lb.querySelector(".lb-prev").hidden = !multi;
    lb.querySelector(".lb-next").hidden = !multi;
  }

  // title may be a single string or one caption per image
  function openLightbox(images, title, start) {
    if (!images || !images.length) return;
    if (!lb) buildLightbox();
    lbSet = images;
    lbTitle = title;
    showSlide(start || 0);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lb.hidden = true;
    document.body.style.overflow = "";
  }

  /* ---------- Cards ---------- */
  // Small copy of a photo for cards and gallery tiles: /a/b/01.jpg -> /a/b/thumbs/01.jpg
  function thumb(src) {
    return src.replace(/([^/]+)$/, "thumbs/$1");
  }

  function media(item) {
    var imgs = item.images || [];
    var cover = imgs.length
      ? '<img src="' + esc(thumb(imgs[0])) + '" alt="' + esc(item.title) + '" loading="lazy">'
      : '<div class="placeholder">' + ICONS.building + "</div>";
    var count = imgs.length > 1 ? '<span class="count">' + ICONS.photos + imgs.length + "</span>" : "";
    var badge = item.status
      ? '<span class="badge ' + esc(item.status) + '">' + esc(STATUS_LABEL[item.status] || item.status) + "</span>"
      : "";
    return '<button class="project-media" type="button" aria-label="View photos of ' + esc(item.title) + '">' + cover + badge + count + "</button>";
  }

  function projectCard(p) {
    var meta = [];
    if (p.location) meta.push("<span>" + ICONS.pin + esc(p.location) + "</span>");
    if (p.category) meta.push("<span>" + ICONS.tag + esc(p.category) + "</span>");
    if (p.year) meta.push("<span>" + ICONS.cal + esc(p.year) + "</span>");
    return (
      '<article class="project">' + media(p) +
      '<div class="project-body"><h3>' + esc(p.title) + "</h3>" +
      '<div class="project-meta">' + meta.join("") + "</div>" +
      (p.description ? "<p>" + esc(p.description) + "</p>" : "") +
      "</div></article>"
    );
  }

  function ventureCard(v) {
    var meta = [];
    if (v.location) meta.push("<span>" + ICONS.pin + esc(v.location) + "</span>");
    if (v.type) meta.push("<span>" + ICONS.tag + esc(v.type) + "</span>");
    var hl = (v.highlights || []).map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("");
    return (
      '<article class="project">' + media(v) +
      '<div class="project-body"><h3>' + esc(v.title) + "</h3>" +
      '<div class="project-meta">' + meta.join("") + "</div>" +
      (v.description ? "<p>" + esc(v.description) + "</p>" : "") +
      (hl ? '<ul class="highlights">' + hl + "</ul>" : "") +
      '<div class="actions">' +
      '<a class="btn btn-primary" target="_blank" rel="noopener" href="' +
      waLink("Hello Mehar Associates, I am interested in " + v.title + ". Please share more details.") +
      '">Enquire on WhatsApp</a>' +
      '<a class="btn btn-ghost" href="tel:+' + PHONE + '">Call</a>' +
      "</div></div></article>"
    );
  }

  function render(el, items, cardFn, emptyHtml) {
    if (!items.length) {
      el.innerHTML = '<div class="empty">' + emptyHtml + "</div>";
      el.style.display = "block";
      return;
    }
    el.style.display = "";
    el.innerHTML = items.map(cardFn).join("");
    el.querySelectorAll(".project-media").forEach(function (btn, i) {
      btn.addEventListener("click", function () { openLightbox(items[i].images, items[i].title); });
    });
  }

  var EMPTY_PROJECTS = "<h3>Project photos coming soon</h3><p>We're adding our latest work here. Call us to see our portfolio.</p>";
  var EMPTY_VENTURES = "<h3>New ventures coming soon</h3><p>Contact us to hear about upcoming schemes first.</p>";

  // Projects page (with filters) and home page preview
  var projectsEl = document.getElementById("projects-grid");
  if (projectsEl) {
    var limit = parseInt(projectsEl.dataset.limit, 10) || 0;
    var all = data.projects || [];
    var filtersEl = document.getElementById("project-filters");

    if (filtersEl) {
      var cats = ["All"];
      all.forEach(function (p) { if (p.category && cats.indexOf(p.category) < 0) cats.push(p.category); });
      ["Ongoing", "Completed"].forEach(function (s) {
        if (all.some(function (p) { return STATUS_LABEL[p.status] === s; })) cats.push(s);
      });
      filtersEl.innerHTML = cats.map(function (c, i) {
        return '<button class="filter" type="button" aria-pressed="' + (i === 0) + '">' + esc(c) + "</button>";
      }).join("");
      filtersEl.hidden = all.length < 2;
      filtersEl.addEventListener("click", function (e) {
        var b = e.target.closest(".filter");
        if (!b) return;
        filtersEl.querySelectorAll(".filter").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        var f = b.textContent;
        render(projectsEl, all.filter(function (p) {
          return f === "All" || p.category === f || STATUS_LABEL[p.status] === f;
        }), projectCard, EMPTY_PROJECTS);
      });
    }
    render(projectsEl, limit ? all.slice(0, limit) : all, projectCard, EMPTY_PROJECTS);
  }

  var venturesEl = document.getElementById("ventures-grid");
  if (venturesEl) render(venturesEl, data.ventures || [], ventureCard, EMPTY_VENTURES);

  /* ---------- Gallery: every project photo ---------- */
  var galleryEl = document.getElementById("gallery-grid");
  if (galleryEl) {
    var gSrc = [], gCap = [];
    (data.projects || []).forEach(function (p) {
      (p.images || []).forEach(function (src) { gSrc.push(src); gCap.push(p.title); });
    });
    galleryEl.innerHTML = gSrc.map(function (src, i) {
      return '<button class="gallery-item" type="button" data-i="' + i + '" aria-label="Open photo: ' + esc(gCap[i]) + '">' +
        '<img src="' + esc(thumb(src)) + '" alt="' + esc(gCap[i]) + '" loading="lazy"></button>';
    }).join("");
    galleryEl.addEventListener("click", function (e) {
      var b = e.target.closest(".gallery-item");
      if (b) openLightbox(gSrc, gCap, +b.dataset.i);
    });
  }

  /* ---------- Contact form → WhatsApp ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements;
      var msg =
        "Hello Mehar Associates,\n\n" +
        "Name: " + f.name.value.trim() + "\n" +
        "Phone: " + f.phone.value.trim() + "\n" +
        "Service: " + f.service.value + "\n\n" +
        f.message.value.trim();
      window.open(waLink(msg), "_blank", "noopener");
    });
  }
})();
