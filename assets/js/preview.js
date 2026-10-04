/* Live preview for the content editor (edit.html).
   index.html?preview renders the editor's unsaved draft instead of data.js,
   skips the opening, and keeps its scroll position between live reloads.
   Normal visits are unaffected. */
(function () {
  if (!/[?&]preview\b/.test(location.search)) return;
  try {
    var draft = localStorage.getItem("dp-draft");
    if (draft) window.PORTFOLIO = JSON.parse(draft);
    sessionStorage.setItem("dp-opened", "1");
  } catch (e) {}
  document.documentElement.classList.add("is-preview");
  var KEY = "dp-preview-scroll";
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.addEventListener("load", function () {
    var y = +(sessionStorage.getItem(KEY) || 0);
    if (y) window.scrollTo({ top: y, behavior: "instant" });
    window.addEventListener("scroll", function () { sessionStorage.setItem(KEY, String(Math.round(window.scrollY))); }, { passive: true });
  });
  // photos uploaded in the editor but not yet published live in IndexedDB;
  // swap their future paths for the stored files (also for images added later, e.g. the lightbox)
  var pend = [];
  try { pend = JSON.parse(localStorage.getItem("dp-pending-images") || "[]"); } catch (e) {}
  if (pend.length && window.indexedDB) {
    var urls = {};
    var swap = function (root) {
      (root.querySelectorAll ? root.querySelectorAll("img[src]") : []).forEach(function (img) {
        var u = urls[img.getAttribute("src")];
        if (u) img.src = u;
      });
    };
    var req = indexedDB.open("dp-editor", 1);
    req.onupgradeneeded = function () { req.result.createObjectStore("images"); };
    req.onsuccess = function () {
      var st = req.result.transaction("images", "readonly").objectStore("images"), left = pend.length;
      pend.forEach(function (p) {
        var g = st.get(p);
        g.onsuccess = function () {
          if (g.result) urls[p] = URL.createObjectURL(g.result);
          if (--left === 0) {
            swap(document);
            new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) { swap(n); if (n.tagName === "IMG" && urls[n.getAttribute("src")]) n.src = urls[n.getAttribute("src")]; } }); }); })
              .observe(document.documentElement, { childList: true, subtree: true });
          }
        };
      });
    };
  }

  // the editor can ask the preview to jump to the section being edited
  window.addEventListener("message", function (e) {
    if (e.origin !== location.origin || !e.data || !e.data.dpScrollTo) return;
    var el = document.getElementById(e.data.dpScrollTo);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
  });
})();
