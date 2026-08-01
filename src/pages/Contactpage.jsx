import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceRequestPopup from '../components/ServiceRequestPopup';
import { useReveal } from '../hooks/useReveal';

const contactData = {
  ar: {
    badge: 'تواصل معنا',
    title: 'نحن هنا',
    titleSpan: 'لمساعدتك',
    subtitle: 'سواء كان لديك مشروع في ذهنك أو مجرد استفسار، فريقنا مستعد للرد عليك.',
    formTitle: 'أرسل لنا طلبك',
    formSubtitle: 'املأ النموذج وسنتواصل معك في أقرب وقت ممكن.',
    directContact: 'تواصل مباشر',
    phone: '+966 53 516 6370',
    email: 'info@binyah-masiyah-digital.sa',
    phoneLbl: 'الهاتف',
    emailLbl: 'البريد الإلكتروني',
    whatsappLbl: 'واتساب',
    whatsapp: '+966 53 516 6370',
  },
  en: {
    badge: 'Contact Us',
    title: "We're Here",
    titleSpan: 'to Help You',
    subtitle: 'Whether you have a project in mind or just a question, our team is ready to respond.',
    formTitle: 'Send Us Your Request',
    formSubtitle: 'Fill out the form and we will get back to you as soon as possible.',
    directContact: 'Direct Contact',
    phone: '+966 53 516 6370',
    email: 'info@binyah-masiyah-digital.sa',
    phoneLbl: 'Phone',
    emailLbl: 'Email',
    whatsappLbl: 'WhatsApp',
    whatsapp: '+966 53 516 6370',
  },
};

