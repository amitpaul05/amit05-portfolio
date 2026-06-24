import { useLayoutEffect, useRef, useState } from "react";
import { Building, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type DateRange = {
  from: string;
  fromISO: string;
  to: string;
  toISO: string | null;
};

type Role = {
  title: string;
  company: string;
  location: string;
  dateRange: DateRange;
  type: string;
  achievements: string[];
  technologies: string[];
};

const experiences: Role[] = [
  {
    title: "Software Engineer",
    company: "Idlewild Digital",
    location: "Dhaka, Bangladesh",
    dateRange: { from: "Mar 2026", fromISO: "2026-03", to: "Present", toISO: null },
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
    dateRange: { from: "Jan 2024", fromISO: "2024-01", to: "Feb 2026", toISO: "2026-02" },
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
    dateRange: { from: "Aug 2023", fromISO: "2023-08", to: "Dec 2023", toISO: "2023-12" },
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
    dateRange: { from: "Jan 2025", fromISO: "2025-01", to: "Feb 2025", toISO: "2025-02" },
    type: "Industrial Attachment Program",
    achievements: [
      "Built ETL pipelines in Python to ingest, clean, and aggregate simulated call data records; delivered Power BI dashboards surfacing telecom KPIs including call volume trends and service type breakdown",
      "Prototyped a customer FAQ routing chatbot via REST API integrations, simulating an IVR deflection flow for telecom support queries"
    ],
    technologies: ["Python", "ETL", "Power BI", "REST APIs", "Data Visualization"]
  }
];

const companies: { company: string; roles: { role: Role; index: number }[] }[] = [];
experiences.forEach((role, index) => {
  const last = companies[companies.length - 1];
  if (last && last.company === role.company) last.roles.push({ role, index });
  else companies.push({ company: role.company, roles: [{ role, index }] });
});

const dateLabel = (d: DateRange) => (
  <>
    <time dateTime={d.fromISO}>{d.from}</time>
    {" – "}
    {d.toISO ? <time dateTime={d.toISO}>{d.to}</time> : d.to}
  </>
);

const RoleDetail = ({ role }: { role: Role }) => (
  <>
    <ul className="space-y-3 mb-5">
      {role.achievements.map((achievement, i) => (
        <li key={i} className="font-serif text-body-md text-on-surface-variant leading-relaxed flex items-start gap-3">
          <span className="mt-2.5 block w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          <span>{achievement}</span>
        </li>
      ))}
    </ul>
    <div className="flex flex-wrap gap-2">
      {role.technologies.map((tech) => (
        <span key={tech} className="font-mono text-xs bg-surface-container-high text-on-surface-variant px-2 py-1 rounded">
          {tech}
        </span>
      ))}
    </div>
  </>
);

const Experience = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set());

  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [path, setPath] = useState("");

  const selectedRole = experiences[selected];

  useLayoutEffect(() => {
    const recalc = () => {
      const wrap = wrapRef.current;
      const card = cardRefs.current[selected];
      const panel = panelRef.current;
      if (!wrap || !card || !panel || window.innerWidth < 1024) {
        setPath("");
        return;
      }
      const w = wrap.getBoundingClientRect();
      const c = card.getBoundingClientRect();
      const p = panel.getBoundingClientRect();
      const x1 = c.right - w.left;
      const y1 = c.top - w.top + c.height / 2;
      const x2 = p.left - w.left;
      const y2 = p.top - w.top + 32;
      const dx = Math.max(28, (x2 - x1) * 0.6);
      setPath(`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`);
    };
    recalc();
    let raf = 0;
    const onMove = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(recalc);
    };
    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
      cancelAnimationFrame(raf);
    };
  }, [selected]);

  return (
    <section id="experience" className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-16">
      <header className="mb-12 text-center">
        <h2 className="font-sans text-headline-md text-primary mb-2">The Journey</h2>
        <p className="font-sans text-label-md uppercase tracking-widest text-secondary">
          Career steps — intern to engineer
        </p>
        <div className="w-16 h-1 bg-primary rounded-full mt-4 mx-auto" />
      </header>

      <div
        ref={wrapRef}
        className="relative grid lg:grid-cols-[300px_minmax(0,1fr)] gap-gutter items-start"
      >
        <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden>
          {path && (
            <path
              d={path}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>

        <div className="relative z-10 space-y-8">
          {companies.map((co) => (
            <div key={co.company}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans text-headline-sm text-primary leading-tight">{co.company}</h3>
                  <p className="font-sans text-label-md text-on-surface-variant">
                    {co.roles.length > 1 ? `${co.roles.length} roles · promoted` : co.roles[0].role.type}
                  </p>
                </div>
              </div>

              <ol className="relative ml-5 pl-8 border-l-2 border-outline-variant/40 space-y-3">
                {co.roles.map(({ role, index }) => {
                  const isOpen = expanded.has(index);
                  const isSel = selected === index;
                  return (
                    <li key={index} className="relative">
                      <span
                        className={cn(
                          "absolute -left-[41px] top-4 w-3 h-3 rounded-full border-2 transition-colors",
                          isOpen ? "bg-primary border-primary" : "bg-background border-outline-variant",
                          isSel ? "lg:bg-primary lg:border-primary" : "lg:bg-background lg:border-outline-variant"
                        )}
                      />
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        ref={(el) => (cardRefs.current[index] = el)}
                        onClick={() => {
                          setSelected(index);
                          const willOpen = !expanded.has(index);
                          setExpanded((prev) => {
                            const next = new Set(prev);
                            willOpen ? next.add(index) : next.delete(index);
                            return next;
                          });
                          if (willOpen && window.innerWidth < 1024) {
                            const el = cardRefs.current[index];
                            window.setTimeout(
                              () => el?.scrollIntoView({ behavior: "smooth", block: "start" }),
                              320
                            );
                          }
                        }}
                        className={cn(
                          "w-full text-left rounded-lg border p-4 transition-all duration-300 scroll-mt-20",
                          isOpen ? "bg-surface-container-lowest border-primary/40 material-card" : "border-outline-variant/30 bg-surface-container-low/50",
                          isSel ? "lg:bg-surface-container-lowest lg:border-primary/40 lg:material-card" : "lg:border-outline-variant/30 lg:bg-surface-container-low/50"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="font-sans text-label-md text-primary block mb-0.5">
                              {dateLabel(role.dateRange)}
                            </span>
                            <h4 className="font-sans text-headline-sm text-primary">{role.title}</h4>
                            <p className="font-sans text-sm text-on-surface-variant mt-0.5">
                              {role.type} · {role.location}
                            </p>
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 shrink-0 mt-1 text-on-surface-variant transition-transform lg:hidden",
                              isOpen && "rotate-180 text-primary"
                            )}
                          />
                        </div>

                        <div
                          className={cn(
                            "lg:hidden grid transition-[grid-template-rows] duration-300 ease-out",
                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="pt-4 mt-4 border-t border-outline-variant/30">
                              <RoleDetail role={role} />
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>

        <div
          ref={panelRef}
          className="hidden lg:flex lg:flex-col lg:sticky lg:top-24 lg:h-[calc(100vh)] material-card bg-surface-container-lowest border border-primary/40 rounded-lg overflow-hidden"
        >
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-outline-variant/30 shrink-0">
            <h3 className="font-sans text-headline-sm text-primary truncate">{selectedRole.title}</h3>
            <span className="shrink-0 bg-secondary-container text-on-secondary-container px-3 py-1 rounded font-sans text-label-md">
              {selectedRole.type}
            </span>
          </div>
          <div className="px-6 py-5 overflow-y-auto">
            <RoleDetail role={selectedRole} />
          </div>
        </div>
      </div>

      <div
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="mt-12 bg-[#1e1e1e] rounded-lg p-6 md:p-8 shadow-xl overflow-x-auto border border-primary/20"
      >
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
          <span className="w-3 h-3 rounded-full bg-error" />
          <span className="w-3 h-3 rounded-full bg-tertiary-fixed" />
          <span className="w-3 h-3 rounded-full bg-on-primary-container" />
          <span className="ml-4 font-mono text-sm text-white/40">engineer.py</span>
        </div>
        <pre className="font-mono text-sm leading-relaxed text-white/80">
{`from dataclasses import dataclass

`}<span className="text-[#c678dd]">@dataclass</span>{`
`}<span className="text-[#c678dd]">class</span>{` `}<span className="text-[#e5c07b]">Engineer</span>{`:
    name: `}<span className="text-[#e5c07b]">str</span>{` = `}<span className="text-[#98c379]">"Amit Paul"</span>{`
    role: `}<span className="text-[#e5c07b]">str</span>{` = `}<span className="text-[#98c379]">"Backend Engineer"</span>{`
    stack = (`}<span className="text-[#98c379]">"Django"</span>{`, `}<span className="text-[#98c379]">"PostgreSQL"</span>{`, `}<span className="text-[#98c379]">"Celery"</span>{`, `}<span className="text-[#98c379]">"Docker"</span>{`)

    `}<span className="text-[#c678dd]">def</span>{` `}<span className="text-[#61afef]">build</span>{`(self, system: `}<span className="text-[#e5c07b]">str</span>{`) -> `}<span className="text-[#e5c07b]">str</span>{`:
        `}<span className="text-[#5c6370]"># ship it: reliable, observable, maintainable</span>{`
        `}<span className="text-[#c678dd]">return</span>{` `}<span className="text-[#98c379]">{`f"{system} → production"`}</span>{`


amit = Engineer()
amit.build(`}<span className="text-[#98c379]">"AYO · Govara · SmallsLive"</span>{`)`}
        </pre>
      </div>
    </section>
  );
};

export default Experience;
