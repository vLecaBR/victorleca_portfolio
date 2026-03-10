"use client";

import { m, useInView, LazyMotion, domAnimation } from "motion/react";
import { useRef, useState, useMemo, memo, useCallback } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp, Server } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { useLanguage } from "../../context/LanguageContext";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";

interface Project {
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  tags: string[];
  technologies: {
    frontend?: string;
    backend?: string;
    integration?: string;
    database?: string;
    automation?: string;
    ai?: string;
    tooling?: string;
  };
  images: string[];
  githubUrlFront?: string;
  githubUrlBack?: string;
  liveUrl?: string | null;
  hosting?: {
    frontend?: string | null;
    backend?: string | null;
  };
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// RESTAURADO: Estilos originais com gradientes e hover
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-cyan-400/50",
        ghost: "hover:bg-accent dark:hover:bg-accent/50",
        gradient: "bg-linear-to-r from-cyan-500 to-blue-600 text-white border-0 shadow-lg shadow-cyan-500/25 hover:from-cyan-600 hover:to-blue-700 hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-10 rounded-md px-6",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = memo(function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
});

const Badge = memo(({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 px-3 py-1 text-xs font-medium transition-colors">
    {children}
  </span>
));

export const Projects = memo(function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const { t } = useLanguage();
  const projectsT = t.projects;

  const projectsList = useMemo(
    () => (Array.isArray(projectsT.list) ? (projectsT.list as unknown as Project[]) : []),
    [projectsT.list]
  );

  const handleToggleExpand = useCallback((index: number) => {
    setExpandedProject(prev => prev === index ? null : index);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative py-32 px-4 overflow-hidden w-full h-full" ref={ref}>
        <div className="absolute inset-0 bg-linear-to-b from-black via-cyan-500/10 to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-size-[80px_80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">
              <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent text-4xl md:text-5xl font-extrabold tracking-tight">
                {projectsT.title}
              </span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">{projectsT.subtitle}</p>
          </m.div>

          <div className="space-y-12">
            {projectsList.map((project, index) => {
              const isExpanded = expandedProject === index;
              
              // Verificação de links para lógica de exibição
              const hasLinks = project.githubUrlFront || project.githubUrlBack || project.liveUrl;

              return (
                <m.div
                  key={project.title || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-300">
                    <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                      {/* Imagem Principal */}
                      <div className="relative aspect-video md:h-80 overflow-hidden rounded-xl bg-white/5 border border-white/5">
                        <m.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} className="h-full w-full">
                          <ImageWithFallback
                            src={project.images?.[0]}
                            alt={project.title}
                            width={800} height={450}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </m.div>
                      </div>

                      <div className="flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                          <p className="text-gray-400 mb-6 line-clamp-3">{project.shortDescription}</p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags?.map((tag) => <Badge key={tag}>{tag}</Badge>)}
                          </div>
                        </div>

                        <Button
                          onClick={() => handleToggleExpand(index)}
                          variant="outline"
                          className="w-full"
                        >
                          {isExpanded ? (
                            <> {projectsT.showLess} <ChevronUp className="ml-2" size={16} /> </>
                          ) : (
                            <> {projectsT.viewDetails} <ChevronDown className="ml-2" size={16} /> </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <m.div
                      initial={false}
                      animate={{ height: isExpanded ? "auto" : 0 }}
                      style={{ overflow: "hidden", willChange: "height", transform: "translateZ(0)" }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="p-6 md:p-8 pt-0 border-t border-white/10 bg-white/1">
                        <div className="grid md:grid-cols-2 gap-10 mt-8">
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-cyan-400 font-semibold mb-3 uppercase tracking-wider text-xs">{projectsT.aboutProject}</h4>
                              <p className="text-gray-300 text-sm leading-relaxed">{project.fullDescription}</p>
                            </div>
                            <div>
                              <h4 className="text-cyan-400 font-semibold mb-3 uppercase tracking-wider text-xs">{projectsT.keyFeatures}</h4>
                              <ul className="grid grid-cols-1 gap-2">
                                {project.features?.map((f, i) => (
                                  <li key={i} className="flex items-start gap-3 text-gray-400 text-xs">
                                    <span className="text-cyan-500 mt-1">▹</span> {f}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="space-y-6">
                            {project.images?.[1] && (
                              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/5 bg-black/20">
                                <ImageWithFallback
                                  src={project.images[1]}
                                  alt={`${project.title} UI`}
                                  width={600} height={338}
                                  className="h-full w-full object-contain opacity-80"
                                  loading="lazy"
                                />
                              </div>
                            )}

                            {/* Tech Stack */}
                            <div>
                              <h4 className="text-cyan-400 font-semibold mb-3 uppercase tracking-wider text-xs">{projectsT.techStack}</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {Object.entries(project.technologies || {}).map(([key, value]) => (
                                  <div key={key} className="text-xs">
                                    <span className="text-gray-500 capitalize font-medium">{key}:</span>
                                    <p className="text-gray-300 mt-0.5">{value as string}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* LINKS RESTAURADOS E CORRIGIDOS */}
                            <div className="pt-4 border-t border-white/5 space-y-4">
                              {project.hosting && (
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <Server size={14} className="text-cyan-500/50" />
                                  <span>
                                    {project.hosting.frontend && `Front: ${project.hosting.frontend}`}
                                    {project.hosting.backend && ` | Back: ${project.hosting.backend}`}
                                  </span>
                                </div>
                              )}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {project.githubUrlFront && (
                                  <Button asChild variant="outline" size="sm">
                                    <a href={project.githubUrlFront} target="_blank" rel="noopener noreferrer">
                                      <Github size={16} /> Frontend Repo
                                    </a>
                                  </Button>
                                )}
                                {project.githubUrlBack && (
                                  <Button asChild variant="outline" size="sm">
                                    <a href={project.githubUrlBack} target="_blank" rel="noopener noreferrer">
                                      <Github size={16} /> Backend Repo
                                    </a>
                                  </Button>
                                )}
                                {project.liveUrl && (
                                  <Button 
                                    asChild 
                                    variant="gradient" 
                                    size="sm" 
                                    className={cn((project.githubUrlFront || project.githubUrlBack) ? "sm:col-span-2" : "sm:col-span-1")}
                                  >
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink size={16} /> {projectsT.viewLive}
                                    </a>
                                  </Button>
                                )}
                              </div>
                              
                              {!hasLinks && (
                                <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-lg text-center">
                                  <p className="text-cyan-400/70 text-xs italic">{projectsT.privateCorporate}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </m.div>
                  </div>
                </m.div>
              );
            })}
          </div>

          <m.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="mt-16 text-center"
          >
            <p className="text-gray-500 text-sm italic">{projectsT.footer}</p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
});