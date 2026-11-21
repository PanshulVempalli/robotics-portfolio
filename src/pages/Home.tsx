import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { Circled, sheets } from "@/components/Layout";
import { Figure, FieldSketch, RankSketch, CarSketch, CanSatSketch, QuantaSketch, ResearchSketch } from "@/components/Sketches";
import { profile, skills } from "@/data/content";

const currently = [
  "building Quanta (AI learning platform)",
  "researching: is AI redesigning engineering?",
  "shadowing a PhD student at Brunel",
  "CanSat with Arm",
];

const measurements = [
  { k: "VEX Worlds 2026", v: "Judges Award" },
  { k: "VEX VR · UK, MS + HS", v: "#1" },
  { k: "VEX VR · World, MS", v: "#11" },
  { k: "Greenpower Internationals", v: "25th" },
];

type Entry = {
  no: string;
  date: string;
  title: string;
  body: ReactNode;
  tags: string[];
  note: string;
  fig: ReactNode;
  caption: string;
  link?: { to: string; label: string };
};

const entries: Entry[] = [
  {
    no: "006",
    date: "2026",
    title: "Judges Award at the VEX Robotics World Championship",
    body: (
      <>
        I pioneered Team 34071B Habs-Gliders, the first mixed VEX team between the Habs boys' and girls' schools. We designed, built, programmed and tested our own robots, competed regionally and nationally, and then won the <b className="text-[var(--ink)] font-semibold">Judges Award for design and innovation</b> at Worlds.
      </>
    ),
    tags: ["C++ / PROS", "PID control", "Autonomous routines", "Team founder"],
    note: "Worlds!! ✓",
    fig: <FieldSketch />,
    caption: "Fig. 6 · Auton path, top view",
    link: { to: "/projects#vex", label: "See the robot code" },
  },
  {
    no: "005",
    date: "2026",
    title: "Top-ranked VEX Virtual Robot programme in the UK",
    body: (
      <>
        I built the VEX Virtual Robot programme that ranked <b className="text-[var(--ink)] font-semibold">first in the UK across Middle and High School</b>, and <b className="text-[var(--ink)] font-semibold">11th in the world</b> for Middle School.
      </>
    ),
    tags: ["Python", "VEX VR", "Path planning"],
    note: "#1 UK",
    fig: <RankSketch />,
    caption: "Fig. 5 · Rankings, 2026",
    link: { to: "/projects#vex", label: "VEX VR code" },
  },
  {
    no: "004",
    date: "2025 →",
    title: "Founding Quanta, an AI-powered learning platform",
    body: "I'm building an international, interactive learning platform from scratch and lead its software, design and user experience. On the side I ship live sites for student organisations and engineering teams, and I won High Honors at the Veritas AI International Hackathon (1,000+ projects, 75+ countries).",
    tags: ["TypeScript / React", "AI tools", "UX", "Founder"],
    note: "still building",
    fig: <QuantaSketch />,
    caption: "Fig. 4 · Lesson screen wireframe",
    link: { to: "/projects#quanta", label: "Project sheet" },
  },
  {
    no: "003",
    date: "2024 – 25",
    title: "HABS Powerstrike: from founding to the International Finals",
    body: "I founded the school's Greenpower electric racing team to leave a lasting engineering legacy. I worked on engineering, testing, documentation and race-day operations for our F24+ car. We won the Portfolio Award at Regionals and finished 25th at the 2025 International Finals.",
    tags: ["F24+", "Testing", "Documentation", "Founder"],
    note: "Portfolio Award",
    fig: <CarSketch />,
    caption: "Fig. 3 · Side elevation, F24+ car",
    link: { to: "/experience", label: "Experience" },
  },
  {
    no: "002",
    date: "Current",
    title: "Research: is AI redesigning engineering, or just making it faster?",
    body: "Funded by a school Research Scholarship, I'm investigating whether AI changes how engineers design, or only speeds up the methods they already use. Alongside it I'm shadowing a PhD student at Brunel University.",
    tags: ["Research Scholarship", "Brunel University", "AI × engineering"],
    note: "the big question",
    fig: <ResearchSketch />,
    caption: "Fig. 2 · Framing the question",
    link: { to: "/research", label: "Research notes" },
  },
  {
    no: "001",
    date: "2025 →",
    title: "CanSat: a miniature satellite, with Arm",
    body: "Developing a satellite system the size of a drinks can, with Arm engaged as an industry partner and further outreach ongoing. I've also done engineering project work with QinetiQ and Airobot Dynamics.",
    tags: ["Embedded", "Sensors", "Industry partner"],
    note: "in progress",
    fig: <CanSatSketch />,
    caption: "Fig. 1 · Descent configuration",
  },
];

