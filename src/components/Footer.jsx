import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import logoSrc from '../assets/logomk2.png';
import { useLanguage } from '../context/LanguageContext';
import t from '../lib/translations';

const TikTokIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.52V6.78a4.85 4.85 0 0 1-1.02-.09z"/>
  </svg>
);

export default function Footer() {
  const { lang } = useLanguage();
  const tr = t[lang];

  const navLinks = [
    { label: tr.nav_home, path: '/' },
    { label: tr.nav_products, path: '/produkti' },
    { label: tr.nav_about, path: '/par-mums' },
    { label: tr.nav_contacts, path: '/kontakti' },
  ];

  return (
    <footer
      className="relative mt-auto"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0a0a0a' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div>
            <img
              src={logoSrc}
              alt="Classic Motion Performance"
              className="mb-4"
              style={{ height: '120px', width: 'auto', opacity: 0.9 }}
            />
            <p className="text-soft-grey text-sm leading-relaxed max-w-xs">
              {tr.footer_desc}
            </p>
            <div className="red-line-accent mt-6" />
          </div>

          {/* Navigation */}
          <div>
            <p className="section-eyebrow mb-5">{tr.footer_nav}</p>
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
            <p className="section-eyebrow mb-5">{tr.footer_contact}</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@cmp-performance.lv"
                className="flex items-center gap-3 text-soft-grey text-sm hover:text-text-white transition-colors duration-200 group"
              >
                <Mail size={14} className="text-primary-red flex-shrink-0" />
                info@cmp-performance.lv
              </a>
              <a
                href="tel:+37129147322"
                className="flex items-center gap-3 text-soft-grey text-sm hover:text-text-white transition-colors duration-200"
              >
                <Phone size={14} className="text-primary-red flex-shrink-0" />
                +371 29147322
              </a>
              <a
                href="https://www.tiktok.com/@cmp_performance?_r=1&_t=ZN-96AGxKCvBhr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-soft-grey text-sm hover:text-text-white transition-colors duration-200"
              >
                <span className="text-primary-red flex-shrink-0"><TikTokIcon /></span>
                @cmp_performance
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
            &copy; {new Date().getFullYear()} Classic Motion Performance. {tr.footer_rights}
          </p>
          <p className="text-soft-grey text-xs">
            {tr.footer_tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
