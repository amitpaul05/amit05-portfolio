import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import leetcodeIcon from "../assets/leetcode-icon.svg";
import codeforcesIcon from "../assets/codeforces-icon.svg";

const Hero = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + 100;
        setIsSticky(scrollPosition >= heroBottom);
      }

      // Scroll spy logic for tabs
      const tabSection = document.querySelector('[role="tablist"]') as HTMLElement;
      if (tabSection) {
        const tabSectionTop = tabSection.offsetTop - 100;
        const scrollPos = window.scrollY + 200;
        
        if (scrollPos >= tabSectionTop) {
          setActiveSection('tabs');
        } else {
          setActiveSection('hero');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-section-bg to-background relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-tech-blue/5 to-tech-cyan/5"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Amit Paul
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-4">
              Backend Developer
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Django & Python specialist with expertise in REST APIs, PostgreSQL, and scalable architecture. 
              Building robust backend systems and full-stack applications for modern web experiences.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                variant="default" 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                onClick={() => window.open('mailto:amit210905@gmail.com', '_blank')}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="hover:border-primary hover:text-primary transition-all duration-300"
                onClick={() => window.open('https://drive.google.com/drive/folders/1CslS5qhOR0kxTJhxq1ot0uOKi-6Z_MCQ?usp=sharing', '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Resume
              </Button>
            </div>
            
            <div className="flex justify-center space-x-6">
              <a 
                href="https://github.com/amitpaul05" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                aria-label="GitHub"
                title="View my GitHub repositories and open source contributions"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/amitpaul05/" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                aria-label="LinkedIn"
                title="Connect with me on LinkedIn for professional networking"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://leetcode.com/u/amit210905/" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                aria-label="LeetCode"
                title="Check out my LeetCode profile and problem-solving solutions"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={leetcodeIcon} alt="LeetCode" className="h-6 w-6 filter brightness-0 invert opacity-60 hover:opacity-100 hover:brightness-100 hover:invert-0 hover:hue-rotate-180 transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Liquid Glass Navigation Bar */}
      <div className={`z-50 ${
        isSticky 
          ? 'fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl' 
          : 'flex justify-center -mt-8'
      }`}>
        <nav className="
          backdrop-blur-md bg-gradient-to-r from-background/30 via-background/50 to-background/30 
          border border-white/20 rounded-full px-4 py-3 md:px-8 md:py-4 shadow-2xl
          hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]
          before:absolute before:inset-0 before:rounded-full 
          before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
          before:blur-sm relative overflow-hidden
        ">
          <div className={`flex relative z-10 ${
            isSticky 
              ? 'justify-between w-full' 
              : 'space-x-2 md:space-x-6'
          }`}>
            <button 
              onClick={() => {
                const tabSection = document.querySelector('[role="tablist"]');
                if (tabSection) {
                  tabSection.scrollIntoView({ behavior: 'smooth' });
                  // Trigger about tab
                  const aboutTab = document.querySelector('[data-value="about"]') as HTMLElement;
                  if (aboutTab) aboutTab.click();
                }
              }}
              className={`text-xs md:text-base font-medium transition-all duration-300 hover:scale-105 px-2 py-1 md:px-3 md:py-2 rounded-full hover:bg-white/10 ${
                activeSection === 'tabs' 
                  ? 'backdrop-blur-sm bg-white/20 border border-white/30 shadow-lg text-foreground' 
                  : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => {
                const tabSection = document.querySelector('[role="tablist"]');
                if (tabSection) {
                  tabSection.scrollIntoView({ behavior: 'smooth' });
                  // Trigger academic tab
                  const academicTab = document.querySelector('[data-value="academic"]') as HTMLElement;
                  if (academicTab) academicTab.click();
                }
              }}
              className={`text-xs md:text-base font-medium transition-all duration-300 hover:scale-105 px-2 py-1 md:px-3 md:py-2 rounded-full hover:bg-white/10 ${
                activeSection === 'tabs' 
                  ? 'backdrop-blur-sm bg-white/20 border border-white/30 shadow-lg text-foreground' 
                  : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Academics
            </button>
            <button 
              onClick={() => {
                const tabSection = document.querySelector('[role="tablist"]');
                if (tabSection) {
                  tabSection.scrollIntoView({ behavior: 'smooth' });
                  // Trigger projects tab
                  const projectsTab = document.querySelector('[data-value="projects"]') as HTMLElement;
                  if (projectsTab) projectsTab.click();
                }
              }}
              className={`text-xs md:text-base font-medium transition-all duration-300 hover:scale-105 px-2 py-1 md:px-3 md:py-2 rounded-full hover:bg-white/10 ${
                activeSection === 'tabs' 
                  ? 'backdrop-blur-sm bg-white/20 border border-white/30 shadow-lg text-foreground' 
                  : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Projects
            </button>
            <button 
              onClick={() => {
                const tabSection = document.querySelector('[role="tablist"]');
                if (tabSection) {
                  tabSection.scrollIntoView({ behavior: 'smooth' });
                  // Trigger certificates tab
                  const certificatesTab = document.querySelector('[data-value="certificates"]') as HTMLElement;
                  if (certificatesTab) certificatesTab.click();
                }
              }}
              className={`text-xs md:text-base font-medium transition-all duration-300 hover:scale-105 px-2 py-1 md:px-3 md:py-2 rounded-full hover:bg-white/10 ${
                activeSection === 'tabs' 
                  ? 'backdrop-blur-sm bg-white/20 border border-white/30 shadow-lg text-foreground' 
                  : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Certificates
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Hero;