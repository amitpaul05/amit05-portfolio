import { useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import useScrollAnimation from "@/components/ScrollAnimations";

const Index = () => {
  useScrollAnimation();
  
  useEffect(() => {
    // Add scroll animation classes to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      section.classList.add('animate-on-scroll');
      if (index % 2 === 0) {
        section.classList.add('slide-on-scroll');
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground dark overflow-x-hidden">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
    </div>
  );
};

export default Index;
