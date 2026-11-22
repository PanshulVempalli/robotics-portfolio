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

/* ── VEX Push Back field with a skills-style route ──────────────── */
// 12 ft field drawn at 2.4167 px per inch, centre (180,180)
const ROUTE: [number, number][] = [
  [30, 180], [96, 150], [122, 122], [26, 64], [110, 64], [110, 96], [250, 96], [334, 64], [250, 64],
  [204, 158], [238, 238], [334, 296], [250, 296], [250, 264], [110, 264], [26, 296], [110, 296], [62, 236], [30, 180],
];
const PATH = "M " + ROUTE.map(([x, y]) => `${x} ${y}`).join(" L ");

const blockSet = (cx: number, cy: number, c: string) =>
  [[-6, -6], [6, -6], [-6, 6], [6, 6]].map(([dx, dy], i) => (
    <rect key={`${cx}-${cy}-${i}`} x={cx + dx - 4} y={cy + dy - 4} width="8" height="8" rx="1.5" fill={i % 2 ? c : "none"} stroke={c} strokeWidth="1.3" className="no-draw" />
  ));

export const FieldSketch = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now() + 1600;
    const loop = (now: number) => {
      setT(Math.max(0, ((now - start) / 12000) % 1));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView]);
  const secs = Math.round(t * 60);

  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 360 360" className={`w-full h-auto draw ${inView ? "in" : ""}`} role="img" aria-label="Pencil sketch of the VEX Push Back field with a robot driving a skills route between match loaders, long goals and centre goals">
        <defs><Wobble id="wob-field" /></defs>
        <g filter="url(#wob-field)" fill="none" strokeLinecap="round">
          {[64, 122, 180, 238, 296].map((v) => (
            <g key={v}>
              <line x1={v} y1="6" x2={v} y2="354" stroke={PENCIL} strokeOpacity="0.28" strokeWidth="0.8" className="no-draw" />
              <line x1="6" y1={v} x2="354" y2={v} stroke={PENCIL} strokeOpacity="0.28" strokeWidth="0.8" className="no-draw" />
            </g>
          ))}
          <rect x="6" y="6" width="348" height="348" stroke={INK} strokeWidth="2" style={len(1400)} />
          {/* park zones */}
          <rect x="6" y="152" width="34" height="56" stroke={RED} strokeWidth="1.4" fill="rgba(207,58,43,0.07)" style={len(190, 0.3)} />
          <rect x="320" y="152" width="34" height="56" stroke={BLUE} strokeWidth="1.4" fill="rgba(31,79,191,0.07)" style={len(190, 0.3)} />
          {/* long goals */}
          <rect x="122" y="59" width="116" height="10" rx="5" stroke={INK} strokeWidth="2" style={len(260, 0.5)} />
          <rect x="122" y="291" width="116" height="10" rx="5" stroke={INK} strokeWidth="2" style={len(260, 0.6)} />
          {/* centre goals (X) */}
          <line x1="161" y1="161" x2="199" y2="199" stroke={INK} strokeWidth="5" style={len(60, 0.8)} />
          <line x1="199" y1="161" x2="161" y2="199" stroke={INK} strokeWidth="3" style={len(60, 0.9)} />
          {/* match loaders */}
          {[[6, 64], [6, 296], [354, 64], [354, 296]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="9" stroke={INK} strokeWidth="1.8" fill="#faf8f2" style={len(60, 1 + i * 0.1)} />
          ))}
        </g>
        <g opacity={inView ? 1 : 0} style={{ transition: "opacity .6s 1.1s" }}>
          {blockSet(122, 122, RED)}
          {blockSet(238, 122, BLUE)}
          {blockSet(122, 238, RED)}
          {blockSet(238, 238, BLUE)}
        </g>
        <path d={PATH} fill="none" stroke={RED} strokeWidth="2" strokeLinejoin="round" className="no-draw" opacity={inView ? 0.85 : 0} style={{ transition: "opacity .6s 1.3s", ["--dash" as string]: "6 5" }} />
        <g fontFamily="IBM Plex Mono" fontSize="8.5" fill={PENCIL} letterSpacing="0.6" opacity={inView ? 1 : 0} style={{ transition: "opacity .8s 1.6s" }}>
          <text x="140" y="52">LONG GOAL</text>
          <text x="140" y="318">LONG GOAL</text>
          <text x="210" y="184">CENTRE GOALS</text>
          <text x="18" y="88">LOADER</text>
          <text x="306" y="88">LOADER</text>
          <text x="10" y="222">PARK</text>
          <text x="326" y="222">PARK</text>
          <text x="10" y="350">12 FT · PUSH BACK</text>
        </g>
        <g fontFamily="Caveat" fontSize="19" fill={RED} opacity={inView ? 1 : 0} style={{ transition: "opacity .8s 2s" }}>
          <text x="44" y="176">start</text>
          <text x="44" y="200">+ park</text>
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
              width: 24,
              height: 22,
              opacity: inView && t > 0 ? 1 : 0,
              transition: "opacity .4s",
            } as CSSProperties}
          >
            <div className="w-full h-full border-2 rounded-[3px] relative" style={{ borderColor: INK, background: "#faf8f2" }}>
              <span className="absolute right-[2px] top-1/2 -translate-y-1/2 h-[12px] w-[3px]" style={{ background: RED }} />
              <span className="absolute left-[4px] top-[3px] bottom-[3px] w-px" style={{ background: INK }} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mono text-[10.5px] text-[var(--ink-3)] mt-2 px-1">
        <span>SKILLS RUN</span>
        <span className="tabular-nums">0:{String(secs).padStart(2, "0")} / 1:00</span>
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

