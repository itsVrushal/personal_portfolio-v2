"use client";

interface SkyBirdsProps {
  /** "behind": distant flock flying behind text/cards; "front": solitary raptor soaring in front of text/cards */
  layer: "behind" | "front";
}

/**
 * Procedural SVG Bird with independent far/near wings that flap with natural perspective
 */
function SingleBird({
  scale = 1,
  color = "#1e293b",
  flapDuration = 0.42,
  flapDelay = 0,
  tilt = 0,
}: {
  scale?: number;
  color?: string;
  flapDuration?: number;
  flapDelay?: number;
  tilt?: number;
}) {
  return (
    <div
      style={{
        width: 54 * scale,
        height: 32 * scale,
        transform: `rotate(${tilt}deg)`,
        display: "inline-block",
        willChange: "transform",
      }}
    >
      <svg
        viewBox="0 0 60 36"
        fill={color}
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        {/* Far Wing (Behind Body) */}
        <g
          style={{
            transformOrigin: "22px 14px",
            animation: `birdWingFar ${flapDuration}s ease-in-out infinite alternate`,
            animationDelay: `${flapDelay}s`,
            willChange: "transform",
            opacity: 0.85,
          }}
        >
          <path d="M 22 14 Q 16 0 6 3 Q 14 10 21 16 Z" />
        </g>

        {/* Tail */}
        <path d="M 18 16 L 4 20 L 7 16 L 3 13 L 18 14 Z" />

        {/* Torso */}
        <path d="M 17 15 Q 26 12 36 15 Q 38 18 34 20 Q 24 21 17 15 Z" />

        {/* Head & Beak */}
        <circle cx="37" cy="14" r="3.5" />
        <polygon points="40,13.5 45,15 40,16" />

        {/* Near Wing (In Front of Body) */}
        <g
          style={{
            transformOrigin: "25px 15px",
            animation: `birdWingNear ${flapDuration}s ease-in-out infinite alternate`,
            animationDelay: `${flapDelay}s`,
            willChange: "transform",
          }}
        >
          <path d="M 25 15 Q 18 -2 8 2 Q 16 9 24 18 Z" />
        </g>
      </svg>
    </div>
  );
}

export default function SkyBirds({ layer }: SkyBirdsProps) {
  if (layer === "behind") {
    // Distant flock flying high near the mountain peaks (behind page content)
    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden select-none"
        style={{ zIndex: 0, position: "fixed" }}
        aria-hidden="true"
      >
        {/* Flock container flying across from left to right */}
        <div
          style={{
            position: "absolute",
            top: "16vh",
            left: 0,
            animation: "flightFlock 34s linear infinite",
            animationDelay: "2s",
            willChange: "transform",
            opacity: 0.65,
          }}
        >
          {/* Leader bird */}
          <div style={{ position: "absolute", transform: "translate(0px, 0px)" }}>
            <SingleBird scale={0.52} flapDuration={0.38} flapDelay={0} tilt={-4} />
          </div>

          {/* Follower 1 (trailing upper) */}
          <div style={{ position: "absolute", transform: "translate(-38px, -14px)" }}>
            <SingleBird scale={0.46} flapDuration={0.41} flapDelay={0.12} tilt={-3} />
          </div>

          {/* Follower 2 (trailing lower) */}
          <div style={{ position: "absolute", transform: "translate(-44px, 16px)" }}>
            <SingleBird scale={0.48} flapDuration={0.39} flapDelay={0.08} tilt={-5} />
          </div>

          {/* Follower 3 (rear guard) */}
          <div style={{ position: "absolute", transform: "translate(-82px, 8px)" }}>
            <SingleBird scale={0.42} flapDuration={0.44} flapDelay={0.18} tilt={-3} />
          </div>
        </div>

        {/* Second flock at a higher altitude, entering with offset */}
        <div
          style={{
            position: "absolute",
            top: "9vh",
            left: 0,
            animation: "flightFlock 42s linear infinite",
            animationDelay: "19s",
            willChange: "transform",
            opacity: 0.48,
          }}
        >
          <div style={{ position: "absolute", transform: "translate(0px, 0px)" }}>
            <SingleBird scale={0.38} flapDuration={0.42} flapDelay={0.05} tilt={-2} />
          </div>
          <div style={{ position: "absolute", transform: "translate(-32px, 10px)" }}>
            <SingleBird scale={0.34} flapDuration={0.45} flapDelay={0.15} tilt={-3} />
          </div>
          <div style={{ position: "absolute", transform: "translate(-60px, -6px)" }}>
            <SingleBird scale={0.32} flapDuration={0.43} flapDelay={0.22} tilt={-1} />
          </div>
        </div>
      </div>
    );
  }

  // Foreground raptor / hawk soaring IN FRONT of cards & text
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 20, position: "fixed" }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          top: "28vh",
          left: 0,
          animation: "flightHawk 24s cubic-bezier(0.4, 0, 0.2, 1) infinite",
          animationDelay: "8s",
          willChange: "transform",
          opacity: 0.88,
          filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))",
        }}
      >
        {/* Soaring Hawk with wide wingspan */}
        <SingleBird
          scale={1.12}
          flapDuration={0.58}
          flapDelay={0}
          tilt={-6}
          color="#12181d"
        />
      </div>

      {/* Second solo raptor later in cycle on lower trajectory */}
      <div
        style={{
          position: "absolute",
          top: "42vh",
          left: 0,
          animation: "flightHawk 28s cubic-bezier(0.35, 0, 0.25, 1) infinite",
          animationDelay: "22s",
          willChange: "transform",
          opacity: 0.84,
          filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))",
        }}
      >
        <SingleBird
          scale={0.94}
          flapDuration={0.52}
          flapDelay={0.1}
          tilt={-4}
          color="#162026"
        />
      </div>
    </div>
  );
}
