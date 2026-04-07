import { useState, useEffect } from "react";

const BOOT_LINES = [
  "PANSHUL OS v1.0 — LOADING...",
  "[OK] Robotics kernel initialized",
  "[OK] PID controllers calibrated",
  "[OK] Sensor arrays online",
  "[OK] Memory allocated: 4096KB",
  "[OK] Vision systems ready",
  "[OK] Autonomous routines loaded",
  "SYSTEM READY.",
];

const BootSequence = ({ onDone }: { onDone: () => void }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (visibleCount < BOOT_LINES.length) {
      const t = setTimeout(() => setVisibleCount((c) => c + 1), 180);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setFading(true);
        setTimeout(() => {
          onDone();
        }, 500);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [visibleCount, onDone]);

  const progress = Math.round((visibleCount / BOOT_LINES.length) * 100);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div className="w-full max-w-lg px-6 font-mono text-sm space-y-1">
        {BOOT_LINES.slice(0, visibleCount).map((line, i) => {
          let cls = "text-foreground";
          if (line.startsWith("[OK]")) cls = "text-green-600";
          else if (line === "SYSTEM READY.") cls = "text-primary font-bold";
          return (
            <div key={i} className={cls}>
              {line}
            </div>
          );
        })}

        {/* Progress bar */}
        <div className="mt-6 h-1 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BootSequence;