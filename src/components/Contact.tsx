import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";
import leetcodeIcon from "../assets/leetcode-icon.svg";
import codeforcesIcon from "../assets/codeforces-icon.svg";
import resume from '../assets/Amit_Paul_s_Resume.pdf';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "amit.paul.ece@gmail.com",
      href: "mailto:amit.paul.ece@gmail.com"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dhaka, Bangladesh",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/amitpaul05",
      isLucideIcon: true,
      iconSrc: ""
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/amitpaul05/",
      isLucideIcon: true,
      iconSrc: ""
    },
    {
      icon: null,
      label: "LeetCode",
      href: "https://leetcode.com/amit210905",
      isLucideIcon: false,
      iconSrc: leetcodeIcon
    },
    {
      icon: null,
      label: "Codeforces",
      href: "https://codeforces.com/profile/amit210905",
      isLucideIcon: false,
      iconSrc: codeforcesIcon
    }
  ];

  return (
    <section className="py-20 animate-on-scroll">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Backend engineer with production experience across LLM integrations, payment flows, and cloud deployments. Based in Dhaka — open to remote backend roles.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-elegant animate-slide-in-left">
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
                        {contact.href !== '#' ? (
                          <a
                            href={contact.href}
                            className="text-card-foreground hover:text-primary transition-colors duration-300 font-medium"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <span className="text-card-foreground font-medium">
                            {contact.value}
                          </span>
                        )}
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
                        className="group flex items-center gap-3 p-3 rounded-lg bg-card/50 hover:bg-card/80 text-muted-foreground hover:text-foreground transition-colors duration-200"
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
                          <img src={social.iconSrc} alt={social.label} className="h-6 w-6 filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-200" />
                        )}
                        <span className="font-medium">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* CTA Card */}
            <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-elegant animate-slide-in-right">
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-card-foreground">
                    Open to Opportunities
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Three years building Django systems in production — APIs, async pipelines, cloud deployments, and payment flows. Looking for backend roles where code quality and system reliability matter.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    onClick={() => window.open('mailto:amit.paul.ece@gmail.com', '_blank')}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full hover:border-primary hover:text-primary transition-all duration-300"
                    onClick={() => window.open(resume, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Download Resume
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