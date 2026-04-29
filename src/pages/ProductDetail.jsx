import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Send } from 'lucide-react';
import { getProductBySlug, urlFor } from '../lib/sanity';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import t from '../lib/translations';

function OrderForm({ productTitle, tr }) {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus('sending');
    try {
      const subject = encodeURIComponent(`Pasūtījums: ${productTitle}`);
      const body = encodeURIComponent(`Vārds: ${form.name}\nTālrunis: ${form.phone}\nProdukts: ${productTitle}`);
      window.location.href = `mailto:info@classicmotionperformance.com?subject=${subject}&body=${body}`;
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
          placeholder="+371 2X XXX XXX" required
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
  const { lang } = useLanguage();
  const tr = t[lang];

  useScrollReveal([product]);

  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug)
      .then(data => { setProduct(data || null); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

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

  // Build full image list: mainImage first, then extras from images[]
  const allImages = [];
  try {
    if (product.mainImage?.asset) allImages.push(product.mainImage);
  } catch (e) { /* silent */ }
  if (product.images?.length) {
    product.images.forEach(img => {
      if (img?.asset) allImages.push(img);
    });
  }

  const activeImageUrl = allImages[activeImg]
    ? urlFor(allImages[activeImg]).width(1200).height(900).fit('crop').quality(90).url()
    : null;

  const price = product.price
    ? (typeof product.price === 'number'
        ? `${product.price} €`
        : product.price.toString().includes('€') ? product.price : `${product.price} €`)
    : null;

  return (
    <main className="bg-base-black min-h-screen pt-20 md:pt-28 pb-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Top: image left + form right ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* LEFT — main image + thumbnails */}
          <div className="fade-up-element flex flex-col gap-3">
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
                  alt={allImages[activeImg]?.alt || product.title}
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
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => {
                  const thumbUrl = urlFor(img).width(200).height(150).fit('crop').quality(80).url();
                  return (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className="flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200"
                      style={{
                        width: '72px',
                        height: '54px',
                        border: i === activeImg
                          ? '2px solid #D91F26'
                          : '2px solid rgba(255,255,255,0.08)',
                        opacity: i === activeImg ? 1 : 0.5,
                      }}
                      onMouseEnter={e => { if (i !== activeImg) e.currentTarget.style.opacity = '0.8'; }}
                      onMouseLeave={e => { if (i !== activeImg) e.currentTarget.style.opacity = '0.5'; }}
                    >
                      <img src={thumbUrl} alt={img.alt || `Image ${i + 1}`}
                        className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT — order form */}
          <div className="fade-up-element flex flex-col justify-start">
            {/* Product title + price at top of right column */}
            <div className="mb-6">
              {product.category && (
                <p className="section-eyebrow mb-2">{product.category}</p>
              )}
              <h1 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-3 leading-tight">
                {lang === 'en' && product.titleEn ? product.titleEn : product.title}
              </h1>
              {price && (
                <p className="text-primary-red font-display font-bold text-2xl">{price}</p>
              )}
            </div>

            {/* Order form card */}
            <div className="rounded-2xl p-7"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(6px)',
              }}>
              <p className="text-text-white font-display font-bold text-xl mb-1">{tr.detail_contact_title}</p>
              <p className="text-soft-grey/45 text-sm mb-6">{tr.detail_contact_sub}</p>
              <OrderForm productTitle={lang === 'en' && product.titleEn ? product.titleEn : product.title} tr={tr} />
            </div>
          </div>

        </div>

        {/* ── Bottom: description + specs ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {(product.shortDescription || product.description) && (
            <div className="fade-up-element rounded-2xl p-7"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-soft-grey/45 text-xs uppercase tracking-widest mb-4">{tr.detail_description}</p>
              <p className="text-soft-grey text-base leading-relaxed">
                {lang === 'en'
                  ? (product.descriptionEn || product.shortDescriptionEn || product.description || product.shortDescription)
                  : (product.description || product.shortDescription)}
              </p>
            </div>
          )}

          {product.specs && product.specs.length > 0 && (
            <div className="fade-up-element rounded-2xl p-7"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-soft-grey/45 text-xs uppercase tracking-widest mb-5">{tr.detail_specs}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-soft-grey/80">
                    <Check size={13} className="text-primary-red flex-shrink-0 mt-0.5" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* ── Back link ─────────────────────────────────────────── */}
        <div className="mt-12">
          <Link to="/produkti"
            className="fade-up-element inline-flex items-center gap-2 text-soft-grey/35 hover:text-soft-grey text-sm transition-colors">
            <ArrowLeft size={14} /> {tr.nav_products}
          </Link>
        </div>

      </div>
    </main>
  );
}
