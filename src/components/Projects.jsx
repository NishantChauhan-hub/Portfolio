import { useCallback } from 'react';
import { SectionHeading, WindowCard } from './shared';

const PROJECTS = [
  {
    id: 'cinema-owl',
    file: 'cinema-owl/',
    title: 'Cinema Owl',
    desc: 'A smart discovery platform for Movies, TV Shows & Anime. Features a Google Gemini AI chat widget for personalized recommendations, a massive TMDB-powered library, genre browsing, smooth carousels, and a personal watchlist — all in a sleek dark/neon UI.',
    tags: ['React', 'Vite', 'Gemini AI', 'TMDB API', 'Node.js', 'CSS'],
    link: 'https://github.com/NishantChauhan-hub/cinema-owl',
    delay: 0,
  },
  {
    id: 'user-mgmt',
    file: 'user-management-api/',
    title: 'User Management API',
    desc: 'A REST API for user management with authentication, built on Node.js, Express and MongoDB — the backend backbone for real apps.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    link: 'https://github.com/NishantChauhan-hub',
    delay: '0.1s',
  },
];

export default function Projects() {
  const handleMouseMove = useCallback((e, card) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  }, []);

  return (
    <section id="projects" className="section">
      <SectionHeading eyebrow="// PROJECTS" title="$ ls ~/projects" />

      <div className="projects-grid">
        {PROJECTS.map(p => (
          <WindowCard
            key={p.id}
            title={p.file}
            className="spot reveal"
            style={{ transitionDelay: p.delay }}
            onMouseMove={e => handleMouseMove(e, e.currentTarget)}
          >
            <div className="project-body">
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map(tag => (
                  <span key={tag} className="badge-chip">{tag}</span>
                ))}
              </div>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}
              >
                $ View on GitHub
              </a>
            </div>
          </WindowCard>
        ))}
      </div>

    </section>
  );
}
