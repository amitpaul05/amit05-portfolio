import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Github, ExternalLink } from "lucide-react";

const Projects = () => {
  const workProjects = [
    {
      title: "ScholarStone",
      description: "Educational platform and scholarship management system",
      url: "https://www.scholarstone.net/",
      technologies: ["Web Platform", "Education Technology"]
    },
    {
      title: "Crabarian Exporter UI",
      description: "Export management user interface system",
      url: "http://exporter-ui.crabarian.com/",
      technologies: ["UI/UX", "Export Management"]
    }
  ];

  const projects = [
    {
      title: "University Certificate Automation System",
      description: "Full-stack certificate issuance system with Django REST Framework, PostgreSQL backend, and Vue.js frontend for a database course project. Presented to university ICT Cell for potential official implementation.",
      technologies: ["Django", "Django REST", "PostgreSQL", "Vue.js", "Certificate Generation"],
      links: {
        github: "#",
        demo: "#"
      },
      featured: true
    },
    {
      title: "Smart Canteen System",
      description: "Developed a system utilizing face recognition technology to track food consumption and payment status automatically, enhancing user engagement and admin efficiency.",
      technologies: ["Python", "Face Recognition", "Django", "Payment Processing", "Computer Vision"],
      links: {
        github: "#"
      },
      featured: true
    },
    {
      title: "Automated Doctor's Serial Management System",
      description: "Integrated GSM technology for SMS functionality to enable appointment management. Developed a web-based platform for users and staff to make, monitor, and view serial numbers conveniently.",
      technologies: ["Django", "SMS/GSM Integration", "PostgreSQL", "Web Platform", "Appointment Management"],
      links: {
        github: "#"
      },
      featured: true
    },
    {
      title: "Customer Relationship Management (CRM)",
      description: "Developed a CRM web app using Django and PostgreSQL with optimized queries and real-time dashboard features. Designed for internal tracking of clients, leads, and performance metrics.",
      technologies: ["Django", "PostgreSQL", "Real-time Dashboard", "Performance Optimization"],
      links: {
        github: "#"
      },
      featured: false
    },
    {
      title: "Little Lemon Restaurant App",
      description: "Built a Django-based app for menu management and table reservations with a modular, reusable component structure. Implemented customer and staff workflows for a seamless restaurant management experience.",
      technologies: ["Django", "Modular Design", "Restaurant Management", "Reservation System"],
      links: {
        github: "#"
      },
      featured: false
    },
    {
      title: "Daily Updates Communication Tool",
      description: "Internal team communication and reporting tool using Django REST Framework. Implemented secure login, update scheduling, and auto-archive of posts with modular coding and DRY principles.",
      technologies: ["Django REST", "Team Communication", "Auto-scheduling", "Secure Authentication"],
      links: {
        github: "#"
      },
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Projects I worked on */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Projects I worked on
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional projects I've contributed to in production environments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {workProjects.map((project, index) => (
            <Card 
              key={project.title} 
              className="
                backdrop-blur-xl bg-gradient-to-br from-background/30 via-background/50 to-background/30 
                border border-white/20 rounded-2xl shadow-2xl
                hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]
                before:absolute before:inset-0 before:rounded-2xl 
                before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-transparent
                before:blur-sm relative overflow-hidden group
                hover:border-primary/30 transition-all duration-300
              "
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hover:border-primary hover:text-primary"
                  onClick={() => window.open(project.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Project
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Personal projects showcasing full-stack development and backend architecture expertise
          </p>
        </div>
        
        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <Card 
              key={project.title} 
              className={`relative overflow-hidden bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 
                hover:border-primary/50 transition-all duration-500 group h-full backdrop-blur-sm
                hover:shadow-elegant hover:shadow-primary/20 animate-fade-in-up stagger-${index + 1}
                before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent 
                before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100`}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-primary/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-accent/20 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500" />
              
              <CardHeader className="relative z-10 pb-4">
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-all duration-300 
                  group-hover:scale-105 transform-gpu bg-gradient-to-r from-foreground to-foreground 
                  group-hover:from-primary group-hover:to-accent bg-clip-text group-hover:text-transparent">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10 flex flex-col justify-between h-full pt-0">
                <div>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm group-hover:text-foreground/90 transition-colors duration-300">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className={`text-xs relative overflow-hidden bg-muted/50 hover:bg-primary/20 
                          border border-border/50 hover:border-primary/30 transition-all duration-300
                          hover:scale-105 transform-gpu group-hover:animate-bounce-slow`}
                        style={{ animationDelay: `${techIndex * 0.1}s` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 mt-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:border-primary hover:text-primary hover:bg-primary/10 
                      transition-all duration-300 hover:scale-105 transform-gpu group-hover:shadow-lg"
                    onClick={() => window.open(project.links.github, '_blank')}
                  >
                    <Github className="h-4 w-4 mr-2 group-hover:animate-bounce-slow" />
                    Code
                  </Button>
                  {project.links.demo && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:border-accent hover:text-accent hover:bg-accent/10 
                        transition-all duration-300 hover:scale-105 transform-gpu group-hover:shadow-lg"
                      onClick={() => window.open(project.links.demo, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2 group-hover:animate-bounce-slow" />
                      Demo
                    </Button>
                  )}
                </div>
              </CardContent>
              
              {/* Bottom border gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary 
                scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Card>
          ))}
        </div>

        {/* Other Projects */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-card-foreground">Other Projects</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((project, index) => (
            <Card 
              key={project.title} 
              className="
                backdrop-blur-xl bg-gradient-to-br from-background/20 via-background/30 to-background/20 
                border border-white/15 rounded-xl shadow-xl
                hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]
                before:absolute before:inset-0 before:rounded-xl 
                before:bg-gradient-to-br before:from-transparent before:via-white/5 before:to-transparent
                before:blur-sm relative overflow-hidden
                hover:border-primary/20 transition-all duration-300
              "
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-2 text-card-foreground hover:text-primary transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.technologies.length - 3} more
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                  <Github className="h-4 w-4 mr-1" />
                  View Code
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
