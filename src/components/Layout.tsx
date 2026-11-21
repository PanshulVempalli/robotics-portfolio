import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Command as CommandIcon, Menu, X, Github, Mail, FileText, Copy, Home, Trophy, FolderGit2, Briefcase, FlaskConical, User } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { profile } from "@/data/content";

export const navLinks = [
  { to: "/about", label: "About", icon: User },
  { to: "/achievements", label: "Achievements", icon: Trophy },
  { to: "/projects", label: "Projects", icon: FolderGit2 },
  { to: "/experience", label: "Experience", icon: Briefcase },
  { to: "/research", label: "Research", icon: FlaskConical },
  { to: "/cv", label: "CV", icon: FileText },
];

const Monogram = () => (
  <span className="relative grid place-items-center h-8 w-8 rounded-[10px] bg-[#15171d] border border-white/10 overflow-hidden">
    <span className="absolute inset-0 opacity-70" style={{ background: "var(--grad)", maskImage: "linear-gradient(135deg,#000 0%,transparent 70%)", WebkitMaskImage: "linear-gradient(135deg,#000 0%,transparent 70%)" }} />
    <span className="relative font-[var(--display)] text-[13px] font-bold tracking-tight text-white" style={{ fontFamily: "var(--display)" }}>PV</span>
  </span>
);

const ScrollProgress = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const t = document.documentElement.scrollHeight - innerHeight;
      setP(t > 0 ? scrollY / t : 0);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <div className="no-print fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none">
      <div className="h-full origin-left" style={{ transform: `scaleX(${p})`, background: "var(--grad)" }} />
    </div>
  );
};

