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
      var r0 = 26 + Math.random() * 22;
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
    generic: function () {
      return '<svg class="art" viewBox="0 0 320 240" aria-hidden="true">' +
        '<rect class="paper line" x="40" y="30" width="140" height="180"/><rect class="paper line" x="190" y="30" width="90" height="85"/><rect class="accent" x="190" y="125" width="90" height="85"/>' +
        '<path class="line-thin" d="M60 60 h100 M60 76 h70"/></svg>';
    },
  };
  function artFor(p) {
    if (p.image) return '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + ' screenshot" loading="lazy" />';
    return (ART[p.art] || ART.generic)();
  }

  function silhouette() {
    return '<svg class="sil" viewBox="0 0 300 330" aria-hidden="true"><defs>' +
      '<pattern id="sil-tone" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.4" style="fill:var(--paper)" opacity=".28"/></pattern></defs>' +
      // shoulders / hoodie
      '<path class="sil__body" d="M22 330 C 28 262, 70 238, 118 230 L 182 230 C 230 238, 272 262, 278 330 Z"/>' +
      '<path class="sil__tone" d="M150 236 C 200 240, 262 262, 270 330 L 150 330 Z"/>' +
      '<path class="sil__collar" d="M118 232 C 132 262, 168 262, 182 232 M150 256 V 330"/>' +
      // neck
      '<path class="sil__body" d="M128 200 H172 L176 240 H124 Z"/>' +
      // head
      '<ellipse class="sil__body" cx="150" cy="150" rx="60" ry="72"/>' +
      // hair
      '<path class="sil__body" d="M84 168 L 62 120 L 92 124 L 72 70 L 116 94 L 118 36 L 152 82 L 176 30 L 186 88 L 232 60 L 214 110 L 248 112 L 218 150 L 222 176 L 196 128 L 170 138 L 150 118 L 124 140 L 104 128 Z"/>' +
      '<path class="sil__tone" d="M150 90 L 176 30 L 186 88 L 232 60 L 214 110 L 248 112 L 218 150 L 222 176 L 196 128 L 170 138 Z"/>' +
      // eyes glint
      '<path class="sil__eye" d="M112 160 L 138 154 L 136 162 Z"/><path class="sil__eye" d="M188 154 L 162 160 L 164 166 Z"/>' +
      // rim light
      '<path class="sil__rim" d="M212 146 C 214 186, 196 214, 170 222"/>' +
      '<path class="sil__rim" d="M232 268 C 252 282, 266 300, 270 322"/>' +
      "</svg>";
  }

  /* ============================================================ RENDERERS */
  function renderProfile() {
    var P = D.profile, me = D.person;
    var portrait = me.portrait
      ? '<img src="' + esc(me.portrait) + '" alt="Portrait of ' + esc(me.name) + '" />'
      : '<div class="speedlines" data-speedlines="80" aria-hidden="true"></div>' + silhouette();

    var stats = P.stats.map(function (s) {
      return '<li><strong data-count="' + s.value + '" data-decimals="' + (s.decimals || 0) + '" data-suffix="' + esc(s.suffix || "") + '">' +
        (s.decimals ? s.value.toFixed(s.decimals) : s.value) + esc(s.suffix || "") + "</strong><span>" + esc(s.label) + "</span></li>";
    }).join("");

    $("#profile").innerHTML =
      '<div class="profile__card panel reveal">' +
        '<div class="profile__portrait">' + portrait + '<span class="profile__badge tag tag--accent">Protagonist</span></div>' +
        '<div class="profile__id">' +
          '<p class="profile__name">' + esc(me.name) + "</p>" +
          '<p class="profile__kata" lang="ja">' + esc(me.katakana) + "</p>" +
        "</div>" +
      "</div>" +
      '<div class="sheet">' +
        '<div class="sheet__block panel reveal sheet__block--wide">' +
          '<p class="sheet__label">Status screen</p>' +
          '<dl class="dl">' +
            "<div><dt>Class</dt><dd>" + esc(P.class) + "</dd></div>" +
            "<div><dt>Guild</dt><dd>" + esc(P.guild) + "</dd></div>" +
            "<div><dt>Base</dt><dd>" + esc(P.base) + "</dd></div>" +
            "<div><dt>Focus</dt><dd>" + esc(P.focus) + "</dd></div>" +
          "</dl>" +
        "</div>" +
        '<div class="sheet__block panel reveal sheet__block--wide" style="--d:.05s">' +
          '<p class="sheet__label">Stats (real numbers only)</p>' +
          '<ul class="stats">' + stats + "</ul>" +
        "</div>" +
        '<div class="sheet__block panel reveal sheet__block--wide" style="--d:.1s">' +
          '<p class="sheet__label">Backstory</p>' +
          '<div class="story">' + P.story.map(function (s) { return '<p class="narration">' + esc(s) + "</p>"; }).join("") + "</div>" +
        "</div>" +
        '<div class="sheet__block panel reveal">' +
          '<p class="sheet__label">Traits · working style</p>' +
          '<div class="traits">' + P.traits.map(function (t, i) {
            return '<div class="trait" data-n="' + (i + 1) + '"><strong>' + esc(t.name) + "</strong><span>" + esc(t.desc) + "</span></div>";
          }).join("") + "</div>" +
        "</div>" +
        '<div class="sheet__block panel reveal" style="--d:.05s">' +
          '<p class="sheet__label">Interests</p>' +
          '<div class="chips">' + P.interests.map(function (x) { return '<span class="chip">' + esc(x) + "</span>"; }).join("") + "</div>" +
        "</div>" +
      "</div>";
  }

  function renderProjects() {
    var html = D.projects.map(function (p, i) {
      return '<button class="pcard panel reveal" type="button" data-project="' + i + '" style="--d:' + i * 0.08 + 's" aria-label="Read chapter ' + (i + 1) + ": " + esc(p.name) + ' — ' + esc(p.subtitle) + '">' +
        '<div class="pcard__art">' +
          '<div class="speedlines" data-speedlines="70" aria-hidden="true"></div>' +
          '<span class="pcard__no tag tag--ink">Ch. ' + pad(i + 1) + "</span>" +
          '<span class="pcard__status tag">' + esc(p.status) + " · " + esc(p.year) + "</span>" +
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
    html += '<div class="pcard pcard--soon panel reveal">' +
      '<span class="tag tag--ink">Ch. ' + pad(D.projects.length + 1) + "</span>" +
      '<div><p class="pcard__name">Being inked<span class="dots"></span></p><p>The next chapter is on the drawing board. See the Current Arc for what I\'m building now.</p></div>' +
      '<a class="btn" href="#now">Current arc →</a>' +
      "</div>";
    $("#project-page").innerHTML = html;
  }

  function renderJourney() {
    var J = D.journey;
    $("#journey-total").textContent = pad(J.length);
    $("#journey-track").innerHTML = J.map(function (j, i) {
      return '<li class="jcard reveal' + (j.current ? " is-current" : "") + '">' +
        '<span class="jcard__dot" aria-hidden="true"><span>' + pad(i + 1) + "</span></span>" +
        '<div class="jcard__panel panel">' +
          '<div class="jcard__top"><span class="jcard__ch">' + (j.current ? "Current arc" : "Chapter " + pad(i + 1)) + " · " + esc(j.kind) + '</span><span class="jcard__when">' + esc(j.when) + "</span></div>" +
          '<h3 class="jcard__title">' + esc(j.title) + "</h3>" +
          '<p class="jcard__place">' + esc(j.place) + "</p>" +
          '<p class="jcard__text">' + esc(j.text) + "</p>" +
          (j.current ? '<a class="jcard__go" href="#now">See the current arc →</a>' : "") +
          '<span class="jcard__big" aria-hidden="true">' + pad(i + 1) + "</span>" +
        "</div>" +
      "</li>";
    }).join("");
  }

  var skillIndex = [];
  function renderSkills() {
    var counter = 0;
    var used = {};
    $("#skill-board").innerHTML = D.skills.map(function (cat, ci) {
      return '<div class="scard panel">' +
        '<div class="scard__head"><span class="scard__glyph" aria-hidden="true">' + esc(cat.glyph) + "</span>" +
        '<div><h3 class="scard__name">' + esc(cat.category) + '</h3><span class="scard__count">' + cat.items.length + " abilities</span></div></div>" +
        '<div class="scard__tree">' + cat.items.map(function (s, si) {
          var id = skillIndex.length;
          skillIndex.push({ name: s.name, category: cat.category, used: s.used });
          s.used.forEach(function (u) { used[u] = true; });
          return '<button class="snode" type="button" aria-pressed="false" data-skill="' + id + '" style="--i:' + counter++ + '">' +
            "<span>" + esc(s.name) + "</span><small>×" + s.used.length + "</small></button>";
        }).join("") + "</div></div>";
    }).join("");

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

  function renderLab() {
    var rot = [-1.6, 1.2, -0.7, 1.7, -1.2, 0.8];
    $("#lab-board").innerHTML = D.lab.map(function (l, i) {
      return '<li class="sketch reveal" style="--r:' + rot[i % rot.length] + "deg;--d:" + (i % 2) * 0.08 + 's">' +
        '<span class="sketch__kind mono">' + esc(l.kind) + "</span>" +
        "<h3>" + esc(l.title) + "</h3>" +
        "<p>" + esc(l.text) + "</p>" +
        '<p class="sketch__origin mono">From: ' + esc(l.origin) + "</p>" +
      "</li>";
    }).join("");
  }

  function renderNow() {
    var N = D.now;
    function items(list) {
      return list.map(function (x) { return '<div class="nitem"><strong>' + esc(x.title) + "</strong><span>" + esc(x.text) + "</span></div>"; }).join("");
    }
    $("#now-updated").textContent = "The story is still being written. Last updated " + D.person.updated + ".";
    $("#now-grid").innerHTML =
      '<div class="nblock nblock--main panel reveal"><div class="nblock__label"><span class="nblock__title">Building</span><span class="tag tag--accent">Live</span></div>' +
        items(N.building) + '<div class="nprog mono"><span>In progress</span><i></i></div></div>' +
      '<div class="nblock panel reveal" style="--d:.06s"><div class="nblock__label"><span class="nblock__title">Learning</span><span class="tag">Training arc</span></div>' + items(N.learning) + "</div>" +
      '<div class="nblock panel reveal" style="--d:.12s"><div class="nblock__label"><span class="nblock__title">Experimenting</span><span class="tag">Side quests</span></div>' + items(N.experimenting) + "</div>" +
      '<div class="nblock panel reveal"><div class="nblock__label"><span class="nblock__title">Goals</span><span class="tag">This season</span></div><ul class="ngoals">' +
        N.goals.map(function (g) { return "<li>" + esc(g) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="nblock panel reveal" style="--d:.06s"><div class="nblock__label"><span class="nblock__title">Upcoming</span><span class="tag">Next episode</span></div><ul class="ngoals ngoals--ideas">' +
        N.ideas.map(function (g) { return "<li>" + esc(g) + "</li>"; }).join("") + "</ul></div>";

    var words = N.building.map(function (b) { return "Now building: " + b.title; })
      .concat(N.learning.map(function (b) { return "Learning: " + b.title; }))
      .concat(N.goals);
    var seq = words.map(function (w) { return "<span>" + esc(w) + "</span>"; }).join("");
    $("#now-marquee").innerHTML = seq + seq;
  }

  function renderFinal() {
    var me = D.person;
    var mail = function (subject) { return "mailto:" + me.email + "?subject=" + encodeURIComponent(subject); };
    var panels = [
      { k: "Option A", t: "Work with me", d: "Roles and internships in design, AI and full-stack.", href: mail("Working together — via your portfolio") },
      { k: "Option B", t: "Collaborate", d: "Hackathon teams, side projects and experiments.", href: mail("Let's collaborate") },
      { k: "Option C", t: "Discuss a project", d: "Have an idea that needs design, AI and code?", href: mail("Project idea") },
      { k: "Source", t: "GitHub", d: "Builds, experiments and code.", href: me.github, ext: true },
      { k: "Network", t: "LinkedIn", d: "Experience, updates and the professional arc.", href: me.linkedin, ext: true },
      { k: "Direct", t: "Email", d: me.email, href: "mailto:" + me.email },
    ];
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
    $("#progress-bar").style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";

    var idx = 0, invTop = false, invRail = false;
    for (var i = 0; i < chapters.length; i++) {
      var r = chapters[i].getBoundingClientRect();
      if (r.top <= vh * 0.4) idx = i;
      if (chapters[i].classList.contains("invert")) {
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
      $$("#rail-list a, #index-list a").forEach(function (a) {
        a.setAttribute("aria-current", a.getAttribute("href") === "#" + s.id ? "true" : "false");
      });
    }
    topbar.classList.toggle("on-invert", invTop);
    rail.classList.toggle("on-invert", invRail);
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
  var bg = [$("#main"), topbar, rail];
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

  /* ============================================================ OPENING */
  var opening = $("#opening");
  function startHero() {
    document.documentElement.classList.add("is-playing");
    typeBubble();
    revealVisibleNow();
  }
  function closeOpening(animated) {
    store("sessionStorage", "dp-opened", "1");
    if (!animated || reduce) {
      opening.hidden = true;
      lockPage(false);
      startHero();
      return;
    }
    opening.classList.add("is-leaving");
    setTimeout(startHero, 250);
    setTimeout(function () {
      opening.hidden = true;
      opening.classList.remove("is-leaving");
      lockPage(false);
    }, 1200);
  }
  function showOpening() {
    opening.hidden = false;
    lockPage(true);
    setTimeout(function () { $("#opening-start").focus(); }, 50);
  }
  $("#opening-start").addEventListener("click", function () { closeOpening(true); });
  $("#opening-skip").addEventListener("click", function () { closeOpening(false); });
  $("#replay").addEventListener("click", function () {
    document.documentElement.classList.remove("is-playing");
    var b = $("#hero-bubble");
    b.classList.remove("is-done");
    $("p", b).textContent = "";
    window.scrollTo({ top: 0, behavior: "auto" });
    showOpening();
  });

  /* split hero name into letters */
  function splitLetters() {
    var i = 0;
    $$("[data-split]").forEach(function (el) {
      var txt = el.textContent;
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = txt.split("").map(function (c) { return '<span class="ch" style="--i:' + i++ + '">' + esc(c) + "</span>"; }).join("");
    });
  }

  /* typewriter speech bubble */
  var typing = null;
  function typeBubble() {
    var b = $("#hero-bubble"), p = $("p", b), text = D.person.tagline, n = 0;
    clearInterval(typing);
    if (reduce) { p.textContent = text; b.classList.add("is-done"); return; }
    p.textContent = "";
    setTimeout(function () {
      typing = setInterval(function () {
        n++;
        p.textContent = text.slice(0, n);
        if (n >= text.length) { clearInterval(typing); setTimeout(function () { b.classList.add("is-done"); }, 1200); }
      }, 28);
    }, 700);
  }

  /* rotating class line */
  function roleRotator() {
    var el = $("#role-rotator"), roles = D.person.roles, i = 0;
    el.textContent = roles[0];
    if (reduce) return;
    setInterval(function () {
      i = (i + 1) % roles.length;
      el.textContent = roles[i];
      el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap");
    }, 2600);
  }

  /* ============================================================ THE EYE */
  function eye() {
    var svg = $(".eye"), iris = $("#eye-iris");
    if (!svg) return;
    var tx = 0, ty = 0, x = 0, y = 0, lastMove = 0, raf = null;
    function aim(cx, cy) {
      var r = svg.getBoundingClientRect();
      var ex = r.left + r.width * 0.5, ey = r.top + r.height * 0.5;
      var dx = cx - ex, dy = cy - ey;
      var d = Math.sqrt(dx * dx + dy * dy) || 1;
      var k = Math.min(1, d / 420);
      tx = (dx / d) * 34 * k;
      ty = (dy / d) * 16 * k;
      loop();
    }
    function loop() {
      if (raf) return;
      raf = requestAnimationFrame(function step() {
        x += (tx - x) * 0.18; y += (ty - y) * 0.18;
        iris.style.transform = "translate(" + x.toFixed(2) + "px," + y.toFixed(2) + "px)";
        if (Math.abs(tx - x) > 0.05 || Math.abs(ty - y) > 0.05) raf = requestAnimationFrame(step);
        else raf = null;
      });
    }
    window.addEventListener("pointermove", function (e) { lastMove = Date.now(); aim(e.clientX, e.clientY); }, { passive: true });
    window.addEventListener("pointerdown", function (e) { lastMove = Date.now(); aim(e.clientX, e.clientY); }, { passive: true });
    if (reduce) return;
    // idle glance + blink
    setInterval(function () {
      if (Date.now() - lastMove > 2500) {
        tx = (Math.random() * 2 - 1) * 30; ty = (Math.random() * 2 - 1) * 12; loop();
      }
    }, 1800);
    (function blink() {
      setTimeout(function () {
        svg.classList.add("is-blinking");
        setTimeout(function () { svg.classList.remove("is-blinking"); blink(); }, 240);
      }, 2600 + Math.random() * 3600);
    })();
  }

  /* hero mouse parallax (uses the `translate` property so it composes with reveals) */
  function heroParallax() {
    if (reduce || !finePointer) return;
    var els = $$("[data-parallax]");
    var hero = $("#home");
    hero.addEventListener("pointermove", function (e) {
      var nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
      els.forEach(function (el) {
        var f = +el.dataset.parallax;
        el.style.translate = (nx * f).toFixed(1) + "px " + (ny * f).toFixed(1) + "px";
      });
    });
    hero.addEventListener("pointerleave", function () { els.forEach(function (el) { el.style.translate = ""; }); });
  }

  /* ============================================================ REVEALS */
  var io;
  function initReveals() {
    var targets = $$(".reveal, .skill-board, .arc, [data-count]");
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
        '<span class="mono"><b>Chapter ' + pad(i + 1) + "</b> / " + pad(n) + "</span>" +
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
    readerAt = i;
    if (from) readerReturn = from;
    readerPage.innerHTML = readerHTML(i);
    if (reader.hidden) {
      reader.hidden = false;
      lockPage(true);
    } else {
      readerPage.style.animation = "none"; void readerPage.offsetWidth; readerPage.style.animation = "";
    }
    readerPage.scrollTop = 0;
    readerPage.focus();
  }
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
      if (!reader.hidden) closeReader();
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
    $("#journey-current").textContent = pad(Math.round(p * (D.journey.length - 1)) + 1);
  }

  /* ============================================================ SKILLS */
  function initSkills() {
    var board = $("#skill-board"), scan = $("#skill-scan"), filterBox = $("#skill-filter");
    var nodes = $$(".snode", board);
    var projIdx = {};
    D.projects.forEach(function (p, i) { projIdx[p.id] = i; });
    var anchorFor = { maskard: "#journey", ardent: "#journey", technojam: "#achievements", hackathons: "#achievements", galgotias: "#journey" };

    board.addEventListener("click", function (e) {
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
    filterBox.addEventListener("click", function (e) {
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
  renderProfile();
  renderProjects();
  renderJourney();
  renderSkills();
  renderArcs();
  renderLab();
  renderNow();
  renderFinal();
  buildNav();
  $$("[data-speedlines]").forEach(speedlines);
  splitLetters();
  roleRotator();
  eye();
  heroParallax();
  initSkills();
  arcTilt();
  inkCanvas();
  cursor();
  copyEmail();
  syncThemeMeta();
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
    startHero();
  } else {
    showOpening();
  }
  onScroll();
})();
