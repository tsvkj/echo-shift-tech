import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-100 h-0.5 origin-left"
      style={{
        scaleX,
        background: "var(--gradient-primary)",
      }}
    />
  );
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) {
      setEnabled(false);
      return;
    }
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60]"
      aria-hidden
    >
      <div
        className="absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 transition-transform duration-100 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          background:
            "radial-gradient(circle, oklch(0.72 0.25 295 / 0.18), transparent 60%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-[oklch(0.72_0.25_295/0.25)] blur-[120px] animate-pulse-glow" />
      <div
        className="absolute -right-40 top-1/3 h-[600px] w-[600px] rounded-full bg-[oklch(0.65_0.22_265/0.25)] blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[oklch(0.82_0.18_210/0.18)] blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "4s" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
    </div>
  );
}
