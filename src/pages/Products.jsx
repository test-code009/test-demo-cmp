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
      imageUrl = urlFor(product.mainImage).width(600).height(440).fit('crop').url();
    }
  } catch (e) {
    console.warn('[ProductCard] image error:', e);
  }

  return (
    <Link
      to={product.slug ? `/produkti/${product.slug}` : '/kontakti'}
      className="fade-up-element flex flex-col rounded-2xl overflow-hidden transition-all duration-300 group"
      style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
      onMouseEnter={e => {
        e.currentTarget.style.border = '1px solid rgba(217,31,38,0.35)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '220px', background: '#0d0d0d' }}>
        {imageUrl ? (
          <img src={imageUrl} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-soft-grey/20 text-xs uppercase tracking-widest">No image</p>
          </div>
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.6) 0%, transparent 50%)' }} />
        {product.featured && (
          <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(217,31,38,0.15)', border: '1px solid rgba(217,31,38,0.3)', color: '#FF3B30' }}>
            Featured
          </span>
        )}
        {product.category && !product.featured && (
          <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: '#A7A7A7' }}>
            {product.category}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        {product.category && (
          <p className="text-soft-grey/45 text-xs uppercase tracking-widest">{product.category}</p>
        )}
        <h3 className="text-text-white font-display font-bold text-base leading-snug">{product.title}</h3>
        {product.shortDescription && (
          <p className="text-soft-grey/60 text-sm leading-relaxed line-clamp-2">{product.shortDescription}</p>
        )}
        <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {product.price ? (
            <span className="text-primary-red font-bold text-lg">{product.price}</span>
          ) : (
            <span className="text-soft-grey/30 text-sm">Enquire for price</span>
          )}
          <span className="flex items-center gap-1.5 text-soft-grey/50 text-xs uppercase tracking-widest group-hover:text-primary-red transition-colors">
            View more <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Products() {
  useScrollReveal();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

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
            <div className="mb-6 px-4 py-3 rounded-xl text-xs font-mono" style={{ background: 'rgba(217,31,38,0.08)', border: '1px solid rgba(217,31,38,0.2)', color: '#FF3B30' }}>
              Sanity fetch error: {fetchError}
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-primary-red/30 border-t-primary-red animate-spin" />
                <p className="text-soft-grey/50 text-sm uppercase tracking-widest">Loading products</p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-soft-grey/40 text-sm uppercase tracking-widest">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product, i) => (
                <div key={product._id} style={{ transitionDelay: `${i * 0.08}s` }}>
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
