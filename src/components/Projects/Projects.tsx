import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const { language } = useLanguage();
  const t = translations[language].projects;

  const projects = t.list.map((project, index) => {
    const projectData = [
      {
        images: [
          "https://images.unsplash.com/photo-1576707769315-01a7474de445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlcnZhdGlvbiUyMGJvb2tpbmclMjBzeXN0ZW18ZW58MXx8fHwxNzYwNTUyNzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBzY3JlZW58ZW58MXx8fHwxNzYwNDUyOTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        ],
        tags: ["Power Apps", "SharePoint", "Power Automate", "Office 365"],
        technologies: {
          frontend: "Power Apps (Canvas App)",
          backend: "SharePoint Lists, Power Automate",
          integration: "Microsoft Graph API, Office 365",
          features: "Multi-level approval, Automatic notifications"
        },
        githubUrl: null,
        liveUrl: null,
      },
      {
        images: [
          "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzYwNTUxNDc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYwNTAyMjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        ],
        tags: ["React Native", "TypeScript", "NodeJS", "MongoDB"],
        technologies: {
          frontend: "React Native, TypeScript, Expo",
          backend: "NodeJS, Express, MongoDB",
          mobile: "Camera, GPS, Push Notifications",
          storage: "AsyncStorage (offline), MongoDB Atlas"
        },
        githubUrl: "https://github.com/vLecaBR",
        liveUrl: null,
      },
      {
        images: [
          "https://images.unsplash.com/photo-1759143545924-beb85b33c0f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwd29ya2Zsb3clMjBzeXN0ZW18ZW58MXx8fHwxNzYwNTUyNzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYwNTUyNzU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        ],
        tags: ["ReactJS", "NodeJS", "Power Automate", "PostgreSQL"],
        technologies: {
          frontend: "ReactJS, TypeScript, Tailwind CSS",
          backend: "NodeJS, Express, PostgreSQL",
          automation: "Power Automate, REST APIs",
          analytics: "Charts.js, Excel/PDF export"
        },
        githubUrl: "https://github.com/vLecaBR",
        liveUrl: null,
      },
      {
        images: [
          "https://images.unsplash.com/photo-1656319571474-7aa81c26518a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBkaWdpdGFsJTIwcGxhdGZvcm18ZW58MXx8fHwxNzYwNTUyNzYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwc29mdHdhcmV8ZW58MXx8fHwxNzYwNTUxNTc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        ],
        tags: ["ReactJS", "NextJS", "NodeJS", "AI/ML", "Python"],
        technologies: {
          frontend: "ReactJS, NextJS, TypeScript, Recharts",
          backend: "NodeJS, Python FastAPI",
          ai: "OpenAI API, Machine Learning models",
          database: "PostgreSQL, Redis (cache)"
        },
        githubUrl: "https://github.com/vLecaBR",
        liveUrl: null,
      },
      {
        images: [
          "https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjA1NTE1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1595623654300-b27329804025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwY29kaW5nfGVufDF8fHx8MTc2MDQ5MjMzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        ],
        tags: ["Power Apps", "SharePoint", "Power Automate", "JavaScript"],
        technologies: {
          frontend: "Power Apps (Model-driven)",
          backend: "SharePoint Online, Dataverse",
          automation: "Power Automate, JavaScript",
          integration: "Microsoft Graph, Custom Connectors"
        },
        githubUrl: null,
        liveUrl: null,
      },
    ];
    
    return {
      ...project,
      ...projectData[index]
    };
  });

  return (
    <section id="projects" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-linear-gradient-to-r from-black via-cyan-950/20 to-black" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.08)_1px,transparent_1px)] bg-size-[100px_100px]" />
      
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">
            <span className="bg-linear-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-linear-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10">
                {/* Project Header */}
                <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
                  {/* Main Image */}
                  <div className="relative h-64 md:h-80 overflow-hidden rounded-xl">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="h-full"
                    >
                      <ImageWithFallback
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>

                  {/* Project Info */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="mb-3 text-white">{project.title}</h3>
                      <p className="text-gray-400 mb-4">{project.shortDescription}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                      className="w-full bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-cyan-400/50"
                    >
                      {expandedProject === index ? (
                        <>
                          {t.showLess} <ChevronUp className="ml-2" size={16} />
                        </>
                      ) : (
                        <>
                          {t.viewDetails} <ChevronDown className="ml-2" size={16} />
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Expanded Details */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedProject === index ? "auto" : 0,
                    opacity: expandedProject === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 md:p-8 pt-6 border-t border-white/10">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Full Description */}
                      <div>
                        <h4 className="text-white mb-3">{t.aboutProject}</h4>
                        <p className="text-gray-400 leading-relaxed mb-4">
                          {project.fullDescription}
                        </p>

                        {/* Features */}
                        <h4 className="text-white mb-3">{t.keyFeatures}</h4>
                        <ul className="space-y-2">
                          {project.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-400">
                              <span className="text-cyan-400 mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies & Second Image */}
                      <div>
                        {project.images[1] && (
                          <div className="relative h-48 overflow-hidden rounded-xl mb-4">
                            <ImageWithFallback
                              src={project.images[1]}
                              alt={`${project.title} - Interface`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <h4 className="text-white mb-3">{t.techStack}</h4>
                        <div className="space-y-3 mb-6">
                          {Object.entries(project.technologies).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-cyan-400 capitalize">{key}:</span>
                              <p className="text-gray-400 mt-1">{value}</p>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                          {project.githubUrl && (
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/40 transition-all"
                            >
                              <Github size={20} className="text-white" />
                              <span className="text-white">{t.viewRepository}</span>
                            </motion.a>
                          )}
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-linear-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/25"
                            >
                              <ExternalLink size={20} className="text-white" />
                              <span className="text-white">{t.viewLive}</span>
                            </motion.a>
                          )}
                          {!project.githubUrl && !project.liveUrl && (
                            <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center">
                              <p className="text-gray-400 text-sm">
                                {t.privateCorporate}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 md:mt-12 text-center"
        >
          <p className="text-gray-400 text-sm md:text-base">
            {t.footer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
