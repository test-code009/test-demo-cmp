import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, X, ChevronDown } from 'lucide-react';
import { getProducts, getCategories, urlFor } from '../lib/sanity';
import { useLanguage } from '../context/LanguageContext';
import t from '../lib/translations';

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
    shortDescription: 'Fully restored and reinforced front subframe.',
    mainImage: null,
    _isFallback: true,
    localImage: '/product-subframe.jpeg',
  },
];

function ProductCard({ product }) {
  let imageUrl = product.localImage || null;
  try {
    if (product.mainImage?.asset) {
      imageUrl = urlFor(product.mainImage).format("webp").width(900).height(600).fit('max').quality(92).url();
    }
  } catch (e) { /* silent */ }

  const { lang } = useLanguage();
  const tr = t[lang];

  const title = lang === 'en' && product.titleEn ? product.titleEn : (product.titleLv || product.title || '');

  const price = product.price
    ? (typeof product.price === 'number'
        ? `${product.price} €`
        : product.price.toString().includes('€') ? product.price : `${product.price} €`)
    : null;

  const href = product.slug ? `/produkti/${product.slug}` : '/kontakti';

  const handleClick = (e) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group flex flex-col overflow-hidden"
      style={{
        transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0',
        textDecoration: 'none',
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
      <div className="overflow-hidden" style={{ background: '#111111' }}>
        {imageUrl ? (
          <img loading="lazy" decoding="async" src={imageUrl} alt={title}
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
      <div className="flex items-center justify-between gap-4 px-4 py-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex-1 min-w-0">
          <h3 className="text-text-white font-display font-semibold text-base leading-snug truncate">
            {title}
          </h3>
          {price ? (
            <p className="text-soft-grey/60 text-sm mt-0.5">{price}</p>
          ) : (
            <p className="text-soft-grey/40 text-xs mt-0.5 uppercase tracking-widest">{tr.products_price_on_request}</p>
          )}
        </div>
        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 group-hover:bg-primary-red group-hover:border-primary-red"
          style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
          <ArrowRight size={13} className="text-soft-grey/70 group-hover:text-white transition-colors" />
        </div>
      </div>
    </a>
  );
}

function CategoryDropdown({ categories, activeCategory, onChange, tr, lang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // categories is array of {slug, titleLv, titleEn} objects
  const allOptions = [
    { value: 'all', label: tr.products_all },
    ...categories.map(c => ({
      value: c.slug || c,
      label: lang === 'en' && c.titleEn ? c.titleEn : (c.titleLv || c),
    })),
  ];
  const current = allOptions.find(o => o.value === activeCategory) || allOptions[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2.5 rounded-full transition-all duration-200"
        style={{
          background: activeCategory !== 'all' ? 'rgba(217,31,38,0.15)' : 'rgba(255,255,255,0.06)',
          border: activeCategory !== 'all' ? '1px solid rgba(217,31,38,0.35)' : '1px solid rgba(255,255,255,0.12)',
          color: activeCategory !== 'all' ? '#FF3B30' : '#A7A7A7',
          minWidth: '130px',
        }}
      >
        <span className="flex-1 text-left">{current.label}</span>
        <ChevronDown size={12} className="transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 rounded-xl overflow-hidden z-50"
          style={{
            background: '#111',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
            minWidth: '160px',
          }}>
          {allOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className="w-full text-left text-xs uppercase tracking-widest px-4 py-3 transition-colors duration-150"
              style={{
                background: activeCategory === opt.value ? 'rgba(217,31,38,0.12)' : 'transparent',
                color: activeCategory === opt.value ? '#FF3B30' : '#A7A7A7',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
              onMouseEnter={e => { if (activeCategory !== opt.value) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { if (activeCategory !== opt.value) e.currentTarget.style.background = 'transparent'; }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Products() {
  const [products, setProducts] = useState(fallbackProducts);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { lang } = useLanguage();
  const tr = t[lang];

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([prods, cats]) => {
        if (prods && prods.length) setProducts(prods);
        // Use categories from Sanity if available; otherwise build from product data
        if (cats && cats.length) {
          setCategories(cats);
          setActiveCategory(prev =>
            prev === 'all' || cats.some(c => c.slug === prev) ? prev : 'all'
          );
        } else if (prods && prods.length) {
          // Fallback: build unique category objects from product data
          const seen = new Set();
          const cleanCats = [];
          prods.forEach(p => {
            if (p.category && p.category.slug && !seen.has(p.category.slug)) {
              seen.add(p.category.slug);
              cleanCats.push(p.category);
            }
          });
          setCategories(cleanCats);
          setActiveCategory(prev =>
            prev === 'all' || cleanCats.some(c => c.slug === prev) ? prev : 'all'
          );
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(p => {
    // category is now an object {slug, titleLv, titleEn} from Sanity
    const catSlug = p.category?.slug || p.category;
    if (activeCategory !== 'all' && catSlug !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.titleLv?.toLowerCase().includes(q) ||
        p.titleEn?.toLowerCase().includes(q) ||
        p.title?.toLowerCase().includes(q) ||
        p.category?.titleLv?.toLowerCase().includes(q) ||
        p.category?.titleEn?.toLowerCase().includes(q) ||
        p.shortDescriptionLv?.toLowerCase().includes(q) ||
        p.shortDescriptionEn?.toLowerCase().includes(q)
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
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-20 md:pt-44 w-full">
          <p className="section-eyebrow mb-4">{tr.products_eyebrow}</p>
          <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl mb-4">
            {tr.products_title}
          </h1>
          <p className="text-soft-grey text-lg max-w-xl">
            {tr.products_desc}
          </p>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 py-3 px-6" style={{ background: 'rgba(6,6,6,0.92)', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <CategoryDropdown
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
            tr={tr}
            lang={lang}
          />
          {searchQuery && (
            <div className="flex items-center gap-2 text-xs px-4 py-2 rounded-full"
              style={{ background: 'rgba(217,31,38,0.12)', border: '1px solid rgba(217,31,38,0.3)', color: '#FF3B30' }}>
              <span>"{searchQuery}"</span>
              <button onClick={() => setSearchParams({})} className="hover:text-white transition-colors">
                <X size={11} />
              </button>
            </div>
          )}
          {loading && (
            <div className="w-4 h-4 rounded-full border border-primary-red/30 border-t-primary-red animate-spin ml-2" />
          )}
        </div>
      </div>

      {/* ── Product Grid ─────────────────────────────────────────────── */}
      <section className="py-20 bg-base-black">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-40">
              <p className="text-soft-grey/40 text-sm uppercase tracking-widest mb-3">{tr.products_not_found}</p>
              <p className="text-soft-grey/25 text-xs">{tr.products_not_found_sub}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((product) => (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Partners ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-eyebrow mb-10 text-center">{tr.partners_eyebrow}</p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
            <a
              href="https://kosko.lv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <img src="/partner-kosko.png" alt="Kosko" className="h-20 w-auto object-contain" />
            </a>
            <a
              href="https://zobensracing.lv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300"
            >
              <img src="/partner-zobens.jpeg" alt="Zobens Racing Sport" className="h-12 w-auto object-contain rounded" style={{ filter: 'invert(1)' }} />
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
