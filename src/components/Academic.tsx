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
  <div className="flex flex-col items-center text-center gap-2 w-28">
    <img
      src={person.photo}
      alt={person.name}
      className="w-16 h-16 rounded-full object-cover border border-outline-variant/40"
    />
    <div>
      <p className="font-sans text-sm font-medium text-on-surface leading-tight">{person.name}</p>
      <p className="font-sans text-label-md text-on-surface-variant">{person.role}</p>
    </div>
    <div className="flex gap-3">
      {person.contact && (
        <a
          href={person.contact}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Email ${person.name}`}
          className="text-on-surface-variant hover:text-primary transition-colors"
        >
          <Mail className="h-4 w-4" />
        </a>
      )}
      {person.portfolio && (
        <a
          href={person.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${person.name} profile`}
          className="text-on-surface-variant hover:text-primary transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
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
    <section
      id="academic"
      data-no-animate
      className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-10 md:pt-16 pb-16"
    >
      <header className="mb-12">
        <h1 className="font-sans text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
          Academic Background
        </h1>
        <p className="font-serif text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          B.Sc. in Electronics and Communication Engineering, with a final-year thesis in
          ML-based bearing fault detection.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
          <article className="material-card bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 md:p-8">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center shrink-0">
                <GraduationCap className="h-6 w-6 text-on-secondary-container" />
              </div>
              <div className="flex-1">
                <h2 className="font-sans text-headline-sm text-primary mb-1">
                  {education.discipline}
                </h2>
                <span className="inline-block bg-surface-container-high text-on-surface-variant font-sans text-label-md uppercase tracking-wide px-3 py-1 rounded-full mb-4">
                  {education.degree}
                </span>
                <div className="flex flex-wrap items-center gap-5 font-sans text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <img src={kuLogo} alt="Khulna University" className="h-4 w-4 object-contain" />
                    {education.university}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {education.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {education.period}
                  </span>
                </div>
              </div>
            </div>
          </article>

          <article className="material-card bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 md:p-8">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center shrink-0">
                <Award className="h-6 w-6 text-on-secondary-container" />
              </div>
              <div className="flex-1">
                <p className="font-sans text-label-md uppercase tracking-widest text-secondary mb-2">
                  Final Year Thesis
                </p>
                <h3 className="font-sans text-headline-sm text-primary leading-snug mb-4">
                  {education.thesis.title}
                </h3>

                <div className="font-serif text-body-md text-on-surface-variant leading-relaxed space-y-3 mb-5">
                  <p>
                    Compared{" "}
                    <strong className="text-on-surface font-semibold">Vision Transformers (ViT)</strong>{" "}
                    and{" "}
                    <strong className="text-on-surface font-semibold">Time Series Transformers (TST)</strong>{" "}
                    for bearing fault detection using the{" "}
                    <strong className="text-on-surface font-semibold">PU</strong> and{" "}
                    <strong className="text-on-surface font-semibold">CWRU</strong> datasets.
                  </p>
                  <p>
                    ViT processes spectrogram images; TST works directly with raw time-series data —
                    evaluated across accuracy, noise robustness, and cross-dataset transfer performance.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {education.thesis.technologies.map((tech) => (
                    <span key={tech} className="bg-surface-container-high text-on-surface-variant font-sans text-label-md px-3 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-5 border-t border-outline-variant/40 space-y-6">
                  <div>
                    <p className="font-sans text-label-md uppercase tracking-widest text-secondary mb-4">
                      Thesis Committee
                    </p>
                    <div className="flex flex-wrap gap-6">
                      {education.thesis.committee.map((person) => (
                        <PersonCard key={person.name} person={person} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-sans text-label-md uppercase tracking-widest text-secondary mb-4">
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
          </article>
        </div>

        <aside className="lg:col-span-4">
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-lg p-6 lg:sticky lg:top-24">
            <h2 className="font-sans text-headline-sm text-primary mb-6 flex items-center gap-2">
              <Book className="h-5 w-5" />
              Relevant Coursework
            </h2>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li
                  key={course}
                  className="flex items-center gap-2.5 font-serif text-body-md text-on-surface-variant"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Academic;
