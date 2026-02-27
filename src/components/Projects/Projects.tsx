"use client";

import { m, useInView, LazyMotion, domAnimation } from "motion/react";
import { useRef, useState, useMemo, memo } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp, Server } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { useLanguage } from "../../context/LanguageContext";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";

// Tipagem para os projetos conforme sua estrutura de tradução
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

// Button Memoized
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-10 rounded-md px-6",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = memo(function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
});

// Badge Memoized
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 transition-[color,box-shadow]",
  {
    variants: {
      variant: {
        outline: "text-foreground hover:bg-accent",
      },
    },
    defaultVariants: { variant: "outline" },
  },
);

const Badge = memo(function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return <Comp className={cn(badgeVariants({ variant }), className)} {...props} />;
});

export const Projects = memo(function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  
  // Pegamos 't' do contexto (tradução filtrada)
  const { t } = useLanguage();
  const projectsT = t.projects;

  // Garantimos que a lista de projetos siga a interface correta
  const projectsList = useMemo(
    () => (Array.isArray(projectsT.list) ? (projectsT.list as unknown as Project[]) : []),
    [projectsT.list]
  );

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative py-32 px-4 overflow-hidden w-full h-full" ref={ref}>
        
        {/* Backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-500/10 to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 50 }}
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

          {/* Lista de Projetos */}
          <div className="space-y-12">
            {projectsList.map((project, index) => (
              <m.div
                key={project.title || index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/40 transition-all duration-500 shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                    {/* Imagem Principal */}
                    <div className="relative aspect-video md:h-80 overflow-hidden rounded-xl border border-white/5 bg-white/5">
                      <m.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} className="h-full w-full">
                        <ImageWithFallback
                          src={project.images?.[0]}
                          alt={project.title}
                          // MUDANÇA: Tamanhos explícitos ajudam o motor do Chrome a calcular o layout instantaneamente
                          width={800} 
                          height={450}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </m.div>
                    </div>

                    {/* Conteúdo Resumido */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                        <p className="text-gray-400 mb-6 line-clamp-3">{project.shortDescription}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags?.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="border-cyan-400/20 bg-cyan-400/5 text-cyan-300 px-3 py-1"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                        className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cyan-400/50"
                      >
                        {expandedProject === index ? (
                          <>
                            {projectsT.showLess} <ChevronUp className="ml-2" size={16} />
                          </>
                        ) : (
                          <>
                            {projectsT.viewDetails} <ChevronDown className="ml-2" size={16} />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Detalhes Expandidos */}
                  <m.div
                    initial={false}
                    animate={{
                      height: expandedProject === index ? "auto" : 0,
                      opacity: expandedProject === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 md:p-8 pt-6 border-t border-white/10 bg-white/[0.02]">
                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-cyan-400 font-semibold mb-3 uppercase tracking-wider text-xs">{projectsT.aboutProject}</h4>
                            <p className="text-gray-300 leading-relaxed">{project.fullDescription}</p>
                          </div>

                          <div>
                            <h4 className="text-cyan-400 font-semibold mb-3 uppercase tracking-wider text-xs">{projectsT.keyFeatures}</h4>
                            <ul className="grid grid-cols-1 gap-2">
                              {project.features?.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                                  <span className="text-cyan-500 mt-1">▹</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {/* Segunda Imagem Otimizada */}
                          {project.images?.[1] && (
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/5 shadow-inner bg-black/20 flex items-center justify-center">
                              <ImageWithFallback
                                src={project.images[1]}
                                alt={`${project.title} Interface`}
                                width={600}
                                height={338}
                                className="h-full w-auto object-contain opacity-80"
                                loading="lazy"
                              />
                            </div>
                          )}

                          <div>
                            <h4 className="text-cyan-400 font-semibold mb-3 uppercase tracking-wider text-xs">{projectsT.techStack}</h4>
                            <div className="grid grid-cols-1 gap-3">
                              {Object.entries(project.technologies || {}).map(([key, value]) => (
                                <div key={key} className="text-sm">
                                  <span className="text-gray-500 capitalize font-medium">{key}:</span>
                                  <p className="text-gray-300 mt-0.5">{value as string}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Hosting & Links */}
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
                                <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                  <a href={project.githubUrlFront} target="_blank" rel="noopener noreferrer">
                                    <Github size={18} /> Repo Front
                                  </a>
                                </Button>
                              )}
                              {project.githubUrlBack && (
                                <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                  <a href={project.githubUrlBack} target="_blank" rel="noopener noreferrer">
                                    <Github size={18} /> Repo Back
                                  </a>
                                </Button>
                              )}
                              {project.liveUrl && (
                                <Button asChild className="sm:col-span-2 bg-linear-to-r from-cyan-500 to-blue-600 border-0 text-white shadow-lg shadow-cyan-500/20">
                                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink size={18} /> {projectsT.viewLive}
                                  </a>
                                </Button>
                              )}
                            </div>
                            
                            {!project.githubUrlFront && !project.liveUrl && (
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
            ))}
          </div>

          {/* Footer Info */}
          <m.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-500 text-sm italic">{projectsT.footer}</p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
});