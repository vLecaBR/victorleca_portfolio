import { Navbar } from "./components/NavBar/NavBar";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Skills } from "./components/Skills/Skills";
import { Projects } from "./components/Projects/Projects";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";
import { ScrollProgress } from "./components/ScrollProgress/ScrollProgress";
import { LanguageProvider } from "./context/LanguageContext";
import { Experience } from "./components/Experience/Experience";
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Analytics />
        <ScrollProgress />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
