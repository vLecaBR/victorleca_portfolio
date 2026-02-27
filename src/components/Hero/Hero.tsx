import React, { useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform, LazyMotion, domAnimation } from "motion/react";
import { Rocket } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Componentes de UI ---
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-8",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap transition-[color,box-shadow]",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        outline: "text-foreground [a&]:hover:bg-accent",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({ className, variant, asChild = false, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return <Comp className={cn(badgeVariants({ variant }), className)} {...props} />;
}

interface ParticleData {
  id: number; width: number; height: number; left: string; top: string; moveX: number; moveY: number; duration: number;
}

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityTransform = useTransform(scrollY, [0, 500], [1, 0]);
  
  // Pegamos o 't' (tradução já filtrada pelo idioma) do contexto
  const { t } = useLanguage();
  
  // Acesso direto ao conteúdo do Hero
  const heroT = t.hero;

  const mainTechs = useMemo(
    () => ["ReactJS", "React Native", "NodeJS", "TypeScript", "Power Platform", "Tailwind CSS"],
    []
  );

  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    const generated = [...Array(18)].map((_, i) => ({
      id: i,
      width: Math.random() * 200 + 50,
      height: Math.random() * 200 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      moveX: Math.random() * 60 - 30,
      moveY: Math.random() * 60 - 30,
      duration: Math.random() * 8 + 8,
    }));
    setParticles(generated);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 will-change-transform"
    >
      <div className="absolute inset-0 bg-linear-to-br from-black via-blue-950/40 to-black -z-10" />
      
      <div className="absolute inset-0 -z-10">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-blue-500/10 rounded-full blur-xl"
            style={{ width: p.width, height: p.height, left: p.left, top: p.top }}
            animate={{ x: [0, p.moveX], y: [0, p.moveY], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <LazyMotion features={domAnimation}>
        <motion.div
          style={{ y, opacity: opacityTransform }}
          className="relative z-10 text-center px-4 max-w-6xl mx-auto w-full"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 min-h-11"
          >
            <span className="block text-gray-300 text-3xl md:text-4xl">{heroT.greeting}</span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-4 min-h-[100px] flex items-center justify-center"
          >
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-cyan-400 blur-[80px] opacity-20 animate-pulse" />
              <div className="relative px-8 py-5 border border-cyan-400/30 rounded-full bg-black/60 backdrop-blur-md">
                <h1 className="text-4xl md:text-6xl lg:text-7xl bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">
                  Victor Leça
                </h1>
              </div>
            </div>
          </motion.div>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 min-h-10 flex items-center justify-center"
          >
            <div className="px-6 py-2 border border-cyan-400/20 rounded-full bg-cyan-400/5">
              <p className="text-cyan-400 font-medium tracking-wide">{heroT.role}</p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed min-h-[60px]"
          >
             <div dangerouslySetInnerHTML={{ __html: heroT.description }} />
          </motion.div>

          {/* Techs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3 justify-center mb-12 max-w-2xl mx-auto"
          >
            {mainTechs.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="border-cyan-400/30 bg-cyan-400/5 text-cyan-300 px-4 py-1.5 backdrop-blur-sm"
              >
                {tech}
              </Badge>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-transform text-white border-0"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Rocket className="mr-2" size={18} />
              {heroT.viewProjects}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
              onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            >
              {heroT.aboutMe}
            </Button>
          </motion.div>
        </motion.div>
      </LazyMotion>
    </section>
  );
}