import { useEffect } from "react";
import Hero from "@/components/Hero";
import TabSection from "@/components/TabSection";
import Contact from "@/components/Contact";
import useScrollAnimation from "@/components/ScrollAnimations";

const Index = () => {
  useScrollAnimation();
  
  useEffect(() => {
    console.log('Index component mounted');
    
    // Add scroll animation classes to sections with a delay to ensure DOM is ready
    const setupAnimations = () => {
      const sections = document.querySelectorAll('section');
      console.log('Found sections:', sections.length);
      
      sections.forEach((section, index) => {
        section.classList.add('animate-on-scroll');
        if (index % 2 === 0) {
          section.classList.add('slide-on-scroll');
        }
      });
    };
    
    // Setup with delay to ensure components are mounted
    const timer = setTimeout(setupAnimations, 10);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground dark overflow-x-hidden">
      {/* <Hero /> */}
      <TabSection />
      <Contact />
    </div>
  );
};

export default Index;
