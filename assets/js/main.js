/* ==========================================================================
   DEEPANKAR PATEL — VOL. 01 · interaction engine
   Vanilla JS, no dependencies. Content comes from data.js (window.PORTFOLIO).
   ========================================================================== */
(function () {
  "use strict";

  var D = window.PORTFOLIO;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var uid = 0;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function store(kind, key, val) {
    try {
      var s = window[kind];
      if (val === undefined) return s.getItem(key);
      if (val === null) s.removeItem(key); else s.setItem(key, val);
    } catch (e) { return null; }
  }

  /* ------------------------------------------------------------ SPEED LINES */
  function speedlines(el) {
    var n = +el.getAttribute("data-speedlines") || 80;
    var polys = "";
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2 + Math.random() * 0.05;
      var w = 0.004 + Math.random() * 0.014;
      var r0 = el.hasAttribute("data-near") ? 6 + Math.random() * 12 : 26 + Math.random() * 22;
      var R = 90;
      var p1 = [50 + Math.cos(a - w) * R, 50 + Math.sin(a - w) * R];
      var p2 = [50 + Math.cos(a + w) * R, 50 + Math.sin(a + w) * R];
      var p3 = [50 + Math.cos(a) * r0, 50 + Math.sin(a) * r0];
      polys += '<polygon points="' + p1.map(f2).join(",") + " " + p2.map(f2).join(",") + " " + p3.map(f2).join(",") + '"/>';
    }
    el.innerHTML = '<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' + polys + "</svg>";
  }
  function f2(v) { return v.toFixed(2); }

  /* ------------------------------------------------------------ ILLUSTRATIONS */
  function tonePattern(id, r) {
    return '<pattern id="' + id + '" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="' + (r || 1.2) + '" class="ink"/></pattern>';
  }
  var ART = {
    elixra: function () {
      var t = "tone" + ++uid;
      return '<svg class="art" viewBox="0 0 320 240" aria-hidden="true"><defs>' + tonePattern(t) + "</defs>" +
        '<path class="line" d="M40 214 H280"/>' +
        '<path class="paper line" d="M134 26 H166 M138 26 V90 L94 194 Q90 208 104 208 H196 Q210 208 206 194 L162 90 V26"/>' +
        '<path class="accent" d="M113 146 H187 L203 194 Q205 202 196 202 H104 Q95 202 97 194 Z"/>' +
        '<path fill="url(#' + t + ')" opacity=".35" d="M150 146 H187 L203 194 Q205 202 196 202 H150 Z"/>' +
        '<path class="line" d="M138 26 V90 L94 194 Q90 208 104 208 H196 Q210 208 206 194 L162 90 V26"/>' +
        '<path class="line" d="M130 26 H170"/>' +
        '<g><circle class="paper line-thin bubble-rise" cx="140" cy="176" r="6"/><circle class="paper line-thin bubble-rise" cx="162" cy="184" r="4"/><circle class="paper line-thin bubble-rise" cx="152" cy="168" r="3"/></g>' +
        '<path class="line-thin" d="M150 110 v10 M145 115 h10" opacity=".7"/>' +
        '<g class="spin">' +
        '<path class="line-thin" d="M252 84 L286 60 M252 84 L280 118 M252 84 L218 104 M252 84 L246 44"/>' +
        '<circle class="ink" cx="252" cy="84" r="14"/>' +
        '<circle class="paper line-thin" cx="286" cy="60" r="9"/>' +
        '<circle class="accent" cx="280" cy="118" r="10"/>' +
        '<circle class="paper line-thin" cx="218" cy="104" r="8"/>' +
        '<circle class="paper line-thin" cx="246" cy="44" r="7"/>' +
        "</g>" +
        '<path class="line-thin" d="M50 70 l10 0 M55 65 l0 10 M72 110 l6 0 M75 107 l0 6 M262 170 l10 0 M267 165 l0 10"/>' +
        "</svg>";
    },
    mensa: function () {
      var t = "tone" + ++uid;
      return '<svg class="art" viewBox="0 0 320 240" aria-hidden="true"><defs>' + tonePattern(t) + "</defs>" +
        '<g class="pulse"><path class="line-accent" d="M30 120 v0 M44 108 v24 M58 96 v48 M72 112 v16 M86 100 v40 M100 116 v8"/></g>' +
        '<rect class="paper line" x="112" y="14" width="100" height="208" rx="16"/>' +
        '<rect class="ink" x="146" y="22" width="32" height="7" rx="3.5"/>' +
        '<circle cx="162" cy="92" r="36" fill="none" stroke-width="9" class="line" opacity=".15"/>' +
        '<circle class="spin" cx="162" cy="92" r="36" fill="none" stroke-width="9" stroke-linecap="round" stroke-dasharray="70 160" style="stroke:var(--accent)"/>' +
        '<text x="162" y="90" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" class="ink">DAY</text>' +
        '<text x="162" y="106" text-anchor="middle" font-family="Dela Gothic One, sans-serif" font-size="16" class="ink">14</text>' +
        '<rect x="128" y="146" width="68" height="18" rx="3" fill="url(#' + t + ')" class="line-thin"/>' +
        '<path class="line-thin" d="M128 178 h52 M128 192 h36 M128 206 h44"/>' +
        '<g><path class="ink" d="M206 124 h82 a10 10 0 0 1 10 10 v26 a10 10 0 0 1 -10 10 h-58 l-14 12 v-12 h-10 a10 10 0 0 1 -10 -10 v-26 a10 10 0 0 1 10 -10z"/>' +
        '<circle class="paper pulse" cx="230" cy="147" r="4"/><circle class="paper pulse" cx="247" cy="147" r="4" style="animation-delay:.2s"/><circle class="paper pulse" cx="264" cy="147" r="4" style="animation-delay:.4s"/></g>' +
        '<path class="line-thin" d="M236 40 q10 -14 20 0 q10 14 20 0" /><path class="line-thin" d="M244 62 l6 0 M247 59 l0 6"/>' +
        "</svg>";
    },
    peerq: function () {
      var t = "tone" + ++uid;
      return '<svg class="art" viewBox="0 0 320 240" aria-hidden="true"><defs>' + tonePattern(t) + "</defs>" +
        '<rect x="40" y="40" width="260" height="184" fill="url(#' + t + ')" opacity=".5"/>' +
        '<rect class="paper line" x="28" y="28" width="260" height="184" rx="4"/>' +
        '<path class="line" d="M28 54 H288"/>' +
        '<circle class="ink" cx="44" cy="41" r="4"/><circle class="ink" cx="58" cy="41" r="4"/><circle class="accent" cx="72" cy="41" r="4"/>' +
        '<rect class="paper line-thin" x="46" y="66" width="224" height="26" rx="13"/>' +
        '<circle class="line-thin" cx="62" cy="79" r="6"/><path class="line-thin" d="M66 83 l5 5"/>' +
        '<path class="line-thin" d="M80 79 h70"/><path class="line-thin blink-caret" d="M156 72 v14" style="stroke:var(--accent)"/>' +
        '<g><rect class="accent" x="46" y="104" width="4" height="30"/>' +
        '<rect class="ink" x="58" y="108" width="22" height="22"/><text x="69" y="124" text-anchor="middle" font-family="Dela Gothic One, sans-serif" font-size="13" class="paper">Q</text>' +
        '<path class="line-thin" d="M90 114 h120 M90 125 h80"/></g>' +
        '<g><rect class="paper line-thin" x="58" y="142" width="22" height="22"/><text x="69" y="158" text-anchor="middle" font-family="Dela Gothic One, sans-serif" font-size="13" class="ink">A</text>' +
        '<path class="line-thin" d="M90 148 h150 M90 159 h110"/></g>' +
        '<g><rect class="ink" x="58" y="176" width="22" height="22"/><text x="69" y="192" text-anchor="middle" font-family="Dela Gothic One, sans-serif" font-size="13" class="paper">Q</text>' +
        '<path class="line-thin" d="M90 182 h100 M90 193 h130"/></g>' +
        '<g class="pulse"><circle class="accent" cx="284" cy="30" r="24"/><text x="284" y="40" text-anchor="middle" font-family="Dela Gothic One, sans-serif" font-size="28" fill="#fff8f0">?</text></g>' +
        "</svg>";
    },
    probe: function () {
      var t = "tone" + ++uid;
      return '<svg class="art" viewBox="0 0 320 240" aria-hidden="true"><defs>' + tonePattern(t) + "</defs>" +
        '<circle cx="150" cy="120" r="92" fill="url(#' + t + ')" opacity=".35"/>' +
        '<circle class="paper line" cx="150" cy="120" r="84"/><circle class="line-thin" cx="150" cy="120" r="56"/><circle class="line-thin" cx="150" cy="120" r="28"/>' +
        '<path class="line-thin" d="M150 36 V204 M66 120 H234"/>' +
        '<g class="spin" style="transform-origin:150px 120px"><path class="accent" d="M150 120 L150 36 A84 84 0 0 1 222 78 Z" opacity=".55"/></g>' +
        '<circle class="accent pulse" cx="196" cy="86" r="8"/><circle class="ink" cx="112" cy="150" r="6"/><circle class="ink" cx="176" cy="164" r="5"/>' +
        '<path class="line" d="M232 196 L 290 232"/><circle class="paper line" cx="232" cy="196" r="20"/>' +
        "</svg>";
    },
    democare: function () {
      var t = "tone" + ++uid;
      return '<svg class="art" viewBox="0 0 320 240" aria-hidden="true"><defs>' + tonePattern(t) + "</defs>" +
        '<path class="paper line" d="M160 40 C 110 30, 70 60, 72 100 C 50 112, 52 150, 76 162 C 74 190, 104 208, 130 198 C 142 214, 176 214, 190 198 C 218 208, 248 190, 244 160 C 268 148, 268 112, 246 100 C 250 62, 210 30, 160 40 Z"/>' +
        '<path d="M160 44 V 204" class="line-thin"/>' +
        '<path class="line-thin" d="M110 80 C 130 90, 120 110, 138 118 M 104 140 C 122 132, 132 152, 148 146 M 186 76 C 176 96, 200 104, 192 124 M 212 140 C 196 136, 188 158, 172 152"/>' +
        '<path fill="url(#' + t + ')" d="M160 44 C 210 34, 250 62, 246 100 C 268 112, 268 148, 244 160 C 248 190, 218 208, 190 198 C 176 214, 160 210, 160 204 Z" opacity=".5"/>' +
        '<g class="pulse"><path class="accent" d="M266 52 l8 -12 l8 12 l12 4 l-12 4 l-8 12 l-8 -12 l-12 -4 z"/></g>' +
        '<path class="line-accent" d="M20 214 H 90 L 104 190 L 118 228 L 132 204 H 300"/>' +
        "</svg>";
    },
    generic: function () {
      return '<svg class="art" viewBox="0 0 320 240" aria-hidden="true">' +
        '<rect class="paper line" x="40" y="30" width="140" height="180"/><rect class="paper line" x="190" y="30" width="90" height="85"/><rect class="accent" x="190" y="125" width="90" height="85"/>' +
        '<path class="line-thin" d="M60 60 h100 M60 76 h70"/></svg>';
    },
  };
  // a project shows its screenshot; image "auto" pulls a live screenshot of the deployed site
  // (falls back to the drawing if it can't load)
  // "auto" = the screenshot the GitHub Action captures into assets/img/shots/<id>.jpg
  function artFor(p) {
    var art = (ART[p.art] || ART.generic)();
    var src = p.image === "auto" ? "assets/img/shots/" + p.id + ".jpg" : p.image;
    if (!src) return art;
    return art + '<img class="shot" src="' + esc(src) + '" alt="' + esc(p.name) + ' screenshot" loading="lazy" draggable="false" onerror="this.remove()" />';
  }

  // the profile portrait reuses the landing character (one protagonist, one drawing)
  function silhouette() {
    return '<svg class="sil" viewBox="140 70 480 720" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><use href="#kv-figure" /></svg>';
  }

  /* ============================================================ DATA BINDING
     Text that appears in the static HTML (name, arc title, stats line) is
     filled from data.js so one edit updates every place it appears.      */
  function bindData() {
    var P = D.person;
    if (!P.name) P.name = [P.first, P.last].filter(Boolean).join(" ");
    $$("[data-bind]").forEach(function (el) { var v = P[el.dataset.bind]; if (v != null) el.textContent = v; });
    $$("[data-bind-label]").forEach(function (el) { var v = P[el.dataset.bindLabel]; if (v != null) el.setAttribute("aria-label", v + (el.dataset.bindSuffix || "")); });
    document.title = P.name + " — " + (P.volume || "Portfolio");
    var kv = $("#kv-stats");
    if (kv) kv.innerHTML = (P.heroStats || []).map(function (x) {
      return '<span class="kv__stat"><b>' + esc(x.value) + (x.suffix ? "<small>" + esc(x.suffix) + "</small>" : "") + "</b><span>" + esc(x.label) + "</span></span>";
    }).join("");
  }

  /* ============================================================ RENDERERS */
  function renderProfile() {
    var P = D.profile, me = D.person;
    var portrait = me.portrait
      ? '<img src="' + esc(me.portrait) + '" alt="Portrait of ' + esc(me.name) + '" />'
      : '<div class="speedlines" data-speedlines="80" aria-hidden="true"></div>' + silhouette();
    var stats = (P.stats || []).map(function (s) {
      return '<li><strong data-count="' + s.value + '" data-decimals="' + (s.decimals || 0) + '" data-suffix="' + esc(s.suffix || "") + '">' +
        (s.decimals ? s.value.toFixed(s.decimals) : s.value) + esc(s.suffix || "") + "</strong><span>" + esc(s.label) + "</span></li>";
    }).join("");
    $("#profile").innerHTML =
      '<div class="profile__card panel reveal">' +
        '<div class="profile__portrait">' + portrait + '<span class="profile__badge tag tag--accent">Protagonist</span></div>' +
        '<div class="profile__id"><p class="profile__name">' + esc(me.name) + '</p><p class="profile__kata" lang="ja">' + esc(me.katakana) + "</p></div>" +
      "</div>" +
      '<div class="sheet">' +
        '<div class="sheet__block panel reveal sheet__block--wide">' +
          '<p class="about__bio">' + esc(P.bio || "") + "</p>" +
          '<dl class="dl">' + (P.facts || []).map(function (f) { return "<div><dt>" + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd></div>"; }).join("") + "</dl>" +
        "</div>" +
        '<div class="sheet__block panel reveal sheet__block--wide" style="--d:.05s"><ul class="stats">' + stats + "</ul></div>" +
        '<div class="sheet__block panel reveal sheet__block--wide" style="--d:.1s"><div class="chips">' +
          (P.interests || []).map(function (x) { return '<span class="chip">' + esc(x) + "</span>"; }).join("") + "</div></div>" +
      "</div>";
  }

  function renderProjects() {
    var html = D.projects.map(function (p, i) {
      return '<button class="pcard panel reveal" type="button" data-project="' + i + '" style="--d:' + i * 0.08 + 's" aria-label="Read chapter ' + (i + 1) + ": " + esc(p.name) + ' — ' + esc(p.subtitle) + '">' +
        '<div class="pcard__art">' +
          '<div class="speedlines" data-speedlines="70" aria-hidden="true"></div>' +
          '<span class="pcard__no tag tag--ink">Ch. ' + pad(i + 1) + "</span>" +
          '<span class="pcard__status tag' + (p.links && p.links.live ? " tag--accent" : "") + '">' + esc(p.status) + "</span>" +
          artFor(p) +
        "</div>" +
        '<div class="pcard__body">' +
          '<span class="pcard__cta bubble">Read chapter →</span>' +
          '<span class="pcard__sub">' + esc(p.subtitle) + "</span>" +
          '<span class="pcard__name">' + esc(p.name) + "</span>" +
          '<span class="pcard__tag">' + esc(p.tagline) + "</span>" +
          '<span class="pcard__stack">' + p.stack.map(function (s) { return '<span class="tag">' + esc(s) + "</span>"; }).join("") + "</span>" +
        "</div>" +
      "</button>";
    }).join("");
    $("#project-page").innerHTML = html;
  }

  function renderJourney() {
    var J = D.journey;
    $("#journey-total").textContent = pad(J.length);
    $("#journey-track").innerHTML = J.map(function (j, i) {
      return '<li class="jcard reveal' + (j.current ? " is-current" : "") + '">' +
        '<span class="jcard__dot" aria-hidden="true"><span>' + pad(i + 1) + "</span></span>" +
        '<div class="jcard__panel panel">' +
          '<div class="jcard__top"><span class="jcard__kind">' + esc(j.kind) + "</span>" + (j.current ? '<span class="jcard__now"><i></i>Now</span>' : '<span class="jcard__ch">Ch. ' + pad(i + 1) + "</span>") + "</div>" +
          '<p class="jcard__when">' + esc(j.when) + "</p>" +
          '<h3 class="jcard__title">' + esc(j.title) + "</h3>" +
          '<p class="jcard__place">' + esc(j.place) + "</p>" +
          '<p class="jcard__text">' + esc(j.text) + "</p>" +
          (j.current ? '<a class="jcard__go" href="#now">What I\'m building now →</a>' : "") +
        "</div>" +
      "</li>";
    }).join("");
    // year ticks under the progress bar (desktop)
    var n = J.length;
    $("#journey-ticks").innerHTML = J.map(function (j, k) {
      return '<i style="left:' + (k / Math.max(1, n - 1) * 100).toFixed(2) + '%"><span>' + esc(j.when) + "</span></i>";
    }).join("");
  }

  var skillIndex = [];
  function renderSkills() {
    var counter = 0;
    var used = {};
    $("#skill-board").innerHTML = D.skills.map(function (cat, ci) {
      return '<div class="scard panel' + (ci === 0 ? " is-open" : "") + '">' +
        '<div class="scard__head" data-cat="' + ci + '"><span class="scard__glyph" aria-hidden="true">' + esc(cat.glyph) + "</span>" +
        '<div><h3 class="scard__name">' + esc(cat.category) + '</h3><span class="scard__count">' + cat.items.length + ' abilities<b class="scard__lit"></b></span></div>' +
        '<span class="scard__chev" aria-hidden="true"></span></div>' +
        '<div class="scard__tree" id="scard-tree-' + ci + '">' + cat.items.map(function (s, si) {
          var id = skillIndex.length;
          skillIndex.push({ name: s.name, category: cat.category, used: s.used });
          s.used.forEach(function (u) { used[u] = true; });
          return '<button class="snode" type="button" aria-pressed="false" data-skill="' + id + '" style="--i:' + counter++ + '">' +
            "<span>" + esc(s.name) + "</span><small>×" + s.used.length + "</small></button>";
        }).join("") + "</div></div>";
    }).join("");

    if (!$("#skill-filter")) return;
    var filters = ['<button type="button" aria-pressed="true" data-filter="">All</button>'];
    Object.keys(D.evidence).forEach(function (k) {
      if (used[k]) filters.push('<button type="button" aria-pressed="false" data-filter="' + k + '">' + esc(D.evidence[k]) + "</button>");
    });
    $("#skill-filter").innerHTML = filters.join("");
  }

  function renderArcs() {
    $("#arc-grid").innerHTML = D.achievements.map(function (a, i) {
      var r = a.rank, big, small;
      if (r === "1st" || r === "2nd" || r === "3rd") { big = r.toUpperCase(); small = "Place"; }
      else if (r === "RU") { big = "RU"; small = "Runner-up"; }
      else { big = "★"; small = a.kind; }
      return '<li class="arc panel' + (r === "1st" ? " arc--gold" : "") + '" style="--i:' + i + '">' +
        '<span class="arc__stamp" aria-hidden="true"><span>' + esc(big) + "<small>" + esc(small) + "</small></span></span>" +
        '<span class="arc__kind mono">' + esc(a.kind) + "</span>" +
        '<h3 class="arc__title">' + esc(a.title) + "</h3>" +
        '<p class="arc__result">' + esc(a.result) + "</p>" +
        '<p class="arc__role">' + esc(a.role) + "</p>" +
        '<span class="arc__banner">Arc cleared</span>' +
      "</li>";
    }).join("");
  }

  /* ---- Snapshots: photos as a pile you can drag (desktop), a swipe stack (phones), or a grid */
  function renderGallery() {
    var G = D.gallery || [], box = $("#gal");
    if (!box) return;
    box.innerHTML = G.map(function (g, i) {
      var media = g.src
        ? '<img src="' + esc(g.src) + '" alt="' + esc(g.caption || "Photo") + '" loading="lazy" decoding="async" draggable="false" onload="this.classList.add(\x27is-in\x27)" />'
        : '<span class="gal__ph"><span class="speedlines" data-speedlines="60" aria-hidden="true"></span><b>' + esc(g.tag || "Photo") + '</b><i class="mono">Add a photo in the editor</i></span>';
      return '<button class="gal__card" type="button" data-i="' + i + '" data-tag="' + esc(g.tag || "") + '" aria-label="Open photo: ' + esc(g.caption || "") + '">' +
        '<span class="gal__tape" aria-hidden="true"></span><span class="gal__frame">' + media + "</span>" +
        '<span class="gal__cap">' + esc(g.caption || "") + "</span></button>";
    }).join("");
    var tags = [];
    G.forEach(function (g) { if (g.tag && tags.indexOf(g.tag) < 0) tags.push(g.tag); });
    $("#gal-filter").innerHTML = ['<button type="button" aria-pressed="true" data-tag="">All</button>'].concat(tags.map(function (t) {
      return '<button type="button" aria-pressed="false" data-tag="' + esc(t) + '">' + esc(t) + "</button>";
    })).join("");
  }

  function initGallery() {
    var box = $("#gal");
    if (!box) return;
    var cards = $$(".gal__card", box), G = D.gallery || [];
    // only the site owner (a browser that has used the editor) sees the shortcut
    var add = $("#gal-add");
    if (add && (store("localStorage", "dp-gh-token") || store("localStorage", "dp-publish") || store("localStorage", "dp-draft"))) add.hidden = false;
    var narrow = window.matchMedia("(max-width: 719px)");
    var grid = false, filter = "", order = [], z = 10;
    var pos = []; // pile positions {x, y, r}
    function visible() { return cards.filter(function (c) { return !filter || c.dataset.tag === filter; }); }
    function baseMode() { return narrow.matches ? "stack" : "pile"; }
    function mode() { return grid ? "grid" : baseMode(); }
    function rand(a, b) { return a + Math.random() * (b - a); }

    function scatter() {
      var W = box.clientWidth, H = box.clientHeight, vis = visible(), n = vis.length;
      var cw = cards[0] ? cards[0].offsetWidth : 220, ch = cards[0] ? cards[0].offsetHeight : 260;
      var cols = Math.max(1, Math.ceil(Math.sqrt(n * W / H)));
      vis.forEach(function (c, k) {
        var col = k % cols, row = Math.floor(k / cols), rows = Math.ceil(n / cols);
        var cx = (col + .5) / cols * (W - cw), cy = (row + .5) / rows * (H - ch);
        pos[+c.dataset.i] = { x: clamp(cx + rand(-40, 40), 0, W - cw), y: clamp(cy + rand(-30, 30), 0, H - ch), r: rand(-12, 12) };
      });
    }
    function layout(animate) {
      var m = mode();
      box.dataset.mode = m;
      $("#gal-mode").setAttribute("aria-pressed", grid ? "true" : "false");
      cards.forEach(function (c) { c.hidden = !!filter && c.dataset.tag !== filter; });
      var vis = visible();
      if (m === "pile") {
        vis.forEach(function (c) {
          var p = pos[+c.dataset.i];
          c.style.transition = animate ? "transform .7s var(--ease-out)" : "";
          c.style.opacity = "";
          c.style.transform = "translate(" + p.x.toFixed(0) + "px," + p.y.toFixed(0) + "px) rotate(" + p.r.toFixed(1) + "deg)";
        });
      } else if (m === "stack") {
        order = order.filter(function (i) { return vis.some(function (c) { return +c.dataset.i === i; }); });
        vis.forEach(function (c) { if (order.indexOf(+c.dataset.i) < 0) order.push(+c.dataset.i); });
        order.forEach(function (i, k) {
          var c = cards[i];
          c.style.transition = "transform .45s var(--ease-out), opacity .3s";
          c.style.zIndex = 100 - k;
          c.style.opacity = k > 3 ? 0 : 1;
          c.style.transform = "translate(-50%, " + (k * 10) + "px) scale(" + (1 - k * 0.05) + ") rotate(" + (k === 0 ? 0 : (k % 2 ? 3 : -3)) + "deg)";
        });
      } else {
        vis.forEach(function (c, k) { c.style.transition = ""; c.style.transform = "rotate(" + (k % 2 ? 1.2 : -1.2) + "deg)"; c.style.zIndex = ""; c.style.opacity = ""; });
      }
      var top = m === "stack" && order.length ? G[order[0]] : null;
      $("#gal-count").textContent = m === "stack" && top ? "1 / " + order.length + " · " + (top.caption || "") : vis.length + " photos";
    }

    // FLIP between modes so cards glide into place
    function relayout(fn) {
      var first = cards.map(function (c) { return c.getBoundingClientRect(); });
      fn();
      layout(false);
      if (reduce) return;
      cards.forEach(function (c, i) {
        if (c.hidden) return;
        var last = c.getBoundingClientRect(), f = first[i];
        if (!f.width) return;
        var dx = f.left - last.left, dy = f.top - last.top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
        var t = getComputedStyle(c).transform;
        c.animate([{ transform: "translate(" + dx + "px," + dy + "px) " + (t === "none" ? "" : t) }, { transform: t === "none" ? "none" : t }], { duration: 650, easing: "cubic-bezier(.16,1,.3,1)" });
      });
    }

    // drag (pile) / swipe (stack) / click to open
    var drag = null;
    box.addEventListener("pointerdown", function (e) {
      var c = e.target.closest(".gal__card");
      if (!c || e.button > 0) return;
      var m = mode(), i = +c.dataset.i;
      if (m === "grid") return;
      if (m === "stack" && order[0] !== i) return;
      drag = { c: c, i: i, x0: e.clientX, y0: e.clientY, moved: false, p: pos[i] ? { x: pos[i].x, y: pos[i].y } : null };
      c.setPointerCapture(e.pointerId);
      c.style.transition = "none";
      if (m === "pile") { c.style.zIndex = ++z; c.classList.add("is-lift"); Sfx.play("tick"); }
    });
    box.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
      if (Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
      if (mode() === "pile") {
        var p = pos[drag.i];
        p.x = clamp(drag.p.x + dx, -40, box.clientWidth - drag.c.offsetWidth + 40);
        p.y = clamp(drag.p.y + dy, -40, box.clientHeight - drag.c.offsetHeight + 40);
        drag.c.style.transform = "translate(" + p.x + "px," + p.y + "px) rotate(" + (p.r + dx * 0.04).toFixed(1) + "deg) scale(1.05)";
      } else {
        drag.c.style.transform = "translate(calc(-50% + " + dx + "px), " + dy * 0.2 + "px) rotate(" + dx * 0.06 + "deg)";
      }
    });
    function end(e) {
      if (!drag) return;
      var d = drag; drag = null;
      d.c.classList.remove("is-lift");
      var m = mode(), dx = e.clientX - d.x0;
      if (!d.moved) { layout(false); openLightbox(d.i); return; }
      if (m === "pile") { pos[d.i].r += dx * 0.04; layout(false); Sfx.play("hit"); return; }
      if (Math.abs(dx) > 70) {
        // fling the top card off-screen, then send it to the back of the stack
        d.c.style.transition = "transform .35s cubic-bezier(.5,0,.75,0)";
        d.c.style.transform = "translate(calc(-50% + " + (dx > 0 ? 140 : -140) + "vw), 20px) rotate(" + (dx > 0 ? 30 : -30) + "deg)";
        Sfx.play("swoosh"); buzz(10);
        setTimeout(function () { order.push(order.shift()); layout(); }, 300);
      } else layout();
    }
    box.addEventListener("pointerup", end);
    box.addEventListener("pointercancel", end);
    box.addEventListener("keydown", function (e) {
      var c = e.target.closest(".gal__card");
      if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openLightbox(+c.dataset.i); }
    });

    $("#gal-filter").addEventListener("click", function (e) {
      var b = e.target.closest("[data-tag]");
      if (!b) return;
      $$("button", e.currentTarget).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      relayout(function () { filter = b.dataset.tag; order = []; cards.forEach(function (c) { c.hidden = !!filter && c.dataset.tag !== filter; }); if (!grid) scatter(); });
      Sfx.play("tick");
    });
    $("#gal-shuffle").addEventListener("click", function () {
      if (mode() === "stack") { for (var k = order.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)), t = order[k]; order[k] = order[j]; order[j] = t; } layout(); }
      else if (mode() === "grid") relayout(function () { cards.forEach(function (c) { box.appendChild(c); }); cards.sort(function () { return Math.random() - .5; }).forEach(function (c) { box.appendChild(c); }); cards = $$(".gal__card", box); });
      else { scatter(); layout(true); }
      Sfx.play("whoosh"); buzz(8);
    });
    $("#gal-mode").addEventListener("click", function () {
      relayout(function () { grid = !grid; if (!grid) scatter(); });
      Sfx.play("blip");
    });
    narrow.addEventListener("change", function () { scatter(); layout(); });
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { if (mode() === "pile") { scatter(); layout(true); } }, 200); });
    scatter(); layout(false);
    // deal the cards in when the section scrolls into view
    if ("IntersectionObserver" in window && !reduce) {
      box.classList.add("is-waiting");
      new IntersectionObserver(function (es, ob) {
        if (!es[0].isIntersecting) return;
        ob.disconnect();
        box.classList.remove("is-waiting");
        box.classList.add("is-dealt");
      }, { threshold: 0.2 }).observe(box);
    }

    // ---- lightbox
    var lb = $("#lb"), at = 0, lbReturn = null;
    function show(i) {
      var vis = visible().map(function (c) { return +c.dataset.i; });
      if (!vis.length) return;
      var k = vis.indexOf(i); if (k < 0) k = 0;
      at = vis[(k + vis.length) % vis.length];
      var g = G[at];
      $("#lb-frame").innerHTML = g.src ? '<img src="' + esc(g.src) + '" alt="' + esc(g.caption || "Photo") + '" />'
        : '<span class="gal__ph gal__ph--big"><span class="speedlines" data-speedlines="80" aria-hidden="true"></span><b>' + esc(g.caption || "") + '</b><i class="mono">Photo soon</i></span>';
      $$("[data-speedlines]", $("#lb-frame")).forEach(speedlines);
      $("#lb-cap").textContent = g.caption || "";
      $("#lb-meta").textContent = [g.tag, g.date].filter(Boolean).join(" · ");
      $("#lb-count").textContent = (vis.indexOf(at) + 1) + " / " + vis.length;
      var f = $("#lb-fig"); f.classList.remove("swap"); void f.offsetWidth; f.classList.add("swap");
    }
    function step(d) {
      var vis = visible().map(function (c) { return +c.dataset.i; });
      var k = vis.indexOf(at);
      show(vis[(k + d + vis.length) % vis.length]);
      Sfx.play("tick"); buzz(6);
    }
    function openLightbox(i) {
      lbReturn = document.activeElement;
      show(i);
      lb.hidden = false;
      lockPage(true);
      Sfx.play("whoosh");
      $(".lb__close").focus({ preventScroll: true });
    }
    function closeLightbox() {
      lb.hidden = true;
      lockPage(false);
      if (lbReturn) lbReturn.focus({ preventScroll: true });
    }
    lb.addEventListener("click", function (e) {
      var g = e.target.closest("[data-lb-go]");
      if (g) { step(+g.dataset.lbGo); return; }
      if (e.target.closest("[data-lb-close]")) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    });
    var sx = 0, sy = 0;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
      else if (dy > 90) closeLightbox();
    }, { passive: true });
  }

  function renderNow() {
    var N = D.now || {};
    function items(list) {
      return (list || []).map(function (x) { return '<div class="nitem"><strong>' + esc(x.title) + "</strong><span>" + esc(x.text) + "</span></div>"; }).join("");
    }
    $("#now-updated").textContent = "Updated " + D.person.updated + ".";
    $("#now-grid").innerHTML =
      '<div class="nblock nblock--main panel reveal"><div class="nblock__label"><span class="nblock__title">Building</span><span class="tag tag--accent">Live</span></div>' + items(N.building) + "</div>" +
      '<div class="nblock panel reveal" style="--d:.06s"><div class="nblock__label"><span class="nblock__title">Leading</span></div>' + items(N.leading) + "</div>" +
      '<div class="nblock panel reveal" style="--d:.12s"><div class="nblock__label"><span class="nblock__title">Exploring</span></div><div class="chips">' +
        (N.exploring || []).map(function (x) { return '<span class="chip">' + esc(x) + "</span>"; }).join("") + "</div></div>";
    var words = (N.building || []).map(function (b) { return "Building " + b.title; })
      .concat((N.leading || []).map(function (b) { return b.title + " · " + b.text; }))
      .concat((N.exploring || []).map(function (x) { return "Exploring " + x; }));
    var seq = words.map(function (w) { return "<span>" + esc(w) + "</span>"; }).join("");
    $("#now-marquee").innerHTML = seq + seq;
  }

  function renderFinal() {
    var me = D.person;
    var mail = function (subject) { return "mailto:" + me.email + "?subject=" + encodeURIComponent(subject); };
    var panels = [
      { k: "Say hi", t: "Work with me", d: "Projects, roles, hackathons.", href: mail("Hello from your portfolio") },
      { k: "Code", t: "GitHub", d: "", href: me.github, ext: true },
      { k: "Network", t: "LinkedIn", d: "", href: me.linkedin, ext: true },
      { k: "Community", t: "coddyio.tech", d: "", href: me.community, ext: true },
    ].filter(function (p) { return p.href; });
    $("#final-panels").innerHTML = panels.map(function (p, i) {
      return '<a class="fpanel panel reveal" style="--d:' + (i % 3) * 0.06 + 's" href="' + esc(p.href) + '"' + (p.ext ? ' target="_blank" rel="noopener"' : "") + ">" +
        '<span class="mono">' + esc(p.k) + "</span><strong>" + esc(p.t) + '</strong><span class="desc">' + esc(p.d) + '</span><span class="arrow" aria-hidden="true">' + (p.ext ? "↗" : "→") + "</span></a>";
    }).join("");
    var addr = $("#final-address");
    addr.textContent = me.email;
    addr.href = "mailto:" + me.email;
    $("#year").textContent = new Date().getFullYear();
  }

  /* ============================================================ CHAPTER NAV */
  var chapters = $$("section.chapter");
  function buildNav() {
    $("#rail-list").innerHTML = chapters.map(function (s) {
      return '<li><a href="#' + s.id + '"><span>' + s.dataset.chapter + " · " + esc(s.dataset.label) + "</span><i></i></a></li>";
    }).join("");
    $("#index-list").innerHTML = chapters.map(function (s, i) {
      return '<li style="--i:' + i + '"><a href="#' + s.id + '">' +
        '<span class="ix-kanji" lang="ja">' + esc(s.dataset.kanji) + "</span>" +
        '<span class="ix-num">' + s.dataset.chapter + "</span>" +
        '<span><span class="ix-label">' + esc(s.dataset.label) + '</span><br><span class="ix-title">' + esc(s.dataset.title) + "</span></span>" +
        "</a></li>";
    }).join("");
  }

  var current = -1;
  var topbar = $("#topbar");
  var rail = $(".rail");
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    var vh = window.innerHeight;
    var max = document.documentElement.scrollHeight - vh;
    var prog = max > 0 ? y / max : 0;
    $("#progress-bar").style.transform = "scaleX(" + prog + ")";
    $("#dock-bar").style.transform = "scaleX(" + prog + ")";

    var idx = 0, invTop = false, invRail = false, darkTop = false, darkRail = false;
    for (var i = 0; i < chapters.length; i++) {
      var r = chapters[i].getBoundingClientRect();
      if (r.top <= vh * 0.4) idx = i;
      if (chapters[i].hasAttribute("data-dark")) {
        if (r.top <= 36 && r.bottom > 36) darkTop = true;
      } else if (chapters[i].classList.contains("invert")) {
        if (r.top <= 36 && r.bottom > 36) invTop = true;
        if (r.top <= vh / 2 && r.bottom > vh / 2) invRail = true;
      }
    }
    if (idx !== current) {
      current = idx;
      var s = chapters[idx];
      $("#chapter-num").textContent = s.dataset.chapter;
      var nm = $("#chapter-name");
      nm.textContent = s.dataset.title;
      nm.classList.remove("swap"); void nm.offsetWidth; nm.classList.add("swap");
      $("#dock-num").textContent = s.dataset.chapter;
      var dn = $("#dock-name");
      dn.textContent = s.dataset.label;
      dn.classList.remove("swap"); void dn.offsetWidth; dn.classList.add("swap");
      $("#dock-prev").disabled = idx === 0;
      $("#dock-next").disabled = idx === chapters.length - 1;
      $$("#rail-list a, #index-list a").forEach(function (a) {
        a.setAttribute("aria-current", a.getAttribute("href") === "#" + s.id ? "true" : "false");
      });
    }
    topbar.classList.toggle("on-invert", invTop);
    rail.classList.toggle("on-invert", invRail);
    topbar.classList.toggle("on-dark", darkTop);
    rail.classList.toggle("on-dark", darkRail);
    if (!reduce && y < window.innerHeight * 1.1) kvUpdate();
    $("#home").classList.toggle("is-covered", y > window.innerHeight * 1.05);
    topbar.classList.toggle("is-scrolled", y > 20);
    if (y > lastY + 6 && y > 300) topbar.classList.add("is-hidden");
    else if (y < lastY - 6) topbar.classList.remove("is-hidden");
    lastY = y;

    // chapter number parallax
    if (!reduce) {
      $$(".chapter__num").forEach(function (n) {
        var r = n.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh) n.style.setProperty("--py", ((r.top - vh / 2) * -0.08).toFixed(1) + "px");
      });
    }
    journeyScroll();
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; onScroll(); }); }
  }, { passive: true });

  /* ------------------------------------------------------------ MODAL HELPER */
  var bg = [$("#main"), topbar, rail, $("#dock")];
  var lastFocus = null;
  function lockPage(on, keepTopbar) {
    document.body.classList.toggle("is-locked", on);
    bg.forEach(function (el) {
      if (keepTopbar && el === topbar) return;
      if (on) el.setAttribute("inert", ""); else el.removeAttribute("inert");
    });
  }

  /* index overlay */
  var index = $("#index");
  function openIndex() {
    lastFocus = document.activeElement;
    index.hidden = false;
    requestAnimationFrame(function () { index.classList.add("is-open"); });
    $("#index-open").setAttribute("aria-expanded", "true");
    lockPage(true);
    $("#index-close").focus();
  }
  function closeIndex(noRestore) {
    index.classList.remove("is-open");
    index.hidden = true;
    $("#index-open").setAttribute("aria-expanded", "false");
    lockPage(false);
    if (!noRestore && lastFocus) lastFocus.focus();
  }
  $("#index-open").addEventListener("click", openIndex);
  $("#dock-index").addEventListener("click", openIndex);
  function goChapter(d) {
    var t = chapters[clamp(current + d, 0, chapters.length - 1)];
    if (t) wipeTo(t);
  }
  /* chapter wipe: every in-page jump between sections gets a manga-panel transition */
  var wipe = $("#wipe"), wiping = false;
  function wipeTo(section, focusEl) {
    var jump = function () {
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
      if (history.replaceState) history.replaceState(null, "", "#" + section.id);
    };
    if (reduce || wiping) { jump(); return; }
    wiping = true;
    $("#wipe-kanji").textContent = section.dataset.kanji || "";
    $("#wipe-num").textContent = section.dataset.chapter || "";
    $("#wipe-title").textContent = section.dataset.title || "";
    wipe.classList.remove("is-out");
    wipe.classList.add("is-active");
    void wipe.offsetWidth;
    wipe.classList.add("is-in");
    Sfx.play("whoosh"); buzz(8);
    setTimeout(function () { jump(); Sfx.play("hit"); }, 520);
    setTimeout(function () { wipe.classList.remove("is-in"); wipe.classList.add("is-out"); Sfx.play("swoosh"); }, 820);
    setTimeout(function () {
      wipe.classList.remove("is-active", "is-out");
      wiping = false;
      if (focusEl) focusEl.focus({ preventScroll: true });
    }, 1350);
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || a.classList.contains("skip-link")) return;
    var id = a.getAttribute("href").slice(1), target = id && document.getElementById(id);
    if (!target || !target.classList.contains("chapter")) return;
    if (!opening.hidden || !reader.hidden) return;
    e.preventDefault();
    if (!index.hidden) closeIndex(true);
    wipeTo(target);
  });
  $("#dock-prev").addEventListener("click", function () { goChapter(-1); });
  $("#dock-next").addEventListener("click", function () { goChapter(1); });
  $("#index-close").addEventListener("click", function () { closeIndex(); });
  index.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (a) { closeIndex(true); }
  });

  /* theme */
  function isDark() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function syncThemeMeta() {
    $('meta[name="theme-color"]').setAttribute("content", isDark() ? "#0e0e0d" : "#f2ede3");
    $("#theme-toggle").setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
  }
  $("#theme-toggle").addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    store("localStorage", "dp-theme", next);
    syncThemeMeta();
    inkRedraw && inkRedraw();
  });


  /* ============================================================ SOUND + HAPTICS
     Every sound is synthesised with Web Audio at play time (no audio files).
     Sound only starts after a click or tap, and the choice is remembered.   */
  var Sfx = (function () {
    var ctx = null, out = null, noiseBuf = null;
    var on = store("localStorage", "dp-sound") !== "off";
    function ready() {
      if (!on) return null;
      if (!ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
        out = ctx.createDynamicsCompressor();
        var vol = ctx.createGain(); vol.gain.value = 0.55;
        out.connect(vol); vol.connect(ctx.destination);
        noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
        var d = noiseBuf.getChannelData(0);
        for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    }
    function env(g, t, a, d, peak) {
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + a);
      g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
    }
    function tone(type, f0, f1, dur, vol, delay, dest) {
      var t = ctx.currentTime + (delay || 0), o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
      env(g, t, 0.006, dur, vol); o.connect(g); g.connect(dest || out); o.start(t); o.stop(t + dur + 0.05);
    }
    function noise(dur, vol, type, f0, f1, q, delay, dest, attack) {
      var t = ctx.currentTime + (delay || 0), src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      src.buffer = noiseBuf; src.loop = true; f.type = type; f.Q.value = q || 1;
      f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
      env(g, t, attack || Math.min(0.03, dur / 3), dur, vol); src.connect(f); f.connect(g); g.connect(dest || out); src.start(t); src.stop(t + (attack || 0) + dur + 0.05);
    }
    /* the OP soundtrack: 150 BPM, A minor (Am F C G), drums + bass + a lead that
       enters for the hero shot. Everything is scheduled up front on the audio clock. */
    var music = null;
    function playOp(startMs, beats, beatMs, cutBeats) {
      if (!ready()) return;
      stopOp(true);
      music = ctx.createGain(); music.gain.value = 1; music.connect(out);
      var B = (beatMs || 400) / 1000, t0 = startMs / 1000, m = music;
      var roots = [55, 43.65, 65.41, 49];
      // build-up into the first beat
      noise(t0, 0.28, "bandpass", 300, 5000, 1.5, 0, m, t0 * 0.9);
      for (var i = 0; i < beats; i++) {
        var t = t0 + i * B, bar = Math.floor(i / 4) % 4, f = roots[bar];
        tone("sine", 150, 42, 0.28, 0.9, t, m);                              // kick
        if (i % 2 === 1) { noise(0.16, 0.45, "bandpass", 2200, 1200, 0.9, t, m); tone("triangle", 200, 150, 0.08, 0.2, t, m); } // snare
        noise(0.035, 0.12, "highpass", 8000, 9000, 1, t, m); noise(0.035, 0.08, "highpass", 8000, 9000, 1, t + B / 2, m); // hats
        tone("sawtooth", f, f, 0.18, 0.22, t, m); tone("sawtooth", f * 2, f * 2, 0.16, 0.14, t + B / 2, m);            // bass
        if (i >= (cutBeats ? cutBeats[5] : 9)) {                            // lead arpeggio for the hero + title
          var arp = [4, 4.8, 6, 8], base = f * 2;
          for (var k = 0; k < 4; k++) tone("square", base * arp[k], base * arp[k], 0.08, 0.07, t + k * B / 4, m);
        }
        if (cutBeats ? cutBeats.indexOf(i) > -1 : i % 3 === 0) noise(0.9, 0.16, "highpass", 3000, 7000, 0.7, t, m);  // crash on every cut
      }
      var end = t0 + beats * B;
      tone("sine", 110, 38, 0.9, 0.9, end, m); noise(1.4, 0.25, "highpass", 2500, 6000, 0.7, end, m); // final hit
    }
    function stopOp(now) {
      if (!music || !ctx) return;
      var g = music; music = null;
      g.gain.setValueAtTime(g.gain.value, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + (now ? 0.02 : 0.25));
      setTimeout(function () { try { g.disconnect(); } catch (e) {} }, 400);
    }
    var bank = {
      boom: function () { tone("sine", 120, 38, 0.7, 0.9); tone("triangle", 70, 30, 0.5, 0.5); noise(0.4, 0.6, "lowpass", 1400, 90, 0.7); },
      hit: function () { tone("sine", 170, 55, 0.16, 0.6); noise(0.08, 0.35, "bandpass", 1800, 600, 1.2); },
      whoosh: function () { noise(0.5, 0.35, "bandpass", 300, 3200, 1.4); },
      swoosh: function () { noise(0.55, 0.35, "bandpass", 3600, 260, 1.4); },
      drop: function () { tone("sine", 1300, 260, 0.18, 0.35); },
      splash: function () { noise(0.22, 0.2, "highpass", 2500, 6000, 0.7); },
      scribble: function () { for (var k = 0; k < 6; k++) noise(0.05, 0.12, "bandpass", 3000 + Math.random() * 2000, 2400, 3, k * 0.07); },
      type: function () { for (var k = 0; k < 7; k++) { tone("square", 1900 + Math.random() * 400, 1500, 0.025, 0.08, k * 0.065); noise(0.02, 0.08, "highpass", 4000, 5000, 1, k * 0.065); } },
      stamp: function () { tone("sine", 140, 45, 0.3, 0.8); noise(0.12, 0.45, "lowpass", 2400, 300, 1); tone("square", 420, 200, 0.05, 0.12); },
      shing: function () { tone("triangle", 1400, 2800, 0.12, 0.25); tone("sine", 3150, 3100, 0.9, 0.18, 0.05); tone("sine", 4210, 4180, 0.8, 0.12, 0.05); noise(0.3, 0.2, "highpass", 5000, 9000, 1); },
      sparkle: function () { [1568, 2093, 2637, 3136].forEach(function (f, k) { tone("sine", f, f, 0.22, 0.12, k * 0.06); }); },
      rise: function () { tone("sawtooth", 110, 440, 0.8, 0.07); noise(0.8, 0.14, "bandpass", 400, 4000, 2); },
      reveal: function () { [220, 277.2, 329.6, 440, 554.4].forEach(function (f, k) { tone("sine", f, f * 1.002, 1.6, 0.12, k * 0.04); }); noise(0.6, 0.12, "lowpass", 800, 3000, 0.5); },
      curtain: function () { noise(0.6, 0.3, "bandpass", 2400, 380, 1.1); tone("sine", 196, 262, 0.35, 0.12, 0.15); },
      blip: function () { tone("square", 880, 1320, 0.07, 0.12); },
      power: function () { tone("sine", 320, 980, 0.25, 0.3); tone("square", 1320, 1760, 0.08, 0.1, 0.2); noise(0.2, 0.15, "highpass", 3000, 7000, 1, 0.05); },
      tick: function () { tone("square", 2200, 1800, 0.02, 0.06); }
    };
    function sync() {
      $$("[data-sound-toggle]").forEach(function (b) {
        b.setAttribute("aria-pressed", on ? "true" : "false");
        var l = $(".snd-label", b); if (l) l.textContent = on ? "Sound on" : "Sound off";
        b.setAttribute("aria-label", on ? "Sound effects on (click to mute)" : "Sound effects off (click to unmute)");
      });
    }
    return {
      op: function (startMs, beats, beatMs, cutBeats) { try { playOp(startMs, beats, beatMs, cutBeats); } catch (e) {} },
      stopOp: function () { try { stopOp(); } catch (e) {} },
      play: function (name) { if (!ready() || !bank[name]) return; try { bank[name](); } catch (e) {} },
      toggle: function () { if (on) stopOp(true); on = !on; store("localStorage", "dp-sound", on ? "on" : "off"); sync(); if (on) { ready(); bank.blip(); } },
      sync: sync
    };
  })();
  // vibration on touch devices only (supported on Android; iOS Safari ignores it)
  function buzz(pattern) {
    if (finePointer || !navigator.vibrate) return;
    try { navigator.vibrate(pattern); } catch (e) {}
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-sound-toggle]");
    if (t) { e.stopPropagation(); Sfx.toggle(); }
  });

  /* ============================================================ OPENING */
  var opening = $("#opening");
  var root = document.documentElement;
  // mode "full" = arriving from the story, "quick" = skipped / returning visitor
  function startHero(mode) {
    root.classList.remove("intro-full", "intro-quick", "is-playing");
    root.classList.add(mode === "full" ? "intro-full" : "intro-quick");
    void root.offsetWidth;
    root.classList.add("is-playing");
    typeBubble(mode === "full");
    revealVisibleNow();
    if (mode === "full" && !reduce) setTimeout(function () { kvSay("Welcome in."); Sfx.play("blip"); }, 1900);
  }

  /* ---- key visual: generated skyline + embers */
  function renderStars() {
    var box = $("#kv-stars");
    if (!box) return;
    var stars = "";
    for (var n = 0; n < 40; n++) stars += '<i style="--x:' + (Math.random() * 100).toFixed(1) + '%;--y:' + (Math.random() * 100).toFixed(1) + '%"></i>';
    box.innerHTML = stars;
  }

  /* ---- the story: a timeline of scenes; every step can be interrupted by Skip */
  var storyTimers = [], storyRaf = null, storyRunning = false;
  // the OP runs on a 400ms beat (150 BPM); cuts land on the beat
  // phones get a slightly slower cut (120 BPM) so every frame can be read on a small screen
  // one cut per beat (the record gets two beats per number so it can be read)
  // the whole story runs ≤ 10s: ~9.6s on desktop, ~9.8s on phones
  var BEAT = window.matchMedia("(max-width: 719px)").matches ? 450 : 440, OP0 = 700;
  var CUTS = { words: 0, projects: 3, stats: 6, hero: 11, title: 13.5, fly: 17, reveal: 18.5 };
  var STORY = { hit: 380, hole: 800 };
  Object.keys(CUTS).forEach(function (k) { STORY[k] = OP0 + CUTS[k] * BEAT; });
  var STORY_LEN = STORY.reveal + STORY.hole;
  function at(ms, fn) { storyTimers.push(setTimeout(fn, ms)); }
  function clearStory() { storyTimers.forEach(clearTimeout); storyTimers = []; cancelAnimationFrame(storyRaf); }
  function scene(n, label) {
    opening.setAttribute("data-scene", n);
    var el = $("#story-scene");
    el.textContent = label;
    el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap");
  }
  function subtitle(text) {
    var el = $("#story-line");
    el.textContent = text;
    el.classList.remove("swap"); void el.offsetWidth; if (text) el.classList.add("swap");
  }
  function resetStory() {
    clearStory();
    storyRunning = false;
    opening.classList.remove("is-go", "is-running", "is-fly", "is-reveal", "is-lift");
    opening.setAttribute("data-scene", "0");
    opening.style.maskImage = opening.style.webkitMaskImage = "";
    $("#story-disk").style.cssText = "";
    opening.removeAttribute("data-cut");
    $$("#op .is-on, #op .whip, #op .is-drop, #op .go").forEach(function (el) { el.classList.remove("is-on", "whip", "is-drop", "go"); });
    subtitle("");
  }
  function endStory() {
    opening.hidden = true;
    resetStory();
    lockPage(false);
    var cta = $(".kv-cta--primary");
    if (cta) cta.focus({ preventScroll: true });
  }

  function renderOp() {
    $("#op").style.setProperty("--beat", BEAT + "ms");
    var words = (D.intro && D.intro.words) || [];
    $("#op-words").innerHTML = words.slice(0, 3).map(function (w, i) {
      return '<div class="op__word op__word--' + "abc"[i] + '"><i class="op__slash"></i><b>' + esc(w.word) + '</b><small class="mono">' + esc(w.caption || "") + "</small></div>";
    }).join("");
    // the record, biggest count first so the last slam is the wins
    var st = (D.person.heroStats || []).slice(0, 3).reverse();
    $("#op-stats").innerHTML = st.map(function (x, i) {
      var v = x.value < 10 && !x.suffix ? "0" + x.value : String(x.value);
      return '<div class="op__stat"><b>' + esc(v + (x.suffix || "")) + "</b><span>" + esc(x.label) + "</span>" + (i === st.length - 1 ? '<em lang="ja">ドン！</em>' : "") + "</div>";
    }).join("");
    var first = D.person.first || "", last = D.person.last || "", h1 = Math.ceil(first.length / 2), h2 = Math.ceil(last.length / 2);
    $("#op-strobe").innerHTML = [first.slice(0, h1), first.slice(h1), last.slice(0, h2), last.slice(h2)].map(function (t) { return "<b>" + esc(t) + "</b>"; }).join("");
    $("#op-projects").innerHTML = D.projects.slice(0, 3).map(function (p, i) {
      return '<div class="op__strip"><i>' + pad(i + 1) + "</i><b>" + esc(p.name) + "</b><span>" + esc(p.subtitle) + "</span></div>";
    }).join("");
  }
  function flash() { var f = $(".op__flash"); f.classList.remove("go"); void f.offsetWidth; f.classList.add("go"); }
  function pump() { var o = $("#op"); o.classList.remove("pump"); void o.offsetWidth; o.classList.add("pump"); }
  function cutTo(name, label) { opening.setAttribute("data-cut", name); scene("op", label); flash(); }
  // light up child k of a cut on each beat; exclusive cuts show one child at a time
  function onBeats(sel, t, exclusive, sfx, vib, step) {
    $$(sel).forEach(function (el, k) {
      at(t + k * (step || BEAT), function () {
        if (exclusive) $$(sel).forEach(function (x) { x.classList.remove("is-on"); });
        el.classList.add("is-on");
        pump();
        if (sfx) Sfx.play(sfx);
        if (vib) buzz(vib);
      });
    });
  }

  function playStory() {
    if (storyRunning) return;
    storyRunning = true;
    store("sessionStorage", "dp-opened", "1");
    window.scrollTo(0, 0);
    // the homepage waits underneath in its "arriving from the story" pose
    root.classList.remove("is-playing", "intro-quick");
    root.classList.add("intro-full");
    opening.style.setProperty("--story-len", STORY.reveal + "ms");
    opening.focus({ preventScroll: true });

    // 0 · the hit: impact frames, a shake and a ドン！ — then the soundtrack kicks in
    opening.classList.add("is-impact", "is-running");
    Sfx.play("boom"); buzz([35, 45, 25]);
    Sfx.op(OP0, Math.ceil(CUTS.fly), BEAT, [CUTS.words, CUTS.projects, CUTS.stats, 8, 9, CUTS.hero, Math.round(CUTS.title)]);
    at(STORY.hit, function () { opening.classList.remove("is-impact"); scene(1, "Ready"); });

    // 1 · DESIGN / CODE / SHIP
    at(STORY.words, function () { cutTo("words", "01 · Design · Code · Ship"); });
    onBeats(".op__word", STORY.words, true, "hit", 16);
    // 2 · the projects, whip-panned out on the last half-beat
    at(STORY.projects, function () { cutTo("projects", "02 · The chapters"); });
    onBeats(".op__strip", STORY.projects, false, "whoosh", 12);
    at(STORY.stats - BEAT / 2, function () { $("#op-projects").classList.add("whip"); Sfx.play("swoosh"); });
    // 3 · the record
    at(STORY.stats, function () { cutTo("stats", "03 · The record"); });
    onBeats(".op__stat", STORY.stats, true, "stamp", [30, 20, 30], BEAT * (CUTS.hero - CUTS.stats) / 3);
    // 4 · hero pose: the robot flies in, the lens flashes
    at(STORY.hero, function () { cutTo("hero", "04 · The companion"); pump(); Sfx.play("rise"); buzz(20); });
    at(STORY.hero + BEAT * 1.5, function () { Sfx.play("shing"); buzz([15, 25, 15]); });
    // 5 · title drop: four strobe frames, then the name over the sun
    at(STORY.title, function () { cutTo("title", "05 · Title"); });
    $$(".op__strobe b").forEach(function (el, k) {
      at(STORY.title + k * BEAT / 4, function () { $$(".op__strobe b").forEach(function (x) { x.classList.remove("is-on"); }); el.classList.add("is-on"); Sfx.play("tick"); buzz(8); });
    });
    at(STORY.title + BEAT + 20, function () {
      $$(".op__strobe b").forEach(function (x) { x.classList.remove("is-on"); });
      $(".op__title").classList.add("is-drop"); flash(); pump();
      Sfx.play("boom"); buzz([40, 30, 40]);
    });

    // 6 · the sun flies to its place on the homepage (it becomes the moon at night)
    at(STORY.fly, function () {
      var ir = $("#op-sun").getBoundingClientRect(), orb = $(".kv__orb").getBoundingClientRect(), disk = $("#story-disk");
      disk.style.transition = "none";
      disk.style.left = orb.left + "px"; disk.style.top = orb.top + "px";
      disk.style.width = orb.width + "px"; disk.style.height = orb.height + "px";
      disk.style.transform = "translate(" + (ir.left - orb.left).toFixed(1) + "px," + (ir.top - orb.top).toFixed(1) + "px) scale(" + (ir.width / orb.width).toFixed(4) + ")";
      opening.classList.add("is-fly");
      void disk.offsetWidth;
      disk.style.transition = "transform " + (STORY.reveal - STORY.fly - 20) + "ms var(--ease-inout)";
      disk.style.transform = "none";
      Sfx.play("swoosh");
    });
    // 7 · the page opens around the sun: an iris wipe onto the homepage
    at(STORY.reveal, function () {
      var orb = $(".kv__orb").getBoundingClientRect();
      var cx = orb.left + orb.width / 2, cy = orb.top + orb.height / 2, r0 = orb.width / 2 - 1.5;
      var r1 = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy)) + 20;
      opening.classList.add("is-reveal");
      startHero("full");
      Sfx.play("reveal"); buzz(25);
      var t0 = performance.now();
      (function step(t) {
        var p = Math.min(1, (t - t0) / STORY.hole);
        var e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        var r = r0 + (r1 - r0) * e;
        var m = "radial-gradient(circle at " + cx.toFixed(1) + "px " + cy.toFixed(1) + "px, transparent " + r.toFixed(1) + "px, #000 " + (r + 1).toFixed(1) + "px)";
        opening.style.webkitMaskImage = m; opening.style.maskImage = m;
        if (p < 1) storyRaf = requestAnimationFrame(step); else endStory();
      })(t0);
    });
  }

  /* Skip: no story, no slam. The cover lifts like a curtain and the page rises to meet it. */
  function skipStory() {
    if (opening.hidden || opening.classList.contains("is-lift")) return;
    clearStory();
    Sfx.stopOp();
    store("sessionStorage", "dp-opened", "1");
    window.scrollTo(0, 0);
    if (reduce) { opening.hidden = true; resetStory(); lockPage(false); startHero("quick"); return; }
    opening.classList.add("is-lift");
    Sfx.play("curtain"); buzz(10);
    setTimeout(function () { startHero("quick"); }, 120);
    setTimeout(endStory, 800);
  }

  function showOpening() {
    resetStory();
    root.classList.remove("is-playing", "intro-full", "intro-quick");
    opening.hidden = false;
    lockPage(true);
    setTimeout(function () { $("#opening-start").focus({ preventScroll: true }); }, 50);
    // wait for the display font so letters never drop in a fallback face
    var ready = document.fonts && document.fonts.load ? document.fonts.load('1em "Dela Gothic One"') : Promise.resolve();
    var go = function () { if (!opening.hidden) { void opening.offsetWidth; opening.classList.add("is-go"); } };
    Promise.race([ready, new Promise(function (r) { setTimeout(r, 1200); })]).then(go, go);
  }
  $("#opening-start").addEventListener("click", function () { if (reduce) skipStory(); else playStory(); });
  $("#opening-skip").addEventListener("click", skipStory);
  $("#replay").addEventListener("click", function () {
    var b = $("#hero-bubble");
    b.classList.remove("is-done");
    $("p", b).textContent = "";
    window.scrollTo({ top: 0, behavior: "auto" });
    showOpening();
  });

  /* split hero name into letters */
  function splitLetters() {
    var i = 0, heading = null;
    $$("[data-split]").forEach(function (el) {
      var h = el.closest("h1, h2");
      if (h !== heading) { heading = h; i = 0; }
      var txt = el.textContent;
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = txt.split("").map(function (c) { return '<span class="ch" style="--i:' + i++ + '">' + esc(c) + "</span>"; }).join("");
    });
  }

  /* typewriter speech bubble */
  var typing = null;
  function typeBubble(animated) {
    var b = $("#hero-bubble"), p = $("p", b), text = D.person.tagline, n = 0;
    clearInterval(typing);
    if (reduce || !animated) { p.textContent = text; b.classList.add("is-done"); return; }
    p.textContent = "";
    setTimeout(function () {
      typing = setInterval(function () {
        n++;
        p.textContent = text.slice(0, n);
        if (n >= text.length) { clearInterval(typing); setTimeout(function () { b.classList.add("is-done"); }, 1200); }
      }, 26);
    }, 1100);
  }

  /* rotating class line */
  /* ---- class select: tabs like a fighting-game roster, auto-cycling */
  var setClass = function () {};
  var classIndex = 0;
  function classSelect() {
    var box = $("#kv-class"), tabsEl = $("#kv-class-tabs"), desc = $("#kv-class-desc"), count = $("#kv-class-count");
    if (!box) return;
    var list = D.person.classes || D.person.roles.map(function (r) { return { name: r, short: r, desc: "" }; });
    var CYCLE = 3600, pausedUntil = 0;
    box.style.setProperty("--cycle", CYCLE + "ms");
    tabsEl.innerHTML = list.map(function (c, i) {
      return '<button class="kv__tab" type="button" role="tab" id="kv-tab-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" aria-controls="kv-class-desc">' +
        '<span><b>' + pad(i + 1) + '</b><em class="l">' + esc(c.name) + '</em><em class="s">' + esc(c.short) + "</em></span><i></i></button>";
    }).join("");
    var tabs = $$(".kv__tab", tabsEl);
    setClass = function (i, byUser) {
      classIndex = (i + list.length) % list.length;
      tabs.forEach(function (t, k) {
        var on = k === classIndex;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var bar = $("i", t); bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = "";
      });
      desc.innerHTML = "<b>" + esc(list[classIndex].name) + ".</b> " + esc(list[classIndex].desc);
      desc.classList.remove("swap"); void desc.offsetWidth; desc.classList.add("swap");
      count.textContent = pad(classIndex + 1) + " / " + pad(list.length);
      if (byUser) pausedUntil = Date.now() + 9000;
    };
    setClass(0);
    tabsEl.addEventListener("click", function (e) {
      var t = e.target.closest(".kv__tab");
      if (t) { setClass(tabs.indexOf(t), true); kvReact(); Sfx.play("tick"); buzz(6); }
    });
    tabsEl.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      setClass(classIndex + d, true);
      tabs[classIndex].focus();
    });
    box.addEventListener("pointerenter", function () { box.classList.add("is-paused"); });
    box.addEventListener("pointerleave", function () { box.classList.remove("is-paused"); });
    box.addEventListener("focusin", function () { box.classList.add("is-paused"); });
    box.addEventListener("focusout", function () { box.classList.remove("is-paused"); });
    if (reduce) return;
    setInterval(function () {
      if (box.classList.contains("is-paused") || Date.now() < pausedUntil || window.scrollY > window.innerHeight) return;
      setClass(classIndex + 1);
    }, CYCLE);
  }

  /* ---- the protagonist: watches the cursor, blinks, powers up when poked */
  var kvReact = function () {};
  var kvSay = function () {};
  function kvCharacter() {
    var char = $("#kv-char"), iris = $("#kv-iris"), head = $("#kv-head"), eyeEl = $("#kv-eye"), speech = $("#kv-speech"), poke = $("#kv-poke");
    if (!char) return;
    var tx = 0, ty = 0, rot = 0, x = 0, y = 0, r = 0, lastMove = 0, raf = null, lastQuip = -1, speechT;
    function aim(cx, cy) {
      var b = eyeEl.getBoundingClientRect();
      var ex = b.left + b.width / 2, ey = b.top + b.height / 2;
      var dx = cx - ex, dy = cy - ey, d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 300);
      tx = (dx / d) * 11 * k;
      ty = (dy / d) * 8 * k;
      rot = reduce ? 0 : clamp(dx / window.innerWidth * 10, -6, 6);
      loop();
    }
    function loop() {
      if (raf) return;
      raf = requestAnimationFrame(function step() {
        x += (tx - x) * 0.22; y += (ty - y) * 0.22; r += (rot - r) * 0.12;
        iris.setAttribute("transform", "translate(" + x.toFixed(2) + " " + y.toFixed(2) + ")");
        head.style.transform = "rotate(" + r.toFixed(2) + "deg)";
        if (Math.abs(tx - x) > 0.03 || Math.abs(ty - y) > 0.03 || Math.abs(rot - r) > 0.03) raf = requestAnimationFrame(step);
        else raf = null;
      });
    }
    window.addEventListener("pointermove", function (e) {
      if (window.scrollY > window.innerHeight) return;
      lastMove = Date.now(); aim(e.clientX, e.clientY);
    }, { passive: true });
    window.addEventListener("pointerdown", function (e) { lastMove = Date.now(); aim(e.clientX, e.clientY); }, { passive: true });

    poke.addEventListener("pointerenter", function () { char.classList.add("is-hover"); });
    poke.addEventListener("pointerleave", function () { char.classList.remove("is-hover"); });
    poke.addEventListener("focus", function () { char.classList.add("is-hover"); });
    poke.addEventListener("blur", function () { char.classList.remove("is-hover"); });

    kvSay = function (text) {
      speech.textContent = text;
      speech.classList.remove("is-on"); void speech.offsetWidth; speech.classList.add("is-on");
      clearTimeout(speechT);
      speechT = setTimeout(function () { speech.classList.remove("is-on"); }, 2200);
    };
    kvReact = function () {
      char.classList.remove("is-power"); void char.offsetWidth; char.classList.add("is-power");
      setTimeout(function () { char.classList.remove("is-power"); }, 1100);
    };
    // the name: ripple on hover, special move on click / tap
    var nameEl = $("#hero-name"), waveT, superT, superLines = ["Special move!", "Full power!", "Barrel roll!", "Let's gooo!"];
    nameEl.setAttribute("role", "button");
    nameEl.setAttribute("tabindex", "0");
    nameEl.addEventListener("mouseenter", function () {
      nameEl.classList.add("wave");
      clearTimeout(waveT); waveT = setTimeout(function () { nameEl.classList.remove("wave"); }, 380);
      Sfx.play("tick");
    });
    function superMove() {
      if (reduce) { kvSay(superLines[0]); return; }
      nameEl.classList.remove("shock", "wave"); void nameEl.offsetWidth; nameEl.classList.add("shock");
      char.classList.remove("is-super"); void char.offsetWidth; char.classList.add("is-super");
      clearTimeout(superT); superT = setTimeout(function () { char.classList.remove("is-super"); nameEl.classList.remove("shock"); }, 1550);
      Sfx.play("rise"); setTimeout(function () { Sfx.play("shing"); }, 550); setTimeout(function () { Sfx.play("hit"); }, 1150);
      buzz([20, 60, 30, 60, 40]);
      setTimeout(function () { kvSay(superLines[Math.floor(Math.random() * superLines.length)]); }, 500);
      setClass(classIndex + 1, true);
    }
    nameEl.addEventListener("click", superMove);
    nameEl.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); superMove(); } });

    poke.addEventListener("click", function () {
      char.classList.add("was-poked");
      kvReact();
      Sfx.play("power");
      var q = D.person.quips || [], n;
      if (q.length) {
        do { n = Math.floor(Math.random() * q.length); } while (q.length > 1 && n === lastQuip);
        lastQuip = n;
        kvSay(q[n]);
      }
      setClass(classIndex + 1, true);
      buzz(14);
    });

    if (reduce) return;
    // blink now and then; glance around when nobody is pointing
    (function blink() {
      setTimeout(function () {
        eyeEl.classList.add("is-blink");
        setTimeout(function () { eyeEl.classList.remove("is-blink"); blink(); }, 240);
      }, 2400 + Math.random() * 3800);
    })();
    setInterval(function () {
      if (Date.now() - lastMove < 2600) return;
      tx = (Math.random() * 2 - 1) * 9; ty = (Math.random() * 2 - 1) * 6; rot = (Math.random() * 2 - 1) * 3; loop();
    }, 2200);
  }

  /* key-visual depth: layers drift with the pointer and lag behind the scroll */
  var kvLayers = $$(".kv [data-depth]"), kvTitle = $(".kv__title"), kvMx = 0, kvMy = 0;
  function kvUpdate() {
    var y = Math.min(window.scrollY, window.innerHeight);
    kvLayers.forEach(function (el) {
      var d = +el.dataset.depth;
      el.style.setProperty("--px", (-kvMx * d * 28).toFixed(1) + "px");
      el.style.setProperty("--py", (-kvMy * d * 18 + y * (1 - d) * 0.55).toFixed(1) + "px");
    });
    if (kvTitle) {
      kvTitle.style.transform = "translateY(" + (-y * 0.1).toFixed(1) + "px)";
      kvTitle.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.75)).toFixed(3);
    }
    // 0 → 1 as Chapter 01 slides up over the pinned landing
    $("#home").style.setProperty("--leave", (y / window.innerHeight).toFixed(3));
  }

  /* ---- the curtain: Chapter 01 rises over the pinned landing, carrying a marquee strip */
  function renderLift() {
    var about = $("#about"); if (!about) return;
    var t = (about.dataset.chapter || "01") + " · " + (about.dataset.title || "") + " · " + (about.dataset.kanji || "") + " · ";
    var lift = document.createElement("div");
    lift.className = "lift";
    lift.setAttribute("aria-hidden", "true");
    lift.innerHTML = '<div class="lift__run"><span>' + esc(t.repeat(5)) + "</span><span>" + esc(t.repeat(5)) + "</span></div>";
    about.insertBefore(lift, about.firstChild);
  }
  function heroParallax() {
    if (reduce) return;
    if (finePointer) {
      $("#home").addEventListener("pointermove", function (e) {
        kvMx = e.clientX / window.innerWidth - 0.5; kvMy = e.clientY / window.innerHeight - 0.5;
        requestAnimationFrame(kvUpdate);
      });
      $("#home").addEventListener("pointerleave", function () { kvMx = kvMy = 0; requestAnimationFrame(kvUpdate); });
    }
  }

  /* ============================================================ REVEALS */
  var io;
  function initReveals() {
    var targets = $$(".reveal, .skill-board, .arc, [data-count]");
    // panels land with a slight alternating tilt, like pasted-up manga frames
    $$(".panel.reveal").forEach(function (el, i) { el.style.setProperty("--rot", (i % 2 ? 1.4 : -1.4) + "deg"); });
    if (!("IntersectionObserver" in window) || reduce) {
      targets.forEach(function (t) { t.classList.add("in"); countUp(t, true); });
      return;
    }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        // hold hero reveals until the opening is dismissed
        if (!opening.hidden && e.target.closest("#home")) return;
        io.unobserve(e.target);
        e.target.classList.add("in");
        if (e.target.classList.contains("skill-board")) setTimeout(function () { e.target.classList.add("settled"); }, 1400);
        countUp(e.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  }
  function revealVisibleNow() {
    $$("#home .reveal").forEach(function (el, i) {
      el.style.setProperty("--d", i * 0.12 + "s");
      el.classList.add("in");
      if (io) io.unobserve(el);
    });
  }
  function countUp(el, instant) {
    if (!el.hasAttribute || !el.hasAttribute("data-count")) return;
    var to = +el.dataset.count, dec = +el.dataset.decimals || 0, suf = el.dataset.suffix || "";
    if (instant || reduce) { el.textContent = to.toFixed(dec) + suf; return; }
    var t0 = performance.now(), dur = 1200;
    (function step(t) {
      var p = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ============================================================ READER */
  var reader = $("#reader"), readerPage = $("#reader-page"), readerAt = 0, readerReturn = null;
  function readerHTML(i) {
    var p = D.projects[i], n = D.projects.length;
    var link = function (url, label) {
      return url
        ? '<a class="btn" href="' + esc(url) + '" target="_blank" rel="noopener">' + label + " ↗</a>"
        : '<span class="btn" aria-disabled="true">' + label + " · soon</span>";
    };
    var anyLink = p.links && (p.links.live || p.links.source);
    return '<div class="reader__bar">' +
        '<span class="mono"><b>Chapter ' + pad(i + 1) + "</b> / " + pad(n) + ' <span class="reader__hint">· swipe ↔</span></span>' +
        '<div class="reader__nav">' +
          '<button type="button" data-go="-1" aria-label="Previous chapter"' + (i === 0 ? " disabled" : "") + ">←</button>" +
          '<button type="button" data-go="1" aria-label="Next chapter"' + (i === n - 1 ? " disabled" : "") + ">→</button>" +
          '<button type="button" data-close aria-label="Close chapter">✕</button>' +
        "</div>" +
      "</div>" +
      '<div class="rgrid">' +
        '<div class="rhead">' +
          '<span class="rsub">' + esc(p.subtitle) + " · " + esc(p.year) + " · " + esc(p.status) + "</span>" +
          '<h3 id="reader-title">' + esc(p.name) + "</h3>" +
          '<p class="rtag">' + esc(p.tagline) + "</p>" +
        "</div>" +
        '<div class="rart panel">' + artFor(p) + "</div>" +
        '<div class="rpanel panel rproblem"><span class="rlabel">The problem</span>' + esc(p.problem) + "</div>" +
        '<div class="rpanel panel rfeatures"><span class="rlabel">Key features</span><ol>' +
          p.features.map(function (f) { return "<li><span>" + esc(f) + "</span></li>"; }).join("") + "</ol></div>" +
        '<div class="rpanel panel rrole"><span class="rlabel">My role</span><strong>' + esc(p.role) + "</strong></div>" +
        '<div class="rpanel panel rstack"><span class="rlabel">Tech stack</span><div class="chips">' +
          p.stack.map(function (s) { return '<span class="chip">' + esc(s) + "</span>"; }).join("") + "</div></div>" +
        (p.outcome ? '<div class="rpanel panel routcome"><span class="rlabel">Outcome</span>' + esc(p.outcome) + "</div>" : "") +
        '<div class="rpanel panel rlinkp"><span class="rlabel">Read more</span><div class="rlinks">' +
          link(p.links && p.links.live, "Live demo") + link(p.links && p.links.source, "Source") +
          (anyLink ? "" : '<a class="note" href="' + esc(D.person.github) + '" target="_blank" rel="noopener">Public links are on the way. In the meantime, browse my GitHub ↗</a>') +
        "</div></div>" +
      "</div>" +
      '<div class="rfooter">' +
        '<span class="mono" style="color:var(--muted)">' + (i < n - 1 ? "Next: " + esc(D.projects[i + 1].name) : "End of volume") + "</span>" +
        (i < n - 1 ? '<button class="next" type="button" data-go="1">Turn the page →</button>' : '<button class="next" type="button" data-close>Back to chapters</button>') +
      "</div>";
  }
  function openReader(i, from) {
    var dir = i > readerAt ? "next" : "prev";
    readerAt = i;
    if (from) readerReturn = from;
    readerPage.innerHTML = readerHTML(i);
    if (reader.hidden) {
      readerPage.removeAttribute("data-turn");
      reader.hidden = false;
      lockPage(true);
    } else {
      readerPage.setAttribute("data-turn", dir);
      readerPage.style.animation = "none"; void readerPage.offsetWidth; readerPage.style.animation = "";
    }
    readerPage.scrollTop = 0;
    readerPage.focus();
  }
  // swipe sideways to turn pages, pull down from the top to close (touch)
  (function readerSwipe() {
    var x0 = 0, y0 = 0, t0 = 0, tracking = false;
    readerPage.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) return;
      tracking = true; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = Date.now();
    }, { passive: true });
    readerPage.addEventListener("touchend", function (e) {
      if (!tracking) return;
      tracking = false;
      var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      if (Date.now() - t0 > 700) return;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        var next = readerAt + (dx < 0 ? 1 : -1);
        if (next >= 0 && next < D.projects.length) openReader(next);
      } else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.4 && readerPage.scrollTop <= 0) {
        closeReader();
      }
    }, { passive: true });
  })();
  function closeReader() {
    reader.hidden = true;
    lockPage(false);
    if (readerReturn) readerReturn.focus();
  }
  reader.addEventListener("click", function (e) {
    var go = e.target.closest("[data-go]");
    if (go) { openReader(clamp(readerAt + +go.dataset.go, 0, D.projects.length - 1)); return; }
    if (e.target.closest("[data-close]")) closeReader();
  });

  /* global keys */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!opening.hidden) skipStory();
      else if (!reader.hidden) closeReader();
      else if (!index.hidden) closeIndex();
    }
    if (!reader.hidden && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
      var next = readerAt + (e.key === "ArrowRight" ? 1 : -1);
      if (next >= 0 && next < D.projects.length) openReader(next);
    }
    // keep Tab inside open overlays
    if (e.key === "Tab") {
      var box = !reader.hidden ? readerPage : !index.hidden ? index : !opening.hidden ? opening : null;
      if (!box) return;
      var f = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', box).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === box)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  $("#project-page").addEventListener("click", function (e) {
    var c = e.target.closest("[data-project]");
    if (c) openReader(+c.dataset.project, c);
  });

  /* ============================================================ JOURNEY PIN */
  var jSection = $("#journey"), jTrack = $("#journey-track"), jPin = $("#journey-pin");
  var jDist = 0, jPinned = false;
  var wideMQ = window.matchMedia("(min-width: 1000px)");
  function journeyLayout() {
    jPinned = wideMQ.matches && !reduce;
    jSection.classList.toggle("is-pinned", jPinned);
    if (!jPinned) {
      jSection.style.height = "";
      jTrack.style.transform = "";
      return;
    }
    jDist = Math.max(0, jTrack.scrollWidth - jPin.clientWidth);
    jSection.style.height = jDist + window.innerHeight + "px";
    journeyScroll();
  }
  function journeyScroll() {
    if (!jPinned) return;
    var r = jSection.getBoundingClientRect();
    var total = jSection.offsetHeight - window.innerHeight;
    var p = total > 0 ? clamp(-r.top / total, 0, 1) : 0;
    jTrack.style.transform = "translate3d(" + (-p * jDist).toFixed(1) + "px,0,0)";
    $("#journey-bar").style.transform = "scaleX(" + p + ")";
    var at = Math.round(p * (D.journey.length - 1));
    $("#journey-current").textContent = pad(at + 1);
    // milestones the camera has passed light up; ticks follow the progress bar
    var mid = window.innerWidth * 0.62;
    $$(".jcard", jTrack).forEach(function (c) { c.classList.toggle("is-seen", c.getBoundingClientRect().left < mid); });
    $$("#journey-ticks i").forEach(function (t, k) { t.classList.toggle("on", k <= at); });
  }

  /* ============================================================ SKILLS */
  function initSkills() {
    var board = $("#skill-board"), scan = $("#skill-scan"), filterBox = $("#skill-filter");
    var nodes = $$(".snode", board);
    var projIdx = {};
    D.projects.forEach(function (p, i) { projIdx[p.id] = i; });
    var anchorFor = { technojam: "#achievements", hackathons: "#achievements", startup: "#journey", coddyio: "#contact" };

    // phones: each ability card collapses into an accordion row
    var narrow = window.matchMedia("(max-width: 599px)");
    var heads = $$(".scard__head", board);
    function setupAccordion() {
      heads.forEach(function (h) {
        var card = h.parentElement;
        if (narrow.matches) {
          h.setAttribute("role", "button");
          h.setAttribute("tabindex", "0");
          h.setAttribute("aria-controls", "scard-tree-" + h.dataset.cat);
          h.setAttribute("aria-expanded", card.classList.contains("is-open") ? "true" : "false");
        } else {
          ["role", "tabindex", "aria-controls", "aria-expanded"].forEach(function (a) { h.removeAttribute(a); });
        }
      });
    }
    function toggleCard(card, open) {
      card.classList.toggle("is-open", open);
      var h = $(".scard__head", card);
      if (narrow.matches) h.setAttribute("aria-expanded", open ? "true" : "false");
    }
    setupAccordion();
    narrow.addEventListener("change", setupAccordion);
    board.addEventListener("keydown", function (e) {
      var h = e.target.closest(".scard__head");
      if (h && narrow.matches && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); h.click(); }
    });

    board.addEventListener("click", function (e) {
      var h = e.target.closest(".scard__head");
      if (h && narrow.matches) { var c = h.parentElement; toggleCard(c, !c.classList.contains("is-open")); return; }
      var b = e.target.closest(".snode");
      if (!b) return;
      var on = b.getAttribute("aria-pressed") !== "true";
      nodes.forEach(function (n) { n.setAttribute("aria-pressed", "false"); });
      scan.classList.toggle("is-active", on);
      if (!on) { scan.innerHTML = '<p class="skill-scan__hint mono">▸ Ability scan: select an ability to see where it was unlocked.</p>'; return; }
      b.setAttribute("aria-pressed", "true");
      var s = skillIndex[+b.dataset.skill];
      scan.innerHTML = '<div class="scan">' +
        '<div class="scan__top"><span class="scan__name">' + esc(s.name) + '</span><span class="scan__cat mono">' + esc(s.category) + " · seen in " + s.used.length + (s.used.length === 1 ? " place" : " places") + "</span></div>" +
        '<div class="scan__used"><span class="mono" style="color:var(--muted)">Unlocked via</span>' +
          s.used.map(function (u) {
            var name = esc(D.evidence[u] || u);
            if (u in projIdx) return '<button class="tag tag--ink" type="button" data-open="' + projIdx[u] + '">' + name + " → read</button>";
            return '<a class="tag" href="' + (anchorFor[u] || "#journey") + '">' + name + "</a>";
          }).join("") +
        "</div></div>";
    });
    scan.addEventListener("click", function (e) {
      var o = e.target.closest("[data-open]");
      if (o) openReader(+o.dataset.open, o);
    });
    if (filterBox) filterBox.addEventListener("click", function (e) {
      var b = e.target.closest("[data-filter]");
      if (!b) return;
      $$("button", filterBox).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      var f = b.dataset.filter;
      nodes.forEach(function (n) {
        var s = skillIndex[+n.dataset.skill];
        var hit = !f || s.used.indexOf(f) > -1;
        n.classList.toggle("is-dim", !!f && !hit);
        n.classList.toggle("is-lit", !!f && hit);
      });
      // show how many abilities light up per card, and open the cards that have hits
      $$(".scard", board).forEach(function (card, ci) {
        var lit = $$(".snode.is-lit", card).length;
        $(".scard__lit", card).textContent = f ? " · " + lit + " lit" : "";
        card.classList.toggle("has-lit", lit > 0);
        if (narrow.matches) toggleCard(card, f ? lit > 0 : ci === 0);
      });
    });
  }

  /* ============================================================ ARC TILT */
  function arcTilt() {
    if (reduce || !finePointer) return;
    $$(".arc").forEach(function (a) {
      a.addEventListener("pointermove", function (e) {
        var r = a.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        a.style.transform = "rotateX(" + (-y * 8).toFixed(2) + "deg) rotateY(" + (x * 10).toFixed(2) + "deg) translateZ(0)";
      });
      a.addEventListener("pointerleave", function () { a.style.transform = ""; });
    });
  }

  /* ============================================================ INK CANVAS */
  var inkRedraw = null;
  function inkCanvas() {
    var cv = $("#ink-canvas");
    if (!cv) return;
    var ctx = cv.getContext("2d");
    var S = 10, cols, rows, cells, w, h, dpr, dirty = true;
    function colors() {
      var cs = getComputedStyle(cv);
      return { ink: cs.getPropertyValue("--ink").trim() || "#141312", accent: cs.getPropertyValue("--accent").trim() || "#e0402f", paper: cs.getPropertyValue("--paper").trim() };
    }
    var col = colors();
    function seed() {
      if (!cols || !rows) return; // canvas not laid out yet (e.g. hidden preview)
      // pre-ink a word so the canvas explains itself
      var o = document.createElement("canvas");
      o.width = cols; o.height = rows;
      var c = o.getContext("2d");
      c.fillStyle = "#000";
      c.font = "bold " + Math.floor(rows * 0.62) + "px 'Dela Gothic One', Impact, sans-serif";
      c.textAlign = "center"; c.textBaseline = "middle";
      c.fillText("INK", cols / 2, rows / 2 + 1);
      var d = c.getImageData(0, 0, cols, rows).data;
      for (var i = 0; i < cols * rows; i++) {
        var gx = i % cols, gy = (i / cols) | 0;
        var grad = Math.max(0, 1 - Math.hypot(gx - cols * 0.8, gy - rows * 0.2) / (cols * 0.5)) * 0.45;
        cells[i].v = Math.max(d[i * 4 + 3] / 255 * 0.85, grad);
        cells[i].hot = 0;
      }
    }
    function size() {
      var r = cv.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var nc = Math.ceil(w / S), nr = Math.ceil(h / S);
      var old = cells, oc = cols;
      cols = nc; rows = nr;
      cells = [];
      for (var i = 0; i < cols * rows; i++) cells.push({ v: 0, hot: 0 });
      if (old) {
        for (var y = 0; y < rows; y++) for (var x = 0; x < Math.min(cols, oc); x++) {
          var o = old[y * oc + x]; if (o) cells[y * cols + x] = o;
        }
      } else seed();
      dirty = true;
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      var anyHot = false;
      for (var i = 0; i < cells.length; i++) {
        var c = cells[i];
        if (c.v < 0.03) continue;
        var x = (i % cols) * S + S / 2, y = ((i / cols) | 0) * S + S / 2;
        var rad = Math.min(S * 0.62, c.v * S * 0.62);
        ctx.fillStyle = c.hot > 0.05 ? col.accent : col.ink;
        ctx.beginPath(); ctx.arc(x, y, rad, 0, 6.283); ctx.fill();
        if (c.hot > 0) { c.hot *= 0.94; anyHot = true; if (c.hot < 0.05) c.hot = 0; }
      }
      return anyHot;
    }
    function frame() {
      if (dirty && cells) { dirty = draw(); }
      requestAnimationFrame(frame);
    }
    var down = false, last = null;
    function paint(px, py) {
      var R = 34;
      var gx0 = Math.max(0, Math.floor((px - R) / S)), gx1 = Math.min(cols - 1, Math.ceil((px + R) / S));
      var gy0 = Math.max(0, Math.floor((py - R) / S)), gy1 = Math.min(rows - 1, Math.ceil((py + R) / S));
      for (var gy = gy0; gy <= gy1; gy++) for (var gx = gx0; gx <= gx1; gx++) {
        var d = Math.hypot(gx * S + S / 2 - px, gy * S + S / 2 - py);
        if (d > R) continue;
        var c = cells[gy * cols + gx];
        var add = (1 - d / R) * 0.5;
        c.v = Math.min(1, c.v + add);
        c.hot = 1;
      }
      dirty = true;
    }
    function pos(e) { var r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    cv.addEventListener("pointerdown", function (e) { down = true; cv.setPointerCapture(e.pointerId); last = pos(e); paint(last[0], last[1]); });
    cv.addEventListener("pointermove", function (e) {
      var p = pos(e);
      if (down || (finePointer && e.pointerType === "mouse")) {
        // interpolate so fast strokes stay continuous
        if (last) {
          var dx = p[0] - last[0], dy = p[1] - last[1], steps = Math.ceil(Math.hypot(dx, dy) / 8);
          for (var i = 1; i <= steps; i++) paint(last[0] + dx * i / steps, last[1] + dy * i / steps);
        } else paint(p[0], p[1]);
      }
      last = p;
    });
    ["pointerup", "pointercancel"].forEach(function (t) { cv.addEventListener(t, function () { down = false; }); });
    cv.addEventListener("pointerleave", function () { last = null; });
    $("#ink-clear").addEventListener("click", function () { cells.forEach(function (c) { c.v = 0; c.hot = 0; }); dirty = true; });
    inkRedraw = function () { requestAnimationFrame(function () { col = colors(); dirty = true; }); };
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", inkRedraw);
    var ro = new ResizeObserver(function () { size(); });
    ro.observe(cv);
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () {
      if (cols) { seed(); dirty = true; }
    });
    requestAnimationFrame(frame);
  }

  /* ============================================================ CURSOR */
  function cursor() {
    if (reduce || !finePointer) return;
    var c = $(".cursor"), x = -100, y = -100, cx = -100, cy = -100;
    window.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY; c.classList.add("is-on");
      var t = e.target.closest && e.target.closest("a, button, .snode, [data-project], #ink-canvas");
      c.classList.toggle("is-hover", !!t && t.id !== "ink-canvas");
    }, { passive: true });
    document.addEventListener("pointerdown", function () { c.classList.add("is-down"); });
    document.addEventListener("pointerup", function () { c.classList.remove("is-down"); });
    document.documentElement.addEventListener("pointerleave", function () { c.classList.remove("is-on"); });
    (function loop() {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      c.style.transform = "translate(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px)";
      requestAnimationFrame(loop);
    })();
  }

  /* ============================================================ TAP INK (touch) */
  function tapInk() {
    if (reduce) return;
    document.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" || e.target.closest("#ink-canvas")) return;
      var b = document.createElement("span");
      b.className = "burst";
      b.setAttribute("aria-hidden", "true");
      b.style.left = e.clientX + "px";
      b.style.top = e.clientY + "px";
      var html = "";
      for (var k = 0; k < 8; k++) html += '<i style="--a:' + (k * 45 + Math.random() * 16 - 8).toFixed(0) + 'deg"></i>';
      b.innerHTML = html + "<b></b>";
      document.body.appendChild(b);
      setTimeout(function () { b.remove(); }, 650);
    }, { passive: true });
  }

  /* ============================================================ COPY EMAIL */
  function copyEmail() {
    var bub = $("#copy-bubble"), t;
    $("#copy-email").addEventListener("click", function () {
      var done = function (ok) {
        bub.textContent = ok ? "Copied! ✓" : D.person.email;
        bub.classList.add("is-on");
        clearTimeout(t); t = setTimeout(function () { bub.classList.remove("is-on"); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(D.person.email).then(function () { done(true); }, function () { done(false); });
      else done(false);
    });
  }

  /* ============================================================ BOOT */
  bindData();
  renderProfile();
  renderProjects();
  renderJourney();
  renderSkills();
  renderArcs();
  renderGallery();
  renderNow();
  renderFinal();
  renderStars();
  renderLift();
  renderOp();
  buildNav();
  $$("[data-speedlines]").forEach(speedlines);
  splitLetters();
  classSelect();
  kvCharacter();
  heroParallax();
  initSkills();
  arcTilt();
  inkCanvas();
  initGallery();
  cursor();
  tapInk();
  copyEmail();
  syncThemeMeta();
  Sfx.sync();
  initReveals();

  journeyLayout();
  wideMQ.addEventListener("change", journeyLayout);
  var rt;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { journeyLayout(); onScroll(); }, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(journeyLayout);
  window.addEventListener("load", journeyLayout);

  var seen = store("sessionStorage", "dp-opened") === "1";
  var deepLink = location.hash && location.hash !== "#home";
  if (seen || deepLink || reduce) {
    opening.hidden = true;
    startHero("quick");
  } else {
    showOpening();
  }
  onScroll();
})();
