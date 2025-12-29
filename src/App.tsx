import { Suspense, lazy, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Navbar } from "./components/NavBar/NavBar";
import { Hero } from "./components/Hero/Hero";
import { ScrollProgress } from "./components/ScrollProgress/ScrollProgress";
import { LanguageProvider } from "./context/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Imports Lazy
const About = lazy(() => import("./components/About/About").then(module => ({ default: module.About })));
const Skills = lazy(() => import("./components/Skills/Skills").then(module => ({ default: module.Skills })));
const Experience = lazy(() => import("./components/Experience/Experience").then(module => ({ default: module.Experience })));
const Projects = lazy(() => import("./components/Projects/Projects").then(module => ({ default: module.Projects })));
const Contact = lazy(() => import("./components/Contact/Contact").then(module => ({ default: module.Contact })));
const Footer = lazy(() => import("./components/Footer/Footer").then(module => ({ default: module.Footer })));

const SectionSkeleton = () => (
  <div className="w-full h-full flex items-center justify-center bg-black/50">
    <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
  </div>
);

interface LazySectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

const LazySection = ({ children, id, className = "min-h-[50vh]" }: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // CORREÇÃO DO LINT: Capturamos o elemento atual para usar no cleanup
    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Uma vez visível, paramos de observar para economizar recursos
          if (element) observer.unobserve(element);
        }
      },
      {
        rootMargin: "200px", // Carrega 200px antes de chegar na tela
        threshold: 0.1,
      }
    );

    if (element) observer.observe(element);

    return () => {
      // Usamos a variável capturada 'element' em vez de ref.current
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id={id} ref={ref} className={`w-full ${className} transition-all duration-500`}>
      {isVisible ? (
        <Suspense fallback={<SectionSkeleton />}>
          {children}
        </Suspense>
      ) : (
        // Mantém o espaço reservado para evitar CLS
        <div className="w-full h-full" /> 
      )}
    </section>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <div className="bg-black text-white overflow-x-hidden">
        <Analytics />
        <SpeedInsights />
        <ScrollProgress />
        <Navbar />
        
        {/* O Hero carrega imediatamente (LCP priorizado) */}
        <section id="home">
            <Hero />
        </section>

        <div className="flex flex-col">
          {/* Seções com Lazy Loading e IDs corrigidos para navegação */}
          <LazySection id="about" className="min-h-screen">
            <About />
          </LazySection>
          
          <LazySection id="skills" className="min-h-[80vh]">
            <Skills />
          </LazySection>
          
          <LazySection id="experience" className="min-h-screen">
            <Experience />
          </LazySection>
          
          <LazySection id="projects" className="min-h-screen">
            <Projects />
          </LazySection>
          
          <LazySection id="contact" className="min-h-[80vh]">
            <Contact />
          </LazySection>
          
          <LazySection className="min-h-[200px]">
            <Footer />
          </LazySection>
        </div>
      </div>
    </LanguageProvider>
  );
}