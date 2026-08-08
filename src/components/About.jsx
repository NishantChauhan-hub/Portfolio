import { SectionHeading, WindowCard } from './shared';

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading eyebrow="// ABOUT" title="cat about_me.txt" />

      <WindowCard title="about_me.txt" className="reveal" style={{ marginTop: '2rem' }}>
        <div style={{ padding: '1.5rem 2rem' }}>
          <p style={{ color: 'var(--accent-cyan)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            guest@nishant:~$ cat about_me.txt
          </p>
          <p style={{ lineHeight: 1.75, fontSize: '0.9375rem' }}>
            Hey! I'm a web developer who loves turning ideas into working projects. I don't
            pretend to have every single answer up front, but as Saul Goodman says, "I know a
            guy who knows a guy." (Usually, that "guy" is documentation or a deep-dive stack
            search). Every roadblock is just a puzzle to solve. I'm always learning, building,
            and pushing my skills further—take a look around and see what I've been up to!
          </p>
        </div>
      </WindowCard>

      <div className="about-chips">
        {[
          { label: 'DSA: 250+ LeetCode Questions', delay: 0 },
          { label: 'COLLEGE: MAIT · B.Tech CST', delay: '0.08s' },
          { label: 'PROCESS: Interned @ Syntecxhub · Jun–Jul 2026', delay: '0.16s' },
          { label: 'SOCIETY: Member @ TechXtract, MAIT', delay: '0.24s' },
          { label: 'COURSE: Full-Stack Dev · Scrimba', delay: '0.32s' },
        ].map(({ label, delay }) => (
          <div key={label} className="pkg-chip reveal" style={{ transitionDelay: delay, minHeight: '3.5rem' }}>
            <span className="pkg-dot" />
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}
