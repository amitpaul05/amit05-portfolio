import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import leetcodeIcon from "../assets/leetcode-icon.svg";
import codeforcesIcon from "../assets/codeforces-icon.svg";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "amit210905@gmail.com",
      href: "mailto:amit210905@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+880177720932",
      href: "tel:+880177720932"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Khulna, Bangladesh",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/amitpaul05",
      color: "hover:text-tech-blue",
      isLucideIcon: true,
      iconSrc: ""
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/amitpaul05/",
      color: "hover:text-tech-cyan",
      isLucideIcon: true,
      iconSrc: ""
    },
    {
      icon: null,
      label: "LeetCode",
      href: "https://leetcode.com/amit210905",
      color: "hover:text-primary",
      isLucideIcon: false,
      iconSrc: leetcodeIcon
    },
    {
      icon: null,
      label: "Codeforces",
      href: "https://codeforces.com/profile/amit210905",
      color: "hover:text-accent",
      isLucideIcon: false,
      iconSrc: codeforcesIcon
    }
  ];

  return (
    <section className="py-20 bg-section-bg animate-on-scroll">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent gradient-text-animated">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready for backend engineering challenges at global-level companies. Let's discuss how I can contribute to your team.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-elegant card-hover animate-slide-in-left">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-card-foreground">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((contact, index) => (
                    <div key={contact.label} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <contact.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{contact.label}</p>
                        <a 
                          href={contact.href}
                          className="text-card-foreground hover:text-primary transition-colors duration-300 font-medium"
                          title={
                            contact.label === "Email" ? "Send me an email" :
                            contact.label === "Phone" ? "Call me directly" :
                            "My current location"
                          }
                        >
                          {contact.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-border/50">
                  <h4 className="text-lg font-medium mb-4 text-card-foreground">
                    Professional Profiles
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className={`flex items-center gap-3 p-3 rounded-lg bg-card/50 hover:bg-card/80 text-muted-foreground ${social.color} transition-all duration-300 hover:scale-105`}
                        title={
                          social.label === "GitHub" ? "View my GitHub repositories and projects" :
                          social.label === "LinkedIn" ? "Connect with me on LinkedIn" :
                          social.label === "LeetCode" ? "Check out my coding solutions on LeetCode" :
                          "Visit my Codeforces profile for competitive programming"
                        }
                      >
                        {social.isLucideIcon ? (
                          <social.icon className="h-5 w-5" />
                        ) : (
                          <img src={social.iconSrc} alt={social.label} className="h-5 w-5" />
                        )}
                        <span className="font-medium">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Message */}
            <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-elegant card-hover animate-slide-in-right">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-card-foreground">
                  Ready to Collaborate
                </h3>
                
                <div className="space-y-6">
                  <div className="p-6 bg-card/30 rounded-lg border border-border/30">
                    <h4 className="font-semibold text-card-foreground mb-3">
                      Backend Engineering Expertise
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Specialized in Django, REST APIs, PostgreSQL, and scalable architecture. 
                      Experience with microservices, real-time systems, and performance optimization.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-card/30 rounded-lg border border-border/30">
                    <h4 className="font-semibold text-card-foreground mb-3">
                      Problem Solving Focus
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Active on LeetCode and Codeforces, continuously improving algorithmic thinking 
                      and system design skills for complex engineering challenges.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      onClick={() => window.open('mailto:amit210905@gmail.com', '_blank')}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full hover:border-primary hover:text-primary transition-all duration-300"
                      onClick={() => window.open('https://drive.google.com/drive/folders/1CslS5qhOR0kxTJhxq1ot0uOKi-6Z_MCQ?usp=sharing', '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Download Resume
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-12">
            <Card className="bg-gradient-primary/5 border-primary/20 max-w-2xl mx-auto card-hover animate-scale-in">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-card-foreground">
                  Ready for Global Engineering Challenges
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Ubuntu-powered development environment, backend-first mindset, and technical confidence 
                  to tackle complex problems at companies like Google and other global tech leaders.
                </p>
                <div className="flex justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    onClick={() => window.open('mailto:amit210905@gmail.com', '_blank')}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Let's Build Something Amazing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;