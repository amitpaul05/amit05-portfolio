import { Card, CardContent } from "./ui/card";

type SkillTier = 'core' | 'proficient' | 'familiar';

const tierClass: Record<SkillTier, string> = {
  core:       "border border-accent-green/60 bg-accent-green/5 text-accent-green text-sm font-medium px-3 py-1 rounded",
  proficient: "border border-muted-foreground/50 text-foreground text-sm font-medium px-3 py-1 rounded",
  familiar:   "border border-muted-foreground/25 text-muted-foreground text-sm font-medium px-3 py-1 rounded",
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
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Django and Python at the core. Everything else learned by shipping real systems.
          </p>
        </div>

        {/* Tier legend */}
        <div className="flex justify-center gap-6 mb-10 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-accent-green inline-block"></span> Core
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm border border-border inline-block"></span> Proficient
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm border border-border/50 opacity-50 inline-block"></span> Familiar
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={category.title}
              className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 rounded-2xl hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill.name} className={tierClass[skill.tier]}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Problem solving — LeetCode · Codeforces · Active DSA practice
        </p>
      </div>
    </section>
  );
};

export default Skills;
