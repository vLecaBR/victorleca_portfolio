import { motion, useScroll, useTransform } from "motion/react";
import { BriefcaseBusiness, Code, Home, Info, Languages, MonitorSmartphone, Smartphone } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";

export function Navbar() { 
  const { scrollY } = useScroll();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].navbar;
  
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

  const navItems = [
    { icon: <Home size={18} /> ,name: t.home, href: "#home" },
    { icon: <Info size={18} />, name: t.about, href: "#about" },
    { icon: <Code size={18} />, name: t.skills, href: "#skills" },
    { icon: <BriefcaseBusiness size={18} />, name: t.experience, href: "#experience" },
    { icon: <MonitorSmartphone size={18} />, name: t.projects, href: "#projects" },
    { icon: <Smartphone size={18} />, name: t.contact, href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      style={{ 
        backgroundColor,
        backdropFilter: backdropBlur as unknown as string,
        WebkitBackdropFilter: backdropBlur as unknown as string,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-lg shadow-cyan-500/5"
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
              onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }} 
              className="block"
            >
              <div className="absolute inset-0 bg-linear-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative px-3 py-1.5 border border-cyan-400/30 rounded-lg bg-black/20 group-hover:border-cyan-400/60 transition-all duration-300">
                <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  {"<VictorLeça />"}
                </span>
              </div>
            </a>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="text-gray-300 hover:text-white transition-colors relative group cursor-pointer"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="flex items-center justify-center -translate-y-0">
                  {item.icon}
                  </span>
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-gradient-to-r from-cyan-400 to-blue-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              
              {/* Language Toggle Button (Desktop) */}
              <motion.button
                onClick={toggleLanguage}
                className="relative group px-3 py-1.5 border border-cyan-400/30 rounded-lg bg-black/20 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-linear-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-1.5">
                  <Languages size={16} className="text-cyan-400" />
                  <span className="text-white text-sm">{language.toUpperCase()}</span>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Mobile - Only Language Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 border border-cyan-400/30 rounded-lg bg-black/20 hover:border-cyan-400/60 transition-all duration-300"
            >
              <div className="flex items-center gap-1">
                <Languages size={14} className="text-cyan-400" />
                <span className="text-white text-xs">{language.toUpperCase()}</span>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu REMOVED */}
      <motion.div className="hidden" />
    </motion.nav>
  );
}
