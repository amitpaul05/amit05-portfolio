import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { GraduationCap, Book, Award, Calendar, MapPin } from "lucide-react";

const Academic = () => {
  const education = {
    degree: "Bachelor of Engineering in Electronics and Communication Engineering",
    university: "Khulna University",
    location: "Khulna, Bangladesh",
    period: "2018 - 2023",
    cgpa: "3.25/4.00",
    thesis: {
      title: "Smart Home Automation System using IoT and Machine Learning",
      supervisor: "Dr. Mohammad Rahman",
      description: "Developed an intelligent home automation system that learns user preferences and optimizes energy consumption using IoT sensors and ML algorithms.",
      technologies: ["Python", "Raspberry Pi", "Arduino", "TensorFlow", "MQTT", "Firebase"]
    }
  };

  const courses = [
    "Data Structures and Algorithms",
    "Database Management Systems", 
    "Computer Networks",
    "Digital Signal Processing",
    "Microprocessor Systems",
    "Software Engineering",
    "Object Oriented Programming",
    "Web Technologies"
  ];

  const achievements = [
    "Dean's List - Fall 2021, Spring 2022",
    "Best Project Award - Software Engineering Course",
    "Programming Contest - Top 10 (University Level)",
    "Technical Writing Competition - 2nd Place"
  ];

  return (
    <section id="academic" className="py-20 bg-section-bg relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Academic Background
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My educational journey and academic achievements in Electronics and Communication Engineering
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Education */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{education.degree}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Book className="h-4 w-4 mr-1" />
                      {education.university}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {education.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {education.period}
                    </div>
                  </div>
                  <div className="mb-4">
                    <Badge variant="secondary" className="text-sm">
                      CGPA: {education.cgpa}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thesis */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Final Year Thesis</h3>
                  <h4 className="text-xl font-semibold text-primary mb-3">{education.thesis.title}</h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {education.thesis.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-muted-foreground">Supervisor: </span>
                    <span className="text-sm text-foreground">{education.thesis.supervisor}</span>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-foreground">Technologies Used:</h5>
                    <div className="flex flex-wrap gap-2">
                      {education.thesis.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Relevant Courses */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Relevant Coursework</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {courses.map((course, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-background/50 rounded-lg">
                    <Book className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{course}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Academic Achievements */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Academic Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{achievement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Academic;