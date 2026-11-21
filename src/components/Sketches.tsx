import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useInView } from "./Reveal";

const INK = "#1d1f25";
const PENCIL = "#6c6b66";
const RED = "#cf3a2b";
const BLUE = "#1f4fbf";

const len = (n: number, delay = 0) => ({ ["--len" as string]: n, ["--dd" as string]: `${delay}s` }) as CSSProperties;

/** slight hand-drawn wobble */
const Wobble = ({ id }: { id: string }) => (
  <filter id={id}>
    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3" />
    <feDisplacementMap in="SourceGraphic" scale="2.2" />
  </filter>
);

export const Figure = ({ children, caption, className = "" }: { children: ReactNode; caption: string; className?: string }) => (
  <figure className={`tape sheet p-4 sm:p-5 ${className}`}>
    {children}
    <figcaption className="mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--ink-3)] mt-3 flex justify-between gap-3">
      <span>{caption}</span>
      <span>P.V.</span>
    </figcaption>
  </figure>
);

/* ── VEX field with autonomous path ─────────────────────────────── */
const PATH = "M 50 310 C 60 220, 140 230, 150 170 S 120 70, 200 60 S 300 110, 300 190 S 240 300, 310 310";

export const FieldSketch = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now() + 1800;
    const loop = (now: number) => {
      setT(Math.max(0, ((now - start) / 7000) % 1));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 360 360" className={`w-full h-auto draw ${inView ? "in" : ""}`} role="img" aria-label="Pencil sketch of a VEX field with a robot following its autonomous path">
        <defs><Wobble id="wob-field" /></defs>
        <g filter="url(#wob-field)" fill="none" strokeLinecap="round">
          {[60, 120, 180, 240, 300].map((v) => (
            <g key={v} className="no-draw">
              <line x1={v} y1="6" x2={v} y2="354" stroke={PENCIL} strokeOpacity="0.35" strokeWidth="0.8" className="no-draw" />
              <line x1="6" y1={v} x2="354" y2={v} stroke={PENCIL} strokeOpacity="0.35" strokeWidth="0.8" className="no-draw" />
            </g>
          ))}
          <rect x="6" y="6" width="348" height="348" stroke={INK} strokeWidth="2" style={len(1400)} />
          <line x1="120" y1="180" x2="240" y2="180" stroke={INK} strokeWidth="3" style={len(120, 0.4)} />
          <path d={PATH} stroke={RED} strokeWidth="2.4" className="no-draw" opacity={inView ? 1 : 0} style={{ transition: "opacity .6s 1.2s", ["--dash" as string]: "7 6" }} />
          {[[50, 310], [150, 170], [200, 60], [300, 190], [310, 310]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" stroke={RED} strokeWidth="2" fill="#faf8f2" style={len(32, 1 + i * 0.2)} />
          ))}
        </g>
        <g fontFamily="Caveat" fontSize="20" fill={RED} opacity={inView ? 1 : 0} style={{ transition: "opacity .8s 2s" }}>
          <text x="58" y="300">start</text>
          <text x="208" y="52">waypoint 3</text>
        </g>
        <g fontFamily="IBM Plex Mono" fontSize="9" fill={PENCIL}>
          <text x="10" y="350">12 FT</text>
        </g>
      </svg>
      {/* robot */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: 360, height: 360 }}
          ref={(el) => {
            if (!el?.parentElement) return;
            el.style.transform = `scale(${el.parentElement.clientWidth / 360})`;
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
              opacity: inView && t > 0 ? 1 : 0,
              transition: "opacity .4s",
            } as CSSProperties}
          >
            <div className="w-full h-full border-2 rounded-[3px] relative" style={{ borderColor: INK, background: "#faf8f2" }}>
              <span className="absolute right-[2px] top-1/2 -translate-y-1/2 h-[10px] w-[3px]" style={{ background: RED }} />
              <span className="absolute left-[4px] top-[3px] bottom-[3px] w-px" style={{ background: INK }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── VEX VR leaderboard, hand-drawn table ───────────────────────── */
export const RankSketch = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <svg viewBox="0 0 360 220" className={`w-full h-auto draw ${inView ? "in" : ""}`} role="img" aria-label="Hand-drawn table: UK Middle and High School rank 1, world Middle School rank 11">
        <defs><Wobble id="wob-rank" /></defs>
        <g filter="url(#wob-rank)" fill="none" stroke={INK} strokeLinecap="round">
          <rect x="14" y="20" width="332" height="170" strokeWidth="1.8" style={len(1000)} />
          <line x1="14" y1="66" x2="346" y2="66" strokeWidth="1.4" style={len(340, 0.3)} />
          <line x1="14" y1="128" x2="346" y2="128" strokeWidth="1" style={len(340, 0.5)} />
          <line x1="226" y1="20" x2="226" y2="190" strokeWidth="1" style={len(180, 0.6)} />
        </g>
        <g fontFamily="IBM Plex Mono" fontSize="11" fill={PENCIL} letterSpacing="1.2">
          <text x="28" y="49">LEADERBOARD</text>
          <text x="240" y="49">RANK</text>
        </g>
        <g fontFamily="Newsreader" fontSize="19" fill={INK}>
          <text x="28" y="104">UK · MS + HS</text>
          <text x="28" y="166">World · MS</text>
        </g>
        <g fontFamily="Caveat" fill={RED} opacity={inView ? 1 : 0} style={{ transition: "opacity .6s 1.4s" }}>
          <text x="266" y="110" fontSize="40">#1</text>
          <text x="256" y="174" fontSize="40">#11</text>
        </g>
        <path d="M 250 76 C 232 90, 240 128, 286 124 C 322 120, 320 78, 282 74 C 262 72, 248 80, 252 88" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" style={len(260, 1.8)} />
        <text x="196" y="212" fontFamily="Caveat" fontSize="20" fill={RED} opacity={inView ? 1 : 0} style={{ transition: "opacity .6s 2.4s" }}>top in the UK! (2026)</text>
      </svg>
    </div>
  );
};

