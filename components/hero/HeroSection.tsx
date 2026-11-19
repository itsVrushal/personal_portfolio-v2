"use client";

import { useCallback, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTimeOfDay } from "@/lib/useTimeOfDay";

const VRUSHAL_LETTERS = "VRUSHAL".split("");
const PATIL_LETTERS = "PATIL".split("");

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { isNight } = useTimeOfDay();

  // Spotlight follows mouse
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!spotlightRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, var(--glow-spot) 0%, transparent 60%)`;
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Scroll-driven parallax for the text
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawTextY = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const textY = useSpring(rawTextY, { stiffness: 90, damping: 24, mass: 0.14 });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-dvh flex items-center relative pt-20 overflow-hidden"
    >
      {/* Spotlight overlay */}
      <div
        ref={spotlightRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          transition: "background 0.05s linear",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: "relative", zIndex: 2 }}>
        <motion.div style={{ y: textY }}>
          <div style={{ display: "flex", flexDirection: "column", perspective: "1000px" }}>
            {/* Unified name: VRUSHAL -> PATIL emergence */}
            <h1
              className="font-syne font-black uppercase"
              style={{
                // Sized to the word, not to the viewport alone: VRUSHAL is
                // seven wide caps and must clear the 24px gutter on a phone.
                fontSize: "clamp(2rem, 10vw, 8rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
                marginBottom: "1.5rem",
                display: "flex",
                flexDirection: "column",
                transformStyle: "preserve-3d",
              }}
            >
              {/* VRUSHAL — letter-by-letter 3D tilt roll */}
              <span
                style={{
                  display: "inline-flex",
                  color: isNight ? "#ffffff" : "var(--text-hi)",
                  textShadow: isNight
                    ? "0 0 35px rgba(255, 255, 255, 0.45), 0 2px 10px rgba(0, 0, 0, 0.8)"
                    : "0 2px 20px var(--shadow-warm), 0 1px 3px var(--shadow-ink)",
                  perspective: "1000px",
                  transition: "color 0.5s ease, text-shadow 0.5s ease",
                }}
              >
                {VRUSHAL_LETTERS.map((char, i) => (
                  <motion.span
                    key={`v-${i}`}
                    initial={{ y: 28, rotateX: 60, scale: 0.94 }}
                    animate={{ y: 0, rotateX: 0, scale: 1 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.12 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      display: "inline-block",
                      transformOrigin: "50% 80%",
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              {/* PATIL — 3D slide down emergence */}
              <span
                style={{
                  display: "inline-flex",
                  WebkitTextStroke: isNight ? "2px rgba(255, 255, 255, 0.92)" : "2px var(--text-hi)",
                  color: isNight ? "rgba(255, 255, 255, 0.1)" : "var(--accent-ghost)",
                  textShadow: isNight
                    ? "0 0 25px rgba(255, 255, 255, 0.35)"
                    : "0 8px 30px var(--glow-accent)",
                  perspective: "1000px",
                  transition: "color 0.5s ease, text-shadow 0.5s ease, -webkit-text-stroke 0.5s ease",
                }}
              >
                {PATIL_LETTERS.map((char, i) => (
                  <motion.span
                    key={`p-${i}`}
                    initial={{ y: -20, scale: 0.96 }}
                    animate={{ y: 0, scale: 1 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.6 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      display: "inline-block",
                      transformOrigin: "50% 20%",
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className={`text-lg md:text-xl max-w-[60ch] font-medium transition-colors duration-500 ${
                isNight
                  ? "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
                  : "text-black"
              }`}
              style={{ marginBottom: "2.5rem", lineHeight: 1.6 }}
            >
              Building the future with code, one algorithm at a time. Designing
              scalable AI systems and resilient architectures.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 16, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
            >
              <a
                href="#projects"
                className="bg-accent text-accent-ink font-bold px-8 py-3 rounded-full hover:bg-accent/90 hover:scale-[1.03] active:scale-[0.98] shadow-[0_4px_16px_var(--glow-accent-soft)] hover:shadow-[0_8px_24px_var(--glow-accent)] transition-[transform,background-color,box-shadow] duration-200 cursor-pointer inline-flex items-center justify-center text-center"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="bg-surface/90 border border-border text-text-hi font-bold px-8 py-3 rounded-full hover:bg-surface hover:border-accent/40 hover:scale-[1.03] active:scale-[0.98] shadow-[0_2px_8px_var(--shadow-warm-soft)] hover:shadow-[0_6px_20px_var(--shadow-warm)] transition-[transform,background-color,border-color,box-shadow] duration-200 cursor-pointer inline-flex items-center justify-center text-center"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
