import React from 'react';
import { TEMPLE_INFO } from '../data/templeData';
import { InteractiveDiya } from './InteractiveDiya';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  lang: 'hi' | 'en';
  onOpenLiveDarshan: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setCurrentTab, lang, onOpenLiveDarshan }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#422b22] text-[#fff8f6] flex flex-col justify-between min-h-[88vh] sm:min-h-[92vh]">
      {/* Devotional Background Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-105"
        style={{ backgroundImage: `url('${TEMPLE_INFO.heroBgUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#422b22] via-[#422b22]/75 to-[#422b22]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-radial from-[#9d2f00]/30 via-transparent to-[#422b22]/90" />
      </div>

      {/* Sacred Filigree / Rotating Aura Mandala */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 flex items-center justify-center overflow-hidden">
        <svg
          className="w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] text-[#ffdea3] animate-spin-slow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="46" strokeDasharray="1 2" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="38" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="28" strokeDasharray="2 1" strokeWidth="0.4" />
          <path
            d="M50 4 L53 14 L50 24 L47 14 Z M50 96 L53 86 L50 76 L47 86 Z M4 50 L14 53 L24 50 L14 47 Z M96 50 L86 53 L76 50 L86 47 Z"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-16 sm:pt-24 pb-12 flex-1 flex flex-col justify-center items-center text-center">
        {/* Auspicious Invocation Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-6 shadow-sm border border-white/15">
          <span className="material-symbols-outlined text-[#ffdea3] text-[18px]">flare</span>
          <span className="font-serif-devanagari text-xs sm:text-sm text-[#ffdea3] font-bold tracking-widest uppercase">
            ॥ श्री गणेशाय नमः ॥
          </span>
          <span className="material-symbols-outlined text-[#ffdea3] text-[18px]">flare</span>
        </div>

        {/* Main Heading with Devanagari Dignity */}
        <h1 className="font-serif-devanagari text-3xl sm:text-5xl lg:text-6xl max-w-4xl text-[#fff8f6] font-bold tracking-tight mb-5 drop-shadow-md leading-tight">
          {lang === 'hi' ? (
            <>
              श्री १००८ नवचेतना शिव शक्ति में{' '}
              <span className="text-[#ffdea3] block sm:inline">आपका स्वागत है</span>
            </>
          ) : (
            <>
              Welcome to Shri 1008 Nav Chetna{' '}
              <span className="text-[#ffdea3] block sm:inline">Shiv Shakti Mandir</span>
            </>
          )}
        </h1>

        {/* Devotional Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-[#ffdbce] max-w-2xl font-normal leading-relaxed mb-4 drop-shadow">
          {lang === 'hi'
            ? 'एक पवित्र स्थान, जहाँ आस्था, शांति और भक्ति का पावन संगम होता है। अनुभव करें वैदिक ऋचाओं का दिव्य सानिध्य और अलौकिक आध्यात्मिक शांति।'
            : 'A sacred threshold where faith, tranquility, and devotion unite. Immerse yourself in authentic Vedic resonance and timeless spiritual peace.'}
        </p>

        {/* Interactive Light a Diya Altar (Persists for session) */}
        <InteractiveDiya lang={lang} />

        {/* Action Button Group */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          <button
            type="button"
            onClick={() => setCurrentTab('darshan')}
            className="inline-flex items-center gap-2 bg-[#c63f02] hover:bg-[#9d2f00] text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <span className="material-symbols-outlined text-[20px] text-[#ffdea3]">temple_hindu</span>
            <span>{lang === 'hi' ? 'दर्शन व आरती समय' : 'Darshan & Aarti Timings'}</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentTab('contact')}
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-[#fff8f6] font-semibold text-sm sm:text-base px-5 sm:px-7 py-3 rounded-full shadow-sm hover:scale-[1.02] transition-all border border-white/25"
          >
            <span className="material-symbols-outlined text-[20px] text-[#ffdea3]">pin_drop</span>
            <span>{lang === 'hi' ? 'मंदिर स्थान (Google Maps)' : 'Mandir Location & Maps'}</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentTab('festivals')}
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-[#fff8f6] font-semibold text-sm sm:text-base px-5 sm:px-7 py-3 rounded-full shadow-sm hover:scale-[1.02] transition-all border border-white/20"
          >
            <span className="material-symbols-outlined text-[20px] text-[#ffdea3]">calendar_month</span>
            <span>{lang === 'hi' ? 'आगामी उत्सव' : 'Upcoming Festivals'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenLiveDarshan}
            className="inline-flex items-center gap-2 bg-[#ffdea3] text-[#390c00] hover:bg-white font-bold text-sm sm:text-base px-5 sm:px-7 py-3 rounded-full shadow-md hover:scale-[1.02] transition-all"
          >
            <span className="material-symbols-outlined text-[20px] text-[#9d2f00] animate-pulse">videocam</span>
            <span>{lang === 'hi' ? 'लाइव दर्शन' : 'Live Darshan'}</span>
          </button>
        </div>

        {/* Floating Sacred Announcement Pill Ticker */}
        <div className="w-full max-w-3xl bg-[#9d2f00]/85 backdrop-blur-md text-white px-4 sm:px-6 py-2.5 rounded-full shadow-xl flex items-center justify-center gap-2 sm:gap-3 text-center border border-white/15">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffdea3] animate-ping shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-[#ffdea3] uppercase shrink-0">
            {lang === 'hi' ? 'विशेष सूचना:' : 'Notice:'}
          </span>
          <p className="text-xs sm:text-sm text-white truncate font-medium">
            {lang === 'hi'
              ? 'आगामी महाशिवरात्रि महापर्व पर अखंड 24-घंटे रुद्राभिषेक एवं विशेष दर्शन की व्यवस्था।'
              : 'Round-the-clock 24-hour Rudrabhishek and special darshan passes available for upcoming Maha Shivratri.'}
          </p>
        </div>
      </div>

      {/* Sacred Bottom Gradient Edge */}
      <div className="w-full h-12 bg-gradient-to-b from-transparent to-[#fff8f6]" />
    </section>
  );
};
