/**
 * Interactive "lab bench" instruments, each built from one of Panshul's own projects:
 *  - TrussLab:     a live direct-stiffness truss solver (port of the idea behind Truss-Solver)
 *  - PidTuner:     a turning robot with adjustable PID gains (VEX autonomous)
 *  - CanSatFlight: a flight simulation using the PH8SED design numbers
 *  - DigitNet:     digit-classifier-nn running in the browser (weights trained with his own NumPy code)
 *  - FilterScope:  the moving-average filter from dsp-filter-designer, on a live scope
 */
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import net from "@/data/digit-net.json";

const INK = "#1d1f25";
const PENCIL = "#6c6b66";
const RED = "#cf3a2b";
const BLUE = "#1f4fbf";
const PAPER = "#faf8f2";

/* ── shared bits ──────────────────────────────────────────────────── */
export const Tabbed = ({ tabs, caption, hint }: { tabs: { label: string; node: ReactNode }[]; caption: string; hint?: string }) => {
  const [i, setI] = useState(0);
  return (
    <figure className="tape sheet p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2 mb-3" role="tablist">
        {tabs.map((t, k) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={i === k}
            onClick={() => setI(k)}
            className={`mono text-[11px] tracking-[0.06em] h-7 px-2.5 rounded-[3px] border transition-colors ${
              i === k ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "border-[var(--rule)] text-[var(--ink-2)] hover:border-[var(--ink)]"
            }`}
          >
            {t.label}
          </button>
        ))}
        {hint && i === 0 && <span className="hand text-[20px] text-[var(--red)] ml-1 -rotate-3">{hint}</span>}
      </div>
      {tabs[i].node}
      <figcaption className="mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--ink-3)] mt-3 flex justify-between gap-3">
        <span>{caption}</span>
        <span>P.V.</span>
      </figcaption>
    </figure>
  );
};

const Slider = ({ label, value, min, max, step, onChange, fmt }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; fmt?: (v: number) => string }) => (
  <label className="block">
    <span className="flex justify-between mono text-[10.5px] text-[var(--ink-3)] uppercase tracking-[0.1em]">
      <span>{label}</span>
      <span className="text-[var(--ink)] tabular-nums">{fmt ? fmt(value) : value}</span>
    </span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full mt-1 accent-[#cf3a2b] cursor-pointer"
    />
  </label>
);

const Readout = ({ k, v, hot }: { k: string; v: string; hot?: boolean }) => (
  <div className="border border-[var(--rule)] rounded-[3px] px-2.5 py-1.5 bg-white/50">
    <div className="mono text-[9.5px] uppercase tracking-[0.1em] text-[var(--ink-3)]">{k}</div>
    <div className={`mono text-[13px] tabular-nums ${hot ? "text-[var(--red)]" : "text-[var(--ink)]"}`}>{v}</div>
  </div>
);

/* ── 1. Truss lab: real direct stiffness method ──────────────────── */
const NODES: [number, number][] = [
  [0, 0], [2, 0], [4, 0], [6, 0], [8, 0],
  [1, 1.5], [3, 1.5], [5, 1.5], [7, 1.5],
];
const MEMBERS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [5, 6], [6, 7], [7, 8],
  [0, 5], [5, 1], [1, 6], [6, 2], [2, 7], [7, 3], [3, 8], [8, 4],
];
const FIXED = new Set([0, 1, 9]); // node 0 pinned (x,y), node 4 roller (y)
const EA = 2.1e5 * 5e-4 * 1e3; // E = 210 GPa, A = 500 mm² → kN

function solveTruss(loads: Map<number, number>) {
  const n = NODES.length * 2;
  const K = Array.from({ length: n }, () => new Array(n).fill(0));
  const geo = MEMBERS.map(([a, b]) => {
    const dx = NODES[b][0] - NODES[a][0];
    const dy = NODES[b][1] - NODES[a][1];
    const L = Math.hypot(dx, dy);
    return { a, b, L, c: dx / L, s: dy / L };
  });
  for (const { a, b, L, c, s } of geo) {
    const k = EA / L;
    const m = [c * c, c * s, s * s];
    const local = [
      [m[0], m[1], -m[0], -m[1]],
      [m[1], m[2], -m[1], -m[2]],
      [-m[0], -m[1], m[0], m[1]],
      [-m[1], -m[2], m[1], m[2]],
    ];
    const d = [2 * a, 2 * a + 1, 2 * b, 2 * b + 1];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) K[d[i]][d[j]] += k * local[i][j];
  }
  const F = new Array(n).fill(0);
  loads.forEach((p, node) => (F[2 * node + 1] -= p));
  const free = [...Array(n).keys()].filter((i) => !FIXED.has(i));
  // Gaussian elimination on the free DOFs
  const A = free.map((i) => [...free.map((j) => K[i][j]), F[i]]);
  const m = free.length;
  for (let col = 0; col < m; col++) {
    let piv = col;
    for (let r = col + 1; r < m; r++) if (Math.abs(A[r][col]) > Math.abs(A[piv][col])) piv = r;
    [A[col], A[piv]] = [A[piv], A[col]];
    for (let r = 0; r < m; r++) {
      if (r === col) continue;
      const f = A[r][col] / A[col][col];
      for (let c2 = col; c2 <= m; c2++) A[r][c2] -= f * A[col][c2];
    }
  }
  const u = new Array(n).fill(0);
  free.forEach((dof, i) => (u[dof] = A[i][m] / A[i][i]));
  const forces = geo.map(({ a, b, L, c, s }) => (EA / L) * (c * (u[2 * b] - u[2 * a]) + s * (u[2 * b + 1] - u[2 * a + 1])));
  const R = (dof: number) => K[dof].reduce((acc, kij, j) => acc + kij * u[j], 0) - F[dof];
  return { u, forces, reactions: { Ay: R(1), Ax: R(0), By: R(9) } };
}

