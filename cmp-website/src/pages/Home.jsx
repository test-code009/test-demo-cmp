import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Check, Zap, Shield, Award, Users } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <img
      src="/hero.png"
      alt="Classic Motion Performance — VW Golf Mk2"
      className="absolute inset-0 w-full h-full object-cover object-center"
      style={{ animation: 'slowZoom 14s ease-in-out infinite alternate' }}
    />
    {/* Dark base overlay */}
    <div className="absolute inset-0" style={{ background: 'rgba(6,6,6,0.40)' }} />
    {/* Left gradient for text readability */}
    <div className="absolute inset-y-0 left-0 w-3/4" style={{ background: 'linear-gradient(to right, rgba(6,6,6,0.88) 0%, rgba(6,6,6,0.50) 45%, transparent 100%)' }} />
    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-56" style={{ background: 'linear-gradient(to top, #060606 0%, transparent 100%)' }} />
    {/* Subtle red glow bottom-right matching car lights */}
    <div
      className="absolute bottom-0 right-0 w-[600px] h-[400px] opacity-25 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(217,31,38,0.35) 0%, transparent 70%)', transform: 'translate(10%, 20%)' }}
    />
  </div>
);

const EngineVisualBg = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg, #080808 0%, #111111 50%, #0a0a0a 100%)' }}
    />
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-15"
      style={{ background: 'radial-gradient(ellipse, rgba(217,31,38,0.4) 0%, transparent 70%)' }}
    />
  </div>
);

