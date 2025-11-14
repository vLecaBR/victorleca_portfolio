import React, { useMemo } from "react";
import { motion, useScroll, useTransform, LazyMotion, domAnimation } from "motion/react";
import { Github, Linkedin, Code2, Rocket, Users, Award } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Button component
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
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
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

// Badge component
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

// HERO SECTION
export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 900], [1, 0]);
  const { language } = useLanguage();
  const t = translations[language].hero;

  // useMemo evita recriar arrays toda renderização
  const stats = useMemo(
    () => [
      { icon: Code2, value: "4+", label: t.stats.experience },
      { icon: Rocket, value: "50+", label: t.stats.processes },
      { icon: Users, value: "Multi", label: t.stats.collaboration },
      { icon: Award, value: "100%", label: t.stats.dedication },
    ],
    [t]
  );

  const mainTechs = useMemo(
    () => ["ReactJS", "React Native", "NodeJS", "TypeScript", "Power Platform", "Tailwind CSS"],
    []
  );

  // LazyMotion carrega framer-motion de forma mais leve
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 will-change-transform"
    >
      <div className="absolute inset-0 bg-linear-to-br from-black via-blue-950 to-black">
        {/* useMemo + map fixo para não recriar elementos */}
        {useMemo(
          () =>
            [...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-blue-500/20 rounded-full will-change-transform"
                style={{
                  width: Math.random() * 300 + 50,
                  height: Math.random() * 300 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )),
          []
        )}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <LazyMotion features={domAnimation}>
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 text-center px-4 max-w-6xl mx-auto w-full"
        >
          {/* Greetings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6"
          >
            <span className="block text-gray-300 mb-4 text-4xl">{t.greeting}</span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="mb-4"
          >
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-400 to-blue-600 blur-3xl opacity-40 animate-pulse" />
              <div className="relative px-10 py-7 pb-8 border border-cyan-400/50 rounded-full bg-black/40 backdrop-blur-sm">
                <h1 className="text-4xl md:text-5xl lg:text-6xl bg-linear-to-br from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent whitespace-nowrap leading-tight">
                  Victor Leça
                </h1>
              </div>
            </div>
          </motion.div>

          {/* Role */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
            className="mb-8"
          >
            <div className="inline-block relative">
              <div className="relative px-6 py-2 border border-cyan-400/50 rounded-full bg-black/40 backdrop-blur-sm">
                <p className="text-cyan-400">{t.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg mb-10 max-w-3xl mx-auto leading-relaxed px-4"
            dangerouslySetInnerHTML={{ __html: t.description }}
          />

          {/* Techs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-3 justify-center mb-8 max-w-2xl mx-auto"
          >
            {mainTechs.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge
                  variant="outline"
                  className="border-cyan-400/30 bg-cyan-400/5 text-cyan-400 hover:bg-cyan-400/10 backdrop-blur-sm px-4 py-1.5"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-14 max-w-4xl mx-auto px-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group will-change-transform"
              >
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative p-4 md:p-5 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-cyan-400/50 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/5">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-10 h-10 mb-2 bg-linear-to-br from-cyan-400/20 to-blue-600/20 rounded-lg"
                  >
                    <stat.icon size={20} className="text-cyan-400" />
                  </motion.div>
                  <div className="bg-linear-to-br from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-4 justify-center mb-12 p-8"
          >
            <Button
              className="bg-linear-to-br from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white border-0 px-8"
              onClick={() =>
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Rocket className="mr-2" size={18} />
              {t.viewProjects}
            </Button>
            <Button
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-cyan-400/50 px-8"
              onClick={() =>
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {t.aboutMe}
            </Button>
          </motion.div>

          {/* Socials */}
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="hidden md:flex gap-6 justify-center mb-8"
        >
          {[
            { icon: Github, href: "https://github.com/vLecaBR", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/victor-leca-vlkbr/", label: "LinkedIn" },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:border-cyan-400/50 transition-all duration-300">
                <social.icon size={24} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        </motion.div>
      </LazyMotion>
    </section>
  );
}
