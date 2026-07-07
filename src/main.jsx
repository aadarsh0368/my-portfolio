import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const assetPath = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;

const profile = {
  name: 'Aadarsh S Kumar',
  role: 'Software Engineer',
  email: 'aadarshskumar2000@gmail.com',
  phone: '+91-7994190368',
  dob: '30-01-2000',
  address: 'Kashmeeram, East Kallada, Kollam, Kerala',
  linkedin: 'https://www.linkedin.com/in/aadarsh-s-kumar/',
  resume: assetPath('AADARSH_S_KUMAR_Resume.pdf'),
  photo: assetPath('aadarsh-photo.png'),
  summary:
    'Software Engineer with 5+ years of experience building scalable, enterprise-grade web applications using PHP, Laravel, Symfony, CodeIgniter, Pimcore, Vue.js, and React. Specialized in RESTful API design, relational database optimization, and robust backend architecture.',
  impact:
    'I translate complex business requirements into clean, maintainable systems that scale, perform well, and help teams move faster.',
};

const stats = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 40, suffix: '%', label: 'API Integration Gain' },
  { value: 30, suffix: '%', label: 'Code Quality Improvement' },
  { value: 3, suffix: '', label: 'Successful POCs' },
];

const skills = [
  'PHP',
  'Laravel',
  'Symfony',
  'Pimcore',
  'CodeIgniter',
  'REST API',
  'React',
  'Vue.js',
  'MySQL',
  'Docker',
  'Git',
  'Cursor',
  'Claude',
];

const experience = [
  {
    period: '05/2023 - Present',
    location: 'Trivandrum, Kerala',
    role: 'Software Engineer',
    company: 'PIT Solutions',
    points: [
      'Architect and develop enterprise-level web applications using Laravel, Symfony, and Pimcore.',
      'Design RESTful APIs that improved system integration efficiency by 40% and reduced data processing time.',
      'Lead technical proof-of-concept initiatives, resulting in 3 successful project implementations.',
      'Established coding standards and best practices, improving code quality metrics by 30%.',
      'Mentor junior developers through code reviews and technical guidance.',
      'Optimized database queries and application performance, achieving 25% improvement in page load times.',
    ],
  },
  {
    period: '04/2022 - 04/2023',
    location: 'Trivandrum, Kerala',
    role: 'Junior Software Engineer',
    company: 'Lean Transition Solutions',
    points: [
      'Developed and maintained 6 dynamic web applications using PHP, Symfony, and MySQL with 99.5% uptime.',
      'Implemented responsive frontend solutions using JavaScript, Bootstrap, and modern CSS frameworks.',
      'Delivered features consistently within agile sprint timelines.',
      'Reduced production bugs by 35% through systematic testing and debugging.',
      'Integrated third-party APIs and services to enhance application functionality.',
    ],
  },
  {
    period: '01/2021 - 10/2021',
    location: 'Trivandrum, Kerala',
    role: 'Junior Software Engineer',
    company: 'Acutro Technologies',
    points: [
      'Built scalable web applications using PHP, CodeIgniter, and MySQL.',
      'Developed interactive interfaces with JavaScript and AJAX, reducing form submission time by 40%.',
      'Implemented Git version control practices for team collaboration.',
      'Resolved complex technical issues while maintaining 98% application availability.',
      'Supported database design and optimization, improving query performance by 30%.',
    ],
  },
];

const education = [
  {
    period: '06/2017 - 05/2020',
    title: 'Bachelor of Science in Computer Science',
    institute: 'University Institute of Technology',
    location: 'Adoor, Kerala',
    score: '64%',
  },
  {
    period: '06/2015 - 03/2017',
    title: 'Higher Secondary Education',
    institute: 'CVKMHSS',
    location: 'East Kallada, Kerala',
    score: '74%',
  },
  {
    period: '06/2014 - 03/2015',
    title: 'Secondary School Leaving Certificate',
    institute: 'LFEMHS',
    location: 'Kundara, Kerala',
    score: '89%',
  },
];

