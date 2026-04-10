import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronLeft } from 'lucide-react';
import { getProductBySlug, urlFor } from '../lib/sanity';
import BackButton from '../components/BackButton';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ProductDetail() {
  useScrollReveal();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductBySlug(slug)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product.');
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
        <p className="text-soft-grey/40 text-sm uppercase tracking-widest mb-4">Product not found</p>
        <Link to="/produkti" className="btn-primary">
          <ChevronLeft size={15} /> Back to Products
        </Link>
      </div>
    </main>
  );

  let imageUrl = null;
  try {
    if (product.mainImage?.asset) {
      imageUrl = urlFor(product.mainImage).width(900).height(600).fit('crop').url();
    }
  } catch (e) {
    console.warn('[ProductDetail] image error:', e);
  }

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        {imageUrl ? (
          <>
            <img src={imageUrl} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #060606 30%, rgba(6,6,6,0.5) 70%, rgba(6,6,6,0.2) 100%)' }} />
          </>
        ) : (
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0606 0%, #130808 40%, #0a0a0a 100%)' }} />
        )}
        <BackButton />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-40 w-full">
          {product.category && (
            <p className="section-eyebrow mb-3 fade-up-element">{product.category}</p>
          )}
          <h1 className="section-title text-4xl sm:text-5xl lg:text-6xl mb-4 fade-up-element" style={{ transitionDelay: '0.1s' }}>
            {product.title}
          </h1>
          {product.price && (
            <p className="text-primary-red font-display font-bold text-2xl fade-up-element" style={{ transitionDelay: '0.2s' }}>
              {product.price}
            </p>
          )}
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-base-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left */}
            <div className="flex flex-col gap-8 fade-up-element">
              {product.shortDescription && (
                <div>
                  <p className="text-soft-grey/50 text-xs uppercase tracking-widest mb-3">Overview</p>
                  <p className="text-text-white/90 text-lg leading-relaxed">{product.shortDescription}</p>
                </div>
              )}
              {product.description && (
                <div>
                  <p className="text-soft-grey/50 text-xs uppercase tracking-widest mb-3">Details</p>
                  <p className="text-soft-grey text-base leading-relaxed">{product.description}</p>
                </div>
              )}
              <div className="flex gap-4 pt-2">
                <Link to="/kontakti" className="btn-primary">
                  Enquire Now <ArrowRight size={15} />
                </Link>
                <Link to="/produkti" className="btn-secondary">
                  All Products
                </Link>
              </div>
            </div>

            {/* Right — specs */}
            {product.specs && product.specs.length > 0 && (
              <div className="fade-up-element" style={{ transitionDelay: '0.15s' }}>
                <div className="rounded-2xl p-8" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-soft-grey/50 text-xs uppercase tracking-widest mb-6">What's Included</p>
                  <ul className="flex flex-col gap-3">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-soft-grey/80">
                        <Check size={13} className="text-primary-red flex-shrink-0 mt-0.5" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
