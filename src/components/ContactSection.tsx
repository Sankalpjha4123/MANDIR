import React, { useState } from 'react';
import { TEMPLE_INFO } from '../data/templeData';
import { TempleLocationMap } from './TempleLocationMap';

interface ContactSectionProps {
  lang: 'hi' | 'en';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'दर्शन एवं पूजा संबंधी पूछताछ',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({
        name: '',
        phone: '',
        email: '',
        subject: 'दर्शन एवं पूजा संबंधी पूछताछ',
        message: '',
      });
    }, 4000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 sm:py-20 w-full" id="contact-section">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs sm:text-sm uppercase tracking-widest text-[#9d2f00] font-bold">
          {lang === 'hi' ? 'तीर्थ स्थान व संपर्क' : 'Location & Contacts'}
        </span>
        <h2 className="font-serif-devanagari text-2xl sm:text-4xl text-[#2a170f] font-bold mt-2">
          {lang === 'hi' ? 'मंदिर संपर्क एवं मार्गदर्शिका' : 'Contact Mandir & Travel Directions'}
        </h2>
        <p className="text-sm sm:text-base text-[#5a4139] mt-3">
          {lang === 'hi'
            ? 'दर्शन, विशेष पूजा, अन्नदान अथवा आश्रम सेवा हेतु किसी भी समय संपर्क करें।'
            : 'Get in touch for darshan guidelines, ritual sponsorships, and ashram accommodation.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Cards & Travel info */}
        <div className="lg:col-span-6 space-y-4">
          {/* Address Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#ffe9e2] shadow-[0_4px_16px_rgba(44,24,16,0.06)] space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ffdbd0] text-[#9d2f00] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[22px]">location_on</span>
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#2a170f]">
                  {lang === 'hi' ? 'मंदिर का पावन पता' : 'Sacred Campus Address'}
                </h3>
                <p className="text-xs sm:text-sm text-[#5a4139] mt-1 leading-relaxed">
                  {TEMPLE_INFO.addressHi}
                </p>
                <p className="text-xs text-[#705100] font-semibold mt-1">
                  {lang === 'hi' ? 'पहचान स्थल: ' : 'Landmark: '} {TEMPLE_INFO.landmarkHi}
                </p>
              </div>
            </div>
          </div>

          {/* Direct Phone & Email Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#ffe9e2] shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ffdea3] text-[#705100] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">call</span>
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] text-[#8e7167] block uppercase font-bold">हेल्पलाइन नंबर</span>
                <a
                  href={`tel:${TEMPLE_INFO.phones[0]}`}
                  className="font-bold text-xs sm:text-sm text-[#9d2f00] hover:underline block truncate"
                >
                  {TEMPLE_INFO.phones[0]}
                </a>
                <a
                  href={`tel:${TEMPLE_INFO.phones[1]}`}
                  className="text-xs text-[#5a4139] hover:underline block truncate"
                >
                  {TEMPLE_INFO.phones[1]}
                </a>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#ffe9e2] shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ffd9e4] text-[#a82d68] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] text-[#8e7167] block uppercase font-bold">आधिकारिक ईमेल</span>
                <a
                  href={`mailto:${TEMPLE_INFO.email}`}
                  className="font-bold text-xs text-[#a82d68] hover:underline block truncate"
                >
                  {TEMPLE_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Transit & Commute Info */}
          <div className="bg-[#fff1ec] p-6 rounded-2xl border border-[#ffe9e2] space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#2a170f] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9d2f00] text-[18px]">directions_transit</span>
              <span>{lang === 'hi' ? 'आवागमन एवं निकटतम मार्ग' : 'How to Reach the Mandir'}</span>
            </h4>
            <div className="space-y-2 text-xs text-[#5a4139]">
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#9d2f00] shrink-0">मेट्रो:</span>
                <span>निकटतम स्टेशन गोकुलपुरी (पिंक लाइन) अथवा शिव विहार मेट्रो स्टेशन से ई-रिक्शा उपलब्ध।</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#9d2f00] shrink-0">सड़क मार्ग:</span>
                <span>खजूरी खास / सोनिया विहार मार्ग होते हुए सभापुर, राम रहीम चौक मिलन गार्डन।</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#9d2f00] shrink-0">पार्किंग:</span>
                <span>मंदिर परिसर के पास दोपहिया एवं चारपहिया वाहनों हेतु निःशुल्क सुरक्षित पार्किंग।</span>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp CTA */}
          <a
            href={`https://wa.me/${TEMPLE_INFO.whatsapp}?text=${encodeURIComponent(
              'जय श्री राधे! श्री १००८ नवचेतना शिव शक्ति मंदिर दर्शन के संबंध में जानकारी चाहिए।'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>{lang === 'hi' ? 'WhatsApp पर सीधा संदेश भेजें' : 'Message on WhatsApp'}</span>
          </a>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#ffe9e2] shadow-[0_4px_24px_rgba(44,24,16,0.06)]">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider text-[#9d2f00] font-bold">
                {lang === 'hi' ? 'संदेश एवं प्रार्थना' : 'Devotee Desk'}
              </span>
              <h3 className="font-serif-devanagari text-xl sm:text-2xl text-[#2a170f] font-bold mt-1">
                {lang === 'hi' ? 'मंदिर कार्यालय को संदेश भेजें' : 'Send Message to Mandir Office'}
              </h3>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#705100] mb-1">
                    {lang === 'hi' ? 'आपका पूरा नाम *' : 'Your Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="उदा: विजय कुमार"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#705100] mb-1">
                      {lang === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#705100] mb-1">
                      {lang === 'hi' ? 'ईमेल (वैकल्पिक)' : 'Email'}
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="devotee@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#705100] mb-1">
                    {lang === 'hi' ? 'विषय (Subject)' : 'Subject'}
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  >
                    <option value="दर्शन एवं पूजा संबंधी पूछताछ">दर्शन एवं पूजा संबंधी पूछताछ</option>
                    <option value="अन्नदान एवं गौशाला सेवा सहयोग">अन्नदान एवं गौशाला सेवा सहयोग</option>
                    <option value="विशेष यजमान संकल्प एवं अनुष्ठान">विशेष यजमान संकल्प एवं अनुष्ठान</option>
                    <option value="दान रसीद एवं 80G प्रमाण पत्र">दान रसीद एवं 80G प्रमाण पत्र</option>
                    <option value="अन्य सामान्य जानकारी">अन्य सामान्य जानकारी</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#705100] mb-1">
                    {lang === 'hi' ? 'संदेश या प्रार्थना विवरण *' : 'Message *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="कृपया अपना संदेश यहाँ लिखें..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-xl text-sm font-bold shadow-md transition-colors"
                >
                  {lang === 'hi' ? 'संदेश प्रेषित करें' : 'Submit Message'}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-serif text-lg font-bold text-[#2a170f]">
                  {lang === 'hi' ? 'आपका संदेश प्राप्त हुआ!' : 'Message Received!'}
                </h4>
                <p className="text-xs text-[#5a4139]">
                  {lang === 'hi'
                    ? 'मंदिर कार्यालय प्रतिनिधि शीघ्र ही आपके संपर्क नंबर पर सहायता प्रदान करेंगे। जय श्री राधे!'
                    : 'A temple office representative will connect with you shortly.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Google Map of Mandir */}
      <div className="mt-12">
        <TempleLocationMap lang={lang} />
      </div>
    </section>
  );
};
