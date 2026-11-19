"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTimeOfDay } from "@/lib/useTimeOfDay";

/**
 * Procedural SVG Soaring Eagle/Hawk with banking wings.
 * flip=true mirrors the bird horizontally so its head and beak face left.
 */
function SoaringEagle({
  scale = 1.25,
  color = "#10171d",
  flip = false,
}: {
  scale?: number;
  color?: string;
  flip?: boolean;
}) {
  return (
    <div
      style={{
        width: 64 * scale,
        height: 38 * scale,
        display: "inline-block",
        transform: flip ? "scaleX(-1)" : "none",
        willChange: "transform",
      }}
    >
      <svg
        viewBox="0 0 68 40"
        fill={color}
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        {/* Far Wing (Behind Body) */}
        <g
          style={{
            transformOrigin: "26px 16px",
            animation: "birdWingFar 0.55s ease-in-out infinite alternate",
            willChange: "transform",
            opacity: 0.88,
          }}
        >
          <path d="M 26 16 Q 18 0 6 3 Q 16 11 25 18 Z" />
          <path d="M 6 3 Q 3 2 1 4 Q 8 8 16 11 Z" opacity="0.9" />
        </g>

        {/* Tail (broad eagle wedge) */}
        <path d="M 20 18 L 4 23 L 8 18 L 3 14 L 20 15 Z" />

        {/* Torso */}
        <path d="M 19 17 Q 30 13 42 16 Q 44 20 38 22 Q 27 23 19 17 Z" />

        {/* Head & Curved Raptor Beak */}
        <circle cx="43" cy="15" r="4.2" />
        <polygon points="46,14.5 53,16 46,18" />

        {/* Near Wing (In Front of Body, larger wingspan) */}
        <g
          style={{
            transformOrigin: "30px 17px",
            animation: "birdWingNear 0.55s ease-in-out infinite alternate",
            willChange: "transform",
          }}
        >
          <path d="M 30 17 Q 21 -3 9 2 Q 19 10 29 20 Z" />
          <path d="M 9 2 Q 6 0 4 3 Q 11 7 20 10 Z" opacity="0.95" />
        </g>
      </svg>
    </div>
  );
}

export default function CircularBird() {
  const { isNight } = useTimeOfDay();
  const [active, setActive] = useState(false);
  const [variant, setVariant] = useState<"A" | "B">("A");
  const [flightKey, setFlightKey] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleComplete = () => {
    // Completely unmounts when flight completes off-screen
    setActive(false);

    // Schedule next arrival between 14 and 26 seconds later
    const nextDelay = 14000 + Math.random() * 12000;
    timeoutRef.current = setTimeout(() => {
      setVariant(Math.random() > 0.5 ? "A" : "B");
      setFlightKey((k) => k + 1);
      setActive(true);
    }, nextDelay);
  };

  useEffect(() => {
    // Fast initial arrival on reload (visual hook for the site)
    const initialDelay = 500;
    timeoutRef.current = setTimeout(() => {
      setVariant(Math.random() > 0.5 ? "A" : "B");
      setFlightKey((k) => k + 1);
      setActive(true);
    }, initialDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Safety fallback: if onAnimationComplete doesn't fire (e.g. background tab), complete after 11s
  useEffect(() => {
    if (!active) return;
    const safety = setTimeout(() => {
      handleComplete();
    }, 11000);
    return () => clearTimeout(safety);
  }, [active, flightKey]);

  // If night time, birds roost; or if not actively flying, render nothing
  if (isNight || !active) {
    return null;
  }

  // Variant A: Enters from LEFT (-20vw), flies towards RIGHT (125vw). Head faces RIGHT (flip=false).
  const trajectoryA = {
    x: ["-20vw", "12vw", "38vw", "58vw", "78vw", "98vw", "128vw"],
    y: ["15vh", "20vh", "32vh", "40vh", "32vh", "22vh", "15vh"],
    scale: [0.75, 0.85, 1.25, 1.38, 1.18, 0.88, 0.72],
    rotate: [10, 16, 12, -8, -18, -14, -8],
    opacity: [0, 0.9, 0.98, 1, 0.96, 0.88, 0],
  };

  // Variant B: Enters from RIGHT (120vw), flies towards LEFT (-25vw). Head faces LEFT (flip=true).
  const trajectoryB = {
    x: ["120vw", "92vw", "68vw", "46vw", "26vw", "6vw", "-25vw"],
    y: ["15vh", "20vh", "32vh", "40vh", "32vh", "22vh", "15vh"],
    scale: [0.75, 0.85, 1.25, 1.38, 1.18, 0.88, 0.72],
    rotate: [-10, -16, -12, 8, 18, 14, 8],
    opacity: [0, 0.9, 0.98, 1, 0.96, 0.88, 0],
  };

  const trajectory = variant === "A" ? trajectoryA : trajectoryB;
  const isFlipped = variant === "B"; // When entering from right, mirror horizontally to face left

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden select-none"
        style={{ zIndex: 30, position: "fixed" }}
        aria-hidden="true"
      >
        <motion.div
          key={`circular-flight-${flightKey}`}
          initial={{
            x: trajectory.x[0],
            y: trajectory.y[0],
            scale: trajectory.scale[0],
            rotate: trajectory.rotate[0],
            opacity: 0,
          }}
          animate={trajectory}
          transition={{
            duration: 9.8,
            ease: "easeInOut",
            times: [0, 0.18, 0.36, 0.54, 0.72, 0.88, 1],
          }}
          onAnimationComplete={handleComplete}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.35))",
            willChange: "transform, opacity",
          }}
        >
          <SoaringEagle scale={1.3} color="#10171d" flip={isFlipped} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
