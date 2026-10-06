import React from 'react';
import { TEMPLE_INFO } from '../data/templeData';

interface WelcomeSectionProps {
  onLearnMore: () => void;
  onOpenImage: (url: string, title: string) => void;
  lang: 'hi' | 'en';
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  onLearnMore,
  onOpenImage,
  lang,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 sm:py-20 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Narrative Left Column */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffe9e2] text-[#705100]">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span className="text-xs sm:text-sm font-semibold">
              {lang === 'hi' ? 'सनातन धर्म एवं वैदिक संस्कार' : 'Sanatana Dharma & Vedic Traditions'}
            </span>
          </div>

          <h2 className="font-serif-devanagari text-2xl sm:text-4xl text-[#9d2f00] font-bold tracking-tight leading-snug">
            {lang === 'hi'
              ? 'पवित्रता, शांति और साधना का अलौकिक धाम'
              : 'A Sacred Sanctuary of Purity, Peace and Spiritual Sadhana'}
          </h2>

          <p className="text-base sm:text-lg text-[#5a4139] leading-relaxed">
            {lang === 'hi'
              ? 'श्री १००८ नवचेतना शिव शक्ति केवल एक आराधनालय नहीं, अपितु शताब्दियों पुरानी वैदिक परंपरा, भक्तिरस और अध्यात्म का जागृत केंद्र है। यहाँ की पावन धूप, नित्य वेद घोष और घंटियों की मधुर ध्वनि मन को गहन अंतर्मुखी शांति प्रदान करती है।'
              : 'Shri 1008 Nav Chetna Shiv Shakti is not merely a temple; it is a vibrant center of ancient Vedic heritage, continuous devotional worship, and meditative silence. The fragrance of sacred incense, the rhythmic Vedic chants, and temple bells bring deep inner peace.'}
          </p>

          {/* 3 Devotional Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#fff1ec] p-4 rounded-2xl border border-[#ffe9e2] space-y-2 hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-[#9d2f00] text-[28px]">soup_kitchen</span>
              <h3 className="font-serif text-base text-[#2a170f] font-bold">
                {lang === 'hi' ? 'सात्विक अन्नदान' : 'Satvik Annadanam'}
              </h3>
              <p className="text-xs text-[#5a4139] leading-relaxed">
                {lang === 'hi'
                  ? 'नित्य सहस्रों भक्तों को निःशुल्क शुद्ध महाप्रसाद वितरण।'
                  : 'Free daily sanctified pure vegetarian food distribution.'}
              </p>
            </div>

            <div className="bg-[#fff1ec] p-4 rounded-2xl border border-[#ffe9e2] space-y-2 hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-[#705100] text-[28px]">menu_book</span>
              <h3 className="font-serif text-base text-[#2a170f] font-bold">
                {lang === 'hi' ? 'नित्य वेद पाठ' : 'Daily Veda Chanting'}
              </h3>
              <p className="text-xs text-[#5a4139] leading-relaxed">
                {lang === 'hi'
                  ? 'ऋग्वेद एवं यजुर्वेद का प्रातः-सांध्य सस्वर परायण।'
                  : 'Dawn and dusk recitation of sacred Rigveda & Yajurveda hymns.'}
              </p>
            </div>

            <div className="bg-[#fff1ec] p-4 rounded-2xl border border-[#ffe9e2] space-y-2 hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-[#a82d68] text-[28px]">pets</span>
              <h3 className="font-serif text-base text-[#2a170f] font-bold">
                {lang === 'hi' ? 'गौशाला सेवा' : 'Sacred Cow Seva'}
              </h3>
              <p className="text-xs text-[#5a4139] leading-relaxed">
                {lang === 'hi'
                  ? 'सैकड़ों देशी गौमाताओं का वात्सल्यपूर्ण संरक्षण एवं सेवा।'
                  : 'Nurturing and care of indigenous sacred cows at ashram gaushala.'}
              </p>
            </div>
          </div>

          {/* CTA Action */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onLearnMore}
              className="inline-flex items-center gap-2 bg-[#9d2f00] text-white text-sm sm:text-base font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#c63f02] hover:scale-[1.02] transition-all"
            >
              <span>{lang === 'hi' ? 'मंदिर का इतिहास एवं परंपरा' : 'Explore Mandir History'}</span>
              <span className="material-symbols-outlined text-[18px]">east</span>
            </button>
            <span className="text-xs sm:text-sm font-semibold text-[#5a4139] bg-white px-3 py-1.5 rounded-full border border-[#ffe9e2]">
              {lang === 'hi' ? `स्थापना वर्ष: सन् ${TEMPLE_INFO.establishedYear}` : `Constituted: ${TEMPLE_INFO.establishedYear}`}
            </span>
          </div>
        </div>

        {/* Atmospheric Framed Visual Right Column (Image 10) */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#9d2f00]/15 via-[#ffdea3]/20 to-[#a82d68]/15 rounded-3xl blur-2xl -z-10" />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#ffe2d8] p-2 border-2 border-[#b58a2a]/30">
            <div
              className="rounded-2xl overflow-hidden aspect-[4/5] relative cursor-pointer group"
              onClick={() =>
                onOpenImage(
                  TEMPLE_INFO.templeBuildingImageUrl,
                  lang === 'hi' ? 'भव्य मंदिर शिखर दर्शन' : 'Temple Spire & Architecture'
                )
              }
            >
              <img
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                alt="श्री १००८ नवचेतना शिव शक्ति मंदिर परिसर - मुख्य भवन"
                src={TEMPLE_INFO.templeBuildingImageUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Magnifier badge */}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md w-9 h-9 rounded-full flex items-center justify-center text-[#9d2f00] shadow">
                <span className="material-symbols-outlined text-[20px]">zoom_in</span>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-[#ffe9e2]">
                <div className="w-10 h-10 rounded-full bg-[#ffdbd0] flex items-center justify-center text-[#9d2f00] shrink-0">
                  <span className="material-symbols-outlined text-[24px]">temple_hindu</span>
                </div>
                <div>
                  <p className="font-serif-devanagari text-base text-[#2a170f] font-bold leading-tight">
                    {lang === 'hi' ? 'भव्य मंदिर शिखर दर्शन' : 'Grand Temple Spire'}
                  </p>
                  <p className="text-xs text-[#5a4139] mt-0.5 font-medium">
                    {lang === 'hi'
                      ? 'श्री १००८ नवचेतना शिव शक्ति का नवनिर्मित पावन देवालय'
                      : 'Newly consecrated sanctum with pink arches and golden spire'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
