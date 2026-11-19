"use client";

export default function Wildlife() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 0, position: "fixed", height: "35vh" }}
      aria-hidden="true"
    >
      {/* Stag container walking along the riverbank meadow */}
      <div
        style={{
          position: "absolute",
          bottom: "16vh",
          left: 0,
          animation: "stagWalkPath 52s linear infinite",
          animationDelay: "5s",
          willChange: "transform",
          opacity: 0.82,
          filter: "drop-shadow(0 2px 4px rgba(20, 30, 35, 0.4))",
        }}
      >
        <div style={{ width: 68, height: 52 }}>
          <svg
            viewBox="0 0 110 85"
            fill="#182329"
            style={{ width: "100%", height: "100%", overflow: "visible" }}
          >
            {/* Far Legs (Back/Right side, slightly shaded) */}
            <g
              style={{
                transformOrigin: "74px 46px",
                animation: "stagLegBackRight 1.2s ease-in-out infinite",
                willChange: "transform",
                opacity: 0.8,
              }}
            >
              <path d="M 74 46 Q 71 62 70 82 L 73 83 Q 76 63 78 46 Z" />
            </g>

            <g
              style={{
                transformOrigin: "42px 48px",
                animation: "stagLegFrontRight 1.2s ease-in-out infinite",
                willChange: "transform",
                opacity: 0.8,
              }}
            >
              <path d="M 42 48 Q 44 64 46 82 L 43 83 Q 39 64 38 48 Z" />
            </g>

            {/* Torso & Head (Gentle vertical cadence bob) */}
            <g
              style={{
                animation: "stagBob 0.6s ease-in-out infinite",
                willChange: "transform",
              }}
            >
              {/* Torso body profile */}
              <path d="M 78 44 Q 84 41 86 45 Q 88 49 82 51 Q 72 53 54 52 Q 36 51 32 46 Q 28 38 26 28 Q 25 24 22 22 Q 19 24 20 27 Q 23 37 28 47 Q 38 53 58 53 Q 72 53 78 44 Z" />

              {/* Tail */}
              <path d="M 85 45 Q 89 44 90 48 Q 87 49 85 46 Z" />

              {/* Head, Ears & Antlers */}
              <g
                style={{
                  transformOrigin: "28px 36px",
                  animation: "stagHead 1.2s ease-in-out infinite",
                  willChange: "transform",
                }}
              >
                {/* Head */}
                <path d="M 24 23 Q 20 20 14 22 Q 11 24 10 26 Q 13 28 18 28 Q 22 27 24 23 Z" />

                {/* Ear */}
                <path d="M 23 22 Q 26 18 24 16 Q 21 18 22 22 Z" />

                {/* Antlers (Majestic branching rack) */}
                <path
                  d="M 21 20 Q 22 12 19 6 Q 18 4 17 6 Q 18 10 17 13 Q 13 9 11 8 Q 10 10 14 14 Q 11 13 9 14 Q 11 16 16 17 Q 18 19 20 20 Z"
                  opacity="0.95"
                />
                <path
                  d="M 19 20 Q 16 14 13 10 Q 12 11 15 15 Q 12 15 10 17 Q 14 18 18 20 Z"
                  opacity="0.85"
                />
              </g>
            </g>

            {/* Near Legs (Front/Left side, fully opaque) */}
            <g
              style={{
                transformOrigin: "78px 46px",
                animation: "stagLegBackLeft 1.2s ease-in-out infinite",
                willChange: "transform",
              }}
            >
              <path d="M 78 46 Q 81 62 83 82 L 80 83 Q 76 63 74 46 Z" />
            </g>

            <g
              style={{
                transformOrigin: "38px 48px",
                animation: "stagLegFrontLeft 1.2s ease-in-out infinite",
                willChange: "transform",
              }}
            >
              <path d="M 38 48 Q 35 64 33 82 L 36 83 Q 40 64 42 48 Z" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
