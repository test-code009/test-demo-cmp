import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, Search, Mail, Phone, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import t from '../lib/translations';

const InstagramIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearch, setMobileSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { lang, setLang } = useLanguage();
  const tr = t[lang];

  const navLinks = [
    { label: tr.nav_home, path: '/' },
    { label: tr.nav_products, path: '/produkti' },
    { label: tr.nav_about, path: '/par-mums' },
    { label: tr.nav_contacts, path: '/kontakti' },
  ];

  function handleBack() {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  }

  useEffect(() => {
    setMenuOpen(false);
    setSearchQuery('');
    setMobileSearch('');
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    document.body.dataset.menuOpen = menuOpen ? 'true' : 'false';
    return () => { document.body.style.overflow = ''; document.body.dataset.menuOpen = 'false'; };
  }, [menuOpen]);

  const LangToggle = ({ small = false }) => (
    <div className="flex items-center rounded-full overflow-hidden flex-shrink-0"
      style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)' }}>
      {['lv', 'en'].map(l => (
        <button key={l} onClick={() => setLang(l)}
          className={`font-semibold uppercase transition-all duration-200 ${small ? 'text-[11px] px-2.5 py-1' : 'text-xs px-3 py-1.5'}`}
          style={{
            background: lang === l ? '#D91F26' : 'transparent',
            color: lang === l ? '#fff' : 'rgba(255,255,255,0.45)',
          }}>
          {l}
        </button>
      ))}
    </div>
  );

  const HamburgerBtn = () => (
    <button
      className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 flex-shrink-0"
      style={{ border: '1px solid rgba(255,255,255,0.08)', background: menuOpen ? 'rgba(217,31,38,0.12)' : 'rgba(255,255,255,0.04)' }}
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle menu"
    >
      <div className="flex flex-col gap-[5px] w-[18px]">
        <span className="block h-px w-full transition-all duration-300"
          style={{ transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none', background: menuOpen ? '#D91F26' : '#F5F5F5' }} />
        <span className="block h-px transition-all duration-300"
          style={{ width: menuOpen ? '100%' : '70%', opacity: menuOpen ? 0 : 1, background: '#F5F5F5' }} />
        <span className="block h-px w-full transition-all duration-300"
          style={{ transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none', background: menuOpen ? '#D91F26' : '#F5F5F5' }} />
      </div>
    </button>
  );

  return (
    <>
      {/* ════════════════════════════════════════════
          MOBILE NAVBAR — always fixed at top
      ════════════════════════════════════════════ */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center px-4"
        style={{
          height: '56px',
          background: 'rgba(6,6,6,0.96)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
        }}>
        {/* Left: back button or logo */}
        {!isHome ? (
          <button onClick={handleBack}
            className="flex items-center gap-1.5 flex-shrink-0 transition-all duration-200 mr-2"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px 10px' }}>
            <ArrowLeft size={13} className="text-soft-grey" />
            <span className="text-soft-grey text-xs font-medium uppercase tracking-wider">{tr.nav_back}</span>
          </button>
        ) : (
          <Link to="/" className="flex-shrink-0">
            <img src="/logo.png" alt="CMP" style={{ height: '38px', width: 'auto', filter: 'drop-shadow(0 0 6px rgba(217,31,38,0.3))' }} />
          </Link>
        )}

        {/* Right: lang + hamburger */}
        <div className="flex items-center gap-2 ml-auto">
          <LangToggle small />
          <HamburgerBtn />
        </div>
      </header>

      {/* ════════════════════════════════════════════
          DESKTOP INFO BAR — top strip
      ════════════════════════════════════════════ */}
      <div className={`${isHome ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-8`}
        style={{ height: '36px', background: 'rgba(10,10,10,0.92)', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-6">
          <a href="mailto:info@classicmotionperformance.com"
            className="flex items-center gap-1.5 text-soft-grey/70 hover:text-text-white transition-colors text-xs">
            <Mail size={11} className="text-primary-red" />
            info@classicmotionperformance.com
          </a>
          <a href="tel:+371XXXXXXXX"
            className="flex items-center gap-1.5 text-soft-grey/70 hover:text-text-white transition-colors text-xs">
            <Phone size={11} className="text-primary-red" />
            +371 XXXXXXXX
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://instagram.com/classicmotionperformance"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-soft-grey/70 hover:text-primary-red transition-colors text-xs">
            <InstagramIcon />
            @classicmotionperformance
          </a>
          <span className="text-white/10 text-xs">|</span>
          <span className="text-soft-grey/40 text-xs uppercase tracking-widest">{tr.nav_specialists}</span>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          DESKTOP MAIN NAVBAR
      ════════════════════════════════════════════ */}
      <header className="hidden md:block left-0 right-0 z-50"
        style={{
          position: isHome ? 'absolute' : 'fixed',
          top: isHome ? 0 : '36px',
          background: isHome ? 'transparent' : 'rgba(6,6,6,0.92)',
          backdropFilter: isHome ? 'none' : 'blur(16px)',
          borderBottom: isHome ? 'none' : '1px solid rgba(255,255,255,0.05)',
        }}>
        <div className="flex items-center px-6" style={{ height: isHome ? '300px' : '60px' }}>

          {/* Back button — sub-pages */}
          {!isHome && (
            <button onClick={handleBack}
              className="group flex items-center gap-2 flex-shrink-0 mr-4 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '7px 13px' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,31,38,0.12)'; e.currentTarget.style.borderColor = 'rgba(217,31,38,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              <ArrowLeft size={13} className="text-soft-grey group-hover:text-primary-red transition-colors" />
              <span className="text-soft-grey group-hover:text-text-white transition-colors text-xs font-medium uppercase tracking-widest">{tr.nav_back}</span>
            </button>
          )}

          {/* Logo — home only */}
          {isHome && (
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/logo.png" alt="Classic Motion Performance"
                style={{ height: '280px', filter: 'drop-shadow(0 0 16px rgba(217,31,38,0.4))', display: 'block' }} />
            </Link>
          )}

          {/* Right controls */}
          <div className={`flex items-center gap-3 ml-auto ${isHome ? 'self-start pt-4' : ''}`}>
            {/* Search */}
            <div className="relative flex items-center">
              <Search size={13} className="absolute left-3 text-soft-grey/50 pointer-events-none z-10" />
              <input type="text" value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    navigate(`/produkti?q=${encodeURIComponent(searchQuery.trim())}`);
                    e.target.blur();
                  }
                }}
                placeholder={tr.nav_search}
                className="text-text-white text-sm pl-8 pr-8 py-2 outline-none transition-all duration-300 rounded-full w-44"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#F5F5F5' }}
                onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.18)'; e.target.style.borderColor = 'rgba(217,31,38,0.5)'; e.target.style.width = '210px'; }}
                onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.12)'; e.target.style.borderColor = 'rgba(255,255,255,0.15)'; if (!searchQuery) e.target.style.width = ''; }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 text-soft-grey/50 hover:text-text-white transition-colors">
                  <X size={12} />
                </button>
              )}
            </div>

            <LangToggle />

            <Link to="/kontakti" className="btn-primary text-sm py-2 px-5">
              {tr.nav_contact_btn}
            </Link>

            <HamburgerBtn />
          </div>
        </div>
      </header>

      {/* ── Backdrop ─────────────────────────────────────────────── */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
        onClick={() => setMenuOpen(false)} />

      {/* ── Side drawer ──────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 bottom-0 z-50 flex flex-col"
        style={{
          width: 'min(80vw, 340px)',
          background: '#0a0a0a',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: menuOpen ? '8px 0 60px rgba(0,0,0,0.7)' : 'none',
        }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="section-eyebrow">{tr.nav_menu}</p>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg"
            style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(217,31,38,0.1)' }}
            onClick={() => setMenuOpen(false)}>
            <X size={15} className="text-primary-red" />
          </button>
        </div>

        {/* Mobile search in drawer */}
        <div className="px-6 pt-4 pb-2">
          <div className="relative flex items-center">
            <Search size={13} className="absolute left-3 text-soft-grey/50 pointer-events-none z-10" />
            <input type="text" value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && mobileSearch.trim()) {
                  navigate(`/produkti?q=${encodeURIComponent(mobileSearch.trim())}`);
                  setMenuOpen(false);
                }
              }}
              placeholder={tr.nav_search}
              className="w-full text-text-white text-sm pl-9 pr-3 py-3 outline-none rounded-xl"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F5F5' }} />
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col flex-1 px-6 py-4 overflow-y-auto">
          {navLinks.map((link, i) => (
            <Link key={link.path} to={link.path}
              className={`flex items-center justify-between py-4 transition-all duration-300 ${
                location.pathname === link.path ? 'text-text-white' : 'text-soft-grey/60 hover:text-text-white'
              }`}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transitionDelay: menuOpen ? `${i * 50}ms` : '0ms',
                transform: menuOpen ? 'translateX(0)' : 'translateX(-16px)',
                opacity: menuOpen ? 1 : 0,
              }}>
              <span className="font-display font-bold text-2xl">{link.label}</span>
              {location.pathname === link.path && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary-red flex-shrink-0" />
              )}
            </Link>
          ))}

          <Link to="/kontakti" className="btn-primary mt-6 justify-center text-sm"
            style={{
              transitionDelay: menuOpen ? '240ms' : '0ms',
              transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
              opacity: menuOpen ? 1 : 0,
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}>
            {tr.nav_contact_btn}
          </Link>
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 flex flex-col gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', opacity: menuOpen ? 1 : 0, transition: 'opacity 0.4s ease 0.28s' }}>
          <a href="mailto:info@classicmotionperformance.com"
            className="flex items-center gap-2 text-soft-grey/50 hover:text-soft-grey text-xs transition-colors">
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
