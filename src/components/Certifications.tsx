import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Award, Calendar, ExternalLink } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      title: "Industrial Attachment Program",
      issuer: "Grameenphone",
      focus: "Data Science and Data Engineering",
      date: "2025",
      type: "Digital Ninja Program",
      description: "Focused on real-world data engineering practices, ETL pipelines, and dashboard development",
      badgeColor: "bg-tech-blue/10 text-tech-blue border-tech-blue/20"
    },
    {
      title: "Intro to Machine Learning",
      issuer: "Kaggle",
      focus: "Machine Learning Fundamentals",
      date: "2024",
      type: "Online Course",
      description: "Core machine learning concepts, algorithms, and practical implementation",
      badgeColor: "bg-tech-cyan/10 text-tech-cyan border-tech-cyan/20"
    },
    {
      title: "Django Web Framework",
      issuer: "Meta",
      focus: "Backend Development",
      date: "2024",
      type: "Professional Certificate",
      description: "Advanced Django development, REST APIs, and scalable web application architecture",
      badgeColor: "bg-primary/10 text-primary border-primary/20"
    },
    {
      title: "Backend Development Track",
      issuer: "Programming Hero",
      focus: "Backend Engineering",
      date: "2023",
      type: "Comprehensive Program",
      description: "Full-stack backend development with focus on Python, Django, and system design",
      badgeColor: "bg-accent/10 text-accent border-accent/20"
    },
    {
      title: "ICPC Asia Dhaka Regional",
      issuer: "ICPC Global",
      focus: "Competitive Programming",
      date: "2021",
      type: "Programming Contest",
      description: "Participated in prestigious international competitive programming contest",
      badgeColor: "bg-destructive/10 text-destructive border-destructive/20"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Certifications & Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and professional development in backend technologies and problem-solving
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <Card 
              key={cert.title} 
              className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card group h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <Award className="h-8 w-8 text-primary group-hover:text-tech-cyan transition-colors duration-300 flex-shrink-0" />
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{cert.date}</span>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                    {cert.title}
                  </h3>
                  
                  <p className="text-muted-foreground font-medium mb-3">
                    {cert.issuer}
                  </p>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className={cert.badgeColor}>
                      {cert.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {cert.focus}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-primary hover:text-tech-cyan transition-colors duration-300 cursor-pointer text-sm group-hover:translate-x-1 transition-transform duration-300">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <span>View Certificate</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Skills Focus Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-card border-border/50 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-card-foreground">
                Continuous Learning Focus
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Actively improving problem-solving skills through competitive programming platforms 
                and staying updated with the latest backend development technologies and best practices.
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-tech-blue/10 text-tech-blue border-tech-blue/20">
                  LeetCode Problem Solving
                </Badge>
                <Badge className="bg-tech-cyan/10 text-tech-cyan border-tech-cyan/20">
                  System Design
                </Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Cloud Architecture
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Certifications;