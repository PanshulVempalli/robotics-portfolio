import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Trophy, Github } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { VexField, Blueprint, CodeWindow, ResearchPlot } from "@/components/Visuals";
import { chapters, heroStats, achievements, profile } from "@/data/content";

const visuals = {
  robotics: VexField,
  engineering: Blueprint,
  software: CodeWindow,
  research: ResearchPlot,
};

const partners = ["VEX Robotics", "Arm", "QinetiQ", "Airobot Dynamics", "Brunel University", "Greenpower", "Oxford Scholastica", "Veritas AI", "Amazon Robotics", "University of Huddersfield"];

const now = [
  { k: "Building", v: "Quanta, an AI learning platform" },
  { k: "Researching", v: "Is AI redesigning engineering?" },
  { k: "Shadowing", v: "A PhD student at Brunel University" },
  { k: "Launching", v: "A CanSat, with Arm" },
];

const Hero = () => (
  <section className="relative min-h-[100svh] flex items-center pt-28 pb-16 overflow-hidden">
    <div className="absolute inset-0 grid-bg" aria-hidden />
    <div className="glow" style={{ width: 640, height: 420, top: -120, left: "-6%", background: "rgba(255,138,61,0.22)" }} aria-hidden />
    <div className="glow" style={{ width: 460, height: 360, bottom: -120, right: "-4%", background: "rgba(255,79,123,0.14)" }} aria-hidden />

    <div className="wrap relative grid lg:grid-cols-[1.35fr_0.9fr] gap-14 lg:gap-12 items-center">
      <div>
        <p className="eyebrow mb-7 animate-in fade-in duration-700">Haberdashers' Boys' School · London · Engineering · Robotics · AI</p>
        <h1 className="display text-[46px] leading-[1.0] sm:text-[68px] lg:text-[84px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="dim-text">Hi, I'm Panshul.</span>
          <br />
          <span className="text-white">I build </span>
          <span className="grad-text">robots, race cars, platforms and research.</span>
        </h1>
        <p className="lede mt-8 max-w-xl animate-in fade-in duration-1000">
          VEX Worlds 2026 Judges Award winner, founder of the Greenpower team HABS Powerstrike and the AI learning platform Quanta, and a research scholar asking whether AI is redesigning engineering or just making it faster.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-9 animate-in fade-in duration-1000">
          <Link to="/projects" className="btn btn-primary">View projects <ArrowUpRight className="h-4 w-4" /></Link>
          <Link to="/cv" className="btn btn-ghost">Read my CV</Link>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost !px-4" aria-label="GitHub">
            <Github className="h-4 w-4" /> <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>

      <div className="relative animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="card p-6 sm:p-7 backdrop-blur-sm" style={{ animation: "float 7s ease-in-out infinite" }}>
          <div className="flex items-center justify-between mb-6">
            <span className="eyebrow !text-white/50">Right now</span>
            <span className="flex items-center gap-2 text-[11.5px] text-emerald-300/80 font-mono"><span className="live-dot" /> active</span>
          </div>
          <ul className="space-y-4">
            {now.map((n) => (
              <li key={n.k} className="flex gap-4">
                <span className="w-[92px] shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35 pt-[3px]">{n.k}</span>
                <span className="text-[15px] text-white/90 leading-snug">{n.v}</span>
              </li>
            ))}
          </ul>
          <div className="hairline my-6" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            {heroStats.map((s) => (
              <div key={s.label}>
                <div className="text-[22px] sm:text-[24px] font-semibold tracking-tight" style={{ fontFamily: "var(--display)" }}>{s.value}</div>
                <div className="text-[12px] text-white/45 mt-0.5 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Marquee = () => (
  <section aria-label="Organisations I've worked or competed with" className="border-y border-white/[0.06] py-6 overflow-hidden">
    <div className="flex w-max marquee hover:[animation-play-state:paused]">
      {[...partners, ...partners].map((p, i) => (
        <span key={i} className="mx-8 text-[15px] sm:text-[17px] text-white/35 whitespace-nowrap tracking-tight" style={{ fontFamily: "var(--display)" }}>
          {p}
          <span className="ml-16 text-white/15">✦</span>
        </span>
      ))}
    </div>
  </section>
);

const Chapters = () => (
  <div className="relative">
    {chapters.map((c, i) => {
      const Visual = visuals[c.key];
      const flip = i % 2 === 1;
      return (
        <section key={c.key} id={c.key} className="relative py-24 md:py-32">
          {i === 0 && <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />}
          <div className="wrap grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal className={flip ? "lg:order-2" : ""}>
              <div className="flex items-center gap-4 mb-7">
                <span className="num">{c.n}</span>
                <span className="h-px w-10 bg-white/15" />
                <span className="eyebrow !text-white/60">{c.label}</span>
              </div>
              <h2 className="display text-[40px] sm:text-[54px] md:text-[64px]">
                <span className="dim-text">{c.title[0]}</span>
                <br />
                <span className="grad-text">{c.title[1]}</span>
              </h2>
              <p className="lede mt-7 max-w-[540px]">{c.body}</p>
              <div className="flex flex-wrap gap-2 mt-7">
                {c.tags.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-9">
                {c.link && (
                  <Link to={c.link.to} className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-white">
                    {c.link.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
                <div className="flex items-baseline gap-2 text-white/50 text-[13px]">
                  <span className="text-white text-[20px] font-semibold" style={{ fontFamily: "var(--display)" }}>{c.stat.value}</span>
                  {c.stat.label}
                </div>
              </div>
            </Reveal>
            <Reveal delay={120} className={flip ? "lg:order-1" : ""}>
              <Visual />
            </Reveal>
          </div>
        </section>
      );
    })}
  </div>
);

const Honours = () => {
  const top = achievements.filter((a) => a.tier !== "standard").slice(0, 6);
  return (
    <section className="py-24 md:py-28">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-5">Proof, not promises</p>
            <h2 className="display text-[40px] sm:text-[56px]">
              <span className="dim-text">Tested in </span>
              <span className="grad-text">competition.</span>
            </h2>
          </div>
          <Link to="/achievements" className="btn btn-ghost">All achievements <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {top.map((a, i) => (
            <Reveal key={a.title} delay={i * 70} className="card card-hover p-6 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <span className={`grid place-items-center h-9 w-9 rounded-xl border ${a.tier === "headline" ? "border-orange-400/40 bg-orange-400/10 text-orange-300" : "border-white/10 bg-white/5 text-white/60"}`}>
                  <Trophy className="h-4 w-4" />
                </span>
                <span className="font-mono text-[11px] text-white/40">{a.year || a.category}</span>
              </div>
              <h3 className="text-[17px] font-semibold leading-snug tracking-tight">{a.title}</h3>
              <p className="text-[13.5px] text-white/50 mt-3 leading-relaxed">{a.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Closing = () => (
  <section className="relative pt-28 md:pt-36 pb-8 overflow-hidden">
    <div className="glow" style={{ width: 700, height: 360, top: "10%", left: "50%", transform: "translateX(-50%)", background: "rgba(255,122,61,0.16)" }} aria-hidden />
    <Reveal className="wrap relative text-center">
      <h2 className="display text-[44px] sm:text-[72px] md:text-[92px]">
        <span className="dim-text">Built, tested,</span>
        <br />
        <span className="grad-text">still building.</span>
      </h2>
      <p className="lede max-w-xl mx-auto mt-8">
        Open to conversations with universities and researchers, work experience in engineering and robotics, and technical collaborations.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-10">
        <a href={`mailto:${profile.email}`} className="btn btn-primary">Email me <ArrowUpRight className="h-4 w-4" /></a>
        <Link to="/about" className="btn btn-ghost">More about me</Link>
      </div>
    </Reveal>
  </section>
);

const Home = () => (
  <>
    <Hero />
    <Marquee />
    <Chapters />
    <Honours />
    <Closing />
  </>
);

export default Home;
