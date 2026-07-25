import { GraduationCap, BookOpen, Medal, CalendarDots, MapPin, EnvelopeSimple, ArrowSquareOut } from "@/lib/icons";
import { cn } from "@/lib/utils";
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

const MapNode = ({ person, student = false }: { person: Person; student?: boolean }) => (
  <div className="relative z-10 flex w-full max-w-[8rem] flex-col items-center gap-1.5 text-center">
    <img
      src={person.photo}
      alt={person.name}
      className="h-14 w-14 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest object-cover shadow-[var(--shadow-card)]"
    />
    <div className="flex flex-col gap-0.5">
      <div
        className={cn(
          "flex items-center justify-center",
          student ? "min-h-[1rem]" : "min-h-[2.8125rem] md:min-h-[1.875rem]"
        )}
      >
        <p
          className={cn(
            "font-sans text-xs font-semibold leading-tight text-on-surface",
            student ? "line-clamp-1" : "line-clamp-3 md:line-clamp-2"
          )}
        >
          {person.name}
        </p>
      </div>
      <p className="line-clamp-1 font-sans text-label-md text-on-surface-variant">{person.role}</p>
    </div>
    <div className="flex gap-2.5 pt-0.5">
      {person.contact && (
        <a
          href={person.contact}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Email ${person.name}`}
          className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <EnvelopeSimple className="h-3.5 w-3.5" />
        </a>
      )}
      {person.portfolio && (
        <a
          href={person.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${person.name} profile`}
          className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowSquareOut className="h-3.5 w-3.5" />
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

  const card =
    "material-card bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 md:p-8";
  const tile =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-container";
  const eyebrow = "font-sans text-label-md uppercase tracking-widest text-secondary";

  return (
    <section
      id="academic"
      data-no-animate
      className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-10 md:pt-16 pb-16"
    >
      <header className="mb-10 md:mb-14">
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
          <article className={card}>
            <div className="mb-6 flex items-center gap-3.5">
              <div className={tile}>
                <GraduationCap className="h-6 w-6 text-on-secondary-container" />
              </div>
              <p className={eyebrow}>Undergraduate Degree</p>
            </div>
            <h2 className="font-sans text-headline-sm text-primary leading-snug">
              {education.discipline}
            </h2>
            <p className="mt-1.5 font-serif text-body-md text-on-surface-variant">
              {education.degree}
            </p>
            <div className="mt-6 flex flex-col gap-3 border-t border-outline-variant/40 pt-6 font-sans text-sm text-on-surface-variant sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
              <span className="flex items-center gap-2">
                <img src={kuLogo} alt="Khulna University" className="h-4 w-4 object-contain" />
                {education.university}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {education.location}
              </span>
              <span className="flex items-center gap-2">
                <CalendarDots className="h-4 w-4" />
                {education.period}
              </span>
            </div>
          </article>

          <article className={card}>
            <div className="mb-6 flex items-center gap-3.5">
              <div className={tile}>
                <Medal className="h-6 w-6 text-on-secondary-container" />
              </div>
              <p className={eyebrow}>Final Year Thesis</p>
            </div>
            <h3 className="font-sans text-headline-sm text-primary leading-snug mb-4">
              {education.thesis.title}
            </h3>

            <div className="max-w-2xl space-y-3 font-serif text-body-md text-on-surface-variant leading-relaxed">
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

            <div className="mt-5 flex flex-wrap gap-2">
              {education.thesis.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-surface-container-high px-3 py-1 font-sans text-label-md text-on-surface-variant"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 border-t border-outline-variant/40 pt-8">
              <p className="mb-5 px-1 font-sans text-label-md uppercase tracking-widest text-on-surface-variant">
                Committee &amp; Students
              </p>
              <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-low p-5 sm:p-6 md:p-8">
                <div className="mx-auto flex w-full max-w-lg flex-col items-center">
                  <div className="grid w-full grid-cols-3">
                    {education.thesis.committee.map((person) => (
                      <div key={person.name} className="flex justify-center">
                        <MapNode person={person} />
                      </div>
                    ))}
                  </div>

                  <div aria-hidden className="relative h-12 w-full">
                    <span className="absolute left-[16.666%] top-0 h-6 w-px bg-outline-variant/60" />
                    <span className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-outline-variant/60" />
                    <span className="absolute left-[83.333%] top-0 h-6 w-px bg-outline-variant/60" />
                    <span className="absolute left-[16.666%] right-[16.666%] top-6 h-px bg-outline-variant/60" />
                    <span className="absolute bottom-0 left-1/4 top-6 w-px bg-outline-variant/60" />
                    <span className="absolute bottom-0 left-3/4 top-6 w-px bg-outline-variant/60" />
                  </div>

                  <div className="grid w-full grid-cols-2">
                    {education.thesis.students.map((person) => (
                      <div key={person.name} className="flex justify-center">
                        <MapNode person={person} student />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <aside className="lg:col-span-4">
          <div className={cn(card, "lg:sticky lg:top-24")}>
            <div className="mb-4 flex items-center gap-3.5">
              <div className={tile}>
                <BookOpen className="h-6 w-6 text-on-secondary-container" />
              </div>
              <p className={eyebrow}>Relevant Coursework</p>
            </div>
            <ul>
              {courses.map((course) => (
                <li
                  key={course}
                  className="border-t border-outline-variant/30 py-3 font-serif text-body-md text-on-surface first:border-t-0"
                >
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
