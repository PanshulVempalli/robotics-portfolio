import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Github, Mail, FileText, Copy, Home, Trophy, FolderGit2, Briefcase, FlaskConical, User, X } from "lucide-react";
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

export const sheets = [
  { to: "/", label: "Home", short: "Home", icon: Home, tab: "#f7f2e4" },
  { to: "/about", label: "About", short: "About", icon: User, tab: "#fbe68a" },
  { to: "/achievements", label: "Achievements", short: "Results", icon: Trophy, tab: "#f6c7bf" },
  { to: "/projects", label: "Projects", short: "Projects", icon: FolderGit2, tab: "#c9dbf5" },
  { to: "/experience", label: "Experience", short: "Experience", icon: Briefcase, tab: "#cfe6c8" },
  { to: "/research", label: "Research", short: "Research", icon: FlaskConical, tab: "#ddd2f0" },
  { to: "/cv", label: "CV", short: "CV", icon: FileText, tab: "#ffffff" },
];

export const sheetNo = (path: string) => {
  const i = sheets.findIndex((s) => s.to === path);
  return i < 0 ? "—" : String(i + 1).padStart(2, "0");
};

/** Hand-drawn red circle to wrap a phrase */
export const Circled = ({ children, delay = 0.6 }: { children: ReactNode; delay?: number }) => (
  <span className="circled">
    {children}
    <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden className="draw in">
      <path d="M 18 34 C 10 10, 120 2, 182 16 C 206 24, 196 52, 120 56 C 60 60, 4 50, 10 30 C 14 18, 40 10, 70 9" fill="none" stroke="#cf3a2b" strokeWidth="2.2" strokeLinecap="round" style={{ ["--len" as string]: 560, ["--dd" as string]: `${delay}s` }} vectorEffect="non-scaling-stroke" />
    </svg>
  </span>
);

