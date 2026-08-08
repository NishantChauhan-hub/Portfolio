import { SectionHeading } from './shared';

const CONTACTS = [
  {
    badge: 'GH',
    label: 'GitHub',
    sub: 'NishantChauhan-hub',
    href: 'https://github.com/NishantChauhan-hub',
    delay: 0,
  },
  {
    badge: 'IN',
    label: 'LinkedIn',
    sub: 'nishant-chauhan',
    href: 'https://www.linkedin.com/in/nishant-chauhan-449900309/',
    delay: '0.07s',
  },
  {
    badge: '@',
    label: 'Email',
    sub: 'nishant310806@gmail.com',
    href: 'mailto:nishant310806@gmail.com',
    delay: '0.14s',
  },
  {
    badge: '#',
    label: 'Phone',
    sub: '+91 80104 02667',
    href: 'tel:+918010402667',
    delay: '0.21s',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section">
      <SectionHeading
        eyebrow="// CONTACT"
        title="Let's build something"
        sub="Got a project, an internship lead, or just want to say hi? My inbox is open."
      />

      <div className="contact-grid">
        {CONTACTS.map(c => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="contact-card reveal"
            style={{ transitionDelay: c.delay }}
          >
            <span className="mono-badge">{c.badge}</span>
            <span>
              <span className="contact-label">{c.label}</span>
              <span className="contact-sub">{c.sub}</span>
            </span>
          </a>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <a href="/resume.html" target="_blank" rel="noopener" className="contact-card" style={{ display: 'inline-flex', width: 'auto' }}>
          <span className="mono-badge">PDF</span>
          <span>
            <span className="contact-label">Resume</span>
            <span className="contact-sub">View &amp; save as PDF</span>
          </span>
        </a>
      </div>
    </section>
  );
}
