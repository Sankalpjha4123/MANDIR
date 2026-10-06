import React from 'react';
import { TEMPLE_INFO } from '../data/templeData';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  lang: 'hi' | 'en';
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, lang, onOpenAdmin }) => {
  const navigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#fff1ec] border-t border-[#ffe9e2] text-[#5a4139] mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Temple Info & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                alt="Sacred Om Emblem"
                className="h-9 w-auto object-contain"
                src={TEMPLE_INFO.omLogoUrl}
              />
              <span className="font-serif-devanagari text-lg text-[#9d2f00] font-bold">
                {TEMPLE_INFO.nameHi}
              </span>
            </div>
            <p className="font-serif text-sm text-[#705100] font-semibold tracking-wide">
              {lang === 'hi' ? 'श्रद्धा • सेवा • संस्कार' : 'Faith • Service • Sacred Traditions'}
            </p>
            <p className="text-xs sm:text-sm text-[#5a4139] leading-relaxed">
              {lang === 'hi'
                ? 'प्राचीन वैदिक परंपरा, सनातन संस्कृति और दिव्य आध्यात्मिक चेतना का परम पावन तीर्थ केंद्र। आइए और अलौकिक शांति का अनुभव कीजिए।'
                : 'A sacred sanctuary of Vedic tradition, Sanatana heritage, and profound spiritual peace. Experience divine bliss and tranquility.'}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={`https://wa.me/${TEMPLE_INFO.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-[#ffe9e2] flex items-center justify-center text-[#9d2f00] hover:bg-[#9d2f00] hover:text-white transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
              </a>
              <a
                href="tel:+918470092721"
                aria-label="Phone"
                className="w-8 h-8 rounded-full bg-[#ffe9e2] flex items-center justify-center text-[#9d2f00] hover:bg-[#9d2f00] hover:text-white transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
              </a>
              <a
                href={`mailto:${TEMPLE_INFO.email}`}
                aria-label="Email"
                className="w-8 h-8 rounded-full bg-[#ffe9e2] flex items-center justify-center text-[#9d2f00] hover:bg-[#9d2f00] hover:text-white transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">mail</span>
              </a>
              <button
                type="button"
                onClick={onOpenAdmin}
                title="Trust Portal"
                className="w-8 h-8 rounded-full bg-[#ffe9e2] flex items-center justify-center text-[#9d2f00] hover:bg-[#9d2f00] hover:text-white transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-base text-[#2a170f] font-semibold">
              {lang === 'hi' ? 'तीर्थ व दर्शन कड़ियां' : 'Quick Sacred Links'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('darshan')}
                  className="flex items-center gap-2 hover:text-[#9d2f00] transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#9d2f00]">chevron_right</span>
                  <span>{lang === 'hi' ? 'दैनिक आरती एवं पूजन समय' : 'Daily Aarti & Timings'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('deities')}
                  className="flex items-center gap-2 hover:text-[#9d2f00] transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#9d2f00]">chevron_right</span>
                  <span>{lang === 'hi' ? 'आराध्य देव गर्भगृह दर्शन' : 'Deities Sanctum'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('darshan')}
                  className="flex items-center gap-2 hover:text-[#9d2f00] transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#9d2f00]">chevron_right</span>
                  <span>{lang === 'hi' ? 'विशेष दर्शन पास पंजीयन' : 'VIP Darshan Pass'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('donation')}
                  className="flex items-center gap-2 hover:text-[#9d2f00] transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#9d2f00]">chevron_right</span>
                  <span>{lang === 'hi' ? 'ऑनलाइन ई-दान एवं 80G रसीद' : 'Online Donation & 80G Receipt'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('festivals')}
                  className="flex items-center gap-2 hover:text-[#9d2f00] transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#9d2f00]">chevron_right</span>
                  <span>{lang === 'hi' ? 'उत्सव, अन्नक्षेत्र व गौशाला' : 'Festivals & Gaushala Seva'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Daily Timing Box */}
          <div className="space-y-3">
            <h3 className="font-serif text-base text-[#2a170f] font-semibold">
              {lang === 'hi' ? 'मंदिर समय सारिणी' : 'Temple Timetable'}
            </h3>
            <div className="space-y-2 text-xs">
              <div className="bg-[#fff8f6] p-3 rounded-xl border border-[#ffe9e2] shadow-sm">
                <p className="font-bold text-[#9d2f00]">
                  {lang === 'hi' ? 'प्रात:कालीन दर्शन' : 'Morning Darshan'}
                </p>
                <p className="text-[#2a170f] font-medium">05:30 AM – 12:30 PM</p>
                <p className="text-[#705100] mt-0.5 font-semibold">
                  {lang === 'hi' ? 'मंगला आरती: 08:00 AM' : 'Mangala Aarti: 08:00 AM'}
                </p>
              </div>

              <div className="bg-[#fff8f6] p-3 rounded-xl border border-[#ffe9e2] shadow-sm">
                <p className="font-bold text-[#a82d68]">
                  {lang === 'hi' ? 'सायंकालीन दर्शन' : 'Evening Darshan'}
                </p>
                <p className="text-[#2a170f] font-medium">04:30 PM – 09:30 PM</p>
                <p className="text-[#705100] mt-0.5 font-semibold">
                  {lang === 'hi' ? 'संध्या महाआरती: 09:00 PM' : 'Maha Aarti: 09:00 PM'}
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h3 className="font-serif text-base text-[#2a170f] font-semibold">
              {lang === 'hi' ? 'मंदिर संपर्क व स्थान' : 'Contact & Location'}
            </h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#9d2f00] text-[18px] shrink-0 mt-0.5">location_on</span>
                <span className="leading-relaxed">{TEMPLE_INFO.addressHi}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9d2f00] text-[18px] shrink-0">call</span>
                <span className="font-medium">+91 8470092721, +91 7982758754</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9d2f00] text-[18px] shrink-0">mail</span>
                <a
                  href={`mailto:${TEMPLE_INFO.email}`}
                  className="hover:text-[#9d2f00] transition-colors truncate underline"
                >
                  {TEMPLE_INFO.email}
                </a>
              </p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-[#ffe9e2] text-[#705100] text-xs font-semibold rounded-full">
                  {lang === 'hi' ? 'पवित्रता • शांति • भक्ति' : 'Purity • Peace • Devotion'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-6 border-t border-[#ffe9e2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-center sm:text-left">
          <p className="text-[#5a4139]">
            © {new Date().getFullYear()} {TEMPLE_INFO.trustNameHi}. {lang === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}{' '}
            <span className="text-[#9d2f00] font-semibold">{lang === 'hi' ? 'श्रद्धापूर्वक निर्मित' : 'Crafted with Devotion'}</span>
          </p>
          <div className="flex items-center gap-4 text-[#5a4139]">
            <button
              type="button"
              onClick={() => navigate('about')}
              className="hover:text-[#9d2f00] transition-colors"
            >
              {lang === 'hi' ? 'ट्रस्ट विधान' : 'Trust Bylaws'}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => navigate('contact')}
              className="hover:text-[#9d2f00] transition-colors"
            >
              {lang === 'hi' ? 'मार्गदर्शिका' : 'Directions'}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="hover:text-[#9d2f00] transition-colors"
            >
              {lang === 'hi' ? 'ट्रस्ट व्यवस्थापन' : 'Trust Admin'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
