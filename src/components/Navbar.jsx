import { useState, useCallback } from 'react';

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const links = ['About', 'Skills', 'Projects', 'Contact', 'Terminal'];

  return (
    <header className="nav-bar">
      <div className="nav-inner">
        <div className="brand">
          <span className="brand-dot" />
          NISHANT_OS
          <span className="brand-version">v2.0</span>
        </div>

        <nav className="nav-desktop" aria-label="Primary">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            aria-label="Toggle light and dark mode"
            aria-pressed={theme === 'light'}
            onClick={onToggleTheme}
          >
            <span className="knob">
              {theme === 'light' ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#07060c" strokeWidth="2.4">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#07060c" strokeWidth="2.4">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </span>
          </button>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            aria-label="Open menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{ paddingBlock: '0.5rem' }} onClick={closeMenu}>{l}</a>
          ))}
        </div>
      </div>
    </header>
  );
}
