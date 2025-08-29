import { useState, useEffect, useRef } from "react";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Skills from "./Skills";
import Projects from "./Projects";
import Academic from "./Academic";
import Certifications from "./Certifications";

const TabSection = () => {
  const [activeTab, setActiveTab] = useState(""); // initially no tab selected
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);

  // Scroll to sections only when activeTab changes due to user interaction
  useEffect(() => {
    if (activeTab && hasScrolled && sectionsRef.current) {
      const yOffset = -80; // negative margin in pixels
      const y =
        sectionsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [activeTab, hasScrolled]);


  return (
    <>
      {/* Hero Section */}
      <Hero setActiveTab={setActiveTab} activeTab={activeTab} hasScrolled={hasScrolled} setHasScrolled={setHasScrolled} />

      {/* Sections */}
      <div className="bg-background" ref={sectionsRef}>
        {activeTab === "about" && (
          <>
            <About />
            <Experience />
            <Skills />
          </>
        )}
        {activeTab === "projects" && <Projects />}
        {activeTab === "certificates" && <Certifications />}
        {activeTab === "academic" && <Academic />}
      </div>
    </>
  );
};

export default TabSection;
