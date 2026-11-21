import { SheetHeader } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { Figure, ResearchSketch } from "@/components/Sketches";
import { research } from "@/data/content";

const heads = ["Aim", "H1", "H2"];

const Research = () => (
  <>
    <SheetHeader no="06 · Research" title={<>Is AI <em className="text-[var(--red)]">redesigning</em> engineering, or just making it faster?</>} note="Research Scholarship">
      {research.intro}
    </SheetHeader>

    <section className="wrap">
      <div className="margin-line grid lg:grid-cols-[1fr_440px] gap-12 items-start">
        <div className="border-t-[1.5px] border-[var(--ink)]">
          {research.strands.map((s, i) => (
            <Reveal key={s.title} delay={i * 80} className="grid sm:grid-cols-[80px_1fr] gap-x-6 gap-y-2 py-8 border-b border-[var(--rule)]">
              <span className="red-pen text-[30px] leading-none">{heads[i]}</span>
              <div>
                <h2 className="serif text-[26px] leading-tight">{s.title}</h2>
                <p className="body-copy mt-3">{s.body}</p>
              </div>
            </Reveal>
          ))}
          <p className="label mt-6 !normal-case !tracking-normal">Notes describe the question being investigated, not findings.</p>
        </div>
        <Reveal delay={120} className="lg:sticky lg:top-8">
          <Figure caption="Fig. R1 · Two possible answers" className="-rotate-[0.8deg]"><ResearchSketch /></Figure>
        </Reveal>
      </div>
    </section>

    <section className="wrap mt-24">
      <div className="margin-line">
        <Reveal><h2 className="h-display text-[40px] sm:text-[54px] mb-8">Academic experience</h2></Reveal>
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
