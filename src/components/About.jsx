import React, { useEffect, useRef } from 'react';
import { useData } from '../DataContext';
import { useAnimate } from '../hooks/useAnimate';
import '../animations.css';

function ExperienceSphereCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 220, H = 220;
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const r = 96;

      const sphere = ctx.createRadialGradient(cx - 32, cy - 40, 8, cx, cy, r);
      sphere.addColorStop(0, 'rgba(255,255,255,0.9)');
      sphere.addColorStop(0.22, 'rgba(0,194,255,0.55)');
      sphere.addColorStop(0.58, 'rgba(108,99,255,0.24)');
      sphere.addColorStop(1, 'rgba(3,7,20,0.08)');
      ctx.fillStyle = sphere;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 7; i += 1) {
        const wave = Math.sin(t + i * 0.8) * 5;
        ctx.beginPath();
        ctx.ellipse(cx, cy + (i - 3) * 18 + wave, r * Math.cos((i - 3) * 0.18), 9, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,194,255,${0.08 + i * 0.012})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = 0; i < 8; i += 1) {
        const angle = (i / 8) * Math.PI * 2 + t * 0.18;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * 0.92, r * 0.22, angle, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(245,240,232,0.07)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const shine = ctx.createRadialGradient(cx - 38, cy - 45, 0, cx - 38, cy - 45, 58);
      shine.addColorStop(0, 'rgba(255,255,255,0.45)');
      shine.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = shine;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      t += 0.02;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={220}
      height={220}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}

