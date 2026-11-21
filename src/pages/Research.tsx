import { PageHeader } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { ResearchPlot } from "@/components/Visuals";
import { research } from "@/data/content";

const Research = () => (
  <>
    <PageHeader eyebrow="Independent research · Research Scholarship" title="Is AI redesigning engineering," accent="or just making it faster?">
      {research.intro}
    </PageHeader>

    <section className="wrap grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-start">
      <div className="space-y-4">
        {research.strands.map((s, i) => (
          <Reveal key={s.title} delay={i * 80} className="card p-7">
            <div className="flex items-center gap-4 mb-4">
              <span className="num">0{i + 1}</span>
              <h2 className="text-[20px] font-semibold tracking-tight">{s.title}</h2>
            </div>
            <p className="text-[15px] text-white/60 leading-relaxed">{s.body}</p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={120} className="lg:sticky lg:top-28">
        <ResearchPlot />
      </Reveal>
    </section>

    <section className="wrap mt-28">
      <Reveal>
        <p className="eyebrow mb-5">Academic experience</p>
        <h2 className="display text-[36px] sm:text-[52px] mb-12"><span className="dim-text">Learning how </span><span className="grad-text">research is done.</span></h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-4">
        {research.experience.map((e, i) => (
          <Reveal key={e.title} delay={i * 70} className="card card-hover p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[19px] font-semibold tracking-tight">{e.title}</h3>
                <p className="text-[14px] text-orange-200/90 mt-1">{e.org}</p>
              </div>
              <span className="font-mono text-[11.5px] text-white/40 pt-1 whitespace-nowrap">{e.period}</span>
            </div>
            <p className="text-[14.5px] text-white/60 mt-4 leading-relaxed">{e.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  </>
);

export default Research;
