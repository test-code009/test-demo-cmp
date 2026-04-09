import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
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
    subtitle: 'Complete Performance Upgrade',
    description:
      'A fully integrated suspension and brake assembly engineered for the Volkswagen Golf Mk2. Red-coated coilover strut paired with a slotted performance rotor and CNC-machined caliper — built to stop harder and handle sharper.',
    image: '/product-suspension-brake.jpeg',
    specs: [
      'Height-adjustable coilover strut',
      'Slotted & dimpled performance rotor',
      'CNC-machined red anodised caliper',
      'Direct Mk2 fitment — no modification',
      'Matched spring rate for street & track',
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
    subtitle: 'Restored & Reinforced',
    description:
      'A fully restored and reinforced front subframe for the Golf Mk2 platform. Powder-coated gloss black, fitted with performance polyurethane bushings in orange and upgraded red tie rod ends. The foundation your build deserves.',
    image: '/product-subframe.jpeg',
    specs: [
      'Powder-coated gloss black finish',
      'Performance polyurethane bushings',
      'Upgraded red tie rod ends',
      'Full Mk2 direct fitment',
      'Restored to factory tolerance spec',
    ],
  },
];

export default function Products() {
  useScrollReveal();

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0606 0%, #130808 40%, #0a0a0a 100%)' }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(217,31,38,0.5) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-48"
            style={{ background: 'linear-gradient(to top, #060606, transparent)' }} />
        </div>
        <BackButton />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-44 md:pt-48 w-full">
          <p className="section-eyebrow mb-4 fade-up-element">Our Range</p>
          <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl mb-5 fade-up-element" style={{ transitionDelay: '0.1s' }}>
            Products
          </h1>
          <p className="text-soft-grey text-lg max-w-xl fade-up-element" style={{ transitionDelay: '0.2s' }}>
            Purpose-built upgrade solutions for Volkswagen Golf Mk2 enthusiasts who demand more.
          </p>
        </div>
      </section>

      {/* ── Product Cards ─────────────────────────────────────────────── */}
      <section className="py-28 bg-base-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="fade-up-element rounded-3xl overflow-hidden"
              style={{
                transitionDelay: `${i * 0.12}s`,
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Photo */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    minHeight: '380px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    borderRight: 'none',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    style={{ minHeight: '380px' }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(17,17,17,0.6) 100%)' }} />
                  {/* Tag */}
                  <span
                    className="absolute top-5 left-5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                    style={{ background: product.tagColor, border: `1px solid ${product.tagBorder}`, color: product.tagText }}
                  >
                    {product.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-10 lg:p-14 gap-6">
                  <div>
                    <p className="section-eyebrow mb-2">{product.category}</p>
                    <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl mb-1">{product.title}</h2>
                    <p className="text-soft-grey/50 text-sm uppercase tracking-widest">{product.subtitle}</p>
                  </div>

                  <p className="text-soft-grey text-base leading-relaxed">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <ul className="flex flex-col gap-2.5">
                    {product.specs.map((spec) => (
                      <li key={spec} className="flex items-center gap-3 text-sm text-soft-grey/80">
                        <Check size={13} className="text-primary-red flex-shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-4 pt-2">
                    <Link to="/kontakti" className="btn-primary">
                      Enquire Now
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process Strip ─────────────────────────────────────────────── */}
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
    </main>
  );
}
