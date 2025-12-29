import { m, LazyMotion, domAnimation } from "motion/react";
import { Github, Linkedin } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";
import { memo, useMemo } from "react";

export const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const t = translations[language].footer;

  // Memoiza a lista estática para não recriar a cada render
  const socialLinks = useMemo(() => [
    { icon: Github, href: "https://github.com/vLecaBR" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/victor-leca-vlkbr/" },
  ], []);

  return (
    <LazyMotion features={domAnimation}>
      <footer className="relative py-16 px-4 border-t border-white/10">
        {/* pointer-events-none garante que o fundo não bloqueie cliques */}
        <div className="absolute inset-0 bg-linear-to-b from-black to-blue-950/20 pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                {"<VictorLeça />"}
              </span>
            </m.div>

            {/* Social Links */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex gap-6"
            >
              {socialLinks.map((social, index) => (
                <m.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <social.icon size={20} />
                </m.a>
              ))}
            </m.div>

            {/* Copyright */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 text-gray-400"
            >
              <span>© {currentYear} {t.madeWith} {t.by}</span>
              <m.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
              </m.div>
            </m.div>
          </div>
        </div>
      </footer>
    </LazyMotion>
  );
});