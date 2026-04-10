import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import BackButton from '../components/BackButton';
import { getProducts, getCategories, urlFor } from '../lib/sanity';

// Fallback static products shown while Sanity loads or if empty
const fallbackProducts = [
  {
    _id: 'suspension-brake',
    slug: null,
    category: 'Suspension & Brake',
    title: 'Suspension + Brake Assembly',
    price: '€ 1,249',
    shortDescription: 'Fully integrated suspension and brake assembly engineered for the Golf Mk2.',
    mainImage: null,
    _isFallback: true,
    localImage: '/product-suspension-brake.jpeg',
  },
  {
    _id: 'subframe',
    slug: null,
    category: 'Chassis',
    title: 'Front Subframe',
    price: '€ 849',
    shortDescription: 'Fully restored and reinforced front subframe. Powder-coated gloss black with performance bushings.',
    mainImage: null,
    _isFallback: true,
    localImage: '/product-subframe.jpeg',
  },
];

function ProductCard({ product }) {
  let imageUrl = product.localImage || null;
  try {
    if (product.mainImage?.asset) {
      imageUrl = urlFor(product.mainImage).width(900).height(600).fit('crop').quality(90).url();
    }
  } catch (e) { /* silent */ }

  const altText = product.imageAlt || product.title || 'Product image';

  const formatPrice = (p) => {
    if (!p) return null;
    const str = String(p).trim();
    if (str.startsWith('€') || str.startsWith('$') || str.includes('€')) return str;
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? str : `€ ${num.toLocaleString('de-DE')}`;
  };

  const formattedPrice = formatPrice(product.price);

  return (
    <Link
      to={product.slug ? `/produkti/${product.slug}` : '/kontakti'}
      className="group flex flex-col rounded-2xl overflow-hidden h-full"
      style={{
        background: 'linear-gradient(160deg, #161616 0%, #111111 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(217,31,38,0.3)';
        e.currentTarget.style.borderColor = 'rgba(217,31,38,0.35)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
      }}
    >
      {/* ── Image ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10', background: '#0a0a0a' }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          /* Premium placeholder */
          <div className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #171717 100%)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <span className="text-soft-grey/20 text-[10px] uppercase tracking-widest">No image</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.1) 50%, transparent 100%)' }} />

        {/* Badges row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {product.featured ? (
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(217,31,38,0.22)', border: '1px solid rgba(217,31,38,0.45)', color: '#FF3B30' }}>
              ★ Featured
            </span>
          ) : product.category ? (
            <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.1)', color: '#A7A7A7', backdropFilter: 'blur(6px)' }}>
              {product.category}
            </span>
          ) : <span />}

          {/* Arrow icon — appears on hover */}
          <span className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(217,31,38,0.85)', backdropFilter: 'blur(6px)' }}>
            <ArrowRight size={13} className="text-white" />
          </span>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-2">
        {product.category && (
          <p className="text-soft-grey/35 text-[10px] font-medium uppercase tracking-[0.15em]">
            {product.category}
          </p>
        )}

        <h3 className="text-text-white font-display font-bold text-[17px] leading-snug">
          {product.title}
        </h3>

        {product.shortDescription && (
          <p className="text-soft-grey/55 text-sm leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Divider + Price row */}
        <div className="flex items-center justify-between mt-auto pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '12px' }}>
          <div>
            {formattedPrice ? (
              <>
                <p className="text-soft-grey/35 text-[9px] uppercase tracking-widest mb-0.5">Price</p>
                <p className="text-primary-red font-display font-bold text-2xl leading-none">{formattedPrice}</p>
              </>
            ) : (
              <p className="text-soft-grey/35 text-sm">Contact for price</p>
            )}
          </div>
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-soft-grey/35 group-hover:text-primary-red transition-colors duration-200 font-medium">
            View <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useScrollReveal([products, loading]);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([prods, cats]) => {
        console.log('[Sanity] products received:', prods?.length, prods);
        console.log('[Sanity] categories received:', cats);
        setProducts(prods && prods.length ? prods : fallbackProducts);
        setCategories(cats ? cats.filter(Boolean) : []);
        setFetchError(null);
      })
      .catch((err) => {
        console.error('[Sanity] fetch error:', err?.message || err);
        setFetchError(err?.message || 'Unknown error');
        setProducts(fallbackProducts);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(p => {
    if (showFeaturedOnly && !p.featured) return false;
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    return true;
  });

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0606 0%, #130808 40%, #0a0a0a 100%)' }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(217,31,38,0.5) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-48"
            style={{ background: 'linear-gradient(to top, #060606, transparent)' }} />
        </div>
        <BackButton />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-40 md:pt-44 w-full">
          <p className="section-eyebrow mb-4 fade-up-element">Our Range</p>
          <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl mb-4 fade-up-element" style={{ transitionDelay: '0.1s' }}>
            Products
          </h1>
          <p className="text-soft-grey text-lg max-w-xl fade-up-element" style={{ transitionDelay: '0.2s' }}>
            Purpose-built upgrade solutions for Volkswagen Golf Mk2 enthusiasts.
          </p>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────────────────── */}
      {(categories.length > 0 || true) && (
        <div className="sticky top-0 z-30 py-4 px-6" style={{ background: 'rgba(6,6,6,0.92)', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
          <div className="max-w-7xl mx-auto flex items-center gap-3 flex-wrap">
            <button
              onClick={() => { setActiveCategory('all'); setShowFeaturedOnly(false); }}
              className="text-xs uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background: activeCategory === 'all' && !showFeaturedOnly ? 'rgba(217,31,38,0.15)' : 'rgba(255,255,255,0.05)',
                border: activeCategory === 'all' && !showFeaturedOnly ? '1px solid rgba(217,31,38,0.35)' : '1px solid rgba(255,255,255,0.1)',
                color: activeCategory === 'all' && !showFeaturedOnly ? '#FF3B30' : '#A7A7A7',
              }}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setShowFeaturedOnly(false); }}
                className="text-xs uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  background: activeCategory === cat ? 'rgba(217,31,38,0.15)' : 'rgba(255,255,255,0.05)',
                  border: activeCategory === cat ? '1px solid rgba(217,31,38,0.35)' : '1px solid rgba(255,255,255,0.1)',
                  color: activeCategory === cat ? '#FF3B30' : '#A7A7A7',
                }}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => { setShowFeaturedOnly(f => !f); setActiveCategory('all'); }}
              className="text-xs uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-200 ml-auto"
              style={{
                background: showFeaturedOnly ? 'rgba(217,31,38,0.15)' : 'rgba(255,255,255,0.05)',
                border: showFeaturedOnly ? '1px solid rgba(217,31,38,0.35)' : '1px solid rgba(255,255,255,0.1)',
                color: showFeaturedOnly ? '#FF3B30' : '#A7A7A7',
              }}
            >
              Featured Only
            </button>
          </div>
        </div>
      )}

      {/* ── Product Grid ─────────────────────────────────────────────── */}
      <section className="py-20 bg-base-black">
        <div className="max-w-7xl mx-auto px-6">
          {fetchError && (
            <div className="mb-8 px-4 py-3 rounded-xl text-xs font-mono" style={{ background: 'rgba(217,31,38,0.08)', border: '1px solid rgba(217,31,38,0.2)', color: '#FF3B30' }}>
              Sanity fetch error: {fetchError}
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-40">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-primary-red/30 border-t-primary-red animate-spin" />
                <p className="text-soft-grey/50 text-sm uppercase tracking-widest">Loading products</p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-40">
              <p className="text-soft-grey/40 text-sm uppercase tracking-widest mb-3">No products found</p>
              <p className="text-soft-grey/25 text-xs">Try a different filter or check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((product, i) => (
                <div key={product._id} className="fade-up-element" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-4 fade-up-element">How It Works</p>
            <h2 className="section-title text-3xl fade-up-element" style={{ transitionDelay: '0.1s' }}>
              Simple. Clear. Confident.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Choose your setup', text: 'Browse our products and identify the upgrade direction that fits your build goals.' },
              { step: '02', title: 'Confirm fitment', text: 'We confirm compatibility and fitment specifics for your exact Mk2 variant before anything moves forward.' },
              { step: '03', title: 'Upgrade with confidence', text: 'Receive your upgrade with clear installation guidance and the assurance of a purpose-built solution.' },
            ].map((s, i) => (
              <div key={s.step} className="glass-card p-8 text-center fade-up-element" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'rgba(217,31,38,0.1)', border: '1px solid rgba(217,31,38,0.25)' }}>
                  <span className="text-primary-red font-display font-bold text-sm">{s.step}</span>
                </div>
                <h3 className="text-text-white font-display font-semibold text-base mb-3">{s.title}</h3>
                <p className="text-soft-grey text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 fade-up-element">
            <Link to="/kontakti" className="btn-primary">
              Start the Conversation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
