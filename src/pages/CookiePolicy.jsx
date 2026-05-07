import { useLanguage } from '../context/LanguageContext';

export default function CookiePolicy() {
  const { lang } = useLanguage();

  const content = {
    lv: {
      title: 'Sīkdatņu Politika',
      subtitle: 'CMP Classic Motion Performance sīkdatņu politika',
      updated: 'Pēdējoreiz atjaunināta: 2026. gada marts',
      intro: 'Šī sīkdatņu politika izskaidro, kā CMP Classic Motion Performance izmanto sīkdatnes un līdzīgas tehnoloģijas mūsu mājaslapā.',
      sections: [
        {
          heading: '1. Kas ir sīkdatnes?',
          text: 'Sīkdatnes (Cookies) ir nelieli teksta faili, kas tiek saglabāti jūsu ierīcē, kad apmeklējat mājaslapu. Tās palīdz nodrošināt mājaslapas darbību un uzlabot lietotāja pieredzi.',
        },
        {
          heading: '2. Kādas sīkdatnes mēs izmantojam?',
          text: '• Nepieciešamās sīkdatnes mājaslapas darbībai\n• Funkcionālās sīkdatnes lietotāja pieredzes uzlabošanai\n• Drošības un tehniskās sīkdatnes',
        },
        {
          heading: '3. Kontaktformas un Formspree',
          text: 'Mūsu mājaslapas kontaktformas var izmantot Formspree.com pakalpojumus, lai droši apstrādātu un nosūtītu iesniegtos ziņojumus. Formspree var izmantot tehniskās sīkdatnes vai līdzīgas tehnoloģijas pakalpojuma darbības nodrošināšanai.',
        },
        {
          heading: '4. Kā pārvaldīt sīkdatnes?',
          text: 'Jūs varat dzēst vai bloķēt sīkdatnes savā pārlūkprogrammā. Atsevišķas mājaslapas funkcijas var nedarboties korekti, ja sīkdatnes tiek atspējotas.',
        },
        {
          heading: '5. Izmaiņas politikā',
          text: 'CMP Classic Motion Performance patur tiesības periodiski atjaunināt šo sīkdatņu politiku. Izmaiņas stājas spēkā pēc publicēšanas mājaslapā.',
        },
        {
          heading: '6. Kontakti',
          text: 'CMP Classic Motion Performance\nE-pasts: info@cmp-performance.lv\nLatvija',
        },
      ],
    },
    en: {
      title: 'Cookie Policy',
      subtitle: 'CMP Classic Motion Performance Cookie Policy',
      updated: 'Last updated: March 2026',
      intro: 'This cookie policy explains how CMP Classic Motion Performance uses cookies and similar technologies on our website.',
      sections: [
        {
          heading: '1. What are cookies?',
          text: 'Cookies are small text files stored on your device when you visit a website. They help ensure the website functions properly and improve the user experience.',
        },
        {
          heading: '2. What cookies do we use?',
          text: '• Necessary cookies for website functionality\n• Functional cookies to improve user experience\n• Security and technical cookies',
        },
        {
          heading: '3. Contact Forms and Formspree',
          text: 'Our website contact forms may use Formspree.com services to securely process and deliver submitted messages. Formspree may use technical cookies or similar technologies to ensure the service operates correctly.',
        },
        {
          heading: '4. How to manage cookies?',
          text: 'You can delete or block cookies in your browser settings. Some website features may not function correctly if cookies are disabled.',
        },
        {
          heading: '5. Changes to this policy',
          text: 'CMP Classic Motion Performance reserves the right to periodically update this cookie policy. Changes take effect upon publication on the website.',
        },
        {
          heading: '6. Contact',
          text: 'CMP Classic Motion Performance\nEmail: info@cmp-performance.lv\nLatvia',
        },
      ],
    },
  };

  const c = content[lang] || content.lv;

  return (
    <main className="bg-base-black min-h-screen pt-[106px] md:pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <div className="red-line-accent mb-6" />
          <h1 className="section-title text-4xl sm:text-5xl mb-2">{c.title}</h1>
          <p className="text-soft-grey/60 text-sm mb-2">{c.subtitle}</p>
          <p className="text-soft-grey/40 text-sm mb-6">{c.updated}</p>
          <p className="text-soft-grey/70 text-sm leading-relaxed">{c.intro}</p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-8">
          {c.sections.map((s, i) => (
            <div key={i} className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h2 className="text-text-white font-display font-semibold text-base mb-3">{s.heading}</h2>
              <p className="text-soft-grey/70 text-sm leading-relaxed whitespace-pre-line">{s.text}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
