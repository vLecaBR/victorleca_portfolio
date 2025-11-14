"use client";

import React, { useRef, useMemo } from "react";
import {
  Mail, MapPin, Calendar, Phone,
  Github, Linkedin, ExternalLink, MessageCircle,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";

// --- util ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Button ---
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

// --- Contact Section ---
export function Contact() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const t = translations[language].contact;

  const contactInfo = useMemo(() => [
    { icon: Calendar, label: t.info.birthDate, value: t.info.birthValue, link: null },
    { icon: Phone, label: t.info.phone, value: "+55 16 98864-7864", link: "tel:+5516988647864" },
    { icon: Mail, label: t.info.email, value: "vitartasleca@gmail.com", link: "mailto:vitartasleca@gmail.com" },
    { icon: MapPin, label: t.info.location, value: t.info.locationValue, link: null },
  ], [t.info]);

  const socialLinks = useMemo(() => [
    { icon: Github, label: "GitHub", value: "@vLecaBR", link: "https://github.com/vLecaBR", color: "from-gray-400 to-gray-600" },
    { icon: Linkedin, label: "LinkedIn", value: "Victor Leça", link: "https://www.linkedin.com/in/victor-leca-vlkbr/", color: "from-blue-400 to-blue-600" },
  ], []);

  return (
    <LazyMotion features={domAnimation}>
      <section id="contact" className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black via-blue-950/20 to-black" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
              radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px, 70px 70px, 100px 100px",
          }}
        />

        {/* Floating BGs */}
        <m.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl will-change-transform"
          animate={isInView ? { scale: [1, 1.2, 1], rotate: [0, 180, 360] } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <m.div
          className="absolute top-20 right-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl will-change-transform"
          animate={isInView ? { scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative max-w-6xl mx-auto" ref={ref}>
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
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

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Info */}
            <div>
              <m.h3
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-6 text-white"
              >
                {t.contactInfo}
              </m.h3>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <m.div
                    key={item.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="relative group will-change-transform"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="relative flex items-start gap-4 p-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-cyan-400/50 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/5">
                      <div className="shrink-0 w-12 h-12 bg-linear-to-r from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <item.icon size={24} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white mb-1">{item.label}</h4>
                        {item.link ? (
                          <a
                            href={item.link}
                            target={
                              item.link.startsWith("mailto") || item.link.startsWith("tel")
                                ? "_self"
                                : "_blank"
                            }
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyan-400 transition-colors break-all"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-400 break-all">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>

            {/* Social Links & WhatsApp */}
            <div>
              <m.h3
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-6 text-white"
              >
                {t.socialLinks}
              </m.h3>

              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <m.a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: -10, scale: 1.02 }}
                    className="relative group block will-change-transform"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="relative flex items-center gap-4 p-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-cyan-400/50 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/5">
                      <div className={`shrink-0 w-12 h-12 bg-linear-to-r ${social.color} rounded-lg flex items-center justify-center`}>
                        <social.icon size={24} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white mb-1">{social.label}</h4>
                        <p className="text-gray-400 break-all">{social.value}</p>
                      </div>
                      <ExternalLink size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors shrink-0" />
                    </div>
                  </m.a>
                ))}

                {/* WhatsApp CTA */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative p-5 bg-linear-to-br from-green-950/40 to-emerald-950/40 backdrop-blur-sm border border-green-400/30 rounded-xl hover:border-green-400/60 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/20">
                    <div className="flex items-start gap-4 mb-4">
                      <m.div
                        animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="shrink-0 w-12 h-12 bg-linear-to-r from-green-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30"
                      >
                        <MessageCircle size={24} className="text-white" />
                      </m.div>
                      <div className="flex-1">
                        <h4 className="text-white mb-1">{t.quickResponse}</h4>
                        <p className="text-green-300 text-sm">{t.whatsappPreferred}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{t.whatsappMessage}</p>
                    <Button
                      asChild
                      className="w-full bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
                    >
                      <a href="https://wa.me/5516988647864" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2" size={18} />
                        {t.openWhatsApp}
                      </a>
                    </Button>
                  </div>
                </m.div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center p-6 md:p-8 bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-white/10 backdrop-blur-sm"
          >
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              📍 <span dangerouslySetInnerHTML={{ __html: t.footer }} />
              <span className="hidden md:inline"> • 💼 {t.footerDetails} • 🚀 {t.footerWhatsApp}</span>
              <span className="block md:hidden mt-2">💼 {t.footerDetails}</span>
              <span className="block md:hidden mt-2">🚀 {t.footerWhatsApp}</span>
            </p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
