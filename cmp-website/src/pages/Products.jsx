import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import BackButton from '../components/BackButton';

const ProductHeroBg = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg, #0a0606 0%, #130808 40%, #0a0a0a 100%)' }}
    />
    <div
      className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20"
      style={{ background: 'radial-gradient(circle, rgba(217,31,38,0.5) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }}
    />
    <div
      className="absolute bottom-0 left-0 right-0 h-48"
      style={{ background: 'linear-gradient(to top, #060606, transparent)' }}
    />
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 4px)',
      }}
    />
  </div>
);

const products = [
  {
    id: 'g60-brake',
    category: 'Brake System',
    title: 'G60 Brake System Upgrade',
    description: 'A complete braking upgrade engineered for stronger stopping power, thermal stability, and a sharper performance feel.',
    tag: 'Flagship',
    tagColor: 'rgba(217,31,38,0.15)',
    tagBorder: 'rgba(217,31,38,0.3)',
    tagText: '#FF3B30',
    accent: 'rgba(217,31,38,0.25)',
  },
  {
    id: 'suspension',
    category: 'Suspension',
    title: 'Suspension Upgrade Solutions',
    description: 'High-performance suspension setups designed to improve handling precision, stability, and overall driver confidence.',
    tag: 'Popular',
    tagColor: 'rgba(255,255,255,0.06)',
    tagBorder: 'rgba(255,255,255,0.12)',
    tagText: '#A7A7A7',
    accent: 'rgba(255,255,255,0.08)',
  },
  {
    id: 'custom',
    category: 'Consultation',
    title: 'Custom Setup Consultation',
    description: 'A tailored approach for unique builds that require the right balance of fitment, function, and visual intent.',
    tag: 'Bespoke',
    tagColor: 'rgba(255,255,255,0.06)',
    tagBorder: 'rgba(255,255,255,0.12)',
    tagText: '#A7A7A7',
    accent: 'rgba(255,255,255,0.08)',
  },
];

