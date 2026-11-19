"use client";

import { useTimeOfDay } from "@/lib/useTimeOfDay";

// Yosemite Valley open sky aperture polygon
// (The region above the granite mountain summits where the sky, sun, moon, and stars reside)
const SKY_CLIP_PATH = `polygon(
  0% 0%, 100% 0%,
  100% 13.5%, 96% 13.0%, 92% 11.6%, 88% 10.2%, 84% 10.7%, 80% 8.3%, 76% 18.0%, 72% 23.7%, 68% 22.8%,
  64% 31.5%, 60% 34.9%, 56% 34.9%, 52% 37.8%, 48% 36.5%, 44% 34.7%, 40% 34.9%, 36% 36.5%, 32% 17.8%,
  28% 14.5%, 24% 10.4%, 20% 8.2%, 16% 9.4%, 12% 10.6%, 8% 13.4%, 4% 13.8%, 0% 11.3%
)`;

// Twinkling stars scattered in the upper sky (all y < 25%)
const NIGHT_STARS = [
  { x: 8, y: 5, size: 2, delay: "0.2s" },
  { x: 14, y: 7, size: 1.5, delay: "1.4s" },
  { x: 22, y: 4, size: 2.2, delay: "0.8s" },
  { x: 28, y: 12, size: 1.8, delay: "2.1s" },
  { x: 34, y: 6, size: 2.5, delay: "0.5s" },
  { x: 42, y: 10, size: 1.6, delay: "1.8s" },
  { x: 48, y: 4, size: 2.0, delay: "2.6s" },
  { x: 55, y: 8, size: 2.4, delay: "0.3s" },
  { x: 62, y: 5, size: 1.7, delay: "1.9s" },
  { x: 68, y: 11, size: 2.2, delay: "1.1s" },
  { x: 74, y: 6, size: 1.9, delay: "2.3s" },
  { x: 82, y: 4, size: 2.3, delay: "0.7s" },
  { x: 88, y: 8, size: 1.6, delay: "1.6s" },
  { x: 94, y: 5, size: 2.0, delay: "2.0s" },
  { x: 18, y: 9, size: 1.4, delay: "2.5s" },
  { x: 38, y: 14, size: 2.1, delay: "1.3s" },
  { x: 58, y: 12, size: 1.8, delay: "0.9s" },
  { x: 78, y: 7, size: 2.4, delay: "2.2s" },
  { x: 86, y: 6, size: 1.7, delay: "0.4s" },
];

export default function CelestialBodies() {
  const {
    period,
    isNight,
    sunVisible,
    sunX,
    sunY,
    moonVisible,
    moonX,
    moonY,
    moonPhaseAngle,
    themeTint,
  } = useTimeOfDay();

  // Sun coloration shifts with time of day
  const getSunColor = () => {
    if (period === "dawn") {
      return {
        core: "radial-gradient(circle, #ffffff 0%, #fed7aa 40%, #f97316 85%, #ea580c 100%)",
        corona:
          "0 0 50px 18px rgba(251, 146, 60, 0.75), 0 0 110px 45px rgba(234, 88, 12, 0.45)",
      };
    }
    if (period === "sunset") {
      return {
        core: "radial-gradient(circle, #ffffff 0%, #fecdd3 35%, #f43f5e 75%, #e11d48 100%)",
        corona:
          "0 0 55px 22px rgba(244, 63, 94, 0.8), 0 0 125px 50px rgba(190, 18, 60, 0.5)",
      };
    }
    // High noon / day
    return {
      core: "radial-gradient(circle, #ffffff 0%, #fef08a 45%, #eab308 85%, #ca8a04 100%)",
      corona:
        "0 0 60px 24px rgba(254, 240, 138, 0.7), 0 0 130px 55px rgba(234, 179, 8, 0.38)",
    };
  };

  const sunStyle = getSunColor();

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 0, position: "fixed" }}
      aria-hidden="true"
    >
      {/* ============================================================== */}
      {/* LAYER 1: CELESTIAL SKY APERTURE                                */}
      {/* (Clipped strictly to the open sky above the mountain ridges so  */}
      {/*  the Sun & Moon physically emerge from behind eastern peaks     */}
      {/*  and set behind western cliffs!)                                */}
      {/* ============================================================== */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: SKY_CLIP_PATH,
          WebkitClipPath: SKY_CLIP_PATH,
        }}
      >
        {/* Dynamic Sky Gradient (Dawn glow, Sunset amber, Night indigo) */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-out"
          style={{ background: themeTint.skyGradient }}
        />

        {/* Twinkling Night Stars (visible when night) */}
        {isNight && (
          <div className="absolute inset-0">
            {NIGHT_STARS.map((star, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                  backgroundColor: "#ffffff",
                  borderRadius: "50%",
                  boxShadow: "0 0 4px 1px rgba(255, 255, 255, 0.85)",
                  animation: `starTwinkle 3s ease-in-out infinite alternate`,
                  animationDelay: star.delay,
                  willChange: "opacity, transform",
                }}
              />
            ))}
          </div>
        )}

        {/* THE SUN */}
        {sunVisible && (
          <div
            style={{
              position: "absolute",
              left: `${sunX}%`,
              top: `${sunY}%`,
              transform: "translate(-50%, -50%)",
              width: 76,
              height: 76,
              borderRadius: "50%",
              background: sunStyle.core,
              boxShadow: sunStyle.corona,
              willChange: "transform, left, top",
              transition: "box-shadow 1s ease-out, background 1s ease-out",
            }}
          >
            {/* Solar lens glint */}
            <div
              style={{
                position: "absolute",
                inset: "-12px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
                mixBlendMode: "screen",
              }}
            />
          </div>
        )}

        {/* THE MOON */}
        {moonVisible && (
          <div
            style={{
              position: "absolute",
              left: `${moonX}%`,
              top: `${moonY}%`,
              transform: "translate(-50%, -50%)",
              width: 58,
              height: 58,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 35%, #ffffff 0%, #f1f5f9 45%, #cbd5e1 85%, #94a3b8 100%)",
              boxShadow:
                "0 0 40px 14px rgba(224, 242, 254, 0.55), 0 0 95px 40px rgba(186, 230, 253, 0.28)",
              willChange: "transform, left, top",
            }}
          >
            {/* Lunar craters */}
            <div
              style={{
                position: "absolute",
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "rgba(100, 116, 139, 0.35)",
                top: 14,
                left: 16,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "rgba(100, 116, 139, 0.3)",
                top: 30,
                left: 28,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "rgba(100, 116, 139, 0.25)",
                top: 22,
                left: 34,
              }}
            />

            {/* Lunar phase crescent / shadow mask */}
            {moonPhaseAngle > 0.1 && moonPhaseAngle < 0.9 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  boxShadow: "inset 14px 0 10px rgba(15, 23, 42, 0.72)",
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* LAYER 2: ATMOSPHERIC AMBIENT VEIL                              */}
      {/* (Baths the landscape smoothly in matching time-of-day lighting */}
      {/*  without any harsh edges or vertical seam artifacts)           */}
      {/* ============================================================== */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: themeTint.ambientScrim,
        }}
      />
    </div>
  );
}
