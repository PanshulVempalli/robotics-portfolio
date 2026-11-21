import { ArrowUpRight, Github } from "lucide-react";
import { PageHeader } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { featuredProjects, miniProjects, profile, type Project } from "@/data/content";

const statusStyle: Record<Project["status"], string> = {
  Live: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
  "In progress": "text-amber-200 border-amber-300/30 bg-amber-300/10",
  Complete: "text-white/70 border-white/15 bg-white/5",
  "Award-winning": "text-orange-200 border-orange-400/35 bg-orange-400/10",
};

const langColor: Record<string, string> = {
  Python: "#3572A5",
  "C++": "#f34b7d",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
};

const ProjectCard = ({ p, big }: { p: Project; big?: boolean }) => (
  <article id={p.slug} className={`card card-hover p-7 sm:p-8 h-full flex flex-col scroll-mt-28 ${big ? "lg:p-10" : ""}`}>
    <div className="flex items-start justify-between gap-4 mb-6">
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11.5px] font-medium ${statusStyle[p.status]}`}>
        {p.status === "Live" && <span className="live-dot !w-[6px] !h-[6px]" />}
        {p.status}
      </span>
      <span className="font-mono text-[11.5px] text-white/40">{p.period}</span>
    </div>
    <h3 className={`font-semibold tracking-tight ${big ? "text-[30px] sm:text-[36px]" : "text-[22px]"}`} style={{ fontFamily: "var(--display)" }}>{p.title}</h3>
    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-orange-300/80 mt-2">{p.kicker}</p>
    <p className="text-[15px] text-white/65 mt-5 leading-relaxed">{p.description}</p>
    {p.points && (
      <ul className="mt-5 space-y-2">
        {p.points.map((pt) => (
          <li key={pt} className="flex gap-3 text-[14px] text-white/60"><span className="mt-[9px] h-1 w-1 rounded-full bg-orange-400 shrink-0" />{pt}</li>
        ))}
      </ul>
    )}
    <div className="flex flex-wrap gap-2 mt-6">{p.stack.map((s) => <span key={s} className="chip !py-1 !text-[12px]">{s}</span>)}</div>
    {p.links && (
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-auto pt-7">
        {p.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-white hover:text-orange-200 transition-colors">
            {l.label} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ))}
      </div>
    )}
  </article>
);

const Projects = () => {
  const [first, second, ...others] = featuredProjects;
  return (
    <>
      <PageHeader eyebrow="Projects" title="Everything here" accent="ships or competes.">
        Platforms, robot code, satellites and tools, from an international learning platform to the code behind a VEX Worlds award.
      </PageHeader>

      <section className="wrap space-y-4">
        <div className="grid lg:grid-cols-2 gap-4">
          <Reveal><ProjectCard p={first} big /></Reveal>
          <Reveal delay={80}><ProjectCard p={second} big /></Reveal>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}><ProjectCard p={p} /></Reveal>
          ))}
        </div>
      </section>

      <section className="wrap mt-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow mb-5">Mini projects</p>
            <h2 className="display text-[36px] sm:text-[52px]"><span className="dim-text">Smaller builds, </span><span className="grad-text">real code.</span></h2>
          </div>
          <a href={`${profile.github}?tab=repositories`} target="_blank" rel="noreferrer" className="btn btn-ghost"><Github className="h-4 w-4" /> All repositories</a>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {miniProjects.map((m, i) => (
            <Reveal key={m.title} delay={(i % 4) * 50}>
              <a href={m.href} target="_blank" rel="noreferrer" className="group card card-hover p-5 flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-mono text-[11px] text-white/45">
                    <span className="h-2 w-2 rounded-full" style={{ background: langColor[m.lang] ?? "#888" }} />{m.lang}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[16px] font-semibold mt-6 tracking-tight">{m.title}</h3>
                <p className="text-[13px] text-white/45 mt-1">{m.note}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
