import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getLatestProducts, getFeaturedProducts, urlFor } from '../lib/sanity';
import { useLanguage } from '../context/LanguageContext';
import t from '../lib/translations';

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
    <div className="hidden md:block absolute inset-y-0 left-0 w-3/4" style={{ background: 'linear-gradient(to right, rgba(6,6,6,0.88) 0%, rgba(6,6,6,0.50) 45%, transparent 100%)' }} />
    <div className="md:hidden absolute inset-0" style={{ background: 'rgba(6,6,6,0.45)' }} />
    <div className="absolute bottom-0 left-0 right-0 h-56" style={{ background: 'linear-gradient(to top, #060606 0%, transparent 100%)' }} />
    <div
      className="absolute bottom-0 right-0 w-[600px] h-[400px] opacity-25 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(217,31,38,0.35) 0%, transparent 70%)', transform: 'translate(10%, 20%)' }}
    />
  </div>
);

function ProductCard({ product, delay = 0 }) {
  const { lang } = useLanguage();
  const tr = t[lang];

  let imageUrl = product.localImage || null;
  try {
    if (product.mainImage?.asset) {
      imageUrl = urlFor(product.mainImage).width(900).height(600).fit('max').quality(92).url();
    }
  } catch (e) { /* ignore */ }

  const price = product.price
    ? (typeof product.price === 'number'
        ? `${product.price} €`
        : product.price.toString().includes('€') ? product.price : `${product.price} €`)
    : null;

  return (
    <Link
      to={product.slug ? `/produkti/${product.slug}` : '/produkti'}
      className="group fade-up-element flex flex-col overflow-hidden"
      style={{
        transitionDelay: `${delay}s`,
        transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.6)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
      }}
    >
      {/* Image */}
      <div className="overflow-hidden" style={{ background: '#111111' }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ display: 'block', maxHeight: '260px' }}
          />
        ) : (
          <div className="flex items-center justify-center" style={{ height: '220px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex items-center justify-between gap-4 px-4 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex-1 min-w-0">
          <h3 className="text-text-white font-display font-semibold text-base leading-snug truncate">
            {lang === 'en' && product.titleEn ? product.titleEn : product.title}
          </h3>
          {price ? (
            <p className="text-soft-grey/60 text-sm mt-0.5">{price}</p>
          ) : (
            <p className="text-soft-grey/40 text-xs mt-0.5 uppercase tracking-widest">{tr.products_price_on_request}</p>
          )}
        </div>
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 group-hover:bg-primary-red group-hover:border-primary-red"
          style={{ border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <ArrowRight size={13} className="text-soft-grey/70 group-hover:text-white transition-colors" />
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [newProducts, setNewProducts] = useState(homeFallbackProducts);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { lang } = useLanguage();
  const tr = t[lang];

  useScrollReveal([newProducts, featuredProducts]);

  useEffect(() => {
    getLatestProducts(3)
      .then(data => { if (data && data.length) setNewProducts(data); })
      .catch(() => {});
    getFeaturedProducts()
      .then(data => { if (data && data.length) setFeaturedProducts(data); })
      .catch(() => {});
  }, []);

  return (
    <main style={{ background: '#0d0d0d' }}>

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: '100svh', minHeight: '600px' }}>
        <HeroBackground />
        {/* Mobile: text bottom-right */}
        <div className="md:hidden absolute bottom-24 right-0 left-0 pointer-events-none px-6" style={{ zIndex: 5 }}>
          <div className="flex flex-col items-end text-right">
            <p className="text-white font-display font-bold leading-tight mb-2 whitespace-pre-line"
              style={{ fontSize: 'clamp(1.5rem, 7vw, 2rem)', textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}>
              {tr.home_hero_mobile_title}
            </p>
            <div className="w-8 h-px mb-2" style={{ background: '#D91F26' }} />
            <p className="text-white/55 text-xs uppercase tracking-[0.2em]" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>{tr.home_hero_mobile_sub}</p>
          </div>
        </div>
        {/* Ticker */}
        <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden"
          style={{
            background: 'rgba(6,6,6,0.75)',
            backdropFilter: 'blur(14px)',
            borderTop: '1px solid rgba(217,31,38,0.18)',
          }}>
          <div className="flex items-center py-3" style={{ animation: 'marquee 22s linear infinite' }}>
            {[...Array(3)].map((_, rep) => (
              <div key={rep} className="flex items-center flex-shrink-0">
                {tr.home_ticker.map((kw, i) => (
                  <span key={i} className="flex items-center gap-5 px-6">
                    <span className="text-text-white/75 text-xs font-semibold uppercase tracking-[0.18em] whitespace-nowrap">{kw}</span>
                    <span className="w-1 h-1 rounded-full bg-primary-red flex-shrink-0" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Kas ir CMP ───────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28" style={{
        background: '#141414',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 0 60px rgba(0,0,0,0.5)',
      }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(217,31,38,0.06) 0%, transparent 65%)',
        }} />
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-text-white font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-8 fade-up-element">
            {tr.home_cmp_q}{' '}
            <span className="text-gradient-red italic">
              {tr.home_cmp_name}
            </span>
            ?
          </h2>
          <p className="text-soft-grey text-base leading-relaxed mb-10 fade-up-element" style={{ transitionDelay: '0.1s' }}>
            {tr.home_cmp_desc}
          </p>
          <div className="fade-up-element" style={{ transitionDelay: '0.18s' }}>
            <Link
              to="/par-mums"
              className="inline-flex items-center gap-2 text-soft-grey/60 hover:text-primary-red transition-colors duration-200 text-sm font-medium group"
            >
              {tr.home_read_more}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center group-hover:bg-primary-red transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <ArrowRight size={11} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── New in Store ─────────────────────────────────────────────── */}
      <section id="new-in-store" className="relative py-16" style={{ background: '#0d0d0d' }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section heading */}
          <div className="flex items-end justify-between mb-10 fade-up-element">
            <h2 className="section-title text-4xl sm:text-5xl font-display font-bold">
              {tr.home_new_in_store}
            </h2>
            <Link to="/produkti"
              className="flex items-center gap-2 text-sm font-semibold text-text-white/80 hover:text-primary-red transition-colors duration-200 group pb-1"
            >
              {tr.home_view_all}
              <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 group-hover:bg-primary-red"
                style={{ border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.05)' }}>
                <ArrowRight size={12} />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {newProducts.map((product, i) => (
              <ProductCard key={product._id} product={product} delay={0.1 + i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Most Popular (only if featured products exist) ───────────── */}
      {featuredProducts.length > 0 && (
        <>
          <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <section className="relative py-16" style={{ background: '#0d0d0d' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(217,31,38,0.04) 0%, transparent 65%)' }} />
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="section-eyebrow mb-3 fade-up-element">{tr.home_top_picks}</p>
                  <h2 className="section-title text-3xl sm:text-4xl fade-up-element" style={{ transitionDelay: '0.1s' }}>
                    {tr.home_most_popular}
                  </h2>
                </div>
                <Link to="/produkti"
                  className="hidden sm:flex items-center gap-2 text-soft-grey/50 hover:text-primary-red transition-colors text-sm font-medium fade-up-element"
                  style={{ transitionDelay: '0.2s' }}>
                  {tr.home_view_all} <ArrowRight size={13} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredProducts.map((product, i) => (
                  <ProductCard key={product._id} product={product} delay={0.1 + i * 0.08} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ─── CTA Banner ───────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #111111 0%, #160404 50%, #0d0d0d 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(217,31,38,0.12) 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(217,31,38,0.3), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(217,31,38,0.1), transparent)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="section-eyebrow mb-5 fade-up-element">{tr.home_cta_eyebrow}</p>
          <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl mb-6 fade-up-element" style={{ transitionDelay: '0.1s' }}>
            {tr.home_cta_title}
          </h2>
          <p className="text-soft-grey text-lg mb-10 fade-up-element" style={{ transitionDelay: '0.2s' }}>
            {tr.home_cta_desc}
          </p>
          <div className="flex flex-wrap justify-center gap-4 fade-up-element" style={{ transitionDelay: '0.3s' }}>
            <Link to="/kontakti" className="btn-primary">
              {tr.home_get_in_touch} <ArrowRight size={16} />
            </Link>
            <Link to="/produkti" className="btn-secondary">
              {tr.home_explore}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
