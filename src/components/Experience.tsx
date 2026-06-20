import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";

type DateRange = {
  from: string;
  fromISO: string;
  to: string;
  toISO: string | null;
};

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer",
      company: "Idlewild Digital",
      location: "Dhaka, Bangladesh",
      dateRange: { from: "Mar 2026", fromISO: "2026-03", to: "Present", toISO: null } as DateRange,
      type: "Full-time",
      achievements: [
        "Dockerized and redeployed 4 production Django services (scholarstone.academy, govara, smallslive, sikago) across AWS, GCP, and bare-metal VPS — resolved service startup ordering via Docker health-check dependency declarations, decoupling infrastructure state from application code with no changes to the services themselves",
        "Refactored Stripe payment integration on SmallsLive, a legacy Django ticketing platform serving 3 NYC jazz venues (Smalls Jazz Club, Mezzrow, Jazz Cultural), to meet SCA/3DS2 compliance — rebuilt the payment flow as: create PaymentMethod → confirmCardSetup → createPaymentIntent → serve 3DS challenge → capture, resolving EU cardholder authentication failures in the original single-step charge flow",
        "Extended Govara, an AI-powered B2B compliance SaaS, with Celery-based async task execution for ISO 27001 and NIST AIRM self-audit workflows, a Stripe subscription billing layer, and a GPT-4o-mini compliance assistant that maps company questionnaire responses to framework controls — serving both internal org users and independent auditors via a dual-role access model",
        "Migrated AYO's chat storage from LiteLLM middleware to direct LibreChat integration, removing a proxy hop and giving researchers full access to conversation metadata; implemented a custom DRF authentication class that validates Bearer tokens against Keycloak's userinfo endpoint (live server check, not local JWT decode) and maps keycloak_id to the Django user identity",
        "Built an async Celery-based CSV export pipeline for AYO researcher conversation data — streamed DB records in batches of 20 via queryset.iterator(), applied select_related + prefetch_related on user, chats, and media to hold query count fixed regardless of export volume; archived output to a SpooledTemporaryFile (32 MB disk-spill threshold) then uploaded to GCS and served via signed URL, eliminating HTTP timeout failures on large cohort exports"
      ],
      technologies: ["Docker", "AWS", "GCP", "Django", "Celery", "Stripe", "LibreChat", "Keycloak", "PostgreSQL", "GPT-4o-mini"]
    },
    {
      title: "Backend Developer",
      company: "Idlewild Digital",
      location: "Remote",
      dateRange: { from: "Jan 2024", fromISO: "2024-01", to: "Feb 2026", toISO: "2026-02" } as DateRange,
      type: "Part-time (Remote)",
      achievements: [
        "Designed and built the API layer (75% ownership) for ScholarStone, a multi-academy Coursera-style LMS — implemented permission scoping by academy, role, and enrollment state across a Course → Chapter → Lesson hierarchy with draft / review / published lifecycle; aggregated enrollment count, lesson count, and total duration in server-side model methods to avoid repeated N+1 reads on instructor dashboards",
        "Automated WeasyPrint PDF certificate generation on enrollment completion, storing certificates as FileField-backed assets in per-student media paths and enabling bulk download for academy admins",
        "Built Vue.js frontend components consuming the DRF API, coordinating enrollment state and lesson-progress gating so UI access controls mirrored backend permission enforcement"
      ],
      technologies: ["Django", "Django REST Framework", "Vue.js", "WeasyPrint", "PostgreSQL"]
    },
    {
      title: "Python Intern",
      company: "Idlewild Digital",
      location: "Dhaka, Bangladesh",
      dateRange: { from: "Aug 2023", fromISO: "2023-08", to: "Dec 2023", toISO: "2023-12" } as DateRange,
      type: "Internship",
      achievements: [
        "Built DailyUpdates, an internal engineering stand-up tool with Django REST Framework — implemented JWT-authenticated login, post scheduling with configurable auto-archive, and role-based read visibility; organized around modular serializers and DRY viewset patterns",
        "Practiced Agile delivery via Bitbucket: maintained feature branches and resolved PR feedback iteratively across a 5-month internship"
      ],
      technologies: ["Django REST Framework", "Python", "Git", "Bitbucket"]
    },
    {
      title: "Data Science & Engineering Trainee",
      company: "Grameenphone Ltd.",
      location: "Dhaka, Bangladesh",
      dateRange: { from: "Jan 2025", fromISO: "2025-01", to: "Feb 2025", toISO: "2025-02" } as DateRange,
      type: "Industrial Attachment Program",
      achievements: [
        "Built ETL pipelines in Python to ingest, clean, and aggregate simulated call data records; delivered Power BI dashboards surfacing telecom KPIs including call volume trends and service type breakdown",
        "Prototyped a customer FAQ routing chatbot via REST API integrations, simulating an IVR deflection flow for telecom support queries"
      ],
      technologies: ["Python", "ETL", "Power BI", "REST APIs", "Data Visualization"]
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three years at Idlewild Digital — promoted from intern to engineer. All production work, no toy projects.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-full bg-border"></div>
              )}

              <Card
                className="mb-8 ml-12 bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 rounded-2xl hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute -left-8 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background group-hover:bg-primary/70 transition-colors duration-300"></div>

                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Building className="h-4 w-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex flex-col lg:items-end gap-2 mt-2 lg:mt-0">
                      <Badge variant="secondary" className="w-fit">
                        {exp.type}
                      </Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            <time dateTime={exp.dateRange.fromISO}>{exp.dateRange.from}</time>
                            {" – "}
                            {exp.dateRange.toISO
                              ? <time dateTime={exp.dateRange.toISO}>{exp.dateRange.to}</time>
                              : exp.dateRange.to}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-muted-foreground leading-relaxed flex items-start gap-2">
                        <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs hover:border-primary/50 hover:text-primary transition-colors duration-200">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