/* ── Greenpower car, side elevation ─────────────────────────────── */
export const CarSketch = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <svg viewBox="0 0 520 250" className={`w-full h-auto draw ${inView ? "in" : ""}`} fill="none" role="img" aria-label="Pencil side elevation of an electric race car">
        <defs><Wobble id="wob-car" /></defs>
        <g filter="url(#wob-car)" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 40 170 L 60 150 Q 120 132 200 128 L 250 96 Q 268 86 290 92 L 318 120 Q 400 124 455 140 Q 480 148 482 168 L 470 176 L 60 176 Z" style={len(1100)} />
          <path d="M 255 98 Q 262 70 286 74 Q 302 78 300 100" style={len(140, 0.5)} />
          <circle cx="282" cy="80" r="11" style={len(80, 0.7)} />
          <circle cx="112" cy="178" r="30" style={len(200, 0.4)} />
          <circle cx="112" cy="178" r="5" style={len(40, 0.9)} />
          <circle cx="410" cy="178" r="30" style={len(200, 0.5)} />
          <circle cx="410" cy="178" r="5" style={len(40, 1)} />
          <rect x="350" y="148" width="34" height="18" rx="2" stroke={PENCIL} style={len(110, 1.1)} />
          <rect x="170" y="150" width="60" height="16" rx="2" stroke={PENCIL} style={len(160, 1.2)} />
        </g>
        <g stroke={BLUE} strokeWidth="1">
          <line x1="40" y1="222" x2="482" y2="222" style={len(450, 1.3)} />
          <path d="M 40 222 l 8 -4 m -8 4 l 8 4 M 482 222 l -8 -4 m 8 4 l -8 4" style={len(40, 1.6)} />
          <line x1="40" y1="182" x2="40" y2="230" className="no-draw" opacity={inView ? 0.6 : 0} style={{ ["--dash" as string]: "3 3" }} />
          <line x1="482" y1="172" x2="482" y2="230" className="no-draw" opacity={inView ? 0.6 : 0} style={{ ["--dash" as string]: "3 3" }} />
        </g>
        <g fontFamily="IBM Plex Mono" fontSize="9" fill={PENCIL} opacity={inView ? 1 : 0} style={{ transition: "opacity 1s 2s" }}>
          <text x="178" y="146">BATTERY</text>
          <text x="350" y="142">MOTOR</text>
          <text x="226" y="240" fill={BLUE}>OVERALL LENGTH</text>
        </g>
        <g fontFamily="Caveat" fontSize="21" fill={RED} opacity={inView ? 1 : 0} style={{ transition: "opacity 1s 2.4s" }}>
          <text x="330" y="60">25th at Internationals</text>
          <path d="M 368 66 C 350 80, 330 84, 312 96" stroke={RED} strokeWidth="1.6" fill="none" className="no-draw" />
        </g>
      </svg>
    </div>
  );
};