const TopStrip = ({ onPalette, onMenu }: { onPalette: () => void; onMenu: () => void }) => {
  const { pathname } = useLocation();
  return (
    <header className="no-print relative z-40 border-b-[1.5px] border-[var(--ink)] bg-[var(--paper)]/90 backdrop-blur-[2px]">
      <div className="wrap h-14 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-baseline gap-3 min-w-0" aria-label="Home">
          <span className="serif text-[21px] font-semibold tracking-tight whitespace-nowrap">P. Vempalli</span>
          <span className="hidden sm:inline label truncate">Engineering logbook · Vol. 04</span>
        </Link>

        <nav className="hidden lg:flex xl:hidden items-center gap-5" aria-label="Main">
          {sheets.slice(1).map((s) => (
            <NavLink key={s.to} to={s.to} className={({ isActive }) => `mono text-[12.5px] ${isActive ? "text-[var(--red)] underline decoration-2 underline-offset-[6px]" : "text-[var(--ink-2)] hover:text-[var(--ink)]"}`}>
              {s.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden md:inline label">Sheet {sheetNo(pathname)} / 07</span>
          <button onClick={onPalette} className="hidden md:inline-flex mono text-[11.5px] h-8 px-2.5 border border-[var(--rule)] rounded-[3px] text-[var(--ink-2)] hover:border-[var(--ink)] hover:text-[var(--ink)] bg-white/40" aria-label="Open command menu">
            ⌘K
          </button>
          <a href={`mailto:${profile.email}`} className="hidden sm:inline-flex mono text-[12.5px] h-8 items-center px-3 bg-[var(--ink)] text-[var(--paper)] rounded-[3px]">
            Contact
          </a>
          <button onClick={onMenu} className="lg:hidden mono text-[12.5px] h-9 px-3 border-[1.5px] border-[var(--ink)] rounded-[3px] bg-white/50" aria-label="Open contents">
            Contents
          </button>
        </div>
      </div>
    </header>
  );
};

/** Notebook index tabs sticking out of the right edge (wide screens) */
const IndexTabs = () => (
  <nav className="no-print hidden xl:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col gap-1.5" aria-label="Sections">
    {sheets.map((s, i) => (
      <NavLink
        key={s.to}
        to={s.to}
        end={s.to === "/"}
        className={({ isActive }) =>
          `group relative block w-[46px] h-[104px] rounded-l-[6px] border border-r-0 border-[rgba(23,24,28,0.22)] transition-transform duration-200 shadow-[-2px_2px_0_rgba(0,0,0,0.05)] ${
            isActive ? "-translate-x-3" : "hover:-translate-x-1.5"
          }`
        }
        style={{ background: s.tab }}
      >
        {({ isActive }) => (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className={`mono text-[11px] tracking-[0.12em] uppercase whitespace-nowrap -rotate-90 ${isActive ? "text-[var(--red)] font-semibold" : "text-[var(--ink-2)]"}`}>
              {String(i + 1).padStart(2, "0")} {s.short}
            </span>
          </span>
        )}
      </NavLink>
    ))}
  </nav>
);

const ContentsSheet = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;
  return (
    <div className="no-print fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Contents">
      <div className="absolute inset-0 bg-[rgba(23,24,28,0.35)]" onClick={onClose} />
      <div className="absolute right-3 left-3 top-3 sheet p-5 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="flex items-center justify-between mb-4">
          <span className="serif text-[26px] font-semibold">Contents</span>
          <button onClick={onClose} aria-label="Close" className="h-9 w-9 grid place-items-center border border-[var(--rule)] rounded-[3px]"><X className="h-4 w-4" /></button>
        </div>
        <ol>
          {sheets.map((s, i) => (
            <li key={s.to}>
              <NavLink to={s.to} end={s.to === "/"} onClick={onClose} className={({ isActive }) => `flex items-end py-2.5 ${isActive ? "text-[var(--red)]" : ""}`}>
                <span className="mono text-[12px] w-8 text-[var(--ink-3)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="serif text-[21px]">{s.label}</span>
                <span className="leader" />
                <span className="mono text-[12px] text-[var(--ink-3)]">p.{i + 1}</span>
              </NavLink>
            </li>
          ))}
        </ol>
        <a href={`mailto:${profile.email}`} className="btn-ink w-full justify-center mt-5">Email me</a>
      </div>
    </div>
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
      <CommandInput placeholder="Turn to a page, copy my email, open GitHub…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Pages">
          {sheets.map((s) => (
            <CommandItem key={s.to} onSelect={() => go(() => nav(s.to))}>
              <s.icon className="mr-2 h-4 w-4" /> {s.label}
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

const Footer = () => {
  const { pathname } = useLocation();
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
  return (
    <footer className="no-print mt-24 pb-12">
      <div className="wrap">
        <div className="title-block grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] [&>div]:border-[var(--ink)] [&>div]:border-r [&>div]:border-b">
          <div className="col-span-2 md:col-span-1 md:row-span-2 !p-4 flex flex-col justify-between gap-4">
            <div>
              <div className="tb-k">Title</div>
              <div className="serif text-[26px] leading-none mt-2 tracking-tight">Panshul Vempalli</div>
              <div className="text-[12px] text-[var(--ink-2)] mt-2">Engineering logbook · London</div>
            </div>
            <div className="hand text-[30px] text-[var(--blue)] leading-none -rotate-2 origin-left">P. Vempalli</div>
          </div>
          <div><div className="tb-k">Drawn by</div><div className="tb-v">P. Vempalli</div></div>
          <div><div className="tb-k">Checked</div><div className="tb-v text-[var(--red)]">✓ verified</div></div>
          <div><div className="tb-k">Sheet</div><div className="tb-v">{sheetNo(pathname)} of 07</div></div>
          <div><div className="tb-k">Date</div><div className="tb-v">{today}</div></div>
          <div className="md:col-span-2"><div className="tb-k">Contact</div><a className="tb-v block break-all hover:text-[var(--blue)]" href={`mailto:${profile.email}`}>{profile.email}</a></div>
          <div className="col-span-2 md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 !py-3">
            {sheets.map((s) => (
              <Link key={s.to} to={s.to} className="text-[12px] text-[var(--ink-2)] hover:text-[var(--red)]">{s.label}</Link>
            ))}
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-[12px] text-[var(--ink-2)] hover:text-[var(--red)] md:ml-auto">github.com/{profile.githubHandle} ↗</a>
          </div>
        </div>
        <p className="label mt-4 !normal-case !tracking-normal">© {new Date().getFullYear()} Panshul Vempalli. Scale 1:1. Do not measure from screen.</p>
      </div>
    </footer>
  );
};

export const Layout = ({ children }: { children: ReactNode }) => {
  const [palette, setPalette] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setMenu(false);
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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-white focus:px-3 focus:py-2">Skip to content</a>
      <TopStrip onPalette={() => setPalette(true)} onMenu={() => setMenu(true)} />
      <IndexTabs />
      <ContentsSheet open={menu} onClose={() => setMenu(false)} />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
      <Palette open={palette} setOpen={setPalette} />
    </div>
  );
};

/** Page opener: sheet label, serif title, red-pen note */
export const SheetHeader = ({ no, title, note, children }: { no: string; title: ReactNode; note?: string; children?: ReactNode }) => (
  <section className="wrap pt-14 md:pt-20 pb-10 md:pb-14">
    <div className="margin-line">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="label">Sheet {no}</span>
        <span className="h-px w-10 bg-[var(--ink)]" />
        {note && <span className="red-pen text-[22px] -rotate-2">{note}</span>}
      </div>
      <h1 className="h-display text-[48px] sm:text-[68px] md:text-[84px] max-w-4xl">{title}</h1>
      {children && <div className="body-copy text-[17.5px] max-w-2xl mt-6">{children}</div>}
    </div>
  </section>
);
