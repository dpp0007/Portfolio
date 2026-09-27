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
  // the editor can ask the preview to jump to the section being edited
  window.addEventListener("message", function (e) {
    if (e.origin !== location.origin || !e.data || !e.data.dpScrollTo) return;
    var el = document.getElementById(e.data.dpScrollTo);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
  });
})();
