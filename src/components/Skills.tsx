import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      title: "Backend Development",
      skills: ["Python", "Django", "Django REST Framework", "PostgreSQL", "Celery", "Redis", "RESTful APIs"],
      color: "bg-primary/10 text-primary border-primary/20"
    },
    {
      title: "Frontend & Tools",
      skills: ["Vue.js", "HTML/CSS", "JavaScript", "Git", "GitHub", "Linux/Ubuntu", "Android Studio"],
      color: "bg-tech-cyan/10 text-tech-cyan border-tech-cyan/20"
    },
    {
      title: "Architecture & DevOps",
      skills: ["Microservices", "Scalable Architecture", "PDF Generation", "WeasyPrint", "pdfkit", "Modular Design"],
      color: "bg-primary/10 text-primary border-primary/20"
    },
    {
      title: "Problem Solving",
      skills: ["LeetCode", "Codeforces", "Algorithm Design", "Data Structures", "System Design", "Performance Optimization"],
      color: "bg-accent/10 text-accent border-accent/20"
    }
  ];

  return (
    <section className="py-20 bg-section-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized in backend development with a focus on scalable, maintainable solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title} 
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
                <h3 className="text-xl font-semibold mb-4 text-card-foreground group-hover:text-primary transition-colors duration-300">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className={`${category.color} hover:scale-105 transition-transform duration-200 cursor-default`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;