import { useState, useEffect, useRef } from "react";
import type React from "react";
import { Github, Linkedin, ExternalLink } from "lucide-react";

// ── BootSequence ──────────────────────────────────────────────────────────────
const BOOT_LINES = [
  "PANSHUL OS v1.0 — LOADING...",
  "[OK] Robotics kernel initialized",
  "[OK] PID controllers calibrated",
  "[OK] Sensor arrays online",
  "[OK] Memory allocated: 4096KB",
  "[OK] Vision systems ready",
  "[OK] Autonomous routines loaded",
  "SYSTEM READY.",
];

const BootSequence = ({ onDone }: { onDone: () => void }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (visibleCount < BOOT_LINES.length) {
      const t = setTimeout(() => setVisibleCount((c) => c + 1), 180);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setFading(true);
        setTimeout(() => {
          onDone();
        }, 500);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [visibleCount, onDone]);

  const progress = Math.round((visibleCount / BOOT_LINES.length) * 100);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div className="w-full max-w-lg px-6 font-mono text-sm space-y-1">
        {BOOT_LINES.slice(0, visibleCount).map((line, i) => {
          let cls = "text-foreground";
          if (line.startsWith("[OK]")) cls = "text-green-600";
          else if (line === "SYSTEM READY.") cls = "text-primary font-bold";
          return (
            <div key={i} className={cls}>
              {line}
            </div>
          );
        })}

        {/* Progress bar */}
        <div className="mt-6 h-1 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// ── ScrollProgress ─────────────────────────────────────────────────────────────
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-secondary z-50">
      <div
        className="h-full bg-primary transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// ── TerminalWidget ─────────────────────────────────────────────────────────────
type TerminalEntry = { type: "cmd" | "out"; text: string };

const INITIAL_HISTORY: TerminalEntry[] = [
  { type: "out", text: 'Terminal v1.0 — type "help" for commands' },
];

const runCommand = (raw: string): TerminalEntry[] => {
  const cmd = raw.trim();
  const entries: TerminalEntry[] = [{ type: "cmd", text: cmd }];

  const out = (...lines: string[]) => {
    lines.forEach((l) => entries.push({ type: "out", text: l }));
  };

  if (cmd === "help") {
    out(
      "available commands:",
      "  whoami   projects   skills   contact",
      "  ls       uname      ping     date",
      "  clear    sudo"
    );
  } else if (cmd === "whoami") {
    out(
      "Panshul Vempalli",
      "Year 10 @ Haberdashers' Boys' School",
      "Lead Programmer — VEX Robotics | Software Lead — CanSat",
      "Aspiring Robotics & Visual Computing Engineer"
    );
  } else if (cmd === "ls") {
    out("home/  about/  roles/  projects/  skills/  next/  contact/");
  } else if (cmd === "skills") {
    out(
      "C++ (intermediate), Python (proficient), HTML/CSS (proficient)",
      "Tools: Git, VS Code, Arduino IDE, VEX V5, Fusion 360",
      "Concepts: PID Control, Sensor Fusion, Embedded C++, Telemetry"
    );
  } else if (cmd === "projects") {
    out(
      "1. Habs Gliders Team Website            [Live]",
      "2. JAR Template — VEX Competition Code  [Complete]",
      "3. VEX V5 — Prematch Auton Example      [Complete]",
      "4. VEX V5 — Python Skills Auton         [Complete]",
      "5. Choose Your Level                    [Live]",
      "6. CanSat — Atmospheric Data Relay      [In Progress]"
    );
  } else if (cmd === "contact") {
    out(
      "email: panshulvempalli@gmail.com",
      "github: github.com/PanshulVempalli",
      "linkedin: coming soon"
    );
  } else if (cmd === "uname") {
    out(
      "PANSHUL-OS v1.0 — robotics-kernel 2.0",
      "Stack: React + TypeScript + Vite",
      "Deployed: panshulvempalli.vercel.app"
    );
  } else if (cmd === "sudo rm -rf /" || cmd === "sudo") {
    out("Permission denied. Nice try.");
  } else if (cmd === "ping") {
    out(
      "PING panshul.io: 64 bytes, seq=0, time=<1ms",
      "No packet loss."
    );
  } else if (cmd === "date") {
    out(new Date().toString());
  } else if (cmd === "clear") {
    return []; // signal to reset
  } else {
    out(`command not found: ${cmd}  — type "help"`);
  }

  return entries;
};

const TerminalWidget = () => {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<TerminalEntry[]>(INITIAL_HISTORY);
  const [input, setInput] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for external toggle / close (keyboard shortcuts)
  useEffect(() => {
    const toggle = () => setOpen((o) => !o);
    const close = () => setOpen(false);
    window.addEventListener("toggle-terminal", toggle);
    window.addEventListener("close-terminal", close);
    return () => {
      window.removeEventListener("toggle-terminal", toggle);
      window.removeEventListener("close-terminal", close);
    };
  }, []);

  // Auto-scroll on new output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const submit = () => {
    const cmd = input.trim();
    if (!cmd) return;
    setInput("");
    if (cmd === "clear") {
      setHistory(INITIAL_HISTORY);
      return;
    }
    const newEntries = runCommand(cmd);
    setHistory((h) => [...h, ...newEntries]);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[9980] text-xs border border-primary text-primary px-3 py-1.5 bg-background hover:bg-primary hover:text-primary-foreground transition-colors font-mono"
      >
        [&gt;_] R•CONSOLE
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-16 right-6 z-[9980] w-80 border border-primary bg-background font-mono text-xs animate-slide-up"
          style={{ boxShadow: "0 0 24px rgba(0,0,0,0.6)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-primary">
            <span className="text-primary">PANSHUL://r-console</span>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              ×
            </button>
          </div>

          {/* Output */}
          <div
            ref={outputRef}
            className="h-48 overflow-y-auto px-3 py-2 space-y-0.5"
          >
            {history.map((entry, i) => (
              <div
                key={i}
                className={
                  entry.type === "cmd"
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              >
                {entry.type === "cmd" ? `$ ${entry.text}` : entry.text}
              </div>
            ))}
          </div>

          {/* Input row */}
          <div className="flex items-center border-t border-primary px-3 py-2 gap-2">
            <span className="text-primary">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className="flex-1 bg-transparent text-foreground outline-none caret-primary placeholder:text-muted-foreground"
              placeholder="type a command..."
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>
      )}
    </>
  );
};

// ── CursorTrail ────────────────────────────────────────────────────────────────
const CursorTrail = () => {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const id = idRef.current++;
      setTrail((prev) => [...prev.slice(-10), { x: e.clientX, y: e.clientY, id }]);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9990 }}>
      {trail.map((p, i) => (
        <span
          key={p.id}
          style={{
            position: "fixed",
            left: p.x,
            top: p.y,
            transform: "translate(-50%, -50%)",
            opacity: ((i + 1) / trail.length) * 0.55,
            fontSize: `${7 + i}px`,
            color: "hsl(32 95% 44%)",
            fontFamily: "monospace",
            pointerEvents: "none",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          +
        </span>
      ))}
    </div>
  );
};

