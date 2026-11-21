import { useEffect, useState } from "react";
import { useInView } from "./Reveal";

const frame = "relative w-full rounded-[22px] border border-white/[0.08] bg-[#0b0d12] overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]";

/* ── 01 Robotics: top-down VEX field with an autonomous path ─────────────── */
const PATH = "M 50 310 C 60 220, 140 230, 150 170 S 120 70, 200 60 S 300 110, 300 190 S 240 300, 310 310";

export const VexField = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      setT(((now - start) / 6000) % 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const heading = Math.round((t * 360 + 90) % 360);
  const err = (Math.abs(Math.sin(t * Math.PI * 6)) * 1.8).toFixed(2);

  return (
    <div ref={ref} className={frame}>
      <div className="flex items-center justify-between px-4 h-10 border-b border-white/[0.06] font-mono text-[10.5px] text-white/40">
        <span>34071B · AUTON_SKILLS</span>
        <span className="flex items-center gap-2"><span className="live-dot" /> RUNNING</span>
      </div>
      <div className="p-4 sm:p-6">
        <svg viewBox="0 0 360 360" className={`w-full h-auto draw ${inView ? "in" : ""}`} role="img" aria-label="Animated robot following an autonomous path across a VEX field">
          <defs>
            <linearGradient id="pathg" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#ffc76b" />
              <stop offset="0.5" stopColor="#ff8a3d" />
              <stop offset="1" stopColor="#ff4f7b" />
            </linearGradient>
          </defs>
          {/* tiles */}
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={c * 60} y={r * 60} width={60} height={60} fill={(r + c) % 2 ? "#10131a" : "#0d1016"} stroke="rgba(255,255,255,0.05)" style={{ strokeDasharray: "none", strokeDashoffset: 0, animation: "none" }} />
            )),
          )}
          <rect x="1" y="1" width="358" height="358" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" rx="4" style={{ ["--len" as string]: 1440 }} />
          {/* goals */}
          <line x1="120" y1="180" x2="240" y2="180" stroke="rgba(255,255,255,0.25)" strokeWidth="3" style={{ ["--len" as string]: 120, ["--dd" as string]: "0.4s" }} />
          <line x1="180" y1="120" x2="180" y2="240" stroke="rgba(255,255,255,0.12)" strokeWidth="2" style={{ ["--len" as string]: 120, ["--dd" as string]: "0.6s" }} />
          {/* path */}
          <path d={PATH} fill="none" stroke="url(#pathg)" strokeWidth="2.5" strokeLinecap="round" style={{ ["--len" as string]: 900, ["--dd" as string]: "0.3s" }} />
          {[[50, 310], [150, 170], [200, 60], [300, 190], [310, 310]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4.5" fill="#0b0d12" stroke="#ff8a3d" strokeWidth="2" style={{ ["--len" as string]: 30, ["--dd" as string]: `${0.6 + i * 0.3}s` }} />
          ))}
        </svg>
        {/* robot on the path (CSS offset-path) */}
        <div className="absolute inset-0 top-10 p-4 sm:p-6 pointer-events-none">
          <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
            <div
              className="absolute left-0 top-0 origin-top-left"
              style={{ width: 360, height: 360, transform: "scale(var(--s))", ["--s" as string]: 1 }}
              ref={(el) => {
                if (!el?.parentElement) return;
                const s = el.parentElement.clientWidth / 360;
                el.style.setProperty("--s", String(s));
              }}
            >
              <div
                style={{
                  position: "absolute",
                  offsetPath: `path("${PATH}")`,
                  offsetDistance: `${t * 100}%`,
                  offsetRotate: "auto",
                  width: 26,
                  height: 22,
                  marginLeft: 0,
                  opacity: inView ? 1 : 0,
                  transition: "opacity .6s",
                } as React.CSSProperties}
              >
                <div className="w-full h-full rounded-[5px] bg-white/90 shadow-[0_0_24px_rgba(255,138,61,0.7)] relative">
                  <span className="absolute right-[3px] top-1/2 -translate-y-1/2 h-[10px] w-[3px] rounded bg-[#ff8a3d]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 font-mono text-[10.5px]">
          {[
            ["HEADING", `${String(heading).padStart(3, "0")}°`],
            ["PID ERR", `${err}°`],
            ["PROGRESS", `${Math.round(t * 100)}%`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
              <div className="text-white/35">{k}</div>
              <div className="text-white/85 text-[12px] mt-0.5 tabular-nums">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── 02 Engineering: Greenpower car blueprint + CanSat ──────────────────── */
export const Blueprint = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={frame} style={{ background: "radial-gradient(120% 90% at 50% 0%, #0f1622 0%, #0a0d13 70%)" }}>
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(rgba(120,170,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(120,170,255,0.06) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="relative flex items-center justify-between px-4 h-10 border-b border-white/[0.06] font-mono text-[10.5px] text-white/40">
        <span>HABS POWERSTRIKE · F24+</span>
        <span>SHEET 01 / 02</span>
      </div>
      <div className="relative p-5 sm:p-7">
        <svg viewBox="0 0 520 260" className={`w-full h-auto draw ${inView ? "in" : ""}`} fill="none" role="img" aria-label="Blueprint line drawing of an electric race car and a CanSat">
          <g stroke="#cfe0ff" strokeOpacity="0.85" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {/* body */}
            <path d="M 40 170 L 60 150 Q 120 132 200 128 L 250 96 Q 268 86 290 92 L 318 120 Q 400 124 455 140 Q 480 148 482 168 L 470 176 L 60 176 Z" style={{ ["--len" as string]: 1100 }} />
            {/* cockpit / driver */}
            <path d="M 255 98 Q 262 70 286 74 Q 302 78 300 100" style={{ ["--len" as string]: 140, ["--dd" as string]: "0.5s" }} />
            <circle cx="282" cy="80" r="11" style={{ ["--len" as string]: 80, ["--dd" as string]: "0.7s" }} />
            {/* wheels */}
            <circle cx="112" cy="178" r="30" style={{ ["--len" as string]: 200, ["--dd" as string]: "0.4s" }} />
            <circle cx="112" cy="178" r="6" style={{ ["--len" as string]: 40, ["--dd" as string]: "0.9s" }} />
            <circle cx="410" cy="178" r="30" style={{ ["--len" as string]: 200, ["--dd" as string]: "0.5s" }} />
            <circle cx="410" cy="178" r="6" style={{ ["--len" as string]: 40, ["--dd" as string]: "1s" }} />
            {/* motor + battery */}
            <rect x="350" y="148" width="34" height="18" rx="3" style={{ ["--len" as string]: 110, ["--dd" as string]: "1.1s" }} />
            <rect x="170" y="150" width="60" height="16" rx="3" style={{ ["--len" as string]: 160, ["--dd" as string]: "1.2s" }} />
          </g>
          {/* dimension line */}
          <g stroke="#ff8a3d" strokeWidth="1" strokeOpacity="0.9">
            <line x1="40" y1="226" x2="482" y2="226" style={{ ["--len" as string]: 450, ["--dd" as string]: "1.3s" }} />
            <line x1="40" y1="218" x2="40" y2="234" style={{ ["--len" as string]: 20, ["--dd" as string]: "1.3s" }} />
            <line x1="482" y1="218" x2="482" y2="234" style={{ ["--len" as string]: 20, ["--dd" as string]: "1.3s" }} />
          </g>
          <text x="261" y="248" fill="#ff8a3d" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" opacity={inView ? 1 : 0} style={{ transition: "opacity 1s 2s" }}>
            FIG.01 · SIDE ELEVATION
          </text>
          <g fontFamily="JetBrains Mono" fontSize="9" fill="#cfe0ff" fillOpacity="0.55" opacity={inView ? 1 : 0} style={{ transition: "opacity 1s 2.2s" }}>
            <text x="200" y="146">BATTERY</text>
            <text x="350" y="142">MOTOR</text>
          </g>
        </svg>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
            <div className="font-mono text-[10px] text-white/35">INTERNATIONAL FINALS</div>
            <div className="text-[22px] font-semibold mt-1" style={{ fontFamily: "var(--display)" }}>25th</div>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 flex items-center gap-3">
            <svg viewBox="0 0 40 60" className="h-12 w-8 shrink-0" fill="none" stroke="#cfe0ff" strokeOpacity="0.8" strokeWidth="1.4" aria-hidden>
              <ellipse cx="20" cy="8" rx="14" ry="4" />
              <path d="M 6 8 L 6 50 Q 20 58 34 50 L 34 8" />
              <line x1="20" y1="4" x2="20" y2="-6" />
            </svg>
            <div>
              <div className="font-mono text-[10px] text-white/35">CANSAT · PARTNER</div>
              <div className="text-[22px] font-semibold mt-1" style={{ fontFamily: "var(--display)" }}>Arm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── 03 Software: code window that types itself ─────────────────────────── */
const CODE: [string, string][][] = [
  [["c", "// quanta/lesson.ts"]],
  [["k", "import"], ["t", " { quanta } "], ["k", "from"], ["s", ' "@quanta/core"'], ["t", ";"]],
  [],
  [["k", "const"], ["t", " lesson = "], ["k", "await"], ["f", " quanta.build"], ["t", "({"]],
  [["t", "  topic: "], ["s", '"Newton\'s second law"'], ["t", ","]],
  [["t", "  level: "], ["s", '"GCSE"'], ["t", ","]],
  [["t", "  mode: "], ["s", '"interactive"'], ["t", ","]],
  [["t", "});"]],
  [],
  [["t", "lesson."], ["f", "checkpoint"], ["t", "(q => q."], ["f", "explain"], ["t", "("], ["s", '"F = ma"'], ["t", "));"]],
  [["t", "lesson."], ["f", "publish"], ["t", "();  "], ["c", "// live, worldwide"]],
];
const colors: Record<string, string> = { c: "#5f6470", k: "#ff7aa8", t: "#d7d9de", s: "#ffc76b", f: "#7fd4ff" };

export const CodeWindow = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const total = CODE.reduce((n, l) => n + l.reduce((m, [, s]) => m + s.length, 0) + 1, 0);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (n >= total) return;
    const id = setTimeout(() => setN((v) => v + 2), 22);
    return () => clearTimeout(id);
  }, [inView, n, total]);

  let budget = n;
  return (
    <div ref={ref} className={frame}>
      <div className="flex items-center gap-2 px-4 h-10 border-b border-white/[0.06]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[10.5px] text-white/40">lesson.ts · quanta</span>
      </div>
      <pre className="font-mono text-[12px] sm:text-[13px] leading-[1.85] p-5 sm:p-6 min-h-[330px] overflow-x-auto">
        {CODE.map((line, i) => {
          const parts = line.map(([k, s], j) => {
            const take = Math.max(0, Math.min(s.length, budget));
            budget -= take;
            return take ? <span key={j} style={{ color: colors[k] }}>{s.slice(0, take)}</span> : null;
          });
          budget -= 1;
          const active = budget < 0 && budget >= -1 - line.reduce((m, [, s]) => m + s.length, 0);
          return (
            <div key={i} className={`flex ${active ? "bg-white/[0.035] -mx-6 px-6" : ""}`}>
              <span className="w-7 shrink-0 text-white/20 select-none">{i + 1}</span>
              <span>
                {parts}
                {active && n < total && <span className="caret inline-block w-[7px] h-[15px] align-[-2px] bg-[#ff8a3d] ml-[1px]" />}
              </span>
            </div>
          );
        })}
      </pre>
      <div className="flex items-center justify-between px-5 h-9 border-t border-white/[0.06] font-mono text-[10.5px] text-white/35">
        <span>TypeScript · React</span>
        <span className={n >= total ? "text-emerald-400/80" : ""}>{n >= total ? "✓ published" : "building…"}</span>
      </div>
    </div>
  );
};

/* ── 04 Research: "redesign vs faster" plot ─────────────────────────────── */
const dots = [
  { x: 0.18, y: 0.2, l: "" },
  { x: 0.32, y: 0.28, l: "" },
  { x: 0.55, y: 0.24, l: "drafting" },
  { x: 0.7, y: 0.32, l: "" },
  { x: 0.82, y: 0.22, l: "simulation" },
  { x: 0.4, y: 0.6, l: "" },
  { x: 0.62, y: 0.72, l: "generative form" },
  { x: 0.78, y: 0.82, l: "" },
  { x: 0.25, y: 0.75, l: "" },
];

export const ResearchPlot = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const W = 420, H = 320, P = 44;
  return (
    <div ref={ref} className={frame}>
      <div className="flex items-center justify-between px-4 h-10 border-b border-white/[0.06] font-mono text-[10.5px] text-white/40">
        <span>RESEARCH · AI × ENGINEERING</span>
        <span>CONCEPT MODEL</span>
      </div>
      <div className="p-4 sm:p-6">
        <svg viewBox={`0 0 ${W} ${H}`} className={`w-full h-auto draw ${inView ? "in" : ""}`} role="img" aria-label="Concept plot: change to the design process against speed of the process">
          <rect x={P + (W - P - 12) / 2} y={12} width={(W - P - 12) / 2} height={(H - P - 12) / 2} fill="rgba(255,138,61,0.07)" style={{ strokeDasharray: "none", strokeDashoffset: 0, animation: "none" }} />
          <line x1={P} y1={H - P} x2={W - 12} y2={H - P} stroke="rgba(255,255,255,0.3)" style={{ ["--len" as string]: 400 }} />
          <line x1={P} y1={H - P} x2={P} y2={12} stroke="rgba(255,255,255,0.3)" style={{ ["--len" as string]: 300 }} />
          <line x1={P + (W - P - 12) / 2} y1={12} x2={P + (W - P - 12) / 2} y2={H - P} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 5" style={{ strokeDashoffset: 0, animation: "none" }} />
          <line x1={P} y1={12 + (H - P - 12) / 2} x2={W - 12} y2={12 + (H - P - 12) / 2} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 5" style={{ strokeDashoffset: 0, animation: "none" }} />
          <text x={W - 14} y={H - P + 22} fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="JetBrains Mono" textAnchor="end">FASTER →</text>
          <text x={P - 14} y={16} fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="JetBrains Mono" textAnchor="end" transform={`rotate(-90 ${P - 14} 16)`}>REDESIGNED →</text>
          <text x={W - 20} y={30} fill="#ff8a3d" fontSize="11" fontFamily="JetBrains Mono" textAnchor="end">redesign?</text>
          <text x={W - 20} y={H - P - 12} fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="end">just faster?</text>
          {dots.map((d, i) => {
            const cx = P + d.x * (W - P - 12);
            const cy = H - P - d.y * (H - P - 12);
            const hot = d.y > 0.5;
            return (
              <g key={i} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(8px)", transition: `all .6s ${0.8 + i * 0.12}s` }}>
                <circle cx={cx} cy={cy} r={hot ? 6 : 4.5} fill={hot ? "#ff8a3d" : "rgba(255,255,255,0.55)"} style={{ strokeDasharray: "none", strokeDashoffset: 0, animation: "none" }} />
                {d.l && <text x={cx + 10} y={cy + 4} fontSize="10" fontFamily="JetBrains Mono" fill={hot ? "#ffb98a" : "rgba(255,255,255,0.5)"}>{d.l}</text>}
              </g>
            );
          })}
        </svg>
        <p className="font-mono text-[10.5px] text-white/35 mt-3">Illustrative framing of the research question, not results.</p>
      </div>
    </div>
  );
};
