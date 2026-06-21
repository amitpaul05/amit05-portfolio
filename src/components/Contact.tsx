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
    <section className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-16">
      <header className="mb-12 text-center">
        <h2 className="font-sans text-headline-md text-primary mb-3">Let's Connect</h2>
        <p className="font-serif text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Backend engineer with production experience across LLM integrations, payment flows, and
          cloud deployments. Based in Dhaka — open to remote backend roles.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <div className="material-card bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 md:p-8">
          <h3 className="font-sans text-headline-sm text-primary mb-6">Contact Information</h3>

          <div className="space-y-5">
            {contactInfo.map((contact) => (
              <div key={contact.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center shrink-0">
                  <contact.icon className="h-5 w-5 text-on-secondary-container" />
                </div>
                <div>
                  <p className="font-sans text-label-md uppercase tracking-wide text-secondary">
                    {contact.label}
                  </p>
                  {contact.href !== "#" ? (
                    <a
                      href={contact.href}
                      className="font-sans font-medium text-on-surface hover:text-primary transition-colors"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <span className="font-sans font-medium text-on-surface">{contact.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant/40">
            <h4 className="font-sans text-label-md uppercase tracking-widest text-secondary mb-4">
              Professional Profiles
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors"
                >
                  {social.isLucideIcon && social.icon ? (
                    <social.icon className="h-5 w-5" />
                  ) : (
                    <img
                      src={social.iconSrc}
                      alt={social.label}
                      className="h-5 w-5 brightness-0 dark:invert opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                  <span className="font-sans text-label-md">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="material-card bg-primary-container text-on-primary-container rounded-lg p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-sans text-headline-sm mb-4">Open to Opportunities</h3>
            <p className="font-serif text-body-md text-on-primary-container leading-relaxed mb-8">
              Three years building Django systems in production — APIs, async pipelines, cloud
              deployments, and payment flows. Looking for backend roles where code quality and
              system reliability matter.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="mailto:amit.paul.ece@gmail.com"
              className="w-full inline-flex items-center justify-center gap-2 bg-on-primary-container text-primary-container px-5 py-3 rounded-lg font-sans text-label-md hover:opacity-90 transition-opacity"
            >
              <Mail className="h-4 w-4" />
              Send Email
            </a>
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 border border-on-primary-container/40 text-on-primary-container px-5 py-3 rounded-lg font-sans text-label-md hover:bg-on-primary-container/10 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
