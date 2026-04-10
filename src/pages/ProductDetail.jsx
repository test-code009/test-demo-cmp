import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Check, ArrowLeft, Mail } from 'lucide-react';
import { getProductBySlug, urlFor } from '../lib/sanity';
import BackButton from '../components/BackButton';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useScrollReveal([product]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductBySlug(slug)
      .then(data => {
        setProduct(data || null);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return (
    <main className="min-h-screen bg-base-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-primary-red/30 border-t-primary-red animate-spin" />
        <p className="text-soft-grey/50 text-sm uppercase tracking-widest">Loading</p>
      </div>
    </main>
  );

  if (error || !product) return (
    <main className="min-h-screen bg-base-black flex items-center justify-center">
      <div className="text-center">
        <p className="text-soft-grey/40 text-sm uppercase tracking-widest mb-6">Product not found</p>
        <Link to="/produkti" className="btn-primary">
          <ArrowLeft size={15} /> All Products
        </Link>
      </div>
    </main>
  );

  let imageUrl = null;
  try {
    if (product.mainImage?.asset) {
      imageUrl = urlFor(product.mainImage).width(1200).height(800).fit('crop').url();
    }
  } catch (e) { /* silent */ }

  return (
    <main className="bg-base-black">
      <BackButton />

      {/* ── Hero image ───────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: '70vh', minHeight: '480px' }}>
        {imageUrl ? (
          <img src={imageUrl} alt={product.title}
            className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0606 0%, #130808 100%)' }} />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #060606 0%, rgba(6,6,6,0.4) 60%, rgba(6,6,6,0.15) 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(6,6,6,0.5) 0%, transparent 60%)' }} />

        {/* Badges */}
        {product.featured && (
          <span className="absolute top-20 left-6 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(217,31,38,0.18)', border: '1px solid rgba(217,31,38,0.4)', color: '#FF3B30' }}>
            Featured
          </span>
        )}
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left col — main info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Title block */}
            <div className="fade-up-element">
              {product.category && (
                <p className="section-eyebrow mb-3">{product.category}</p>
              )}
              <h1 className="section-title text-4xl sm:text-5xl lg:text-6xl mb-4">{product.title}</h1>
              {product.shortDescription && (
                <p className="text-soft-grey text-lg leading-relaxed max-w-2xl">{product.shortDescription}</p>
              )}
            </div>

            {/* Long description */}
            {product.description && (
              <div className="fade-up-element rounded-2xl p-8"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-soft-grey/50 text-xs uppercase tracking-widest mb-4">About this product</p>
                <p className="text-soft-grey text-base leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Specs */}
            {product.specs && product.specs.length > 0 && (
              <div className="fade-up-element rounded-2xl p-8"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-soft-grey/50 text-xs uppercase tracking-widest mb-6">What's Included</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-soft-grey/80">
                      <Check size={14} className="text-primary-red flex-shrink-0 mt-0.5" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right col — sticky sidebar */}
          <div className="flex flex-col gap-5">
            <div className="fade-up-element rounded-2xl p-7 sticky top-24"
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>

              <p className="text-soft-grey/50 text-xs uppercase tracking-widest mb-2">Price</p>
              {product.price ? (
                <p className="text-primary-red font-display font-bold text-4xl mb-6">{product.price}</p>
              ) : (
                <p className="text-soft-grey/40 text-lg mb-6 italic">Contact for pricing</p>
              )}

              <div className="flex flex-col gap-3">
                <Link to="/kontakti" className="btn-primary justify-center w-full">
                  Enquire Now <ArrowRight size={15} />
                </Link>
                <a href="mailto:info@classicmotionperformance.com"
                  className="btn-secondary justify-center w-full">
                  <Mail size={14} /> Send Email
                </a>
              </div>

              <div className="mt-6 pt-6 flex flex-col gap-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2 text-soft-grey/50 text-xs">
                  <Check size={11} className="text-primary-red" /> Direct Mk2 fitment
                </div>
                <div className="flex items-center gap-2 text-soft-grey/50 text-xs">
                  <Check size={11} className="text-primary-red" /> Expert support included
                </div>
                <div className="flex items-center gap-2 text-soft-grey/50 text-xs">
                  <Check size={11} className="text-primary-red" /> Engineered for performance
                </div>
              </div>
            </div>

            <Link to="/produkti"
              className="fade-up-element flex items-center gap-2 text-soft-grey/40 hover:text-soft-grey text-sm transition-colors duration-200">
              <ArrowLeft size={14} /> Back to all products
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
