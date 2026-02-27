"use client";

import { motion, useInView } from "motion/react";
import { useRef, useMemo, memo } from "react";
import { useLanguage } from "../../context/LanguageContext";

// Componentes de ícones memoizados
const FrontendIcon = memo(() => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <path d="M14.25 9.75L16.5 12L14.25 14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.75 14.25L7.5 12L9.75 9.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
));

const BackendIcon = memo(() => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 5V19C3 20.66 7.03 22 12 22C16.97 22 21 20.66 21 19V5" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 12C3 13.66 7.03 15 12 15C16.97 15 21 13.66 21 12" stroke="currentColor" strokeWidth="2"/>
  </svg>
));

const PowerIcon = memo(() => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
));

const DesignIcon = memo(() => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <circle cx="13.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="6.5" cy="17.5" r="4.5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17.5" cy="17.5" r="4.5" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 10L8.5 15" stroke="currentColor" strokeWidth="2"/>
    <path d="M15 10L15.5 15" stroke="currentColor" strokeWidth="2"/>
  </svg>
));

export const Skills = memo(function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Pegamos 't' (tradução filtrada) direto do contexto
  const { t } = useLanguage();
  const skillsT = t.skills;

  const skillCategories = useMemo(() => [
    {
      name: "Frontend & Mobile",
      icon: <FrontendIcon />,
      color: "from-purple-400 to-pink-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-400/30",
      skills: skillsT.hardSkills.frontend,
    },
    {
      name: "Backend & Database",
      icon: <BackendIcon />,
      color: "from-blue-400 to-cyan-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-400/30",
      skills: skillsT.hardSkills.backend.concat(skillsT.hardSkills.databases),
    },
    {
      name: "Power Platform & Automation",
      icon: <PowerIcon />,
      color: "from-yellow-400 to-orange-600",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-400/30",
      skills: skillsT.hardSkills.other,
    },
    {
      name: "Soft Skills & Tools",
      icon: <DesignIcon />,
      color: "from-green-400 to-emerald-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-400/30",
      skills: skillsT.softSkills,
    },
  ], [skillsT]);

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background simplificado para performance */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/20 to-black" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(129,140,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(129,140,248,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />

      {/* Orbs Decorativos */}
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"
        animate={isInView ? { scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">
            <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent text-4xl md:text-5xl font-extrabold tracking-tight">
              {skillsT.title}
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">{skillsT.subtitle}</p>
        </motion.div>

        {/* Grid de Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 ${category.bgColor} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity`} />
              <div className={`relative p-8 bg-black/40 backdrop-blur-md border ${category.borderColor} rounded-2xl hover:border-white/20 transition-all duration-500`}>
                <div className="flex items-center gap-5 mb-8">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`p-3.5 rounded-xl bg-linear-to-r ${category.color} shadow-lg shadow-black/20 text-white`}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, j) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: i * 0.1 + j * 0.05 }}
                      whileHover={{ y: -2 }}
                      className={`px-4 py-2 rounded-full border ${category.borderColor} bg-white/5 backdrop-blur-sm text-gray-300 text-sm hover:text-white hover:bg-white/10 transition-all`}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm md:text-base italic">{skillsT.footer}</p>
        </motion.div>
      </div>
    </section>
  );
});