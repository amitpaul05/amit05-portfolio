import { Button } from "./ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import leetcodeIcon from "../assets/leetcode-icon.svg";
import codeforcesIcon from "../assets/codeforces-icon.svg";

const Hero = () => {
  return (
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
              <img src={leetcodeIcon} alt="LeetCode" className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;