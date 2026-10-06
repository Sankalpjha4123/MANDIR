import React, { useState } from 'react';
import { DEITIES_DATA, Deity } from '../data/templeData';
import { playTempleBell, playConchSound } from '../utils/audioEngine';

interface DeitiesSanctumProps {
  lang: 'hi' | 'en';
  onSelectDeity?: (deity: Deity) => void;
}

export const DeitiesSanctum: React.FC<DeitiesSanctumProps> = ({ lang }) => {
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);
  const [flowerShowerActive, setFlowerShowerActive] = useState(false);
  const [diyaLit, setDiyaLit] = useState(false);
  const [prayerText, setPrayerText] = useState('');
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);

  const handleOpenDeity = (deity: Deity) => {
    setSelectedDeity(deity);
    setDiyaLit(false);
    setPrayerSubmitted(false);
    setPrayerText('');
  };

  const handleOfferFlowers = () => {
    playTempleBell();
    setFlowerShowerActive(true);
    setTimeout(() => {
      setFlowerShowerActive(false);
    }, 2500);
  };

  const handleLightDiya = () => {
    playTempleBell();
    setDiyaLit(!diyaLit);
  };

  const handleSendPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerText.trim()) return;
    playConchSound();
    setPrayerSubmitted(true);
    setTimeout(() => {
      setPrayerSubmitted(false);
      setPrayerText('');
    }, 4000);
  };

  return (
    <section className="w-full bg-[#fff1ec] py-16 sm:py-20" id="deities-section">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#9d2f00] font-bold">
            {lang === 'hi' ? 'पावन देवालय दर्शन' : 'Sacred Sanctum Tour'}
          </span>
          <h2 className="font-serif-devanagari text-2xl sm:text-4xl text-[#2a170f] font-bold mt-2">
            {lang === 'hi' ? 'हमारे आराध्य देव' : 'Our Divine Deities'}
          </h2>
          <p className="text-sm sm:text-base text-[#5a4139] mt-3">
            {lang === 'hi'
              ? 'मंदिर के भव्य गर्भगृहों में विराजमान साक्षात दिव्य स्वरूपों के दर्शन कर पुण्य लाभ अर्जित करें।'
              : 'Witness the consecrated murtis in sacred sanctums and receive divine blessings.'}
          </p>
        </div>

        {/* 6 Deities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DEITIES_DATA.map((deity) => (
            <div
              key={deity.id}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(44,24,16,0.06)] hover:shadow-[0_12px_28px_rgba(44,24,16,0.12)] hover:-translate-y-1 transition-all group flex flex-col justify-between border border-[#ffe9e2]"
            >
              {/* Deity Image with gradient overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={deity.nameHi}
                  src={deity.imageUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#422b22] via-[#422b22]/30 to-transparent" />

                {/* Badge top-left */}
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#9d2f00] text-white text-xs font-bold shadow">
                    {lang === 'hi' ? deity.titleHi.split('•')[0] : deity.titleEn.split('•')[0]}
                  </span>
                </div>

                {/* Bottom title */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-bold drop-shadow">
                    {lang === 'hi' ? deity.nameHi : deity.nameEn}
                  </h3>
                  <p className="text-xs text-[#ffdea3] font-medium mt-0.5">
                    {lang === 'hi' ? deity.specialDayHi : deity.specialDayEn}
                  </p>
                </div>
              </div>

              {/* Deity Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Shloka banner */}
                  <div className="font-serif text-base text-[#9d2f00] font-bold text-center py-2 bg-[#fff1ec] rounded-xl mb-3 border border-[#ffe9e2] tracking-wider">
                    {deity.mantra}
                  </div>

                  <p className="text-xs sm:text-sm text-[#5a4139] leading-relaxed">
                    {lang === 'hi' ? deity.descriptionHi : deity.descriptionEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ffe9e2] flex items-center justify-between">
                  <span className="text-xs text-[#705100] font-semibold">
                    {lang === 'hi' ? deity.specialTimingHi.split('|')[0] : deity.specialTimingEn.split('|')[0]}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenDeity(deity)}
                    className="text-xs sm:text-sm text-[#9d2f00] font-bold hover:text-[#c63f02] inline-flex items-center gap-1 group/btn"
                  >
                    <span>{lang === 'hi' ? 'दर्शन व अर्पण' : 'Darshan & Seva'}</span>
                    <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deity Details & Virtual Offering Modal */}
      {selectedDeity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#fff8f6] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#b58a2a]/40 relative">
            {/* Flower Shower Animation Overlay */}
            {flowerShowerActive && (
              <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden flex justify-around">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span
                    key={i}
                    className="text-2xl animate-bounce"
                    style={{
                      animationDuration: `${0.8 + (i % 5) * 0.3}s`,
                      transform: `translateY(${Math.random() * 20}px)`,
                    }}
                  >
                    🌸
                  </span>
                ))}
              </div>
            )}

            {/* Modal Header */}
            <div className="relative h-60 sm:h-72 overflow-hidden rounded-t-3xl">
              <img
                src={selectedDeity.imageUrl}
                alt={selectedDeity.nameHi}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a170f] via-transparent to-black/30" />

              <button
                type="button"
                onClick={() => setSelectedDeity(null)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-[#9d2f00] text-xs font-bold mb-1">
                  {lang === 'hi' ? selectedDeity.titleHi : selectedDeity.titleEn}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                  {lang === 'hi' ? selectedDeity.nameHi : selectedDeity.nameEn}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Mantra display */}
              <div className="bg-[#fff1ec] p-4 rounded-2xl text-center border border-[#ffe9e2]">
                <p className="font-serif text-lg sm:text-xl text-[#9d2f00] font-bold">
                  {selectedDeity.mantra}
                </p>
                <p className="text-xs text-[#705100] mt-1 font-medium">
                  {lang === 'hi' ? selectedDeity.specialDayHi : selectedDeity.specialDayEn}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#5a4139] leading-relaxed">
                {lang === 'hi' ? selectedDeity.descriptionHi : selectedDeity.descriptionEn}
              </p>

              {/* Offerings list */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#705100] mb-2">
                  {lang === 'hi' ? 'प्रिय भोग एवं अर्पण सामग्रियां:' : 'Favored Offerings:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDeity.offerings.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#ffe9e2] text-[#9d2f00] rounded-full text-xs font-semibold"
                    >
                      ✦ {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Virtual Offering Strip */}
              <div className="bg-white p-4 rounded-2xl border border-[#ffe9e2] shadow-sm">
                <h4 className="font-serif text-sm font-bold text-[#2a170f] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#9d2f00] text-[18px]">flare</span>
                  <span>{lang === 'hi' ? 'आभासी पूजा अर्पण' : 'Offer Virtual Worship'}</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={handleOfferFlowers}
                    className="p-3 bg-[#fff1ec] hover:bg-[#ffe9e2] rounded-xl text-center text-xs font-bold text-[#9d2f00] flex flex-col items-center gap-1 transition-colors border border-[#ffe9e2]"
                  >
                    <span className="text-xl">🌸</span>
                    <span>{lang === 'hi' ? 'पुष्प अर्पण करें' : 'Offer Flowers'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLightDiya}
                    className={`p-3 rounded-xl text-center text-xs font-bold flex flex-col items-center gap-1 transition-colors border ${
                      diyaLit
                        ? 'bg-[#ffdea3] text-[#705100] border-[#b58a2a]'
                        : 'bg-[#fff1ec] text-[#9d2f00] border-[#ffe9e2] hover:bg-[#ffe9e2]'
                    }`}
                  >
                    <span className="text-xl">{diyaLit ? '🔥' : '🪔'}</span>
                    <span>{diyaLit ? (lang === 'hi' ? 'दीपक प्रज्वलित है' : 'Diya is Lit') : (lang === 'hi' ? 'दीपक प्रज्वलित करें' : 'Light Diya')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => playTempleBell()}
                    className="p-3 bg-[#fff1ec] hover:bg-[#ffe9e2] rounded-xl text-center text-xs font-bold text-[#9d2f00] flex flex-col items-center gap-1 transition-colors border border-[#ffe9e2] col-span-2 sm:col-span-1"
                  >
                    <span className="text-xl">🔔</span>
                    <span>{lang === 'hi' ? 'घंटानाद करें' : 'Ring Bell'}</span>
                  </button>
                </div>
              </div>

              {/* Prayer / Sankalpa Form */}
              <form onSubmit={handleSendPrayer} className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#705100]">
                  {lang === 'hi' ? 'अपनी मनोकामना या प्रार्थना लिखें:' : 'Offer a Prayer or Wish:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={prayerText}
                    onChange={(e) => setPrayerText(e.target.value)}
                    placeholder={
                      lang === 'hi'
                        ? 'उदा: परिवार के सुख-शांति एवं उत्तम स्वास्थ्य हेतु प्रार्थना...'
                        : 'e.g. Prayer for good health and family prosperity...'
                    }
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-colors shadow"
                  >
                    {lang === 'hi' ? 'प्रार्थना भेजें' : 'Send Prayer'}
                  </button>
                </div>
                {prayerSubmitted && (
                  <p className="text-xs text-green-700 font-semibold bg-green-50 p-2 rounded-lg border border-green-200">
                    {lang === 'hi'
                      ? '✓ आपकी पावन प्रार्थना गर्भगृह में समर्पित कर दी गई है। ईश्वर आपकी मनोकामना पूर्ण करें।'
                      : '✓ Your prayer has been offered at the sacred sanctum. May you be blessed with peace and joy.'}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
