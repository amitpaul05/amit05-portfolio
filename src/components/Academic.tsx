import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { GraduationCap, Book, Award, Calendar, MapPin, Mail, ExternalLink } from "lucide-react";
import kuLogo from '../assets/khulna-university-logo.png';
import tomaMadam from '../assets/toma_madam.webp';
import nahidsir from '../assets/nahid_sir.webp';
import mizansir from '../assets/mizan_sir.webp';
import amit from '../assets/amit.webp';
import bhola from '../assets/bhola.webp';

type Person = {
  name: string;
  role: string;
  photo: string;
  contact?: string;
  portfolio?: string;
};

const PersonCard = ({ person }: { person: Person }) => (
  <div className="flex flex-col items-center text-center gap-1.5">
    <img
      src={person.photo}
      alt={person.name}
      className="w-14 h-14 rounded-full object-cover border border-border/50"
    />
    <div>
      <p className="text-sm font-medium text-card-foreground leading-tight">{person.name}</p>
      <p className="text-xs text-muted-foreground">{person.role}</p>
    </div>
    <div className="flex gap-3">
      {person.contact && (
        <a
          href={person.contact}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Email ${person.name}`}
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Mail className="h-3.5 w-3.5" />
        </a>
      )}
      {person.portfolio && (
        <a
          href={person.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${person.name} profile`}
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  </div>
);

const Academic = () => {
  const education = {
    degree: "Bachelor of Science in Engineering (B.Sc. Engg.)",
    discipline: "Electronics and Communication Engineering",
    university: "Khulna University",
    location: "Khulna, Bangladesh",
    period: "2022 – 2025 (Expected)",
    thesis: {
      title: "A Comparative Study of Vision Transformers and Time Series Transformers for Bearing Fault Diagnosis Using PU and CWRU Datasets",
      technologies: ["Vision Transformer", "Time Series Transformer", "Python", "Artificial Intelligence"],
      committee: [
        {
          name: "Dr. Rafia Nishat Toma",
          role: "Supervisor",
          photo: tomaMadam,
          contact: "mailto:rafiatoma@ece.ku.ac.bd",
          portfolio: "https://ku.ac.bd/discipline/ece/faculty/rafiatoma",
        },
        {
          name: "Prof. Dr. Md. Mizanur Rahman",
          role: "Member",
          photo: mizansir,
          contact: "mailto:mizan.ku@ku.ac.bd",
          portfolio: "https://ku.ac.bd/discipline/ece/faculty/mizan.ku",
        },
        {
          name: "Prof. Dr. Abdullah-Al Nahid",
          role: "External Member",
          photo: nahidsir,
          contact: "mailto:nahid.ece.ku@gmail.com",
          portfolio: "https://ku.ac.bd/discipline/ece/faculty/nahid.ece.ku",
        },
      ] as Person[],
      students: [
        {
          name: "Amit Paul",
          role: "Student",
          photo: amit,
          contact: "mailto:amit.paul.ece@gmail.com",
          portfolio: "https://amitpaul-portfolio.netlify.app/",
        },
        {
          name: "Bholanath Bala",
          role: "Student",
          photo: bhola,
          contact: "mailto:bholanath@example.com",
          portfolio: "https://www.linkedin.com/in/bhola-nath-bala-16064b263/",
        },
      ] as Person[],
    },
  };

  const courses = [
    "Artificial Intelligence",
    "Data Structures & Algorithms",
    "Structured Programming",
    "Object Oriented Programming",
    "Database & Web Design",
    "Internet of Things",
    "Digital Signal Processing",
    "Digital Communication",
  ];

  return (
    <section id="academic" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Academic Background
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            B.Sc. in Electronics and Communication Engineering with a final-year thesis in ML-based bearing fault detection.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">

          {/* Education */}
          <Card className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xl font-semibold text-card-foreground mb-1">
                    {education.discipline}
                  </p>
                  <span className="inline-block bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                    {education.degree}
                  </span>
                  <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={kuLogo}
                        alt="Khulna University"
                        className="h-4 w-4 object-contain"
                      />
                      <span>{education.university}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span>{education.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{education.period}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thesis */}
          <Card className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Final Year Thesis
                  </p>
                  <h3 className="font-semibold text-card-foreground leading-snug mb-4">
                    {education.thesis.title}
                  </h3>

                  <div className="text-sm text-muted-foreground leading-relaxed space-y-2 mb-5">
                    <p>
                      Compared{" "}
                      <strong className="text-card-foreground font-medium">Vision Transformers (ViT)</strong>{" "}
                      and{" "}
                      <strong className="text-card-foreground font-medium">Time Series Transformers (TST)</strong>{" "}
                      for bearing fault detection using the{" "}
                      <strong className="text-card-foreground font-medium">PU</strong> and{" "}
                      <strong className="text-card-foreground font-medium">CWRU</strong> datasets.
                    </p>
                    <p>
                      ViT processes spectrogram images; TST works directly with raw time-series data —
                      evaluated across accuracy, noise robustness, and cross-dataset transfer performance.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {education.thesis.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Thesis Committee */}
                  <div className="pt-5 border-t border-border/50 space-y-5">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
                        Thesis Committee
                      </p>
                      <div className="flex flex-wrap gap-6">
                        {education.thesis.committee.map((person) => (
                          <PersonCard key={person.name} person={person} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
                        Students
                      </p>
                      <div className="flex flex-wrap gap-6">
                        {education.thesis.students.map((person) => (
                          <PersonCard key={person.name} person={person} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Relevant Coursework */}
          <Card className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 rounded-2xl">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-card-foreground mb-6">Relevant Coursework</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {courses.map((course) => (
                  <div key={course} className="flex items-center gap-2 p-3 bg-background/50 rounded-lg border border-border/30">
                    <Book className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{course}</span>
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
