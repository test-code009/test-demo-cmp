import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Send } from 'lucide-react';
import { getProductBySlug, urlFor } from '../lib/sanity';
import { useLanguage } from '../context/LanguageContext';
import t from '../lib/translations';

function OrderForm({ productTitle, variantTitles, tr }) {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus('sending');
    try {
      const variantsPart = variantTitles && variantTitles.length > 0
        ? ` — ${variantTitles.join(', ')}`
        : '';
      const fullTitle = `${productTitle}${variantsPart}`;
      const subject = encodeURIComponent(`Pasūtījums: ${fullTitle}`);
      const body = encodeURIComponent(`Vārds: ${form.name}\nTālrunis: ${form.phone}\nProdukts: ${productTitle}${variantTitles && variantTitles.length > 0 ? `\nVarianti: ${variantTitles.join(', ')}` : ''}`);
      window.location.href = `mailto:info@cmp-performance.lv?subject=${subject}&body=${body}`;
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <div className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(217,31,38,0.12)', border: '1px solid rgba(217,31,38,0.3)' }}>
        <Check size={22} className="text-primary-red" />
      </div>
      <p className="text-text-white font-display font-semibold text-lg">{tr.detail_thanks}</p>
      <p className="text-soft-grey text-sm">{tr.detail_thanks_sub}</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-soft-grey/50 text-xs uppercase tracking-widest">{tr.detail_name}</label>
        <input type="text" name="name" value={form.name} onChange={handleChange}
          placeholder="Jānis Bērziņš" required
          className="w-full px-4 py-3 rounded-xl text-text-white text-sm outline-none transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F5F5' }}
          onFocus={e => { e.target.style.borderColor = 'rgba(217,31,38,0.5)'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-soft-grey/50 text-xs uppercase tracking-widest">{tr.detail_phone}</label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange}
          placeholder="+371 29147322" required
          className="w-full px-4 py-3 rounded-xl text-text-white text-sm outline-none transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F5F5' }}
          onFocus={e => { e.target.style.borderColor = 'rgba(217,31,38,0.5)'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
        />
      </div>
      <button type="submit" disabled={status === 'sending'} className="btn-primary justify-center mt-2"
        style={{ opacity: status === 'sending' ? 0.7 : 1 }}>
        <Send size={15} />
        {status === 'sending' ? tr.detail_sending : tr.detail_order}
      </button>
      {status === 'error' && (
        <p className="text-primary-red text-xs text-center">{tr.detail_error}</p>
      )}
    </form>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const { lang } = useLanguage();
  const tr = t[lang];


  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug)
      .then(data => { setProduct(data || null); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  // Reset variants + image when product changes
  useEffect(() => {
    setSelectedVariants([]);
    setActiveImg(0);
  }, [product]);

  if (loading) return (
    <main className="min-h-screen bg-base-black flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-primary-red/30 border-t-primary-red animate-spin" />
    </main>
  );

  if (!product) return (
    <main className="min-h-screen bg-base-black flex items-center justify-center">
      <div className="text-center">
        <p className="text-soft-grey/40 text-sm uppercase tracking-widest mb-6">{tr.detail_not_found}</p>
        <Link to="/produkti" className="btn-primary"><ArrowLeft size={15} /> {tr.detail_back}</Link>
      </div>
    </main>
  );

  const hasVariants = product.variants && product.variants.length > 0;
  // For display purposes use the last selected variant
  const lastSelected = selectedVariants.length > 0 ? selectedVariants[selectedVariants.length - 1] : null;
  const variant = hasVariants && lastSelected !== null ? product.variants[lastSelected] : null;

  // Build full image list: mainImage first, then galleryImages
  const productImages = [];
  try {
    if (product.mainImage?.asset) productImages.push(product.mainImage);
  } catch (e) { /* silent */ }
  if (product.galleryImages?.length) {
    product.galleryImages.forEach(img => { if (img?.asset) productImages.push(img); });
  }

  // When a variant is selected and has its own image, show it as the main image
  const displayImages = variant?.image?.asset ? [variant.image, ...productImages] : productImages;
  const clampedImg = Math.min(activeImg, displayImages.length - 1);

  const activeImageUrl = displayImages[clampedImg]
    ? urlFor(displayImages[clampedImg]).width(1200).height(900).fit('crop').quality(90).url()
    : null;

  const productTitle = lang === 'en' && product.titleEn ? product.titleEn : (product.titleLv || '');
  const variantTitles = hasVariants
    ? selectedVariants.map(i => {
        const v = product.variants[i];
        return lang === 'en' && v.titleEn ? v.titleEn : v.titleLv;
      })
    : [];

  const productDescription = lang === 'en' && product.shortDescriptionEn
    ? product.shortDescriptionEn
    : (product.shortDescriptionLv || null);
  const variantDescription = variant
    ? (lang === 'en' && variant.descriptionEn ? variant.descriptionEn : (variant.descriptionLv || null))
    : null;
  const displayDescription = variantDescription || productDescription;

  const categoryLabel = product.category
    ? (lang === 'en' && product.category.titleEn ? product.category.titleEn : (product.category.titleLv || ''))
    : null;

  // Price: sum selected variant prices, or product price
  const rawPrice = selectedVariants.length > 0
    ? selectedVariants.reduce((sum, i) => {
        const vp = product.variants?.[i]?.price;
        return sum + (vp != null ? Number(vp) : 0);
      }, 0) || product.price
    : product.price;
  const price = rawPrice != null
    ? (typeof rawPrice === 'number' ? `${rawPrice} €` : rawPrice.toString().includes('€') ? rawPrice : `${rawPrice} €`)
    : null;

  return (
    <main className="bg-base-black min-h-screen pt-[106px] md:pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Top: image left + info right ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* LEFT — main image + thumbnails */}
          <div className="flex flex-col gap-3">
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden relative"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(6px)',
                aspectRatio: '4/3',
              }}>
              {activeImageUrl ? (
                <img
                  src={activeImageUrl}
                  alt={variantTitle || productTitle}
                  loading="lazy" decoding="async"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #111, #0a0a0a)' }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(6,6,6,0.6), transparent)' }} />
            </div>

            {/* Thumbnails — only if >1 image */}
            {displayImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {displayImages.map((img, i) => {
                  const thumbUrl = urlFor(img).width(200).height(150).fit('crop').quality(80).url();
                  return (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className="flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200"
                      style={{
                        width: '72px', height: '54px',
                        border: i === clampedImg ? '2px solid #D91F26' : '2px solid rgba(255,255,255,0.08)',
                        opacity: i === clampedImg ? 1 : 0.5,
                      }}
                      onMouseEnter={e => { if (i !== clampedImg) e.currentTarget.style.opacity = '0.8'; }}
                      onMouseLeave={e => { if (i !== clampedImg) e.currentTarget.style.opacity = '0.5'; }}
                    >
                      <img src={thumbUrl} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT — info + variants + form */}
          <div className="flex flex-col gap-5">

            {/* Category + title + price */}
            <div>
              {categoryLabel && (
                <p className="section-eyebrow mb-2">{categoryLabel}</p>
              )}
              <h1 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-3 leading-tight">
                {productTitle}
              </h1>
              <p className="text-primary-red font-display font-bold text-2xl">
                {price || ''}
              </p>
            </div>

            {/* Variants selector */}
            {hasVariants && (
              <div className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-soft-grey/45 text-xs uppercase tracking-widest mb-4">{tr.detail_variants}</p>
                <div className="flex flex-col gap-3">
                  {product.variants.map((v, i) => {
                    const vTitle = lang === 'en' && v.titleEn ? v.titleEn : v.titleLv;
                    const vPrice = v.price != null ? `${v.price} €` : null;
                    const vThumb = v.image?.asset ? urlFor(v.image).width(120).height(90).fit('crop').quality(75).url() : null;
                    const isActive = selectedVariants.includes(i);

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedVariants(prev =>
                            prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
                          );
                          setActiveImg(0);
                        }}
                        className="flex items-center gap-4 w-full text-left rounded-xl px-4 py-3 transition-all duration-200"
                        style={{
                          background: isActive ? 'rgba(217,31,38,0.08)' : 'rgba(255,255,255,0.03)',
                          border: isActive ? '1.5px solid rgba(217,31,38,0.45)' : '1.5px solid rgba(255,255,255,0.07)',
                        }}
                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                      >
                        {/* Thumbnail */}
                        {vThumb ? (
                          <img src={vThumb} alt={vTitle}
                            className="flex-shrink-0 rounded-lg object-cover"
                            style={{ width: '52px', height: '40px' }} />
                        ) : (
                          <div className="flex-shrink-0 rounded-lg flex items-center justify-center"
                            style={{ width: '52px', height: '40px', background: 'rgba(255,255,255,0.05)' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21 15 16 10 5 21"/>
                            </svg>
                          </div>
                        )}

                        {/* Title + description */}
                        <div className="flex-1 min-w-0">
                          <p className={`font-display font-semibold text-sm leading-snug ${isActive ? 'text-white' : 'text-text-white/80'}`}>
                            {vTitle}
                          </p>
                          {v[lang === 'en' ? 'descriptionEn' : 'descriptionLv'] && (
                            <p className="text-soft-grey/50 text-xs mt-0.5 leading-snug line-clamp-1">
                              {v[lang === 'en' ? 'descriptionEn' : 'descriptionLv']}
                            </p>
                          )}
                        </div>

                        {/* Price + check */}
                        <div className="flex-shrink-0 flex flex-col items-end gap-1">
                          {vPrice && (
                            <span className={`font-display font-bold text-sm ${isActive ? 'text-primary-red' : 'text-soft-grey/60'}`}>
                              {vPrice}
                            </span>
                          )}
                          <div className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200"
                            style={{
                              background: isActive ? '#D91F26' : 'transparent',
                              border: isActive ? '1.5px solid #D91F26' : '1.5px solid rgba(255,255,255,0.2)',
                            }}>
                            {isActive && <Check size={11} className="text-white" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Description card */}
            {displayDescription && (
              <div className="rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-soft-grey/45 text-xs uppercase tracking-widest mb-3">{tr.detail_description}</p>
                <p className="text-soft-grey text-sm leading-relaxed">{displayDescription}</p>
              </div>
            )}

            {/* Specs card */}
            {product.specs && product.specs.length > 0 && (
              <div className="rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-soft-grey/45 text-xs uppercase tracking-widest mb-4">{tr.detail_specs}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-soft-grey/80">
                      <Check size={13} className="text-primary-red flex-shrink-0 mt-0.5" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Order form card */}
            <div className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)' }}>
              <p className="text-text-white font-display font-bold text-xl mb-1">{tr.detail_contact_title}</p>
              <p className="text-soft-grey/45 text-sm mb-5">{tr.detail_contact_sub}</p>
              <OrderForm productTitle={productTitle} variantTitles={variantTitles} tr={tr} />
            </div>

          </div>
        </div>

        {/* ── Back link ─────────────────────────────────────────── */}
        <div className="mt-12">
          <Link to="/produkti"
            className="inline-flex items-center gap-2 text-soft-grey/35 hover:text-soft-grey text-sm transition-colors">
            <ArrowLeft size={14} /> {tr.nav_products}
          </Link>
        </div>

      </div>
    </main>
  );
}
