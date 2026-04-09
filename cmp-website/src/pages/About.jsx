import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const AboutHeroBg = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(160deg, #080808 0%, #0f0a0a 40%, #0a0a0a 100%)' }}
    />
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-15"
      style={{ background: 'radial-gradient(ellipse, rgba(217,31,38,0.4) 0%, transparent 70%)' }}
    />
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }}
    />
    <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, #060606, transparent)' }} />
  </div>
);

export default function About() {
  useScrollReveal();

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <AboutHeroBg />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-40 w-full">
          <p className="section-eyebrow mb-4 fade-up-element">Who We Are</p>
          <h1
            className="section-title text-5xl sm:text-6xl lg:text-7xl mb-5 fade-up-element"
            style={{ transitionDelay: '0.1s' }}
          >
            About Classic Motion
            <br />
            <span className="text-gradient-red">Performance</span>
          </h1>
          <p className="text-soft-grey text-lg max-w-xl fade-up-element" style={{ transitionDelay: '0.2s' }}>
            Driven by automotive culture. Focused on refined performance.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-28 bg-charcoal overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <div className="red-line-accent fade-up-element" />
              <h2
                className="section-title text-3xl sm:text-4xl mb-6 fade-up-element"
                style={{ transitionDelay: '0.05s' }}
              >
                The CMP Story
              </h2>
              <p className="text-soft-grey text-base leading-relaxed mb-5 fade-up-element" style={{ transitionDelay: '0.1s' }}>
                Classic Motion Performance is built around a simple idea: performance upgrades should feel as good as they look. We focus on solutions that improve driving confidence, maintain a clean visual identity, and respect the character of each build.
              </p>
              <p className="text-soft-grey/70 text-sm leading-relaxed fade-up-element" style={{ transitionDelay: '0.15s' }}>
                Our approach combines engineering-minded thinking with enthusiast culture, creating upgrade solutions that feel purposeful, cohesive, and premium. Not just parts. A considered direction for your build.
              </p>
            </div>

            {/* Right — visual detail block */}
            <div
              className="rounded-2xl p-8 fade-up-element"
              style={{
                transitionDelay: '0.2s',
                background: 'linear-gradient(135deg, rgba(17,17,17,0.9) 0%, rgba(23,23,23,0.95) 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex flex-col gap-6">
                {[
                  { label: 'Focus', value: 'Volkswagen Golf Mk2' },
                  { label: 'Specialisation', value: 'Brake & Suspension Upgrades' },
                  { label: 'Philosophy', value: 'Performance with Visual Intent' },
                  { label: 'Approach', value: 'Enthusiast-First, Always' },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-4"
                    style={{ borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                  >
                    <span className="text-soft-grey/60 text-sm uppercase tracking-widest text-xs">{item.label}</span>
                    <span className="text-text-white text-sm font-medium font-display">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-28 bg-base-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-eyebrow mb-4 fade-up-element">What Drives Us</p>
            <h2
              className="section-title text-3xl sm:text-4xl fade-up-element"
              style={{ transitionDelay: '0.1s' }}
            >
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Precision',
                text: 'We do not guess. Every solution is measured against the demands of the Mk2 platform — technically and visually.',
                number: '01',
                delay: '0s',
              },
              {
                title: 'Integrity',
                text: 'We recommend what is right for your build. Nothing more, nothing less. Honest advice, no overselling.',
                number: '02',
                delay: '0.1s',
              },
              {
                title: 'Quality',
                text: 'Only materials and components that meet a standard we are personally confident in. Full stop.',
                number: '03',
                delay: '0.2s',
              },
              {
                title: 'Passion',
                text: 'The Mk2 is not just a product category for us. It is a culture we are part of and genuinely care about.',
                number: '04',
                delay: '0.3s',
              },
            ].map((v) => (
              <div
                key={v.title}
                className="glass-card p-8 flex flex-col fade-up-element"
                style={{ transitionDelay: v.delay }}
              >
                <span
                  className="text-4xl font-display font-bold mb-5 block leading-none"
                  style={{ color: 'rgba(217,31,38,0.12)' }}
                >
                  {v.number}
                </span>
                <h3 className="text-text-white font-display font-semibold text-lg mb-3">{v.title}</h3>
                <p className="text-soft-grey text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / Cinematic Separator */}
      <section
        className="relative py-36 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0606 0%, #110808 50%, #0a0a0a 100%)' }}
      >
        {/* Dramatic red spotlight */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(217,31,38,0.12) 0%, transparent 65%)' }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(217,31,38,0.4), transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(217,31,38,0.2), transparent)' }}
        />
        {/* Subtle scan lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 6px)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="fade-up-element">
            <p
              className="text-[11px] uppercase tracking-[0.35em] text-primary-red/60 mb-8 font-semibold"
            >
              — CMP Philosophy
            </p>
            <blockquote
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#F5F5F5' }}
            >
              Performance is not noise.
              <br />
              <span className="text-gradient-red">It is control.</span>
            </blockquote>
            <div
              className="w-12 h-px mx-auto mt-10"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(217,31,38,0.6), transparent)' }}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="section-title text-3xl sm:text-4xl mb-5 fade-up-element">
            Ready to talk about your build?
          </h2>
          <p className="text-soft-grey mb-10 fade-up-element" style={{ transitionDelay: '0.1s' }}>
            We work personally with every enquiry. Tell us what you are building and we will give you an honest answer.
          </p>
          <div className="flex flex-wrap justify-center gap-4 fade-up-element" style={{ transitionDelay: '0.2s' }}>
            <Link to="/kontakti" className="btn-primary">
              Get in Touch
              <ArrowRight size={16} />
            </Link>
            <Link to="/produkti" className="btn-secondary">
              View Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
