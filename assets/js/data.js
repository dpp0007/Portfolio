/* ==========================================================================
   PORTFOLIO CONTENT
   --------------------------------------------------------------------------
   Everything the site shows lives in this file. Edit, add or remove entries
   here — the page re-renders from it. No build step needed.

   Evidence ids (used by skills to link back to where they were used):
     elixra · mensa · peerq · maskard · ardent · technojam · hackathons · galgotias
   ========================================================================== */

window.PORTFOLIO = {
  person: {
    name: "Deepankar Patel",
    first: "Deepankar",
    last: "Patel",
    katakana: "ディーパンカル・パテル",
    roles: ["Creative Developer", "UI/UX Designer", "AI Builder", "Hackathon Winner"],
    // The landing's class-select HUD. short = label on small screens.
    classes: [
      { name: "Creative Developer", short: "Dev", desc: "Interactive web experiences, from Next.js to Three.js." },
      { name: "UI/UX Designer", short: "UX", desc: "Wireframes, prototypes and design systems in Figma." },
      { name: "AI Builder", short: "AI", desc: "Chatbots, voice AI, OCR and tutoring built into products." },
      { name: "Hackathon Winner", short: "Win", desc: "Two 1st places and five podiums across 10+ hackathons." },
    ],
    // Landing stats (shown as pips out of 10). Real numbers only.
    heroStats: [
      { value: 2, suffix: "×", label: "1st place wins" },
      { value: 5, label: "Podiums" },
      { value: 10, suffix: "+", label: "Hackathons" },
    ],
    // Lines the landing character says when clicked or tapped.
    quips: ["Let's build something.", "One more commit.", "Ship it. Then polish.", "Design first. Then code.", "Hackathon mode: ON.", "Next chapter loading…"],
    tagline: "I design the interface, wire up the AI, and build the whole stack underneath.",
    location: "Greater Noida, India",
    email: "deepankarpatel28@gmail.com",
    github: "https://github.com/dpp0007",
    linkedin: "https://www.linkedin.com/in/dpp07/",
    // Optional: path to a portrait image (e.g. "assets/img/portrait.jpg").
    // Leave null to use the illustrated silhouette.
    portrait: null,
    updated: "September 2026",
  },

  profile: {
    class: "Creative Developer · Designer · Builder",
    guild: "Galgotias University — B.Tech CSE (Data Science)",
    base: "Greater Noida, Uttar Pradesh",
    focus: "AI-powered products with interfaces people enjoy using",
    stats: [
      { label: "CGPA", value: 8.88, decimals: 2 },
      { label: "Hackathons & comps", value: 10, suffix: "+" },
      { label: "Podium finishes", value: 5 },
      { label: "1st place wins", value: 2 },
      { label: "Major builds", value: 3 },
    ],
    story: [
      "I study Computer Science Engineering (Data Science) at Galgotias University, but most days I live somewhere between Figma and the terminal.",
      "I like owning the whole arc of a product: shaping the experience, wiring AI into it, and building the stack that holds it up. That's how I've made a virtual chemistry lab, a women's health platform and a campus Q&A app.",
      "A lot of my best work came out of hackathons. I've entered 10+, reached the podium five times and won twice. Outside of those, I coordinate TechnoJam, running the workshops and events where other builders start their own stories.",
    ],
    traits: [
      { name: "Design-first builder", desc: "Wireframes before code, systems before screens." },
      { name: "AI integrator", desc: "Chatbots, voice AI, OCR, tutoring — AI that serves the UX." },
      { name: "Hackathon-tempered", desc: "Calm, focused shipping on a 24-hour clock." },
      { name: "Community coordinator", desc: "Organises workshops, hackathons & dev events." },
    ],
    interests: ["UI/UX Design", "AI-powered apps", "Full-stack dev", "Product design", "Robotics", "Design systems"],
  },

  /* ---------------------------------------------------------------- PROJECTS
     art: built-in illustration id ("elixra" | "mensa" | "peerq" | "generic")
     image: optional screenshot path — overrides the illustration if set
     links: set to a URL string, or null to show "coming soon"               */
  projects: [
    {
      id: "elixra",
      name: "Elixra",
      subtitle: "Virtual Chemistry Laboratory",
      year: "2026",
      status: "Built",
      tagline: "A full chemistry lab in the browser. Nothing to break, spill or set on fire.",
      problem:
        "Real lab time is limited, expensive and sometimes hazardous, so students rarely get to experiment freely or repeat what went wrong.",
      role: "UI/UX design + full-stack development",
      stack: ["Next.js", "FastAPI", "Three.js", "AI"],
      features: [
        "Safe, interactive experiment simulation",
        "AI-powered tutoring while you experiment",
        "Automatic quiz generation from lab content",
        "3D molecular visualisation with Three.js",
        "A modern glassmorphism interface",
      ],
      outcome: null,
      art: "elixra",
      image: null,
      links: { live: null, source: null },
    },
    {
      id: "mensa",
      name: "Mensa",
      subtitle: "Women's Health Platform",
      year: "2026",
      status: "In development",
      tagline: "One companion for menstruation, pregnancy and menopause.",
      problem:
        "Women's health tracking is scattered across apps that each cover only one life stage, and medical reports are hard to understand without help.",
      role: "Product design + app development",
      stack: ["Flutter", "Node.js", "AI"],
      features: [
        "Menstruation, pregnancy and menopause tracking",
        "AI chatbot support with voice AI",
        "OCR medical report analysis",
        "Reminders and streak tracking",
        "Nutrition guidance and multilingual support",
      ],
      outcome: null,
      art: "mensa",
      image: null,
      links: { live: null, source: null },
    },
    {
      id: "peerq",
      name: "PeerQ",
      subtitle: "Campus Q&A Platform",
      year: "2025",
      status: "Built",
      tagline: "Campus questions and answers that stay searchable after the group chat moves on.",
      problem:
        "Good answers to campus questions get buried in group chats. Students needed one place to ask, answer and find them again.",
      role: "Desktop app + database development",
      stack: ["JavaFX", "PostgreSQL", "JDBC"],
      features: [
        "Secure user authentication",
        "Real-time search across questions",
        "PostgreSQL persistence over JDBC",
        "Search optimised for fast content discovery",
      ],
      outcome: null,
      art: "peerq",
      image: null,
      links: { live: null, source: null },
    },
  ],

  /* ----------------------------------------------------------------- JOURNEY */
  journey: [
    {
      when: "2024",
      title: "The Enrollment",
      kind: "Education",
      place: "Galgotias University",
      text: "I start my B.Tech in Computer Science Engineering (Data Science). My CGPA sits at 8.88 so far.",
    },
    {
      when: "2025",
      title: "First Real Build",
      kind: "Project",
      place: "PeerQ",
      text: "PeerQ is my first full product: a JavaFX campus Q&A app with authentication and fast search on PostgreSQL.",
    },
    {
      when: "Jul – Aug 2025",
      title: "The Internship",
      kind: "Work",
      place: "Ardent Pixels · Remote",
      text: "As a Graphic Designer Intern I make posters, campaign creatives and social assets in Figma, Canva and Photoshop.",
    },
    {
      when: "2025 → now",
      title: "Joining the Guild",
      kind: "Leadership",
      place: "TechnoJam Technical Club",
      text: "I become a Coordinator and organise technical workshops, hackathons and developer community events.",
    },
    {
      when: "2025 – 26",
      title: "Tournament Arc",
      kind: "Hackathons",
      place: "10+ hackathons, designathons & robotics comps",
      text: "Two 1st places (AM Hacks 2.0, WIE–IEEE), a 2nd at Hackspace and runner-up finishes at Hackfest 1.0 and Build-o-thon (GDG Noida).",
    },
    {
      when: "2026 → now",
      title: "Going Pro",
      kind: "Work",
      place: "Maskard · Industry projects",
      text: "As a UI/UX Designer I work on interfaces, workflows, prototypes and scalable design systems for real products.",
    },
    {
      when: "2026",
      title: "The Laboratory",
      kind: "Project",
      place: "Elixra",
      text: "I build a virtual chemistry lab with AI tutoring, quiz generation and 3D molecules, all behind a glassmorphism UI.",
    },
    {
      when: "Now",
      title: "Current Arc",
      kind: "In progress",
      place: "Mensa + more",
      text: "Right now I'm building Mensa, a women's health platform with voice AI and OCR report analysis.",
      current: true,
    },
  ],

  /* ------------------------------------------------------------------ SKILLS
     Each skill lists where it was actually used (evidence ids, see top).   */
  skills: [
    {
      category: "Development",
      glyph: "</>",
      items: [
        { name: "Next.js", used: ["elixra"] },
        { name: "Node.js", used: ["mensa"] },
        { name: "FastAPI", used: ["elixra"] },
        { name: "Flutter", used: ["mensa"] },
        { name: "Three.js", used: ["elixra"] },
        { name: "JavaFX", used: ["peerq"] },
        { name: "Responsive design", used: ["elixra", "maskard"] },
      ],
    },
    {
      category: "AI / ML",
      glyph: "AI",
      items: [
        { name: "AI integration", used: ["elixra", "mensa"] },
        { name: "Chatbots & voice AI", used: ["mensa"] },
        { name: "OCR analysis", used: ["mensa"] },
        { name: "AI tutoring & quiz gen", used: ["elixra"] },
        { name: "ML concepts", used: ["galgotias", "hackathons"] },
      ],
    },
    {
      category: "Data",
      glyph: "DB",
      items: [
        { name: "PostgreSQL", used: ["peerq"] },
        { name: "JDBC", used: ["peerq"] },
        { name: "Database management", used: ["peerq"] },
        { name: "Data Science", used: ["galgotias"] },
      ],
    },
    {
      category: "UI / UX",
      glyph: "UX",
      items: [
        { name: "UI/UX design", used: ["maskard", "elixra", "hackathons"] },
        { name: "Wireframing", used: ["maskard"] },
        { name: "Prototyping", used: ["maskard"] },
        { name: "Design systems", used: ["maskard"] },
        { name: "Product design", used: ["mensa", "elixra"] },
      ],
    },
    {
      category: "Visual Design",
      glyph: "✎",
      items: [
        { name: "Figma", used: ["maskard", "ardent"] },
        { name: "Photoshop", used: ["ardent"] },
        { name: "Canva", used: ["ardent"] },
        { name: "Glassmorphism UI", used: ["elixra"] },
        { name: "Posters & campaigns", used: ["ardent"] },
      ],
    },
    {
      category: "Languages",
      glyph: "{ }",
      items: [
        { name: "Python", used: ["elixra", "galgotias"] },
        { name: "Java", used: ["peerq"] },
        { name: "C++", used: ["galgotias"] },
        { name: "C", used: ["galgotias"] },
      ],
    },
    {
      category: "Tools",
      glyph: "⚙",
      items: [
        { name: "Git", used: ["elixra", "mensa", "peerq"] },
        { name: "GitHub", used: ["elixra", "mensa", "peerq"] },
      ],
    },
    {
      category: "Robotics & R&D",
      glyph: "⚡",
      items: [
        { name: "Robotics competitions", used: ["technojam"] },
        { name: "Hackathon R&D", used: ["hackathons"] },
      ],
    },
  ],

  // Human-readable names for evidence ids
  evidence: {
    elixra: "Elixra",
    mensa: "Mensa",
    peerq: "PeerQ",
    maskard: "Maskard",
    ardent: "Ardent Pixels",
    technojam: "TechnoJam",
    hackathons: "Hackathons",
    galgotias: "Coursework",
  },

  /* ------------------------------------------------------------ ACHIEVEMENTS
     rank: "1st" | "2nd" | "RU" (runner-up) | "★" (other)                     */
  achievements: [
    { rank: "1st", title: "AM Hacks 2.0", result: "1st Place", role: "AI/ML Engineer & UI/UX Designer", kind: "Hackathon" },
    { rank: "1st", title: "WIE – IEEE Hackathon", result: "1st Place", role: "AI/ML Engineer & UI/UX Designer", kind: "Hackathon" },
    { rank: "2nd", title: "Hackspace Hackathon", result: "2nd Place", role: "UI/UX Designer & AI/ML Engineer", kind: "Hackathon" },
    { rank: "RU", title: "Hackfest 1.0", result: "Runner Up", role: "UI/UX & R&D", kind: "Hackathon" },
    { rank: "RU", title: "Build-o-thon · GDG Noida", result: "Runner Up", role: "UI/UX & R&D", kind: "Hackathon" },
    { rank: "★", title: "TechnoJam Technical Club", result: "Coordinator", role: "Workshops, hackathons & community events", kind: "Leadership" },
    { rank: "★", title: "10+ Competitions", result: "Veteran", role: "Hackathons, designathons & robotics", kind: "Community" },
    { rank: "★", title: "CGPA 8.88", result: "Academic", role: "B.Tech CSE (Data Science)", kind: "Academics" },
  ],

  /* -------------------------------------------------------------- THE STUDIO
     Experiments, studies and side quests. Add freely.                       */
  lab: [
    { title: "Glass & Light", kind: "UI experiment", text: "A glassmorphism study I did for Elixra's interface: layered blur, depth and legibility.", origin: "Elixra" },
    { title: "Molecules in 3D", kind: "3D / Three.js", text: "Interactive ball-and-stick molecules you can orbit around in the browser.", origin: "Elixra" },
    { title: "Voice + OCR pipeline", kind: "AI prototype", text: "Voice AI plus OCR that turns a photo of a medical report into something you can read.", origin: "Mensa" },
    { title: "Poster series", kind: "Visual design", text: "Campaign posters and social creatives made to brand guidelines.", origin: "Ardent Pixels" },
    { title: "Systems, not screens", kind: "Design systems", text: "Reusable Figma components and tokens that hold up across real products.", origin: "Maskard" },
    { title: "Robot arena", kind: "Robotics", text: "Robotics competitions where the prototype has to survive contact with the real world.", origin: "Competitions" },
  ],

  /* ------------------------------------------------------------ CURRENT ARC */
  now: {
    building: [
      { title: "Mensa", text: "Women's health platform: tracking, voice AI and OCR report analysis." },
      { title: "Design systems at Maskard", text: "Interfaces, workflows and scalable components for industry projects." },
    ],
    learning: [
      { title: "Machine learning, deeper", text: "Going from ML concepts to training and shipping models." },
      { title: "3D on the web", text: "More Three.js and interactive visualisation after Elixra." },
    ],
    experimenting: [
      { title: "Voice-first interfaces", text: "Conversational UX for health and education." },
      { title: "Manga-style web storytelling", text: "This portfolio is the first experiment." },
    ],
    goals: [
      "Ship Mensa v1",
      "Win the next hackathon arc",
      "Grow TechnoJam's builder community",
    ],
    ideas: ["Next chapter: to be announced"],
  },
};
