import { useState } from "react";
import { Trophy, Award, Medal } from "lucide-react";
import { PageHeader } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { achievements, type Achievement } from "@/data/content";

const cats = ["All", "Robotics", "Engineering", "Software", "Research", "Personal"] as const;

const Icon = ({ tier }: { tier: Achievement["tier"] }) =>
  tier === "headline" ? <Trophy className="h-4 w-4" /> : tier === "major" ? <Award className="h-4 w-4" /> : <Medal className="h-4 w-4" />;

const Achievements = () => {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const headline = achievements.filter((a) => a.tier === "headline");
  const rest = achievements.filter((a) => a.tier !== "headline" && (cat === "All" || a.category === cat));
  const headShown = headline.filter((a) => cat === "All" || a.category === cat);

  return (
    <>
      <PageHeader eyebrow="Achievements" title="Recognised on a" accent="world stage.">
        Awards from VEX Worlds, international hackathons and electric racing finals, plus the awards and qualifications behind them.
      </PageHeader>

      <section className="wrap">
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter achievements">
          {cats.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`h-9 px-4 rounded-full text-[13px] border transition-colors ${cat === c ? "bg-white text-black border-white" : "border-white/12 text-white/60 hover:text-white hover:border-white/25"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {headShown.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-4 mb-4">
            {headShown.map((a, i) => (
              <Reveal key={a.title} delay={i * 80} className="card card-hover p-7 overflow-hidden">
                <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-30 blur-3xl" style={{ background: "var(--grad)" }} aria-hidden />
                <div className="relative">
                  <div className="flex items-center justify-between mb-10">
                    <span className="grid place-items-center h-10 w-10 rounded-xl border border-orange-400/40 bg-orange-400/10 text-orange-300"><Trophy className="h-4 w-4" /></span>
                    <span className="font-mono text-[11px] text-white/40">{a.year || "Award"}</span>
                  </div>
                  <h3 className="text-[21px] font-semibold leading-tight tracking-tight">{a.title}</h3>
                  <p className="font-mono text-[11px] text-orange-300/80 mt-3 uppercase tracking-[0.12em]">{a.org}</p>
                  <p className="text-[14.5px] text-white/60 mt-4 leading-relaxed">{a.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <div className="card divide-y divide-white/[0.06]">
          {rest.map((a, i) => (
            <Reveal key={a.title} delay={i * 40} className="grid sm:grid-cols-[48px_1fr_auto] gap-x-5 gap-y-2 p-5 sm:p-6 items-start">
              <span className={`grid place-items-center h-9 w-9 rounded-xl border ${a.tier === "major" ? "border-white/15 bg-white/[0.06] text-white/80" : "border-white/10 text-white/45"}`}>
                <Icon tier={a.tier} />
              </span>
              <div>
                <h3 className="text-[16px] font-semibold tracking-tight">{a.title}</h3>
                <p className="text-[13px] text-white/40 mt-0.5">{a.org}</p>
                <p className="text-[14px] text-white/60 mt-2 leading-relaxed">{a.detail}</p>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end gap-2">
                <span className="chip !py-1 !text-[11.5px]">{a.category}</span>
                {a.year && <span className="font-mono text-[11.5px] text-white/40">{a.year}</span>}
              </div>
            </Reveal>
          ))}
          {rest.length === 0 && <p className="p-6 text-white/40 text-[14px]">The headline awards above are the ones in this category.</p>}
        </div>
      </section>
    </>
  );
};

export default Achievements;
