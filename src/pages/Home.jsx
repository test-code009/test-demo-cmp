import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getLatestProducts, urlFor } from '../lib/sanity';

const homeFallbackProducts = [
  {
    _id: 'suspension-brake',
    slug: null,
    category: 'Suspension & Brake',
    title: 'Suspension + Brake Assembly',
    price: '1249',
    mainImage: null,
    localImage: '/product-suspension-brake.jpeg',
  },
  {
    _id: 'subframe',
    slug: null,
    category: 'Chassis',
    title: 'Front Subframe',
    price: '849',
    mainImage: null,
    localImage: '/product-subframe.jpeg',
  },
];

const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <img
      src="/hero.png"
      alt="Classic Motion Performance — VW Golf Mk2"
      className="absolute inset-0 w-full h-full object-cover object-center"
      style={{ animation: 'slowZoom 14s ease-in-out infinite alternate' }}
    />
    <div className="absolute inset-0" style={{ background: 'rgba(6,6,6,0.40)' }} />
    <div className="absolute inset-y-0 left-0 w-3/4" style={{ background: 'linear-gradient(to right, rgba(6,6,6,0.88) 0%, rgba(6,6,6,0.50) 45%, transparent 100%)' }} />
    <div className="absolute bottom-0 left-0 right-0 h-56" style={{ background: 'linear-gradient(to top, #060606 0%, transparent 100%)' }} />
    <div
      className="absolute bottom-0 right-0 w-[600px] h-[400px] opacity-25 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(217,31,38,0.35) 0%, transparent 70%)', transform: 'translate(10%, 20%)' }}
    />
  </div>
);

