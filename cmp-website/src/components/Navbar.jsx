import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Mail, Phone } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const navLinks = [
  { label: 'Sākums', path: '/' },
  { label: 'Produkti', path: '/produkti' },
  { label: 'Par mums', path: '/par-mums' },
  { label: 'Kontakti', path: '/kontakti' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setSearchQuery('');
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Top info bar (desktop only) ───────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-8"
        style={{
          height: '36px',
          background: 'rgba(10,10,10,0.92)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-6">
          <a href="mailto:info@classicmotionperformance.com"
            className="flex items-center gap-1.5 text-soft-grey/70 hover:text-text-white transition-colors duration-200 text-xs">
            <Mail size={11} className="text-primary-red" />
            info@classicmotionperformance.com
          </a>
          <a href="tel:+371XXXXXXXX"
            className="flex items-center gap-1.5 text-soft-grey/70 hover:text-text-white transition-colors duration-200 text-xs">
            <Phone size={11} className="text-primary-red" />
            +371 XXXXXXXX
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://instagram.com/classicmotionperformance"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-soft-grey/70 hover:text-primary-red transition-colors duration-200 text-xs">
            <InstagramIcon />
            @classicmotionperformance
          </a>
          <span className="text-white/10 text-xs">|</span>
          <span className="text-soft-grey/40 text-xs uppercase tracking-widest">Mk2 Specialists</span>
        </div>
      </div>

      {/* ── Main navbar ──────────────────────────────────────────────── */}
      <header
        className="absolute left-0 right-0 z-50 bg-transparent"
        style={{
          top: 0,
          marginTop: 'clamp(0px, 4vw, 36px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4" style={{ height: '220px' }}>

          {/* ── Logo — left ───── */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img
              src="/logo.png"
              alt="Classic Motion Performance"
              style={{ height: '200px', filter: 'drop-shadow(0 0 12px rgba(217,31,38,0.35))' }}
            />
          </Link>

          {/* ── Search + CTA — top-right ─── */}
          <div className="flex items-center gap-3 ml-auto self-start pt-4">
            {/* Always-visible search bar */}
            <div className="relative flex items-center">
              <Search size={13} className="absolute left-3 text-soft-grey/50 pointer-events-none z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="text-text-white text-sm pl-8 pr-8 py-2 outline-none transition-all duration-300 rounded-full w-36 sm:w-44"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  color: '#F5F5F5',
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.18)';
                  e.target.style.borderColor = 'rgba(217,31,38,0.5)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(217,31,38,0.08)';
                  e.target.style.width = '200px';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.12)';
                  e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.target.style.boxShadow = 'none';
                  if (!searchQuery) e.target.style.width = '';
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-soft-grey/50 hover:text-text-white transition-colors"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <Link to="/kontakti" className="btn-primary text-sm py-2 px-5 hidden sm:inline-flex">
              Sazināties
            </Link>

            {/* ── Hamburger — right ───── */}
            <button
              className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 flex-shrink-0"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: menuOpen ? 'rgba(217,31,38,0.12)' : 'rgba(255,255,255,0.04)' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-[5px] w-5">
                <span className="block h-px w-full transition-all duration-300"
                  style={{ transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none', background: menuOpen ? '#D91F26' : '#F5F5F5' }} />
                <span className="block h-px transition-all duration-300"
                  style={{ width: menuOpen ? '100%' : '70%', opacity: menuOpen ? 0 : 1, background: '#F5F5F5' }} />
                <span className="block h-px w-full transition-all duration-300"
                  style={{ transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none', background: menuOpen ? '#D91F26' : '#F5F5F5' }} />
              </div>
            </button>
          </div>
        </div>

      </header>

      {/* ── Backdrop dimmer ──────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={() => setMenuOpen(false)}
      />

      {/* ── Side drawer — 1/4 width, slides from left ────────────────── */}
      <div
        className="fixed top-0 left-0 bottom-0 z-50 flex flex-col"
        style={{
          width: 'clamp(260px, 25vw, 380px)',
          background: '#0a0a0a',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: menuOpen ? '8px 0 60px rgba(0,0,0,0.7)' : 'none',
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="section-eyebrow">Menu</p>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg text-soft-grey hover:text-text-white transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(217,31,38,0.1)' }}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={15} className="text-primary-red" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col flex-1 px-7 py-6 gap-1 overflow-y-auto">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center justify-between py-4 transition-all duration-300 ${
                location.pathname === link.path ? 'text-text-white' : 'text-soft-grey/60 hover:text-text-white'
              }`}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transitionDelay: menuOpen ? `${i * 55}ms` : '0ms',
                transform: menuOpen ? 'translateX(0)' : 'translateX(-16px)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              <span className="font-display font-bold text-2xl">{link.label}</span>
              {location.pathname === link.path && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary-red flex-shrink-0" />
              )}
            </Link>
          ))}

          <Link
            to="/kontakti"
            className="btn-primary mt-8 justify-center text-sm"
            style={{
              transitionDelay: menuOpen ? '260ms' : '0ms',
              transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
              opacity: menuOpen ? 1 : 0,
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            Sazināties
          </Link>
        </nav>

        {/* Contact info at bottom */}
        <div className="px-7 py-6 flex flex-col gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', opacity: menuOpen ? 1 : 0, transition: 'opacity 0.4s ease 0.3s' }}>
          <a href="mailto:info@classicmotionperformance.com"
            className="flex items-center gap-2 text-soft-grey/50 hover:text-soft-grey text-xs transition-colors truncate">
            <Mail size={11} className="text-primary-red flex-shrink-0" />
            info@classicmotionperformance.com
          </a>
          <a href="https://instagram.com/classicmotionperformance"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-soft-grey/50 hover:text-soft-grey text-xs transition-colors">
            <span className="text-primary-red flex-shrink-0"><InstagramIcon /></span>
            @classicmotionperformance
          </a>
        </div>
      </div>
    </>
  );
}
