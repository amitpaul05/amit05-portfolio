import { Github, ExternalLink, Lock, Activity, Terminal } from "lucide-react";

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

  const [featured, ...restWork] = workProjects;

  return (
    <>
      <section
        id="projects"
        data-no-animate
        className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-10 md:pt-16 pb-16"
      >
        <header className="mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-sans text-label-md uppercase tracking-wide mb-4">
            <Terminal className="h-4 w-4" />
            Engineering Repository
          </span>
          <h1 className="font-sans text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
            Selected Works &amp; Production Systems
          </h1>
          <p className="font-serif text-body-lg text-on-surface-variant max-w-2xl">
            Backend systems I've shipped in production — LLM platforms, compliance SaaS,
            payment infrastructure, and multi-tenant applications, built with Django and
            documented for clarity.
          </p>
        </header>

        <article className="material-card bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden flex flex-col lg:flex-row mb-gutter">
          <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-center order-2 lg:order-1">
            <div className="flex flex-wrap gap-2 mb-5">
              {featured.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-sans text-label-md">
                  {tech}
                </span>
              ))}
            </div>
            <h2 className="font-sans text-headline-md text-primary mb-4">{featured.title}</h2>
            <p className="font-serif text-body-md text-on-surface-variant mb-4 leading-relaxed">
              {featured.description}
            </p>
            {featured.architectureNote && (
              <p className="font-mono text-xs text-on-surface-variant border-t border-outline-variant/40 pt-4 leading-relaxed">
                {featured.architectureNote}
              </p>
            )}
            <div className="mt-6">
              {featured.url ? (
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-sans text-label-md hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="h-5 w-5" />
                  Visit Project
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 border border-outline-variant text-on-surface-variant px-4 py-2 rounded-lg font-sans text-label-md">
                  <Lock className="h-4 w-4" /> Private — access by invite
                </span>
              )}
            </div>
          </div>
          {featured.screenshot && (
            <div className="lg:w-1/2 bg-surface-container-high flex items-center justify-center order-1 lg:order-2 min-h-[240px]">
              <img
                src={featured.screenshot}
                alt={`${featured.title} — ${featured.description.split(/\.\s/)[0]}`}
                className="w-full h-full max-h-[420px] object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
        </article>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {restWork.map((project) => {
            const clickable = Boolean(project.url);
            return (
              <article
                key={project.title}
                onClick={() => project.url && window.open(project.url, "_blank")}
                className={`material-card bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden flex flex-col${clickable ? " cursor-pointer" : ""}`}
              >
                {project.screenshot && (
                  <div className="h-44 shrink-0 overflow-hidden border-b border-outline-variant/20">
                    <img
                      src={project.screenshot}
                      alt={`${project.title} — ${project.description.split(/\.\s/)[0]}`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-sans text-headline-sm text-primary">{project.title}</h3>
                    {project.url ? (
                      <ExternalLink className="h-4 w-4 text-on-surface-variant shrink-0 mt-1" />
                    ) : (
                      <span className="inline-flex items-center gap-1 shrink-0 font-sans text-label-md px-2 py-0.5 rounded border border-outline-variant text-on-surface-variant">
                        <Lock className="h-3 w-3" /> Private
                      </span>
                    )}
                  </div>
                  <p className="font-serif text-body-md text-on-surface-variant leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {"trafficStats" in project && project.trafficStats && (
                    <div className="mb-4 pt-3 border-t border-outline-variant/40">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Activity className="h-3 w-3 text-on-surface-variant" />
                        <span className="font-mono text-[11px] text-on-surface-variant">
                          {(project.trafficStats as any).label}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 rounded border border-outline-variant/40 bg-surface-container px-3 py-2.5">
                          <div className="font-mono text-lg font-bold text-primary leading-none mb-1">{(project.trafficStats as any).peak}</div>
                          <div className="font-sans text-[11px] text-on-surface-variant">peak req / day</div>
                        </div>
                        <div className="flex-1 rounded border border-outline-variant/40 bg-surface-container px-3 py-2.5">
                          <div className="font-mono text-lg font-bold text-primary leading-none mb-1">{(project.trafficStats as any).avg}</div>
                          <div className="font-sans text-[11px] text-on-surface-variant">avg req / day</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="font-mono text-xs bg-surface-container-high text-on-surface-variant px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-16">
        <header className="mb-8">
          <h2 className="font-sans text-headline-md text-primary mb-2">Academic &amp; Personal Projects</h2>
          <p className="font-serif text-body-md text-on-surface-variant max-w-2xl">
            Built during university — spanning backend APIs, computer vision, and hardware integration.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {projects.map((project) => (
            <article
              key={project.title}
              className="material-card bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 flex flex-col"
            >
              <h3 className="font-sans text-headline-sm text-primary mb-3">{project.title}</h3>
              <p className="font-serif text-body-md text-on-surface-variant leading-relaxed mb-5">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.technologies.map((tech) => (
                  <span key={tech} className="font-mono text-xs bg-surface-container-high text-on-surface-variant px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-auto">
                {project.links.github && project.links.github !== "#" && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary px-4 py-2 rounded-lg font-sans text-label-md transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                )}
                {project.links.demo && project.links.demo !== "#" && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary px-4 py-2 rounded-lg font-sans text-label-md transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
