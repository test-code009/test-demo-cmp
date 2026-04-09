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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Top info bar ─────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-8"
        style={{
          height: '36px',
          background: 'rgba(10,10,10,0.92)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Left — contact info */}
        <div className="flex items-center gap-6">
          <a
            href="mailto:info@classicmotionperformance.com"
            className="flex items-center gap-1.5 text-soft-grey/70 hover:text-text-white transition-colors duration-200 text-xs"
          >
            <Mail size={11} className="text-primary-red" />
            info@classicmotionperformance.com
          </a>
          <a
            href="tel:+371XXXXXXXX"
            className="flex items-center gap-1.5 text-soft-grey/70 hover:text-text-white transition-colors duration-200 text-xs"
          >
            <Phone size={11} className="text-primary-red" />
            +371 XXXXXXXX
          </a>
        </div>
        {/* Right — social */}
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/classicmotionperformance"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-soft-grey/70 hover:text-primary-red transition-colors duration-200 text-xs"
          >
            <InstagramIcon />
            @classicmotionperformance
          </a>
          <span className="text-white/10 text-xs">|</span>
          <span className="text-soft-grey/40 text-xs uppercase tracking-widest">Mk2 Specialists</span>
        </div>
      </div>

      {/* ── Main navbar ──────────────────────────────────────────── */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-charcoal/90 backdrop-blur-xl border-b shadow-2xl'
            : 'bg-transparent'
        }`}
        style={{
          top: '36px',
          borderColor: scrolled ? 'rgba(255,255,255,0.06)' : 'transparent',
          // Hide top bar on mobile — header starts at 0
          '@media (max-width: 767px)': { top: 0 },
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center h-16 gap-4">

          {/* Mobile hamburger — LEFT */}
          <button
            className="md:hidden text-text-white p-2 rounded-lg transition-colors hover:bg-white/5 flex-shrink-0"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>

          {/* Desktop Nav — centered */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  location.pathname === link.path
                    ? 'text-text-white'
                    : 'text-soft-grey hover:text-text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-primary-red transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right side — search + CTA */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            {/* Search bar */}
            <div className="relative flex items-center">
              <div
                className={`flex items-center overflow-hidden transition-all duration-400 rounded-full ${
                  searchOpen ? 'w-52' : 'w-0'
                }`}
                style={{ border: searchOpen ? '1px solid rgba(217,31,38,0.35)' : 'none' }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent text-text-white text-sm px-4 py-1.5 outline-none placeholder-soft-grey/40"
                />
              </div>
              <button
                onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setSearchQuery(''); }}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 text-soft-grey hover:text-primary-red"
                aria-label="Search"
              >
                {searchOpen ? <X size={15} /> : <Search size={15} />}
              </button>
            </div>
            <Link to="/kontakti" className="btn-primary text-sm py-2 px-5">
              Sazināties
            </Link>
          </div>

          {/* Mobile — search icon only (right side) */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-soft-grey hover:text-primary-red p-2 transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div
            className="md:hidden px-5 pb-3"
            style={{ background: 'rgba(17,17,17,0.97)' }}
          >
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-2.5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(217,31,38,0.3)' }}
            >
              <Search size={14} className="text-primary-red flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                autoFocus
                className="flex-1 bg-transparent text-text-white text-sm outline-none placeholder-soft-grey/40"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-soft-grey/50 hover:text-text-white">
                  <X size={13} />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ── Full-screen mobile menu overlay ──────────────────────── */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(6,6,6,0.97)', backdropFilter: 'blur(24px)' }}
      >
        {/* Close button */}
        <button
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full text-soft-grey hover:text-text-white transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        {/* Menu content */}
        <div className="flex flex-col justify-center h-full px-10 gap-1">
          {/* Eyebrow */}
          <p className="section-eyebrow mb-8">Navigation</p>

          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`group flex items-center justify-between py-5 transition-all duration-300 ${
                location.pathname === link.path ? 'text-text-white' : 'text-soft-grey/60 hover:text-text-white'
              }`}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms',
                transform: mobileOpen ? 'translateX(0)' : 'translateX(-20px)',
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              <span className="font-display font-semibold text-3xl">{link.label}</span>
              {location.pathname === link.path && (
                <span className="w-2 h-2 rounded-full bg-primary-red" />
              )}
            </Link>
          ))}

          {/* CTA */}
          <Link
            to="/kontakti"
            className="btn-primary mt-10 justify-center"
            style={{
              transitionDelay: mobileOpen ? '280ms' : '0ms',
              transform: mobileOpen ? 'translateY(0)' : 'translateY(10px)',
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            Sazināties
          </Link>

          {/* Contact info strip at bottom */}
          <div className="mt-10 pt-6 flex flex-col gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <a href="mailto:info@classicmotionperformance.com"
              className="flex items-center gap-2 text-soft-grey/50 text-xs">
              <Mail size={12} className="text-primary-red" />
              info@classicmotionperformance.com
            </a>
            <a href="https://instagram.com/classicmotionperformance"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-soft-grey/50 text-xs">
              <span className="text-primary-red"><InstagramIcon /></span>
              @classicmotionperformance
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
