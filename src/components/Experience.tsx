import { Building } from "lucide-react";

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
    <section id="experience" className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-16">
      <header className="mb-12 text-center md:text-left">
        <h2 className="font-sans text-headline-md text-primary mb-2">The Journey</h2>
        <p className="font-sans text-label-md uppercase tracking-widest text-secondary">
          Three years at Idlewild Digital — intern to engineer, all production work
        </p>
        <div className="w-16 h-1 bg-primary rounded-full mt-4 mx-auto md:mx-0" />
      </header>

      <ol className="relative">
        <span className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-outline-variant to-transparent" />
        {experiences.map((exp, index) => (
          <li key={index} className="relative pl-10 md:pl-14 pb-8 last:pb-0">
            <span className="absolute left-[3px] top-2 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-background" />

            <article className="material-card bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <span className="font-sans text-label-md text-primary block mb-1">
                    <time dateTime={exp.dateRange.fromISO}>{exp.dateRange.from}</time>
                    {" – "}
                    {exp.dateRange.toISO
                      ? <time dateTime={exp.dateRange.toISO}>{exp.dateRange.to}</time>
                      : exp.dateRange.to}
                  </span>
                  <h3 className="font-sans text-headline-sm text-primary">{exp.title}</h3>
                  <div className="flex items-center gap-2 text-on-surface-variant mt-1">
                    <Building className="h-4 w-4" />
                    <span className="font-sans text-sm">{exp.company} · {exp.location}</span>
                  </div>
                </div>
                <span className="shrink-0 self-start bg-secondary-container text-on-secondary-container px-3 py-1 rounded font-sans text-label-md">
                  {exp.type}
                </span>
              </div>

              <ul className="space-y-3 mb-5">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="font-serif text-body-md text-on-surface-variant leading-relaxed flex items-start gap-3">
                    <span className="mt-2.5 block w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs bg-surface-container-high text-on-surface-variant px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Experience;
