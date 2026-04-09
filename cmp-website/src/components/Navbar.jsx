import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Sākums', path: '/' },
  { label: 'Produkti', path: '/produkti' },
  { label: 'Par mums', path: '/par-mums' },
  { label: 'Kontakti', path: '/kontakti' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-charcoal/85 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 group-hover:shadow-red-glow"
              style={{ background: 'linear-gradient(135deg, #D91F26, #FF3B30)', boxShadow: '0 0 16px rgba(217,31,38,0.35)' }}
            >
              <span className="text-white font-display font-bold text-sm tracking-wider">CMP</span>
            </div>
            <div>
              <span className="hidden sm:block text-text-white font-display font-semibold text-sm tracking-wide leading-none">
                Classic Motion
              </span>
              <span className="hidden sm:block text-soft-grey text-xs tracking-[0.12em] uppercase leading-none mt-0.5">
                Performance
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
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

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link to="/kontakti" className="hidden md:inline-flex btn-primary text-sm py-2.5 px-5">
            Sazināties
          </Link>
          <button
            className="md:hidden text-text-white p-2 rounded-lg transition-colors hover:bg-white/5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ borderTop: mobileOpen ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
      >
        <nav
          className="flex flex-col px-6 py-5 gap-1"
          style={{ background: 'rgba(17,17,17,0.97)', backdropFilter: 'blur(20px)' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`py-3 text-sm font-medium border-b transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-primary-red border-primary-red/20'
                  : 'text-soft-grey border-white/5 hover:text-text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/kontakti" className="btn-primary mt-3 justify-center text-sm py-3">
            Sazināties
          </Link>
        </nav>
      </div>
    </header>
  );
}
