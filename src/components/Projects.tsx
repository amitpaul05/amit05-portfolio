import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Github, ExternalLink } from "lucide-react";

const Projects = () => {
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-world applications showcasing full-stack development and backend architecture expertise
          </p>
        </div>
        
        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <Card 
              key={project.title} 
              className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card group h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-full">
                <div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  {project.links.github && (
                    <Button variant="outline" size="sm" className="hover:border-primary hover:text-primary">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  )}
                  {project.links.demo && (
                    <Button variant="outline" size="sm" className="hover:border-primary hover:text-primary">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Button>
                  )}
                </div>
              </CardContent>
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
              className="bg-card/50 border-border/30 hover:border-primary/20 transition-all duration-300 hover:bg-card/80"
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