export default function Home() {
  useScrollReveal();

  return (
    <main>
      {/* ─── Section 1: Hero ──────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroBackground />

        {/* Red vertical accent line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px opacity-60"
          style={{ background: 'linear-gradient(180deg, transparent, #D91F26 30%, #D91F26 70%, transparent)', marginLeft: '5%' }}
        />

        {/* Logo — top center */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pt-20 md:pt-24 pointer-events-none">
          <img
            src="/logo.png"
            alt="Classic Motion Performance"
            className="w-36 md:w-44 opacity-90 drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 24px rgba(217,31,38,0.35))' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-56 md:pt-60 pb-20">
          <div className="max-w-2xl">
            <div className="section-eyebrow mb-5 fade-up-element">
              PREMIUM PERFORMANCE UPGRADES
            </div>

            <h1
              className="section-title text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6 fade-up-element"
              style={{ transitionDelay: '0.1s' }}
            >
              Classic
              <br />
              <span className="text-gradient-red">Motion</span>
              <br />
              Performance
            </h1>

            <p
              className="text-soft-grey text-lg leading-relaxed max-w-lg mb-10 fade-up-element"
              style={{ transitionDelay: '0.2s' }}
            >
              Precision brake and suspension solutions for Mk2 builds and enthusiasts who demand more.
            </p>

            <div
              className="flex flex-wrap gap-4 fade-up-element"
              style={{ transitionDelay: '0.3s' }}
            >
              <Link to="/produkti" className="btn-primary text-sm">
                Explore Products
                <ArrowRight size={16} />
              </Link>
              <Link to="/kontakti" className="btn-secondary text-sm">
                Get in Touch
              </Link>
            </div>

            {/* Specs strip */}
            <div
              className="flex flex-wrap gap-8 mt-14 pt-8 fade-up-element"
              style={{ transitionDelay: '0.4s', borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {[
                { label: 'Brake Upgrades', value: 'G60 Systems' },
                { label: 'Suspension', value: 'Precision Kits' },
                { label: 'Fitment', value: 'Mk2 Specific' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-soft-grey text-xs uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-text-white font-display font-semibold text-sm">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-soft-grey text-xs uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown size={16} className="text-primary-red animate-bounce" />
        </div>
      </section>

      {/* ─── Section 2: Brand Statement ─────────────────────────────── */}
      <section className="relative py-28 bg-charcoal overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="red-line-accent fade-up-element" />
              <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-8 fade-up-element" style={{ transitionDelay: '0.1s' }}>
                Built for Drivers Who Care About Every Detail
              </h2>
            </div>
            <div className="fade-up-element" style={{ transitionDelay: '0.2s' }}>
              <p className="text-soft-grey text-base leading-relaxed mb-6">
                Classic Motion Performance delivers refined upgrade solutions for enthusiasts who want sharper braking, better road feel, and a more purposeful build. Every detail is chosen to combine performance, reliability, and visual impact.
              </p>
              <p className="text-soft-grey/70 text-sm leading-relaxed">
                Focused exclusively on Volkswagen Golf Mk2 — not a general catalogue. Purpose-built solutions for builds that deserve precision.
              </p>
              <div className="mt-8">
                <Link to="/par-mums" className="btn-secondary text-sm">
                  Our Story
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Core Offer Cards ────────────────────────────── */}
      <section className="relative py-28 bg-base-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-eyebrow mb-4 fade-up-element">What We Do</p>
            <h2 className="section-title text-3xl sm:text-4xl fade-up-element" style={{ transitionDelay: '0.1s' }}>
              Our Core Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: '01',
                title: 'Brake Upgrades',
                text: 'Performance-focused braking solutions built for stronger response, control, and confidence.',
                delay: '0s',
              },
              {
                number: '02',
                title: 'Suspension Solutions',
                text: 'Precision suspension upgrades designed to improve handling, stance, and road feel.',
                delay: '0.1s',
              },
              {
                number: '03',
                title: 'Custom Performance Setups',
                text: 'Tailored upgrade solutions for builds that need a more considered and individual approach.',
                delay: '0.2s',
              },
            ].map((card) => (
              <div
                key={card.number}
                className="glass-card p-8 fade-up-element"
                style={{ transitionDelay: card.delay }}
              >
                <span
                  className="text-5xl font-display font-bold mb-6 block"
                  style={{ color: 'rgba(217,31,38,0.15)', lineHeight: 1 }}
                >
                  {card.number}
                </span>
                <h3 className="text-text-white font-display font-semibold text-xl mb-3">
                  {card.title}
                </h3>
                <p className="text-soft-grey text-sm leading-relaxed">
                  {card.text}
                </p>
                <div className="mt-6 flex items-center gap-2 text-primary-red text-xs font-semibold uppercase tracking-wider group cursor-pointer">
                  Learn More
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 4: Featured Product ────────────────────────────── */}
      <section className="relative py-28 bg-charcoal overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-[45%] opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, rgba(217,31,38,0.5) 0, rgba(217,31,38,0.5) 1px, transparent 0, transparent 50%)',
            backgroundSize: '12px 12px',
          }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div
              className="relative rounded-2xl overflow-hidden fade-up-element aspect-[4/3]"
              style={{ background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 100%)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Simulated brake disc composition */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(40,15,15,0.8) 0%, #0d0d0d 70%)' }}
              >
                <div className="relative">
                  {/* Disc ring visual */}
                  <div
                    className="w-52 h-52 rounded-full"
                    style={{
                      border: '16px solid rgba(217,31,38,0.2)',
                      boxShadow: '0 0 60px rgba(217,31,38,0.15), inset 0 0 40px rgba(0,0,0,0.8)',
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center"
                      style={{
                        background: 'radial-gradient(circle, rgba(30,10,10,0.9) 30%, rgba(20,8,8,0.95) 100%)',
                        border: '1px solid rgba(217,31,38,0.15)',
                      }}
                    >
                      <div className="text-center">
                        <p className="section-eyebrow text-[10px] mb-1">G60</p>
                        <p className="text-text-white font-display font-bold text-sm">BRAKE</p>
                        <p className="text-soft-grey text-[10px] tracking-widest">SYSTEM</p>
                      </div>
                    </div>
                  </div>
                  {/* Caliper accent */}
                  <div
                    className="absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-24 rounded"
                    style={{ background: 'linear-gradient(180deg, rgba(217,31,38,0.4) 0%, rgba(150,20,20,0.3) 100%)', border: '1px solid rgba(217,31,38,0.3)' }}
                  />
                </div>
              </div>
              {/* Badge */}
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(217,31,38,0.15)', border: '1px solid rgba(217,31,38,0.3)', color: '#FF3B30' }}
              >
                Featured
              </div>
            </div>

            {/* Content */}
            <div className="fade-up-element" style={{ transitionDelay: '0.15s' }}>
              <div className="red-line-accent" />
              <p className="section-eyebrow mb-3">Flagship Product</p>
              <h2 className="section-title text-3xl sm:text-4xl mb-5">
                G60 Brake System Upgrade
              </h2>
              <p className="text-soft-grey text-base leading-relaxed mb-8">
                A flagship braking solution designed for stronger stopping power, better heat management, and a sharper performance presence.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  'Improved braking response',
                  'Performance-focused durability',
                  'Clean direct-fit integration',
                  'Motorsport-inspired finish',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-soft-grey">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(217,31,38,0.12)', border: '1px solid rgba(217,31,38,0.3)' }}
                    >
                      <Check size={10} className="text-primary-red" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/produkti" className="btn-primary text-sm">
                View Product
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 5: Engineering Visual ──────────────────────────── */}
      <section className="relative py-32 overflow-hidden" style={{ background: '#080808' }}>
        <EngineVisualBg />

        {/* Technical grid lines decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[20, 40, 60, 80].map((pos) => (
            <div
              key={pos}
              className="absolute top-0 bottom-0 w-px opacity-[0.03]"
              style={{ left: `${pos}%`, background: 'rgba(255,255,255,0.5)' }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Subframe visual representation */}
          <div className="mb-12 fade-up-element">
            <div
              className="inline-block mx-auto rounded-2xl overflow-hidden"
              style={{
                width: '100%',
                maxWidth: '900px',
                height: '220px',
                background: 'linear-gradient(135deg, rgba(17,17,17,0.9) 0%, rgba(23,23,23,0.95) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
              }}
            >
              {/* Subframe technical diagram (stylized) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-28">
                  {/* Main frame rails */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-red/30 to-transparent -translate-y-1/2" />
                  <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  {/* Cross members */}
                  {[25, 50, 75].map((p) => (
                    <div
                      key={p}
                      className="absolute top-0 bottom-0 w-px"
                      style={{ left: `${p}%`, background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.08), transparent)' }}
                    />
                  ))}
                  {/* Mount points */}
                  {[[0,0],[100,0],[0,100],[100,100],[50,50]].map(([x,y], i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        background: i === 4 ? 'rgba(217,31,38,0.4)' : 'rgba(255,255,255,0.15)',
                        border: `1px solid ${i === 4 ? 'rgba(217,31,38,0.6)' : 'rgba(255,255,255,0.2)'}`,
                        boxShadow: i === 4 ? '0 0 12px rgba(217,31,38,0.3)' : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div
                className="absolute bottom-3 right-4 text-xs font-mono opacity-30"
                style={{ color: '#D91F26' }}
              >
                MK2 / SUBFRAME ASSEMBLY
              </div>
            </div>
          </div>

          <h2
            className="section-title text-3xl sm:text-4xl lg:text-5xl max-w-3xl mx-auto fade-up-element"
            style={{ transitionDelay: '0.1s' }}
          >
            Engineered as a complete system —{' '}
            <span className="text-soft-grey font-normal">not just individual parts.</span>
          </h2>
          <p
            className="text-soft-grey mt-6 max-w-lg mx-auto text-base fade-up-element"
            style={{ transitionDelay: '0.2s' }}
          >
            Every component is selected to work together. Braking, suspension, fitment — designed as one cohesive performance solution.
          </p>
        </div>
      </section>

      {/* ─── Section 6: Why CMP ──────────────────────────────────────── */}
      <section className="relative py-28 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-eyebrow mb-4 fade-up-element">Why CMP</p>
            <h2 className="section-title text-3xl sm:text-4xl fade-up-element" style={{ transitionDelay: '0.1s' }}>
              Built on Four Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Zap size={22} className="text-primary-red" />,
                title: 'Precision',
                text: 'Exact fitment. Measured outcomes. No guesswork — every upgrade is engineered to spec.',
                delay: '0s',
              },
              {
                icon: <Award size={22} className="text-primary-red" />,
                title: 'Performance',
                text: 'Results you feel immediately. Sharper braking. Better control. More confidence.',
                delay: '0.1s',
              },
              {
                icon: <Shield size={22} className="text-primary-red" />,
                title: 'Quality',
                text: 'Only materials and components that meet our standard. Nothing that compromises long-term reliability.',
                delay: '0.2s',
              },
              {
                icon: <Users size={22} className="text-primary-red" />,
                title: 'Enthusiast-Driven',
                text: 'Built by people who care about the Mk2 platform as much as you do.',
                delay: '0.3s',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-card p-7 fade-up-element"
                style={{ transitionDelay: item.delay }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(217,31,38,0.1)', border: '1px solid rgba(217,31,38,0.2)' }}
                >
                  {item.icon}
                </div>
                <h3 className="text-text-white font-display font-semibold text-lg mb-3">{item.title}</h3>
                <p className="text-soft-grey text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 7: CTA Banner ───────────────────────────────────── */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0606 0%, #130808 50%, #0a0a0a 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(217,31,38,0.3) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(217,31,38,0.5), transparent)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="section-eyebrow mb-5 fade-up-element">Let's Build</p>
          <h2
            className="section-title text-4xl sm:text-5xl lg:text-6xl mb-6 fade-up-element"
            style={{ transitionDelay: '0.1s' }}
          >
            Ready to upgrade your build?
          </h2>
          <p
            className="text-soft-grey text-lg mb-10 fade-up-element"
            style={{ transitionDelay: '0.2s' }}
          >
            Let's talk about the right setup for your project.
          </p>
          <div
            className="flex flex-wrap justify-center gap-4 fade-up-element"
            style={{ transitionDelay: '0.3s' }}
          >
            <Link to="/kontakti" className="btn-primary">
              Contact Us
              <ArrowRight size={16} />
            </Link>
            <Link to="/produkti" className="btn-secondary">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