export const TrussLab = () => {
  const [mode, setMode] = useState<"point" | "deck">("point");
  const [node, setNode] = useState(2);
  const [P, setP] = useState(10);
  const loads = useMemo(() => {
    const m = new Map<number, number>();
    if (mode === "point") m.set(node, P);
    else [1, 2, 3].forEach((k) => m.set(k, P / 3));
    return m;
  }, [mode, node, P]);
  const { u, forces, reactions } = useMemo(() => solveTruss(loads), [loads]);

  const S = 42, X0 = 32, Y0 = 168;
  const px = (i: number) => X0 + NODES[i][0] * S;
  const py = (i: number) => Y0 - NODES[i][1] * S;
  const maxF = Math.max(...forces.map(Math.abs), 1e-9);
  const maxU = Math.max(...u.map(Math.abs), 1e-12);
  const ex = 16 / maxU; // exaggerate deflection to 16 px
  const iT = forces.indexOf(Math.max(...forces));
  const iC = forces.indexOf(Math.min(...forces));
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div>
      <svg viewBox="0 0 400 230" className="w-full h-auto select-none" role="img" aria-label="Interactive truss: member colour shows tension or compression, thickness shows force">
        {/* deflected shape */}
        {MEMBERS.map(([a, b], i) => (
          <line key={`d${i}`} x1={px(a) + u[2 * a] * ex} y1={py(a) - u[2 * a + 1] * ex} x2={px(b) + u[2 * b] * ex} y2={py(b) - u[2 * b + 1] * ex} stroke={PENCIL} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 3" />
        ))}
        {/* members */}
        {MEMBERS.map(([a, b], i) => {
          const f = forces[i];
          const w = 1.5 + (Math.abs(f) / maxF) * 6;
          return (
            <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
              <line x1={px(a)} y1={py(a)} x2={px(b)} y2={py(b)} stroke="transparent" strokeWidth="14" />
              <line x1={px(a)} y1={py(a)} x2={px(b)} y2={py(b)} stroke={Math.abs(f) < 1e-6 ? PENCIL : f > 0 ? BLUE : RED} strokeWidth={w} strokeLinecap="round" style={{ transition: "stroke-width .3s, stroke .3s" }} />
              {hover === i && (
                <text x={(px(a) + px(b)) / 2} y={(py(a) + py(b)) / 2 - 8} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fill={INK} stroke={PAPER} strokeWidth="3" paintOrder="stroke">
                  {f > 0 ? "T" : "C"} {Math.abs(f).toFixed(1)} kN
                </text>
              )}
            </g>
          );
        })}
        {/* supports */}
        <path d={`M ${px(0)} ${py(0) + 4} l -9 15 l 18 0 Z M ${px(4)} ${py(4) + 4} l -9 15 l 18 0 Z M ${px(4) - 11} ${py(4) + 23} l 22 0`} stroke={INK} strokeWidth="1.5" fill="none" />
        {/* nodes (click to move load) */}
        {NODES.map((_, i) => {
          const sel = mode === "point" && i === node;
          return (
            <g key={i} onClick={() => { setMode("point"); setNode(i); }} style={{ cursor: "pointer" }}>
              <circle cx={px(i)} cy={py(i)} r="11" fill="transparent" />
              <circle cx={px(i)} cy={py(i)} r={sel ? 5.5 : 4.5} fill={sel ? RED : PAPER} stroke={INK} strokeWidth="1.6" />
            </g>
          );
        })}
        {/* loads */}
        {[...loads.entries()].map(([k, p]) => (
          <g key={k} stroke={RED} strokeWidth="1.8" fill="none">
            <path d={`M ${px(k)} ${py(k) - 48} L ${px(k)} ${py(k) - 9} M ${px(k) - 5} ${py(k) - 16} L ${px(k)} ${py(k) - 9} L ${px(k) + 5} ${py(k) - 16}`} />
            <text x={px(k) + 6} y={py(k) - 40} fontFamily="Caveat" fontSize="18" fill={RED} stroke="none">{p.toFixed(p < 10 ? 1 : 0)} kN</text>
          </g>
        ))}
        {/* reactions */}
        <g fontFamily="IBM Plex Mono" fontSize="9" fill={PENCIL}>
          <text x={px(0) - 14} y={py(0) + 36}>{reactions.Ay.toFixed(1)} kN ↑</text>
          <text x={px(4) - 30} y={py(4) + 36}>{reactions.By.toFixed(1)} kN ↑</text>
        </g>
        <g fontFamily="IBM Plex Mono" fontSize="9" letterSpacing="0.6">
          <rect x="250" y="222" width="10" height="3" fill={BLUE} /><text x="264" y="226" fill={PENCIL}>TENSION</text>
          <rect x="318" y="222" width="10" height="3" fill={RED} /><text x="332" y="226" fill={PENCIL}>COMPR.</text>
        </g>
      </svg>
      <div className="grid sm:grid-cols-[1fr_auto] gap-3 items-end mt-1">
        <Slider label={mode === "deck" ? "Total deck load" : "Point load"} value={P} min={1} max={30} step={1} onChange={setP} fmt={(v) => `${v} kN`} />
        <div className="flex gap-1.5">
          {(["point", "deck"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`mono text-[11px] h-8 px-2.5 rounded-[3px] border ${mode === m ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "border-[var(--rule)] text-[var(--ink-2)]"}`}>
              {m === "point" ? "Point load" : "Deck load"}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        <Readout k="Max tension" v={`${forces[iT].toFixed(1)} kN`} />
        <Readout k="Max compr." v={`${Math.abs(forces[iC]).toFixed(1)} kN`} hot />
        <Readout k="Max deflection" v={`${(maxU * 1000).toFixed(2)} mm`} />
      </div>
      <p className="mono text-[10px] text-[var(--ink-3)] mt-2">Direct stiffness method, solved live in your browser. Steel, A = 500 mm². Click a joint to move the load; hover a member for its force.</p>
    </div>
  );
};

/* ── 2. PID tuner ──────────────────────────────────────────────────── */
const TARGET = 90;
const DT = 0.005;
const DUR = 2.5;
function simulatePid(kP: number, kD: number) {
  let th = 0, w = 0;
  const out: number[] = [];
  for (let t = 0; t <= DUR + 1e-9; t += DT) {
    let u = kP * (TARGET - th) - kD * w;
    u = Math.max(-12, Math.min(12, u)); // motor voltage limit
    const a = 50 * u - 1.2 * w;
    w += a * DT;
    th += w * DT;
    out.push(th);
  }
  const peak = Math.max(...out);
  let settle: number | null = 0;
  for (let i = out.length - 1; i >= 0; i--) if (Math.abs(out[i] - TARGET) > 2) { settle = i === out.length - 1 ? null : (i + 1) * DT; break; }
  return { out, overshoot: Math.max(0, ((peak - TARGET) / TARGET) * 100), settle };
}

const PRESETS = [
  { name: "Wobbly", kP: 0.4, kD: 0 },
  { name: "Sluggish", kP: 0.04, kD: 0.08 },
  { name: "Tuned", kP: 0.3, kD: 0.1 },
];

export const PidTuner = () => {
  const [kP, setKP] = useState(0.4);
  const [kD, setKD] = useState(0);
  const { out, overshoot, settle } = useMemo(() => simulatePid(kP, kD), [kP, kD]);
  const [k, setK] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.max(0, Math.min((now - start) / 1000, DUR));
      setK(Math.round(t / DT));
      if (t < DUR) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [out]);

  const W = 250, H = 170, PL = 30, PB = 22;
  const x = (i: number) => PL + (i * DT / DUR) * (W - PL - 6);
  const y = (deg: number) => H - PB - (Math.max(-10, Math.min(150, deg)) / 150) * (H - PB - 8);
  const d = out.slice(0, Math.max(1, k + 1)).map((v, i) => `${i ? "L" : "M"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const theta = out[Math.max(0, Math.min(k, out.length - 1))] ?? 0;
  const good = settle !== null && settle < 1.3 && overshoot < 3;

  return (
    <div>
      <div className="grid grid-cols-[1fr_110px] gap-3 items-center">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Robot heading over time for the chosen PID gains">
          <line x1={PL} y1={y(0)} x2={W - 6} y2={y(0)} stroke={INK} strokeWidth="1.2" />
          <line x1={PL} y1={8} x2={PL} y2={H - PB} stroke={INK} strokeWidth="1.2" />
          <line x1={PL} y1={y(TARGET)} x2={W - 6} y2={y(TARGET)} stroke={BLUE} strokeDasharray="4 4" />
          <rect x={PL} y={y(TARGET + 2)} width={W - PL - 6} height={y(TARGET - 2) - y(TARGET + 2)} fill="rgba(31,79,191,0.1)" />
          <path d={d} fill="none" stroke={RED} strokeWidth="2" strokeLinejoin="round" />
          <g fontFamily="IBM Plex Mono" fontSize="8.5" fill={PENCIL}>
            <text x={PL - 4} y={y(TARGET) + 3} textAnchor="end">90°</text>
            <text x={PL - 4} y={y(0) + 3} textAnchor="end">0°</text>
            <text x={W - 6} y={H - 6} textAnchor="end">2.5 s</text>
            <text x={PL} y={H - 6}>0</text>
          </g>
          <text x={W - 8} y={y(TARGET) - 6} textAnchor="end" fontFamily="Caveat" fontSize="15" fill={BLUE}>target</text>
        </svg>
        {/* the robot, top view */}
        <svg viewBox="-55 -55 110 110" className="w-full h-auto" aria-hidden>
          <circle r="46" fill="none" stroke={PENCIL} strokeOpacity="0.4" strokeDasharray="2 4" />
          <line x1="0" y1="0" x2="0" y2="-50" stroke={BLUE} strokeDasharray="3 3" transform={`rotate(${TARGET})`} />
          <g transform={`rotate(${theta})`}>
            <rect x="-20" y="-22" width="40" height="44" rx="4" fill={PAPER} stroke={INK} strokeWidth="2.2" />
            <rect x="-26" y="-18" width="6" height="14" fill={INK} />
            <rect x="20" y="-18" width="6" height="14" fill={INK} />
            <rect x="-26" y="4" width="6" height="14" fill={INK} />
            <rect x="20" y="4" width="6" height="14" fill={INK} />
            <path d="M 0 -30 L -7 -18 L 7 -18 Z" fill={RED} />
          </g>
          <text y="52" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="9" fill={INK}>{theta.toFixed(0)}°</text>
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <Slider label="kP (proportional)" value={kP} min={0.02} max={0.8} step={0.01} onChange={setKP} fmt={(v) => v.toFixed(2)} />
        <Slider label="kD (derivative)" value={kD} min={0} max={0.2} step={0.005} onChange={setKD} fmt={(v) => v.toFixed(3)} />
      </div>
      <div className="flex flex-wrap items-center gap-1.5 mt-3">
        {PRESETS.map((p) => (
          <button key={p.name} onClick={() => { setKP(p.kP); setKD(p.kD); }} className="mono text-[11px] h-7 px-2.5 rounded-[3px] border border-[var(--rule)] text-[var(--ink-2)] hover:border-[var(--ink)]">
            {p.name}
          </button>
        ))}
        <span className="ml-auto flex gap-2">
          <Readout k="Overshoot" v={`${overshoot.toFixed(1)}%`} hot={overshoot > 5} />
          <Readout k="Settles" v={settle === null ? "never" : `${settle.toFixed(2)} s`} hot={settle === null} />
        </span>
      </div>
      <p className="mono text-[10px] text-[var(--ink-3)] mt-2">
        {good ? "✓ Tuned: fast, no wobble. That's the turn our autons rely on." : "A 90° turn with a 12 V motor limit. Try to settle inside the blue band in under 1.3 s with < 3% overshoot."}
      </p>
    </div>
  );
};

/* ── 3. CanSat flight (PH8SED numbers) ─────────────────────────────── */
const PAD_END = 5, APOGEE_T = 13, APOGEE = 400, DESCENT = 10.5;
const LAND_T = APOGEE_T + APOGEE / DESCENT;
const END_T = LAND_T + 5;
const SPEED = 4; // playback speed
const altAt = (t: number) => {
  if (t < PAD_END) return 0;
  if (t < APOGEE_T) { const f = (t - PAD_END) / (APOGEE_T - PAD_END); return APOGEE * (1 - (1 - f) ** 2); }
  if (t < LAND_T) return APOGEE - DESCENT * (t - APOGEE_T);
  return 0;
};
const STATES = [
  { k: "BOOT", c: "#6b7280" },
  { k: "PAD", c: "#2f7d3a" },
  { k: "ASCENT", c: BLUE },
  { k: "DESCENT", c: "#e0782b" },
  { k: "LANDED", c: "#7c4fbf" },
];
const stateAt = (t: number) => (t <= 0 ? 0 : t < PAD_END ? 1 : t < APOGEE_T ? 2 : t < LAND_T ? 3 : 4);

export const CanSatFlight = () => {
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const raf = useRef(0);

  const launch = () => {
    cancelAnimationFrame(raf.current);
    setRunning(true);
    const start = performance.now();
    const step = (now: number) => {
      const st = Math.max(0, Math.min(((now - start) / 1000) * SPEED, END_T));
      setT(st);
      if (st < END_T) raf.current = requestAnimationFrame(step);
      else setRunning(false);
    };
    raf.current = requestAnimationFrame(step);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const h = altAt(t);
  const P = 1013.25 * (1 - h / 44330) ** 5.255;
  const temp = 12 - 6.5 * (h / 1000);
  const v = t > APOGEE_T && t < LAND_T ? -DESCENT : t > PAD_END && t < APOGEE_T ? (altAt(t + 0.05) - h) / 0.05 : 0;
  const s = stateAt(t);
  const packets = t > PAD_END ? Math.floor(t - PAD_END) : 0;

  const W = 260, H = 160, PL = 30, PB = 18;
  const x = (tt: number) => PL + (tt / END_T) * (W - PL - 8);
  const y = (hh: number) => H - PB - (hh / 450) * (H - PB - 8);
  const N = 120;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) { const tt = (END_T * i) / N; if (tt > t) break; pts.push(`${pts.length ? "L" : "M"} ${x(tt).toFixed(1)} ${y(altAt(tt)).toFixed(1)}`); }
  pts.push(`L ${x(t).toFixed(1)} ${y(h).toFixed(1)}`);
  const canY = 14 + (1 - h / 450) * 118;

  return (
    <div>
      <div className="flex gap-1 mb-3">
        {STATES.map((st, i) => (
          <div key={st.k} className="flex-1 text-center mono text-[9.5px] tracking-[0.06em] py-1.5 rounded-[3px] border transition-colors" style={{ borderColor: i === s ? st.c : "var(--rule)", background: i === s ? st.c : "transparent", color: i === s ? "#fff" : "var(--ink-3)" }}>
            {st.k}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_64px] gap-2 items-stretch">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Altitude against time for a simulated CanSat flight">
          <line x1={PL} y1={y(0)} x2={W - 8} y2={y(0)} stroke={INK} strokeWidth="1.2" />
          <line x1={PL} y1="8" x2={PL} y2={y(0)} stroke={INK} strokeWidth="1.2" />
          <line x1={PL} y1={y(APOGEE)} x2={W - 8} y2={y(APOGEE)} stroke={PENCIL} strokeOpacity="0.4" strokeDasharray="3 4" />
          <g fontFamily="IBM Plex Mono" fontSize="8.5" fill={PENCIL}>
            <text x={PL - 4} y={y(APOGEE) + 3} textAnchor="end">400</text>
            <text x={PL - 4} y={y(0) + 3} textAnchor="end">0 m</text>
            <text x={W - 8} y={H - 4} textAnchor="end">{END_T.toFixed(0)} s</text>
          </g>
          <path d={pts.join(" ")} fill="none" stroke={RED} strokeWidth="2" strokeLinejoin="round" />
          {t >= APOGEE_T && <text x={x(APOGEE_T) + 4} y={y(APOGEE) - 5} fontFamily="Caveat" fontSize="15" fill={RED}>apogee: release fires</text>}
          {packets > 0 && Math.floor(t * 2) % 2 === 0 && t < END_T && <circle cx={W - 14} cy="14" r="3.5" fill="#2f7d3a" />}
          {packets > 0 && <text x={W - 22} y="17" textAnchor="end" fontFamily="IBM Plex Mono" fontSize="8" fill={PENCIL}>LoRa</text>}
        </svg>
        <svg viewBox="0 0 64 160" className="w-full h-auto" aria-hidden>
          <line x1="32" y1="8" x2="32" y2="150" stroke={PENCIL} strokeOpacity="0.25" strokeDasharray="2 4" />
          <line x1="6" y1="150" x2="58" y2="150" stroke={INK} strokeWidth="1.5" />
          <g transform={`translate(32 ${canY})`}>
            {s === 3 && (
              <g stroke={INK} strokeWidth="1">
                <path d="M -18 -22 Q 0 -40 18 -22 Q 9 -25 0 -22 Q -9 -25 -18 -22 Z" fill="#e0782b" stroke={INK} />
                <line x1="-17" y1="-21" x2="-5" y2="-6" /><line x1="17" y1="-21" x2="5" y2="-6" />
              </g>
            )}
            {s === 2 && <path d="M -4 8 L 0 20 L 4 8 Z" fill="#e0782b" />}
            <rect x="-6" y="-6" width="12" height="15" rx="2" fill={PAPER} stroke={INK} strokeWidth="1.6" />
          </g>
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-1.5 mt-3">
        <Readout k="T+" v={`${t.toFixed(0)} s`} />
        <Readout k="Altitude" v={`${h.toFixed(0)} m`} />
        <Readout k="Pressure" v={`${P.toFixed(1)}`} />
        <Readout k="Temp" v={`${temp.toFixed(1)} °C`} />
        <Readout k="V speed" v={`${v.toFixed(1)}`} hot={s === 3} />
        <Readout k="Packets" v={`${packets}`} />
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-3">
        <button onClick={launch} disabled={running} className="btn-ink !h-9 !text-[12px] disabled:opacity-50">
          {t === 0 ? "▲ Launch" : running ? "In flight…" : "↻ Fly again"}
        </button>
        <p className="mono text-[10px] text-[var(--ink-3)] flex-1 min-w-[180px]">
          Simulated at {SPEED}× with our design numbers: 400 m apogee, 10.5 m/s descent, 1 Hz telemetry. Pressure from h = 44330[1 − (P/P₀)^(1/5.255)], hPa; temperature from the 6.5 K/km lapse rate.
        </p>
      </div>
    </div>
  );
};

/* ── 4. Digit network: Panshul's from-scratch NN, weights trained with his own code ── */

type Net = { acc: number; nTest: number; W1: number[][]; b1: number[]; W2: number[][]; b2: number[]; samples: Record<string, number[][]> };
const NET = net as unknown as Net;

function forward(x: number[]) {
  const h = NET.b1.map((b, j) => Math.max(0, x.reduce((acc, xi, i) => acc + xi * NET.W1[i][j], b)));
  const z = NET.b2.map((b, k) => h.reduce((acc, hj, j) => acc + hj * NET.W2[j][k], b));
  const mx = Math.max(...z);
  const e = z.map((v) => Math.exp(v - mx));
  const s = e.reduce((a, b) => a + b, 0);
  return { h, p: e.map((v) => v / s) };
}

/** Turn a hand drawing into the 8×8, 0–16 format of the scikit-learn digits (32×32 bitmap → 4×4 block counts). */
function canvasTo8x8(c: HTMLCanvasElement): number[] | null {
  const ctx = c.getContext("2d")!;
  const { width: W, height: H } = c;
  const img = ctx.getImageData(0, 0, W, H).data;
  let x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (img[(y * W + x) * 4 + 3] > 40) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  if (x1 < 0) return null;
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1;
  const scale = 30 / Math.max(bw, bh);
  const off = document.createElement("canvas");
  off.width = 32; off.height = 32;
  const o = off.getContext("2d")!;
  o.imageSmoothingEnabled = true;
  const dw = bw * scale, dh = bh * scale;
  o.drawImage(c, x0, y0, bw, bh, (32 - dw) / 2, (32 - dh) / 2, dw, dh);
  const d = o.getImageData(0, 0, 32, 32).data;
  const out: number[] = [];
  for (let by = 0; by < 8; by++) for (let bx = 0; bx < 8; bx++) {
    let n = 0;
    for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) if (d[((by * 4 + y) * 32 + bx * 4 + x) * 4 + 3] > 60) n++;
    out.push(n);
  }
  return out;
}

export const DigitNet = () => {
  const cv = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const last = useRef<[number, number] | null>(null);
  const [pix, setPix] = useState<number[] | null>(null);
  const [pulse, setPulse] = useState(0);
  const sampleIdx = useRef(0);

  const result = useMemo(() => (pix ? forward(pix.map((v) => v / 16)) : null), [pix]);
  const pred = result ? result.p.indexOf(Math.max(...result.p)) : null;

  const clear = () => {
    const c = cv.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    setPix(null);
  };
  const update = () => {
    const v = canvasTo8x8(cv.current!);
    setPix(v);
    setPulse((p) => p + 1);
  };
  const pos = (e: React.PointerEvent) => {
    const r = cv.current!.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * cv.current!.width, ((e.clientY - r.top) / r.height) * cv.current!.height] as [number, number];
  };
  const down = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = pos(e);
    move(e);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = cv.current!.getContext("2d")!;
    const p = pos(e);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 22;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(...(last.current ?? p));
    ctx.lineTo(...p);
    ctx.stroke();
    last.current = p;
  };
  const up = () => {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    update();
  };
  const loadSample = () => {
    const digits = Object.keys(NET.samples);
    const i = sampleIdx.current++ % (digits.length * 2);
    const d = digits[i % digits.length];
    const s = NET.samples[d][Math.floor(i / digits.length) % NET.samples[d].length];
    const c = cv.current!;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);
    const cell = c.width / 8;
    s.forEach((v, k) => {
      ctx.fillStyle = `rgba(29,31,37,${v / 16})`;
      ctx.fillRect((k % 8) * cell, Math.floor(k / 8) * cell, cell, cell);
    });
    setPix(s);
    setPulse((p) => p + 1);
  };

  // hidden layer & output geometry for the network diagram
  const HX = 60, OX = 200, H = 260;
  const hy = (j: number) => 12 + (j * (H - 24)) / 31;
  const oy = (k: number) => 22 + (k * (H - 44)) / 9;
  const hMax = result ? Math.max(...result.h, 1e-9) : 1;
  const strongest = result && pred !== null
    ? result.h.map((v, j) => ({ j, c: v * NET.W2[j][pred] })).sort((a, b) => b.c - a.c).slice(0, 7).map((o) => o.j)
    : [];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.25fr] gap-4 items-start">
        <div>
          <div className="relative aspect-square max-w-[280px] sm:max-w-none mx-auto border-[1.5px] border-[var(--ink)] rounded-[3px] bg-white/70 touch-none" style={{ backgroundImage: "linear-gradient(rgba(31,79,191,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(31,79,191,.1) 1px,transparent 1px)", backgroundSize: "12.5% 12.5%" }}>
            <canvas ref={cv} width={224} height={224} className="absolute inset-0 w-full h-full cursor-crosshair" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} aria-label="Drawing pad: draw a digit from 0 to 9" />
            {!pix && <span className="absolute inset-0 grid place-items-center pointer-events-none hand text-[26px] text-[var(--ink-3)]">draw a digit here</span>}
          </div>
          <div className="flex gap-1.5 mt-2">
            <button onClick={clear} className="mono text-[11px] h-8 px-3 rounded-[3px] border border-[var(--rule)] hover:border-[var(--ink)]">Clear</button>
            <button onClick={loadSample} className="mono text-[11px] h-8 px-3 rounded-[3px] border border-[var(--rule)] hover:border-[var(--ink)]">Real scan ↻</button>
          </div>
          {/* what the network sees */}
          <div className="flex items-center gap-3 mt-3">
            <div className="grid grid-cols-8 w-[72px] h-[72px] shrink-0 border border-[var(--ink)]">
              {Array.from({ length: 64 }).map((_, k) => (
                <span key={k} style={{ background: `rgba(29,31,37,${(pix?.[k] ?? 0) / 16})`, transition: "background .3s" }} />
              ))}
            </div>
            <p className="mono text-[10px] text-[var(--ink-3)] leading-snug">What the network sees: 64 pixels, 0–16, same format as the 1,797 scans it learned from.</p>
          </div>
        </div>

        <div>
          <svg viewBox={`0 0 260 ${H}`} className="w-full h-auto max-h-[280px] sm:max-h-none" role="img" aria-label="Network diagram: hidden neurons light up by activation; output bars show the probability of each digit">
            {/* connections from strongest hidden neurons to the predicted digit */}
            {pred !== null && strongest.map((j, i) => (
              <line key={`${pulse}-${j}`} x1={HX} y1={hy(j)} x2={OX} y2={oy(pred)} stroke={RED} strokeOpacity="0.55" strokeWidth="1.3" strokeDasharray="200" strokeDashoffset="200" style={{ animation: `draw .7s ${0.25 + i * 0.05}s forwards` }} />
            ))}
            {/* input fan */}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1="4" y1={H / 2 - 40 + i * 11} x2={HX - 6} y2={hy(i * 4 + 2)} stroke={PENCIL} strokeOpacity="0.25" />
            ))}
            <text x="2" y={H / 2 - 50} fontFamily="IBM Plex Mono" fontSize="8" fill={PENCIL}>64 IN</text>
            {/* hidden layer */}
            {Array.from({ length: 32 }).map((_, j) => {
              const a = result ? result.h[j] / hMax : 0;
              return (
                <circle key={`${pulse}-h${j}`} cx={HX} cy={hy(j)} r="3.6" fill={a > 0.02 ? `rgba(31,79,191,${0.15 + 0.85 * a})` : PAPER} stroke={INK} strokeWidth="0.9" style={{ transition: `fill .35s ${j * 8}ms` }} />
              );
            })}
            <text x={HX - 22} y={H - 2} fontFamily="IBM Plex Mono" fontSize="8" fill={PENCIL}>32 HIDDEN · ReLU</text>
            {/* outputs */}
            {Array.from({ length: 10 }).map((_, k) => {
              const p = result ? result.p[k] : 0;
              const hot = k === pred;
              return (
                <g key={k}>
                  <circle cx={OX} cy={oy(k)} r="7" fill={hot ? RED : PAPER} stroke={INK} strokeWidth="1.2" style={{ transition: "fill .3s .5s" }} />
                  <text x={OX} y={oy(k) + 3.2} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="8.5" fill={hot ? "#fff" : INK}>{k}</text>
                  <rect x={OX + 11} y={oy(k) - 3.5} width={Math.max(0.5, p * 44)} height="7" fill={hot ? RED : BLUE} fillOpacity={hot ? 0.9 : 0.35} style={{ transition: "width .4s .45s" }} />
                </g>
              );
            })}
          </svg>
          <div className="flex items-end justify-between mt-1">
            <div>
              <div className="mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-3)]">Prediction</div>
              <div className="serif text-[48px] leading-none text-[var(--red)] min-h-[48px]">{pred ?? "–"}</div>
            </div>
            <div className="text-right">
              <div className="mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-3)]">Confidence</div>
              <div className="mono text-[18px]">{result && pred !== null ? `${(result.p[pred] * 100).toFixed(1)}%` : "–"}</div>
            </div>
          </div>
        </div>
      </div>
      <p className="mono text-[10px] text-[var(--ink-3)] mt-3">
        64 → 32 (ReLU) → 10 (softmax). Weights trained with my own NumPy backprop code ({(NET.acc * 100).toFixed(1)}% on {NET.nTest} unseen scans), now running in your browser. Hand drawings are harder than the scans; that gap is exactly what my research is about.
      </p>
    </div>
  );
};

/* ── 5. Moving-average filter scope (dsp-filter-designer) ─────────── */
const gauss = (n: number) => {
  // deterministic pseudo-random normal per sample index (Box–Muller on two hashes)
  const h = (k: number) => { let x = Math.sin(k * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const u1 = Math.max(1e-9, h(n)), u2 = h(n + 7919);
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
};

export const FilterScope = () => {
  const [win, setWin] = useState(9);
  const [noise, setNoise] = useState(0.35);
  const [freq, setFreq] = useState(1);
  const [off, setOff] = useState(0);
  const { ref, inView } = useInViewLocal<HTMLDivElement>();
  useEffect(() => {
    if (!inView) return;
    let raf = 0, lastT = performance.now(), acc = 0;
    const step = (now: number) => {
      acc += (now - lastT) / 10; // 100 samples per second
      lastT = now;
      if (acc >= 1) { setOff((o) => o + Math.floor(acc)); acc -= Math.floor(acc); }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const FS = 100, N = 300;
  const clean = (n: number) => Math.sin((2 * Math.PI * freq * n) / FS);
  const noisy = (n: number) => clean(n) + noise * gauss(n);
  const idx = Array.from({ length: N }, (_, i) => off + i);
  const raw = idx.map(noisy);
  const filt = idx.map((n) => { let s = 0; for (let k = 0; k < win; k++) s += noisy(n - k); return s / win; });
  const cl = idx.map(clean);
  const rmse = (a: number[]) => Math.sqrt(a.reduce((s, v, i) => s + (v - cl[i]) ** 2, 0) / N);

  const W = 360, H = 150;
  const X = (i: number) => (i / (N - 1)) * W;
  const Y = (v: number) => H / 2 - v * (H / 2 - 10) / 1.8;
  const path = (a: number[]) => a.map((v, i) => `${i ? "L" : "M"} ${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
  const rRaw = rmse(raw), rFilt = rmse(filt);
  const tooBig = win > FS / freq / 3;

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-[3px] border border-[var(--rule)] bg-white/50" role="img" aria-label="Oscilloscope: noisy sine wave in grey, filtered output in red, clean signal dashed blue">
        {[0.25, 0.5, 0.75].map((f) => <line key={f} x1={W * f} y1="0" x2={W * f} y2={H} stroke={PENCIL} strokeOpacity="0.15" />)}
        <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke={PENCIL} strokeOpacity="0.3" />
        <path d={path(raw)} fill="none" stroke={PENCIL} strokeOpacity="0.45" strokeWidth="1" />
        <path d={path(cl)} fill="none" stroke={BLUE} strokeWidth="1.3" strokeDasharray="5 4" />
        <path d={path(filt)} fill="none" stroke={RED} strokeWidth="2.2" />
      </svg>
      <div className="grid grid-cols-3 gap-3 mt-3">
        <Slider label="Window N" value={win} min={1} max={80} step={1} onChange={setWin} fmt={(v) => `${v}`} />
        <Slider label="Noise σ" value={noise} min={0} max={1} step={0.05} onChange={setNoise} fmt={(v) => v.toFixed(2)} />
        <Slider label="Signal" value={freq} min={0.5} max={4} step={0.5} onChange={setFreq} fmt={(v) => `${v} Hz`} />
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <Readout k="RMSE noisy" v={rRaw.toFixed(3)} />
        <Readout k="RMSE filtered" v={rFilt.toFixed(3)} hot={rFilt > rRaw} />
        <span className={`hand text-[20px] ml-1 ${tooBig ? "text-[var(--red)]" : "text-[var(--blue)]"}`}>
          {win === 1 ? "N = 1 does nothing" : tooBig ? "too big: it's smoothing away the signal!" : rFilt < rRaw ? "less noise ✓" : "hmm"}
        </span>
      </div>
      <p className="mono text-[10px] text-[var(--ink-3)] mt-2">Each output is the average of the last N samples at 100 Hz, as in my dsp-filter-designer repo. Grey: noisy input. Blue: the true signal. Red: filtered.</p>
    </div>
  );
};

function useInViewLocal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}
