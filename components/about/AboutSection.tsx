"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import GlassCard from "../ui/GlassCard";
import ParallaxCard from "../ui/ParallaxCard";
import { education, projects, experience } from "@/lib/data";
import { use3DScroll } from "@/lib/use3DScroll";

function Counter({ from = 0, to, duration = 1.2 }: { from?: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const currentCount = progress * (to - from) + from;
      setCount(to % 1 !== 0 ? Number(currentCount.toFixed(2)) : Math.floor(currentCount));
      if (progress < 1) window.requestAnimationFrame(step);
      else setCount(to);
    };
    window.requestAnimationFrame(step);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function AboutSection() {
  const { ref, rotateX, translateY, opacity, scale } = use3DScroll({ initialRotateX: 8, initialY: 50 });

  return (
    <motion.section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="pt-28 pb-36 relative"
      style={{ rotateX, y: translateY, opacity, scale }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* Left — Stats */}
        <ParallaxCard offset={28} className="h-full">
          <GlassCard className="p-8 min-h-[320px] flex flex-col justify-center">
            <div className="mb-10">
              <div className="font-syne text-6xl lg:text-8xl font-bold text-text-hi">
                <Counter to={parseFloat(education.cgpa)} />
              </div>
              <div className="font-sans text-sm text-accent mt-2">
                Cumulative GPA
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="font-syne text-4xl lg:text-5xl font-bold text-text-hi">
                  <Counter to={experience.years} />+
                </div>
                <div className="font-sans text-xs text-text-lo mt-2">
                  Years of Total Experience
                </div>
              </div>
              <div>
                <div className="font-syne text-4xl lg:text-5xl font-bold text-text-hi">
                  <Counter to={projects.length} />+
                </div>
                <div className="font-sans text-xs text-text-lo mt-2">
                  Major Projects
                </div>
              </div>
            </div>
          </GlassCard>
        </ParallaxCard>

        {/* Right — Bio */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="font-syne text-4xl md:text-[3.25rem] leading-[1.05] font-bold text-text-hi mb-6">
              Building systems that think.
            </h2>
            <p className="text-text-lo text-base leading-relaxed mb-8 max-w-[65ch]">
              AI &amp; Systems Developer building intelligent systems that bridge complex
              backend infrastructure and scalable machine learning. Currently completing a
              B.Tech in Artificial Intelligence and Data Science at {education.institution}.
            </p>
          </div>

          <ParallaxCard offset={28} className="w-full">
            <GlassCard className="p-6">
              <div className="font-sans text-xs text-accent mb-2">
                Education
              </div>
              <h3 className="font-syne text-lg font-bold text-text-hi mb-1">
                {education.institution}
              </h3>
              <p className="text-text-lo text-sm mb-4">{education.degree}</p>
              <div className="flex items-center justify-between font-sans text-sm">
                <span className="text-text-lo">{education.period}</span>
              </div>
            </GlassCard>
          </ParallaxCard>
        </div>

      </div>
    </motion.section>
  );
}
