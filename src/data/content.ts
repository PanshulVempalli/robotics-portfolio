// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for the whole site. Edit this file to update content.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Panshul Vempalli",
  first: "Panshul",
  email: "panshulvempalli@gmail.com",
  github: "https://github.com/PanshulVempalli",
  githubHandle: "PanshulVempalli",
  site: "panshulvempalli.vercel.app",
  school: "Haberdashers' Boys' School",
  location: "London, UK",
  tagline: "Engineering · Robotics · Software · AI research",
  summary:
    "Student at Haberdashers' Boys' School with a track record in engineering, robotics and software. VEX Robotics World Championship 2026 Judges Award winner, founder of the AI learning platform Quanta, and currently researching how AI is changing engineering while shadowing a PhD student at Brunel University. Works with industry partners including Arm, QinetiQ and Airobot Dynamics, and leads and mentors student teams. Keen to pursue engineering.",
};

export const heroStats = [
  { value: "Judges Award", label: "VEX Worlds 2026" },
  { value: "#1 UK", label: "VEX Virtual Robot, MS & HS" },
  { value: "#11", label: "Global, VEX VR Middle School" },
  { value: "660+", label: "GitHub followers" },
];

export type Chapter = {
  n: string;
  key: "robotics" | "engineering" | "software" | "research";
  label: string;
  title: [string, string];
  body: string;
  tags: string[];
  link?: { to: string; label: string };
  stat: { value: string; label: string };
};

export const chapters: Chapter[] = [
  {
    n: "01",
    key: "robotics",
    label: "Robotics",
    title: ["Robots that earn", "their points."],
    body: "I pioneered Team 34071B Habs-Gliders, the first mixed VEX team between the Habs boys' and girls' schools, then designed, built and programmed our robots all the way to the 2026 World Championship, where we won the Judges Award. My VEX Virtual Robot programme ranked first in the UK across Middle and High School, and 11th in the world for Middle School.",
    tags: ["C++ / PROS", "Python", "PID control", "Autonomous routines"],
    link: { to: "/projects#vex", label: "See the robot code" },
    stat: { value: "#1", label: "UK VEX VR, MS & HS" },
  },
  {
    n: "02",
    key: "engineering",
    label: "Engineering",
    title: ["From a drawing", "to a race track."],
    body: "I founded HABS Powerstrike, the school's Greenpower electric racing team, to leave a lasting engineering legacy. We won the Portfolio Award at Regionals for our engineering documentation and finished 25th at the 2025 International Finals. Now I'm developing a CanSat miniature satellite with Arm as an industry partner.",
    tags: ["F24+ electric racing", "Testing", "Documentation", "CanSat × Arm"],
    link: { to: "/experience", label: "Read about the teams" },
    stat: { value: "25th", label: "Greenpower International Finals" },
  },
  {
    n: "03",
    key: "software",
    label: "Software",
    title: ["Platforms built", "from scratch."],
    body: "I'm the founder and lead developer of Quanta, an international AI-powered learning platform, leading its software, design and user experience. Alongside it I ship live sites for student organisations and engineering teams, and won High Honors at the Veritas AI International Hackathon against 1,000+ projects from 75+ countries.",
    tags: ["TypeScript / React", "Python", "AI tools", "Web deployment"],
    link: { to: "/projects", label: "Browse projects" },
    stat: { value: "1,000+", label: "Hackathon projects, High Honors" },
  },
  {
    n: "04",
    key: "research",
    label: "Research",
    title: ["Is AI redesigning", "engineering?"],
    body: "With a school Research Scholarship, I'm investigating whether AI is changing how engineers design, or only making existing methods faster. Alongside it I'm shadowing a PhD student at Brunel University to see postgraduate research first-hand.",
    tags: ["Research Scholarship", "Brunel University", "AI × engineering"],
    link: { to: "/research", label: "Read the research" },
    stat: { value: "Scholar", label: "School Research Scholarship" },
  },
];

export type Achievement = {
  title: string;
  org: string;
  year: string;
  detail: string;
  category: "Robotics" | "Engineering" | "Software" | "Research" | "Personal";
  tier: "headline" | "major" | "standard";
};