// Stylized product visuals
const ProductVisual = ({ id }) => {
  if (id === 'g60-brake') {
    return (
      <div className="relative w-full h-full flex items-center justify-center"
        style={{ background: 'radial-gradient(ellipse at 55% 50%, rgba(35,10,10,0.9) 0%, #0d0d0d 75%)' }}>
        <div className="relative">
          <div className="w-44 h-44 rounded-full" style={{
            border: '14px solid rgba(217,31,38,0.25)',
            boxShadow: '0 0 50px rgba(217,31,38,0.12), inset 0 0 30px rgba(0,0,0,0.9)',
          }}>
            <div className="w-full h-full rounded-full flex items-center justify-center" style={{
              background: 'radial-gradient(circle, rgba(25,8,8,0.95) 30%, rgba(15,5,5,0.98) 100%)',
            }}>
              <div className="text-center">
                <p className="text-primary-red text-[10px] uppercase tracking-[0.2em] font-semibold">G60</p>
                <p className="text-text-white font-display font-bold text-xs mt-0.5">BRAKE</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-6 h-20 rounded"
            style={{ background: 'linear-gradient(180deg, rgba(217,31,38,0.5) 0%, rgba(150,20,20,0.4) 100%)', border: '1px solid rgba(217,31,38,0.4)' }} />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div key={deg} className="absolute w-1 h-3 rounded-full" style={{
              top: '50%', left: '50%',
              background: 'rgba(217,31,38,0.2)',
              transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-68px)`,
            }} />
          ))}
        </div>
      </div>
    );
  }
  if (id === 'suspension') {
    return (
      <div className="relative w-full h-full flex items-center justify-center"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(15,15,20,0.9) 0%, #0d0d0d 75%)' }}>
        <div className="relative flex flex-col items-center gap-2">
          {[1, 0.7, 0.5].map((scale, i) => (
            <div key={i} className="rounded-sm" style={{
              width: `${90 * scale}px`,
              height: '10px',
              background: `rgba(255,255,255,${0.07 + i * 0.04})`,
              border: '1px solid rgba(255,255,255,0.1)',
            }} />
          ))}
          <div className="w-2 h-32 rounded-full my-1" style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 20px rgba(255,255,255,0.04)',
          }} />
          <div className="w-20 h-8 rounded-full" style={{
            background: 'linear-gradient(135deg, rgba(30,30,35,0.9) 0%, rgba(20,20,25,0.95) 100%)',
            border: '2px solid rgba(255,255,255,0.12)',
            boxShadow: '0 0 30px rgba(255,255,255,0.04)',
          }} />
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-full h-full flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(15,15,15,0.9) 0%, #0d0d0d 75%)' }}>
      <div className="text-center px-6">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div className="w-6 h-6 rounded-full" style={{ border: '2px solid rgba(255,255,255,0.25)' }} />
        </div>
        <p className="text-soft-grey/50 text-xs uppercase tracking-widest">Custom</p>
        <p className="text-text-white/70 text-sm font-display font-medium mt-1">Bespoke Build</p>
      </div>
    </div>
  );
};

export default function Products() {
  useScrollReveal();

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <ProductHeroBg />
        <BackButton />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-44 md:pt-48 w-full">
          <p className="section-eyebrow mb-4 fade-up-element">Our Range</p>
          <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl mb-5 fade-up-element" style={{ transitionDelay: '0.1s' }}>
            Products
          </h1>
          <p className="text-soft-grey text-lg max-w-xl fade-up-element" style={{ transitionDelay: '0.2s' }}>
            Curated upgrade solutions built around performance, control, and clean integration.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 bg-base-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <div
                key={product.id}
                className="glass-card overflow-hidden flex flex-col fade-up-element"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Image area */}
                <div className="relative h-56 overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <ProductVisual id={product.id} />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: product.tagColor, border: `1px solid ${product.tagBorder}`, color: product.tagText }}
                  >
                    {product.tag}
                  </div>
                </div>
                {/* Content */}
                <div className="p-7 flex flex-col flex-1">
                  <p className="section-eyebrow text-[10px] mb-2">{product.category}</p>
                  <h3 className="text-text-white font-display font-semibold text-lg mb-3 leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-soft-grey text-sm leading-relaxed flex-1">
                    {product.description}
                  </p>
                  <div className="mt-6">
                    <button className="btn-secondary text-xs py-2.5 px-5 group">
                      Learn More
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product Detail Block */}
      <section className="py-24 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(217,31,38,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,31,38,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-4 fade-up-element">Flagship Solution</p>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl fade-up-element" style={{ transitionDelay: '0.1s' }}>
              G60 Brake System — In Detail
            </h2>
          </div>

          <div
            className="rounded-3xl overflow-hidden fade-up-element"
            style={{ background: 'linear-gradient(135deg, #111111 0%, #171717 100%)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left visual */}
              <div className="relative h-72 lg:h-auto min-h-[320px]" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(30,8,8,0.8) 0%, #0d0d0d 80%)' }}>
                  <div className="relative">
                    <div className="w-56 h-56 rounded-full" style={{
                      border: '18px solid rgba(217,31,38,0.18)',
                      boxShadow: '0 0 80px rgba(217,31,38,0.1)',
                    }}>
                      <div className="w-full h-full rounded-full flex items-center justify-center" style={{
                        background: 'radial-gradient(circle, rgba(22,6,6,0.97) 30%, rgba(14,4,4,0.99) 100%)',
                        border: '1px solid rgba(217,31,38,0.12)',
                      }}>
                        <div className="text-center">
                          <p className="text-primary-red text-[11px] uppercase tracking-[0.25em] font-bold mb-1">G60</p>
                          <p className="text-text-white font-display font-bold text-base">BRAKE</p>
                          <p className="text-soft-grey/50 text-[9px] tracking-[0.3em] uppercase mt-0.5">SYSTEM</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -right-7 top-1/2 -translate-y-1/2 w-8 h-28 rounded-lg" style={{
                      background: 'linear-gradient(180deg, rgba(217,31,38,0.45) 0%, rgba(150,20,20,0.35) 100%)',
                      border: '1px solid rgba(217,31,38,0.35)',
                      boxShadow: '0 0 20px rgba(217,31,38,0.15)',
                    }} />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-center">
                    <span className="text-soft-grey/40 text-[10px] font-mono uppercase tracking-wider">CMP / G60 / MK2</span>
                    <span className="text-primary-red/40 text-[10px] font-mono">REV.2</span>
                  </div>
                </div>
              </div>

              {/* Right content */}
              <div className="p-10 lg:p-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    {
                      label: 'Overview',
                      text: 'The G60 Brake System Upgrade is designed for enthusiasts who want more confidence under braking without compromising clean fitment and period-correct character.',
                    },
                    {
                      label: 'Benefits',
                      text: 'Stronger stopping performance, improved thermal stability under repeated braking, and a motorsport-influenced finish that elevates the visual identity of the build.',
                    },
                    {
                      label: 'Compatibility',
                      text: 'Engineered specifically for Volkswagen Golf Mk2. Direct-fit integration with no modification required to standard mounting points.',
                    },
                    {
                      label: 'Visual Design',
                      text: 'A refined, motorsport-influenced aesthetic. Clean lines, purposeful finish — built to look as deliberate as it performs.',
                    },
                  ].map((block) => (
                    <div key={block.label}>
                      <p className="section-eyebrow mb-3">{block.label}</p>
                      <p className="text-soft-grey text-sm leading-relaxed">{block.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-soft-grey/60 text-sm italic leading-relaxed">
                    "Refined upgrades for serious builds. Performance, engineered with intent."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Strip */}
      <section className="py-24 bg-base-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-4 fade-up-element">How It Works</p>
            <h2 className="section-title text-3xl fade-up-element" style={{ transitionDelay: '0.1s' }}>
              Simple. Clear. Confident.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector lines (desktop) */}
            <div className="hidden md:block absolute top-1/3 left-1/3 right-1/3 h-px" style={{ background: 'linear-gradient(90deg, rgba(217,31,38,0.2), rgba(217,31,38,0.2))' }} />

            {[
              { step: '01', title: 'Choose your setup', text: 'Browse our products and identify the upgrade direction that fits your build goals.' },
              { step: '02', title: 'Confirm fitment', text: 'We confirm compatibility and fitment specifics for your exact Mk2 variant before anything moves forward.' },
              { step: '03', title: 'Upgrade with confidence', text: 'Receive your upgrade with clear installation guidance and the assurance of a purpose-built solution.' },
            ].map((s, i) => (
              <div
                key={s.step}
                className="glass-card p-8 text-center fade-up-element"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'rgba(217,31,38,0.1)', border: '1px solid rgba(217,31,38,0.25)' }}
                >
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
