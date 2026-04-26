import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getLatestProducts, getFeaturedProducts, urlFor } from '../lib/sanity';

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

function ProductCard({ product, delay = 0 }) {
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
      className="group fade-up-element flex flex-col rounded-2xl overflow-hidden"
      style={{
        transitionDelay: `${delay}s`,
        border: '1px solid rgba(255,255,255,0.14)',
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        background: '#1a1a1a',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(217,31,38,0.55)';
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(217,31,38,0.15), 0 1px 0 rgba(255,255,255,0.06) inset';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset';
      }}
    >
      {/* Image — full picture, no crop */}
      <div className="overflow-hidden" style={{ background: '#111111' }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{ display: 'block', maxHeight: '280px' }}
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

      {/* Bottom info panel */}
      <div className="flex items-center justify-between gap-4 px-5 py-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: '#1a1a1a' }}>
        <div className="flex-1 min-w-0">
          {product.category && (
            <p className="text-soft-grey/40 text-[10px] uppercase tracking-widest mb-1">{product.category}</p>
          )}
          <h3 className="text-text-white font-display font-bold text-base leading-snug truncate">{product.title}</h3>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {price ? (
            <span className="text-primary-red font-display font-bold text-lg">{price}</span>
          ) : (
            <span className="text-soft-grey/40 text-xs uppercase tracking-widest">Pēc piepras.</span>
          )}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:bg-primary-red"
            style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}
          >
            <ArrowRight size={13} className="text-soft-grey group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [newProducts, setNewProducts] = useState(homeFallbackProducts);
  const [featuredProducts, setFeaturedProducts] = useState([]);

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
                {['Stop Harder', 'Drive Sharper', 'Built for Mk2', 'Engineered Performance', 'Clean & Purposeful', 'Upgrade Everything'].map((kw, i) => (
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
            Kas ir{' '}
            <span style={{ borderBottom: '3px solid #D91F26', paddingBottom: '4px' }}>
              Classic Motion Performance
            </span>
            ?
          </h2>
          <p className="text-soft-grey text-base leading-relaxed mb-10 fade-up-element" style={{ transitionDelay: '0.1s' }}>
            Classic Motion Performance ir Latvijā dibināts zīmols, kas specializējas VW Golf Mk2 bremžu un balstiekārtas jaunināšanā. Mēs piedāvājam precīzi izstrādātus risinājumus entuziastiem, kuriem svarīga katras detaļas kvalitāte un veiktspēja.
          </p>
          <div className="fade-up-element" style={{ transitionDelay: '0.18s' }}>
            <Link
              to="/par-mums"
              className="inline-flex items-center gap-2 text-soft-grey/60 hover:text-primary-red transition-colors duration-200 text-sm font-medium group"
            >
              Lasīt vairāk
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
          {/* Section heading — right aligned with red line extending off screen */}
          <div className="flex flex-col items-end mb-10 overflow-hidden fade-up-element">
            <p className="section-eyebrow mb-2 text-right">Fresh Arrivals</p>
            <div className="flex items-center gap-0 w-full justify-end">
              <h2 className="section-title text-4xl sm:text-5xl font-display font-bold whitespace-nowrap">
                New in Store
              </h2>
            </div>
            {/* Red underline — starts at right edge, fades left to ~50% screen */}
            <div className="mt-3" style={{ width: 'calc(100% + 3rem)', marginRight: '-3rem' }}>
              <div style={{
                height: '2px',
                width: '100%',
                background: 'linear-gradient(to left, #D91F26 0%, #D91F26 20%, rgba(217,31,38,0.5) 45%, transparent 100%)',
              }} />
            </div>
            <Link to="/produkti"
              className="mt-4 flex items-center gap-2 text-soft-grey/50 hover:text-primary-red transition-colors text-sm font-medium group"
              style={{ transitionDelay: '0.2s' }}>
              View all
              <div className="w-6 h-6 rounded-full flex items-center justify-center group-hover:bg-primary-red transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                <ArrowRight size={11} />
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
                  <p className="section-eyebrow mb-3 fade-up-element">Top Picks</p>
                  <h2 className="section-title text-3xl sm:text-4xl fade-up-element" style={{ transitionDelay: '0.1s' }}>
                    Most Popular
                  </h2>
                </div>
                <Link to="/produkti"
                  className="hidden sm:flex items-center gap-2 text-soft-grey/50 hover:text-primary-red transition-colors text-sm font-medium fade-up-element"
                  style={{ transitionDelay: '0.2s' }}>
                  View all <ArrowRight size={13} />
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
