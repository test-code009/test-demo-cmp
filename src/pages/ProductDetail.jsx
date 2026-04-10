import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Send } from 'lucide-react';
import { getProductBySlug, urlFor } from '../lib/sanity';
import BackButton from '../components/BackButton';
import { useScrollReveal } from '../hooks/useScrollReveal';

function OrderForm({ productTitle }) {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus('sending');
    // Send to mailto as fallback (no backend needed)
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
      <p className="text-text-white font-display font-semibold text-lg">Paldies!</p>
      <p className="text-soft-grey text-sm">Mēs ar tevi sazināsimies drīzumā.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-soft-grey/50 text-xs uppercase tracking-widest">Vārds</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Jānis Bērziņš"
          required
          className="w-full px-4 py-3 rounded-xl text-text-white text-sm outline-none transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#F5F5F5',
          }}
          onFocus={e => { e.target.style.borderColor = 'rgba(217,31,38,0.5)'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-soft-grey/50 text-xs uppercase tracking-widest">Tālrunis</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+371 2X XXX XXX"
          required
          className="w-full px-4 py-3 rounded-xl text-text-white text-sm outline-none transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#F5F5F5',
          }}
          onFocus={e => { e.target.style.borderColor = 'rgba(217,31,38,0.5)'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary justify-center mt-2"
        style={{ opacity: status === 'sending' ? 0.7 : 1 }}
      >
        <Send size={15} />
        {status === 'sending' ? 'Nosūta...' : 'Pasūtīt'}
      </button>

      {status === 'error' && (
        <p className="text-primary-red text-xs text-center">Kļūda. Lūdzu mēģini vēlreiz.</p>
      )}
    </form>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <p className="text-soft-grey/40 text-sm uppercase tracking-widest mb-6">Produkts nav atrasts</p>
        <Link to="/produkti" className="btn-primary"><ArrowLeft size={15} /> Atpakaļ</Link>
      </div>
    </main>
  );

  let imageUrl = null;
  try {
    if (product.mainImage?.asset) {
      imageUrl = urlFor(product.mainImage).width(1400).height(900).fit('crop').quality(90).url();
    }
  } catch (e) { /* silent */ }

  return (
    <main className="bg-base-black min-h-screen">
      <BackButton />

      {/* ── Hero image ─────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: '65vh', minHeight: '420px' }}>
        {imageUrl ? (
          <img src={imageUrl} alt={product.imageAlt || product.title}
            className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0d0606, #0a0a0a)' }} />
        )}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #060606 0%, rgba(6,6,6,0.3) 60%, transparent 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(6,6,6,0.6) 0%, transparent 50%)' }} />
      </div>

      {/* ── Main content ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 -mt-28 relative z-10 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: product info */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <div className="fade-up-element">
              {product.category && (
                <p className="section-eyebrow mb-3">{product.category}</p>
              )}
              <h1 className="section-title text-4xl sm:text-5xl lg:text-6xl mb-4">{product.title}</h1>
              {product.price && (
                <p className="text-primary-red font-display font-bold text-3xl">{product.price}</p>
              )}
            </div>

            {(product.shortDescription || product.description) && (
              <div className="fade-up-element rounded-2xl p-7"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-soft-grey/45 text-xs uppercase tracking-widest mb-4">Par produktu</p>
                <p className="text-soft-grey text-base leading-relaxed">
                  {product.description || product.shortDescription}
                </p>
              </div>
            )}

            {product.specs && product.specs.length > 0 && (
              <div className="fade-up-element rounded-2xl p-7"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-soft-grey/45 text-xs uppercase tracking-widest mb-5">Komplektācija</p>
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

            <Link to="/produkti"
              className="fade-up-element flex items-center gap-2 text-soft-grey/35 hover:text-soft-grey text-sm transition-colors w-fit">
              <ArrowLeft size={14} /> Visi produkti
            </Link>
          </div>

          {/* Right: order form */}
          <div className="lg:col-span-2">
            <div className="fade-up-element rounded-2xl p-7 sticky top-24"
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-text-white font-display font-bold text-xl mb-1">Pasūtīt</p>
              <p className="text-soft-grey/45 text-sm mb-6">
                Aizpildi formu un mēs ar tevi sazināsimies.
              </p>
              <OrderForm productTitle={product.title} />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
