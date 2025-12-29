import React, { useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform, LazyMotion, domAnimation } from "motion/react";
import { Rocket } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility & Components (Mantidos iguais para preservar estilo) ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
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
  }
);

function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, asChild = false, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

// --- Definição de Partícula para TypeScript ---
interface Particle {
  id: number;
  width: number;
  height: number;
  left: string;
  top: string;
  moveX: number;
  moveY: number;
  duration: number;
}

// --- HERO SECTION ---
export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 900], [1, 0]);
  const { language } = useLanguage();
  const t = translations[language].hero;

  // Estado para armazenar as partículas apenas no cliente
  const [particles, setParticles] = useState<Particle[]>([]);

  // OTIMIZAÇÃO 1: Gerar posições aleatórias APENAS após a montagem do componente.
  // Isso evita Hydration Mismatch (Server HTML != Client HTML) que mata a performance.
  useEffect(() => {
    const generatedParticles = [...Array(30)].map((_, i) => ({ // Reduzi para 30 (50 é muito para mobile)
      id: i,
      width: Math.random() * 300 + 50,
      height: Math.random() * 300 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      moveX: Math.random() * 100 - 50,
      moveY: Math.random() * 100 - 50,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(generatedParticles);
  }, []);

  const mainTechs = useMemo(
    () => ["ReactJS", "React Native", "NodeJS", "TypeScript", "Power Platform", "Tailwind CSS"],
    []
  );

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      // O ID 'home' é crucial para a Navbar funcionar
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 will-change-transform"
    >
      <div className="absolute inset-0 bg-linear-to-br from-black via-blue-950 to-black">
        {/* Renderiza partículas apenas quando existirem (client-side) */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-blue-500/20 rounded-full will-change-transform"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              x: [0, particle.moveX],
              y: [0, particle.moveY],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <LazyMotion features={domAnimation}>
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 text-center px-4 max-w-6xl mx-auto w-full"
        >
          {/* Greetings - Use h2/span para semântica leve */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6"
          >
            {/* content-visibility: auto ajuda o browser a priorizar o render */}
            <span className="block text-gray-300 mb-4 text-4xl font-light">{t.greeting}</span>
          </motion.div>

          {/* Name - LCP Element (Prioridade Máxima) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="mb-4"
          >
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-400 to-blue-600 blur-3xl opacity-40 animate-pulse" />
              <div className="relative px-10 py-7 pb-8 border border-cyan-400/50 rounded-full bg-black/40 backdrop-blur-sm">
                <h1 className="text-4xl md:text-5xl lg:text-6xl bg-linear-to-br from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent whitespace-nowrap leading-tight font-bold tracking-tight">
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
                <p className="text-cyan-400 font-medium">{t.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg mb-10 max-w-3xl mx-auto leading-relaxed px-4 min-h-[60px]" // min-h evita CLS se a fonte demorar
          >
             {/* Renderização segura do HTML */}
             <p dangerouslySetInnerHTML={{ __html: t.description }} />
          </motion.div>

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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-4 justify-center mb-12 p-8"
          >
            <Button
              className="bg-linear-to-br from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white border-0 px-8 cursor-pointer"
              onClick={() => handleScrollTo("#projects")}
            >
              <Rocket className="mr-2" size={18} />
              {t.viewProjects}
            </Button>
            <Button
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-cyan-400/50 px-8 cursor-pointer"
              onClick={() => handleScrollTo("#about")}
            >
              {t.aboutMe}
            </Button>
          </motion.div>

        </motion.div>
      </LazyMotion>
    </section>
  );
}