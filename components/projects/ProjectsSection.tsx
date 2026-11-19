"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import { projects, personalInfo, Project } from "@/lib/data";
import { use3DScroll } from "@/lib/use3DScroll";

const CATEGORIES = [
  "All",
  "Computer Vision",
  "Deep Learning & AI",
  "Agentic & Systems",
  "Web & Systems",
] as const;
type Category = (typeof CATEGORIES)[number];

function LinkChip({
  url,
  label,
  title,
  icon,
}: {
  url: string;
  label: string;
  title: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      title={title}
      className="inline-flex items-center gap-1.5 font-sans text-[11px] font-bold px-3 py-1 rounded-full bg-surface text-text-hi border border-border hover:border-accent hover:text-accent transition-[color,border-color] duration-300 flex-shrink-0"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function ExternalIcon() {
  return (
    <svg
      className="w-3 h-3 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
    </svg>
  );
}

function ColabLink({ url, projectName }: { url: string; projectName: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${projectName} notebook in Google Colab`}
      className="inline-flex items-center gap-1.5 font-sans text-[11px] font-bold px-3 py-1 rounded-full bg-accent-dim text-accent border border-accent/30 hover:bg-accent/10 hover:border-accent/50 transition-[background-color,border-color] duration-300 flex-shrink-0"
      title={`Open ${projectName} in Google Colab`}
    >
      <svg className="w-3.5 h-3.5 fill-current flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16.9 14.1c1.3-1.3 2.1-3.1 2.1-5.1 0-4-3.2-7.2-7.2-7.2-2 0-3.8.8-5.1 2.1l1.7 1.7c.9-.9 2.1-1.4 3.4-1.4 2.7 0 4.8 2.2 4.8 4.8 0 1.3-.5 2.5-1.4 3.4l1.7 1.7z" />
        <path d="M7.1 9.9C5.8 11.2 5 13 5 15c0 4 3.2 7.2 7.2 7.2 2 0 3.8-.8 5.1-2.1l-1.7-1.7c-.9.9-2.1 1.4-3.4 1.4-2.7 0-4.8-2.2-4.8-4.8 0-1.3.5-2.5 1.4-3.4L7.1 9.9z" />
        <circle cx="15.5" cy="8.5" r="1.5" />
        <circle cx="8.5" cy="15.5" r="1.5" />
      </svg>
      <span>Colab</span>
    </a>
  );
}

export default function ProjectsSection() {
  const { ref, rotateX, translateY, opacity, scale } = use3DScroll({ initialRotateX: 9, initialY: 55 });
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const toggle = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <motion.section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-28 relative"
      style={{ rotateX, y: translateY, opacity, scale }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="font-syne text-4xl md:text-[3.25rem] leading-[1.05] font-bold text-text-hi">
              Things I&apos;ve built.
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Project categories">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-sans text-xs px-3 py-1.5 rounded-full transition-[background-color,color,box-shadow] duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-accent text-accent-ink font-bold shadow-[0_4px_16px_var(--glow-accent-soft)]"
                      : "bg-surface text-text-hi hover:bg-surface/80 border border-border"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-surface/20 text-accent-ink font-bold" : "bg-border/40 text-text-hi font-bold"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project, index: number) => {
              const key = project.name;
              const isOpen = !!open[key];
              const panelId = `project-detail-${index}`;

              return (
                <motion.div
                  key={key}
                  layout="position"
                  initial={{ y: 24 }}
                  animate={{ y: 0 }}
                  exit={{ y: -12 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full min-w-0 flex flex-col col-span-1"
                >
                  <GlassCard className="p-8 md:p-10 h-full min-w-0 flex flex-col group overflow-hidden relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="flex flex-col min-w-0">
                      <h3 className="font-syne text-2xl font-bold text-text-hi">
                        {project.name}
                      </h3>

                      <p className="font-sans text-xs text-text-lo mt-2">
                        {project.organization}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="font-sans text-[11px] font-bold px-2.5 py-1 rounded-full bg-accent-dim text-accent border border-accent/15"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        <button
                          type="button"
                          onClick={() => toggle(key)}
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

                        {(project.link || project.github || project.colab) && (
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            {project.link && (
                              <LinkChip
                                url={project.link}
                                label={project.linkLabel ?? "Live"}
                                title={
                                  project.linkLabel === "PR"
                                    ? `Open the ${project.name} pull request`
                                    : `Open the live ${project.name} site`
                                }
                                icon={<ExternalIcon />}
                              />
                            )}
                            {project.github && (
                              <LinkChip
                                url={project.github}
                                label="Code"
                                title={`View ${project.name} source on GitHub`}
                                icon={<GithubIcon />}
                              />
                            )}
                            {project.colab && (
                              <ColabLink url={project.colab} projectName={project.name} />
                            )}
                          </div>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="panel"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <ul id={panelId} className="flex flex-col gap-2.5 pt-5">
                              {project.description.map((item, i) => (
                                <li key={i} className="flex items-start text-text-lo text-sm leading-relaxed">
                                  <span className="text-accent mr-3 mt-1.5 opacity-60 text-xs" aria-hidden="true">▹</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Closes an odd project count and gives the index somewhere to go next. */}
          <a
            href={`https://${personalInfo.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-full min-w-0 col-span-1 rounded-2xl focus-visible:outline-2"
          >
            <GlassCard className="p-8 md:p-10 h-full min-w-0 flex flex-col justify-center gap-5 group">
              <span className="font-syne text-2xl font-bold text-text-hi">
                More on GitHub
              </span>
              <span className="font-sans text-sm text-text-lo max-w-[28ch]">
                Experiments, notebooks and open-source work.
              </span>
              <span className="font-sans text-xs font-bold text-accent border-b border-accent/40 pb-0.5 w-fit group-hover:border-accent transition-colors duration-300">
                @itsVrushal
              </span>
            </GlassCard>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