export default function About({ lang }) {
  useAnimate();
  const { data } = useData();
  const tx = data?.translations?.about?.[lang] || {};
  const aboutLabel = lang === 'ar' ? 'البنية الماسية الرقمية' : (tx.label || 'About Us');
  const whatsappUrl = 'https://wa.me/966535166370';
  
  const normalizeBrandAr = (text) => {
    if (lang !== 'ar' || typeof text !== 'string') return text;
    return text.replace(/Digital/gi, 'الرقمية');
  };
  
  const title = lang === 'ar' ? 'شريكك في بناء' : normalizeBrandAr(tx.title);
  const titleSpan = lang === 'ar' ? 'الحلول الرقمية' : normalizeBrandAr(tx.titleSpan);
  const desc1 = lang === 'ar'
    ? 'في البنية الماسية الرقمية، نساعد الشركات ورواد الأعمال على تحويل الأفكار والاحتياجات التشغيلية إلى حلول رقمية وبرمجية احترافية، قابلة للتوسع، ومصممة لدعم نمو الأعمال.'
    : normalizeBrandAr(tx.desc1);
  const desc2 = lang === 'ar'
    ? 'نطوّر المواقع الإلكترونية، المتاجر، تطبيقات الجوال، الأنظمة السحابية، البرمجيات المخصصة، وأنظمة ERP، مع خدمات داعمة تشمل الهوية البصرية وإدارة الحملات الإعلانية.'
    : normalizeBrandAr(tx.desc2);

  return (
    <section
      id="about"
      className="section"
      style={{ background: 'var(--bmc-dark-2)', position: 'relative', overflow: 'hidden' }}
    >
      {/* top separator */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,194,255,0.3), transparent)',
      }} />

      {/* ── floating particles ── */}
      <Particles />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}>
          {/* ── Left: Text ── */}
          <div className="about-text">
            <p className="section-label">{aboutLabel}</p>
            <h2 className="section-title" style={{ marginBottom: 8 }}>{title}</h2>
            <h2 className="section-title" style={{ marginBottom: 32 }}><span>{titleSpan}</span></h2>
            <div className="gold-line gold-line-animate" style={{ marginBottom: 32 }} />
            <p style={{ fontSize: 15, color: 'rgba(245,240,232,0.65)', lineHeight: 2, marginBottom: 20 }}>{desc1}</p>
            <p style={{ fontSize: 15, color: 'rgba(245,240,232,0.65)', lineHeight: 2 }}>{desc2}</p>

            <a
              href={whatsappUrl}
              className="snake-btn"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginTop: 40, padding: '12px 28px',
                background: 'linear-gradient(135deg, #3098d7 0%, #2487c5 100%)',
                border: 'none',
                color: '#fff', fontSize: 13, fontWeight: 700,
                textDecoration: 'none', letterSpacing: 0.5, borderRadius: 0,
                transition: 'all 0.3s', overflow: 'hidden',
                boxShadow: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #3aa5e6 0%, #247fbb 100%)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(48,152,215,0.55), 0 0 50px rgba(48,152,215,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #3098d7 0%, #2487c5 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span className="snake-light" />
              {lang === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* ── Right: experience visual ── */}
          <div className="about-experience-visual" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {/* rings */}
            <div style={{ position: 'relative', width: 280, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                position: 'absolute',
                width: 260, height: 260,
                borderRadius: '50%',
                border: '1px solid rgba(0,194,255,0.1)',
                animation: 'aboutRing1 14s linear infinite',
              }} />
              <div style={{
                position: 'absolute',
                width: 300, height: 300,
                borderRadius: '50%',
                border: '1px solid rgba(0,194,255,0.06)',
                animation: 'aboutRing2 20s linear infinite reverse',
              }} />

              {/* outer glow */}
              <div style={{
                position: 'absolute',
                width: 240, height: 240,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,194,255,0.12), transparent 70%)',
                animation: 'aboutGlow 5s ease-in-out infinite',
              }} />

              <div style={{
                width: 220, height: 220,
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 0 60px rgba(0,194,255,0.2), 0 0 120px rgba(0,194,255,0.08), inset 0 0 40px rgba(0,0,0,0.5)',
                animation: 'aboutFloat 6s ease-in-out infinite',
                position: 'relative',
              }}>
                <ExperienceSphereCanvas />

                {/* Premium 3D Number Overlay */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  perspective: '1000px',
                  zIndex: 10,
                }}>
                  {/* Pulsing glow behind the number */}
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 140, height: 140,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,194,255,0.35), transparent 72%)',
                    filter: 'blur(24px)',
                    animation: 'numPulseGlow 4s ease-in-out infinite alternate',
                    zIndex: -1,
                  }} />
                  
                  <span style={{
                    display: 'inline-block',
                    fontSize: 86,
                    fontWeight: 900,
                    fontFamily: 'Playfair Display, serif',
                    background: 'linear-gradient(105deg, rgba(245,240,232,0.5) 0%, rgba(255,255,255,1) 30%, rgba(0,194,255,1) 50%, rgba(184,164,114,1) 70%, rgba(245,240,232,0.5) 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.6)) drop-shadow(0 0 30px rgba(0,194,255,0.5))',
                    animation: 'numFloat3D 6s ease-in-out infinite, numShimmer 5s linear infinite',
                    transformStyle: 'preserve-3d',
                  }}>
                    3
                  </span>
                </div>
              </div>
            </div>

            <p style={{
              fontSize: 13, color: 'rgba(245,240,232,0.5)',
              letterSpacing: 1, marginTop: -8,
            }}>
              {lang === 'ar' ? 'أعوام من الخبرة' : 'Years of Experience'}
            </p>

          </div>
        </div>
      </div>

      <style>{`
        #about .about-experience-visual [style*="border-radius"] { border-radius: 50% !important; }
        @keyframes aboutRing1 { from { transform: rotate(0deg) scaleX(1.5); } to { transform: rotate(360deg) scaleX(1.5); } }
        @keyframes aboutRing2 { from { transform: rotate(0deg) scaleX(1.6); } to { transform: rotate(360deg) scaleX(1.6); } }
        @keyframes aboutGlow  { 0%,100%{ opacity:.6; transform:scale(1); } 50%{ opacity:1; transform:scale(1.1); } }
        @keyframes aboutFloat { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-12px); } }
        
        /* New Premium 3D Animations for the Number 15 */
        @keyframes numFloat3D {
          0%, 100% { transform: perspective(800px) rotateX(6deg) rotateY(-6deg) translateY(0px); }
          25% { transform: perspective(800px) rotateX(-4deg) rotateY(6deg) translateY(-10px); }
          50% { transform: perspective(800px) rotateX(6deg) rotateY(6deg) translateY(-5px); }
          75% { transform: perspective(800px) rotateX(-6deg) rotateY(-4deg) translateY(-12px); }
        }
        @keyframes numShimmer {
          0% { background-position: 200% 50%; }
          100% { background-position: -200% 50%; }
        }
        @keyframes numPulseGlow {
          0% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.9); }
          100% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.15); }
        }

        @keyframes aboutStatIn { from{ opacity:0; transform:translateY(10px) scale(0.8); } to{ opacity:1; transform:translateY(0) scale(1); } }
        
        @media (max-width: 768px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-text { transform: translateX(0) translateY(40px) !important; }
        }
      `}</style>
    </section>
  );
}

/* ── tiny floating particles component ── */
function Particles() {
  const items = Array.from({ length: 18 }, (_, i) => ({
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    dur: 10 + Math.random() * 14,
    delay: -Math.random() * 20,
    key: i,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {items.map(p => (
        <div key={p.key} style={{
          position: 'absolute',
          width: p.size, height: p.size,
          borderRadius: 0,
          background: 'rgba(0,194,255,0.5)',
          left: `${p.left}%`,
          animation: `particleRise ${p.dur}s linear ${p.delay}s infinite`,
        }} />
      ))}
      <style>{`@keyframes particleRise { 0% { transform:translateY(110%); opacity:0; } 10% { opacity:1; } 90% { opacity:1; } 100% { transform:translateY(-10%); opacity:0; } }`}</style>
    </div>
  );
}
