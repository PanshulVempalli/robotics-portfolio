import { SheetHeader } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { Figure, ResearchSketch, TrussSketch } from "@/components/Sketches";
import { research } from "@/data/content";

const Research = () => (
  <>
    <SheetHeader no="06 · Research" title={<>Is AI <em className="text-[var(--red)]">redesigning</em> engineering, or just making it faster?</>} note="Research Scholarship">
      {research.intro}
    </SheetHeader>

    {/* framing */}
    <section className="wrap">
      <div className="margin-line">
        <Reveal className="sheet p-7 sm:p-10 grid lg:grid-cols-[1fr_380px] gap-10 items-center">
          <div>
            <p className="label mb-4">Why it matters</p>
            <blockquote className="serif text-[24px] sm:text-[28px] leading-[1.4]">{research.framing}</blockquote>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6">
              {research.areas.map((a) => <span key={a} className="tag">{a}</span>)}
            </div>
            <p className="label !normal-case !tracking-normal mt-3">The five stages reviewed, across civil and mechanical engineering.</p>
          </div>
          <Figure caption="Fig. R1 · Two possible answers" className="-rotate-[0.8deg]"><ResearchSketch /></Figure>
        </Reveal>
      </div>
    </section>

    {/* plan */}
    <section className="wrap mt-20">
      <div className="margin-line">
        <Reveal className="flex flex-wrap items-baseline gap-4 mb-2 pb-4 border-b-[1.5px] border-[var(--ink)]">
          <h2 className="h-display text-[36px] sm:text-[46px]">The plan</h2>
          <span className="red-pen -rotate-2">read, then test it myself</span>
        </Reveal>
        {research.strands.map((s, i) => (
          <Reveal key={s.title} delay={i * 70} className="grid sm:grid-cols-[90px_1fr] gap-x-6 gap-y-2 py-7 border-b border-[var(--rule)]">
            <span className="red-pen text-[30px] leading-none">Step {i + 1}</span>
            <div>
              <h3 className="serif text-[25px] leading-tight">{s.title}</h3>
              <p className="body-copy mt-2 max-w-[700px]">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* preliminary work */}
    <section className="wrap mt-20">
      <div className="margin-line">
        <Reveal className="mb-8">
          <p className="label mb-3">Preliminary work</p>
          <h2 className="h-display text-[36px] sm:text-[46px]">Both halves of the experiment already exist</h2>
        </Reveal>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-6 items-start">
          <div className="space-y-6">
            {research.preliminary.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="sheet p-7">
                <div className="flex items-start justify-between gap-4">
                  <a href={p.href} target="_blank" rel="noreferrer" className="serif text-[26px] leading-tight hover:text-[var(--red)]">{p.title} ↗</a>
                  <div className="text-right shrink-0">
                    <div className="serif text-[30px] leading-none text-[var(--red)]">{p.stat}</div>
                    <div className="mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-3)] mt-1 max-w-[130px]">{p.statLabel}</div>
                  </div>
                </div>
                <p className="body-copy !text-[15px] mt-4">{p.body}</p>
              </Reveal>
            ))}
            <Reveal className="sheet p-6">
              <p className="text-[14.5px] text-[var(--ink-2)] leading-relaxed">
                <span className="red-pen text-[22px] mr-2">Next:</span>
                use the solver to generate engineering data, change the network so it predicts numbers instead of classes, and test it on cases outside its training range.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Figure caption="Fig. R2 · Truss-Solver: 8 m Warren footbridge" className="rotate-[0.6deg]"><TrussSketch /></Figure>
          </Reveal>
        </div>
      </div>
    </section>

    {/* timeline */}
    <section className="wrap mt-20">
      <div className="margin-line">
        <Reveal><h2 className="h-display text-[36px] sm:text-[46px] mb-8">Twelve-month timeline</h2></Reveal>
        <Reveal className="sheet overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[110px_1fr] border-b-[1.5px] border-[var(--ink)]">
              <span className="label !text-[10px] px-4 py-3">Months</span>
              <div className="grid grid-cols-12">
                {Array.from({ length: 12 }).map((_, m) => <span key={m} className="label !text-[10px] py-3 text-center">{m + 1}</span>)}
              </div>
            </div>
            {research.timeline.map((r, i) => {
              const [a, b] = r.months.split("–").map(Number);
              return (
                <div key={r.months + i} className="grid grid-cols-[110px_1fr] border-b border-[var(--rule)] last:border-0 items-center">
                  <span className="mono text-[12px] text-[var(--ink-3)] px-4 py-3">{r.months}</span>
                  <div className="relative py-3 pr-3">
                    <div className="grid grid-cols-12 h-6">
                      <div
                        className="rounded-[3px] border-[1.5px]"
                        style={{
                          gridColumn: `${a} / ${b + 1}`,
                          borderColor: i === 5 ? "#cf3a2b" : "#1f4fbf",
                          background: i === 5 ? "rgba(207,58,43,0.12)" : "rgba(31,79,191,0.08)",
                        }}
                      />
                    </div>
                    <p className="text-[13px] text-[var(--ink-2)] mt-1.5">{r.phase}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
        <p className="red-pen mt-4 -rotate-1">red = the experiment</p>
      </div>
    </section>

    {/* academic experience */}
    <section className="wrap mt-24">
      <div className="margin-line">
        <Reveal><h2 className="h-display text-[36px] sm:text-[46px] mb-8">Academic experience</h2></Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {research.experience.map((e, i) => (
            <Reveal key={e.title} delay={i * 70} className="sheet p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="serif text-[24px] leading-tight">{e.title}</h3>
                  <p className="text-[14px] text-[var(--blue)] mt-1">{e.org}</p>
                </div>
                <span className="stamp whitespace-nowrap">{e.period}</span>
              </div>
              <p className="body-copy !text-[15px] mt-4">{e.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Research;
