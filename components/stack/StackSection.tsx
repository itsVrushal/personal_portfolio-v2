"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { use3DScroll } from "@/lib/use3DScroll";

export default function StackSection() {
  const { ref, rotateX, translateY, opacity, scale } = use3DScroll({ initialRotateX: 8, initialY: 50 });

  const skillGroups = [
    {
      label: "Languages",
      items: skills.languages,
      badgeColor: "bg-amber-100/95 text-amber-950 border-amber-300/90 shadow-[0_2px_8px_rgba(245,158,11,0.16)]",
      dotColor: "bg-amber-600",
    },
    {
      label: "Agentic AI",
      items: skills.agentic_ai,
      badgeColor: "bg-purple-100/95 text-purple-950 border-purple-300/90 shadow-[0_2px_8px_rgba(168,85,247,0.16)]",
      dotColor: "bg-purple-600",
    },
    {
      label: "Machine Learning & Vision",
      items: skills.ml_vision,
      badgeColor: "bg-emerald-100/95 text-emerald-950 border-emerald-300/90 shadow-[0_2px_8px_rgba(16,185,129,0.16)]",
      dotColor: "bg-emerald-600",
    },
    {
      label: "MLOps & Infrastructure",
      items: skills.mlops_infra,
      badgeColor: "bg-sky-100/95 text-sky-950 border-sky-300/90 shadow-[0_2px_8px_rgba(14,165,233,0.16)]",
      dotColor: "bg-sky-600",
    },
    {
      label: "Databases & Vector Stores",
      items: skills.databases_vectors,
      badgeColor: "bg-rose-100/95 text-rose-950 border-rose-300/90 shadow-[0_2px_8px_rgba(244,63,94,0.16)]",
      dotColor: "bg-rose-600",
    },
    {
      label: "Backend & Networking",
      items: skills.backend_networking,
      badgeColor: "bg-blue-100/95 text-blue-950 border-blue-300/90 shadow-[0_2px_8px_rgba(59,130,246,0.16)]",
      dotColor: "bg-blue-600",
    },
    {
      label: "Web & Interfaces",
      items: skills.web_interfaces,
      badgeColor: "bg-orange-100/95 text-orange-950 border-orange-300/90 shadow-[0_2px_8px_rgba(249,115,22,0.16)]",
      dotColor: "bg-orange-600",
    },
  ];

  return (
    <motion.section
      id="stack"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 relative"
      style={{ rotateX, y: translateY, opacity, scale }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="font-syne text-4xl md:text-[3.25rem] leading-[1.05] font-bold text-text-hi">
            Tools I think in.
          </h2>
        </div>

        <div className="flex flex-col gap-8 md:gap-12">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-8 items-start"
            >
              <div className="md:pt-1">
                <span className={`inline-flex items-center gap-2 font-syne text-sm font-bold px-3.5 py-1.5 rounded-xl backdrop-blur-md border shadow-[0_2px_8px_var(--shadow-warm-soft)] ${group.badgeColor}`}>
                  <span className={`w-2 h-2 rounded-full ${group.dotColor}`} aria-hidden="true" />
                  {group.label}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {group.items.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 8, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.05 + skillIdx * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border border-border/80 bg-surface/90 backdrop-blur-md text-text-hi font-sans text-xs font-semibold px-4 py-2 rounded-full shadow-[0_2px_8px_var(--shadow-warm-soft)] transition-[border-color,color,box-shadow,transform] duration-300 hover:border-accent hover:text-accent hover:scale-[1.03] cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
