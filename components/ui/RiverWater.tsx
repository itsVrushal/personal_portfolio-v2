"use client";

export default function RiverWater() {
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
      {/* Primary River Caustic Currents (horizontal light streaks drifting downstream) */}
      <div
        style={{
          position: "absolute",
          inset: "-30px",
          backgroundImage: `
            radial-gradient(ellipse 140px 18px at 15% 25%, rgba(255, 255, 255, 0.45) 0%, transparent 68%),
            radial-gradient(ellipse 200px 24px at 45% 40%, rgba(255, 250, 235, 0.38) 0%, transparent 70%),
            radial-gradient(ellipse 160px 20px at 75% 30%, rgba(255, 255, 255, 0.42) 0%, transparent 65%),
            radial-gradient(ellipse 220px 28px at 30% 70%, rgba(255, 252, 240, 0.35) 0%, transparent 70%),
            radial-gradient(ellipse 180px 22px at 85% 65%, rgba(255, 255, 255, 0.4) 0%, transparent 68%),
            radial-gradient(ellipse 240px 30px at 60% 85%, rgba(255, 248, 225, 0.38) 0%, transparent 72%)
          `,
          backgroundSize: "420px 90px",
          mixBlendMode: "overlay",
          opacity: 0.72,
          animation: "riverDrift1 16s linear infinite",
          willChange: "transform",
        }}
      />

      {/* Secondary Current Undulation (softer counter-balance current) */}
      <div
        style={{
          position: "absolute",
          inset: "-30px",
          backgroundImage: `
            radial-gradient(ellipse 180px 16px at 25% 35%, rgba(255, 255, 255, 0.4) 0%, transparent 65%),
            radial-gradient(ellipse 220px 22px at 70% 55%, rgba(255, 255, 255, 0.35) 0%, transparent 65%),
            radial-gradient(ellipse 260px 26px at 40% 80%, rgba(255, 250, 230, 0.32) 0%, transparent 68%)
          `,
          backgroundSize: "520px 110px",
          mixBlendMode: "soft-light",
          opacity: 0.8,
          animation: "riverDrift2 22s linear infinite",
          willChange: "transform",
        }}
      />

      {/* Sunlight Sparkles (Diamond glints on ripple crests) */}
      {sparkles.map((sp, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: sp.left,
            top: sp.top,
            width: sp.size,
            height: sp.size,
            backgroundColor: "#fffdf0",
            borderRadius: "50%",
            boxShadow: "0 0 6px 2px rgba(255, 250, 220, 0.8), 0 0 12px 4px rgba(255, 215, 0, 0.3)",
            animation: "waterSparkle 3.5s ease-in-out infinite",
            animationDelay: sp.delay,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Soft Alpine Morning Mist drifting above the river */}
      <div
        style={{
          position: "absolute",
          inset: "-40px",
          background:
            "radial-gradient(ellipse 80% 40% at 50% 40%, rgba(247, 244, 237, 0.22) 0%, transparent 80%)",
          filter: "blur(16px)",
          opacity: 0.6,
          animation: "riverMist 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}
