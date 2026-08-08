import { useEffect, useRef } from 'react';

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); }
      }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export function SectionReveal() {
  useReveal();
  return null;
}

export function WindowCard({ title, children, className = '', style = {}, onMouseMove }) {
  return (
    <div
      className={`window${className ? ' ' + className : ''}`}
      style={style}
      onMouseMove={onMouseMove}
    >
      <div className="window-bar">
        <span className="win-dot" style={{ background: 'var(--dot-red)' }} />
        <span className="win-dot" style={{ background: 'var(--dot-yellow)' }} />
        <span className="win-dot" style={{ background: 'var(--dot-green)' }} />
        {title && <span className="window-name">{title}</span>}
      </div>
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, sub }) {
  const ref = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !ref.current) return;

    const group = ref.current;
    const eyebrowEl = group.querySelector('.eyebrow');
    const titleEl = group.querySelector('.section-title');
    const subEl = group.querySelector('.section-sub');
    const origEyebrow = eyebrow;
    const origTitle = title;

    if (eyebrowEl) eyebrowEl.textContent = '';
    if (titleEl) titleEl.textContent = '';
    if (subEl) subEl.style.opacity = '0';

    const dotStates = ['', '.', '..', '...'];

    function dotFlash(el, base, tick, done) {
      if (tick > 2) { el.textContent = base; done(); return; }
      el.textContent = base + dotStates[tick % 4];
      setTimeout(() => dotFlash(el, base, tick + 1, done), 55);
    }

    function typeLine(el, text, done) {
      if (!el || !text) { done(); return; }
      let i = 0;
      (function step() {
        if (i <= text.length) {
          el.textContent = text.slice(0, i);
          i++;
          setTimeout(step, 4 + Math.random() * 5);
        } else {
          dotFlash(el, text, 0, done);
        }
      })();
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          obs.unobserve(group);
          typeLine(eyebrowEl, origEyebrow, () => {
            typeLine(titleEl, origTitle, () => {
              if (subEl) { subEl.style.transition = 'opacity .4s ease'; subEl.style.opacity = '1'; }
            });
          });
        }
      });
    }, { threshold: 0.3 });
    obs.observe(group);

    return () => obs.disconnect();
  }, [eyebrow, title]);

  return (
    <div ref={ref} className="boot-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub" style={{ marginTop: '0.75rem', color: 'var(--muted)' }}>{sub}</p>}
    </div>
  );
}
