import { useLanguage } from '../context/LanguageContext';

export default function TermsOfService() {
  const { lang } = useLanguage();

  const content = {
    lv: {
      title: 'Lietošanas Noteikumi',
      subtitle: 'CMP Classic Motion Performance lietošanas noteikumi',
      updated: 'Pēdējoreiz atjaunināts: 2026. gada 7. maijs',
      sections: [
        {
          heading: '1. Vispārīgie noteikumi',
          text: 'Izmantojot šo mājaslapu, jūs piekrītat ievērot šos lietošanas noteikumus un piemērojamos normatīvos aktus.',
        },
        {
          heading: '2. Intelektuālais īpašums',
          text: 'Visa mājaslapā pieejamā informācija, dizains, logo, attēli un saturs pieder CMP Classic Motion Performance vai tiek izmantoti ar atļauju.',
        },
        {
          heading: '3. Mājaslapas izmantošana',
          text: 'Lietotāji nedrīkst izmantot mājaslapu nelikumīgiem mērķiem vai darbībām, kas var kaitēt mājaslapas darbībai.',
        },
        {
          heading: '4. Produktu un informācijas precizitāte',
          text: 'Mēs cenšamies nodrošināt precīzu informāciju, taču negarantējam, ka visa informācija vienmēr būs pilnīgi precīza vai aktuāla.',
        },
        {
          heading: '5. Atbildības ierobežojums',
          text: 'CMP Classic Motion Performance nav atbildīgs par tiešiem vai netiešiem zaudējumiem, kas radušies, izmantojot mājaslapu.',
        },
        {
          heading: '6. Trešo pušu saites',
          text: 'Mājaslapā var būt saites uz trešo pušu vietnēm. Mēs neuzņemamies atbildību par šo vietņu saturu vai drošību.',
        },
        {
          heading: '7. Izmaiņas noteikumos',
          text: 'Mēs paturam tiesības jebkurā laikā mainīt vai papildināt šos lietošanas noteikumus.',
        },
        {
          heading: '8. Kontakti',
          text: 'CMP Classic Motion Performance\nE-pasts: info@cmp-performance.lv\nLatvija',
        },
      ],
    },
    en: {
      title: 'Terms of Service',
      subtitle: 'CMP Classic Motion Performance Terms of Service',
      updated: 'Last updated: May 7, 2026',
      sections: [
        {
          heading: '1. General Terms',
          text: 'By using this website, you agree to comply with these terms of service and applicable laws and regulations.',
        },
        {
          heading: '2. Intellectual Property',
          text: 'All information, designs, logos, images, and content available on this website belong to CMP Classic Motion Performance or are used with permission.',
        },
        {
          heading: '3. Use of Website',
          text: 'Users may not use this website for unlawful purposes or activities that may harm the operation of the website.',
        },
        {
          heading: '4. Accuracy of Products and Information',
          text: 'We strive to provide accurate information, but we do not guarantee that all information will always be completely accurate or up to date.',
        },
        {
          heading: '5. Limitation of Liability',
          text: 'CMP Classic Motion Performance is not liable for any direct or indirect damages arising from the use of this website.',
        },
        {
          heading: '6. Third-Party Links',
          text: 'This website may contain links to third-party websites. We assume no responsibility for the content or security of these sites.',
        },
        {
          heading: '7. Changes to Terms',
          text: 'We reserve the right to modify or update these terms of service at any time.',
        },
        {
          heading: '8. Contact',
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
