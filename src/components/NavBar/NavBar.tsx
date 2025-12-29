import { useMemo, useCallback } from "react"; // Adicionado hooks essenciais
import { motion, useScroll, useTransform } from "motion/react";
import { BriefcaseBusiness, Code, Home, Info, Languages, MonitorSmartphone, Smartphone } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";

export function Navbar() { 
  const { scrollY } = useScroll();
  const { language, toggleLanguage } = useLanguage();
  
  // Memoiza a tradução atual para evitar lookups desnecessários
  const t = useMemo(() => translations[language].navbar, [language]);
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(20px)"]
  );

  // OTIMIZAÇÃO 1: useMemo para evitar recriar o array e os ícones a cada render.
  // Mudança estrutural: Passamos o componente do ícone, não o JSX instanciado.
  const navItems = useMemo(() => [
    { Icon: Home, name: t.home, href: "#home" },
    { Icon: Info, name: t.about, href: "#about" },
    { Icon: Code, name: t.skills, href: "#skills" },
    { Icon: BriefcaseBusiness, name: t.experience, href: "#experience" },
    { Icon: MonitorSmartphone, name: t.projects, href: "#projects" },
    { Icon: Smartphone, name: t.contact, href: "#contact" },
  ], [t]);

  // OTIMIZAÇÃO 2: useCallback para estabilizar a função de clique.
  // Isso evita que os botões "pisquem" ou recarreguem listeners desnecessariamente.
  const handleScrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <motion.nav
      style={{ 
        backgroundColor,
        backdropFilter: backdropBlur as unknown as string,
        WebkitBackdropFilter: backdropBlur as unknown as string,
      }}
      // OTIMIZAÇÃO 3: 'will-change-transform' ajuda o navegador a preparar a GPU
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-lg shadow-cyan-500/5 will-change-[background-color,backdrop-filter]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative group cursor-pointer"
          >
            <a 
              href="#home" 
              onClick={(e) => handleScrollToSection(e, "#home")} 
              className="block"
            >
              <div className="absolute inset-0 bg-linear-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative px-3 py-1.5 border border-cyan-400/30 rounded-lg bg-black/20 group-hover:border-cyan-400/60 transition-all duration-300">
                <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent font-bold">
                  {"<VictorLeça />"}
                </span>
              </div>
            </a>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map(({ name, href, Icon }, index) => (
                <motion.a
                  key={name}
                  href={href}
                  onClick={(e) => handleScrollToSection(e, href)}
                  className="text-gray-300 hover:text-white transition-colors relative group cursor-pointer flex flex-col items-center gap-1"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {/* Renderização do ícone otimizada */}
                  <span className="flex items-center justify-center">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm font-medium">{name}</span>
                  
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-gradient-to-r from-cyan-400 to-blue-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              
              {/* Language Toggle Button (Desktop) */}
              <motion.button
                onClick={toggleLanguage}
                className="relative group px-3 py-1.5 border border-cyan-400/30 rounded-lg bg-black/20 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer ml-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle Language"
              >
                <div className="absolute inset-0 bg-linear-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-1.5">
                  <Languages size={16} className="text-cyan-400" />
                  <span className="text-white text-sm font-semibold">{language.toUpperCase()}</span>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Mobile - Only Language Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 border border-cyan-400/30 rounded-lg bg-black/20 hover:border-cyan-400/60 transition-all duration-300"
              aria-label="Toggle Language Mobile"
            >
              <div className="flex items-center gap-1">
                <Languages size={14} className="text-cyan-400" />
                <span className="text-white text-xs font-semibold">{language.toUpperCase()}</span>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu REMOVED as per original code */}
      <motion.div className="hidden" />
    </motion.nav>
  );
}