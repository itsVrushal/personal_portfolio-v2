"use client";

import { motion } from "framer-motion";
import { useTimeOfDay } from "@/lib/useTimeOfDay";

interface FireflyData {
  id: number;
  initialX: number; // percentage across screen
  initialY: number; // percentage down screen
  size: number;
  driftRangeX: number;
  driftRangeY: number;
  pulseDuration: number;
  pulseDelay: number;
  moveDuration: number;
}

// 22 fireflies drifting naturally across the Yosemite meadow, riverbank, and pine edge
const FIREFLIES: FireflyData[] = [
  { id: 1, initialX: 18, initialY: 62, size: 4, driftRangeX: 25, driftRangeY: 18, pulseDuration: 2.2, pulseDelay: 0.2, moveDuration: 8.5 },
  { id: 2, initialX: 28, initialY: 74, size: 3.5, driftRangeX: 30, driftRangeY: 22, pulseDuration: 1.8, pulseDelay: 0.9, moveDuration: 9.2 },
  { id: 3, initialX: 38, initialY: 58, size: 4.5, driftRangeX: 22, driftRangeY: 16, pulseDuration: 2.6, pulseDelay: 1.4, moveDuration: 7.8 },
  { id: 4, initialX: 46, initialY: 82, size: 4, driftRangeX: 35, driftRangeY: 20, pulseDuration: 2.1, pulseDelay: 0.5, moveDuration: 8.9 },
  { id: 5, initialX: 55, initialY: 68, size: 3.5, driftRangeX: 28, driftRangeY: 24, pulseDuration: 1.9, pulseDelay: 1.8, moveDuration: 9.6 },
  { id: 6, initialX: 64, initialY: 78, size: 4.2, driftRangeX: 32, driftRangeY: 18, pulseDuration: 2.4, pulseDelay: 0.7, moveDuration: 8.1 },
  { id: 7, initialX: 72, initialY: 64, size: 3.8, driftRangeX: 24, driftRangeY: 20, pulseDuration: 2.0, pulseDelay: 1.2, moveDuration: 7.4 },
  { id: 8, initialX: 82, initialY: 72, size: 4.5, driftRangeX: 30, driftRangeY: 25, pulseDuration: 2.5, pulseDelay: 0.3, moveDuration: 9.0 },
  { id: 9, initialX: 88, initialY: 60, size: 3.5, driftRangeX: 20, driftRangeY: 16, pulseDuration: 1.7, pulseDelay: 1.6, moveDuration: 8.4 },
  { id: 10, initialX: 12, initialY: 78, size: 4.2, driftRangeX: 28, driftRangeY: 22, pulseDuration: 2.3, pulseDelay: 1.1, moveDuration: 9.8 },
  { id: 11, initialX: 24, initialY: 52, size: 3.8, driftRangeX: 22, driftRangeY: 18, pulseDuration: 1.9, pulseDelay: 0.8, moveDuration: 7.9 },
  { id: 12, initialX: 35, initialY: 86, size: 4.0, driftRangeX: 34, driftRangeY: 24, pulseDuration: 2.2, pulseDelay: 1.5, moveDuration: 8.7 },
  { id: 13, initialX: 50, initialY: 54, size: 3.6, driftRangeX: 26, driftRangeY: 16, pulseDuration: 2.4, pulseDelay: 0.4, moveDuration: 9.3 },
  { id: 14, initialX: 58, initialY: 88, size: 4.4, driftRangeX: 30, driftRangeY: 20, pulseDuration: 1.8, pulseDelay: 1.7, moveDuration: 8.0 },
  { id: 15, initialX: 68, initialY: 52, size: 3.7, driftRangeX: 24, driftRangeY: 18, pulseDuration: 2.1, pulseDelay: 0.6, moveDuration: 7.6 },
  { id: 16, initialX: 78, initialY: 84, size: 4.2, driftRangeX: 32, driftRangeY: 22, pulseDuration: 2.6, pulseDelay: 1.3, moveDuration: 9.5 },
  { id: 17, initialX: 85, initialY: 55, size: 3.5, driftRangeX: 20, driftRangeY: 15, pulseDuration: 1.9, pulseDelay: 0.9, moveDuration: 8.2 },
  { id: 18, initialX: 92, initialY: 76, size: 4.0, driftRangeX: 28, driftRangeY: 20, pulseDuration: 2.3, pulseDelay: 1.0, moveDuration: 8.8 },
  { id: 19, initialX: 32, initialY: 66, size: 3.8, driftRangeX: 26, driftRangeY: 18, pulseDuration: 2.0, pulseDelay: 1.5, moveDuration: 7.7 },
  { id: 20, initialX: 42, initialY: 72, size: 4.6, driftRangeX: 30, driftRangeY: 22, pulseDuration: 2.4, pulseDelay: 0.1, moveDuration: 9.1 },
  { id: 21, initialX: 62, initialY: 62, size: 3.6, driftRangeX: 22, driftRangeY: 16, pulseDuration: 1.8, pulseDelay: 1.2, moveDuration: 8.3 },
  { id: 22, initialX: 75, initialY: 75, size: 4.2, driftRangeX: 28, driftRangeY: 24, pulseDuration: 2.2, pulseDelay: 0.7, moveDuration: 9.4 },
];

interface FirefliesProps {
  layer?: "behind" | "front";
}

export default function Fireflies({ layer = "behind" }: FirefliesProps) {
  const { isNight } = useTimeOfDay();

  if (!isNight) {
    return null;
  }

  // Behind layer renders distant/river fireflies; front layer renders foreground fireflies drifting near cards
  const flies = layer === "front" ? FIREFLIES.slice(16) : FIREFLIES.slice(0, 16);
  const zIndex = layer === "front" ? 25 : 1;

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex, position: "fixed" }}
      aria-hidden="true"
    >
      {flies.map((ff) => (
        <motion.div
          key={ff.id}
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
          }}
          animate={{
            x: [0, ff.driftRangeX, -ff.driftRangeX * 0.7, ff.driftRangeX * 0.5, 0],
            y: [0, -ff.driftRangeY, ff.driftRangeY * 0.6, -ff.driftRangeY * 0.4, 0],
            opacity: [0.15, 0.95, 0.25, 0.85, 0.15],
          }}
          transition={{
            duration: ff.moveDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ff.pulseDelay,
          }}
          style={{
            position: "absolute",
            left: `${ff.initialX}%`,
            top: `${ff.initialY}%`,
            width: ff.size,
            height: ff.size,
            borderRadius: "50%",
            backgroundColor: "#bef264",
            boxShadow: `
              0 0 6px 2px rgba(190, 242, 100, 0.95),
              0 0 14px 5px rgba(163, 230, 53, 0.55),
              0 0 24px 8px rgba(132, 204, 22, 0.25)
            `,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