const Cover = () => (
  <section className="wrap pt-12 md:pt-20 pb-14">
    <div className="margin-line grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-14 items-start">
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-7">
          <span className="label">Sheet 01 · Cover</span>
          <span className="h-px w-10 bg-[var(--ink)]" />
          <span className="label">Haberdashers' Boys' School · London</span>
        </div>

        <h1 className="h-display text-[58px] sm:text-[92px] md:text-[112px] animate-in fade-in duration-700">
          Panshul
          <br />
          Vempalli<span className="text-[var(--red)]">.</span>
        </h1>

        {/* dimension line */}
        <svg viewBox="0 0 600 40" className="w-full max-w-[620px] h-auto mt-4 draw in" aria-hidden>
          <g stroke="#1f4fbf" strokeWidth="1.2" fill="none">
            <line x1="2" y1="14" x2="598" y2="14" style={{ ["--len" as string]: 600, ["--dd" as string]: "0.3s" }} />
            <path d="M 2 14 l 10 -5 m -10 5 l 10 5 M 598 14 l -10 -5 m 10 5 l -10 5" style={{ ["--len" as string]: 50, ["--dd" as string]: "1s" }} />
            <line x1="2" y1="2" x2="2" y2="26" className="no-draw" />
            <line x1="598" y1="2" x2="598" y2="26" className="no-draw" />
          </g>
          <text x="300" y="36" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="11" fill="#1f4fbf" letterSpacing="2">STUDENT ENGINEER · ROBOTICS · SOFTWARE · AI RESEARCH</text>
        </svg>

        <p className="serif text-[22px] sm:text-[26px] leading-[1.4] text-[var(--ink)] mt-9 max-w-[640px]">
          I build robots, race cars and software, then test them in competition. Most recently, our team won the <Circled>Judges Award</Circled> at VEX Worlds 2026.
        </p>
        <p className="body-copy mt-5 max-w-[600px]">
          Founder of HABS Powerstrike and the AI learning platform Quanta. Research scholar asking whether AI is redesigning engineering. Working with Arm, QinetiQ and Airobot Dynamics.
        </p>

        <div className="flex flex-wrap gap-3 mt-9">
          <Link to="/projects" className="btn-ink">Open the project sheets →</Link>
          <Link to="/cv" className="btn-line">Read my CV</Link>
        </div>
      </div>

      <aside className="relative lg:mt-16">
        <div className="sticky-note p-6 pb-7">
          <p className="hand text-[30px] leading-none mb-4">Currently…</p>
          <ul className="space-y-2.5">
            {currently.map((c) => (
              <li key={c} className="hand text-[22px] leading-[1.15] flex gap-2"><span>–</span><span>{c}</span></li>
            ))}
          </ul>
        </div>
        <p className="red-pen text-[22px] mt-6 ml-4 rotate-2 hidden lg:block">↑ updated Nov 2026</p>
      </aside>
    </div>

    <div className="margin-line mt-14">
      <div className="title-block grid-cols-2 md:grid-cols-4 [&>div]:border-[var(--ink)] [&>div:not(:last-child)]:md:border-r [&>div:nth-child(odd)]:border-r [&>div:nth-child(-n+2)]:border-b md:[&>div:nth-child(-n+2)]:border-b-0">
        {measurements.map((m) => (
          <div key={m.k} className="!px-4 !py-4">
            <div className="tb-k">{m.k}</div>
            <div className="serif text-[28px] sm:text-[32px] leading-none mt-2 tracking-tight">{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contents = () => (
  <section className="wrap py-14">
    <div className="margin-line">
      <Reveal className="grid md:grid-cols-[220px_1fr] gap-8">
        <div>
          <p className="label mb-3">Contents</p>
          <p className="red-pen -rotate-2">start anywhere</p>
        </div>
        <ol className="grid sm:grid-cols-2 gap-x-12">
          {sheets.slice(1).map((s, i) => (
            <li key={s.to}>
              <Link to={s.to} className="group flex items-end py-3 border-b border-[var(--rule)]">
                <span className="mono text-[12px] w-8 text-[var(--ink-3)]">{String(i + 2).padStart(2, "0")}</span>
                <span className="serif text-[24px] group-hover:text-[var(--red)] transition-colors">{s.label}</span>
                <span className="leader" />
                <span className="mono text-[12px] text-[var(--ink-3)]">p.{i + 2}</span>
              </Link>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  </section>
);

const Entries = () => (
  <section className="wrap py-10" aria-labelledby="entries-h">
    <div className="margin-line">
      <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <h2 id="entries-h" className="h-display text-[44px] sm:text-[60px]">Logbook entries</h2>
        <span className="label">Newest first · 6 entries</span>
      </Reveal>

      <div className="border-t-[1.5px] border-[var(--ink)]">
        {entries.map((e, i) => (
          <article key={e.no} className="grid md:grid-cols-[150px_1fr] lg:grid-cols-[150px_1fr_400px] gap-x-10 gap-y-6 py-12 md:py-16 border-b border-[var(--rule)]">
            <Reveal className="flex md:flex-col items-baseline md:items-start gap-x-4 gap-y-2">
              <span className="mono text-[11px] tracking-[0.14em] text-[var(--ink-3)]">ENTRY {e.no}</span>
              <span className="serif text-[26px] leading-none">{e.date}</span>
              <span className="red-pen text-[22px] md:mt-3 -rotate-3 origin-left">{e.note}</span>
            </Reveal>
            <Reveal delay={60}>
              <h3 className="serif text-[28px] sm:text-[34px] leading-[1.1] tracking-[-0.015em] max-w-[560px]">{e.title}</h3>
              <p className="body-copy mt-5 max-w-[580px]">{e.body}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6">{e.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
              {e.link && <Link to={e.link.to} className="ink-link mono text-[13px] inline-block mt-6">{e.link.label} →</Link>}
            </Reveal>
            <Reveal delay={120} className={`md:col-start-2 lg:col-start-auto ${i % 2 ? "lg:rotate-[0.8deg]" : "lg:-rotate-[0.8deg]"}`}>
              <Figure caption={e.caption}>{e.fig}</Figure>
            </Reveal>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const BillOfMaterials = () => {
  const rows: [string, string, string][] = [
    ["01", "Programming", "Python, C++, JavaScript / TypeScript, HTML & CSS"],
    ["02", "Tools", "React, Git & GitHub, web deployment, AI tools, VEX V5 / PROS"],
    ["03", "Engineering", "Robot design, testing, technical documentation"],
    ["04", "Languages", skills.languages.map((l) => `${l.name} (${l.level})`).join(", ")],
    ["05", "Music", "Piano, ABRSM Grade 8 · Violin, ABRSM Grade 5"],
    ["06", "Sport", "Cricket, OMT academy and club"],
  ];
  return (
    <section className="wrap py-16">
      <div className="margin-line">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h2 className="h-display text-[40px] sm:text-[54px]">Bill of materials</h2>
          <span className="red-pen -rotate-2">what I'm made of</span>
        </Reveal>
        <Reveal className="sheet overflow-x-auto">
          <table className="w-full text-left min-w-[520px]">
            <thead>
              <tr className="border-b-[1.5px] border-[var(--ink)]">
                {["Item", "Part", "Specification", "Qty"].map((h) => <th key={h} className="label !text-[10px] px-4 py-3 font-normal">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(([n, part, spec]) => (
                <tr key={n} className="border-b border-[var(--rule)] last:border-0">
                  <td className="mono text-[12px] text-[var(--ink-3)] px-4 py-3.5 w-16">{n}</td>
                  <td className="serif text-[19px] px-4 py-3.5 w-44">{part}</td>
                  <td className="text-[14.5px] text-[var(--ink-2)] px-4 py-3.5">{spec}</td>
                  <td className="mono text-[12px] text-[var(--ink-3)] px-4 py-3.5 w-12">1</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
};

const SignOff = () => (
  <section className="wrap pt-16">
    <div className="margin-line">
      <Reveal className="sheet p-8 sm:p-12 grid md:grid-cols-[1fr_auto] gap-10 items-end">
        <div>
          <p className="label mb-5">Sign-off</p>
          <h2 className="h-display text-[40px] sm:text-[56px] max-w-xl">Have a project, a lab or a question? Write to me.</h2>
          <p className="body-copy mt-5 max-w-lg">Open to conversations with universities and researchers, engineering and robotics work experience, and technical collaborations.</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href={`mailto:${profile.email}`} className="btn-ink">{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn-line">GitHub ↗</a>
          </div>
        </div>
        <div className="md:text-right">
          <div className="hand text-[52px] text-[var(--blue)] leading-none -rotate-3">Panshul</div>
          <div className="h-px bg-[var(--ink)] w-48 mt-2 md:ml-auto" />
          <div className="label mt-2">Signature · {new Date().toLocaleDateString("en-GB")}</div>
        </div>
      </Reveal>
    </div>
  </section>
);

const Home = () => (
  <>
    <Cover />
    <Contents />
    <Entries />
    <BillOfMaterials />
    <SignOff />
  </>
);

export default Home;
