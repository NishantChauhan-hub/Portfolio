import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const STAR_COUNT = 220;
    const TWINKLE_SPEED = 0.008;
    let stars = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initStars() {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random(),
        delta: (Math.random() * 0.6 + 0.2) * TWINKLE_SPEED * (Math.random() < 0.5 ? 1 : -1),
        // slight drift
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        // color tint: mostly white, occasional cyan/pink
        hue: Math.random() < 0.12 ? 174 : Math.random() < 0.08 ? 340 : 0,
        sat: Math.random() < 0.2 ? 80 : 0,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isLight = document.documentElement.dataset.theme === 'light';

      // nebula glow patches
      const nebs = isLight ? [
        { x: canvas.width * 0.15, y: canvas.height * 0.25, r: 320, color: 'rgba(15,125,117,0.06)' },
        { x: canvas.width * 0.8, y: canvas.height * 0.6, r: 260, color: 'rgba(197,61,122,0.05)' },
        { x: canvas.width * 0.5, y: canvas.height * 0.85, r: 200, color: 'rgba(163,102,13,0.05)' },
      ] : [
        { x: canvas.width * 0.15, y: canvas.height * 0.25, r: 320, color: 'rgba(94,234,212,0.04)' },
        { x: canvas.width * 0.8, y: canvas.height * 0.6, r: 260, color: 'rgba(232,87,126,0.04)' },
        { x: canvas.width * 0.5, y: canvas.height * 0.85, r: 200, color: 'rgba(255,178,56,0.03)' },
      ];

      nebs.forEach(({ x, y, r, color }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, color);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      for (const s of stars) {
        // twinkle
        s.alpha += s.delta;
        if (s.alpha >= 1) { s.alpha = 1; s.delta = -Math.abs(s.delta); }
        if (s.alpha <= 0.05) { s.alpha = 0.05; s.delta = Math.abs(s.delta); }

        // drift
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        // glow halo
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.5);
        let col;
        if (isLight) {
          col = s.sat > 0
            ? `hsla(${s.hue},${s.sat}%,40%,${s.alpha * 0.25})`
            : `rgba(15,125,117,${s.alpha * 0.2})`;
        } else {
          col = s.sat > 0
            ? `hsla(${s.hue},${s.sat}%,85%,${s.alpha * 0.35})`
            : `rgba(255,255,255,${s.alpha * 0.3})`;
        }
        glow.addColorStop(0, col);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // core dot
        ctx.globalAlpha = s.alpha;
        if (isLight) {
          ctx.fillStyle = s.sat > 0
            ? `hsl(${s.hue},${s.sat}%,35%)`
            : '#0f7d75';
        } else {
          ctx.fillStyle = s.sat > 0
            ? `hsl(${s.hue},${s.sat}%,90%)`
            : '#fff';
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    initStars();
    draw();

    window.addEventListener('resize', () => { resize(); initStars(); });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="starfield-canvas" aria-hidden="true" />;
}