const Nav = ({ onPalette }: { onPalette: () => void }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const on = () => setScrolled(scrollY > 12);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  return (
    <header className="no-print fixed top-3 left-0 right-0 z-50 px-3">
      <nav
        className={`mx-auto max-w-[1180px] flex items-center justify-between gap-3 h-[56px] pl-3 pr-2 rounded-2xl border transition-all duration-300 ${
          scrolled || open ? "bg-[#0b0c10]/80 border-white/10 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]" : "bg-transparent border-transparent"
        }`}
        aria-label="Main"
      >
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Home">
          <Monogram />
          <span className="hidden sm:block text-[12px] tracking-[0.24em] uppercase text-white/90 font-medium">Panshul Vempalli</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-full text-[13.5px] transition-colors ${isActive ? "text-white bg-white/[0.07]" : "text-white/60 hover:text-white"}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onPalette}
            className="hidden md:inline-flex items-center gap-2 h-9 px-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-[12.5px] transition-colors"
            aria-label="Open command menu"
          >
            <CommandIcon className="h-3.5 w-3.5" />
            <span className="font-mono text-[11px]">K</span>
          </button>
          <a href={`mailto:${profile.email}`} className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-white text-black text-[13px] font-semibold hover:bg-white/90 transition-colors">
            Contact <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            className="lg:hidden grid place-items-center h-10 w-10 rounded-full border border-white/10 text-white/80"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden mx-auto max-w-[1180px] mt-2 rounded-2xl border border-white/10 bg-[#0b0c10]/95 backdrop-blur-xl p-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <NavLink to="/" end className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] ${isActive ? "bg-white/[0.07] text-white" : "text-white/70"}`}>
            <Home className="h-4 w-4 opacity-60" /> Home
          </NavLink>
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] ${isActive ? "bg-white/[0.07] text-white" : "text-white/70"}`}>
              <l.icon className="h-4 w-4 opacity-60" /> {l.label}
            </NavLink>
          ))}
          <a href={`mailto:${profile.email}`} className="flex items-center justify-center gap-2 mt-2 h-12 rounded-xl bg-white text-black font-semibold">
            Email me <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  );
};

const Palette = ({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) => {
  const nav = useNavigate();
  const [copied, setCopied] = useState(false);
  const go = (fn: () => void) => {
    setOpen(false);
    fn();
  };
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Jump to a page, copy my email, open GitHub…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => go(() => nav("/"))}>
            <Home className="mr-2 h-4 w-4" /> Home
          </CommandItem>
          {navLinks.map((l) => (
            <CommandItem key={l.to} onSelect={() => go(() => nav(l.to))}>
              <l.icon className="mr-2 h-4 w-4" /> {l.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => {
              navigator.clipboard?.writeText(profile.email).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              });
            }}
          >
            <Copy className="mr-2 h-4 w-4" /> {copied ? "Copied!" : "Copy email address"}
          </CommandItem>
          <CommandItem onSelect={() => go(() => (location.href = `mailto:${profile.email}`))}>
            <Mail className="mr-2 h-4 w-4" /> Send an email
          </CommandItem>
          <CommandItem onSelect={() => go(() => window.open(profile.github, "_blank", "noopener"))}>
            <Github className="mr-2 h-4 w-4" /> Open GitHub
          </CommandItem>
          <CommandItem onSelect={() => go(() => { nav("/cv"); setTimeout(() => window.print(), 400); })}>
            <FileText className="mr-2 h-4 w-4" /> Download CV as PDF
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

const Footer = () => (
  <footer className="no-print border-t border-white/[0.06] mt-20">
    <div className="wrap py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <Monogram />
          <span className="text-[12px] tracking-[0.24em] uppercase text-white/90 font-medium">Panshul Vempalli</span>
        </div>
        <p className="text-[14px] text-[var(--text-2)] max-w-sm leading-relaxed">
          Student engineer at Haberdashers' Boys' School, London. Open to university conversations, work experience and technical collaborations.
        </p>
      </div>
      <div>
        <p className="eyebrow mb-4">Explore</p>
        <ul className="grid grid-cols-2 gap-y-2 text-[14px]">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-white/60 hover:text-white transition-colors">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="eyebrow mb-4">Contact</p>
        <ul className="space-y-2 text-[14px]">
          <li><a className="text-white/60 hover:text-white transition-colors break-all" href={`mailto:${profile.email}`}>{profile.email}</a></li>
          <li><a className="text-white/60 hover:text-white transition-colors" href={profile.github} target="_blank" rel="noreferrer">github.com/{profile.githubHandle}</a></li>
        </ul>
      </div>
    </div>
    <div className="wrap pb-10 flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-white/35">
      <span>© {new Date().getFullYear()} Panshul Vempalli</span>
      <span className="hidden md:inline">Press <kbd className="font-mono px-1.5 py-0.5 rounded border border-white/15 text-white/60">⌘ K</kbd> to navigate anywhere</span>
    </div>
  </footer>
);

export const Layout = ({ children }: { children: ReactNode }) => {
  const [palette, setPalette] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    addEventListener("keydown", on);
    return () => removeEventListener("keydown", on);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded">Skip to content</a>
      <ScrollProgress />
      <Nav onPalette={() => setPalette(true)} />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
      <Palette open={palette} setOpen={setPalette} />
    </div>
  );
};

export const PageHeader = ({ eyebrow, title, accent, children }: { eyebrow: string; title: string; accent?: string; children?: ReactNode }) => (
  <section className="relative pt-36 md:pt-44 pb-14 md:pb-20 overflow-hidden">
    <div className="absolute inset-0 grid-bg" aria-hidden />
    <div className="glow" style={{ width: 520, height: 320, top: -80, left: "8%", background: "rgba(255,122,61,0.22)" }} aria-hidden />
    <div className="wrap relative">
      <p className="eyebrow mb-6 animate-in fade-in duration-700">{eyebrow}</p>
      <h1 className="display text-[44px] sm:text-[64px] md:text-[80px] max-w-4xl animate-in fade-in slide-in-from-bottom-3 duration-700">
        <span className="dim-text">{title}</span>
        {accent && (
          <>
            {" "}
            <span className="grad-text">{accent}</span>
          </>
        )}
      </h1>
      {children && <div className="lede max-w-2xl mt-7 animate-in fade-in duration-1000">{children}</div>}
    </div>
  </section>
);
