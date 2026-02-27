import { motion } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";
import { 
  User, 
  Code2, 
  Cpu, 
  Globe2, 
  Sparkles, 
  ChevronRight 
} from "lucide-react";

export function About() {
  // Puxamos apenas o 't' do contexto, que já contém o idioma correto
  const { t } = useLanguage();
  const aboutT = t.about;

  const features = [
    {
      icon: <Code2 className="text-cyan-400" size={24} />,
      title: aboutT.features[0].title,
      desc: aboutT.features[0].description,
    },
    {
      icon: <Cpu className="text-cyan-400" size={24} />,
      title: aboutT.features[1].title,
      desc: aboutT.features[1].description,
    },
    {
      icon: <Globe2 className="text-cyan-400" size={24} />,
      title: aboutT.features[2].title,
      desc: aboutT.features[2].description,
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            <User size={16} />
            <span>{aboutT.title}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
            {aboutT.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            {aboutT.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Coluna da Esquerda: Texto/Jornada */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-cyan-500/30 transition-colors">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
                <Sparkles className="text-cyan-400" size={24} />
              </div>
              
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                {aboutT.journeyTitle}
              </h3>
              
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>{aboutT.journeyParagraph1}</p>
                <p>{aboutT.journeyParagraph2}</p>
                <p>{aboutT.journeyParagraph3}</p>
              </div>
            </div>
          </motion.div>

          {/* Coluna da Direita: Features/Cards */}
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                      {feature.title}
                      <ChevronRight className="text-cyan-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" size={16} />
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Background Decorativo - Otimizado para não pesar no LCP */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
}