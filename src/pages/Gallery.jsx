import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { getGalleries, urlFor } from '../lib/sanity';
import { useLanguage } from '../context/LanguageContext';
import t from '../lib/translations';

export default function Gallery() {
  const { lang } = useLanguage();
  const tr = t[lang];
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null); // { src, alt }
  const closeBtnRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    getGalleries()
      .then(data => setGalleries(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Flatten all images from all galleries
  const allImages = galleries.flatMap(g =>
    (g.images || []).map(img => ({
      asset: img.asset,
      alt: (lang === 'en' && img.altEn ? img.altEn : img.altLv) || '',
    }))
  );

  function openLightbox(img, btnEl) {
    try {
      const src = urlFor(img).format('webp').width(1600).quality(90).url();
      triggerRef.current = btnEl;
      setLightbox({ src, alt: img.alt });
    } catch { /* silent */ }
  }

  function closeLightbox() {
    setLightbox(null);
    // Return focus to the trigger element
    setTimeout(() => triggerRef.current?.focus(), 50);
  }

  // Focus close button when lightbox opens
  useEffect(() => {
    if (lightbox) setTimeout(() => closeBtnRef.current?.focus(), 50);
  }, [lightbox]);

  // Close lightbox on Escape
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') closeLightbox(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <main className="bg-base-black min-h-screen pt-[106px] md:pt-[96px] pb-24">

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0606 0%, #130808 40%, #0a0a0a 100%)' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(217,31,38,0.5) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="section-eyebrow mb-4">{tr.gallery_eyebrow}</p>
          <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl">
            {tr.gallery_title}
          </h1>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="flex justify-center py-32">
            <div role="status" aria-label="Ielādējas galerija" className="w-8 h-8 rounded-full border-2 border-primary-red/30 border-t-primary-red animate-spin" />
          </div>
        ) : allImages.length === 0 ? (
          <div className="text-center py-32" role="status">
            <p className="text-soft-grey/40 text-sm uppercase tracking-widest">{tr.gallery_empty}</p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3" role="list" aria-label={tr.gallery_title}>
            {allImages.map((img, i) => {
              let src = null;
              try { src = urlFor(img).format('webp').width(800).quality(85).url(); } catch { /* silent */ }
              if (!src) return null;
              return (
                <div key={i} role="listitem" className="break-inside-avoid overflow-hidden group" style={{ borderRadius: '4px' }}>
                  <button
                    className="w-full text-left cursor-pointer"
                    aria-label={img.alt || `Bilde ${i + 1}`}
                    onClick={e => openLightbox(img, e.currentTarget)}
                  >
                    <img
                      src={src}
                      alt={img.alt || ''}
                      loading="lazy"
                      decoding="async"
                      className="w-full block transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      style={{ display: 'block' }}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt || 'Bilde'}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
          onClick={closeLightbox}
        >
          <button
            ref={closeBtnRef}
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
            aria-label="Aizvērt attēlu"
            onClick={closeLightbox}
          >
            <X size={18} className="text-white" aria-hidden="true" />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt || 'Galerijas attēls'}
            className="max-w-full max-h-[90vh] object-contain"
            style={{ borderRadius: '4px', boxShadow: '0 32px 80px rgba(0,0,0,0.8)' }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
