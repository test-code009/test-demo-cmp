import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, ArrowLeft } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import BackButton from '../components/BackButton';

const products = [
  {
    id: 'suspension-brake',
    category: 'Suspension & Brake',
    tag: 'Flagship',
    tagColor: 'rgba(217,31,38,0.15)',
    tagBorder: 'rgba(217,31,38,0.3)',
    tagText: '#FF3B30',
    title: 'Suspension + Brake Assembly',
    price: '€ 1,249',
    image: '/product-suspension-brake.jpeg',
    description:
      'A fully integrated suspension and brake assembly engineered for the Volkswagen Golf Mk2. Height-adjustable coilover strut paired with a slotted performance rotor and CNC-machined red anodised caliper — built to stop harder and handle sharper.',
    specs: [
      'Height-adjustable coilover strut',
      'Slotted & dimpled performance rotor',
      'CNC-machined red anodised caliper',
      'Direct Mk2 fitment — no modification required',
      'Matched spring rate for street & track',
      'Complete assembly, ready to fit',
    ],
  },
  {
    id: 'subframe',
    category: 'Chassis',
    tag: 'Engineered',
    tagColor: 'rgba(255,255,255,0.07)',
    tagBorder: 'rgba(255,255,255,0.15)',
    tagText: '#A7A7A7',
    title: 'Front Subframe',
    price: '€ 849',
    image: '/product-subframe.jpeg',
    description:
      'A fully restored and reinforced front subframe for the Golf Mk2 platform. Powder-coated gloss black, fitted with performance polyurethane bushings in orange and upgraded red tie rod ends. The foundation your build deserves.',
    specs: [
      'Powder-coated gloss black finish',
      'Performance polyurethane bushings (orange)',
      'Upgraded red tie rod ends',
      'Full Mk2 direct fitment',
      'Restored to factory tolerance spec',
      'Shot-blasted and rust-proofed',
    ],
  },
  {
    id: 'coming-soon',
    category: 'Coming Soon',
    tag: 'Soon',
    tagColor: 'rgba(255,255,255,0.05)',
    tagBorder: 'rgba(255,255,255,0.1)',
    tagText: '#666',
    title: 'More Products',
    price: null,
    image: null,
    description: 'New products are being prepared. Check back soon or get in touch to enquire about specific upgrade solutions for your Mk2 build.',
    specs: [],
  },
];

function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <X size={16} className="text-soft-grey" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none" style={{ minHeight: '320px' }}>
            {product.image ? (
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" style={{ minHeight: '320px' }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ minHeight: '320px', background: '#0d0d0d' }}>
                <p className="text-soft-grey/30 text-sm uppercase tracking-widest">Coming Soon</p>
              </div>
            )}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.5) 0%, transparent 60%)' }} />
            <span
              className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
              style={{ background: product.tagColor, border: `1px solid ${product.tagBorder}`, color: product.tagText }}
            >
              {product.tag}
            </span>
          </div>

          {/* Details */}
          <div className="p-8 lg:p-10 flex flex-col gap-5">
            <div>
              <p className="section-eyebrow mb-2">{product.category}</p>
              <h2 className="text-text-white font-display font-bold text-2xl sm:text-3xl leading-tight">{product.title}</h2>
              {product.price && (
                <p className="text-primary-red font-display font-bold text-2xl mt-2">{product.price}</p>
              )}
            </div>

            <p className="text-soft-grey text-sm leading-relaxed">{product.description}</p>

            {product.specs.length > 0 && (
              <div>
                <p className="text-text-white/50 text-xs uppercase tracking-widest mb-3">What's Included</p>
                <ul className="flex flex-col gap-2">
                  {product.specs.map(spec => (
                    <li key={spec} className="flex items-center gap-3 text-sm text-soft-grey/80">
                      <Check size={12} className="text-primary-red flex-shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3 pt-2 mt-auto">
              <Link to="/kontakti" className="btn-primary flex-1 justify-center">
                Enquire Now
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  useScrollReveal();
  const [selected, setSelected] = useState(null);

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

      {/* ── Product Grid ─────────────────────────────────────────────── */}
      <section className="py-20 bg-base-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <div
                key={product.id}
                onClick={() => product.id !== 'coming-soon' && setSelected(product)}
                className="fade-up-element flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  transitionDelay: `${i * 0.1}s`,
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.07)',
                  cursor: product.id !== 'coming-soon' ? 'pointer' : 'default',
                }}
                onMouseEnter={e => {
                  if (product.id !== 'coming-soon') {
                    e.currentTarget.style.border = '1px solid rgba(217,31,38,0.35)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: '220px', background: '#0d0d0d' }}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                        <ArrowRight size={18} className="text-soft-grey/20" />
                      </div>
                      <p className="text-soft-grey/25 text-xs uppercase tracking-widest">Coming Soon</p>
                    </div>
                  )}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.6) 0%, transparent 50%)' }} />
                  <span
                    className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: product.tagColor, border: `1px solid ${product.tagBorder}`, color: product.tagText }}
                  >
                    {product.tag}
                  </span>
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 p-5 gap-2">
                  <p className="text-soft-grey/45 text-xs uppercase tracking-widest">{product.category}</p>
                  <h3 className="text-text-white font-display font-bold text-base leading-snug">{product.title}</h3>
                  <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {product.price ? (
                      <span className="text-primary-red font-bold text-lg">{product.price}</span>
                    ) : (
                      <span className="text-soft-grey/30 text-sm">—</span>
                    )}
                    {product.id !== 'coming-soon' && (
                      <span className="flex items-center gap-1.5 text-soft-grey/50 text-xs uppercase tracking-widest group-hover:text-primary-red transition-colors">
                        View more
                        <ArrowRight size={12} />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              Start the Conversation
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Modal ────────────────────────────────────────────────────── */}
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
