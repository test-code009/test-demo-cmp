import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getProducts, getCategories, urlFor } from '../lib/sanity';
import { useLanguage } from '../context/LanguageContext';
import t from '../lib/translations';

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

function ProductCard({ product, delay = 0 }) {
  let imageUrl = product.localImage || null;
  try {
    if (product.mainImage?.asset) {
      imageUrl = urlFor(product.mainImage).width(900).height(600).fit('max').quality(92).url();
    }
  } catch (e) { /* silent */ }

  const { lang } = useLanguage();
  const tr = t[lang];

  const price = product.price
    ? (typeof product.price === 'number'
        ? `${product.price} €`
        : product.price.toString().includes('€') ? product.price : `${product.price} €`)
    : null;

  return (
    <Link
      to={product.slug ? `/produkti/${product.slug}` : '/kontakti'}
      className="group flex flex-col overflow-hidden"
      style={{
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
          <img src={imageUrl} alt={product.title}
            className="w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ display: 'block', maxHeight: '260px' }} />
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
      <div className="flex items-center justify-between gap-4 px-4 py-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex-1 min-w-0">
          <h3 className="text-text-white font-display font-semibold text-base leading-snug truncate">{product.title}</h3>
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

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { lang } = useLanguage();
  const tr = t[lang];

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
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.title?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q)
      );
    }
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
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-40 md:pt-44 w-full">
          <p className="section-eyebrow mb-4 fade-up-element">{tr.products_eyebrow}</p>
          <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl mb-4 fade-up-element" style={{ transitionDelay: '0.1s' }}>
            {tr.products_title}
          </h1>
          <p className="text-soft-grey text-lg max-w-xl fade-up-element" style={{ transitionDelay: '0.2s' }}>
            {tr.products_desc}
          </p>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────────────────── */}
      {(categories.length > 0 || true) && (
        <div className="sticky top-0 z-30 py-4 px-6" style={{ background: 'rgba(6,6,6,0.92)', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
          <div className="max-w-7xl mx-auto flex items-center gap-3 flex-wrap">
            {searchQuery && (
              <div className="flex items-center gap-2 text-xs px-4 py-2 rounded-full mr-2"
                style={{ background: 'rgba(217,31,38,0.12)', border: '1px solid rgba(217,31,38,0.3)', color: '#FF3B30' }}>
                <span>"{searchQuery}"</span>
                <button onClick={() => setSearchParams({})} className="hover:text-white transition-colors">
                  <X size={11} />
                </button>
              </div>
            )}
            <button
              onClick={() => { setActiveCategory('all'); setShowFeaturedOnly(false); }}
              className="text-xs uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background: activeCategory === 'all' && !showFeaturedOnly ? 'rgba(217,31,38,0.15)' : 'rgba(255,255,255,0.05)',
                border: activeCategory === 'all' && !showFeaturedOnly ? '1px solid rgba(217,31,38,0.35)' : '1px solid rgba(255,255,255,0.1)',
                color: activeCategory === 'all' && !showFeaturedOnly ? '#FF3B30' : '#A7A7A7',
              }}
            >
              {tr.products_all}
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
          </div>
        </div>
      )}

      {/* ── Product Grid ─────────────────────────────────────────────── */}
      <section className="py-20 bg-base-black">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center py-40">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-primary-red/30 border-t-primary-red animate-spin" />
                <p className="text-soft-grey/50 text-sm uppercase tracking-widest">{tr.products_title}...</p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-40">
              <p className="text-soft-grey/40 text-sm uppercase tracking-widest mb-3">{tr.products_not_found}</p>
              <p className="text-soft-grey/25 text-xs">{tr.products_not_found_sub}</p>
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
            <p className="section-eyebrow mb-4 fade-up-element">{tr.how_eyebrow}</p>
            <h2 className="section-title text-3xl fade-up-element" style={{ transitionDelay: '0.1s' }}>
              {tr.how_title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tr.how_steps.map((s, i) => (
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
              {tr.how_cta} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