export default function Home() {
  const [newProducts, setNewProducts] = useState(homeFallbackProducts);

  useScrollReveal([newProducts]);

  useEffect(() => {
    getLatestProducts(3)
      .then(data => {
        if (data && data.length) setNewProducts(data);
      })
      .catch(() => {});
  }, []);

  return (
    <main>
      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: '100svh', minHeight: '600px' }}>
        <HeroBackground />

        {/* Floating keyword ticker bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden"
          style={{
            background: 'rgba(6,6,6,0.72)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(217,31,38,0.2)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}>
          <div className="flex items-center py-3" style={{ animation: 'marquee 22s linear infinite' }}>
            {[...Array(3)].map((_, rep) => (
              <div key={rep} className="flex items-center gap-0 flex-shrink-0">
                {['Stop Harder', 'Drive Sharper', 'Built for Mk2', 'Engineered Performance', 'Clean & Purposeful', 'Upgrade Everything'].map((kw, i) => (
                  <span key={i} className="flex items-center gap-5 px-6">
                    <span className="text-text-white/80 text-xs font-semibold uppercase tracking-[0.18em] whitespace-nowrap">{kw}</span>
                    <span className="w-1 h-1 rounded-full bg-primary-red flex-shrink-0" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Hero text block ─────────────────────────────────────────── */}
      <section className="relative bg-charcoal" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ background: 'linear-gradient(180deg, #D91F26, rgba(217,31,38,0.2))' }} />

        <div className="max-w-7xl mx-auto px-8 md:px-12 py-12 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <div className="section-eyebrow mb-4 fade-up-element">PREMIUM PERFORMANCE UPGRADES</div>
              <h1 className="section-title text-4xl sm:text-5xl lg:text-6xl fade-up-element"
                style={{ transitionDelay: '0.08s', lineHeight: 1.05 }}>
                Classic Motion
                <br />
                <span className="text-gradient-red">Performance</span>
              </h1>
            </div>
            <div className="fade-up-element" style={{ transitionDelay: '0.15s' }}>
              <p className="text-soft-grey text-base leading-relaxed mb-7">
                Precision brake and suspension solutions for Mk2 builds and enthusiasts who demand more.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/produkti" className="btn-primary text-sm py-2.5 px-6">
                  Explore Products <ArrowRight size={14} />
                </Link>
                <Link to="/kontakti" className="btn-secondary text-sm py-2.5 px-6">
                  Get in Touch
                </Link>
              </div>
              <div className="flex flex-wrap gap-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {[
                  { label: 'Brake Upgrades', value: 'G60 Systems' },
                  { label: 'Suspension', value: 'Precision Kits' },
                  { label: 'Fitment', value: 'Mk2 Specific' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-soft-grey/50 text-[10px] uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="text-text-white font-display font-semibold text-sm">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10 fade-up-element" style={{ transitionDelay: '0.25s' }}>
            <button
              onClick={() => document.getElementById('new-in-store')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex flex-col items-center gap-2 group opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
              <span className="text-soft-grey text-[10px] uppercase tracking-[0.25em]">Scroll</span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary-red/10"
                style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
                <ChevronDown size={16} className="text-primary-red group-hover:translate-y-0.5 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ─── New in Store ─────────────────────────────────────────────── */}
      <section id="new-in-store" className="relative py-28 bg-base-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="section-eyebrow mb-3 fade-up-element">Fresh Arrivals</p>
              <h2 className="section-title text-3xl sm:text-4xl fade-up-element" style={{ transitionDelay: '0.1s' }}>
                New in Store
              </h2>
            </div>
            <Link to="/produkti"
              className="hidden sm:flex items-center gap-2 text-soft-grey/60 hover:text-primary-red transition-colors duration-200 text-sm font-medium fade-up-element"
              style={{ transitionDelay: '0.2s' }}>
              View all
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {newProducts.map((product, i) => {
              let imageUrl = product.localImage || null;
              try {
                if (product.mainImage?.asset) {
                  imageUrl = urlFor(product.mainImage).width(900).height(600).fit('crop').quality(90).url();
                }
              } catch (e) { /* ignore */ }

              const price = product.price
                ? (typeof product.price === 'number'
                    ? `${product.price} €`
                    : product.price.toString().includes('€') ? product.price : `${product.price} €`)
                : null;

              return (
                <Link
                  key={product._id}
                  to={product.slug ? `/produkti/${product.slug}` : '/produkti'}
                  className="group fade-up-element block rounded-2xl overflow-hidden"
                  style={{
                    transitionDelay: `${0.1 + i * 0.1}s`,
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(217,31,38,0.35)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: '#0d0d0d' }}>
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1">
                          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="px-5 py-4 flex items-center justify-between gap-4">
                    <h3 className="text-text-white font-display font-bold text-base leading-snug flex-1">
                      {product.title}
                    </h3>
                    {price ? (
                      <span className="text-primary-red font-display font-bold text-lg flex-shrink-0">{price}</span>
                    ) : (
                      <span className="text-soft-grey/50 text-xs uppercase tracking-widest flex-shrink-0">Cena pēc piepras.</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Brand Statement ─────────────────────────────────────────── */}
      <section className="relative py-28 bg-base-black overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="red-line-accent fade-up-element" />
              <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-8 fade-up-element" style={{ transitionDelay: '0.1s' }}>
                Built for Drivers Who Care About Every Detail
              </h2>
            </div>
            <div className="fade-up-element" style={{ transitionDelay: '0.2s' }}>
              <p className="text-soft-grey text-base leading-relaxed mb-6">
                Classic Motion Performance delivers refined upgrade solutions for enthusiasts who want sharper braking, better road feel, and a more purposeful build. Every detail is chosen to combine performance, reliability, and visual impact.
              </p>
              <p className="text-soft-grey/70 text-sm leading-relaxed">
                Focused exclusively on Volkswagen Golf Mk2 — not a general catalogue. Purpose-built solutions for builds that deserve precision.
              </p>
              <div className="mt-8">
                <Link to="/par-mums" className="btn-secondary text-sm">
                  Our Story <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────── */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0606 0%, #130808 50%, #0a0a0a 100%)' }}
      >
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, rgba(217,31,38,0.3) 0%, transparent 65%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(217,31,38,0.5), transparent)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="section-eyebrow mb-5 fade-up-element">Let's Build</p>
          <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl mb-6 fade-up-element" style={{ transitionDelay: '0.1s' }}>
            Ready to upgrade your build?
          </h2>
          <p className="text-soft-grey text-lg mb-10 fade-up-element" style={{ transitionDelay: '0.2s' }}>
            Let's talk about the right setup for your project.
          </p>
          <div className="flex flex-wrap justify-center gap-4 fade-up-element" style={{ transitionDelay: '0.3s' }}>
            <Link to="/kontakti" className="btn-primary">
              Contact Us <ArrowRight size={16} />
            </Link>
            <Link to="/produkti" className="btn-secondary">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
