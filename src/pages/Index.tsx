import { useState, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About Me", id: "about" },
  { label: "Roles", id: "roles" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
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
    <nav className="fixed left-0 top-0 h-full z-30 hidden md:flex flex-col justify-center pl-6 lg:pl-10">
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
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
        <a href="https://github.com/PanshulVempalli" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
          <Github className="h-8 w-8" />
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
        &gt; Aspiring Robotics & Visual Computing Engineer
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
        at Imperial College London.
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
    details: [
      "Building and racing an electric car in the Greenpower F24+ competition",
      "Contributing to vehicle electronics and performance optimisation",
    ],
  },
  {
    title: "Software Lead",
    type: "Competition",
    period: "2025 — Present",
    org: "CanSat Team",
    details: [
      "Developing atmospheric data collection and telemetry systems",
      "Programming Arduino-based sensor arrays for descent data logging",
    ],
  },
  {
    title: "Seeking Summer 2026 Shadowing",
    type: "Work Experience",
    period: "Target: July 2026",
    details: [
      "Targeting placements in Computer Vision labs at Imperial College London and Brunel University",
    ],
  },
];

const RolesSection = () => (
  <section id="roles" className="py-16 px-4">
    <SectionHeader title="ROLES" />
    <div className="max-w-2xl mx-auto space-y-8">
      {roles.map((role) => (
        <div key={role.title} className="border-l-2 border-border pl-4 hover:border-primary transition-colors">
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
            <p className="text-xs text-primary mb-2">{role.org}</p>
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

const projects = [
  {
    title: "VEX Robotics — PID Controller",
    type: "Robotics",
    period: "2024",
    description: "Designed a PID controller for consistent 180° turns and autonomous routines using V5 sensors. Achieved ±2° accuracy on autonomous turns at regional competition.",
    stack: ["C++", "V5 Brain", "PID", "Sensor Fusion"],
    status: "Complete",
  },
  {
    title: "CanSat — Atmospheric Data Relay",
    type: "Competition",
    period: "Ongoing",
    description: "Building a satellite the size of a soda can to collect and transmit atmospheric data during descent.",
    stack: ["Python", "Arduino", "Telemetry", "Data Logging"],
    status: "In Progress",
  },
  {
    title: "C++ Deep Dive — Data Structures",
    type: "Personal",
    period: "Ongoing",
    description: "Teaching myself advanced C++ through implementing data structures and algorithms from scratch.",
    stack: ["C++", "STL", "Memory Management"],
    status: "In Progress",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-16 px-4">
    <SectionHeader title="PROJECTS" />
    <div className="max-w-2xl mx-auto space-y-8">
      {projects.map((project) => (
        <div key={project.title} className="border-l-2 border-border pl-4 hover:border-primary transition-colors">
          <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
            <h3 className="text-sm font-bold text-foreground">&gt; {project.title}</h3>
            <div className="flex gap-2">
              <span className="text-[10px] text-muted-foreground border border-border px-2 py-0.5">
                {project.type}
              </span>
              <span className={`text-[10px] px-2 py-0.5 border ${
                project.status === "In Progress"
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-border"
              }`}>
                {project.status}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="text-[10px] text-foreground bg-secondary px-2 py-0.5">
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const skills = {
  Languages: [
    { name: "C++", level: "Intermediate" },
    { name: "Python", level: "Proficient" },
    { name: "HTML/CSS", level: "Proficient" },
  ],
  Tools: [
    { name: "Git / GitHub" },
    { name: "VS Code" },
    { name: "VEX V5 Brain" },
    { name: "Arduino IDE" },
  ],
  Concepts: [
    { name: "PID Control Loops" },
    { name: "Sensor Fusion" },
    { name: "Computer Vision", level: "Learning" },
    { name: "Data Structures", level: "Learning" },
  ],
};

const SkillsSection = () => (
  <section id="skills" className="py-16 px-4">
    <SectionHeader title="SKILLS" />
    <div className="max-w-2xl mx-auto space-y-8">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-sm font-bold text-foreground mb-3">&gt; {category}</h3>
          <div className="space-y-1 pl-4">
            {items.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3 text-xs">
                <span className="text-muted-foreground">— {skill.name}</span>
                {"level" in skill && skill.level && (
                  <span className={`text-[10px] px-2 py-0.5 border ${
                    skill.level === "Learning"
                      ? "text-primary border-primary"
                      : "text-muted-foreground border-border"
                  }`}>
                    {skill.level}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
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

      {/* Current Goal widget */}
      <div className="mt-12 border border-primary p-4 max-w-sm mx-auto text-left">
        <p className="text-[10px] font-bold tracking-widest text-primary mb-2">CURRENT GOAL</p>
        <p className="text-xs text-foreground leading-relaxed">
          Securing a 3-day shadowing placement in a Computer Vision lab for July 2026.
        </p>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 text-center">
    <p className="text-[10px] text-muted-foreground">
      _
    </p>
    <p className="text-[10px] text-muted-foreground mt-4">
      © 2025 Panshul Vempalli — Built from scratch as a living portfolio.
    </p>
  </footer>
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
    <div className="bg-background min-h-screen">
      <CornerBrackets />
      <SideNav />
      <MobileNav />

      <div className="md:pl-48 lg:pl-56">
        <HeroSection />
        <AboutSection />
        <RolesSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
