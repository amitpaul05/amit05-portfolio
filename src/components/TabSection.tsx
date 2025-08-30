// import { useState, useEffect, useRef } from "react";
// import Hero from "./Hero";
// import About from "./About";
// import Experience from "./Experience";
// import Skills from "./Skills";
// import Projects from "./Projects";
// import Academic from "./Academic";
// import Certifications from "./Certifications";

// const TabSection = () => {
//   const [activeTab, setActiveTab] = useState(""); // initially no tab selected
//   const [hasScrolled, setHasScrolled] = useState(false);
//   const sectionsRef = useRef<HTMLDivElement>(null);

//   // Scroll to sections only when activeTab changes due to user interaction
//   useEffect(() => {
//     if (activeTab && hasScrolled && sectionsRef.current) {
//       const yOffset = -80; // negative margin in pixels
//       const y =
//         sectionsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
//       window.scrollTo({ top: y, behavior: "smooth" });
//     }
//   }, [activeTab, hasScrolled]);


//   return (
//     <>
//       {/* Hero Section */}
//       <Hero setActiveTab={setActiveTab} activeTab={activeTab} hasScrolled={hasScrolled} setHasScrolled={setHasScrolled} />

//       {/* Sections */}
//       <div className="bg-background" ref={sectionsRef}>
//         {activeTab === "about" && (
//           <>
//             <About />
//             <Experience />
//             <Skills />
//           </>
//         )}
//         {activeTab === "projects" && <Projects />}
//         {activeTab === "certificates" && <Certifications />}
//         {activeTab === "academic" && <Academic />}
//       </div>
//     </>
//   );
// };

// export default TabSection;


import { useState, useEffect, useRef } from "react";
import {ChevronRight, ChevronLeft } from "lucide-react";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Skills from "./Skills";
import Projects from "./Projects";
import Academic from "./Academic";
import Certifications from "./Certifications";

const pages = ["about", "academic", "projects", "certificates"];

const TabSection = () => {
  const [activeTab, setActiveTab] = useState(""); 
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab && hasScrolled && sectionsRef.current) {
      const yOffset = -80;
      const y =
        sectionsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [activeTab, hasScrolled]);

  const currentIndex = pages.indexOf(activeTab);
  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  return (
    <>
      <Hero
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        hasScrolled={hasScrolled}
        setHasScrolled={setHasScrolled}
      />

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

      {/* Navigation Buttons */}
      {activeTab && (
        <div className="flex w-full mt-8 px-8">
          <div className="flex w-full mt-8">
            <div className="flex-1 flex justify-center px-2">
              {prevPage && (
                <button
                  onClick={() => setActiveTab(prevPage)}
                  className="group relative flex items-center justify-center 
                            lg:h-16 lg:w-48 rounded-2xl 
                            backdrop-blur-xl 
                            bg-gradient-to-br from-background/30 via-background/50 to-background/30
                            border border-white/20 
                            shadow-2xl 
                            overflow-hidden 
                            transition-all duration-300
                            hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]
                            hover:border-primary/30
                            before:absolute before:inset-0 before:rounded-2xl 
                            before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-transparent 
                            before:blur-sm
                            hover:bg-gradient-to-r hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-pink-500/20
                            text-white font-bold
                            md:h-16 md:w-48 md:text-base
                            h-14 w-40 text-sm"
                >
                  <span className="absolute left-8 opacity-0 group-hover:opacity-100 transform translate-x-28 lg:group-hover:translate-x-12 group-hover:translate-x-10 transition-all duration-300 whitespace-nowrap font-bold">
                    {prevPage.charAt(0).toUpperCase() + prevPage.slice(1)}
                  </span>
                  <ChevronLeft
                    className="z-10 w-7 h-7 group-hover:-translate-x-12 transition-transform duration-300"
                    strokeWidth={5}
                  />
                </button>
              )}
            </div>

            <div className="flex-1 flex justify-center px-2">
              {nextPage && (
                <button
                  onClick={() => setActiveTab(nextPage)}
                  className="group relative flex items-center justify-center 
                            lg:h-16 lg:w-48 rounded-2xl 
                            backdrop-blur-xl 
                            bg-gradient-to-br from-background/30 via-background/50 to-background/30
                            border border-white/20 
                            shadow-2xl 
                            overflow-hidden 
                            transition-all duration-300
                            hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]
                            hover:border-primary/30
                            before:absolute before:inset-0 before:rounded-2xl 
                            before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-transparent 
                            before:blur-sm
                            hover:bg-gradient-to-r hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-pink-500/20
                            text-white font-bold
                            md:h-16 md:w-48 md:text-base
                            h-14 w-40 text-sm"
                >
                  <span className="absolute left-8 opacity-0 group-hover:opacity-100 transform -translate-x-16 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap font-bold">
                    {nextPage.charAt(0).toUpperCase() + nextPage.slice(1)}
                  </span>
                  <ChevronRight
                    className="z-10 w-7 h-7 group-hover:translate-x-10 transition-transform duration-300"
                    strokeWidth={5}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TabSection;



