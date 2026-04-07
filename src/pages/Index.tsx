import { useState, useEffect } from "react";
import { Github, Linkedin, ExternalLink } from "lucide-react";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About Me", id: "about" },
  { label: "Roles", id: "roles" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "What's Next", id: "next" },
  { label: "Contact Me", id: "contact" },
];

const SideNav = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{ pointerEvents: "none" }} className="fixed left-0 top-0 h-full z-30 hidden md:flex flex-col justify-center pl-6 lg:pl-10">
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              style={{ pointerEvents: "auto" }}
              className={`block text-xs tracking-wide transition-colors ${
                active === item.id
                  ? "text-primary font-bold border-l-2 border-primary pl-3"
                  : "text-muted-foreground hover:text-foreground pl-3"
              }`}
            >
              &gt; {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="section-divider">
    || {title} ||
  </div>
);

const HeroSection = () => (
  <section id="home" className="min-h-screen flex items-center justify-center px-4">
    <div className="text-center max-w-2xl">
      {/* Social icons */}
      <div className="flex justify-center gap-6 mb-8">
        <span title="Coming soon!" className="text-muted-foreground cursor-default flex flex-col items-center gap-1">
          <Linkedin className="h-8 w-8" />
          <span className="text-[9px] tracking-widest">COMING SOON</span>
        </span>
        <a href="https://github.com/PanshulVempalli" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors flex flex-col items-center gap-1">
          <Github className="h-8 w-8" />
          <span className="text-[9px] tracking-widest">GITHUB</span>
        </a>
      </div>

      {/* ASCII-style name */}
      <pre className="text-xs sm:text-sm leading-tight mb-6 text-foreground font-bold select-none whitespace-pre overflow-x-auto">
{`██████╗  █████╗ ███╗   ██╗███████╗██╗  ██╗██╗   ██╗██╗     
██╔══██╗██╔══██╗████╗  ██║██╔════╝██║  ██║██║   ██║██║     
██████╔╝███████║██╔██╗ ██║███████╗███████║██║   ██║██║     
██╔═══╝ ██╔══██║██║╚██╗██║╚════██║██╔══██║██║   ██║██║     
██║     ██║  ██║██║ ╚████║███████║██║  ██║╚██████╔╝███████╗
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝`}
      </pre>

      <h1 className="text-2xl md:text-3xl font-bold tracking-wider mb-4">
        Panshul Vempalli
      </h1>

      <div className="border-t border-border w-64 mx-auto mb-3" />
      <p className="text-sm text-muted-foreground">
        &gt; Aspiring Robotics & Visual Computing Engineer<span className="cursor-blink text-primary ml-0.5">_</span>
      </p>
      <div className="border-t border-border w-64 mx-auto mt-3" />

      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="text-xs text-muted-foreground mt-8 animate-pulse hover:text-primary transition-colors cursor-pointer bg-transparent border-none"
      >
        ↓ Scroll Down ↓
      </button>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-16 px-4">
    <SectionHeader title="ABOUT ME" />
    <div className="max-w-2xl mx-auto space-y-4">
      <p className="text-sm leading-relaxed text-foreground">
        &gt;&gt; I'm Panshul Vempalli — a Year 10 student at Haberdashers' Boys' School 
        with a deep passion for robotics, autonomous systems, and visual computing. 
        My work spans from programming competition robots to building satellites.
      </p>
      <p className="text-sm leading-relaxed text-foreground">
        &gt;&gt; As Lead Programmer for my VEX Robotics team and Software Lead for CanSat, 
        I specialise in PID control, sensor fusion, and writing efficient C++ for 
        embedded systems. I'm targeting a degree in Computing (Visual Computing & Robotics)
        at a top UK university.
      </p>
      <p className="text-sm leading-relaxed text-foreground">
        &gt;&gt; I'm actively seeking summer shadowing opportunities in Computer Vision labs 
        and robotics research groups where I can contribute technical depth and a 
        fresh perspective. Let's build the future of intelligent machines.
      </p>
    </div>
  </section>
);

const roles = [
  {
    title: "Lead Programmer",
    type: "Robotics",
    period: "2025 — Present",
    org: "VEX Robotics Team — Habs Gliders",
    orgLink: "https://habs-gliders-34071b.vercel.app/",
    details: [
      "Designing and programming autonomous routines with PID controllers",
      "Integrating V5 sensors for consistent 180° turns (±2° accuracy)",
      "Writing efficient C++ for real-time embedded control",
    ],
  },
  {
    title: "Team Member",
    type: "Engineering",
    period: "2024 — Present",
    org: "Greenpower — HABS Powerstrike",
    orgLink: "https://habspowerstrike.odoo.com",
    details: [
      "Building and racing an electric car in the Greenpower F24+ competition",
      "Contributing to vehicle electronics and performance optimisation",
    ],
  },
  {
    title: "Software Lead",
    type: "Competition",
    period: "2026 — Present",
    org: "CanSat Team",
    details: [
      "Developing atmospheric data collection and telemetry systems",
      "Programming Arduino-based sensor arrays for descent data logging",
    ],
  },
];

