import { Award, ExternalLink } from "lucide-react";

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

  // Feature the Django/Meta credential (called out in the intro); rest fill the bento.
  const featuredIndex = certifications.findIndex((c) => c.issuer === "Meta");
  const featured = certifications[featuredIndex] ?? certifications[0];
  const rest = certifications.filter((c) => c !== featured);
  const restSpans = ["lg:col-span-4", "lg:col-span-6", "lg:col-span-6"];

  return (
    <section
      id="certifications"
      data-no-animate
      className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-10 md:pt-16 pb-16"
    >
      <header className="mb-12">
        <span className="block font-sans text-label-md uppercase tracking-widest text-secondary mb-3">
          Validation &amp; Mastery
        </span>
        <h1 className="font-sans text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
          Certifications &amp; Achievements
        </h1>
        <p className="font-serif text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Competitive programming, ML foundations, and the Django track that started this career.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <article className="md:col-span-12 lg:col-span-8 material-card bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-lg bg-secondary-container flex items-center justify-center">
            <Award className="h-9 w-9 md:h-11 md:w-11 text-on-secondary-container" />
          </div>
          <div className="flex-grow">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-sans text-label-md">
                {featured.type}
              </span>
              <span className="font-sans text-label-md text-secondary">{featured.date}</span>
            </div>
            <h2 className="font-sans text-headline-md text-primary mb-1">{featured.title}</h2>
            <p className="font-sans text-label-md uppercase tracking-wide text-secondary mb-4">
              {featured.issuer}
            </p>
            <p className="font-serif text-body-md text-on-surface-variant leading-relaxed mb-5">
              {featured.description}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-sans text-label-md rounded">
                {featured.focus}
              </span>
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-sans text-label-md hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="h-4 w-4" />
                View Certificate
              </a>
            </div>
          </div>
        </article>

        {rest.map((cert, i) => (
          <article
            key={cert.title}
            className={`md:col-span-6 ${restSpans[i] ?? "lg:col-span-6"} material-card bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 md:p-8 flex flex-col`}
          >
            <div className="w-16 h-16 shrink-0 rounded-lg bg-secondary-container flex items-center justify-center mb-5">
              <Award className="h-7 w-7 text-on-secondary-container" />
            </div>
            <h3 className="font-sans text-headline-sm text-primary mb-1">{cert.title}</h3>
            <p className="font-sans text-label-md uppercase tracking-wide text-secondary mb-3">
              {cert.issuer}
            </p>
            <p className="font-serif text-body-md text-on-surface-variant leading-relaxed mb-5">
              {cert.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-3 py-1 bg-primary-container text-on-primary-container font-sans text-label-md rounded">
                {cert.type}
              </span>
              <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-sans text-label-md rounded">
                {cert.focus}
              </span>
            </div>
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/40">
              <span className="font-sans text-label-md text-secondary">{cert.date}</span>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:opacity-80 font-sans text-label-md transition-opacity"
              >
                View <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Certifications;