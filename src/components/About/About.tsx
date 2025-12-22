"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { Code2, Sparkles, Zap } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";

export function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const t = translations[language].about;

  // useMemo evita recriar o array de features em cada render
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

  return (
    <section id="about" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-black via-blue-950/20 to-black" />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(6,182,212,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Efeitos decorativos animados (GPU-friendly) */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl will-change-transform"
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
      <motion.div
        className="absolute bottom-32 left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl will-change-transform"
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">
            <span className="bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent text-4xl md:text-5xl font-extrabold">
              {t.title}
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative p-6 md:p-8 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-400/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-linear-to-r from-cyan-400 to-blue-600 rounded-xl"
                >
                  <Icon size={28} className="text-white" />
                </motion.div>
                <h3 className="mb-3 text-white">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 md:mt-16 p-6 md:p-8 bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-white/10 backdrop-blur-sm"
        >
          <h3 className="mb-4 text-white">{t.journeyTitle}</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            {t.journeyParagraph1}
          </p>
          <p className="text-gray-400 leading-relaxed">
            {t.journeyParagraph2}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
