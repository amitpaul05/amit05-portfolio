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
      description: "Built ETL pipelines in Python to ingest and aggregate call data records; delivered Power BI dashboards surfacing telecom KPIs including call volume trends and service type breakdown.",
      link: "https://drive.google.com/file/d/1e6sGcNpnBjjLzK6owj3xqWNzx001XqLL/view"
    },
    {
      title: "Intro to Machine Learning",
      issuer: "Kaggle",
      focus: "Machine Learning Fundamentals",
      date: "2024",
      type: "Online Course",
      description: "Core machine learning concepts including decision trees, random forests, gradient boosting, and cross-validation — practical implementation in Python with scikit-learn.",
      link: "https://www.kaggle.com/learn/certification/amit210905/intro-to-machine-learning"
    },
    {
      title: "Django Web Framework",
      issuer: "Meta",
      focus: "Backend Development",
      date: "2024",
      type: "Professional Certificate",
      description: "Django ORM, views, forms, authentication, REST API design, and deployment patterns — Meta's backend track on Coursera.",
      link: "https://www.coursera.org/account/accomplishments/verify/JWJ6XA6H396S?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course"
    },
    {
      title: "ICPC Asia Dhaka Regional",
      issuer: "ICPC Global",
      focus: "Competitive Programming",
      date: "2021",
      type: "Programming Contest",
      description: "Competed in the ICPC Asia Dhaka Regional — one of Bangladesh's most competitive algorithmic programming contests.",
      link: "https://drive.google.com/file/d/1bhFtM-fy52du5xQFllsi47IzWUycJWXW/view"
    }
  ];

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Certifications & Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Competitive programming, ML foundations, and the Django track that started this career.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <Card
              key={cert.title}
              className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 rounded-2xl hover:border-primary/30 transition-all duration-300 group relative overflow-hidden h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <Award className="h-8 w-8 text-primary group-hover:text-primary/70 transition-colors duration-300 flex-shrink-0" />
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
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {cert.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {cert.focus}
                    </Badge>
                  </div>
                  
                  <a 
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:text-foreground transition-colors duration-200 cursor-pointer text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>View Certificate</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Certifications;