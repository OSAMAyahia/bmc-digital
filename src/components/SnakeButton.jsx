import React, { useEffect, useRef } from 'react';

export default function SnakeButton({
  as: Component = 'button',
  snakeOptions = {},
  wrapperStyle = {},
  style = {},
  children,
  ...props
}) {
  const btnRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    const canvas = canvasRef.current;
    if (!btn || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const speed = snakeOptions.speed || 0.004;
    const tailLength = snakeOptions.tailLength || 0.18;
    const lineWidth = snakeOptions.lineWidth || 2.4;
    const glowOpacity = snakeOptions.glowOpacity ?? 1;
    const pad = snakeOptions.pad ?? 2;
    const startAt = snakeOptions.startAt || 'right';
    let radius = parseFloat(getComputedStyle(btn).borderRadius) || 10;
    let boxWidth = 0;
    let boxHeight = 0;
    let progress = 0;
    let rafId = null;
    let resizeObserver = null;

    function resize() {
      radius = parseFloat(getComputedStyle(btn).borderRadius) || 10;
      boxWidth = btn.offsetWidth;
      boxHeight = btn.offsetHeight;
      const w = boxWidth + pad * 2;
      const h = boxHeight + pad * 2;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const r = Math.min(radius, boxWidth / 2 - 1, boxHeight / 2 - 1);
      const sw = boxWidth - 2 * r;
      const sh = boxHeight - 2 * r;
      const totalPerim = 2 * sw + 2 * sh + Math.PI * 2 * r;
      if (totalPerim > 0) {
        if (startAt === 'right') progress = sw / totalPerim;
        else if (startAt === 'bottom') progress = (sw + (Math.PI / 2) * r + sh) / totalPerim;
        else if (startAt === 'left') progress = (sw + (Math.PI / 2) * r + sh + (Math.PI / 2) * r + sw) / totalPerim;
        else progress = 0;
      }
    }

    function getPoint(t) {
      const x0 = pad;
      const y0 = pad;
      const w = boxWidth;
      const h = boxHeight;
      const r = Math.min(radius, w / 2 - 1, h / 2 - 1);
      const sw = w - 2 * r;
      const sh = h - 2 * r;
      const arcQ = (Math.PI / 2) * r;
      const totalPerim = 2 * sw + 2 * sh + Math.PI * 2 * r;
      t = ((t % 1) + 1) % 1;
      let d = t * totalPerim;

      if (d <= sw) return { x: x0 + r + d, y: y0 };
      d -= sw;
      if (d <= arcQ) {
        const a = -Math.PI / 2 + d / r;
        return { x: x0 + w - r + Math.cos(a) * r, y: y0 + r + Math.sin(a) * r };
      }
      d -= arcQ;
      if (d <= sh) return { x: x0 + w, y: y0 + r + d };
      d -= sh;
      if (d <= arcQ) {
        const a = d / r;
        return { x: x0 + w - r + Math.cos(a) * r, y: y0 + h - r + Math.sin(a) * r };
      }
      d -= arcQ;
      if (d <= sw) return { x: x0 + w - r - d, y: y0 + h };
      d -= sw;
      if (d <= arcQ) {
        const a = Math.PI / 2 + d / r;
        return { x: x0 + r + Math.cos(a) * r, y: y0 + h - r + Math.sin(a) * r };
      }
      d -= arcQ;
      if (d <= sh) return { x: x0, y: y0 + h - r - d };
      d -= sh;
      const a2 = Math.PI + d / r;
      return { x: x0 + r + Math.cos(a2) * r, y: y0 + r + Math.sin(a2) * r };
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const steps = 96;
      const step = tailLength / steps;

      for (let i = 0; i <= steps; i += 1) {
        const pt = getPoint(progress - i * step);
        const ratio = 1 - i / steps;
        const alpha = ratio * ratio * glowOpacity;
        const rr = Math.round(30 + (185 - 30) * ratio);
        const gg = Math.round(150 + (244 - 150) * ratio);
        const bb = 255;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, (lineWidth + ratio * 1.4) / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${alpha})`;
        ctx.fill();
      }

      const head = getPoint(progress);
      ctx.beginPath();
      ctx.arc(head.x, head.y, lineWidth / 2 + 1.1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,250,255,${glowOpacity})`;
      ctx.fill();

      const grd = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 9);
      grd.addColorStop(0, `rgba(0,213,255,${0.72 * glowOpacity})`);
      grd.addColorStop(1, 'rgba(0,148,255,0)');
      ctx.beginPath();
      ctx.arc(head.x, head.y, 9, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      progress = (progress + speed) % 1;
      rafId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize, { passive: true });
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(btn);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      if (resizeObserver) resizeObserver.disconnect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [snakeOptions]);

  return (
    <div style={{ position: 'relative', display: 'inline-block', overflow: 'visible', ...wrapperStyle }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: -(snakeOptions.pad ?? 2),
          left: -(snakeOptions.pad ?? 2),
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
      <Component
        ref={btnRef}
        {...props}
        style={{ ...style, position: style.position || 'relative', zIndex: 1 }}
      >
        {children}
      </Component>
    </div>
  );
}
