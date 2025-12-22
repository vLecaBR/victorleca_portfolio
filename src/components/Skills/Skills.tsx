import { motion, useInView } from "motion/react";
import { useRef, useMemo, memo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";

// Componentes de ícones memoizados (não redesenham)
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
  const { language } = useLanguage();
  const t = translations[language].skills;

  // Usa useMemo para não recriar os arrays em cada render
  const skillCategories = useMemo(() => [
    {
      name: "Frontend & Mobile",
      icon: <FrontendIcon />,
      color: "from-purple-400 to-pink-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-400/30",
      skills: ["ReactJS", "React Native", "TypeScript", "NextJS", "VueJS", "Tailwind CSS", "HTML/CSS", "JavaScript"],
    },
    {
      name: "Backend & Database",
      icon: <BackendIcon />,
      color: "from-blue-400 to-cyan-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-400/30",
      skills: ["NodeJS", "Java", "REST APIs", "Database Design", "PostgreSQL", "MongoDB", "Express"],
    },
    {
      name: "Power Platform & Automation",
      icon: <PowerIcon />,
      color: "from-yellow-400 to-orange-600",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-400/30",
      skills: ["Power Apps", "Power Automate", "SharePoint", "Process Automation", "Digital Transformation", "Microsoft Graph API"],
    },
    {
      name: "Design & Tools",
      icon: <DesignIcon />,
      color: "from-green-400 to-emerald-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-400/30",
      skills: ["Figma", "UX Design", "Vite", "Sass", "Styled Components", "Git", "Agile/Scrum"],
    },
  ], []);

  return (
    <section id="skills" className="relative py-32 px-4 overflow-hidden">
      {/* Backgrounds e layers estáticos (sem alteração visual) */}
      {/* Fundo com brilho central Indigo (Indigo-600) */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-indigo-600/35 to-black" />

      {/* Grade com linhas Indigo Claro (Indigo-400) e tamanho reduzido (60px) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(129,140,248,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(129,140,248,0.15)_1px,transparent_1px)] bg-size-[30px_30px]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(168,85,247,0.1) 35px, rgba(168,85,247,0.1) 36px)',
        }}
      />

      {/* Efeitos decorativos animados */}
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={isInView ? { scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
        animate={isInView ? { scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl"
        animate={isInView ? { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] } : {}}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-6xl mx-auto" ref={ref}>
        {/* Título */}
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

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group"
            >
              <div className={`absolute inset-0 ${category.bgColor} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70`} />
              <div className={`relative p-6 md:p-7 bg-black/40 backdrop-blur-sm border ${category.borderColor} rounded-2xl hover:border-opacity-80 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10`}>
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`p-3 rounded-xl bg-linear-gradient-to-r ${category.color} shadow-lg`}
                  >
                    <div className="text-white">{category.icon}</div>
                  </motion.div>
                  <h3 className="text-white">{category.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, j) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: i * 0.15 + j * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`px-4 py-2.5 rounded-full bg-linear-gradient-to-r ${category.color} bg-opacity-10 border ${category.borderColor} backdrop-blur-sm cursor-default transition-all duration-300 hover:shadow-lg`}
                    >
                      <span className="text-white text-sm">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rodapé */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 md:mt-12 text-center"
        >
          <p className="text-gray-400 text-sm md:text-base">{t.footer}</p>
        </motion.div>
      </div>
    </section>
  );
});
