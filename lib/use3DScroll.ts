"use client";

import { useRef } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface Use3DScrollOptions {
  /** Retired: a rotateX on tall sections widened the page. Kept so callers type-check. */
  initialRotateX?: number;
  /** translateY px at the start, clamped to 24. Default: 60 */
  initialY?: number;
  /** Scroll range offset (start, end) as viewport fractions. Default: [0.05, 0.32] */
  range?: [number, number];
  /** Spring config for smoothing */
  spring?: { stiffness?: number; damping?: number };
}

export interface ScrollTransformValues {
  ref: React.RefObject<HTMLElement | null>;
  rotateX: MotionValue<number>;
  translateY: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}

export function use3DScroll(options: Use3DScrollOptions = {}): ScrollTransformValues {
  const {
    initialY = 60,
    range = [0.05, 0.32],
    spring = { stiffness: 95, damping: 24 },
  } = options;

  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // A rotateX on a multi-thousand-pixel section, under a perspective parent,
  // projects its near edge far outside the layout box: it widens the page on
  // phones and lets a section paint over its neighbour. Keep a gentle
  // translate-in only. Never move a section into the one before or after it.
  const rawRotateX = useTransform(scrollYProgress, [0, 1], [0, 0]);

  const rawTranslateY = useTransform(
    scrollYProgress,
    [0, range[0], 1],
    [Math.min(initialY, 24), 0, 0]
  );

  // Content must be visible at rest (no JS, reduced motion, or before scroll).
  // Keep the reveal in the transform only; never start a section at opacity 0.
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const rotateX = useSpring(rawRotateX, spring);
  const translateY = useSpring(rawTranslateY, spring);
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 25 });
  const scale = useSpring(rawScale, spring);

  return { ref, rotateX, translateY, opacity, scale };
}
