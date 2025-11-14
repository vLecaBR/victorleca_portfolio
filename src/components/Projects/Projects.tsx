import { motion, useInView } from "motion/react";
import { useRef, useState, useMemo } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp, Server } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


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
  };
  images: string[];
  githubUrlFront?: string;
  githubUrlBack?: string;
  liveUrl?: string;
  hosting?: {
    frontend?: string;
    backend?: string;
  };
  githubUrl?: string; // retrocompatibilidade
}

// Utility function
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Button
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

// Badge
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow]",
  {
    variants: {
      variant: {
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return <Comp className={cn(badgeVariants({ variant }), className)} {...props} />;
}

// COMPONENTE PRINCIPAL
export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const { language } = useLanguage();
  const t = translations[language].projects;

  const projects: Project[] = useMemo(
    () => (Array.isArray(t.list) ? (t.list as Project[]) : []),
    [t.list],
  );

  return (
    <section id="projects" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-black via-cyan-500/35 to-black" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-size-[80px_80px]" />

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">
            <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent text-4xl md:text-5xl font-extrabold">
              {t.title}
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Lista */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title || index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10">
                <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
                  {/* Imagem */}
                  <div className="relative h-64 md:h-80 overflow-hidden rounded-xl">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
                      <ImageWithFallback
                        src={project.images?.[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </motion.div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="mb-3 text-white">{project.title}</h3>
                      <p className="text-gray-400 mb-4">{project.shortDescription}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags?.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                      className="w-full bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-cyan-400/50"
                    >
                      {expandedProject === index ? (
                        <>
                          {t.showLess} <ChevronUp className="ml-2" size={16} />
                        </>
                      ) : (
                        <>
                          {t.viewDetails} <ChevronDown className="ml-2" size={16} />
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Detalhes */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedProject === index ? "auto" : 0,
                    opacity: expandedProject === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 md:p-8 pt-6 border-t border-white/10">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-white mb-3">{t.aboutProject}</h4>
                        <p className="text-gray-400 leading-relaxed mb-4">
                          {project.fullDescription}
                        </p>

                        <h4 className="text-white mb-3">{t.keyFeatures}</h4>
                        <ul className="space-y-2">
                          {project.features?.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-400">
                              <span className="text-cyan-400 mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        {project.images?.[1] && (
                        <div className="relative h-200px w-full overflow-hidden rounded-xl mb-4 flex items-center justify-center">
                          <ImageWithFallback
                            src={project.images[1]}
                            alt={`${project.title} - Interface`}
                            className="h-full w-auto object-cover object-center"
                            loading="lazy"
                          />
                        </div>
                      )}


                        <h4 className="text-white mb-3">{t.techStack}</h4>
                        <div className="space-y-3 mb-6">
                          {Object.entries(project.technologies || {}).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-cyan-400 capitalize">{key}:</span>
                              <p className="text-gray-400 mt-1">{value as string}</p>
                            </div>
                          ))}
                        </div>

                        {/* Hosting */}
                        {project.hosting && (
                          <div className="p-3 mb-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-sm">
                            <p className="flex items-center gap-2 mb-1">
                              <Server size={16} className="text-cyan-400" />{" "}
                              <strong>Hosting:</strong>
                            </p>
                            {project.hosting.frontend && (
                              <p>Frontend → {project.hosting.frontend}</p>
                            )}
                            {project.hosting.backend && (
                              <p>Backend → {project.hosting.backend}</p>
                            )}
                          </div>
                        )}

                        {/* Links */}
                        <div className="flex flex-col gap-3">
                          {project.githubUrlFront && (
                            <motion.a
                              href={project.githubUrlFront}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/40 transition-all"
                            >
                              <Github size={20} className="text-white" />
                              <span className="text-white">Frontend Repo</span>
                            </motion.a>
                          )}

                          {project.githubUrlBack && (
                            <motion.a
                              href={project.githubUrlBack}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/40 transition-all"
                            >
                              <Github size={20} className="text-white" />
                              <span className="text-white">Backend Repo</span>
                            </motion.a>
                          )}

                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/25"
                            >
                              <ExternalLink size={20} className="text-white" />
                              <span className="text-white">{t.viewLive}</span>
                            </motion.a>
                          )}

                          {!project.githubUrlFront &&
                            !project.githubUrlBack &&
                            !project.liveUrl && (
                              <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center">
                                <p className="text-gray-400 text-sm">
                                  {t.privateCorporate}
                                </p>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 md:mt-12 text-center"
        >
          <p className="text-gray-400 text-sm md:text-base">{t.footer}</p>
        </motion.div>
      </div>
    </section>
  );
}