/* ── CanSat ──────────────────────────────────────────────────────── */
export const CanSatSketch = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <svg viewBox="0 0 300 280" className={`w-full h-auto draw ${inView ? "in" : ""}`} fill="none" role="img" aria-label="Pencil sketch of a CanSat descending under a parachute">
        <defs><Wobble id="wob-can" /></defs>
        <g filter="url(#wob-can)" stroke={INK} strokeWidth="1.8" strokeLinecap="round">
          <path d="M 70 70 Q 150 -10 230 70 Q 190 58 150 70 Q 110 58 70 70 Z" style={len(500)} />
          <line x1="72" y1="72" x2="134" y2="160" stroke={PENCIL} strokeWidth="1" style={len(120, 0.6)} />
          <line x1="150" y1="70" x2="150" y2="158" stroke={PENCIL} strokeWidth="1" style={len(90, 0.7)} />
          <line x1="228" y1="72" x2="166" y2="160" stroke={PENCIL} strokeWidth="1" style={len(120, 0.8)} />
          <ellipse cx="150" cy="168" rx="26" ry="8" style={len(120, 1)} />
          <path d="M 124 168 L 124 246 Q 150 258 176 246 L 176 168" style={len(220, 1.1)} />
          <line x1="132" y1="196" x2="168" y2="196" stroke={PENCIL} strokeWidth="1" style={len(40, 1.4)} />
          <line x1="132" y1="210" x2="160" y2="210" stroke={PENCIL} strokeWidth="1" style={len(30, 1.5)} />
        </g>
        <g fontFamily="Caveat" fontSize="20" fill={RED} opacity={inView ? 1 : 0} style={{ transition: "opacity .8s 1.8s" }}>
          <text x="186" y="206">sensors +</text>
          <text x="186" y="226">telemetry</text>
          <path d="M 184 202 C 180 202, 178 203, 172 204" stroke={RED} strokeWidth="1.5" className="no-draw" />
          <text x="26" y="132">with Arm</text>
        </g>
        <text x="20" y="272" fontFamily="IBM Plex Mono" fontSize="9" fill={PENCIL}>FIG. — DESCENT CONFIGURATION</text>
      </svg>
    </div>
  );
};

