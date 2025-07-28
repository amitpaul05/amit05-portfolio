import { Button } from "./ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-section-bg to-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-tech-blue/5 to-tech-cyan/5"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-tech-blue/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-slide-up">
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
            <Button variant="default" size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
            <Button variant="outline" size="lg" className="hover:border-primary hover:text-primary transition-all duration-300">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Resume
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://linkedin.com" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="https://leetcode.com" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              aria-label="LeetCode"
            >
              <ExternalLink className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;