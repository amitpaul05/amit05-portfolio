import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import leetcodeIcon from "../assets/leetcode-icon.svg";
import resume from '../assets/Amit_Paul_s_Resume.pdf';
import GlassSurface from "./GlassSurface";
import SplitText from "./SplitText";

const NAV_TABS = ["about", "academic", "projects", "certificates"] as const;

const Hero: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const activeRoute = location.pathname.slice(1);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector("section");
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + 100;
        const sticky = scrollPosition >= heroBottom;

        setIsSticky(sticky);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, navigate]);

  return (
    <>
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div>
            <SplitText
              text="Amit Paul"
              tag="h1"
              className="text-5xl md:text-7xl font-bold mb-6 text-foreground hero-name"
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

            <p className="text-2xl md:text-3xl text-foreground/80 mb-4">
              Backend Engineer · Django · Python · PostgreSQL
            </p>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Software Engineer at Idlewild Digital — building production systems across LLM integrations, payment flows, and cloud infrastructure. Django & Python at the core, deployed on AWS, GCP, and VPS.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                variant="outline"
                size="lg"
                className="border border-accent-green text-accent-green bg-transparent hover:bg-accent-green hover:text-background transition-all duration-200"
                onClick={() => window.open(resume)}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Resume
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-200"
                onClick={() => window.open("mailto:amit.paul.ece@gmail.com", "_blank")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
            </div>

            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/amitpaul05"
                className="group"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
              </a>
              <a
                href="https://www.linkedin.com/in/amitpaul05/"
                className="group"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
              </a>
              <a
                href="https://leetcode.com/u/amit210905/"
                className="group"
                aria-label="LeetCode"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={leetcodeIcon}
                  alt="LeetCode"
                  className="h-6 w-6 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div
        className={`z-50 transition-all duration-500 ease-in-out ${
          isSticky
            ? "fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl opacity-100"
            : "relative left-1/2 transform -translate-x-1/2 -translate-y-10 flex justify-center -mt-8 opacity-80"
        }`}
      >
        <nav className="relative px-4 py-2 md:px-8 md:py-2.5 rounded-full shadow-2xl overflow-hidden transition-all duration-500">
          <div className="absolute inset-0 pointer-events-none z-0">
            <GlassSurface
              width="100%"
              height="100%"
              className="shadow-lg"
              borderRadius={50}
              borderWidth={0}
              brightness={50}
              opacity={0.93}
              blur={45}
              displace={0.50}
              backgroundOpacity={0.1}
              saturation={1}
              distortionScale={-30}
              redOffset={0}
              greenOffset={0}
              blueOffset={0}
            />
          </div>

          <div
            className={`relative z-10 flex ${
              isSticky ? "justify-between w-full" : "space-x-2 md:space-x-6"
            }`}
          >
            {NAV_TABS.map((tab) => {
              const isActive = activeRoute === tab;

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
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    backgroundColor: 'hsl(var(--primary) / 0.15)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <button
                    aria-current="page"
                    onClick={() => navigate(`/${tab}`)}
                    className="text-xs md:text-base font-semibold px-2 py-1 md:px-3 md:py-2 cursor-pointer text-foreground"
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </GlassSurface>
              ) : (
                <button
                  key={tab}
                  onClick={() => navigate(`/${tab}`)}
                  className="text-xs md:text-base font-medium transition-colors duration-200 px-2 py-1 md:px-3 md:py-2 rounded-full text-foreground/70 hover:text-foreground cursor-pointer"
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
