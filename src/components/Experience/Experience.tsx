"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar, Award } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// util
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// badge variants
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 overflow-hidden [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 transition-[color,box-shadow]",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/40",
        outline:
          "text-foreground hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const t = translations[language].experience;

  return (
    <section id="experience" ref={ref} className="relative py-32 px-4 overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.08)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -20, 0],
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-3xl font-semibold">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-transparent" />

          <div className="space-y-12">
            {t.list.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative grid md:grid-cols-2 gap-8 items-start ${
                  index % 2 === 0 ? "" : "md:grid-flow-dense"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/50 z-10">
                  <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-75" />
                </div>

                {/* Content Card */}
                <div
                  className={`${index % 2 === 0 ? "md:text-right" : "md:col-start-2"} ml-16 md:ml-0`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-purple-400/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10"
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start gap-3 mb-2">
                        <Briefcase className="text-purple-400 mt-1 shrink-0" size={20} />
                        <div>
                          <h3 className="text-white mb-1">{exp.position}</h3>
                          <p className="text-purple-400">{exp.company}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-purple-400" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-purple-400" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Tech */}
                    <div className="mb-4">
                      <h4 className="text-white mb-3 text-sm flex items-center gap-2">
                        <Award size={16} className="text-purple-400" />
                        {t.technologies}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech: string, i: number) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-gray-400 text-sm"
                        >
                          <span className="text-purple-400 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-full">
            <Briefcase className="text-purple-400" size={18} />
            <p className="text-gray-300 text-sm">
              <span className="text-purple-400">
                {language === "en"
                  ? "Currently working on exciting projects"
                  : "Atualmente trabalhando em projetos empolgantes"}
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