export const achievements: Achievement[] = [
  {
    title: "Judges Award, VEX Robotics World Championship",
    org: "VEX Robotics · Team 34071B Habs-Gliders",
    year: "2026",
    detail:
      "Awarded for design and innovation at VEX Worlds, as the first mixed team between the Habs boys' and girls' schools.",
    category: "Robotics",
    tier: "headline",
  },
  {
    title: "#1 VEX Virtual Robot programme in the UK",
    org: "VEX Robotics · Virtual Robot Skills",
    year: "2026",
    detail:
      "Built the top-ranked VEX Virtual Robot programme in the UK across Middle and High School, ranking 11th in the world for Middle School.",
    category: "Robotics",
    tier: "headline",
  },
  {
    title: "High Honors, Veritas AI International Hackathon",
    org: "Veritas AI",
    year: "",
    detail:
      "Recognised among 1,000+ projects from 75+ countries, with a $1,250 scholarship.",
    category: "Software",
    tier: "headline",
  },
  {
    title: "Research Scholarship Award",
    org: "Haberdashers' Boys' School",
    year: "2026",
    detail: "Awarded for my research into AI in engineering.",
    category: "Research",
    tier: "major",
  },
  {
    title: "VEX Robotics Regional Judges Award",
    org: "VEX Robotics",
    year: "2025",
    detail: "Recognised for engineering excellence at regional competition.",
    category: "Robotics",
    tier: "major",
  },
  {
    title: "Greenpower International Finals, 25th",
    org: "Greenpower Education Trust · F24+",
    year: "2025",
    detail: "Finished 25th internationally with HABS Powerstrike, the team I founded.",
    category: "Engineering",
    tier: "major",
  },
  {
    title: "Portfolio Award, Greenpower Regionals",
    org: "Greenpower Education Trust",
    year: "2025",
    detail: "Won for our engineering documentation.",
    category: "Engineering",
    tier: "standard",
  },
  {
    title: "Top performer, Oxford Scholastica Engineering",
    org: "Oxford Scholastica Academy",
    year: "2026",
    detail:
      "Named among the top performers in the cohort, with a tutor's recommendation praising teamwork and leadership.",
    category: "Engineering",
    tier: "standard",
  },
  {
    title: "Top 15, Birmingham Schools Debating Competition",
    org: "British Parliamentary Debating",
    year: "",
    detail: "Finished in the top 15.",
    category: "Personal",
    tier: "standard",
  },
  {
    title: "CREST Bronze Award",
    org: "British Science Association",
    year: "2024",
    detail: "Team-based STEM research project.",
    category: "Research",
    tier: "standard",
  },
  {
    title: "Duke of Edinburgh Bronze Award",
    org: "DofE",
    year: "2025",
    detail: "Completed the Bronze award.",
    category: "Personal",
    tier: "standard",
  },
  {
    title: "ABRSM Grade 8 Piano",
    org: "ABRSM",
    year: "",
    detail: "Plus Grade 5 violin.",
    category: "Personal",
    tier: "standard",
  },
];

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  period: string;
  status: "Live" | "In progress" | "Complete" | "Award-winning";
  description: string;
  points?: string[];
  stack: string[];
  links?: { label: string; href: string }[];
};