// ── ClickRipple ────────────────────────────────────────────────────────────────
type Ripple = { x: number; y: number; id: number };

const ClickRipple = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const id = idRef.current++;
      setRipples((prev) => [...prev, { x: e.clientX, y: e.clientY, id }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9990 }}>
      {ripples.map((r) => (
        <div
          key={r.id}
          style={{
            position: "fixed",
            left: r.x,
            top: r.y,
            width: 4,
            height: 4,
            border: "1.5px solid hsl(32 95% 44% / 0.7)",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            animation: "ripple-expand 0.7s ease-out forwards",
          }}
        />
      ))}
    </div>
  );
};

// ── KonamiEgg ──────────────────────────────────────────────────────────────────
const KONAMI_SEQ = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

const KonamiEgg = ({ onActivate }: { onActivate: () => void }) => {
  const seq = useRef<string[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      seq.current = [...seq.current, e.key].slice(-KONAMI_SEQ.length);
      if (seq.current.join(",") === KONAMI_SEQ.join(",")) {
        onActivate();
        seq.current = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onActivate]);

  return null;
};

const KonamiOverlay = ({ onClose }: { onClose: () => void }) => (
  <div
    className="fixed inset-0 z-[9995] flex items-center justify-center bg-background/90 font-mono"
    onClick={onClose}
  >
    <div className="border border-primary p-8 text-center max-w-sm animate-slide-up" onClick={(e) => e.stopPropagation()}>
      <div className="text-primary font-bold text-lg tracking-widest mb-4">ACCESS GRANTED</div>
      <div className="text-xs text-muted-foreground space-y-2 mb-6">
        <p className="text-green-600">[OK] Developer mode unlocked</p>
        <p className="text-green-600">[OK] All systems nominal</p>
        <p className="text-green-600">[OK] Easter egg found</p>
        <p className="text-primary mt-4">You found the Konami code.</p>
        <p className="text-muted-foreground">Respect.</p>
      </div>
      <button onClick={onClose} className="text-xs border border-border px-4 py-1.5 hover:border-primary hover:text-primary transition-colors">
        [dismiss]
      </button>
    </div>
  </div>
);

