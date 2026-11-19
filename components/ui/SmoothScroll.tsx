"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let isRunning = false;
    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let animationFrameId: number;

    const ease = 0.09;

    const onWheel = (e: WheelEvent) => {
      // Do not intercept if user is holding ctrl/cmd (zooming) or shift
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;

      e.preventDefault();

      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      targetY = Math.max(0, Math.min(maxScroll, targetY + e.deltaY));

      if (!isRunning) {
        isRunning = true;
        currentY = window.scrollY;
        loop();
      }
    };

    const loop = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) < 0.5) {
        currentY = targetY;
        window.scrollTo({ top: currentY, behavior: "instant" });
        isRunning = false;
        return;
      }

      currentY += diff * ease;
      window.scrollTo({ top: currentY, behavior: "instant" });
      animationFrameId = requestAnimationFrame(loop);
    };

    const onScrollSync = () => {
      if (!isRunning) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScrollSync, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScrollSync);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return null;
}
