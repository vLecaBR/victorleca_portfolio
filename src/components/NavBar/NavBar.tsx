import { useMemo, useCallback, memo } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BriefcaseBusiness, Code, Home, Info, Languages, MonitorSmartphone, Smartphone } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

// CORREÇÃO: Interface para as propriedades do NavItem
interface NavItemProps {
  name: string;
  href: string;
  Icon: React.ElementType;
  index: number;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

// OTIMIZAÇÃO: NavItem memoizado com tipagem correta
const NavItem = memo(({ name, href, Icon, index, onClick }: NavItemProps) => (
  <motion.a
    href={href}
    onClick={(e) => onClick(e, href)}
    className="text-gray-300 hover:text-white transition-colors relative group cursor-pointer flex flex-col items-center gap-1"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    whileHover={{ y: -2 }}
  >
    <span className="flex items-center justify-center">
      <Icon size={18} />
    </span>
    <span className="text-xs font-medium uppercase tracking-wider">{name}</span>
    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-cyan-400 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
  </motion.a>
));

export function Navbar() { 
  const { scrollY } = useScroll();
  const { language, toggleLanguage, t } = useLanguage();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.85)"]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 80],
    ["blur(0px)", "blur(12px)"]
  );

  const navItems = useMemo(() => [
    { Icon: Home, name: t.navbar.home, href: "#home" },
    { Icon: Info, name: t.navbar.about, href: "#about" },
    { Icon: Code, name: t.navbar.skills, href: "#skills" },
    { Icon: BriefcaseBusiness, name: t.navbar.experience, href: "#experience" },
    { Icon: MonitorSmartphone, name: t.navbar.projects, href: "#projects" },
    { Icon: Smartphone, name: t.navbar.contact, href: "#contact" },
  ], [t.navbar]);

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
        transform: "translateZ(0)",
        willChange: "background-color, backdrop-filter"
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-lg shadow-cyan-500/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="relative group cursor-pointer">
            <a 
              href="#home" 
              onClick={(e) => handleScrollToSection(e, "#home")} 
              className="block"
            >
              <div className="absolute inset-0 bg-linear-to-r from-cyan-400/20 to-blue-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative px-3 py-1.5 border border-cyan-400/30 rounded-lg bg-black/20 group-hover:border-cyan-400/60 transition-all duration-300">
                <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent font-bold tracking-tight">
                  {"<VictorLeça />"}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <NavItem 
                  key={item.name} 
                  {...item} 
                  index={index} 
                  onClick={handleScrollToSection} 
                />
              ))}
              
              <motion.button
                onClick={toggleLanguage}
                className="relative group px-4 py-1.5 border border-cyan-400/30 rounded-lg bg-black/20 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer ml-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle Language"
              >
                <div className="relative flex items-center gap-2 pointer-events-none">
                  <Languages size={16} className="text-cyan-400" />
                  <span className="text-white text-xs font-bold">{language.toUpperCase()}</span>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Language Button */}
          <div className="md:hidden">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 border border-cyan-400/30 rounded-lg bg-black/20 flex items-center gap-2 active:scale-95 transition-transform"
              aria-label="Toggle Language Mobile"
            >
              <Languages size={14} className="text-cyan-400" />
              <span className="text-white text-xs font-bold">{language.toUpperCase()}</span>
            </button>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}