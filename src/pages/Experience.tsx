import { SheetHeader } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { roles, type Role } from "@/data/content";

const groups: { kind: Role["kind"][]; title: string; note: string }[] = [
  { kind: ["Robotics", "Engineering"], title: "Founding & engineering", note: "teams I started" },
  { kind: ["Industry"], title: "Industry", note: "real companies" },
  { kind: ["Leadership"], title: "Leadership & mentoring", note: "passing it on" },
];

const Experience = () => (
  <>
    <SheetHeader no="05 · Experience" title="Experience log" note="founder ×3">
      I founded the teams I wanted to be part of, and worked with industry partners including Arm, QinetiQ and Airobot Dynamics.
    </SheetHeader>

    <div className="wrap space-y-20">
      {groups.map((g, gi) => {
        const items = roles.filter((r) => g.kind.includes(r.kind));
        return (
          <section key={g.title} className="margin-line">
            <Reveal className="flex flex-wrap items-baseline gap-4 mb-2 pb-4 border-b-[1.5px] border-[var(--ink)]">
              <span className="mono text-[12px] text-[var(--ink-3)]">§{gi + 1}</span>
              <h2 className="h-display text-[34px] sm:text-[44px]">{g.title}</h2>
              <span className="red-pen -rotate-2">{g.note}</span>
            </Reveal>
            <ol>
              {items.map((r, i) => (
                <Reveal as="li" key={r.title + r.org} delay={i * 50} className="grid md:grid-cols-[170px_1fr] gap-x-10 gap-y-2 py-8 border-b border-[var(--rule)]">
                  <span className="mono text-[12.5px] text-[var(--ink-2)] pt-1.5">{r.period}</span>
                  <div>
                    <h3 className="serif text-[26px] leading-tight">{r.title}</h3>
                    {r.href ? (
                      <a href={r.href} target="_blank" rel="noreferrer" className="ink-link text-[14.5px] inline-block mt-1">{r.org} ↗</a>
                    ) : (
                      <p className="text-[14.5px] text-[var(--blue)] mt-1">{r.org}</p>
                    )}
                    <ul className="mt-4 space-y-2 max-w-[640px]">
                      {r.points.map((p) => (
                        <li key={p} className="flex gap-3 body-copy !text-[15.5px] !leading-relaxed"><span className="text-[var(--red)] mono">→</span>{p}</li>
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
