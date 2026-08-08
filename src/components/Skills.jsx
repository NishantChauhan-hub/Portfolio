import { SectionHeading } from './shared';

const SKILLS = [
  'HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript',
  'React', 'Node.js', 'Express', 'TypeScript',
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading eyebrow="// SKILLS" title="$ npm ls --global" />

      <div className="skills-grid">
        {SKILLS.map((skill, i) => (
          <div
            key={skill}
            className="pkg-chip reveal"
            style={{ transitionDelay: `${i * 0.05}s` }}
          >
            <span className="pkg-dot" />
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