export const featuredProjects: Project[] = [
  {
    slug: "quanta",
    title: "Quanta",
    kicker: "AI-powered learning platform · Founder & Lead Developer",
    period: "2025 – Present",
    status: "In progress",
    description:
      "An international, interactive learning platform I'm building from scratch. I lead software development, design and user experience.",
    points: [
      "Product, design and engineering owned end to end",
      "AI-driven, interactive learning experiences",
      "Built for an international audience",
    ],
    stack: ["TypeScript", "React", "AI tools", "UX design"],
  },
  {
    slug: "vex",
    title: "HABS Gliders · Pushback 2025/26",
    kicker: "VEX V5 robotics · Team 34071B",
    period: "2025 – 2026",
    status: "Award-winning",
    description:
      "The season repository behind our Judges Award at VEX Worlds 2026: robot code, autonomous routines, Python skills runs and VR simulations.",
    points: [
      "C++ competition code with PID-tuned autonomous routines",
      "Python skills and pre-match autonomous examples, published for other teams",
      "VEX VR code that ranked #1 in the UK and #11 globally (MS)",
    ],
    stack: ["C++", "PROS", "EZ-Template", "Python", "VEX V5"],
    links: [
      { label: "Season repo", href: "https://github.com/PanshulVempalli/HABS-Gliders-Pushback-2526" },
      { label: "VEX VR code", href: "https://github.com/PanshulVempalli/VEX_Vr_Code_HABS-Gliders" },
      { label: "Worlds code", href: "https://github.com/PanshulVempalli/EZ-Template_VEX_code" },
    ],
  },
  {
    slug: "cansat",
    title: "CanSat · Team PH8SED",
    kicker: "UK CanSat Competition · Software · with Arm",
    period: "2025 – Present",
    status: "In progress",
    description:
      "A satellite the size of a drinks can, built by a six-person team for the UK CanSat Competition, with Arm engaged as an industry partner. Our Preliminary Design Review was submitted in November 2026.",
    points: [
      "Primary mission: temperature and pressure at 1 Hz over LoRa, with altitude from the barometric formula and GPS as a cross-check",
      "Secondary mission: a live wildfire fire-weather risk score, plus CO and SO₂ smoke-plume detection on descent",
      "ESP32-S3 flight software in C++ with a five-state flight machine (boot, pad, ascent, descent, landed) and a Python ground-station dashboard",
      "Ø65.4 × 114 mm tie-rod cassette, 343 g, 380 mm cross canopy for ≈ 10.5 m/s descent",
    ],
    stack: ["ESP32-S3", "C++", "LoRa 433 MHz", "Python", "PETG"],  },
  {
    slug: "habs-gliders-site",
    title: "Habs-Gliders team website",
    kicker: "Official site for VEX team 34071B",
    period: "2025",
    status: "Live",
    description:
      "Designed, built and deployed the official website for our VEX Robotics team.",
    stack: ["TypeScript", "React", "Tailwind", "Vercel"],
    links: [
      { label: "Live site", href: "https://habs-gliders-34071b.vercel.app/" },
      { label: "Code", href: "https://github.com/PanshulVempalli/habs-gliders-34071b" },
    ],
  },
  {
    slug: "choose-your-level",
    title: "Choose Your A-Level",
    kicker: "Interactive subject-choice guide",
    period: "2025",
    status: "Live",
    description:
      "An interactive site to help students aged 16–18 choose their A-level subjects, built after I couldn't find one myself.",
    stack: ["TypeScript", "React", "shadcn/ui"],
    links: [
      { label: "Live site", href: "https://chooseyouralevel.lovable.app" },
      { label: "Code", href: "https://github.com/PanshulVempalli/chooseyouralevel" },
    ],
  },
];

export const miniProjects = [
  { title: "Truss Solver", lang: "Python", href: "https://github.com/PanshulVempalli/Truss-Solver", note: "Structural engineering" },
  { title: "DSP Filter Designer", lang: "Python", href: "https://github.com/PanshulVempalli/dsp-filter-designer", note: "Signal processing" },
  { title: "Digit Classifier NN", lang: "Python", href: "https://github.com/PanshulVempalli/digit-classifier-nn", note: "Neural networks" },
  { title: "UK Energy & Air Dashboard", lang: "Python", href: "https://github.com/PanshulVempalli/uk-energy-air-dashboard", note: "Data visualisation" },
  { title: "Study Helper API", lang: "Python", href: "https://github.com/PanshulVempalli/study-helper-api", note: "Backend API" },
  { title: "Spanish Grammar GCSE Help", lang: "HTML", href: "https://github.com/PanshulVempalli/Spaniish-Grammar-GCSE-help", note: "Revision tool" },
  { title: "JAR Template Example", lang: "C++", href: "https://github.com/PanshulVempalli/JAR-template-Example-VEX-Code", note: "VEX PID example" },
  { title: "Python Skills Auton", lang: "Python", href: "https://github.com/PanshulVempalli/VEX-V5-Python-Skills-Auton-Example", note: "VEX example" },
  { title: "Prematch Auton Example", lang: "Python", href: "https://github.com/PanshulVempalli/VEX-V5-Prematch-Auton-Example-", note: "VEX example" },
];


export type Hackathon = {
  event: string;
  project: string;
  result?: string;
  summary: string;
  points: string[];
  stack: string[];
  links: { label: string; href: string }[];
};