const navItems = [
  ['home', 'Home'],
  ['about', 'Profile'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['education', 'Education'],
  ['contact', 'Contact'],
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '-28% 0px -55% 0px',
        threshold: [0.08, 0.2, 0.45, 0.7],
      },
    );

    navItems.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) {
        sectionObserver.observe(section);
      }
    });

    return () => sectionObserver.disconnect();
  }, []);

  return (
    <main>
      <Navigation
        activeSection={activeSection}
        theme={theme}
        onThemeToggle={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
      />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
}

function Navigation({ activeSection, theme, onThemeToggle }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeLabel = navItems.find(([id]) => id === activeSection)?.[1] || 'Home';

  return (
    <header className={`nav ${isMenuOpen ? 'is-open' : ''}`}>
      <div className="nav-pill">
        <a className="brand" href="#home" aria-label="Aadarsh S Kumar home">
          Aadarsh S Kumar
        </a>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          <span>{activeLabel}</span>
          <span className="menu-icon" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        <nav id="primary-navigation" aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <a
              href={`#${id}`}
              className={activeSection === id ? 'active' : ''}
              key={id}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
      <button
        className="theme-toggle"
        type="button"
        onClick={onThemeToggle}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        {theme === 'dark' ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
          </svg>
        )}
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-anchor" id="home">
      <div className="hero-grid">
        <div className="hero-copy reveal">
          <p className="hello">Hello, I am</p>
          <h1>
            Aadarsh <span>S Kumar</span>
          </h1>
          <p className="role">{profile.role}</p>
          <p className="intro">
            Building scalable enterprise web applications with PHP, Laravel,
            Symfony, Pimcore, REST APIs, Vue.js, React, and MySQL.
          </p>
          <div className="status-row">
            <div>
              <span className="dot red"></span>
              <span>Refining craft</span>
              <strong>Enterprise PHP & APIs</strong>
            </div>
            <div>
              <span className="dot green"></span>
              <span>Open to</span>
              <strong>Software Engineer opportunities</strong>
            </div>
          </div>
          <div className="social-row" aria-label="Profile links">
            <Social href={profile.resume} label="Resume" icon="file" />
            <Social href={profile.linkedin} label="LinkedIn" icon="linkedin" />
            <Social href={`mailto:${profile.email}`} label="Email" icon="mail" />
            <Social href={`tel:${profile.phone}`} label="Phone" icon="phone" />
          </div>
        </div>

        <div className="visual-card reveal delay-1">
          <div className="portrait-frame">
            <img src={profile.photo} alt={profile.name} />
          </div>
        </div>
      </div>

      <div className="stats-grid reveal delay-2">
        {stats.map((stat) => (
          <article key={stat.label}>
            <strong>
              <CountUp target={stat.value} suffix={stat.suffix} />
            </strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        const duration = 1200;
        const start = performance.now();

        const animate = (time) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(target * eased));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, target]);

  return <span ref={setNode}>{count}{suffix}</span>;
}

function Social({ href, label, icon }) {
  return (
    <a
      className="social-icon"
      href={href}
      aria-label={label}
      target={href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : undefined}
      rel="noreferrer"
    >
      {icon === 'file' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
        </svg>
      )}
      {icon === 'linkedin' && (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="fill-icon">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.04c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
        </svg>
      )}
      {icon === 'mail' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
          <path d="m22 6-10 7L2 6" />
        </svg>
      )}
      {icon === 'phone' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.8a2 2 0 0 1-.45 2.11L8.05 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.31 1.84.53 2.8.66A2 2 0 0 1 22 16.92Z" />
        </svg>
      )}
      <span>{label}</span>
    </a>
  );
}

function About() {
  return (
    <section className="section section-anchor about-section reveal" id="about">
      <SectionHeading kicker="Profile" title="I build scalable systems with clean architecture." />
      <div className="about-layout">
        <div className="glass-panel large-copy">
          <p>{profile.summary}</p>
          <p>{profile.impact}</p>
        </div>
        <div className="identity-panel">
          <Info label="Email" value={profile.email} href={`mailto:${profile.email}`} />
          <Info label="Phone" value={profile.phone} href={`tel:${profile.phone}`} />
          <Info label="LinkedIn" value="aadarsh-s-kumar" href={profile.linkedin} />
          <Info label="Location" value={profile.address} />
          <Info label="Date of Birth" value={profile.dob} />
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section section-anchor reveal" id="experience">
      <SectionHeading kicker="Experience" title="Professional journey and measurable impact." />
      <div className="featured-strip">
        <article>
          <span>Current</span>
          <strong>PIT Solutions</strong>
          <p>Enterprise-level applications with Laravel, Symfony, and Pimcore.</p>
        </article>
        <article>
          <span>Impact</span>
          <strong>40% Integration Gain</strong>
          <p>REST API design and system integration improvements.</p>
        </article>
      </div>
      <div className="timeline">
        {experience.map((job) => (
          <article className="timeline-item" key={`${job.company}-${job.period}`}>
            <div className="timeline-card">
              <div className="experience-topline">
                <p className="company">{job.company}</p>
                <div className="timeline-meta">
                  <span>{job.period}</span>
                  <small>{job.location}</small>
                </div>
              </div>
              <h3>{job.role}</h3>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section section-anchor skills-section reveal" id="skills">
      <SectionHeading kicker="Stack" title="Technologies I use to ship dependable products." />
      <div className="skills-cloud">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
      <div className="feature-grid">
        <Feature title="Backend Architecture" text="RESTful APIs, scalable PHP applications, integration layers, and clean service boundaries." />
        <Feature title="Database Optimization" text="Relational schema thinking, MySQL performance tuning, query optimization, and reliable data flows." />
        <Feature title="Frontend Delivery" text="Responsive interfaces with JavaScript, Vue.js, React, Bootstrap, and modern CSS." />
        <Feature title="Team Enablement" text="Coding standards, code reviews, mentoring, documentation, and technical proof-of-concepts." />
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section section-anchor reveal" id="education">
      <SectionHeading kicker="Education" title="Academic foundation." />
      <div className="education-grid">
        {education.map((item) => (
          <article className="education-card" key={item.title}>
            <span>{item.period}</span>
            <h3>{item.title}</h3>
            <p>{item.institute}</p>
            <small>
              {item.location} | {item.score}
            </small>
          </article>
        ))}
      </div>
      <div className="certification-block">
        <SectionHeading kicker="Certification" title="Certified Pimcore expertise." />
        <article className="education-card certificate">
          <span>Certificate</span>
          <h3>Pimcore Certified Senior Developer</h3>
        </article>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section-anchor reveal" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Have a role or project where strong backend engineering matters?</h2>
        <p>
          Connect with me for Software Engineer opportunities, Laravel/Symfony
          work, API development, enterprise PHP systems, and full-stack web
          application projects.
        </p>
      </div>
      <div className="contact-actions">
        <a className="button primary" href={`mailto:${profile.email}`}>
          Email Me
        </a>
        <a className="button ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="button ghost" href={profile.resume} download>
          Download Resume
        </a>
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
    </div>
  );
}

function Info({ label, value, href }) {
  const content = (
    <>
      <span>{label}</span>
      <strong>{value}</strong>
    </>
  );

  return href ? (
    <a className="info-row" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {content}
    </a>
  ) : (
    <div className="info-row">{content}</div>
  );
}

function Feature({ title, text }) {
  return (
    <article className="feature-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

createRoot(document.getElementById('root')).render(<App />);
