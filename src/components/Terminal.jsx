import { useRef, useState, useCallback } from 'react';
import { SectionHeading, WindowCard } from './shared';

const COMMANDS = {
  whoami: "guest (that's you). Nishant is the one who built this OS.",
  about: "Full-stack dev who turns ideas into working code. Try 'skills' or 'projects' to see more.",
  skills: "HTML · CSS · Tailwind · JavaScript · React · Node.js · Express · TypeScript",
  projects: "1) cinema-owl — React movie discovery app   2) user-management-api — Node/Express/MongoDB REST API. Scroll up to Projects for links.",
  contact: "GitHub: github.com/NishantChauhan-hub | LinkedIn: linkedin.com/in/nishant-chauhan-449900309 | Email: nishant310806@gmail.com | Phone: +91 80104 02667",
};

const CMD_BUTTONS = [
  { cmd: 'whoami', danger: false },
  { cmd: 'about', danger: false },
  { cmd: 'skills', danger: false },
  { cmd: 'projects', danger: false },
  { cmd: 'contact', danger: false },
  { cmd: 'why-hire-me', danger: false },
  { cmd: 'clear', danger: true },
];

export default function Terminal() {
  const [lines, setLines] = useState([
    { type: 'info', text: 'Welcome to nishant-portfolio. Click a command below to get started.' }
  ]);
  const bodyRef = useRef(null);

  const scrollDown = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  const addLine = useCallback((line) => {
    setLines(prev => [...prev, line]);
    setTimeout(scrollDown, 50);
  }, [scrollDown]);

  const runWhyHireMe = useCallback(() => {
    addLine({ type: 'prompt', cmd: 'why-hire-me' });

    const text = 'compiling reasons to hire nishant';
    const dotStates = ['', '.', '..', '...'];
    let charIdx = 0;
    let animText = '';

    // We'll push a placeholder index and update it
    setLines(prev => [...prev, { type: 'typing', text: '' }]);
    setTimeout(scrollDown, 50);

    const updateLast = (txt) => {
      setLines(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { type: 'typing', text: txt };
        return copy;
      });
      setTimeout(scrollDown, 50);
    };

    function typeChar() {
      if (charIdx <= text.length) {
        animText = text.slice(0, charIdx);
        updateLast(animText);
        charIdx++;
        setTimeout(typeChar, 12 + Math.random() * 14);
      } else {
        dotLoop(0);
      }
    }

    function dotLoop(tick) {
      if (tick > 7) {
        updateLast(text);
        setTimeout(showError, 250);
        return;
      }
      updateLast(text + dotStates[tick % 4]);
      setTimeout(() => dotLoop(tick + 1), 130);
    }

    function showError() {
      setLines(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { type: 'typing', text };
        return [
          ...copy,
          { type: 'error', text: 'ERROR: TooManyReasonsException' },
          { type: 'error-sub', text: '  at whyHireMe (nishant.js:∞)' },
          { type: 'error-sub', text: 'too many reasons to list — recommend hiring immediately.' },
        ];
      });
      setTimeout(scrollDown, 50);
    }

    typeChar();
  }, [addLine, scrollDown]);

  const runCommand = useCallback((cmd) => {
    if (cmd === 'clear') { setLines([{ type: 'info', text: 'Welcome to nishant-portfolio. Click a command below to get started.' }]); return; }
    if (cmd === 'why-hire-me') { runWhyHireMe(); return; }
    addLine({ type: 'prompt', cmd });
    if (COMMANDS[cmd]) addLine({ type: 'info', text: COMMANDS[cmd] });
  }, [addLine, runWhyHireMe]);

  return (
    <section id="terminal" className="section">
      <SectionHeading
        eyebrow="// TRY IT"
        title="Poke around a bit"
        sub="Click a command below — no typing required."
      />

      <WindowCard title="guest@nishant-portfolio: ~" className="reveal" style={{ marginTop: '2rem' }}>
        <div ref={bodyRef} className="term-body">
          {lines.map((line, i) => {
            if (line.type === 'prompt') return (
              <p key={i} className="term-line">
                <span className="term-prompt">guest@nishant:~$</span> {line.cmd}
              </p>
            );
            if (line.type === 'error') return (
              <p key={i} className="term-line" style={{ color: 'var(--accent-pink)', fontWeight: 700 }}>{line.text}</p>
            );
            if (line.type === 'error-sub') return (
              <p key={i} className="term-line" style={{ color: 'var(--accent-pink)' }}>{line.text}</p>
            );
            return <p key={i} className="term-line">{line.text}</p>;
          })}
        </div>

        <div className="cmd-row">
          {CMD_BUTTONS.map(({ cmd, danger }) => (
            <button
              key={cmd}
              className={`cmd-btn${danger ? ' danger' : ''}`}
              onClick={() => runCommand(cmd)}
            >
              {cmd}
            </button>
          ))}
        </div>
      </WindowCard>
    </section>
  );
}