/* ── Goodwood Motor Circuit, traced from the track map ─────────── */
const GOODWOOD = "M 158.7 365.4 L 148.1 366.3 L 137.5 367.2 L 126.9 367.9 L 116.4 369.0 L 105.8 370.4 L 95.3 371.8 L 84.7 372.7 L 74.1 372.4 L 63.8 369.7 L 53.7 366.7 L 44.5 361.4 L 37.1 353.9 L 31.6 344.8 L 27.6 335.0 L 25.2 324.7 L 23.8 314.2 L 25.1 303.7 L 27.9 293.5 L 30.8 283.2 L 33.7 273.0 L 36.7 262.8 L 39.7 252.7 L 42.9 242.5 L 46.3 232.5 L 49.5 222.4 L 52.5 212.2 L 55.1 201.9 L 57.6 191.5 L 60.4 181.3 L 63.5 171.2 L 68.4 161.8 L 74.3 152.9 L 81.4 145.0 L 89.4 138.1 L 97.8 131.5 L 106.2 125.1 L 114.7 118.7 L 123.2 112.4 L 131.9 106.2 L 140.6 100.2 L 149.4 94.3 L 158.8 89.3 L 168.4 84.9 L 178.3 80.9 L 188.3 77.6 L 198.6 74.6 L 208.8 71.9 L 219.3 72.9 L 229.5 75.9 L 239.6 79.1 L 249.5 82.8 L 259.2 87.3 L 268.9 91.2 L 279.4 90.2 L 289.4 86.8 L 298.5 81.3 L 306.2 74.1 L 312.6 65.6 L 319.4 57.4 L 326.5 49.6 L 334.5 42.7 L 343.2 36.6 L 351.9 30.5 L 360.8 24.6 L 370.0 19.5 L 380.4 18.3 L 389.8 23.1 L 397.0 30.9 L 402.8 39.8 L 408.1 49.0 L 410.0 59.3 L 409.4 69.9 L 406.4 80.1 L 402.9 90.1 L 399.3 100.1 L 395.8 110.1 L 392.3 120.1 L 388.9 130.2 L 385.4 140.2 L 381.9 150.3 L 378.5 160.3 L 375.0 170.3 L 373.1 180.7 L 372.3 191.3 L 371.8 201.9 L 371.2 212.5 L 370.4 223.1 L 369.6 233.7 L 368.3 244.2 L 366.8 254.8 L 365.4 265.3 L 363.9 275.8 L 362.6 286.3 L 362.2 296.9 L 362.5 307.5 L 362.1 318.1 L 360.0 328.5 L 357.6 338.9 L 355.3 349.2 L 352.6 359.5 L 349.7 369.7 L 342.0 377.0 L 333.8 383.7 L 324.3 387.9 L 313.9 385.9 L 303.6 383.2 L 293.5 380.0 L 283.5 376.3 L 273.6 372.6 L 263.6 369.0 L 253.7 365.2 L 243.2 363.2 L 232.7 362.5 L 222.1 361.5 L 211.5 360.7 L 200.9 361.1 L 190.3 362.2 L 179.8 363.4 L 169.2 364.6 L 158.7 365.4 Z";