// ── KeyboardShortcuts ──────────────────────────────────────────────────────────
const ShortcutsPanel = ({ onClose }: { onClose: () => void }) => (
  <div
    className="fixed inset-0 z-[9990] flex items-center justify-center bg-background/80"
    onClick={onClose}
  >
    <div className="border border-primary p-6 bg-background max-w-xs w-full font-mono animate-slide-up" onClick={(e) => e.stopPropagation()}>
      <div className="text-primary font-bold text-xs tracking-widest mb-5">// KEYBOARD SHORTCUTS</div>
      {([
        ["?", "show this panel"],
        ["T", "toggle terminal"],
        ["G", "open GitHub"],
        ["Esc", "close panels"],
        ["↑↑↓↓←→←→BA", "???"],
      ] as [string, string][]).map(([key, desc]) => (
        <div key={key} className="flex items-center justify-between text-xs mb-3">
          <span className="border border-border px-2 py-0.5 text-foreground min-w-[60px] text-center">{key}</span>
          <span className="text-muted-foreground">{desc}</span>
        </div>
      ))}
      <button className="text-xs text-muted-foreground mt-2 hover:text-primary transition-colors" onClick={onClose}>
        [esc] close
      </button>
    </div>
  </div>
);

// ── SessionTimer ───────────────────────────────────────────────────────────────
const SessionTimer = () => {
  const startRef = useRef(Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  const display = m > 0 ? `${m}m ${String(s).padStart(2, "0")}s` : `${s}s`;

  return (
    <div className="fixed bottom-6 left-6 z-40 text-[11px] text-muted-foreground font-mono opacity-40 hover:opacity-90 transition-opacity select-none">
      [session: {display}]
    </div>
  );
};

// ── IdleMode ───────────────────────────────────────────────────────────────────
const IdleMode = () => {
  const [idle, setIdle] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const reset = () => {
      setIdle(false);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIdle(true), 50000);
    };
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      clearTimeout(timerRef.current);
    };
  }, []);

  if (!idle) return null;

  return (
    <div className="fixed inset-0 z-[9000] bg-background/60 flex items-center justify-center pointer-events-none">
      <div className="text-primary text-xs font-mono tracking-[0.3em] animate-pulse">
        // STANDBY — move to resume
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const navItems = [
  { label: "Home", id: "home" },
  { label: "About Me", id: "about" },
  { label: "Roles", id: "roles" },
  { label: "Accolades", id: "accolades" },
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

const TypingText = () => {
  const phrases = [
    "Aspiring Robotics Engineer",
    "Visual Computing Engineer",
    "VEX Robotics Developer",
    "Open Source Contributor",
  ];
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span>
      {displayed}
      <span className="cursor-blink text-primary ml-0.5">_</span>
    </span>
  );
};

const HeroSection = () => (
  <section id="home" className="min-h-screen flex items-center justify-center px-4">
    <div className="text-center max-w-2xl">
      {/* Social icons */}
      <div className="flex justify-center gap-6 mb-8">
        <span title="Coming soon!" className="text-muted-foreground cursor-default flex flex-col items-center gap-1">
          <Linkedin className="h-8 w-8" />
          <span className="text-[13px] tracking-widest">COMING SOON</span>
        </span>
        <a href="https://github.com/PanshulVempalli" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors flex flex-col items-center gap-1">
          <Github className="h-8 w-8" />
          <span className="text-[13px] tracking-widest">GITHUB</span>
        </a>
      </div>

      {/* ASCII name */}
<pre className="text-xs sm:text-sm leading-tight mb-4 text-foreground font-bold select-none whitespace-pre overflow-x-auto"
  style={{ fontFamily: '"Courier New", Courier, monospace', lineHeight: '1.2', letterSpacing: '0em' }}>
{` ____   _    _   _  ____  _   _  _   _ _     
|  _ \\ / \\  | \\ | |/ ___|| | | || | | | |    
| |_) / _ \\ |  \\| |\\___ \\| |_| || | | | |    
|  __/ ___ \\| |\\  | ___) |  _  || |_| | |___ 
|_| /_/   \\_\\_| \\_||____/|_| |_| \\___/|_____|`}
</pre>

<h1 className="text-2xl md:text-3xl font-bold tracking-wider mb-4">
  Panshul Vempalli
</h1>

<div className="border-t border-border w-64 mx-auto mb-3" />

{/* Typing effect */}
<p className="text-sm text-muted-foreground mb-6">
  &gt; <TypingText />
</p>

<div className="border-t border-border w-64 mx-auto mt-3 mb-6" />

{/* Tech stack badges */}
<div className="flex flex-wrap justify-center gap-2 mb-8">
  {["C++", "Python", "ROS2", "PROS", "React", "TypeScript", "OpenCV", "Git"].map((tech) => (
    <span
      key={tech}
      className="text-xs border border-border px-3 py-1 text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-default font-mono"
    >
      {tech}
    </span>
  ))}
</div>

    
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
              <span className="text-[12px] text-muted-foreground border border-border px-2 py-0.5">
                {role.type}
              </span>
              <span className="text-[12px] text-muted-foreground border border-border px-2 py-0.5">
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
                <span className="text-[12px] text-primary border border-primary px-2 py-0.5">
                  {goal.type}
                </span>
                <span className="text-[12px] text-muted-foreground border border-border px-2 py-0.5">
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
      <p className="text-[12px] text-muted-foreground text-center mt-10 animate-pulse">
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

const accolades = [
  {
    title: "VEX Worlds",
    type: "Competition",
    period: "2026",
    org: "VEX Robotics World Championship",
    detail: "Qualified and competed at the VEX Robotics World Championship with Habs Gliders 34071B.",
    icon: "🏆",
  },
  {
    title: "Greenpower Internationals",
    type: "Competition",
    period: "2025",
    org: "Greenpower Education Trust",
    detail: "Competed at international level with HABS Powerstrike in the Greenpower F24+ electric racing competition.",
    icon: "⚡",
  },
  {
    title: "Portfolio Award — Regionals",
    type: "Award",
    period: "2025",
    org: "VEX Robotics",
    detail: "Recognised for engineering documentation and team portfolio at regional competition level with Habs Gliders.",
    icon: "◈",
  },
  {
    title: "CREST Award — Bronze",
    type: "Award",
    period: "2024",
    org: "British Science Association",
    detail: "Completed an independent STEM research project at Bronze level.",
    icon: "◆",
  },
];

const AccoladesSection = () => (
  <section id="accolades" className="py-16 px-4">
    <SectionHeader title="ACCOLADES" />
    <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
      {accolades.map((a) => (
        <div key={a.title} className="card-hover border border-border pl-4 pr-3 py-4 transition-colors hover:border-primary group">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-lg leading-none">{a.icon}</span>
            <div className="flex gap-2 ml-auto">
              <span className="text-[11px] text-primary border border-primary px-2 py-0.5">{a.type}</span>
              <span className="text-[11px] text-muted-foreground border border-border px-2 py-0.5">{a.period}</span>
            </div>
          </div>
          <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{a.title}</h3>
          <p className="text-[11px] text-primary mb-2">{a.org}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">— {a.detail}</p>
        </div>
      ))}
    </div>
  </section>
);

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
              <span className="text-[12px] text-muted-foreground border border-border px-2 py-0.5">
                {project.type}
              </span>
              <span className={`text-[12px] px-2 py-0.5 border ${
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
              <span key={tech} className="text-[12px] text-foreground bg-secondary px-2 py-0.5 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
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
                <span className="font-mono text-[13px] tracking-widest text-foreground">
                  {"█".repeat(lang.bars)}{"░".repeat(lang.total - lang.bars)}
                </span>
                <span className="text-[12px] text-muted-foreground w-24 text-right">{lang.level}</span>
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
            <span key={tool} className="text-[13px] text-muted-foreground border border-border px-3 py-1 hover:border-primary hover:text-foreground transition-colors">
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
              <span className={`text-[12px] px-2 py-0.5 border ${
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
      <p className="text-[12px] font-bold tracking-widest text-primary mb-2">// THIS IS JUST THE START</p>
      <p className="text-[12px] text-muted-foreground leading-relaxed">
        This is my personal portfolio — a living document that grows as I do.
        More projects, awards, and experiences are in progress. Check back soon.
      </p>
    </div>
    <p className="text-[12px] text-muted-foreground">
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

const CornerBrackets = () => null;

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
  const [booted, setBooted] = useState(
    () => sessionStorage.getItem("booted") === "1"
  );
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "?") setShowShortcuts((v) => !v);
      if (e.key === "t" || e.key === "T") window.dispatchEvent(new CustomEvent("toggle-terminal"));
      if (e.key === "g" || e.key === "G") window.open("https://github.com/PanshulVempalli", "_blank");
      if (e.key === "Escape") { setShowShortcuts(false); setKonamiActive(false); window.dispatchEvent(new CustomEvent("close-terminal")); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="bg-background min-h-screen relative">
      {!booted && <BootSequence onDone={() => setBooted(true)} />}

      {/* Always-on effects */}
      <ScrollProgress />
      <CursorTrail />
      <ClickRipple />
      <IdleMode />
      <SessionTimer />

      {/* Easter egg & overlays */}
      <KonamiEgg onActivate={() => setKonamiActive(true)} />
      {konamiActive && <KonamiOverlay onClose={() => setKonamiActive(false)} />}
      {showShortcuts && <ShortcutsPanel onClose={() => setShowShortcuts(false)} />}

      <BackgroundGlyphs />
      <CornerBrackets />
      <SideNav />
      <MobileNav />

      <div className="md:pl-48 lg:pl-56 relative" style={{ zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <RolesSection />
        <AccoladesSection />
        <ProjectsSection />
        <SkillsSection />
        <NextSection />
        <ContactSection />
        <Footer />
      </div>

      <TerminalWidget />
    </div>
  );
};

export default Index;
