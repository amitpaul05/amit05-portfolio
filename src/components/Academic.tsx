import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { GraduationCap, Book, Award, Calendar, MapPin, Mail, User } from "lucide-react";
import tomaMadam from '../assets/toma_madam.jpg';
import kuLogo from '../assets/khulna-university-logo.png';
import nahidsir from '../assets/nahid_sir.jpg';
import mizansir from '../assets/mizan_sir.jpeg';
import amit from '../assets/amit.jpg';
import bhola from '../assets/bhola.jpeg';


const Academic = () => {
  // Education Object
const education = {
  degree: "Bachelor of Science in Engineering (B.Sc. Engg.)",
  discipline: "Electronics and Communication Engineering (ECE)",
  university: "Khulna University",
  location: "Khulna, Bangladesh",
  period: "2022 - 2025 (Expected)",
  thesis: {
    title: "A Comparative Study of Vision Transformers and Time Series Transformers for Bearing Fault Diagnosis Using PU and CWRU Datasets",
    supervisor: {
      name: "Dr. Rafia Nishat Toma",
      photo: tomaMadam,
      contact: "mailto:rafiatoma@ece.ku.ac.bd",
      portfolio: "https://ku.ac.bd/discipline/ece/faculty/rafiatoma",
      role: "Supervisor"
    },
    member: {
      name: "Prof. Dr. Md. Mizanur Rahman",
      photo: mizansir,
      contact: "mailto:mizan.ku@ku.ac.bd",
      portfolio: "https://ku.ac.bd/discipline/ece/faculty/mizan.ku",
      role: "Member"
    },
    externalMember: {
      name: "Prof. Dr. Abdullah-Al Nahid",
      photo: nahidsir,
      contact: "mailto:nahid.ece.ku@gmail.com",
      portfolio: "https://ku.ac.bd/discipline/ece/faculty/nahid.ece.ku",
      role: "External Member"
    },
    students: [
      {
        name: "Amit Paul",
        photo: amit,
        contact: "mailto:amit210905@gmail.com",
        portfolio: "https://portfolio.example.com",
        role: "Student"
      },
      {
        name: "Bholanath Bala",
        photo: bhola,
        contact: "mailto:bholanath@example.com",
        portfolio: "https://www.linkedin.com/in/bhola-nath-bala-16064b263/",
        role: "Student"
      }
    ],
    description: `
      <p>
        This study compares <strong>Vision Transformers (ViT)</strong> and 
        <strong>Time Series Transformers (TST)</strong> for detecting bearing faults 
        using <span style="color:#60a5fa;">PU</span> and 
        <span style="color:#34d399;">CWRU</span> datasets.
      </p>
      <p>
        Bearings are crucial in machinery, and early fault detection helps prevent costly failures. 
        <br/>ViT processes <em>spectrogram images</em>, while TST works with <em>raw time-series data</em>.
      </p>
      <p>
        The primary goal is to improve <strong>accuracy</strong>, <strong>noise robustness</strong>, 
        and <strong>cross-dataset performance</strong>.
      </p>
      <p class="text-gray-400 my-2 text-sm">
        <strong>Electronics and Communication Engineering Discipline</strong><br/>
        Khulna University, Khulna
      </p>
    `,
    technologies: ["Vision Transformer", "Time Series Transformer", "Artificial Intelligence", "Python", "LLM"]
  }

  };

  const courses = [
    "Artificial Intelligence",
    "Data Structures & Algorithms",
    "Structured Programming",
    "Object Oriented Programming",
    "Database & Web Design",
    "Internet of Things",
    "Digital Electronics",
    "Signals & Systems",
    "Digital Signal Processing",
    "Digital Communication",
    "VLSI Circuits & Design",
    "Industrial & Power Electronics",
    "Semiconductor Processing & Fabrication Technology",
    "Optoelectronics Devices & Optical Communication",
    "Power Station, Switchgear & Protection"
  ];


  const achievements = [
    "Developed a Smart Canteen System using face recognition for automated tracking and payment",
    "Built an Automated Doctor Serial Management System with SMS and web-based appointment management",
    "Completed multiple backend projects using Django and Django REST Framework",
    "Contributed to open-source projects / personal coding projects on GitHub"
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
          <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg shadow-md">
                  <GraduationCap className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1">
                  {/* Discipline highlighted */}
                  <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                    {education.discipline}
                  </p>

                  {/* Degree as badge */}
                  <span className="inline-block bg-gray-700/50 text-gray-100 text-sm font-medium px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                    {education.degree}
                  </span>

                  {/* Info row with slightly bigger text */}
                  <div className="flex flex-wrap items-center gap-6 text-gray-200 text-sm md:text-base">
                    <div className="flex items-center gap-1">
                      <img 
                        src={kuLogo}
                        alt="Khulna University"
                        className="h-5 w-5 object-contain"
                      />
                      {education.university}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-5 w-5" />
                      {education.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-5 w-5" />
                      {education.period}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Thesis */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:space-x-6">
                
                {/* Icon Section */}
                <div className="p-3 bg-accent/10 rounded-lg mb-6 md:mb-0">
                  <Award className="h-8 w-8 text-accent" />
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  {/* Thesis Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">Final Year Thesis</h3>
                  <h4 className="font-extrabold text-white mb-4 border-b-2 border-accent py-1">
                    {education.thesis.title}
                  </h4>

                  {/* Description */}
                  <div
                    className="text-gray-300 mb-6 leading-relaxed prose prose-invert max-w-none p-2"
                    dangerouslySetInnerHTML={{ __html: education.thesis.description }}
                  />

                  {/* Authors & Committee */}
                  <div className="p-4 md:p-8 rounded-xl">
                    <h4 className="text-2xl font-bold text-white mb-6 md:mb-8 border-b border-gray-600 pb-2">
                      Thesis Authors & Committee
                    </h4>

                    {/* Committee Members */}
                    <div className="flex flex-wrap md:flex-nowrap gap-6 mb-6">
                      {[education.thesis.supervisor, education.thesis.member, education.thesis.externalMember].map((person, i) => (
                        <div key={i} className="flex flex-col items-center text-center flex-1 md:flex-none">
                          <img
                            src={person.photo || "/example-person.png"}
                            alt={person.name}
                            className="h-24 w-24 sm:h-32 sm:w-32 md:h-32 md:w-32 rounded-full object-cover mb-2 border-2 border-primary"
                          />
                          <h4 className="font-semibold text-white">{person.name}</h4>
                          <p className="text-gray-300">{person.role}</p>

                          {/* Icons */}
                          <div className="flex justify-center space-x-4 mt-2">
                            {person.contact && (
                              <div className="relative group">
                                <a
                                  href={person.contact}
                                  className="transition-transform duration-300 hover:scale-110"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Mail className="h-5 w-5 text-gray-400 group-hover:text-white hover:drop-shadow-[0_0_2px_#1e40af]" />
                                </a>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                  Send Email
                                </span>
                              </div>
                            )}

                            {person.portfolio && (
                              <div className="relative group">
                                <a
                                  href={person.portfolio}
                                  className="transition-transform duration-300 hover:scale-110"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <User className="h-5 w-5 text-gray-400 group-hover:text-white hover:drop-shadow-[0_0_2px_#1e40af]" />
                                </a>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                  View Portfolio
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Students */}
                    <div className="flex flex-wrap md:flex-nowrap gap-6">
                      {education.thesis.students.map((student, i) => (
                        <div key={i} className="flex flex-col items-center text-center flex-1 md:flex-none">
                          <img
                            src={student.photo || "/example-person.png"}
                            alt={student.name}
                            className="h-24 w-24 sm:h-32 sm:w-32 md:h-32 md:w-32 rounded-full object-cover mb-2 border-2 border-accent"
                          />
                          <h4 className="font-semibold text-white">{student.name}</h4>
                          <p className="text-gray-300">{student.role}</p>

                          {/* Icons */}
                          <div className="flex justify-center space-x-4 mt-2">
                            {student.contact && (
                              <div className="relative group">
                                <a
                                  href={student.contact}
                                  className="transition-transform duration-300 hover:scale-110"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Mail className="h-5 w-5 text-gray-400 group-hover:text-white hover:drop-shadow-[0_0_2px_#1e40af]" />
                                </a>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                  Send Email
                                </span>
                              </div>
                            )}

                            {student.portfolio && (
                              <div className="relative group">
                                <a
                                  href={student.portfolio}
                                  className="transition-transform duration-300 hover:scale-110"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <User className="h-5 w-5 text-gray-400 group-hover:text-white hover:drop-shadow-[0_0_2px_#1e40af]" />
                                </a>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                  View Portfolio
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies Used */}
                  <div className="mt-6">
                    <h5 className="font-bold text-xl bg-clip-text bg-gradient-to-r via-purple-500 to-pink-500 mb-3">
                      Technologies Used
                    </h5>

                    <div className="flex flex-wrap gap-3">
                      {education.thesis.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-sm font-medium px-3 py-1 rounded-full border border-gray-600 hover:brightness-110 transition-all duration-300"
                          style={{
                            background: "linear-gradient(90deg, #3b82f6, #a855f7, #ec4899)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {tech}
                        </span>
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
              <h3 className="text-2xl font-bold text-foreground mb-6">Achievements</h3>
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