"use client";

import { useTimeOfDay } from "@/lib/useTimeOfDay";

export default function RiverWater() {
  const { isNight } = useTimeOfDay();

  // Sparkle positions scattered naturally across the riverbed
  const sparkles = [
    { left: "14%", top: "35%", delay: "0.2s", size: 6 },
    { left: "28%", top: "62%", delay: "1.4s", size: 8 },
    { left: "42%", top: "45%", delay: "2.8s", size: 5 },
    { left: "55%", top: "75%", delay: "0.9s", size: 7 },
    { left: "68%", top: "38%", delay: "2.1s", size: 9 },
    { left: "79%", top: "58%", delay: "1.7s", size: 6 },
    { left: "88%", top: "78%", delay: "3.2s", size: 7 },
    { left: "35%", top: "82%", delay: "2.4s", size: 8 },
  ];

  return (
    <div
      className="fixed inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden"
      style={{
        zIndex: 0,
        height: "33vh",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, black 100%)",
      }}
      aria-hidden="true"
    >
      {/* Primary River Caustic Currents (continuous full-width flow, no vertical tiling seams) */}
      <div
        suppressHydrationWarning
        style={{
          position: "absolute",
          inset: "-20px",
          backgroundImage: `
            radial-gradient(ellipse 35% 25% at 18% 30%, ${isNight ? "rgba(224, 242, 254, 0.2)" : "rgba(255, 255, 255, 0.35)"} 0%, transparent 70%),
            radial-gradient(ellipse 45% 30% at 52% 45%, ${isNight ? "rgba(186, 230, 253, 0.18)" : "rgba(255, 250, 235, 0.3)"} 0%, transparent 70%),
            radial-gradient(ellipse 40% 28% at 82% 35%, ${isNight ? "rgba(224, 242, 254, 0.2)" : "rgba(255, 255, 255, 0.32)"} 0%, transparent 70%),
            radial-gradient(ellipse 42% 32% at 32% 75%, ${isNight ? "rgba(186, 230, 253, 0.16)" : "rgba(255, 252, 240, 0.28)"} 0%, transparent 70%),
            radial-gradient(ellipse 48% 35% at 68% 80%, ${isNight ? "rgba(224, 242, 254, 0.18)" : "rgba(255, 248, 225, 0.28)"} 0%, transparent 70%)
          `,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          mixBlendMode: isNight ? "screen" : "overlay",
          opacity: isNight ? 0.45 : 0.68,
          animation: "riverDrift1 18s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />

      {/* Secondary Current Undulation (soft seamless counter-drift) */}
      <div
        style={{
          position: "absolute",
          inset: "-20px",
          backgroundImage: `
            radial-gradient(ellipse 40% 25% at 28% 40%, ${isNight ? "rgba(224, 242, 254, 0.15)" : "rgba(255, 255, 255, 0.28)"} 0%, transparent 70%),
            radial-gradient(ellipse 42% 28% at 72% 60%, ${isNight ? "rgba(186, 230, 253, 0.15)" : "rgba(255, 255, 255, 0.25)"} 0%, transparent 70%),
            radial-gradient(ellipse 50% 30% at 45% 82%, ${isNight ? "rgba(224, 242, 254, 0.12)" : "rgba(255, 250, 230, 0.22)"} 0%, transparent 70%)
          `,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          mixBlendMode: isNight ? "screen" : "soft-light",
          opacity: isNight ? 0.5 : 0.72,
          animation: "riverDrift2 24s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />

      {/* Sunlight or Moonlight Sparkles (Diamond glints on ripple crests) */}
      {sparkles.map((sp, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: sp.left,
            top: sp.top,
            width: sp.size,
            height: sp.size,
            backgroundColor: isNight ? "#e0f2fe" : "#fffdf0",
            borderRadius: "50%",
            boxShadow: isNight
              ? "0 0 6px 2px rgba(224, 242, 254, 0.85), 0 0 14px 4px rgba(186, 230, 253, 0.45)"
              : "0 0 6px 2px rgba(255, 250, 220, 0.8), 0 0 12px 4px rgba(255, 215, 0, 0.3)",
            animation: "waterSparkle 3.5s ease-in-out infinite",
            animationDelay: sp.delay,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Soft Alpine River Mist drifting smoothly above the water */}
      <div
        style={{
          position: "absolute",
          inset: "-40px",
          background: isNight
            ? "radial-gradient(ellipse 85% 45% at 50% 40%, rgba(186, 230, 253, 0.08) 0%, transparent 80%)"
            : "radial-gradient(ellipse 80% 40% at 50% 40%, rgba(247, 244, 237, 0.18) 0%, transparent 80%)",
          filter: "blur(20px)",
          opacity: isNight ? 0.45 : 0.6,
          animation: "riverMist 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}
