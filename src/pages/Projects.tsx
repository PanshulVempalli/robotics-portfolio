import { SheetHeader } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { Figure, QuantaSketch } from "@/components/Sketches";
import { PidTuner, CanSatFlight } from "@/components/Lab";
import { featuredProjects, miniProjects, hackathons, profile, type Project } from "@/data/content";

const figs: Record<string, JSX.Element> = {
  quanta: <QuantaSketch />,
  vex: <PidTuner />,
  cansat: <CanSatFlight />,
};

const statusColor: Record<Project["status"], string> = {
  Live: "#2f7d3a",
  "In progress": "#1f4fbf",
  Complete: "#44464d",
  "Award-winning": "#cf3a2b",
};

const ProjectSheet = ({ p, n, wide }: { p: Project; n: number; wide?: boolean }) => (
  <article id={p.slug} className="sheet scroll-mt-24 flex flex-col h-full">
    <div className={`p-6 sm:p-8 flex-1 ${wide ? "grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start" : ""}`}>
      <div>
        <div className="flex items-center gap-3 mb-5">
          <span className="stamp" style={{ color: statusColor[p.status], borderColor: statusColor[p.status] }}>{p.status}</span>
        </div>
        <h3 className={`serif tracking-[-0.02em] leading-[1.05] ${wide ? "text-[38px] sm:text-[46px]" : "text-[28px]"}`}>{p.title}</h3>
        <p className="mono text-[11.5px] uppercase tracking-[0.1em] text-[var(--ink-3)] mt-3">{p.kicker}</p>
        <p className="body-copy mt-5 !text-[15.5px]">{p.description}</p>
        {p.points && (
          <ul className="mt-5 space-y-2">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-3 text-[14.5px] text-[var(--ink-2)]"><span className="text-[var(--red)] mono">→</span>{pt}</li>
            ))}
          </ul>
        )}
        {p.links && (
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6">
            {p.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="ink-link mono text-[13px]">{l.label} ↗</a>)}
          </div>
        )}
      </div>
      {wide && figs[p.slug] && <Figure caption={`Fig. ${n} · ${p.title}`} >{figs[p.slug]}</Figure>}
    </div>
    <div className="title-block !border-x-0 !border-b-0 grid-cols-[1.4fr_1fr_0.6fr] [&>div:not(:last-child)]:border-r [&>div]:border-[var(--ink)]">
      <div><div className="tb-k">Stack</div><div className="tb-v truncate">{p.stack.join(" · ")}</div></div>
      <div><div className="tb-k">Period</div><div className="tb-v">{p.period}</div></div>
      <div><div className="tb-k">Sheet</div><div className="tb-v">P-{String(n).padStart(2, "0")}</div></div>
    </div>
  </article>
);

const Projects = () => {
  const [a, b, c, ...rest] = featuredProjects;
  return (
    <>
      <SheetHeader no="04 · Projects" title="Project sheets" note="all real, all working">
        Platforms, robot code, a satellite and the tools in between. Each sheet lists what it is, what it's built with and where to see it.
      </SheetHeader>

      <section className="wrap">
        <div className="margin-line space-y-8">
          <Reveal><ProjectSheet p={a} n={1} wide /></Reveal>
          <Reveal><ProjectSheet p={b} n={2} wide /></Reveal>
          <Reveal><ProjectSheet p={c} n={3} wide /></Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {rest.map((p, i) => <Reveal key={p.slug} delay={i * 70}><ProjectSheet p={p} n={i + 4} /></Reveal>)}
          </div>
        </div>
      </section>

      <section id="hackathons" className="wrap mt-24 scroll-mt-24">
        <div className="margin-line">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="label mb-3">Competition entries</p>
              <h2 className="h-display text-[40px] sm:text-[54px]">Hackathons</h2>
            </div>
            <span className="red-pen -rotate-2">4 entered, 4 shipped</span>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {hackathons.map((h, i) => (
              <Reveal key={h.project} delay={(i % 2) * 80} className="sheet flex flex-col">
                <div className="p-6 sm:p-7 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <span className="mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-3)]">Entry H-{String(i + 1).padStart(2, "0")}</span>
                    {h.result ? <span className="stamp">{h.result}</span> : <span className="stamp" style={{ color: "#1f4fbf", borderColor: "#1f4fbf" }}>Submitted</span>}
                  </div>
                  <h3 className="serif text-[30px] leading-tight tracking-[-0.015em]">{h.project}</h3>
                  <p className="text-[14px] text-[var(--blue)] mt-1">{h.event}</p>
                  <p className="body-copy !text-[15px] mt-4">{h.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {h.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[14px] text-[var(--ink-2)]"><span className="text-[var(--red)] mono">→</span>{pt}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6">
                    {h.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="ink-link mono text-[13px]">{l.label} ↗</a>)}
                  </div>
                </div>
                <div className="title-block !border-x-0 !border-b-0">
                  <div><div className="tb-k">Built with</div><div className="tb-v">{h.stack.join(" · ")}</div></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap mt-24">
        <div className="margin-line">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="label mb-3">Appendix A</p>
              <h2 className="h-display text-[40px] sm:text-[54px]">Smaller builds</h2>
            </div>
            <a href={`${profile.github}?tab=repositories`} target="_blank" rel="noreferrer" className="btn-line">All repositories ↗</a>
          </Reveal>
          <Reveal className="grid md:grid-cols-2 gap-x-14">
            {miniProjects.map((m, i) => (
              <a key={m.title} href={m.href} target="_blank" rel="noreferrer" className="group flex items-end py-3.5 border-b border-[var(--rule)]">
                <span className="mono text-[11.5px] w-10 text-[var(--ink-3)]">A.{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className="serif text-[20px] group-hover:text-[var(--red)] transition-colors">{m.title}</span>
                  <span className="block text-[12.5px] text-[var(--ink-3)]">{m.note}</span>
                </span>
                <span className="leader" />
                <span className="mono text-[11.5px] text-[var(--ink-2)] whitespace-nowrap">{m.lang} ↗</span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Projects;