const RolesSection = () => (
  <section id="roles" className="py-16 px-4">
    <SectionHeader title="ROLES" />
    <div className="max-w-2xl mx-auto space-y-8">
      {roles.map((role) => (
        <div key={role.title} className="card-hover border border-border border-l-2 border-l-border pl-4 pr-3 py-3 transition-colors">
          <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
            <h3 className="text-sm font-bold text-foreground">&gt; {role.title}</h3>
            <div className="flex gap-2">
              <span className="text-[10px] text-muted-foreground border border-border px-2 py-0.5">
                {role.type}
              </span>
              <span className="text-[10px] text-muted-foreground border border-border px-2 py-0.5">
                {role.period}
              </span>
            </div>
          </div>
          {role.org && (
            <p className="text-xs text-primary mb-2">
              {role.orgLink ? (
                <a href={role.orgLink} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                  {role.org}
                </a>
              ) : role.org}
            </p>
          )}
          <ul className="space-y-1">
            {role.details.map((d, i) => (
              <li key={i} className="text-xs text-muted-foreground">— {d}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

const futureGoals = [
  {
    title: "Arkwright Engineering Scholarship",
    type: "Scholarship",
    period: "Applying 2026",
    org: "Arkwright Scholarships Trust",
    details: [
      "One of the UK's most prestigious engineering scholarships for sixth-form students",
      "Preparing technical aptitude and application through Haberdashers' Boys' School",
    ],
  },
  {
    title: "CREST Award — Silver",
    type: "Award",
    period: "2025 — Present",
    org: "British Science Association",
    details: [
      "Conducting an independent STEM research project to Silver level",
      "Documenting methodology, results, and conclusions in a formal report",
    ],
  },
  {
    title: "Physics Olympiad",
    type: "Competition",
    period: "2026",
    org: "British Physics Olympiad (BPhO)",
    details: [
      "Signed up and preparing with past papers and extended problem sets",
    ],
  },
  {
    title: "Summer Lab Shadowing",
    type: "Work Experience",
    period: "Target: July 2026",
    details: [
      "Actively reaching out to UK universities and research groups",
      "Targeting Computer Vision and Robotics labs",
      "Also exploring IET-supported placements",
    ],
  },
];

const NextSection = () => (
  <section id="next" className="py-16 px-4">
    <SectionHeader title="WHAT'S NEXT" />
    <div className="max-w-2xl mx-auto">
      <p className="text-xs text-muted-foreground mb-8 text-center">
        &gt;&gt; These are the goals and challenges I'm actively working towards. Follow along — this page updates as I go.
      </p>
      <div className="space-y-8">
        {futureGoals.map((goal) => (
          <div key={goal.title} className="border-l-2 border-dashed border-border pl-4 hover:border-primary transition-colors">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
              <h3 className="text-sm font-bold text-foreground">&gt; {goal.title}</h3>
              <div className="flex gap-2">
                <span className="text-[10px] text-primary border border-primary px-2 py-0.5">
                  {goal.type}
                </span>
                <span className="text-[10px] text-muted-foreground border border-border px-2 py-0.5">
                  {goal.period}
                </span>
              </div>
            </div>
            {goal.org && (
              <p className="text-xs text-primary mb-2">{goal.org}</p>
            )}
            <ul className="space-y-1">
              {goal.details.map((d, i) => (
                <li key={i} className="text-xs text-muted-foreground">— {d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground text-center mt-10 animate-pulse">
        &gt; bookmark this page and check back as things develop _
      </p>
    </div>
  </section>
);

const projects = [
  {
    title: "Habs Gliders — Team Website",
    type: "Web",
    period: "2025",
    description: "Built and deployed the official website for VEX Robotics Team Habs Gliders 34071B. Full React app with Vite and Tailwind, live on Vercel.",
    stack: ["TypeScript", "React", "Tailwind CSS", "Vite"],
    status: "Live",
    link: "https://github.com/PanshulVempalli/habs-gliders-34071b",
  },
  {
    title: "JAR Template — VEX Competition Code",
    type: "Robotics",
    period: "2025",
    description: "Competition C++ codebase for the PushBack season using the JAR (Jackson Area Robotics) template framework. Implements PID tuning with an inertial sensor (IMU) for accurate autonomous routines.",
    stack: ["C++", "JAR Template", "PID", "IMU"],
    status: "Complete",
    link: "https://github.com/PanshulVempalli/JAR-template-Example-VEX-Code",
  },
  {
    title: "VEX V5 — Prematch Auton Example",
    type: "Robotics",
    period: "2025",
    description: "Open-source base autonomous routine for the VEX V5 Pushback season. Designed as a beginner-friendly starting point for teams building their first auton — no sensors or PID required.",
    stack: ["Python", "VEX V5", "Autonomous"],
    status: "Complete",
    link: "https://github.com/PanshulVempalli/VEX-V5-Prematch-Auton-Example-",
  },
  {
    title: "VEX V5 — Python Skills Auton",
    type: "Robotics",
    period: "2025",
    description: "Foundational skills autonomous program for the Pushback season. Published as an educational resource for teams starting out with Python on VEX V5.",
    stack: ["Python", "VEX V5", "Skills Run"],
    status: "Complete",
    link: "https://github.com/PanshulVempalli/VEX-V5-Python-Skills-Auton-Example",
  },
  {
    title: "Choose Your Level",
    type: "Web",
    period: "2025",
    description: "Interactive web app to help students aged 16–18 decide which A-level subjects to pick. Built independently and deployed live.",
    stack: ["TypeScript", "React", "shadcn/ui", "Tailwind"],
    status: "Live",
    link: "https://chooseyouralevel.lovable.app",
  },
  {
    title: "CanSat — Atmospheric Data Relay",
    type: "Competition",
    period: "Ongoing",
    description: "Building a satellite the size of a soda can to collect and transmit atmospheric data during descent. Part of the national CanSat competition.",
    stack: ["Python", "Arduino", "Telemetry", "Data Logging"],
    status: "In Progress",
    link: null,
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-16 px-4">
    <SectionHeader title="PROJECTS" />
    <div className="max-w-2xl mx-auto space-y-8">
      {projects.map((project) => (
        <div key={project.title} className="card-hover border border-border border-l-2 border-l-border pl-4 pr-3 py-3 transition-colors">
          <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
            <h3 className="text-sm font-bold text-foreground">
              &gt;{" "}
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors hover:underline underline-offset-4"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            <div className="flex gap-2 items-center">
              <span className="text-[10px] text-muted-foreground border border-border px-2 py-0.5">
                {project.type}
              </span>
              <span className={`text-[10px] px-2 py-0.5 border ${
                project.status === "In Progress"
                  ? "text-primary border-primary"
                  : project.status === "Live"
                  ? "text-green-600 border-green-600"
                  : "text-muted-foreground border-border"
              }`}>
                {project.status === "Live" ? "● Live" : project.status}
              </span>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="text-[10px] text-foreground bg-secondary px-2 py-0.5 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const languages = [
  { name: "C++",      bars: 6, total: 10, level: "Intermediate" },
  { name: "Python",   bars: 8, total: 10, level: "Proficient" },
  { name: "HTML/CSS", bars: 8, total: 10, level: "Proficient" },
];

const tools = [
  "Git / GitHub", "VS Code", "VEX V5 Brain", "Arduino IDE", "Linux CLI", "Fusion 360",
];

const concepts = [
  { name: "PID Control Loops", status: "Active" },
  { name: "Sensor Fusion",     status: "Active" },
  { name: "Embedded C++",      status: "Active" },
  { name: "Telemetry Systems", status: "Active" },
  { name: "Computer Vision",   status: "Learning" },
  { name: "Data Structures",   status: "Learning" },
];

const SkillsSection = () => (
  <section id="skills" className="py-16 px-4">
    <SectionHeader title="SKILLS" />
    <div className="max-w-2xl mx-auto space-y-10">

      {/* Languages */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-4">&gt; Languages</h3>
        <div className="space-y-3 pl-4">
          {languages.map((lang) => (
            <div key={lang.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground w-24">— {lang.name}</span>
                <span className="font-mono text-[11px] tracking-widest text-foreground">
                  {"█".repeat(lang.bars)}{"░".repeat(lang.total - lang.bars)}
                </span>
                <span className="text-[10px] text-muted-foreground w-24 text-right">{lang.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-4">&gt; Tools & Environments</h3>
        <div className="pl-4 flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span key={tool} className="text-[11px] text-muted-foreground border border-border px-3 py-1 hover:border-primary hover:text-foreground transition-colors">
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Concepts */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-4">&gt; Concepts</h3>
        <div className="pl-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {concepts.map((c) => (
            <div key={c.name} className="flex items-center justify-between border border-border px-3 py-2 hover:border-primary transition-colors">
              <span className="text-xs text-muted-foreground">— {c.name}</span>
              <span className={`text-[10px] px-2 py-0.5 border ${
                c.status === "Learning"
                  ? "text-primary border-primary"
                  : "text-green-600 border-green-600"
              }`}>
                {c.status === "Learning" ? "Learning" : "● Active"}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="py-16 px-4">
    <SectionHeader title="CONTACT ME" />
    <div className="max-w-2xl mx-auto text-center">
      <p className="text-sm text-foreground mb-6">
        &gt;&gt; Open to conversations with university PIs, industry professionals, 
        and fellow robotics enthusiasts. Let's connect.
      </p>

      <div className="space-y-2 text-sm">
        <p className="text-muted-foreground">
          email: <a href="mailto:panshulvempalli@gmail.com" className="text-primary hover:underline">panshulvempalli@gmail.com</a>
        </p>
        <p className="text-muted-foreground">
          github: <a href="https://github.com/PanshulVempalli" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/PanshulVempalli</a>
        </p>
        <p className="text-muted-foreground">
          linkedin: <span className="text-muted-foreground italic text-xs">Coming soon</span>
        </p>
      </div>

      {/* Goals widget */}
      <div className="mt-12 border border-primary p-6 max-w-md mx-auto text-left space-y-4">
        <p className="text-xs font-bold tracking-widest text-primary mb-4">CURRENT GOALS</p>
        {[
          { label: "Work Experience", detail: "Reaching out to UK universities — in progress" },
          { label: "Arkwright Scholarship", detail: "Preparing application for 2026" },
          { label: "Physics Olympiad", detail: "Signed up — BPhO 2026" },
          { label: "CREST Silver", detail: "Independent research project in progress" },
        ].map((g) => (
          <div key={g.label} className="flex flex-col gap-1">
            <span className="text-sm font-bold text-foreground">&gt; {g.label}</span>
            <span className="text-xs text-muted-foreground pl-4">— {g.detail}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 text-center space-y-4">
    <div className="border border-border max-w-md mx-auto px-6 py-4">
      <p className="text-[10px] font-bold tracking-widest text-primary mb-2">// THIS IS JUST THE START</p>
      <p className="text-[10px] text-muted-foreground leading-relaxed">
        This is my personal portfolio — a living document that grows as I do.
        More projects, awards, and experiences are in progress. Check back soon.
      </p>
    </div>
    <p className="text-[10px] text-muted-foreground">
      © 2026 Panshul Vempalli — All Rights Reserved
    </p>
  </footer>
);

// size: "sm" | "md" | "lg" | "xl"
const bgGlyphs = [
  // Left edge
  { text: "//",      top: "150px",  left: "1.5%", size: "sm" },
  { text: ">>",      top: "350px",  left: "2%",   size: "md" },
  { text: "0x1F",    top: "550px",  left: "1.5%", size: "sm" },
  { text: "&&",      top: "750px",  left: "2%",   size: "xl" },
  { text: "/*",      top: "950px",  left: "1.5%", size: "sm" },
  { text: "int",     top: "1150px", left: "2%",   size: "md" },
  { text: "==",      top: "1350px", left: "1.5%", size: "lg" },
  { text: ";;",      top: "1550px", left: "2%",   size: "sm" },
  { text: "ret",     top: "1750px", left: "1.5%", size: "md" },
  { text: "||",      top: "1950px", left: "2%",   size: "xl" },
  { text: "~/",      top: "2150px", left: "1.5%", size: "sm" },
  { text: "for",     top: "2350px", left: "2%",   size: "md" },
  { text: "0b0",     top: "2550px", left: "1.5%", size: "sm" },
  { text: "end",     top: "2750px", left: "2%",   size: "lg" },
  { text: "var",     top: "2950px", left: "1.5%", size: "sm" },
  { text: "<<",      top: "3150px", left: "2%",   size: "xl" },
  { text: "try",     top: "3350px", left: "1.5%", size: "md" },
  { text: "buf",     top: "3550px", left: "2%",   size: "sm" },
  { text: "ctx",     top: "3750px", left: "1.5%", size: "lg" },
  { text: "0b10",    top: "3950px", left: "2%",   size: "sm" },
  { text: "loop",    top: "4150px", left: "1.5%", size: "md" },
  { text: "pub",     top: "4350px", left: "2%",   size: "xl" },
  { text: "pkg",     top: "4550px", left: "1.5%", size: "sm" },
  { text: "use",     top: "4750px", left: "2%",   size: "md" },
  // Right edge
  { text: "01101",   top: "80px",   left: "91%",  size: "sm" },
  { text: "{ }",     top: "270px",  left: "90%",  size: "xl" },
  { text: "0xFF",    top: "470px",  left: "91%",  size: "sm" },
  { text: "</>",     top: "670px",  left: "90%",  size: "md" },
  { text: "#!",      top: "870px",  left: "91%",  size: "lg" },
  { text: "[]",      top: "1070px", left: "90%",  size: "sm" },
  { text: "~>",      top: "1270px", left: "91%",  size: "xl" },
  { text: "0b1",     top: "1470px", left: "90%",  size: "md" },
  { text: ">>>",     top: "1670px", left: "91%",  size: "sm" },
  { text: "null",    top: "1870px", left: "90%",  size: "lg" },
  { text: "err",     top: "2070px", left: "91%",  size: "xl" },
  { text: "10110",   top: "2270px", left: "90%",  size: "sm" },
  { text: "def",     top: "2470px", left: "91%",  size: "md" },
  { text: "EOF",     top: "2670px", left: "90%",  size: "lg" },
  { text: "sys",     top: "2870px", left: "91%",  size: "sm" },
  { text: "0xAB",    top: "3070px", left: "90%",  size: "xl" },
  { text: "map",     top: "3270px", left: "91%",  size: "md" },
  { text: "done",    top: "3470px", left: "90%",  size: "sm" },
  { text: "ref",     top: "3670px", left: "91%",  size: "lg" },
  { text: "mut",     top: "3870px", left: "90%",  size: "xl" },
  { text: "impl",    top: "4070px", left: "91%",  size: "sm" },
  { text: "str",     top: "4270px", left: "90%",  size: "md" },
  { text: "enum",    top: "4470px", left: "91%",  size: "lg" },
  { text: "0xF0",    top: "4670px", left: "90%",  size: "sm" },
  // Inner accents
  { text: "::",      top: "500px",  left: "7%",   size: "md" },
  { text: "+=",      top: "900px",  left: "84%",  size: "md" },
  { text: "->",      top: "1300px", left: "7%",   size: "xl" },
  { text: "fn()",    top: "1700px", left: "84%",  size: "md" },
  { text: "!",       top: "2100px", left: "7%",   size: "xl" },
  { text: "new",     top: "2500px", left: "84%",  size: "lg" },
  { text: "true",    top: "2900px", left: "7%",   size: "md" },
  { text: "log",     top: "3300px", left: "84%",  size: "xl" },
  { text: "0x00",    top: "3700px", left: "7%",   size: "md" },
  { text: "init",    top: "4100px", left: "84%",  size: "lg" },
  { text: "None",    top: "4500px", left: "7%",   size: "xl" },
  { text: "type",    top: "4900px", left: "84%",  size: "md" },
];

const BackgroundGlyphs = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 10, pointerEvents: "none" }}>
    {bgGlyphs.map((g, i) => (
      <span
        key={i}
        className={`bg-glyph bg-glyph-${g.size}`}
        style={{
          top: g.top,
          left: g.left,
          animationDelay: `${(i * 0.37) % 4}s`,
          animationDuration: `${3 + (i % 3)}s`,
        }}
      >
        {g.text}
      </span>
    ))}
  </div>
);

const CornerBrackets = () => (
  <>
    <div className="corner-bracket corner-tl" />
    <div className="corner-bracket corner-tr" />
    <div className="corner-bracket corner-bl" />
    <div className="corner-bracket corner-br" />
  </>
);

// Mobile nav
const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden fixed top-3 left-3 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs text-foreground border border-border px-3 py-1.5 bg-background hover:border-primary transition-colors"
      >
        {open ? "[x]" : "[≡]"}
      </button>
      {open && (
        <div className="absolute top-10 left-0 bg-background border border-border p-3 min-w-[160px] animate-slide-up">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="block text-xs text-muted-foreground hover:text-primary py-1.5"
            >
              &gt; {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const Index = () => {
  return (
    <div className="bg-background min-h-screen relative">
      <BackgroundGlyphs />
      <CornerBrackets />
      <SideNav />
      <MobileNav />

      <div className="md:pl-48 lg:pl-56 relative" style={{ zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <RolesSection />
        <ProjectsSection />
        <SkillsSection />
        <NextSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
