import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { roles, type Role } from "@/data/content";

const groups: { kind: Role["kind"][]; title: string; blurb: string }[] = [
  { kind: ["Robotics", "Engineering"], title: "Engineering & founding", blurb: "Teams and products I started, and the machines we built." },
  { kind: ["Industry"], title: "Industry", blurb: "Working alongside companies and universities." },
  { kind: ["Leadership"], title: "Leadership & mentoring", blurb: "Leading societies and teaching what I've learned." },
];

const Experience = () => (
  <>
    <PageHeader eyebrow="Experience" title="Founder, engineer," accent="mentor.">
      I founded the teams I wanted to be part of, then worked with industry partners including Arm, QinetiQ and Airobot Dynamics.
    </PageHeader>

    <div className="wrap space-y-24">
      {groups.map((g) => {
        const items = roles.filter((r) => g.kind.includes(r.kind));
        return (
          <section key={g.title} className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 self-start">
              <h2 className="text-[26px] font-semibold tracking-tight" style={{ fontFamily: "var(--display)" }}>{g.title}</h2>
              <p className="text-[14.5px] text-white/50 mt-3 leading-relaxed">{g.blurb}</p>
            </Reveal>
            <ol className="relative border-l border-white/10 ml-1.5 space-y-6">
              {items.map((r, i) => (
                <Reveal as="li" key={r.title + r.org} delay={i * 60} className="relative pl-8">
                  <span className="absolute -left-[6.5px] top-7 h-3 w-3 rounded-full border-2 border-[#07080b]" style={{ background: "var(--grad)" }} />
                  <div className="card card-hover p-6 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[19px] font-semibold tracking-tight">{r.title}</h3>
                        {r.href ? (
                          <a href={r.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[14px] text-orange-200/90 hover:text-orange-100 mt-1">
                            {r.org} <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <p className="text-[14px] text-orange-200/90 mt-1">{r.org}</p>
                        )}
                      </div>
                      <span className="font-mono text-[11.5px] text-white/40 pt-1">{r.period}</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {r.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[14.5px] text-white/65 leading-relaxed"><span className="mt-[10px] h-1 w-1 rounded-full bg-white/40 shrink-0" />{p}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  </>
);

export default Experience;
