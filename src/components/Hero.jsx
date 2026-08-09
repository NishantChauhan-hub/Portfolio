import { useEffect, useState } from 'react';
import PlanetOrbit from './PlanetOrbit';

const BOOT_LINES = [
  '> initializing nishant_OS v2.0 ...',
  '> loading modules: [HTML] [CSS] [JS] [React] [Node] [Express] [TypeScript] ... done',
  '> mounting /dev/curiosity ... done',
  '> whoami',
  "> it's showtime, folks.",
];

export default function Hero() {
  const [bootText, setBootText] = useState('');
  const [heroVisible, setHeroVisible] = useState(false);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduceMotion) {
      setBootText(BOOT_LINES.join('\n'));
      setHeroVisible(true);
      return;
    }

    document.documentElement.classList.add('lock-scroll');

    let lineIdx = 0;
    let charIdx = 0;
    let completedText = '';
    let tid;

    const dotStates = ['', '.', '..', '...'];
    const dotTicks = 3;

    function reveal() {
      setHeroVisible(true);
      document.documentElement.classList.remove('lock-scroll');
    }

    function dotLoop(baseText, tick, done) {
      if (tick > dotTicks) { setBootText(baseText); done(); return; }
      setBootText(baseText + dotStates[tick % 4]);
      tid = setTimeout(() => dotLoop(baseText, tick + 1, done), 60);
    }

    function typeTick() {
      if (lineIdx >= BOOT_LINES.length) { reveal(); return; }
      const current = BOOT_LINES[lineIdx];
      if (charIdx <= current.length) {
        setBootText(completedText + current.slice(0, charIdx));
        charIdx++;
        tid = setTimeout(typeTick, 4 + Math.random() * 6);
      } else {
        const lineFull = completedText + current;
        dotLoop(lineFull, 0, () => {
          completedText = lineFull + '\n';
          lineIdx++; charIdx = 0;
          tid = setTimeout(typeTick, 40);
        });
      }
    }

    typeTick();
    const failsafe = setTimeout(reveal, 12000);

    return () => {
      clearTimeout(tid);
      clearTimeout(failsafe);
      document.documentElement.classList.remove('lock-scroll');
    };
  }, [reduceMotion]);

  return (
    <section id="home" className="hero-section">
      <div className="hero-layout">
        {/* Left — text content */}
        <div className="hero-left">
          <p className="eyebrow">SYSTEM ONLINE</p>
          <pre className="boot-box" aria-live="polite">{bootText}</pre>

          <div className={`hero-reveal${heroVisible ? ' show' : ''}`}>
            <h1 className="hero-title glitch" data-text="NISHANT CHAUHAN">NISHANT CHAUHAN</h1>
            <p className="hero-subtitle">Full-Stack Web Developer</p>
            <p className="hero-desc">
              Turning coffee, curiosity and console.log() statements into working software.
            </p>

            <div className="badge-row">
              <span className="badge-chip">🎓 B.Tech · Class of 2028</span>
              <span className="badge-chip">💻 Web Dev Intern @ Syntecxhub</span>
            </div>

            <div className="btn-row">
              <a href="#contact" className="btn solid">$ Get In Touch</a>
              <a href="#projects" className="btn">$ View Projects</a>
              <a href="/resume.html" target="_blank" rel="noopener" className="btn">$ Resume</a>
            </div>
          </div>
        </div>

        {/* Right — planet orbit */}
        <div
          className="hero-right"
          aria-hidden="true"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: 'opacity 1s ease 0.5s',
          }}
        >
          <PlanetOrbit />
        </div>
      </div>
    </section>
  );
}
