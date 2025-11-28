import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import leetcodeIcon from "../assets/leetcode-icon.svg";
import resume from '../assets/Amit_Paul_s_Resume.pdf';
import GlassSurface from "./GlassSurface";
import RotatingText from './RotatingText'
import SplitText from "./SplitText";

interface HeroProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasScrolled: boolean;
  setHasScrolled: (val: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ activeTab, setActiveTab, hasScrolled, setHasScrolled }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector("section");
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + 100;
        const sticky = scrollPosition >= heroBottom;

        setIsSticky(sticky);

        // If navbar becomes sticky and no tab is selected, set default tab
        if (sticky && !activeTab) {
          setActiveTab("about");
        }

        if (sticky) {
          setHasScrolled(true); // user has scrolled past hero
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab, setActiveTab, setHasScrolled]);

  return (
    <>
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-background via-section-bg to-background relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-tech-blue/5 to-tech-cyan/5"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div>
            {/* <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Amit Paul
            </h1> */}
            <SplitText
              text="AMIT PAUL"
              className="text-5xl md:text-7xl font-bold mb-6 text-blue-500"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />


            <div className="flex justify-center items-center h-8 md:h-10 outline-2 mb-2">
              <RotatingText
              texts={['Backend Developer', 'Problem Solver', 'AI Enthusist', 'Cool!']}
              mainClassName="text-2xl md:text-3xl mb-4 text-muted-foreground rounded-md px-2 w-max duration-300 outline outline-offset-2 outline-emerald-500 text-amber-200 bg-blue-900/10"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
            </div>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Django & Python specialist with expertise in REST APIs, PostgreSQL, and scalable architecture.
              Building robust backend systems and full-stack applications for modern web experiences.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                onClick={() => window.open("mailto:amit.paul.ece@gmail.com", "_blank")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hover:border-primary hover:text-primary transition-all duration-300"
                onClick={() =>
                  window.open(
                    resume
                  )
                }
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Resume
              </Button>
            </div>

            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/amitpaul05"
                className="group transition-transform duration-300 hover:scale-110"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6 text-muted-foreground group-hover:text-foreground hover:drop-shadow-[0_0_2px_#1e40af]" />
              </a>
              <a
                href="https://www.linkedin.com/in/amitpaul05/"
                className="group transition-transform duration-300 hover:scale-110"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6 text-muted-foreground group-hover:text-foreground hover:drop-shadow-[0_0_2px_#1e40af]" />
              </a>
              <a
                href="https://leetcode.com/u/amit210905/"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                aria-label="LeetCode"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={leetcodeIcon}
                  alt="LeetCode"
                  className="h-6 w-6 filter hover:drop-shadow-[0_0_2px_#1e40af] brightness-0 invert opacity-60 hover:opacity-100 hover:brightness-100 hover:invert-0 hover:hue-rotate-180 transition-all duration-300"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}

        <div
          className={`z-50 transition-all duration-500 ease-in-out ${
            isSticky
              ? "fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl opacity-100"
              : "relative left-1/2 transform -translate-x-1/2 -translate-y-10 flex justify-center -mt-8 opacity-80"
          }`}
        >
          <nav 
          className="relative px-4 py-3 md:px-8 md:py-4 rounded-full shadow-2xl overflow-hidden transition-all duration-500"
          >
            
            <div className="absolute inset-0 pointer-events-none z-0">
              <GlassSurface width="100%" height="100%" className="shadow-lg"
                borderRadius={50}
                borderWidth={0}
                brightness={50}
                opacity={0.93}
                blur={10}
                displace={.50}
                backgroundOpacity={0.1}
                saturation={1}
                distortionScale={-180}
                redOffset={0}
                greenOffset={10}
                blueOffset={20}
              />
            </div>

            <div
              className={`relative z-10 flex ${
                isSticky ? "justify-between w-full" : "space-x-2 md:space-x-6"
              }`}
            >
              {["about", "academic", "projects", "certificates"].map((tab) => {
                const isActive = activeTab === tab;

                return isActive ? (
                  <GlassSurface
                    key={tab}
                    height="100%"
                    width="20%"
                    borderRadius={50}
                    borderWidth={0}
                    brightness={50}
                    opacity={0.93}
                    blur={11}
                    displace={5}
                    backgroundOpacity={0.1}
                    saturation={1}
                    distortionScale={-90}
                    redOffset={0}
                    greenOffset={10}
                    blueOffset={20}
                    style={{
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                backgroundColor: 'rgba(247, 7, 7, 0.1)',
                transition: 'all 0.3s ease',
              }}
                  >
                    <button
                      onClick={() => setActiveTab(tab)}
                      className="text-xs md:text-base font-medium px-2 py-1 md:px-3 md:py-2"
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </GlassSurface>
                ) : (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="text-xs md:text-base font-medium transition-all duration-300 hover:scale-105 px-2 py-1 md:px-3 md:py-2 rounded-full text-foreground/80 hover:text-foreground"
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                );
              })}
            </div>

          </nav>
        </div>

    </>
  );
};

export default Hero;