const contactIcons = {
  phone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  email: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

function WhatsAppLogo({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="#25D366" />
      <path
        fill="#fff"
        d="M23.1 18.9c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.2.4-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.5-.6-2.9-1.8-1.1-1-1.8-2.1-2-2.5-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.2-.4.4-.7.1-.2.1-.5 0-.7-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.1 0 1.8 1.4 3.6 1.5 3.9.2.2 2.7 4.1 6.5 5.7.9.4 1.6.6 2.2.8.9.3 1.7.2 2.4.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.2-.3-.5-.4-.9-.6Z"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M16 5.4c-5.8 0-10.5 4.7-10.5 10.4 0 1.9.5 3.7 1.5 5.3l-1.6 5.5 5.7-1.5c1.5.8 3.2 1.2 5 1.2 5.8 0 10.5-4.7 10.5-10.5S21.8 5.4 16 5.4Zm0 18.9c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.3.9.9-3.2-.2-.3c-.9-1.4-1.3-2.9-1.3-4.5 0-4.7 3.9-8.5 8.6-8.5s8.6 3.8 8.6 8.5-3.9 8.5-8.6 8.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ContactPage({ lang, setLang }) {
  useReveal();
  const tx = contactData[lang] || contactData.ar;
  const contactItems = [
    { icon: contactIcons.phone, label: tx.phoneLbl, value: tx.phone, href: `tel:${tx.phone.replace(/\s/g, '')}`, color: '#00C2FF', showWhatsAppLogoByNumber: true },
    { icon: contactIcons.email, label: tx.emailLbl, value: tx.email, href: `mailto:${tx.email}`, color: '#00C2FF' },
    { icon: <WhatsAppLogo />, label: tx.whatsappLbl, value: tx.whatsapp, href: `https://wa.me/${tx.whatsapp.replace(/\D/g, '')}`, color: '#25d366', showWhatsAppLogoByNumber: true },
  ];
  const tickerContent = Array.from({ length: 8 }, () => contactItems).flat();

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      
      {/* Hero Section - Professional 3D Animated Background */}
      <section className="page-hero page-hero-contact" style={{
        minHeight: '55vh',
        background: 'linear-gradient(180deg, #08131f 0%, #0c1e2f 45%, #08111b 100%)',
        display: 'flex', alignItems: 'center', paddingTop: 120, paddingBottom: 100,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* 1. Ambient Glow */}
        <div className="ambient-glow ambient-glow-contact" />
        {/* 2. Floating 3D Rings */}
        <div className="floating-shape shape-1 contact-shape-1" />
        <div className="floating-shape shape-2 contact-shape-2" />
        <div className="floating-shape shape-3 contact-shape-3" />
        {/* 3. Moving 3D Grid Floor */}
        <div className="grid-floor" />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(245,240,232,0.6)', fontSize: 13, marginBottom: 18 }}>
            <Link to="/" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none' }}>{lang === 'ar' ? 'الرئيسية' : 'Home'}</Link>
            <span style={{ color: 'rgba(0,194,255,0.35)' }}>/</span>
            <span style={{ color: '#00C2FF', fontWeight: 700 }}>{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</span>
          </div>
          
          <h1 style={{
            fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900,
            lineHeight: 1.34, marginBottom: 20, paddingBottom: 6, textWrap: 'balance',
          }}>
            <span style={{ color: 'var(--bmc-white)', display: 'block' }}>{tx.title}</span>
            <span style={{ color: 'var(--neon-blue)', fontStyle: 'normal' }}>{tx.titleSpan}</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(245,240,232,0.55)', maxWidth: 520, lineHeight: 1.8 }}>{tx.subtitle}</p>
        </div>
      </section>

      {/* Ticker */}
      <section style={{ background: 'var(--bmc-dark-2)', borderTop: '1px solid rgba(0,194,255,0.16)', borderBottom: '1px solid rgba(0,194,255,0.16)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', overflow: 'hidden', direction: 'ltr' }}>
          <div style={{ display: 'flex', width: 'max-content', animation: 'contactMarquee1 70s linear infinite' }}>
            {tickerContent.map((c, i) => (
              <div key={`${c.label}-a-${i}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px',
                color: 'rgba(245,240,232,0.75)', fontSize: 13, letterSpacing: 0.6, whiteSpace: 'nowrap',
                direction: lang === 'ar' ? 'rtl' : 'ltr',
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, color: c.color }}>{c.icon}</span>
                <span>{c.label}: </span>{' '}
                {c.showWhatsAppLogoByNumber && <WhatsAppLogo size={18} />}
                <span dir="ltr">{c.value}</span>
              </div>
            ))}
          </div>
          <div aria-hidden="true" style={{ display: 'flex', width: 'max-content', animation: 'contactMarquee2 70s linear infinite' }}>
            {tickerContent.map((c, i) => (
              <div key={`${c.label}-b-${i}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px',
                color: 'rgba(245,240,232,0.75)', fontSize: 13, letterSpacing: 0.6, whiteSpace: 'nowrap',
                direction: lang === 'ar' ? 'rtl' : 'ltr',
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, color: c.color }}>{c.icon}</span>
                <span>{c.label}: </span>{' '}
                {c.showWhatsAppLogoByNumber && <WhatsAppLogo size={18} />}
                <span dir="ltr">{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: 'var(--bmc-dark-2)', padding: '80px 0' }}>
        <div className="container">
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 28, alignItems: 'start' }}>
            {/* Left: direct contact */}
            <div className="reveal">
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--bmc-white)', marginBottom: 8 }}>{tx.directContact}</h2>
              <div className="gold-line" style={{ width: 60, height: 3, background: 'linear-gradient(90deg, #00C2FF, transparent)', marginBottom: 36, borderRadius: 2 }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {contactItems.map((c, i) => (
                  <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', background: 'var(--bmc-dark-2)',
                    border: '1px solid rgba(0,194,255,0.14)', textDecoration: 'none', transition: 'all 0.35s', borderRadius: 14,
                    boxShadow: '0 14px 34px rgba(0,0,0,0.22)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,194,255,0.34)';
                    e.currentTarget.style.background = 'var(--bmc-dark-3)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,194,255,0.14)';
                    e.currentTarget.style.background = 'var(--bmc-dark-2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    <div style={{
                      width: 44, height: 44, border: '1px solid rgba(0,194,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: c.color, flexShrink: 0, borderRadius: 10, background: c.color === '#25d366' ? 'rgba(37,211,102,0.08)' : 'rgba(0,194,255,0.05)',
                    }}>
                      {c.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'rgba(245,240,232,0.4)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>
                        {c.label}
                      </div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, color: 'rgba(245,240,232,0.8)', fontWeight: 600 }} dir="ltr">
                        {c.showWhatsAppLogoByNumber && <WhatsAppLogo size={18} />}
                        {c.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <div style={{
                border: '1px solid rgba(0,194,255,0.14)', borderRadius: 14, padding: 24, background: 'var(--bmc-dark-2)',
                boxShadow: '0 14px 34px rgba(0,0,0,0.22)',
              }}>
                <ServiceRequestPopup lang={lang} title={tx.formTitle} subtitle={tx.formSubtitle} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <style>{`
        @keyframes gridMove {
          0% { transform: rotateX(60deg) translateY(0); }
          100% { transform: rotateX(60deg) translateY(60px); }
        }
        @keyframes float3D {
          0%, 100% { transform: rotateX(45deg) rotateY(45deg) translateZ(0px) translateY(0px); }
          25% { transform: rotateX(50deg) rotateY(50deg) translateZ(20px) translateY(-15px); }
          50% { transform: rotateX(40deg) rotateY(40deg) translateZ(-10px) translateY(-30px); }
          75% { transform: rotateX(55deg) rotateY(35deg) translateZ(10px) translateY(-15px); }
        }
        @keyframes pulseGlow {
          0% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes contactMarquee1 { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-100%,0,0); } }
        @keyframes contactMarquee2 { 0% { transform: translate3d(100%,0,0); } 100% { transform: translate3d(0,0,0); } }
        
        .ambient-glow {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 80vw; height: 80vh;
          background: radial-gradient(circle, rgba(0, 194, 255, 0.08) 0%, transparent 60%);
          animation: pulseGlow 6s ease-in-out infinite alternate; pointer-events: none;
        }
        .floating-shape {
          position: absolute; border-radius: 50%; pointer-events: none;
          animation: float3D 8s ease-in-out infinite;
        }
        .shape-1 {
          width: 300px; height: 300px; top: 10%; right: 10%;
          border: 1px solid rgba(0, 194, 255, 0.15);
          box-shadow: 0 0 40px rgba(0, 194, 255, 0.1), inset 0 0 40px rgba(0, 194, 255, 0.05);
        }
        .shape-2 {
          width: 200px; height: 200px; bottom: 20%; left: 10%;
          border: 1px solid rgba(108, 99, 255, 0.15);
          box-shadow: 0 0 40px rgba(108, 99, 255, 0.1), inset 0 0 40px rgba(108, 99, 255, 0.05);
          animation-delay: -2s; animation-duration: 10s;
        }
        .shape-3 {
          width: 150px; height: 150px; top: 40%; left: 50%;
          border: 1px solid rgba(184, 164, 114, 0.15);
          box-shadow: 0 0 40px rgba(184, 164, 114, 0.1), inset 0 0 40px rgba(184, 164, 114, 0.05);
          animation-delay: -4s; animation-duration: 12s;
        }
        .grid-floor {
          position: absolute; bottom: -50%; left: -50%; width: 200%; height: 100%;
          background-image: linear-gradient(rgba(0, 194, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 194, 255, 0.1) 1px, transparent 1px);
          background-size: 60px 60px;
          transform: rotateX(60deg);
          animation: gridMove 4s linear infinite;
          mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
          -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
          pointer-events: none;
        }
        @media (max-width: 640px) { section h1 { line-height: 1.4 !important; padding-bottom: 10px !important; } }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }
      `}</style>
    </>
  );
}
