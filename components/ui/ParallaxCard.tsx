"use client";

import { useRef, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

interface ParallaxCardProps {
  children: ReactNode;
  className?: string;
  /** Vertical travel offset in pixels (unidirectional, default: 28px) */
  offset?: number;
  /** Retained for API compatibility */
  index?: number;
  gridCols?: 2 | 3;
}

export default function ParallaxCard({
  children,
  className = "",
  offset = 28,
}: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Strictly UNIDIRECTIONAL parallax: All tiles move smoothly in the exact same direction.
  // Starts slightly lower (+offset) as you scroll down, settles at 0 at viewport center,
  // and smoothly glides to -offset as you scroll past.
  // No alternating up/down, no overlapping or misaligned columns.
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], [offset, 0, -offset]);

  // Smooth, responsive spring smoothing
  const springY = useSpring(rawY, {
    stiffness: 90,
    damping: 24,
    mass: 0.14,
  });

  const y = shouldReduceMotion ? 0 : springY;

  return (
    <motion.div
      ref={ref}
      style={{ y, willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
