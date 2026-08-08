import { useState, useEffect } from 'react';
import './index.css';
import StarField from './components/StarField';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Terminal from './components/Terminal';
import { SectionReveal } from './components/shared';

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  }

  return (
    <>
      {/* Starry background canvas */}
      <StarField />

      {/* Film-strip decorative edges */}
      <div className="perf-strip left" aria-hidden="true" />
      <div className="perf-strip right" aria-hidden="true" />

      {/* CRT scanline overlay */}
      <div className="crt-overlay" aria-hidden="true" />

      {/* Navigation */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Page content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Terminal />
      </main>

      {/* Footer */}
      <footer className="footer">
        <span>
          © 2026 Nishant Chauhan — built with React, Vite &amp; love
          <span className="cursor-blink">&nbsp;</span>
        </span>
        <a href="#home" className="nav-link">back to top ↑</a>
      </footer>

      {/* Scroll reveal watcher */}
      <SectionReveal />
    </>
  );
}
