import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Github, ExternalLink, Lock, Activity } from "lucide-react";

const Projects = () => {
  const workProjects = [
    {
      title: "AYO",
      description: "AI chat research platform connecting researchers with student participants via researcher-issued invite links. Migrated chat storage from LiteLLM middleware to direct LibreChat integration, giving researchers access to full conversation metadata without a proxy hop. Keycloak SSO authenticates all roles; Django validates Bearer JWTs against the Keycloak userinfo endpoint. Built a streaming ZIP export (turns + conversations CSVs) using a generator that drains every 500 rows, eliminating timeout failures on large session exports.",
      architectureNote: "Architecture: Keycloak SSO → Django API + Next.js dashboard → LibreChat (MongoDB) · PostgreSQL · LiteLLM proxy. Access via researcher-issued invite only.",
      url: null,
      screenshot: "/project-screenshots/ayo.png",
      technologies: ["Django", "LibreChat", "LiteLLM", "Keycloak", "PostgreSQL", "MongoDB", "Next.js"]
    },
    {
      title: "Govara",
      description: "AI-powered governance and compliance SaaS. Companies self-audit against ISO 27001 and ISO 42001 (AI governance) frameworks, upload evidence for assigned independent auditors, and share certifications with stakeholders via a public directory. Cross-framework control mapping reduces redundant evidence across frameworks. Built with Django, Celery async tasks, Stripe subscription billing, and a GPT-4o-mini compliance assistant.",
      url: "https://govara-ui.idlewilddigital.com/",
      screenshot: "/project-screenshots/govara.png",
      technologies: ["Django", "Next.js", "Stripe", "OpenAI", "Celery", "Redis", "PostgreSQL", "Cloudinary"]
    },
    {
      title: "SmallsLive",
      description: "Ticket management platform for live jazz at three NYC venues (Smalls, Mezzrow, JazzCultural). Rebuilt the Stripe checkout flow on a legacy Django app to support 3DS2/SCA: server creates a PaymentIntent, client calls confirmCardPayment (which handles the 3DS challenge inline via Stripe.js), then submits for server-side capture on requires_capture — resolving declined EU cardholder transactions that broke under SCA enforcement.",
      url: "https://smallslive.com/",
      screenshot: "/project-screenshots/smallslive.png",
      technologies: ["Django", "Stripe", "3DS2 / SCA", "Payment Processing"],
      trafficStats: { label: "Jun 2026 snapshot of website traffic hits", peak: "328K", avg: "262K" }
    },
    {
      title: "ScholarStone",
      description: "Multi-academy LMS platform modeled on Coursera/Udemy. Instructors create courses structured as chapters → video lessons (Vimeo or YouTube), manage a draft → review → published lifecycle, and build quizzes. Students enroll, track lesson completion, and receive auto-generated certificates on finishing a course. Supports multiple independent academies with their own instructor teams.",
      url: "https://www.scholarstone.net/",
      screenshot: "/project-screenshots/scholarstone.png",
      technologies: ["Django", "Django REST", "PostgreSQL", "LMS", "Certificate Generation"]
    },
    {
      title: "Exporter Crabarian",
      description: "ERP system for freight export management — Django REST backend, Vue.js frontend. Covers the full export workflow: inventory tracking → shipment creation → flight booking → sales and order management → payment processing → ledger reconciliation. Multi-company architecture with per-company configuration and role-based access.",
      url: "https://exporter.crabarian.com/",
      screenshot: "/project-screenshots/crabarian.png",
      technologies: ["Django", "Vue.js", "PostgreSQL", "REST API", "Multi-tenant"]
    }
  ];

  const projects = [
    {
      title: "University Certificate Automation System",
      description: "Full-stack certificate issuance system with Django REST Framework, PostgreSQL backend, and Vue.js frontend for a database course project. Presented to university ICT Cell for potential official implementation.",
      technologies: ["Django", "Django REST", "PostgreSQL", "Vue.js", "Certificate Generation"],
      links: {
        github: "https://github.com/amitpaul05/ku-certificate-portal.git",
        demo: "#"
      },
      featured: true
    },
    {
      title: "Smart Canteen System",
      description: "Face-recognition-based canteen management system. Identifies students at payment terminals, records food consumption per student, and automates payment tracking — replacing manual cashier workflows.",
      technologies: ["Python", "Face Recognition", "Django", "Payment Processing", "Computer Vision"],
      links: {
        github: "#"
      },
      featured: true
    },
    {
      title: "Doctor's Appointment Queue System",
      description: "GSM/SMS-integrated appointment queue system for a medical clinic. A Django backend manages queue state; a hardware GSM module sends SMS notifications when a patient's number is called; staff and patients both have web interfaces.",
      technologies: ["Django", "GSM / SMS Integration", "PostgreSQL", "Queue Management"],
      links: {
        github: "#"
      },
      featured: true
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        {/* Projects I worked on */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Production Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional projects I've contributed to in production environments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {workProjects.map((project, index) => (
            <Card
              key={project.title}
              className={`bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 rounded-2xl transition-all duration-300 relative overflow-hidden flex flex-col${project.url ? ' hover:border-primary/30 group cursor-pointer' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => project.url && window.open(project.url, '_blank')}
            >
              {project.screenshot && (
                <div className="relative overflow-hidden h-44 rounded-t-2xl flex-shrink-0">
                  <img
                    src={project.screenshot}
                    alt={`${project.title} — ${project.description.split(/\.\s/)[0]}`}
                    className="w-full h-full object-cover object-top transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60" />
                </div>
              )}
              <CardContent className="p-6 relative z-10 flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      {!project.url && (
                        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded border border-border text-muted-foreground">
                          <Lock className="h-3 w-3" /> Private
                        </span>
                      )}
                      {project.url && (
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300 mt-1" />
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  {'architectureNote' in project && project.architectureNote && (
                    <p className="text-xs font-mono text-muted-foreground mb-4 pt-2 border-t border-border/50 leading-relaxed">
                      {project.architectureNote}
                    </p>
                  )}
                  {'trafficStats' in project && project.trafficStats && (
                    <div className="mt-4 pt-3 border-t border-border/50">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Activity className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[11px] font-mono text-muted-foreground">{(project.trafficStats as any).label}</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 rounded-lg border border-border/50 bg-muted/20 px-3 py-2.5">
                          <div className="text-lg font-bold font-mono text-foreground leading-none mb-1">{(project.trafficStats as any).peak}</div>
                          <div className="text-[11px] text-muted-foreground">peak req / day</div>
                        </div>
                        <div className="flex-1 rounded-lg border border-border/50 bg-muted/20 px-3 py-2.5">
                          <div className="text-lg font-bold font-mono text-foreground leading-none mb-1">{(project.trafficStats as any).avg}</div>
                          <div className="text-[11px] text-muted-foreground">avg req / day</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Academic & Personal Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Projects built during university — spanning backend APIs, computer vision, and hardware integration
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 rounded-2xl hover:border-primary/30 transition-all duration-300 group relative overflow-hidden h-full"
            >
              <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  {project.links.github && project.links.github !== '#' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
                      onClick={() => window.open(project.links.github, '_blank')}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </Button>
                  )}
                  {project.links.demo && project.links.demo !== '#' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
                      onClick={() => window.open(project.links.demo, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
