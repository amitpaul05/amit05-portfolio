type SkillTier = 'core' | 'proficient' | 'familiar';

const tierClass: Record<SkillTier, string> = {
  core:       "bg-primary text-on-primary font-sans text-label-md px-3 py-1 rounded",
  proficient: "bg-surface-container-high text-on-surface-variant font-sans text-label-md px-3 py-1 rounded",
  familiar:   "border border-outline-variant text-on-surface-variant/80 font-sans text-label-md px-3 py-1 rounded",
};

const skillCategories = [
  {
    title: "Backend Development",
    skills: [
      { name: "Django",                tier: "core" as SkillTier },
      { name: "Django REST Framework", tier: "core" as SkillTier },
      { name: "Python",                tier: "core" as SkillTier },
      { name: "PostgreSQL",            tier: "core" as SkillTier },
      { name: "RESTful APIs",          tier: "core" as SkillTier },
      { name: "Celery",                tier: "proficient" as SkillTier },
      { name: "Redis",                 tier: "proficient" as SkillTier },
    ],
  },
  {
    title: "Infrastructure & DevOps",
    skills: [
      { name: "Linux / Ubuntu",        tier: "core" as SkillTier },
      { name: "Git",                   tier: "core" as SkillTier },
      { name: "Docker",                tier: "proficient" as SkillTier },
      { name: "AWS",                   tier: "proficient" as SkillTier },
      { name: "GCP",                   tier: "proficient" as SkillTier },
      { name: "Nginx",                 tier: "proficient" as SkillTier },
    ],
  },
  {
    title: "Integrations",
    skills: [
      { name: "Stripe",                tier: "proficient" as SkillTier },
      { name: "Keycloak / SSO",        tier: "proficient" as SkillTier },
      { name: "OpenAI / LLMs",         tier: "proficient" as SkillTier },
      { name: "LibreChat",             tier: "familiar" as SkillTier },
      { name: "WeasyPrint",            tier: "familiar" as SkillTier },
      { name: "Cloudinary",            tier: "familiar" as SkillTier },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "Vue.js",                tier: "proficient" as SkillTier },
      { name: "HTML / CSS",            tier: "proficient" as SkillTier },
      { name: "JavaScript",            tier: "proficient" as SkillTier },
      { name: "Next.js",               tier: "familiar" as SkillTier },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-16">
      <header className="mb-8 text-center md:text-left">
        <h2 className="font-sans text-headline-md text-primary mb-2">Technical Toolkit</h2>
        <p className="font-serif text-body-md text-on-surface-variant max-w-2xl mx-auto md:mx-0">
          Django and Python at the core. Everything else learned by shipping real systems.
        </p>
      </header>

      <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-8 font-sans text-label-md text-on-surface-variant">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-primary inline-block" /> Core
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-surface-container-high inline-block" /> Proficient
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm border border-outline-variant inline-block" /> Familiar
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="material-card bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6"
          >
            <h3 className="font-sans text-headline-sm text-primary mb-4">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span key={skill.name} className={tierClass[skill.tier]}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center md:text-left font-sans text-label-md text-on-surface-variant mt-8">
        Problem solving — LeetCode · Codeforces · Active DSA practice
      </p>
    </section>
  );
};

export default Skills;
