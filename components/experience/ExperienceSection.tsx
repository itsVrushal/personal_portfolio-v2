"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { use3DScroll } from "@/lib/use3DScroll";

export default function ExperienceSection() {
  const { ref, rotateX, translateY, opacity, scale } = use3DScroll({ initialRotateX: 10, initialY: 60 });
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const toggle = (index: number) =>
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }));

  return (
    <motion.section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="pt-24 pb-16 relative"
      style={{ rotateX, y: translateY, opacity, scale }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="font-syne text-4xl md:text-[3.25rem] leading-[1.05] font-bold text-text-hi">
            Experience.
          </h2>
        </div>

        {/* One surface, divided rows: the roles read together as a record. */}
        <div className="rounded-2xl border border-border bg-surface/60 overflow-hidden">
          {experience.roles.map((exp, index) => {
            const isOpen = !!open[index];
            const panelId = `experience-detail-${index}`;

            return (
              <div
                key={index}
                className="border-b border-border last:border-b-0"
              >
                <motion.div
                  initial={{ y: 16 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 md:px-8 md:py-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center gap-4 md:gap-8">
                    <div>
                      <h3 className="font-syne text-2xl font-bold text-text-hi">
                        {exp.company}
                      </h3>
                      <p className="text-text-lo font-sans text-sm mt-0.5">
                        {exp.role}
                      </p>
                    </div>

                    {exp.period && (
                      <div className="font-sans text-xs font-bold text-accent bg-accent-dim px-3 py-1 rounded-full w-fit border border-accent/20">
                        {exp.period}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="inline-flex items-center gap-1.5 min-h-11 w-fit font-sans text-xs font-bold text-text-hi border-b border-border hover:text-accent hover:border-accent transition-[color,border-color] duration-300 cursor-pointer"
                    >
                      {isOpen ? "Hide details" : "Details"}
                      <svg
                        className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>

                  {isOpen && (
                    <ul id={panelId} className="flex flex-col gap-3 mt-5 max-w-[75ch]">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start text-text-lo text-sm leading-relaxed">
                          <span className="text-accent mr-3 mt-1.5 opacity-60 text-xs" aria-hidden="true">▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