/* ── Quanta wireframe ────────────────────────────────────────────── */
export const QuantaSketch = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <svg viewBox="0 0 380 260" className={`w-full h-auto draw ${inView ? "in" : ""}`} fill="none" role="img" aria-label="Wireframe sketch of the Quanta learning platform">
        <defs><Wobble id="wob-q" /></defs>
        <g filter="url(#wob-q)" stroke={INK} strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="360" height="236" rx="8" strokeWidth="1.8" style={len(1200)} />
          <line x1="10" y1="40" x2="370" y2="40" strokeWidth="1.2" style={len(360, 0.4)} />
          <rect x="24" y="56" width="86" height="174" rx="4" stroke={PENCIL} strokeWidth="1.2" style={len(520, 0.6)} />
          {[74, 94, 114, 134].map((y, i) => <line key={y} x1="34" y1={y} x2={i === 1 ? 92 : 100} y2={y} stroke={PENCIL} strokeWidth="1" style={len(70, 0.8 + i * 0.1)} />)}
          <rect x="124" y="56" width="232" height="96" rx="4" strokeWidth="1.4" style={len(660, 0.9)} />
          <path d="M 140 128 Q 170 80 200 110 T 260 96 T 336 78" stroke={BLUE} strokeWidth="1.6" style={len(260, 1.3)} />
          <rect x="124" y="164" width="110" height="66" rx="4" strokeWidth="1.4" style={len(360, 1.1)} />
          <rect x="246" y="164" width="110" height="66" rx="4" strokeWidth="1.4" style={len(360, 1.2)} />
          <line x1="136" y1="182" x2="214" y2="182" stroke={PENCIL} style={len(80, 1.5)} />
          <line x1="136" y1="196" x2="196" y2="196" stroke={PENCIL} style={len(60, 1.6)} />
          <circle cx="140" cy="214" r="5" stroke={PENCIL} style={len(32, 1.7)} />
          <circle cx="160" cy="214" r="5" stroke={RED} style={len(32, 1.8)} />
        </g>
        <g fontFamily="IBM Plex Mono" fontSize="9" fill={PENCIL}>
          <text x="22" y="29">quanta · lesson</text>
          <text x="258" y="184">AI TUTOR</text>
        </g>
        <g fontFamily="Caveat" fontSize="19" fill={RED} opacity={inView ? 1 : 0} style={{ transition: "opacity .8s 2s" }}>
          <text x="262" y="210">explain it back!</text>
          <text x="210" y="74">interactive</text>
        </g>
      </svg>
    </div>
  );
};

/* ── Research axes ───────────────────────────────────────────────── */
export const ResearchSketch = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const pts: [number, number, string?][] = [[90, 200], [140, 186, "drafting"], [220, 196], [290, 178, "simulation"], [180, 110], [260, 74, "new forms?"], [120, 96]];
  return (
    <div ref={ref}>
      <svg viewBox="0 0 380 270" className={`w-full h-auto draw ${inView ? "in" : ""}`} fill="none" role="img" aria-label="Hand-drawn axes: how much AI changes the design, against how much faster the work gets">
        <defs><Wobble id="wob-r" /></defs>
        <g filter="url(#wob-r)" stroke={INK} strokeLinecap="round">
          <path d="M 50 20 L 50 230 L 360 230" strokeWidth="1.8" style={len(560)} />
          <path d="M 44 30 L 50 18 L 56 30 M 348 224 L 362 230 L 348 236" strokeWidth="1.6" style={len(60, 0.6)} />
          <line x1="50" y1="140" x2="350" y2="140" stroke={PENCIL} strokeWidth="1" className="no-draw" opacity={inView ? 1 : 0} style={{ transition: "opacity .6s 1s", ["--dash" as string]: "4 6" }} />
        </g>
        {pts.map(([x, y, l], i) => (
          <g key={i} opacity={inView ? 1 : 0} style={{ transition: `opacity .4s ${1 + i * 0.15}s` }}>
            <path d={`M ${x - 5} ${y - 5} L ${x + 5} ${y + 5} M ${x + 5} ${y - 5} L ${x - 5} ${y + 5}`} stroke={y < 140 ? RED : INK} strokeWidth="1.8" className="no-draw" />
            {l && <text x={x + 9} y={y + 4} fontFamily="Caveat" fontSize="18" fill={y < 140 ? RED : PENCIL}>{l}</text>}
          </g>
        ))}
        <g fontFamily="IBM Plex Mono" fontSize="9.5" fill={PENCIL} letterSpacing="1">
          <text x="250" y="252">FASTER →</text>
          <text x="40" y="200" transform="rotate(-90 40 200)">DESIGN CHANGES →</text>
        </g>
        <g fontFamily="Caveat" fontSize="22" fill={RED} opacity={inView ? 1 : 0} style={{ transition: "opacity .8s 2.2s" }}>
          <text x="262" y="40">redesign?</text>
          <text x="262" y="166">or just faster?</text>
        </g>
      </svg>
    </div>
  );
};
