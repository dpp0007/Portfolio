/* ==========================================================================
   PORTFOLIO EDITOR
   Builds a form from assets/js/data.js, keeps an autosaved draft in this
   browser, shows it live in the preview (index.html?preview), and exports
   or publishes the result as a new data.js.
   The form is generated from the data itself, so new fields added to
   data.js appear here automatically. META only adds labels and hints.
   ========================================================================== */
(function () {
  "use strict";

  var DRAFT_KEY = "dp-draft";
  var PUBLISHED = clone(window.PORTFOLIO || {});
  var data = loadDraft();
  var openCards = {};

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function same(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function store(kind, key, val) {
    try {
      if (val === undefined) return window[kind].getItem(key);
      if (val === null) window[kind].removeItem(key); else window[kind].setItem(key, val);
    } catch (e) { return null; }
    return true;
  }
  function loadDraft() {
    var d = store("localStorage", DRAFT_KEY);
    if (d) {
      try {
        var parsed = JSON.parse(d);
        if (!same(parsed, PUBLISHED)) return parsed;
        store("localStorage", DRAFT_KEY, null); // draft already published
      } catch (e) {}
    }
    return clone(PUBLISHED);
  }

  /* ------------------------------------------------------------ sections + labels */
  var SECTIONS = [
    { key: "person", title: "Identity", anchor: "home", help: "Name, landing stats, class tabs, robot lines and contact links. Used on the landing page, in the opening and in Contact." },
    { key: "intro", title: "Opening", anchor: "home", help: "The three word slams at the start of the story (one per beat)." },
    { key: "profile", title: "Profile", anchor: "about", help: "The Character Profile section: status screen, stats, backstory, traits and interests." },
    { key: "projects", title: "Projects", anchor: "projects", help: "Each project is a chapter. The first three also appear in the opening." },
    { key: "journey", title: "Journey", anchor: "journey", help: "Timeline milestones, oldest first. Tick “current” on the one you are in now." },
    { key: "skills", title: "Skills", anchor: "skills", help: "Grouped abilities. For each one, pick where you actually used it." },
    { key: "evidence", title: "Skill sources", anchor: "skills", help: "The places a skill can point to. The id is internal; the label is what visitors see. Renaming an id updates every skill that uses it." },
    { key: "achievements", title: "Achievements", anchor: "achievements", help: "Wins, podiums and recognitions. Rank decides the stamp." },
    { key: "lab", title: "Studio", anchor: "lab", help: "Experiments and side quests." },
    { key: "now", title: "Current arc", anchor: "now", help: "What you're building, learning and planning right now." },
  ];
  var META = {
    name: { label: "Name" },
    first: { label: "First name", help: "The big first line on the landing, cover and title card." },
    last: { label: "Last name", help: "The big red second line." },
    katakana: { label: "Name in katakana", help: "Shown under your name on the Profile card." },
    volume: { label: "Volume label" },
    arc: { label: "Arc title", help: "Shown on the cover and the landing." },
    roles: { label: "Roles", help: "Short list of what you do." },
    classes: { label: "Class tabs", help: "The tabs under your name on the landing. “Short” is the tab label; the full name shows when selected." },
    heroStats: { label: "Landing stats", help: "Shown under your name and smashed in during the opening. The first one gets the final ドン!" },
    quips: { label: "Robot lines", help: "What the robot says when someone pokes it." },
    tagline: { label: "Tagline", long: true, help: "Types itself out under your name." },
    location: { label: "Location" },
    email: { label: "Email", type: "email" },
    github: { label: "GitHub URL", type: "url" },
    linkedin: { label: "LinkedIn URL", type: "url" },
    portrait: { label: "Portrait image", help: "Optional path like assets/img/me.jpg. Leave empty to show the robot." },
    updated: { label: "Last updated", help: "Shown in the Current Arc section, e.g. “October 2026”." },
    words: { label: "Word slams" },
    word: { label: "Word" },
    caption: { label: "Caption" },
    class: { label: "Class line" },
    guild: { label: "Guild (school / team)" },
    base: { label: "Base (city)" },
    focus: { label: "Current focus" },
    stats: { label: "Stats", help: "Real numbers only. Decimals: how many decimal places to show." },
    story: { label: "Backstory paragraphs", long: true },
    traits: { label: "Traits" },
    interests: { label: "Interests" },
    value: { label: "Value", type: "number" },
    suffix: { label: "Suffix", help: "e.g. + or ×" },
    decimals: { label: "Decimals", type: "number" },
    short: { label: "Short label" },
    desc: { label: "Description", long: true },
    id: { label: "Id", help: "Lowercase, no spaces. Used by skills to link here." },
    subtitle: { label: "Subtitle" },
    year: { label: "Year" },
    status: { label: "Status", help: "e.g. Built, In development, Shipped." },
    problem: { label: "Problem it solves", long: true },
    role: { label: "Your role" },
    stack: { label: "Tech stack" },
    features: { label: "Key features" },
    outcome: { label: "Outcome", long: true, help: "Optional: result, award or metric." },
    art: { label: "Illustration", options: ["elixra", "mensa", "peerq", "generic"], help: "Built-in drawing used when there is no screenshot." },
    image: { label: "Screenshot", help: "Optional path like assets/img/elixra.png. Replaces the illustration." },
    links: { label: "Links" },
    live: { label: "Live demo URL", type: "url" },
    source: { label: "Source code URL", type: "url" },
    when: { label: "When" },
    kind: { label: "Type" },
    place: { label: "Where / what" },
    text: { label: "Text", long: true },
    current: { label: "This is the current chapter" },
    category: { label: "Category" },
    glyph: { label: "Icon text", help: "1–3 characters shown in the hexagon." },
    items: { label: "Abilities" },
    used: { label: "Used in" },
    rank: { label: "Rank", options: ["1st", "2nd", "3rd", "RU", "★"], help: "RU = runner-up, ★ = other recognition." },
    result: { label: "Result" },
    origin: { label: "From" },
    building: { label: "Building" },
    learning: { label: "Learning" },
    experimenting: { label: "Experimenting" },
    goals: { label: "Goals" },
    ideas: { label: "Upcoming ideas" },
  };
  var META_PATH = { "person.name": { label: "Full name", help: "Used in the page title, credits and footer." }, "profile.class": { label: "Class line" } };
  function meta(key, path) {
    var p = path ? path.filter(function (k) { return typeof k !== "number"; }).join(".") : "";
    return META_PATH[p] || META[key] || { label: String(key).replace(/([A-Z])/g, " $1").replace(/^./, function (c) { return c.toUpperCase(); }) }; }

  /* ------------------------------------------------------------ path helpers */
  function get(obj, path) { return path.reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj); }
  function set(path, value) {
    var parent = get(data, path.slice(0, -1));
    parent[path[path.length - 1]] = value;
  }
  function pubAt(path) { return get(PUBLISHED, path); }
  function templateFor(path) {
    // the first published item at the same place in the tree, for new items
    var p = path.map(function (k) { return typeof k === "number" ? 0 : k; });
    var list = get(PUBLISHED, p) || get(data, p);
    return list && list.length ? list[0] : undefined;
  }
  function blank(v) {
    if (Array.isArray(v)) return [];
    if (v === null) return null;
    if (typeof v === "object") { var o = {}; Object.keys(v).forEach(function (k) { o[k] = blank(v[k]); }); return o; }
    if (typeof v === "number") return 0;
    if (typeof v === "boolean") return false;
    return "";
  }
  function summary(item, i) {
    if (!item || typeof item !== "object") return "Item " + (i + 1);
    var t = item.name || item.title || item.word || item.category || item.label || item.result;
    if (!t) Object.keys(item).some(function (k) { if (typeof item[k] === "string" && item[k]) { t = item[k]; return true; } });
    return t || "Untitled";
  }

  /* ------------------------------------------------------------ DOM helper */
  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") el.textContent = attrs[k];
      else if (k.slice(0, 2) === "on") el.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null && attrs[k] !== false) el.setAttribute(k, attrs[k] === true ? "" : attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) el.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return el;
  }
  function iconBtn(label, sym, fn, cls) { return h("button", { type: "button", class: "ed-icon" + (cls ? " " + cls : ""), "aria-label": label, title: label, text: sym, onclick: fn }); }

  /* ------------------------------------------------------------ renderers */
  function renderValue(val, path, key, depth) {
    var m = meta(key, path);
    if (key === "used" && Array.isArray(val)) return renderUsed(val, path, m);
    if (Array.isArray(val)) {
      var tpl = val.length ? val[0] : templateFor(path);
      if (tpl && typeof tpl === "object") return renderCards(val, path, key, m, depth);
      return renderStrings(val, path, key, m);
    }
    if (val && typeof val === "object") {
      if (path.length === 1 && path[0] === "evidence") return renderMap(val, path);
      var kids = Object.keys(val).map(function (k) { return renderValue(val[k], path.concat(k), k, depth + 1); });
      if (depth === 0) return h("div", null, kids);
      return h("fieldset", { class: "ed-group" }, [h("legend", { text: m.label })].concat(kids));
    }
    return renderField(val, path, key, m);
  }

  function markChanged(wrap, path) {
    wrap.classList.toggle("is-changed", !same(get(data, path), pubAt(path)));
  }

  function renderField(val, path, key, m) {
    var wrap = h("label", { class: m.type === "checkbox" || typeof val === "boolean" ? "ed-check" : "ed-field" });
    var input, wasNull = val === null;
    if (typeof val === "boolean") {
      input = h("input", { type: "checkbox" });
      input.checked = val;
      input.addEventListener("change", function () { set(path, input.checked); markChanged(wrap, path); changed(); });
      wrap.appendChild(input); wrap.appendChild(document.createTextNode(" " + m.label));
      return wrap;
    }
    wrap.appendChild(h("span", { text: m.label }));
    if (m.options) {
      input = h("select", null, m.options.map(function (o) { return h("option", { value: o, text: o }); }));
      input.value = val;
    } else if (m.long || (typeof val === "string" && val.length > 90)) {
      input = h("textarea", { rows: 3 });
      input.value = val == null ? "" : val;
    } else {
      input = h("input", { type: typeof val === "number" ? "number" : (m.type || "text"), step: typeof val === "number" ? "any" : null });
      input.value = val == null ? "" : val;
    }
    input.addEventListener("input", function () {
      var v = input.value;
      if (typeof val === "number") v = v === "" ? 0 : parseFloat(v);
      else if (wasNull && v.trim() === "") v = null;
      set(path, v);
      markChanged(wrap, path);
      liveTitle(wrap);
      changed();
    });
    wrap.appendChild(input);
    if (m.help) wrap.appendChild(h("small", { text: m.help }));
    markChanged(wrap, path);
    return wrap;
  }

  function renderStrings(list, path, key, m) {
    var box = h("div", { class: "ed-list" });
    var label = h("span", { class: "ed-label", text: m.label });
    var rows = h("div", { class: "ed-list" });
    function draw() {
      rows.innerHTML = "";
      list.forEach(function (s, i) {
        var long = m.long || (s && s.length > 90);
        var inp = long ? h("textarea", { rows: 3 }) : h("input", { type: "text" });
        inp.value = s;
        inp.addEventListener("input", function () { list[i] = inp.value; changed(); });
        rows.appendChild(h("div", { class: "ed-row" }, [
          inp,
          iconBtn("Move up", "↑", function () { if (i > 0) { list.splice(i - 1, 0, list.splice(i, 1)[0]); draw(); changed(); } }),
          iconBtn("Remove", "✕", function () { list.splice(i, 1); draw(); changed(); }, "ed-icon--del"),
        ]));
      });
    }
    draw();
    var add = h("button", { type: "button", class: "ed-add", text: "+ Add " + m.label.toLowerCase().replace(/s$/, ""), onclick: function () {
      list.push(""); draw(); changed();
      var last = rows.lastElementChild; if (last) last.firstChild.focus();
    } });
    box.appendChild(label);
    box.appendChild(rows);
    box.appendChild(add);
    if (m.help) box.appendChild(h("small", { class: "ed-field", text: m.help }));
    return box;
  }

  function renderCards(list, path, key, m, depth) {
    var box = h("div", { class: "ed-cards" });
    var label = depth > 0 ? h("span", { class: "ed-label", text: m.label }) : null;
    function draw() {
      box.innerHTML = "";
      if (label) box.appendChild(label);
      if (m.help && depth > 0) box.appendChild(h("small", { class: "ed-sec__help", text: m.help }));
      list.forEach(function (item, i) {
        var p = path.concat(i), id = p.join(".");
        var body = h("div", { class: "ed-card__body" }, Object.keys(item).map(function (k) { return renderValue(item[k], p.concat(k), k, depth + 1); }));
        var card = h("div", { class: "ed-card" + (openCards[id] ? " is-open" : "") });
        var head = h("div", { class: "ed-card__head", role: "button", tabindex: "0", "aria-expanded": openCards[id] ? "true" : "false" }, [
          h("span", { class: "ed-card__idx", text: String(i + 1).padStart(2, "0") }),
          h("span", { class: "ed-card__title", text: summary(item, i) }),
          h("span", { class: "ed-card__tools" }, [
            iconBtn("Move up", "↑", function (e) { e.stopPropagation(); if (i > 0) { list.splice(i - 1, 0, list.splice(i, 1)[0]); draw(); changed(); } }),
            iconBtn("Move down", "↓", function (e) { e.stopPropagation(); if (i < list.length - 1) { list.splice(i + 1, 0, list.splice(i, 1)[0]); draw(); changed(); } }),
            iconBtn("Duplicate", "⧉", function (e) { e.stopPropagation(); list.splice(i + 1, 0, clone(item)); openCards[path.concat(i + 1).join(".")] = true; draw(); changed(); }),
            iconBtn("Delete", "✕", function (e) { e.stopPropagation(); if (confirm("Delete “" + summary(item, i) + "”?")) { list.splice(i, 1); draw(); changed(); } }, "ed-icon--del"),
          ]),
          h("span", { class: "ed-card__chev", "aria-hidden": "true" }),
        ]);
        function toggle() {
          openCards[id] = !card.classList.contains("is-open");
          card.classList.toggle("is-open", openCards[id]);
          head.setAttribute("aria-expanded", openCards[id] ? "true" : "false");
        }
        head.addEventListener("click", toggle);
        head.addEventListener("keydown", function (e) { if ((e.key === "Enter" || e.key === " ") && e.target === head) { e.preventDefault(); toggle(); } });
        card.__list = list;
        card.appendChild(head);
        card.appendChild(body);
        box.appendChild(card);
      });
      box.appendChild(h("button", { type: "button", class: "ed-add", text: "+ Add " + singular(m.label), onclick: function () {
        var tpl = list.length ? list[list.length - 1] : templateFor(path);
        list.push(blank(tpl || { title: "" }));
        openCards[path.concat(list.length - 1).join(".")] = true;
        draw(); changed();
        var cards = $$(".ed-card", box), c = cards[cards.length - 1];
        if (c) { c.scrollIntoView({ block: "nearest" }); var f = $("input, textarea", c); if (f) f.focus(); }
      } }));
    }
    draw();
    return box;
  }
  function singular(s) { s = s.toLowerCase(); return /ies$/.test(s) ? s.replace(/ies$/, "y") : s.replace(/s$/, ""); }

  // skills → "used in" is a set of toggles built from Skill sources
  function renderUsed(list, path, m) {
    var box = h("div");
    box.appendChild(h("span", { class: "ed-label", text: m.label }));
    var chips = h("div", { class: "ed-chips" });
    Object.keys(data.evidence || {}).forEach(function (id) {
      var b = h("button", { type: "button", class: "ed-chip", "aria-pressed": list.indexOf(id) > -1 ? "true" : "false", text: data.evidence[id] });
      b.addEventListener("click", function () {
        var at = list.indexOf(id);
        if (at > -1) list.splice(at, 1); else list.push(id);
        b.setAttribute("aria-pressed", at > -1 ? "false" : "true");
        changed();
      });
      chips.appendChild(b);
    });
    box.appendChild(chips);
    return box;
  }

  // evidence: id → label, with safe renames
  function renderMap(obj, path) {
    var box = h("div", { class: "ed-list" });
    function draw() {
      box.innerHTML = "";
      box.appendChild(h("div", { class: "ed-row" }, [h("span", { class: "ed-label", text: "Id" }), h("span", { class: "ed-label", text: "Label", style: "flex:1.4" }), h("span", { style: "width:34px" })]));
      Object.keys(obj).forEach(function (id) {
        var k = h("input", { type: "text", value: id, "aria-label": "Id" });
        var v = h("input", { type: "text", value: obj[id], "aria-label": "Label", style: "flex:1.4" });
        k.addEventListener("change", function () {
          var nk = k.value.trim().toLowerCase().replace(/\s+/g, "-");
          if (!nk || nk === id || obj[nk] !== undefined) { k.value = id; return; }
          var rebuilt = {};
          Object.keys(obj).forEach(function (x) { rebuilt[x === id ? nk : x] = obj[x]; });
          Object.keys(obj).forEach(function (x) { delete obj[x]; });
          Object.assign(obj, rebuilt);
          (data.skills || []).forEach(function (g) { (g.items || []).forEach(function (s) { s.used = (s.used || []).map(function (u) { return u === id ? nk : u; }); }); });
          renderForm(); changed();
        });
        v.addEventListener("input", function () { obj[id] = v.value; changed(); });
        box.appendChild(h("div", { class: "ed-row" }, [k, v, iconBtn("Remove", "✕", function () {
          delete obj[id];
          (data.skills || []).forEach(function (g) { (g.items || []).forEach(function (s) { s.used = (s.used || []).filter(function (u) { return u !== id; }); }); });
          renderForm(); changed();
        }, "ed-icon--del")]));
      });
      box.appendChild(h("button", { type: "button", class: "ed-add", text: "+ Add source", onclick: function () {
        var n = 1; while (obj["new-" + n] !== undefined) n++;
        obj["new-" + n] = "New source"; draw(); changed();
      } }));
    }
    draw();
    return box;
  }

  // keep a card's title in sync while you type in it
  function liveTitle(fieldWrap) {
    var card = fieldWrap.closest(".ed-card");
    if (!card || !card.__list) return;
    var idx = $$(":scope > .ed-card", card.parentNode).indexOf(card);
    if (card.__list[idx]) $(".ed-card__title", card).textContent = summary(card.__list[idx], idx);
  }

  /* ------------------------------------------------------------ form + nav */
  var form = $("#ed-form"), nav = $("#ed-nav");
  function renderForm() {
    var y = form.scrollTop;
    form.innerHTML = "";
    SECTIONS.forEach(function (s, i) {
      if (data[s.key] === undefined) return;
      var sec = h("section", { class: "ed-sec", id: "sec-" + s.key, "data-anchor": s.anchor }, [
        h("div", { class: "ed-sec__head" }, [h("span", { class: "ed-sec__num", text: String(i + 1).padStart(2, "0") }), h("h2", { text: s.title })]),
        h("p", { class: "ed-sec__help", text: s.help || "" }),
        renderValue(data[s.key], [s.key], s.key, 0),
      ]);
      form.appendChild(sec);
    });
    form.scrollTop = y;
  }
  SECTIONS.forEach(function (s, i) {
    nav.appendChild(h("button", { type: "button", "data-sec": s.key, onclick: function () {
      $("#sec-" + s.key).scrollIntoView({ behavior: "smooth", block: "start" });
      previewTo(s.anchor);
      setCurrent(s.key);
    } }, [h("span", { text: String(i + 1).padStart(2, "0") }), s.title]));
  });
  function setCurrent(key) { $$("button", nav).forEach(function (b) { b.setAttribute("aria-current", b.dataset.sec === key ? "true" : "false"); }); }
  var lastAnchor = null;
  form.addEventListener("focusin", function (e) {
    var sec = e.target.closest(".ed-sec");
    if (!sec) return;
    setCurrent(sec.id.replace("sec-", ""));
    if (sec.dataset.anchor !== lastAnchor) previewTo(sec.dataset.anchor);
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setCurrent(en.target.id.replace("sec-", "")); });
    }, { root: form, rootMargin: "0px 0px -70% 0px" });
    var observe = function () { $$(".ed-sec", form).forEach(function (s) { io.observe(s); }); };
    var _render = renderForm;
    renderForm = function () { _render(); observe(); };
  }

  /* ------------------------------------------------------------ saving + preview */
  var iframe = $("#ed-iframe"), saveT, reloadT;
  function changed() {
    clearTimeout(saveT);
    saveT = setTimeout(save, 250);
    clearTimeout(reloadT);
    $(".ed-live").classList.add("is-busy");
    reloadT = setTimeout(reloadPreview, 650);
    status();
  }
  function save() {
    var ok = same(data, PUBLISHED) ? store("localStorage", DRAFT_KEY, null) : store("localStorage", DRAFT_KEY, JSON.stringify(data));
    if (!ok) toast("Couldn't save the draft in this browser (storage is blocked).");
  }
  function reloadPreview() {
    save();
    try { iframe.contentWindow.location.reload(); } catch (e) { iframe.src = "index.html?preview"; }
  }
  iframe.addEventListener("load", function () { $(".ed-live").classList.remove("is-busy"); });
  function previewTo(anchor) {
    lastAnchor = anchor;
    try { iframe.contentWindow.postMessage({ dpScrollTo: anchor }, location.origin); } catch (e) {}
  }
  function status() {
    var el = $("#ed-status"), dirty = !same(data, PUBLISHED);
    el.classList.toggle("is-dirty", dirty);
    $("span", el).textContent = dirty ? "Draft · saved in this browser, not published yet" : "Up to date with the published site";
  }

  /* ------------------------------------------------------------ export / import / reset */
  function serialize() {
    return "/* ==========================================================================\n" +
      "   PORTFOLIO CONTENT\n" +
      "   Edit it visually at /edit.html (live preview, then Download or Publish),\n" +
      "   or edit this file by hand. The site renders everything from it.\n" +
      "   Last saved from the editor: " + new Date().toISOString().slice(0, 10) + "\n" +
      "   ========================================================================== */\n\n" +
      "window.PORTFOLIO = " + JSON.stringify(data, null, 2) + ";\n";
  }
  $("#ed-download").addEventListener("click", function () {
    var url = URL.createObjectURL(new Blob([serialize()], { type: "text/javascript" }));
    var a = h("a", { href: url, download: "data.js" });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    toast("Downloaded. Replace assets/js/data.js with it.");
  });
  $("#ed-import").addEventListener("change", function (e) {
    var file = e.target.files[0];
    if (!file) return;
    file.text().then(function (txt) {
      var obj;
      try {
        if (/\.json$/i.test(file.name)) obj = JSON.parse(txt);
        else { var w = {}; new Function("window", txt)(w); obj = w.PORTFOLIO; }
        if (!obj || typeof obj !== "object") throw new Error("no data");
      } catch (err) { toast("That file doesn't look like portfolio data."); return; }
      data = obj; openCards = {}; renderForm(); changed(); toast("Imported " + file.name);
    });
    e.target.value = "";
  });
  $("#ed-reset").addEventListener("click", function () {
    if (same(data, PUBLISHED)) { toast("Nothing to discard."); return; }
    if (!confirm("Discard your draft and go back to the published content?")) return;
    data = clone(PUBLISHED); openCards = {}; store("localStorage", DRAFT_KEY, null); renderForm(); status(); reloadPreview();
  });
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") { e.preventDefault(); save(); toast("Draft saved. Use Download or Publish to update the site."); }
  });

  /* ------------------------------------------------------------ publish to GitHub */
  var dlg = $("#ed-publish"), pf = $("#ed-publish-form"), result = $("#ed-publish-result");
  function defaults() {
    var saved = {};
    try { saved = JSON.parse(store("localStorage", "dp-publish") || "{}"); } catch (e) {}
    var host = location.hostname, owner = "deskandwoodtechnosolutions-max", repo = "Dp_portfolio";
    if (/\.github\.io$/.test(host)) { owner = host.split(".")[0]; repo = location.pathname.split("/")[1] || host; }
    return {
      owner: saved.owner || owner, repo: saved.repo || repo, branch: saved.branch || "main", path: saved.path || "assets/js/data.js",
      token: store("localStorage", "dp-gh-token") || store("sessionStorage", "dp-gh-token") || "", remember: !!store("localStorage", "dp-gh-token"),
    };
  }
  $("#ed-publish-open").addEventListener("click", function () {
    var d = defaults();
    ["owner", "repo", "branch", "path", "token"].forEach(function (k) { pf.elements[k].value = d[k]; });
    pf.elements.remember.checked = d.remember;
    pf.elements.message.value = "Update portfolio content";
    result.textContent = ""; result.className = "ed-result";
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
  });
  function b64(str) {
    var bytes = new TextEncoder().encode(str), bin = "";
    for (var i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }
  $("#ed-publish-go").addEventListener("click", function () {
    var f = pf.elements, o = f.owner.value.trim(), r = f.repo.value.trim(), br = f.branch.value.trim(), p = f.path.value.trim().replace(/^\//, ""), tok = f.token.value.trim();
    if (!o || !r || !br || !p || !tok) { result.className = "ed-result err"; result.textContent = "Fill in every field, including the token."; return; }
    store("localStorage", "dp-publish", JSON.stringify({ owner: o, repo: r, branch: br, path: p }));
    if (f.remember.checked) { store("localStorage", "dp-gh-token", tok); store("sessionStorage", "dp-gh-token", null); }
    else { store("localStorage", "dp-gh-token", null); store("sessionStorage", "dp-gh-token", tok); }
    var api = "https://api.github.com/repos/" + encodeURIComponent(o) + "/" + encodeURIComponent(r) + "/contents/" + p.split("/").map(encodeURIComponent).join("/");
    var headers = { Authorization: "Bearer " + tok, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
    var btn = $("#ed-publish-go");
    btn.disabled = true; result.className = "ed-result"; result.textContent = "Publishing…";
    fetch(api + "?ref=" + encodeURIComponent(br), { headers: headers })
      .then(function (res) {
        if (res.status === 404) return null;
        if (!res.ok) throw new Error(res.status === 401 ? "The token was rejected (401)." : "Couldn't read the current file (" + res.status + ").");
        return res.json();
      })
      .then(function (cur) {
        return fetch(api, {
          method: "PUT", headers: headers,
          body: JSON.stringify({ message: f.message.value.trim() || "Update portfolio content", content: b64(serialize()), branch: br, sha: cur && cur.sha }),
        });
      })
      .then(function (res) {
        return res.json().then(function (j) {
          if (!res.ok) throw new Error(j && j.message ? j.message + " (" + res.status + ")" : "Publish failed (" + res.status + ").");
          return j;
        });
      })
      .then(function (j) {
        PUBLISHED = clone(data);
        status();
        result.className = "ed-result ok";
        result.innerHTML = "";
        result.appendChild(document.createTextNode("Published ✓ The live site updates in a minute or two. "));
        if (j.commit && j.commit.html_url) result.appendChild(h("a", { href: j.commit.html_url, target: "_blank", rel: "noopener", text: "View commit ↗" }));
        toast("Published");
      })
      .catch(function (err) { result.className = "ed-result err"; result.textContent = err.message || "Publish failed."; })
      .then(function () { btn.disabled = false; });
  });

  /* ------------------------------------------------------------ view tabs, preview size, toast */
  $$(".ed-tabs button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".ed-tabs button").forEach(function (x) { x.setAttribute("aria-selected", x === b ? "true" : "false"); });
      $("#ed-main").dataset.view = b.dataset.view;
    });
  });
  $$(".ed-seg button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".ed-seg button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      $("#ed-frame").dataset.size = b.dataset.size;
    });
  });
  $("#ed-reload").addEventListener("click", reloadPreview);
  var toastEl = h("div", { class: "ed-toast", role: "status" }), toastT;
  document.body.appendChild(toastEl);
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add("is-on");
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("is-on"); }, 2600);
  }
  window.addEventListener("beforeunload", save);

  renderForm();
  save();
  status();
  setCurrent(SECTIONS[0].key);
})();
