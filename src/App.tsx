import { Suspense, lazy } from "react";
import { Navbar } from "./components/NavBar/NavBar";
import { Hero } from "./components/Hero/Hero";
import { ScrollProgress } from "./components/ScrollProgress/ScrollProgress";
import { LanguageProvider } from "./context/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Carregamento Preguiçoso (Lazy Loading) para componentes abaixo da dobra (below the fold)
// Isso reduz o tamanho do bundle inicial, melhorando o FCP e LCP significativamente.
const About = lazy(() => import("./components/About/About").then(module => ({ default: module.About })));
const Skills = lazy(() => import("./components/Skills/Skills").then(module => ({ default: module.Skills })));
const Experience = lazy(() => import("./components/Experience/Experience").then(module => ({ default: module.Experience })));
const Projects = lazy(() => import("./components/Projects/Projects").then(module => ({ default: module.Projects })));
const Contact = lazy(() => import("./components/Contact/Contact").then(module => ({ default: module.Contact })));
const Footer = lazy(() => import("./components/Footer/Footer").then(module => ({ default: module.Footer })));

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Analytics />
        <SpeedInsights />
        <ScrollProgress />
        <Navbar />
        <Hero />
        <Suspense fallback={<div className="h-20 bg-black" />}>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </LanguageProvider>
  );
}