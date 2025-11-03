import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X, Languages } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
    { name: t.home, href: "#home" },
    { name: t.about, href: "#about" },
    { name: t.skills, href: "#skills" },
    { name: t.projects, href: "#projects" },
    { name: t.contact, href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <motion.nav
      style={{ 
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-lg shadow-cyan-500/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative group cursor-pointer"
          >
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }} className="block">
              <div className="absolute inset-0 bg-linear-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative px-3 py-1.5 border border-cyan-400/30 rounded-lg bg-black/20 group-hover:border-cyan-400/60 transition-all duration-300">
                <span className="bg-linear-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
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
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-gradient-to-r from-cyan-400 to-blue-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              
              {/* Language Toggle Button */}
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

          {/* Mobile Menu Button & Language Toggle */}
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
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-black/95 backdrop-blur-lg border-t border-white/10"
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-cyan-400/10 rounded-lg transition-all cursor-pointer border border-transparent hover:border-cyan-400/30"
              whileTap={{ scale: 0.98 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
