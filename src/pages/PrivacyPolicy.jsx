import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPolicy() {
  const { lang } = useLanguage();

  const content = {
    lv: {
      title: 'Privātuma Politika',
      updated: 'Pēdējo reizi atjaunināts: 2025. gads',
      sections: [
        {
          heading: '1. Vispārīga informācija',
          text: 'Classic Motion Performance (turpmāk — CMP) ir apņēmusies aizsargāt jūsu privātumu. Šī privātuma politika paskaidro, kā mēs apkopojam, izmantojam un aizsargājam jūsu personas datus, kad apmeklējat mūsu vietni cmp-performance.lv.',
        },
        {
          heading: '2. Kādus datus mēs apkopojam',
          text: 'Mēs varam apkopot šādu informāciju:\n• Vārds un uzvārds\n• Tālruņa numurs\n• E-pasta adrese\n• Informācija par jūsu automašīnu\n• Ziņojumu saturs, kas tiek nosūtīts caur kontaktformu',
        },
        {
          heading: '3. Kā mēs izmantojam jūsu datus',
          text: 'Jūsu dati tiek izmantoti tikai šādiem mērķiem:\n• Atbildēšanai uz jūsu pieprasījumiem un jautājumiem\n• Pasūtījumu apstrādei un saziņai par tiem\n• Pakalpojumu uzlabošanai\n\nMēs nekad nepārdodam, neīrējam un nekopīgojam jūsu datus ar trešajām pusēm komerciāliem mērķiem.',
        },
        {
          heading: '4. Sīkdatnes (Cookies)',
          text: 'Mūsu vietne var izmantot tehniskās sīkdatnes, kas nodrošina vietnes pareizu darbību. Mēs neizmantojam izsekošanas vai mārketinga sīkdatnes.',
        },
        {
          heading: '5. Datu glabāšana',
          text: 'Jūsu personas dati tiek glabāti tik ilgi, cik nepieciešams mūsu pakalpojumu sniegšanai vai cik to pieprasa normatīvie akti. Pēc tam dati tiek droši dzēsti.',
        },
        {
          heading: '6. Jūsu tiesības',
          text: 'Jums ir tiesības:\n• Piekļūt saviem personas datiem\n• Labot neprecīzus datus\n• Pieprasīt datu dzēšanu\n• Atsaukt piekrišanu datu apstrādei\n\nLai izmantotu šīs tiesības, sazinieties ar mums: info@cmp-performance.lv',
        },
        {
          heading: '7. Kontakti',
          text: 'Ja jums ir jautājumi par šo privātuma politiku, sazinieties ar mums:\n\nE-pasts: info@cmp-performance.lv\nTālrunis: +371 29147322',
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      updated: 'Last updated: 2025',
      sections: [
        {
          heading: '1. General Information',
          text: 'Classic Motion Performance (hereinafter — CMP) is committed to protecting your privacy. This privacy policy explains how we collect, use, and protect your personal data when you visit our website cmp-performance.lv.',
        },
        {
          heading: '2. What Data We Collect',
          text: 'We may collect the following information:\n• Full name\n• Phone number\n• Email address\n• Information about your vehicle\n• Message content submitted through the contact form',
        },
        {
          heading: '3. How We Use Your Data',
          text: 'Your data is used only for the following purposes:\n• Responding to your enquiries and questions\n• Processing orders and communicating about them\n• Improving our services\n\nWe never sell, rent, or share your data with third parties for commercial purposes.',
        },
        {
          heading: '4. Cookies',
          text: 'Our website may use technical cookies that ensure the proper functioning of the site. We do not use tracking or marketing cookies.',
        },
        {
          heading: '5. Data Retention',
          text: 'Your personal data is stored for as long as necessary to provide our services or as required by applicable law. After that, data is securely deleted.',
        },
        {
          heading: '6. Your Rights',
          text: 'You have the right to:\n• Access your personal data\n• Correct inaccurate data\n• Request data deletion\n• Withdraw consent to data processing\n\nTo exercise these rights, contact us at: info@cmp-performance.lv',
        },
        {
          heading: '7. Contact',
          text: 'If you have any questions about this privacy policy, please contact us:\n\nEmail: info@cmp-performance.lv\nPhone: +371 29147322',
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
          <h1 className="section-title text-4xl sm:text-5xl mb-3">{c.title}</h1>
          <p className="text-soft-grey/40 text-sm">{c.updated}</p>
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
