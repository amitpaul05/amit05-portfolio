import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, GraduationCap, Code, Coffee } from "lucide-react";
import amit from '../assets/amit.webp';

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="relative">
              <div className="relative group">
                {/* Background decoration */}
                <div className="absolute -inset-4 bg-gradient-primary rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                {/* Main image container */}
                <div className="relative bg-gradient-card rounded-2xl p-8 border border-border/50 group-hover:border-primary/30 transition-all duration-300">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted">
                    {/* Professional photo */}
                    <img 
                      src={amit}
                      alt="Amit Paul - Backend Developer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Floating badges */}
                  <div className="absolute -bottom-4 -right-4 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold shadow-lg animate-float">
                    Backend Developer
                  </div>
                  
                  <div className="absolute -top-4 -left-4 bg-card border border-border/50 px-3 py-2 rounded-lg text-sm text-card-foreground shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                    Django Expert
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                  About Me
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I'm a passionate Backend Developer with a strong foundation in Django and Python, 
                  specializing in building scalable web applications and RESTful APIs. My experience 
                  spans from developing LMS systems to creating innovative solutions like face recognition 
                  payment systems.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Currently contributing at Idlewild Digital, where I've taken ownership of 75% of a 
                  feature-rich LMS backend architecture. I believe in clean code, modular design, and 
                  solving complex problems with elegant solutions.
                </p>
              </div>
              
              {/* Quick facts */}
              <Card className="
                backdrop-blur-xl bg-gradient-to-br from-background/30 via-background/50 to-background/30 
                border border-white/20 rounded-2xl shadow-2xl
                hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]
                before:absolute before:inset-0 before:rounded-2xl 
                before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-transparent
                before:blur-sm relative overflow-hidden
              ">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-card-foreground">Quick Facts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium text-card-foreground">Khulna, Bangladesh</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-tech-cyan/10 rounded-lg flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-tech-cyan" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Education</p>
                        <p className="font-medium text-card-foreground">Khulna University</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Code className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Primary OS</p>
                        <p className="font-medium text-card-foreground">Ubuntu/Linux</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                        <Coffee className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Favorite Stack</p>
                        <p className="font-medium text-card-foreground">Django + PostgreSQL</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Expertise highlights */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-card-foreground">Core Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-tech-blue/10 text-tech-blue border-tech-blue/20">
                    Django Architecture
                  </Badge>
                  <Badge className="bg-tech-cyan/10 text-tech-cyan border-tech-cyan/20">
                    REST API Design
                  </Badge>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    PostgreSQL Optimization
                  </Badge>
                  <Badge className="bg-accent/10 text-accent border-accent/20">
                    System Design
                  </Badge>
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                    Problem Solving
                  </Badge>
                </div>
              </div>
              
              {/* Personal touch */}
              <Card className="
                backdrop-blur-xl bg-gradient-to-br from-primary/10 via-primary/20 to-primary/5 
                border border-primary/20 rounded-2xl shadow-2xl
                hover:shadow-[0_0_40px_rgba(var(--primary),0.2)]
                before:absolute before:inset-0 before:rounded-2xl 
                before:bg-gradient-to-br before:from-transparent before:via-primary/10 before:to-transparent
                before:blur-sm relative overflow-hidden
              ">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-card-foreground">
                    Beyond Code
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    When I'm not architecting backend systems, you'll find me solving algorithmic challenges 
                    on LeetCode and Codeforces, contributing to open-source projects, or exploring the latest 
                    in cloud architecture and microservices. I'm passionate about continuous learning and 
                    ready to tackle global-scale engineering challenges.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;