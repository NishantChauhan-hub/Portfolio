import { useEffect, useRef } from 'react';

const SKILLS = [
  { label: 'React',      angle: 0,    orbit: 1, speed: 0.38, color: '#61dafb' },
  { label: 'Node.js',    angle: 72,   orbit: 1, speed: 0.38, color: '#84cc16' },
  { label: 'TypeScript', angle: 144,  orbit: 1, speed: 0.38, color: '#3b82f6' },
  { label: 'Express',    angle: 216,  orbit: 1, speed: 0.38, color: '#a78bfa' },
  { label: 'MongoDB',    angle: 288,  orbit: 1, speed: 0.38, color: '#4ade80' },
  { label: 'HTML5',      angle: 30,   orbit: 2, speed: 0.22, color: '#f97316' },
  { label: 'CSS3',       angle: 90,   orbit: 2, speed: 0.22, color: '#5eead4' },
  { label: 'Tailwind',   angle: 150,  orbit: 2, speed: 0.22, color: '#38bdf8' },
  { label: 'JS',         angle: 210,  orbit: 2, speed: 0.22, color: '#fbbf24' },
  { label: 'Gemini',     angle: 270,  orbit: 2, speed: 0.22, color: '#e8577e' },
  { label: 'Vite',       angle: 330,  orbit: 2, speed: 0.22, color: '#ffb238' },
];

const SIZE       = 420;
const CX         = SIZE / 2;
const CY         = SIZE / 2;
const PLANET_R   = 42;
const ORBIT_RADII = { 1: 92, 2: 144 };

export default function PlanetOrbit() {
  const canvasRef = useRef(null);
  const angles    = useRef(SKILLS.map(s => (s.angle * Math.PI) / 180));
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    canvas.width  = SIZE;
    canvas.height = SIZE;

    function drawPlanet() {
      const outerGlow = ctx.createRadialGradient(CX, CY, PLANET_R * 0.4, CX, CY, PLANET_R * 2.6);
      outerGlow.addColorStop(0, 'rgba(94,234,212,0.14)');
      outerGlow.addColorStop(0.5, 'rgba(94,234,212,0.05)');
      outerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(CX, CY, PLANET_R * 2.6, 0, Math.PI * 2);
      ctx.fill();

      const grad = ctx.createRadialGradient(CX - 12, CY - 12, 4, CX, CY, PLANET_R);
      grad.addColorStop(0, '#1e3a5f');
      grad.addColorStop(0.45, '#0d1f3c');
      grad.addColorStop(1, '#07060c');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(CX, CY, PLANET_R, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.shadowColor = '#5eead4';
      ctx.shadowBlur  = 20;
      ctx.strokeStyle = 'rgba(94,234,212,0.55)';
      ctx.lineWidth   = 1.5;
      ctx.beginPath();
      ctx.arc(CX, CY, PLANET_R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 0.17;
      ctx.strokeStyle = '#5eead4';
      ctx.lineWidth   = 1;
      for (let i = -2; i <= 2; i++) {
        const y  = CY + i * 12;
        const hw = Math.sqrt(Math.max(0, PLANET_R * PLANET_R - (y - CY) ** 2));
        if (hw < 2) continue;
        ctx.beginPath();
        ctx.ellipse(CX, y, hw * 0.95, hw * 0.18, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 0.32;
      const hl = ctx.createRadialGradient(CX - 14, CY - 14, 0, CX - 8, CY - 8, 26);
      hl.addColorStop(0, 'rgba(255,255,255,0.55)');
      hl.addColorStop(1, 'transparent');
      ctx.fillStyle = hl;
      ctx.beginPath();
      ctx.arc(CX, CY, PLANET_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawOrbitRing(r, opacity) {
      const isLight = document.documentElement.dataset.theme === 'light';
      ctx.save();
      ctx.strokeStyle = isLight
        ? `rgba(15,125,117,${opacity + 0.25})`
        : `rgba(94,234,212,${opacity + 0.28})`;
      ctx.lineWidth   = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(CX, CY, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    function drawSatellite(x, y, label, color) {
      const isLight = document.documentElement.dataset.theme === 'light';

      ctx.save();
      ctx.shadowColor = color;
      ctx.shadowBlur  = 14;
      ctx.fillStyle   = color;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.font         = '600 12px "JetBrains Mono", monospace';
      ctx.fillStyle    = isLight ? '#1a1a2e' : '#ece9e2';
      ctx.textAlign    = x < CX ? 'right' : 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x < CX ? x - 10 : x + 10, y);
      ctx.restore();
    }

    let lastTime = null;
    function frame(timestamp) {
      const dt = lastTime === null ? 0 : Math.min((timestamp - lastTime) / 1000, 0.1);
      lastTime = timestamp;

      ctx.clearRect(0, 0, SIZE, SIZE);
      drawOrbitRing(ORBIT_RADII[1], 0.2);
      drawOrbitRing(ORBIT_RADII[2], 0.14);
      drawPlanet();

      SKILLS.forEach((s, i) => {
        angles.current[i] += (s.speed * Math.PI) / 180 * dt * 60;
        const r = ORBIT_RADII[s.orbit];
        const x = CX + r * Math.cos(angles.current[i]);
        const y = CY + r * Math.sin(angles.current[i]);
        drawSatellite(x, y, s.label, s.color);
      });

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" style={{ display: 'block' }} />;
}
