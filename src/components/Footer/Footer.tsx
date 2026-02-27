"use client";

import { m, LazyMotion, domAnimation } from "motion/react";
import { Github, Linkedin, Heart } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { memo, useMemo } from "react";

export const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Puxamos 't' direto do contexto
  const { t } = useLanguage();
  const footerT = t.footer;

  // Memoiza a lista de links sociais
  const socialLinks = useMemo(() => [
    { icon: Github, href: "https://github.com/vLecaBR" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/victor-leca-vlkbr/" },
  ], []);

  return (
    <LazyMotion features={domAnimation}>
      <footer className="relative py-12 px-4 border-t border-white/10 bg-black overflow-hidden">
        {/* Camada de fundo */}
        <div className="absolute inset-0 bg-linear-to-b from-black to-blue-950/10 pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Logo com efeito sutil */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group cursor-default"
            >
              <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent font-bold text-lg tracking-tighter">
                {"<VictorLeça />"}
              </span>
            </m.div>

            {/* Redes Sociais */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex gap-8"
            >
              {socialLinks.map((social, index) => (
                <m.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  <social.icon size={22} />
                </m.a>
              ))}
            </m.div>

            {/* Copyright e Créditos */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-gray-500 text-sm font-medium"
            >
              <span>
                © {currentYear} {footerT.madeWith} {footerT.by}
              </span>
              <m.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart size={14} className="text-cyan-500 fill-cyan-500/20" />
              </m.div>
            </m.div>
          </div>
        </div>
      </footer>
    </LazyMotion>
  );
});