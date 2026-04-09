import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export default function Footer() {
  return (
    <footer
      className="relative mt-auto"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0a0a0a' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #D91F26, #FF3B30)', boxShadow: '0 0 16px rgba(217,31,38,0.3)' }}
              >
                <span className="text-white font-display font-bold text-sm">CMP</span>
              </div>
              <span className="text-text-white font-display font-semibold text-sm tracking-wide">
                Classic Motion Performance
              </span>
            </div>
            <p className="text-soft-grey text-sm leading-relaxed max-w-xs">
              Premium brake and suspension upgrades for performance-focused builds.
            </p>
            <div className="red-line-accent mt-6" />
          </div>

          {/* Navigation */}
          <div>
            <p className="section-eyebrow mb-5">Navigation</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-soft-grey text-sm hover:text-text-white transition-colors duration-200 flex items-center gap-1 group w-fit"
                >
                  {link.label}
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-primary-red"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="section-eyebrow mb-5">Contact</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@classicmotionperformance.com"
                className="flex items-center gap-3 text-soft-grey text-sm hover:text-text-white transition-colors duration-200 group"
              >
                <Mail size={14} className="text-primary-red flex-shrink-0" />
                info@classicmotionperformance.com
              </a>
              <a
                href="tel:+371XXXXXXXX"
                className="flex items-center gap-3 text-soft-grey text-sm hover:text-text-white transition-colors duration-200"
              >
                <Phone size={14} className="text-primary-red flex-shrink-0" />
                +371 XXXXXXXX
              </a>
              <a
                href="https://instagram.com/classicmotionperformance"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-soft-grey text-sm hover:text-text-white transition-colors duration-200"
              >
                <span className="text-primary-red flex-shrink-0"><InstagramIcon /></span>
                @classicmotionperformance
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-soft-grey text-xs">
            &copy; {new Date().getFullYear()} Classic Motion Performance. All rights reserved.
          </p>
          <p className="text-soft-grey text-xs">
            Mk2 Performance Specialists
          </p>
        </div>
      </div>
    </footer>
  );
}
