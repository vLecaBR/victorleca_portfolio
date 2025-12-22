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

// 1. Componente de Fallback Melhorado (Skeleton)
// Usa min-h-screen ou altura aproximada para evitar que a barra de rolagem pule (CLS)
const SectionSkeleton = () => (
  <div className="w-full min-h-[50vh] md:min-h-[70vh] flex items-center justify-center bg-black/50">
    <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
  </div>
);

// 2. Wrapper Inteligente: Só renderiza o componente quando ele entra na tela
const LazySection = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se o elemento estiver aparecendo (ou 200px antes de aparecer)
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Uma vez visível, desconectamos para não monitorar mais (melhora performance)
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        rootMargin: "200px", // Começa a carregar 200px ANTES do usuário chegar na seção
        threshold: 0.1,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} className="min-h-10">
      {isVisible ? (
        <Suspense fallback={<SectionSkeleton />}>
          {children}
        </Suspense>
      ) : (
        // Renderiza o skeleton enquanto não está visível para manter o espaço
        <div className="min-h-[200px]" /> 
      )}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Analytics />
        <SpeedInsights />
        <ScrollProgress />
        <Navbar />
        
        {/* O Hero carrega imediatamente (eagerly) pois é a primeira dobra */}
        <Hero />

        {/* Cada seção agora é isolada. O browser do celular fraco
            NÃO vai baixar o JavaScript de 'Contact' enquanto você estiver
            lendo 'About'. Isso libera a CPU para rolar a tela suavemente.
        */}
        <div className="flex flex-col">
          <LazySection>
            <About />
          </LazySection>
          
          <LazySection>
            <Skills />
          </LazySection>
          
          <LazySection>
            <Experience />
          </LazySection>
          
          <LazySection>
            <Projects />
          </LazySection>
          
          <LazySection>
            <Contact />
          </LazySection>
          
          <LazySection>
            <Footer />
          </LazySection>
        </div>
      </div>
    </LanguageProvider>
  );
}