export const hackathons: Hackathon[] = [
  {
    event: "Veritas AI International High School Hackathon",
    project: "Country risk forecasting",
    result: "High Honors · $1,250 scholarship",
    summary:
      "A transparent forecasting pipeline that asks whether a country's income, schooling and health spending can predict its child mortality the following year.",
    points: [
      "Merges Our World in Data indicators, keeps individual countries and fills short gaps",
      "Linear regression on year-on-year change, benchmarked against a naive 'same as last year' baseline",
      "Recognised among 1,000+ projects from 75+ countries",
    ],
    stack: ["Python", "pandas", "scikit-learn"],
    links: [{ label: "Repository", href: "https://github.com/PanshulVempalli/Veritas-AI-Hackathon" }],
  },
  {
    event: "Kiroween 2026 · Resurrection category",
    project: "GopherGhost",
    summary:
      "Brings the 1991 Gopher protocol (RFC 1436) back from the dead: paste any web address and get a clean, fast Gopher menu in a green-phosphor terminal, with ads and scripts stripped out.",
    points: [
      "Browses real gopher:// servers over TCP, with a bloat meter showing what was removed",
      "SSRF guard blocks private addresses and re-checks redirects",
      "Built spec-first in Kiro, with property-based tests (fast-check)",
    ],
    stack: ["TypeScript", "Node.js", "Vitest"],
    links: [
      { label: "Live demo", href: "https://gopherghost.onrender.com" },
      { label: "Repository", href: "https://github.com/PanshulVempalli/Kiro_Hackathon" },
    ],
  },
  {
    event: "STEMergent Hacks 2026",
    project: "PlateWise",
    summary:
      "A simulator that estimates how much lunch a school wastes and which changes are linked to less waste, built on the regression from a 2024 peer-reviewed PLOS ONE study.",
    points: [
      "What-if comparisons for lunch timing, length and milk service",
      "Each change tagged strong or weak evidence by statistical significance",
      "Audit tracker for a school's own before-and-after weigh-ins",
    ],
    stack: ["HTML", "JavaScript", "Statistics"],
    links: [{ label: "Repository", href: "https://github.com/PanshulVempalli/PlateWise" }],
  },
  {
    event: "Devpost hackathon entry",
    project: "Professor Reverse",
    summary:
      "A study app where you teach the AI. Explain a topic to Sam, a confused student, and he asks questions exactly where your explanation was vague or wrong.",
    points: [
      "Gemini grades each explanation against your notes, then Sam replies to the biggest gap",
      "Every third turn Sam repeats back a subtly wrong version for you to catch",
      "Ends with a gap report and a quiz built from your own misconceptions",
    ],
    stack: ["React", "Vite", "GSAP", "Gemini API"],
    links: [{ label: "Repository", href: "https://github.com/PanshulVempalli/Teach-Back" }],
  },
];

export type Role = {
  title: string;
  org: string;
  period: string;
  kind: "Robotics" | "Engineering" | "Industry" | "Leadership" | "Research";
  points: string[];
  href?: string;
};

export const roles: Role[] = [
  {
    title: "Founder & Engineer",
    org: "VEX V5 Robotics · Team 34071B Habs-Gliders",
    period: "2024 – 2026",
    kind: "Robotics",
    href: "https://habs-gliders-34071b.vercel.app/",
    points: [
      "Pioneered the first mixed VEX team between the boys' and girls' schools",
      "Designed, built, programmed and tested competition robots",
      "Competed regionally, nationally and at VEX Worlds 2026, winning the Judges Award",
    ],
  },
  {
    title: "Founder",
    org: "Greenpower Electric Racing · HABS Powerstrike",
    period: "2024 – 2025",
    kind: "Engineering",
    href: "https://habspowerstrike.odoo.com",
    points: [
      "Founded the school's Greenpower team to build a lasting engineering legacy",
      "Worked on engineering, testing, documentation and race-day operations for an F24+ electric car",
      "Finished 25th at the 2025 International Finals",
    ],
  },
  {
    title: "Founder & Lead Developer",
    org: "Quanta",
    period: "2025 – Present",
    kind: "Engineering",
    points: ["Building an international AI-powered learning platform from scratch"],
  },
  {
    title: "Industry collaboration",
    org: "Arm · QinetiQ · Airobot Dynamics",
    period: "2025 – Present",
    kind: "Industry",
    points: [
      "Arm engaged as industry partner on our CanSat (Team PH8SED) project",
      "Engineering project work with QinetiQ (defence and security technology) and Airobot Dynamics (UK UAV manufacturer)",
    ],
  },
  {
    title: "Virtual work experience",
    org: "Springpod · Amazon Robotics & University of Huddersfield",
    period: "April 2026",
    kind: "Industry",
    points: [
      "Amazon Robotics Fulfilment Centre programme",
      "Motorsport Engineering with the University of Huddersfield",
    ],
  },
  {
    title: "Co-Lead",
    org: "AI & ML Society · Haberdashers' Boys' School",
    period: "Current",
    kind: "Leadership",
    points: ["Co-leading the school's AI and machine learning society"],
  },
  {
    title: "VEX IQ & V5 Robotics Mentor",
    org: "Haberdashers' Boys' School",
    period: "2025 – Present",
    kind: "Leadership",
    points: ["Coaching school teams in robot design, programming and competition strategy"],
  },
  {
    title: "Debater & Coach",
    org: "British Parliamentary Debating",
    period: "2025 – Present",
    kind: "Leadership",
    points: [
      "Top 15 at the Birmingham Schools Debating Competition",
      "Coaching Year 7–9 students in argument and public speaking",
    ],
  },
  {
    title: "Committee Member",
    org: "Engineering Society · Geography Society",
    period: "Current",
    kind: "Leadership",
    points: ["Committee roles in two school societies; Charity Society member helping raise funds"],
  },
];

