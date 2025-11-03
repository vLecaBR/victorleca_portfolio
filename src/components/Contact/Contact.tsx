import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Mail, MapPin, Calendar, Phone, Github, Linkedin, ExternalLink, MessageCircle } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";

// ---------- utils.ts inline ----------
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 1C1.44772 1 1 1.44772 1 2V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V2C14 1.44772 13.5523 1 13 1H2ZM3.05 6H4.95V12H3.05V6ZM5.075 4.005C5.075 4.59871 4.59371 5.08 4 5.08C3.4063 5.08 2.925 4.59871 2.925 4.005C2.925 3.41129 3.4063 2.93 4 2.93C4.59371 2.93 5.075 3.41129 5.075 4.005ZM12 8.35713C12 6.55208 10.8334 5.85033 9.67449 5.85033C9.29502 5.83163 8.91721 5.91119 8.57874 6.08107C8.32172 6.21007 8.05265 6.50523 7.84516 7.01853H7.79179V6.00044H6V12.0047H7.90616V8.8112C7.8786 8.48413 7.98327 8.06142 8.19741 7.80987C8.41156 7.55832 8.71789 7.49825 8.95015 7.46774H9.02258C9.62874 7.46774 10.0786 7.84301 10.0786 8.78868V12.0047H11.9847L12 8.35713Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

// ---------- botão inline ----------
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

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// ---------- componente principal ----------
export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const t = translations[language].contact;

  const contactInfo = [
    {
      icon: Calendar,
      label: t.info.birthDate,
      value: t.info.birthValue,
      link: null,
    },
    {
      icon: Phone,
      label: t.info.phone,
      value: "+55 16 98864-7864",
      link: "tel:+5516988647864",
    },
    {
      icon: Mail,
      label: t.info.email,
      value: "vitartasleca@gmail.com",
      link: "mailto:vitartasleca@gmail.com",
    },
    {
      icon: MapPin,
      label: t.info.location,
      value: t.info.locationValue,
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      value: "@vLecaBR",
      link: "https://github.com/vLecaBR",
      color: "from-gray-400 to-gray-600",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Victor Leça",
      link: "https://www.linkedin.com/in/victor-leca-vlkbr/",
      color: "from-blue-400 to-blue-600",
    },
  ];

  return (
    <section id="contact" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />

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

      {/* animações de fundo */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-20 right-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
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
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* toda a parte de contatos e social */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* ... (restante do código igual) ... */}

          {/* WhatsApp CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative p-5 bg-gradient-to-br from-green-950/40 to-emerald-950/40 backdrop-blur-sm border border-green-400/30 rounded-xl hover:border-green-400/60 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/20">
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30"
                >
                  <MessageCircle size={24} className="text-white" />
                </motion.div>
                <div className="flex-1">
                  <h4 className="text-white mb-1">{t.quickResponse}</h4>
                  <p className="text-green-300 text-sm">{t.whatsappPreferred}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                {t.whatsappMessage}
              </p>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
              >
                <a
                  href="https://wa.me/5516988647864"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2" size={18} />
                  {t.openWhatsApp}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