export const GoodwoodSketch = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now() + 2200;
    const loop = (now: number) => {
      setT(Math.max(0, ((now - start) / 9000) % 1));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 430 400" className={`w-full h-auto draw ${inView ? "in" : ""}`} fill="none" role="img" aria-label="Pencil map of Goodwood Motor Circuit, venue of the Greenpower International Final, with a car lapping it">
        <defs><Wobble id="wob-gw" /></defs>
        <g filter="url(#wob-gw)">
          <path d={GOODWOOD} stroke={INK} strokeWidth="7" strokeLinejoin="round" style={len(1350)} />
          <path d={GOODWOOD} stroke="#faf8f2" strokeWidth="3.2" strokeLinejoin="round" className="no-draw" opacity={inView ? 1 : 0} style={{ transition: "opacity .6s 2s" }} />
        </g>
        {/* start / finish */}
        <g opacity={inView ? 1 : 0} style={{ transition: "opacity .5s 2.2s" }}>
          {[0, 1, 2, 3].map((r) => [0, 1].map((c) => (
            <rect key={`${r}${c}`} x={155 + c * 4} y={357 + r * 4} width="4" height="4" fill={(r + c) % 2 ? "#faf8f2" : INK} className="no-draw" />
          )))}
        </g>
        <g fontFamily="IBM Plex Mono" fontSize="9" fill={PENCIL} letterSpacing="0.8" opacity={inView ? 1 : 0} style={{ transition: "opacity .8s 1.6s" }}>
          <text x="46" y="322">MADGWICK</text>
          <text x="6" y="116">FORDWATER</text>
          <text x="206" y="80">ST MARY'S</text>
          <text x="232" y="16">LAVANT</text>
          <text x="398" y="230" transform="rotate(90 398 230)">LAVANT STRAIGHT</text>
          <text x="300" y="338">WOODCOTE</text>
          <text x="198" y="320">CHICANE</text>
          <text x="128" y="392">START / FINISH</text>
        </g>
        <g fontFamily="IBM Plex Mono" fontSize="9" fill={BLUE} opacity={inView ? 1 : 0} style={{ transition: "opacity .8s 2s" }}>
          <text x="150" y="214">3.81 km · 2.37 mi</text>
          <path d="M 150 228 L 192 228 M 186 224 L 192 228 L 186 232" stroke={BLUE} strokeWidth="1" className="no-draw" />
          <text x="198" y="231">N</text>
        </g>
        <g fontFamily="Caveat" fill={RED} opacity={inView ? 1 : 0} style={{ transition: "opacity 1s 2.4s" }}>
          <text x="110" y="168" fontSize="23">Greenpower Internationals</text>
          <text x="140" y="190" fontSize="23">finished 25th!</text>
        </g>
      </svg>
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: 430, height: 400 }}
          ref={(el) => {
            if (!el?.parentElement) return;
            el.style.transform = `scale(${el.parentElement.clientWidth / 430})`;
          }}
        >
          <div
            style={{
              position: "absolute",
              offsetPath: `path("${GOODWOOD}")`,
              offsetDistance: `${t * 100}%`,
              offsetRotate: "auto",
              width: 16,
              height: 9,
              opacity: inView && t > 0 ? 1 : 0,
              transition: "opacity .4s",
            } as CSSProperties}
          >
            <div className="w-full h-full rounded-[3px]" style={{ background: RED, boxShadow: "0 0 0 1.5px #faf8f2" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── CanSat: PH8SED tie-rod cassette, cutaway ─────────────────── */
// 2 px per mm: Ø65.4 mm → 131 px, 114 mm → 228 px
export const CanSatSketch = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const L = 70, R = 201, B = 350, T = 122; // can body
  const mm = (v: number) => B - v * 2;
  const bays: [number, number, string, string][] = [
    [0, 24, "Bay 1", "18650 cell · charger"],
    [28, 58, "Bay 2", "ESP32-S3 · LoRa · BME280"],
    [62, 94, "Bay 3", "CO · SO₂ · O₃ sensors"],
    [98, 110, "Bay 4", "GPS · switch"],
  ];
  return (
    <div ref={ref}>
      <svg viewBox="0 0 380 380" className={`w-full h-auto draw ${inView ? "in" : ""}`} fill="none" role="img" aria-label="Cutaway sketch of the PH8SED CanSat: four internal bays, tie rods, lid and parachute zone">
        <defs><Wobble id="wob-can" /></defs>
        <g filter="url(#wob-can)" stroke={INK} strokeLinecap="round">
          {/* canopy */}
          <path d="M 86 34 Q 136 -4 186 34 Q 161 28 136 34 Q 111 28 86 34 Z" strokeWidth="1.6" style={len(300)} />
          <line x1="88" y1="36" x2="128" y2="96" stroke={PENCIL} strokeWidth="0.9" style={len(80, 0.5)} />
          <line x1="136" y1="34" x2="136" y2="96" stroke={PENCIL} strokeWidth="0.9" style={len(70, 0.55)} />
          <line x1="184" y1="36" x2="144" y2="96" stroke={PENCIL} strokeWidth="0.9" style={len(80, 0.6)} />
          {/* parachute zone (dashed) */}
          <rect x={L + 10} y="96" width={R - L - 20} height="26" stroke={PENCIL} strokeWidth="1" className="no-draw" opacity={inView ? 1 : 0} style={{ ["--dash" as string]: "4 4", transition: "opacity .6s .8s" }} />
          {/* body */}
          <rect x={L} y={T} width={R - L} height={B - T} rx="4" strokeWidth="2" style={len(740, 0.2)} />
          {/* tie rods */}
          {[L + 14, R - 14].map((x, i) => <line key={x} x1={x} y1={T + 4} x2={x} y2={B - 4} stroke={PENCIL} strokeWidth="1.2" style={len(230, 0.7 + i * 0.1)} />)}
          {/* decks */}
          {[24, 28, 58, 62, 94, 98].map((v, i) => (
            <line key={v} x1={L + 4} y1={mm(v)} x2={R - 4} y2={mm(v)} strokeWidth={i % 2 ? 1 : 1.6} style={len(130, 1 + i * 0.08)} />
          ))}
          {/* component blocks */}
          <rect x="92" y={mm(20)} width="86" height="30" rx="4" stroke={PENCIL} style={len(240, 1.4)} />
          <rect x="88" y={mm(52)} width="44" height="40" rx="2" stroke={PENCIL} style={len(170, 1.5)} />
          <rect x="138" y={mm(50)} width="40" height="22" rx="2" stroke={PENCIL} style={len(130, 1.55)} />
          <rect x="90" y={mm(90)} width="28" height="50" rx="2" stroke={PENCIL} style={len(160, 1.6)} />
          <rect x="122" y={mm(90)} width="26" height="50" rx="2" stroke={PENCIL} style={len(160, 1.65)} />
          <rect x="152" y={mm(90)} width="26" height="50" rx="2" stroke={PENCIL} style={len(160, 1.7)} />
          {/* vent slots */}
          {[0, 1, 2].map((i) => <line key={i} x1={L} y1={mm(70 + i * 7)} x2={L} y2={mm(74 + i * 7)} stroke="#faf8f2" strokeWidth="3" className="no-draw" />)}
        </g>
        {/* bay labels */}
        <g opacity={inView ? 1 : 0} style={{ transition: "opacity .8s 1.8s" }}>
          {bays.map(([a, b, n, label]) => {
            const y = (mm(a) + mm(b)) / 2;
            return (
              <g key={n}>
                <path d={`M ${R + 4} ${y} L ${R + 22} ${y}`} stroke={PENCIL} strokeWidth="0.9" className="no-draw" />
                <text x={R + 26} y={y - 2} fontFamily="IBM Plex Mono" fontSize="9" fill={INK} letterSpacing="0.6">{n.toUpperCase()}</text>
                <text x={R + 26} y={y + 10} fontFamily="IBM Plex Sans" fontSize="9.5" fill={PENCIL}>{label}</text>
              </g>
            );
          })}
        </g>
        {/* dimensions */}
        <g stroke={BLUE} strokeWidth="1" opacity={inView ? 1 : 0} style={{ transition: "opacity .8s 2s" }}>
          <path d={`M 44 ${T} L 44 ${B} M 40 ${T + 8} L 44 ${T} L 48 ${T + 8} M 40 ${B - 8} L 44 ${B} L 48 ${B - 8}`} className="no-draw" />
          <path d={`M ${L} 366 L ${R} 366 M ${L + 8} 362 L ${L} 366 L ${L + 8} 370 M ${R - 8} 362 L ${R} 366 L ${R - 8} 370`} className="no-draw" />
        </g>
        <g fontFamily="IBM Plex Mono" fontSize="9.5" fill={BLUE} opacity={inView ? 1 : 0} style={{ transition: "opacity .8s 2s" }}>
          <text x="38" y="250" transform="rotate(-90 38 250)" textAnchor="middle">114.0 mm</text>
          <text x="136" y="378" textAnchor="middle">Ø 65.4 mm</text>
        </g>
        <g fontFamily="Caveat" fill={RED} opacity={inView ? 1 : 0} style={{ transition: "opacity .8s 2.4s" }}>
          <text x="204" y="44" fontSize="21">380 mm cross canopy</text>
          <text x="204" y="64" fontSize="21">≈ 10.5 m/s descent</text>
          <text x="214" y="112" fontSize="19">343 g total</text>
        </g>
      </svg>
    </div>
  );
};

/* ── Warren truss, Truss-Solver style ─────────────────────────────── */
export const TrussSketch = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const bx = [40, 120, 200, 280, 360];
  const tx = [80, 160, 240, 320];
  const yb = 170, yt = 90;
  const diag: [number, number, number, number, "C" | "T"][] = [
    [40, yb, 80, yt, "C"], [80, yt, 120, yb, "T"], [120, yb, 160, yt, "C"], [160, yt, 200, yb, "T"],
    [200, yb, 240, yt, "T"], [240, yt, 280, yb, "C"], [280, yb, 320, yt, "T"], [320, yt, 360, yb, "C"],
  ];
  const col = (k: "C" | "T") => (k === "C" ? RED : BLUE);
  return (
    <div ref={ref}>
      <svg viewBox="0 0 400 250" className={`w-full h-auto draw ${inView ? "in" : ""}`} fill="none" role="img" aria-label="Warren truss footbridge: blue members in tension, red members in compression">
        <defs><Wobble id="wob-truss" /></defs>
        <g filter="url(#wob-truss)" strokeLinecap="round" strokeWidth="3">
          <line x1="40" y1={yb} x2="360" y2={yb} stroke={BLUE} style={len(330, 0.2)} />
          <line x1="80" y1={yt} x2="320" y2={yt} stroke={RED} style={len(250, 0.4)} />
          {diag.map(([x1, y1, x2, y2, k], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={col(k)} style={len(100, 0.6 + i * 0.12)} />
          ))}
        </g>
        <g fill="#faf8f2" stroke={INK} strokeWidth="1.6">
          {[...bx.map((x) => [x, yb]), ...tx.map((x) => [x, yt])].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" className="no-draw" />)}
        </g>
        <g stroke={INK} strokeWidth="1.6" fill="none">
          <path d="M 40 174 L 30 192 L 50 192 Z M 360 174 L 350 192 L 370 192 Z" style={len(70, 0.2)} />
          <path d="M 342 198 L 378 198" style={len(40, 0.3)} />
        </g>
        <g stroke={PENCIL} strokeWidth="1.2" opacity={inView ? 1 : 0} style={{ transition: "opacity .6s 1.8s" }}>
          {[120, 200, 280].map((x) => <path key={x} d={`M ${x} 180 L ${x} 216 M ${x - 5} 210 L ${x} 216 L ${x + 5} 210`} className="no-draw" />)}
        </g>
        <g stroke={BLUE} strokeWidth="1" opacity={inView ? 1 : 0} style={{ transition: "opacity .6s 2s" }}>
          <path d="M 40 60 L 360 60 M 48 56 L 40 60 L 48 64 M 352 56 L 360 60 L 352 64" className="no-draw" />
        </g>
        <text x="200" y="54" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fill={BLUE} opacity={inView ? 1 : 0}>8 m WARREN FOOTBRIDGE</text>
        <g fontFamily="IBM Plex Mono" fontSize="9.5" opacity={inView ? 1 : 0} style={{ transition: "opacity .6s 2.2s" }}>
          <rect x="40" y="236" width="10" height="3" fill={BLUE} className="no-draw" /><text x="56" y="240" fill={PENCIL}>TENSION</text>
          <rect x="130" y="236" width="10" height="3" fill={RED} className="no-draw" /><text x="146" y="240" fill={PENCIL}>COMPRESSION</text>
        </g>
        <text x="232" y="244" fontFamily="Caveat" fontSize="18" fill={RED} opacity={inView ? 1 : 0} style={{ transition: "opacity .6s 2.4s" }}>matches hand calc to 1e-6</text>
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

/* ── Hackathon log card ───────────────────────────────────────────── */
export const HackSketch = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const rows: [string, string, string][] = [
    ["Veritas AI", "Country risk", "High Honors"],
    ["Kiroween '26", "GopherGhost", "shipped"],
    ["STEMergent '26", "PlateWise", "shipped"],
    ["Devpost", "Prof. Reverse", "shipped"],
  ];
  return (
    <div ref={ref}>
      <svg viewBox="0 0 360 230" className={`w-full h-auto draw ${inView ? "in" : ""}`} role="img" aria-label="Hand-drawn log of four hackathon entries">
        <defs><Wobble id="wob-hack" /></defs>
        <g filter="url(#wob-hack)" fill="none" stroke={INK} strokeLinecap="round">
          <rect x="10" y="10" width="340" height="208" strokeWidth="1.8" style={len(1100)} />
          <line x1="10" y1="46" x2="350" y2="46" strokeWidth="1.4" style={len(340, 0.3)} />
          {[86, 126, 166].map((y, i) => <line key={y} x1="10" y1={y} x2="350" y2={y} strokeWidth="0.9" stroke={PENCIL} style={len(340, 0.4 + i * 0.1)} />)}
          <line x1="128" y1="10" x2="128" y2="218" strokeWidth="0.9" style={len(210, 0.6)} />
          <line x1="250" y1="10" x2="250" y2="218" strokeWidth="0.9" style={len(210, 0.7)} />
        </g>
        <g fontFamily="IBM Plex Mono" fontSize="9.5" fill={PENCIL} letterSpacing="1">
          <text x="22" y="33">EVENT</text><text x="140" y="33">BUILD</text><text x="262" y="33">RESULT</text>
        </g>
        {rows.map(([e, b, r], i) => (
          <g key={e} opacity={inView ? 1 : 0} style={{ transition: `opacity .4s ${1 + i * 0.25}s` }}>
            <text x="22" y={72 + i * 40} fontFamily="Newsreader" fontSize="15" fill={INK}>{e}</text>
            <text x="140" y={72 + i * 40} fontFamily="Newsreader" fontSize="15" fill={INK}>{b}</text>
            <text x="262" y={73 + i * 40} fontFamily="Caveat" fontSize={i === 0 ? 22 : 20} fill={i === 0 ? RED : BLUE}>{r}{i === 0 ? " ★" : " ✓"}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ── Chennai → London, 2005 ─────────────────────────────────────── */
const JOURNEY = "M 330 196 C 300 110, 200 52, 62 62";

export const JourneySketch = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now() + 900;
    const loop = (now: number) => {
      const f = Math.max(0, Math.min(1, (now - start) / 4200));
      setT(1 - (1 - f) ** 3);
      if (f < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 380 240" className={`w-full h-auto draw ${inView ? "in" : ""}`} fill="none" role="img" aria-label="Sketch of the journey from Chennai to London in 2005">
        <defs><Wobble id="wob-journey" /></defs>
        {/* faint latitude lines */}
        {[40, 90, 140, 190].map((y) => <line key={y} x1="10" y1={y} x2="370" y2={y} stroke={PENCIL} strokeOpacity="0.18" strokeDasharray="2 6" className="no-draw" style={{ ["--dash" as string]: "2 6" }} />)}
        <g filter="url(#wob-journey)" strokeLinecap="round">
          <path d={JOURNEY} stroke={RED} strokeWidth="2" style={len(360, 0.3)} />
          <circle cx="330" cy="196" r="6" stroke={INK} strokeWidth="2" fill="#faf8f2" style={len(40)} />
          <circle cx="62" cy="62" r="6" stroke={INK} strokeWidth="2" fill="#faf8f2" style={len(40, 2.6)} />
        </g>
        <g fontFamily="Newsreader" fontSize="20" fill={INK}>
          <text x="372" y="226" textAnchor="end">Chennai</text>
          <text x="40" y="44">London</text>
        </g>
        <g fontFamily="IBM Plex Mono" fontSize="9" fill={PENCIL} letterSpacing="1">
          <text x="372" y="238" textAnchor="end">13.08° N · 80.27° E</text>
          <text x="40" y="84">51.51° N · 0.13° W</text>
          <text x="150" y="196" fill={BLUE}>≈ 8,200 km</text>
        </g>
        <g fontFamily="Caveat" fill={RED} opacity={inView ? 1 : 0} style={{ transition: "opacity .8s 2.8s" }}>
          <text x="128" y="124" fontSize="30">2005</text>
          <text x="140" y="152" fontSize="26">£200</text>
        </g>
      </svg>
      {/* the plane */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: 380, height: 240 }}
          ref={(el) => {
            if (!el?.parentElement) return;
            el.style.transform = `scale(${el.parentElement.clientWidth / 380})`;
          }}
        >
          <div
            style={{
              position: "absolute",
              offsetPath: `path("${JOURNEY}")`,
              offsetDistance: `${t * 100}%`,
              offsetRotate: "auto",
              opacity: inView && t > 0 && t < 0.995 ? 1 : 0,
              transition: "opacity .4s",
              fontSize: 16,
              lineHeight: 1,
              color: INK,
            } as CSSProperties}
          >
            <svg width="20" height="20" viewBox="-10 -10 20 20" aria-hidden><path d="M 8 0 L -6 -2 L -8 -7 L -10 -7 L -8 0 L -10 7 L -8 7 L -6 2 Z M 0 -1.5 L -3 -9 L -1 -9 L 4 -1.5 Z M 0 1.5 L -3 9 L -1 9 L 4 1.5 Z" fill={INK} /></svg>
          </div>
        </div>
      </div>
    </div>
  );
};
