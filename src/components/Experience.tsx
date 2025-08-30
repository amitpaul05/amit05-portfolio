import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Backend Developer",
      company: "Idlewild Digital",
      location: "Dhaka, Bangladesh",
      period: "Jan 2024 - Present",
      type: "Full-time",
      achievements: [
        "Designed and developed microservice architecture (75% ownership) for a feature-rich LMS using Django REST Framework, with fine-grained permission control and modular API structure",
        "Implemented real-time notification tracking and automated certificate generation with WeasyPrint, enhancing user engagement and admin efficiency",
        "Collaborated on Vue.js frontend components, integrated RESTful services with 'active', and ensured smooth user interaction across modules"
      ],
      technologies: ["Django", "Django REST Framework", "Vue.js", "WeasyPrint", "Microservices"]
    },
    {
      title: "Python Intern",
      company: "Idlewild Digital",
      location: "Dhaka, Bangladesh", 
      period: "Aug 2023 - Dec 2023",
      type: "Internship",
      achievements: [
        "Developed 'Daily Updates,' an internal team communication and reporting tool using Django REST Framework",
        "Implemented secure login, update scheduling, and auto-archive of posts; practiced modular coding and DRY principles",
        "Utilized Git for version control and followed Agile workflows via Bitbucket repositories and issue boards"
      ],
      technologies: ["Django REST", "Python", "Git", "Bitbucket", "Agile"]
    },
    {
      title: "Data Science & Engineering Trainee",
      company: "Grameenphone Ltd.",
      location: "Dhaka, Bangladesh",
      period: "Jan 2025 - Feb 2025",
      type: "Industrial Attachment Program",
      achievements: [
        "Designed and prototyped a chatbot using dummy telecom FAQs and REST APIs for user query simulation",
        "Built simple ETL pipelines to ingest mock call data records and visualize using matplotlib and Power BI",
        "Explored real-world data engineering practices including data cleaning, dashboard preparation, and performance benchmarking in Python"
      ],
      technologies: ["Python", "REST APIs", "ETL", "Data Visualization", "Power BI"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-section-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building scalable backend systems and contributing to full-stack development teams
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-full bg-border"></div>
              )}
              
              <Card 
                className="
                  mb-8 ml-12 backdrop-blur-xl bg-gradient-to-br from-background/30 via-background/50 to-background/30 
                  border border-white/20 rounded-2xl shadow-2xl
                  hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]
                  before:absolute before:inset-0 before:rounded-2xl 
                  before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-transparent
                  before:blur-sm relative overflow-hidden group
                  hover:border-primary/30 transition-all duration-300
                "
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-8 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background group-hover:bg-tech-cyan transition-colors duration-300"></div>
                
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
                          <span>{exp.period}</span>
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
                        <span className="text-primary mt-2 block w-1 h-1 rounded-full bg-primary flex-shrink-0"></span>
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