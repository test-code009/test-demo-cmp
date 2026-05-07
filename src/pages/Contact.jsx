import { useState } from 'react';
import { Mail, Phone, ArrowRight, Send } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import t from '../lib/translations';

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const ContactHeroBg = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #080808 0%, #100808 40%, #0a0a0a 100%)' }} />
    <div className="absolute bottom-0 right-0 w-[700px] h-[500px] opacity-15"
      style={{ background: 'radial-gradient(ellipse, rgba(217,31,38,0.45) 0%, transparent 70%)', transform: 'translate(20%, 20%)' }} />
    <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, #060606, transparent)' }} />
  </div>
);

export default function Contact() {
  useScrollReveal();
  const { lang } = useLanguage();
  const tr = t[lang];
  const [formData, setFormData] = useState({ name: '', email: '', car: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  const contactItems = [
    { icon: <Mail size={16} className="text-primary-red" />, label: tr.contact_email_label, value: 'info@classicmotionperformance.com', href: 'mailto:info@classicmotionperformance.com' },
    { icon: <Phone size={16} className="text-primary-red" />, label: tr.contact_phone_label, value: '+371 29147322', href: 'tel:+37129147322' },
    { icon: <span className="text-primary-red"><InstagramIcon /></span>, label: tr.contact_ig_label, value: '@classicmotionperformance', href: 'https://instagram.com/classicmotionperformance' },
  ];

  const formFields = [
    { name: 'name', label: tr.contact_name, type: 'text', placeholder: 'Jānis Bērziņš' },
    { name: 'email', label: tr.contact_email, type: 'email', placeholder: 'your@email.com' },
    { name: 'car', label: tr.contact_car, type: 'text', placeholder: tr.contact_car_placeholder },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <ContactHeroBg />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-20 md:pt-48 w-full">
          <p className="section-eyebrow mb-4 fade-up-element">{tr.contact_eyebrow}</p>
          <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl mb-5 fade-up-element" style={{ transitionDelay: '0.1s' }}>
            {tr.contact_title}
          </h1>
          <p className="text-soft-grey text-lg max-w-xl fade-up-element" style={{ transitionDelay: '0.2s' }}>
            {tr.contact_subtitle}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-base-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left — Form */}
            <div className="fade-up-element">
              {submitted ? (
                <div className="rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(17,17,17,0.9) 0%, rgba(23,23,23,0.95) 100%)', border: '1px solid rgba(255,255,255,0.07)', minHeight: '420px' }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: 'rgba(217,31,38,0.1)', border: '1px solid rgba(217,31,38,0.3)' }}>
                    <Send size={22} className="text-primary-red" />
                  </div>
                  <h3 className="section-title text-2xl mb-3">{tr.contact_sent_title}</h3>
                  <p className="text-soft-grey text-sm leading-relaxed max-w-xs">{tr.contact_sent_desc}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {formFields.map((field) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="block text-xs uppercase tracking-[0.15em] text-soft-grey mb-2 font-semibold">
                        {field.label}
                      </label>
                      <input
                        id={field.name} name={field.name} type={field.type} required
                        placeholder={field.placeholder} value={formData[field.name]} onChange={handleChange}
                        className="w-full text-text-white text-sm rounded-xl px-5 py-4 outline-none transition-all duration-300 placeholder-soft-grey/40"
                        style={{ background: 'rgba(23,23,23,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}
                        onFocus={(e) => { e.target.style.borderColor = 'rgba(217,31,38,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(217,31,38,0.08)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-[0.15em] text-soft-grey mb-2 font-semibold">
                      {tr.contact_message}
                    </label>
                    <textarea
                      id="message" name="message" required rows={5}
                      placeholder={tr.contact_message_placeholder}
                      value={formData.message} onChange={handleChange}
                      className="w-full text-text-white text-sm rounded-xl px-5 py-4 outline-none transition-all duration-300 placeholder-soft-grey/40 resize-none"
                      style={{ background: 'rgba(23,23,23,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(217,31,38,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(217,31,38,0.08)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <button type="submit" className="btn-primary justify-center mt-2">
                    {tr.contact_send} <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Right — Details */}
            <div className="fade-up-element" style={{ transitionDelay: '0.15s' }}>
              <div className="red-line-accent" />
              <h2 className="section-title text-2xl sm:text-3xl mb-5">{tr.contact_reply_title}</h2>
              <p className="text-soft-grey text-sm leading-relaxed mb-10">{tr.contact_reply_desc}</p>

              <div className="flex flex-col gap-4 mb-10">
                {contactItems.map((item) => (
                  <a key={item.label} href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                    style={{ background: 'rgba(17,17,17,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(217,31,38,0.25)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(217,31,38,0.08)', border: '1px solid rgba(217,31,38,0.15)' }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-soft-grey/60 text-xs uppercase tracking-widest mb-0.5">{item.label}</p>
                      <p className="text-text-white text-sm group-hover:text-primary-red transition-colors duration-200">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="rounded-2xl p-7 overflow-hidden relative"
                style={{ background: 'linear-gradient(135deg, rgba(15,6,6,0.9) 0%, rgba(20,10,10,0.95) 100%)', border: '1px solid rgba(217,31,38,0.12)' }}>
                <div className="absolute top-0 right-0 w-40 h-40 opacity-20 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(217,31,38,0.5) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <p className="section-eyebrow mb-3">{tr.contact_response_eyebrow}</p>
                <p className="text-text-white font-display font-semibold text-sm mb-2">{tr.contact_response_title}</p>
                <p className="text-soft-grey/60 text-xs leading-relaxed">{tr.contact_response_desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
