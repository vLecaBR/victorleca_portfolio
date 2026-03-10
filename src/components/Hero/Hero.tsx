import React, { useMemo, useState, useEffect, memo } from "react";
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

// --- UI Components (Mantidos) ---
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input",
      },
      size: {
        default: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

const Badge = memo(({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={cn("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium border-cyan-400/30 bg-cyan-400/5 text-cyan-300 backdrop-blur-sm", className)}>
    {children}
  </span>
));

// --- OTIMIZAÇÃO: Componente de Nome Estático para evitar re-calculo de filtro ---
const StaticName = memo(() => (
  <div className="inline-block relative">
    <div className="absolute inset-0 bg-cyan-400 blur-[80px] opacity-20 pointer-events-none" />
    <div className="relative px-8 py-5 border border-cyan-400/30 rounded-full bg-black/60 backdrop-blur-md">
      <h1 className="text-4xl md:text-6xl lg:text-7xl bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">
        Victor Leça
      </h1>
    </div>
  </div>
));

export function Hero() {
  const { scrollY } = useScroll();
  // Otimização: useTransform fora do render loop principal se possível
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityTransform = useTransform(scrollY, [0, 500], [1, 0]);
  
  const { t } = useLanguage();
  const heroT = t.hero;

  const mainTechs = useMemo(
    () => ["ReactJS", "React Native", "NodeJS", "TypeScript", "Power Platform", "Tailwind CSS"],
    []
  );

  // REDUÇÃO AGRESSIVA: Apenas 12 partículas para liberar a Main Thread
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const generated = [...Array(12)].map((_, i) => ({
      id: i,
      size: Math.random() * 150 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 10 + 10}s`,
      moveX: `${Math.random() * 40 - 20}px`,
      moveY: `${Math.random() * 40 - 20}px`,
    }));
    setParticles(generated);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background fixo - Não animado via JS */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-blue-950/40 to-black -z-10" />
      
      {/* OTIMIZAÇÃO: Partículas via CSS puro para liberar o JS (Melhora INP) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bg-blue-500/10 rounded-full blur-xl"
            style={{ 
              width: p.size, 
              height: p.size, 
              left: p.left, 
              top: p.top,
              willChange: "transform, opacity",
              transform: "translateZ(0)", // Force GPU
              animation: `float-particle ${p.duration} infinite ease-in-out ${p.delay}`
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0) translateZ(0); opacity: 0.1; }
          50% { transform: translate(20px, -20px) translateZ(0); opacity: 0.2; }
        }
      `}} />

      <LazyMotion features={domAnimation}>
        <motion.div
          style={{ y, opacity: opacityTransform }}
          className="relative z-10 text-center px-4 max-w-6xl mx-auto w-full"
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mb-4">
            <span className="block text-gray-300 text-3xl md:text-4xl">{heroT.greeting}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="mb-4 min-h-[100px] flex items-center justify-center">
            <StaticName />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
            <div className="inline-block px-6 py-2 border border-cyan-400/20 rounded-full bg-cyan-400/5">
              <p className="text-cyan-400 font-medium tracking-wide">{heroT.role}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
             <div dangerouslySetInnerHTML={{ __html: heroT.description }} />
          </motion.div>

          <div className="flex flex-wrap gap-3 justify-center mb-12 max-w-2xl mx-auto">
            {mainTechs.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-transform text-white border-0"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Rocket size={18} />
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
          </div>
        </motion.div>
      </LazyMotion>
    </section>
  );
}