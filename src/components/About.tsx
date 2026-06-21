import { MapPin, GraduationCap, Terminal, Server } from "lucide-react";
import amit from "../assets/amit.webp";

const quickFacts = [
  { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh" },
  { icon: GraduationCap, label: "Education", value: "Khulna University" },
  { icon: Terminal, label: "Primary OS", value: "Ubuntu / Linux" },
  { icon: Server, label: "Favorite Stack", value: "Django + PostgreSQL" },
];

const expertise = [
  "Django Architecture",
  "REST API Design",
  "PostgreSQL Optimization",
  "Cloud Deployments",
  "Payment Integration",
  "LLM Integration",
];

const About = () => {
  return (
    <>
      {/* Hero */}
      <section
        id="about"
        data-no-animate
        className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-10 md:pt-16 pb-16"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <span className="font-sans text-label-md uppercase tracking-widest text-secondary">
              About Me
            </span>
            <h1 className="font-sans text-headline-lg-mobile md:text-headline-lg text-primary">
              Backend engineer building production systems, end to end.
            </h1>
            <p className="font-serif text-body-lg text-on-surface-variant max-w-2xl mx-auto md:mx-0">
              I'm a Software Engineer at Idlewild Digital, promoted in March 2026 after joining
              on-site that February. I build and maintain production systems across the full
              backend stack — from LLM integrations and payment flows to cloud deployments and
              API architecture.
            </p>
            <p className="font-serif text-body-md text-on-surface-variant max-w-2xl mx-auto md:mx-0">
              Recent work spans AYO (an LLM chat platform for research studies), Govara (an
              AI-powered governance and compliance SaaS), SmallsLive (a Stripe 3DS payment
              refactor for NYC jazz venues), and deploying production Django projects across AWS,
              GCP, and VPS infrastructure.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-sans text-label-md">
                Software Engineer @ Idlewild Digital
              </span>
              <span className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-sans text-label-md">
                Django · Python · PostgreSQL
              </span>
            </div>
          </div>

          <div className="w-2/3 sm:w-1/2 md:w-1/3 shrink-0 aspect-[3/4] relative rounded-lg overflow-hidden border border-outline-variant/30 material-card group">
            <div className="absolute inset-0 bg-primary/5 mix-blend-multiply z-10 transition-opacity duration-300 group-hover:opacity-0" />
            <img
              src={amit}
              alt="Amit Paul, Backend Engineer at Idlewild Digital"
              className="object-cover w-full h-full grayscale-[0.35] transition-[filter] duration-300 group-hover:grayscale-0"
            />
          </div>
        </div>
      </section>

      {/* Quick facts + Beyond Code + Expertise bento */}
      <section className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-7 material-card bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 md:p-8">
            <h3 className="font-sans text-headline-sm text-primary mb-6">Quick Facts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {quickFacts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-on-secondary-container" />
                  </div>
                  <div>
                    <p className="font-sans text-label-md uppercase tracking-wide text-on-surface-variant">
                      {label}
                    </p>
                    <p className="font-sans font-medium text-on-surface">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 material-card bg-primary-container text-on-primary-container rounded-lg p-6 md:p-8 flex flex-col justify-center">
            <h3 className="font-sans text-headline-sm mb-3">Beyond Code</h3>
            <p className="font-serif text-body-md text-on-primary-container leading-relaxed">
              Away from work I read technical books — <em>Grokking Algorithms</em>,
              <em> Grokking System Design</em> — and practice on LeetCode to sharpen
              problem-solving intuition. I also read Bengali literature to unwind. I'm drawn to
              understanding how systems work, in code or in a good story.
            </p>
          </div>

          <div className="md:col-span-12 material-card bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 md:p-8">
            <h3 className="font-sans text-headline-sm text-primary mb-4">Core Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {expertise.map((item) => (
                <span
                  key={item}
                  className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded font-sans text-label-md"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Code-block manuscript */}
      <section className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-16">
        <div className="bg-[#1e1e1e] rounded-lg p-6 md:p-8 shadow-xl overflow-x-auto border border-primary/20">
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <span className="w-3 h-3 rounded-full bg-error" />
            <span className="w-3 h-3 rounded-full bg-tertiary-fixed" />
            <span className="w-3 h-3 rounded-full bg-on-primary-container" />
            <span className="ml-4 font-mono text-sm text-white/40">engineer.py</span>
          </div>
          <pre className="font-mono text-sm leading-relaxed text-white/80">
{`from dataclasses import dataclass

`}<span className="text-[#c678dd]">@dataclass</span>{`
`}<span className="text-[#c678dd]">class</span>{` `}<span className="text-[#e5c07b]">Engineer</span>{`:
    name: `}<span className="text-[#e5c07b]">str</span>{` = `}<span className="text-[#98c379]">"Amit Paul"</span>{`
    role: `}<span className="text-[#e5c07b]">str</span>{` = `}<span className="text-[#98c379]">"Backend Engineer"</span>{`
    stack = (`}<span className="text-[#98c379]">"Django"</span>{`, `}<span className="text-[#98c379]">"PostgreSQL"</span>{`, `}<span className="text-[#98c379]">"Celery"</span>{`, `}<span className="text-[#98c379]">"Docker"</span>{`)

    `}<span className="text-[#c678dd]">def</span>{` `}<span className="text-[#61afef]">build</span>{`(self, system: `}<span className="text-[#e5c07b]">str</span>{`) -> `}<span className="text-[#e5c07b]">str</span>{`:
        `}<span className="text-[#5c6370]"># ship it: reliable, observable, maintainable</span>{`
        `}<span className="text-[#c678dd]">return</span>{` `}<span className="text-[#98c379]">{`f"{system} → production"`}</span>{`


amit = Engineer()
amit.build(`}<span className="text-[#98c379]">"AYO · Govara · SmallsLive"</span>{`)`}
          </pre>
        </div>
      </section>
    </>
  );
};

export default About;
