import { useState } from "react";
import { SheetHeader } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { achievements } from "@/data/content";

const cats = ["All", "Robotics", "Engineering", "Software", "Research", "Personal"] as const;

const Achievements = () => {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = achievements.filter((a) => cat === "All" || a.category === cat);

  return (
    <>
      <SheetHeader no="03 · Results" title="Results table" note="all checked ✓">
        Every award, ranking and qualification so far, from VEX Worlds and international hackathons to the certificates behind them.
      </SheetHeader>

      <section className="wrap">
        <div className="margin-line">
          <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filter results">
            {cats.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`mono text-[12px] h-9 px-3.5 rounded-[3px] border-[1.5px] transition-colors ${cat === c ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "border-[var(--rule)] text-[var(--ink-2)] hover:border-[var(--ink)] bg-white/40"}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="sheet">
            <div className="hidden md:grid grid-cols-[70px_1fr_220px_110px_44px] gap-4 px-5 py-3 border-b-[1.5px] border-[var(--ink)]">
              {["Year", "Result", "Awarded by", "Area", "✓"].map((h) => <span key={h} className="label !text-[10px]">{h}</span>)}
            </div>
            <ol>
              {list.map((a, i) => (
                <Reveal as="li" key={a.title} delay={Math.min(i * 40, 300)} className="grid grid-cols-[1fr_auto] md:grid-cols-[70px_1fr_220px_110px_44px] gap-x-4 gap-y-1 px-5 py-5 border-b border-[var(--rule)] last:border-0 items-start">
                  <span className="mono text-[12.5px] text-[var(--ink-3)] md:pt-1 order-2 md:order-none text-right md:text-left">{a.year || "—"}</span>
                  <div className="order-1 md:order-none">
                    <h3 className={`serif leading-snug ${a.tier === "headline" ? "text-[22px]" : "text-[19px]"}`}>
                      {a.tier === "headline" ? <span className="underline decoration-wavy decoration-[var(--red)] decoration-[1.5px] underline-offset-[6px]">{a.title}</span> : a.title}
                    </h3>
                    <p className="text-[14px] text-[var(--ink-2)] mt-1.5 leading-relaxed max-w-[560px]">{a.detail}</p>
                  </div>
                  <span className="text-[13px] text-[var(--ink-2)] md:pt-1 col-span-2 md:col-span-1 order-3 md:order-none">{a.org}</span>
                  <span className="mono text-[11.5px] text-[var(--ink-3)] md:pt-1.5 order-4 md:order-none">{a.category}</span>
                  <span className="hand text-[26px] leading-none text-[var(--red)] hidden md:block">✓</span>
                </Reveal>
              ))}
            </ol>
          </div>
          <p className="red-pen mt-6 -rotate-1">wavy = headline results</p>
        </div>
      </section>
    </>
  );
};

export default Achievements;