export const research = {
  question: "Is AI redesigning engineering, or just making it faster?",
  intro:
    "Supported by a school Research Scholarship, this project reviews how AI and machine learning are used across civil and mechanical engineering, then tests one claim myself: can a neural network trained on a solver's results replace the solver, and where does it break?",
  framing:
    "Engineering is not a field where a confident wrong answer is acceptable. A mistake in a film recommendation can be passed over; a mistake in a bridge support cannot. So the interesting question isn't \u201cwill AI replace engineers?\u201d but where it can be trusted, and where it can't.",
  areas: ["Planning", "Sketching & concept design", "CAD & generative design", "Simulation", "Physics"],
  strands: [
    {
      title: "Review the field",
      body: "Survey AI and ML across five stages of engineering, from construction scheduling and generative CAD (DeepCAD, Fusion 360 Gallery) to surrogate models, physics-informed neural networks (PINNs) and neural operators.",
    },
    {
      title: "Build a surrogate model",
      body: "Use my own truss solver to generate data, including statically indeterminate trusses, then train a neural network to predict deflection and stress.",
    },
    {
      title: "Find where it breaks",
      body: "Compare accuracy and speed against the solver, and test on cases outside the training range, paying the most attention to the failures.",
    },
  ],
  preliminary: [
    {
      title: "Truss-Solver",
      href: "https://github.com/PanshulVempalli/Truss-Solver",
      body: "A 2D truss analysis program in Python using the direct stiffness method, written without an existing package. It matches the method of joints to within 1e-6, passes four automated tests, and has analysed an 8 m Warren footbridge.",
      stat: "1e-6",
      statLabel: "agreement with hand method",
    },
    {
      title: "digit-classifier-nn",
      href: "https://github.com/PanshulVempalli/digit-classifier-nn",
      body: "A neural network written from scratch in NumPy, with forward propagation, backpropagation and gradient descent coded by hand and checked with gradient checking.",
      stat: "\u224897%",
      statLabel: "accuracy on 359 unseen digits",
    },
  ],
  timeline: [
    { months: "1\u20132", phase: "Foundations: statics, beam bending, FEM; regression and PyTorch" },
    { months: "2\u20133", phase: "Planning: ML for scheduling, cost and risk, BIM and digital twins" },
    { months: "3\u20134", phase: "Sketching: sketch-to-3D and generative image models" },
    { months: "4\u20135", phase: "CAD: generative design and topology optimisation in Python" },
    { months: "5\u20137", phase: "Simulation: surrogates, PINNs, neural operators, graph networks" },
    { months: "6\u20139", phase: "Experiment: surrogate model vs my solver, out-of-range tests" },
    { months: "9\u201310", phase: "Evaluation: reliability, the black-box problem, liability, standards" },
    { months: "11\u201312", phase: "Write-up, reflection and submission" },
  ],
  experience: [
    {
      title: "Shadowing a PhD student",
      org: "Brunel University",
      period: "Current",
      body: "Gaining first-hand insight into postgraduate research, alongside my own project.",
    },
    {
      title: "Engineering Course",
      org: "Oxford Scholastica Academy",
      period: "July 2026",
      body: "Two weeks of mathematical modelling, electronics, computing, aerodynamics, hydraulics and thermodynamics, ending with a 2035 engineering challenge presentation. Named among the top performers in the cohort.",
    },
    {
      title: "FreedomWithAI",
      org: "AI Education Programme",
      period: "In progress",
      body: "Building applied knowledge of AI concepts, tools and real-world applications.",
    },
    {
      title: "CREST Bronze",
      org: "British Science Association",
      period: "2024",
      body: "Team-based STEM research project.",
    },
  ],
};

export const education = {
  school: "Haberdashers' Boys' School",
  period: "2023 – Present",
  detail:
    "GCSEs in progress: Maths, English Language, English Literature, Physics, Chemistry, Biology, Geography, Design & Technology, Computer Science, Spanish",
};

export const skills = {
  technical: ["Python", "C++", "JavaScript / TypeScript", "HTML & CSS", "React", "Git & GitHub", "Web deployment", "AI tools", "Technical documentation"],
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Telugu", level: "Conversational" },
    { name: "Spanish", level: "GCSE" },
    { name: "Italian", level: "Learning" },
  ],
  interests: ["Piano (ABRSM Grade 8)", "Violin (ABRSM Grade 5)", "Cricket (OMT academy & club)"],
};
