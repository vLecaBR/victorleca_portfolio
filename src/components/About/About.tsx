"use client";

import { useRef, useMemo } from "react";
import { m, useInView, LazyMotion, domAnimation } from "motion/react";
import { Code2, Sparkles, Zap, Rocket, Users, Award } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";

export function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  
  // Memoização das traduções para evitar recalculos
  const t = useMemo(() => translations[language].about, [language]);
  
  // Fallback seguro: se não tiver stats no 'about', pega do 'hero'
  const tStats = useMemo(() => 
    // CORREÇÃO: Mudado de @ts-ignore para @ts-expect-error para passar no Lint
    // @ts-expect-error - Ignorando erro de tipagem caso a chave não exista ainda no arquivo
    translations[language].about?.stats || translations[language].hero.stats, 
    [language]
  );

  const features = useMemo(
    () => [
      {
        icon: Code2,
        title: t.features[0].title,
        description: t.features[0].description,
      },
      {
        icon: Zap,
        title: t.features[1].title,
        description: t.features[1].description,
      },
      {
        icon: Sparkles,
        title: t.features[2].title,
        description: t.features[2].description,
      },
    ],
    [t.features]
  );

  const stats = useMemo(
    () => [
      { icon: Code2, value: "4+", label: tStats.experience },
      { icon: Rocket, value: "50+", label: tStats.processes },
      { icon: Users, value: "Multi", label: tStats.collaboration },
      { icon: Award, value: "100%", label: tStats.dedication },
    ],
    [tStats]
  );

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative py-32 px-4 overflow-hidden w-full h-full">
        
        {/* Fundo com brilho central Azul */}
        <div className="absolute inset-0 bg-linear-to-b from-black via-blue-600/35 to-black pointer-events-none" />

        {/* Grade com linhas Ciano */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.15)_1px,transparent_1px)] bg-size-[30px_30px] pointer-events-none" />

        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(6,182,212,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Efeitos decorativos (Blobs) */}
        <m.div
          className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl will-change-transform pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <m.div
          className="absolute bottom-32 left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl will-change-transform pointer-events-none"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative max-w-6xl mx-auto" ref={ref}>
          {/* Title Header */}
          <m.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">
              <span className="bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent text-4xl md:text-5xl font-extrabold">
                {t.title}
              </span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">{t.subtitle}</p>
          </m.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {features.map(({ icon: Icon, title, description }, index) => (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative p-6 md:p-8 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-400/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10 h-full">
                  <m.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-linear-to-r from-cyan-400 to-blue-600 rounded-xl"
                  >
                    <Icon size={28} className="text-white" />
                  </m.div>
                  <h3 className="mb-3 text-white font-bold text-xl">{title}</h3>
                  <p className="text-gray-400 leading-relaxed">{description}</p>
                </div>
              </m.div>
            ))}
          </div>

          {/* Stats Section */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 w-full"
          >
            {stats.map((stat, index) => (
              <m.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group will-change-transform"
              >
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative p-4 md:p-5 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-cyan-400/50 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/5 h-full flex flex-col justify-between">
                  <div>
                    <m.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex items-center justify-center w-10 h-10 mb-3 bg-linear-to-br from-cyan-400/20 to-blue-600/20 rounded-lg"
                    >
                      <stat.icon size={20} className="text-cyan-400" />
                    </m.div>
                    <div className="text-2xl md:text-3xl font-bold bg-linear-to-br from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm md:text-base text-gray-400 font-medium">{stat.label}</div>
                </div>
              </m.div>
            ))}
          </m.div>

          {/* Journey Text */}
          <m.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 md:mt-16 p-6 md:p-8 bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-white/10 backdrop-blur-sm"
          >
            <h3 className="mb-4 text-white text-2xl font-semibold">{t.journeyTitle}</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              {t.journeyParagraph1}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {t.journeyParagraph2}
            </p>
          </m.div>

        </div>
      </section>
    </LazyMotion>
  );
}