import React, { useState, useMemo } from 'react';
import { calculateDailyPanchang } from '../utils/panchangEngine';
import { playTempleBell } from '../utils/audioEngine';

interface DailyPanchangProps {
  lang: 'hi' | 'en';
}

export const DailyPanchang: React.FC<DailyPanchangProps> = ({ lang }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [copiedMantra, setCopiedMantra] = useState(false);
  const [activeTab, setActiveTab] = useState<'muhurat' | 'graha' | 'sankalpa'>('muhurat');

  const panchang = useMemo(() => {
    return calculateDailyPanchang(selectedDate);
  }, [selectedDate]);

  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
    playTempleBell();
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
    playTempleBell();
  };

  const handleToday = () => {
    setSelectedDate(new Date());
    playTempleBell();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const parts = e.target.value.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      setSelectedDate(new Date(year, month, day));
      playTempleBell();
    }
  };

  const handleCopySankalpa = () => {
    navigator.clipboard.writeText(panchang.sankalpaMantra);
    setCopiedMantra(true);
    setTimeout(() => setCopiedMantra(false), 3000);
  };

  const dateInputValue = selectedDate.toISOString().split('T')[0];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 lg:px-8 py-10 w-full" id="daily-panchang">
      <div className="bg-white rounded-3xl border-2 border-[#ffdbce] shadow-[0_10px_35px_rgba(44,24,16,0.06)] overflow-hidden">
        
        {/* Sacred Golden Top Header Bar */}
        <div className="bg-gradient-to-r from-[#9d2f00] via-[#c63f02] to-[#705100] text-white p-5 sm:p-7 relative overflow-hidden">
          {/* Subtle Decorative Aura */}
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute left-1/3 -bottom-10 w-40 h-40 rounded-full bg-[#ffdea3]/15 blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#ffdea3] text-xs font-bold uppercase tracking-wider mb-2 border border-white/15">
                <span className="material-symbols-outlined text-[15px]">auto_stories</span>
                <span>{lang === 'hi' ? 'वैदिक काल गणना' : 'Vedic Ephemeris'}</span>
              </div>
              <h2 className="font-serif-devanagari text-2xl sm:text-3xl font-extrabold text-[#fff8f6] tracking-tight flex items-center gap-2.5">
                <span>{lang === 'hi' ? 'दैनिक पंचांग एवं शुभ मुहूर्त' : 'Daily Panchang & Shubh Muhurat'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#ffdbce] mt-1 font-medium">
                {lang === 'hi'
                  ? `विक्रम संवत ${panchang.vikramSamvat} | शक संवत ${panchang.shakaSamvat} | ${panchang.monthHi} मास (${panchang.pakshaHi})`
                  : `Vikram Samvat ${panchang.vikramSamvat} • ${panchang.monthEn} Masa (${panchang.pakshaEn})`}
              </p>
            </div>

            {/* Date Navigator Controls */}
            <div className="flex flex-wrap items-center gap-2 bg-white/15 backdrop-blur-md p-2 rounded-2xl border border-white/20 self-start md:self-auto">
              <button
                type="button"
                onClick={handlePrevDay}
                title={lang === 'hi' ? 'पिछला दिन' : 'Previous Day'}
                className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>

              <button
                type="button"
                onClick={handleToday}
                className="px-3.5 py-1.5 rounded-xl bg-[#ffdea3] hover:bg-white text-[#390c00] font-bold text-xs transition-all shadow-sm"
              >
                {lang === 'hi' ? 'आज' : 'Today'}
              </button>

              <input
                type="date"
                value={dateInputValue}
                onChange={handleDateChange}
                className="px-3 py-1.5 rounded-xl bg-white text-[#2a170f] font-semibold text-xs border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#ffdea3]"
              />

              <button
                type="button"
                onClick={handleNextDay}
                title={lang === 'hi' ? 'अगला दिन' : 'Next Day'}
                className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Auspicious Vrat Alert Strip (if applicable) */}
        {panchang.specialVratHi && (
          <div className="bg-[#fff1ec] border-b border-[#ffd2c4] px-6 py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-[#9d2f00] font-bold">
              <span className="material-symbols-outlined text-[18px] text-[#c63f02] animate-bounce">
                stars
              </span>
              <span>{lang === 'hi' ? 'आज का विशेष व्रत/पर्व:' : "Today's Special Observance:"}</span>
              <span className="text-[#2a170f] font-semibold underline underline-offset-2">
                {lang === 'hi' ? panchang.specialVratHi : panchang.specialVratEn}
              </span>
            </div>
            <span className="hidden sm:inline-block text-[11px] text-[#705100] font-semibold bg-[#ffdea3]/60 px-2.5 py-0.5 rounded-full">
              {panchang.dayHi} विशेष
            </span>
          </div>
        )}

        {/* 4 Pillars of Vedic Panchang (Tithi, Nakshatra, Yoga, Karana) */}
        <div className="p-5 sm:p-7 bg-[#fff8f6]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Tithi */}
            <div className="bg-white p-5 rounded-2xl border border-[#ffe0d6] shadow-sm relative group hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#705100] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#9d2f00]">brightness_4</span>
                  {lang === 'hi' ? 'तिथि' : 'Tithi'}
                </span>
                <span className="text-[10px] bg-[#fff1ec] text-[#9d2f00] px-2 py-0.5 rounded-full font-bold">
                  {panchang.pakshaHi.includes('शुक्ल') ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'}
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2a170f] leading-snug">
                {panchang.tithiHi}
              </h3>
              <p className="text-xs text-[#5a4139] mt-2 font-medium">
                समाप्ति काल: <span className="text-[#9d2f00] font-semibold">{panchang.tithiEndTime}</span>
              </p>
            </div>

            {/* 2. Nakshatra */}
            <div className="bg-white p-5 rounded-2xl border border-[#ffe0d6] shadow-sm relative group hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#705100] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#c63f02]">flare</span>
                  {lang === 'hi' ? 'नक्षत्र' : 'Nakshatra'}
                </span>
                <span className="text-[10px] bg-[#fff1ec] text-[#a82d68] px-2 py-0.5 rounded-full font-bold">
                  २७ नक्षत्र
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2a170f] leading-snug">
                {panchang.nakshatraHi}
              </h3>
              <p className="text-xs text-[#5a4139] mt-2 font-medium">
                अधिष्ठाता: <span className="text-[#705100] font-semibold">{panchang.nakshatraDeity}</span>
              </p>
            </div>

            {/* 3. Yoga */}
            <div className="bg-white p-5 rounded-2xl border border-[#ffe0d6] shadow-sm relative group hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#705100] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#a82d68]">spa</span>
                  {lang === 'hi' ? 'योग' : 'Yoga'}
                </span>
                <span className="text-[10px] bg-[#ffd9e4] text-[#a82d68] px-2 py-0.5 rounded-full font-bold">
                  शुभ योग
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2a170f] leading-snug">
                {panchang.yogaHi} योग
              </h3>
              <p className="text-xs text-[#5a4139] mt-2 font-medium">
                प्रकार: <span className="text-[#a82d68] font-semibold">मांगलिक कार्य हेतु अनुकूल</span>
              </p>
            </div>

            {/* 4. Karana */}
            <div className="bg-white p-5 rounded-2xl border border-[#ffe0d6] shadow-sm relative group hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#705100] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#705100]">hourglass_top</span>
                  {lang === 'hi' ? 'करण' : 'Karana'}
                </span>
                <span className="text-[10px] bg-[#ffdea3]/50 text-[#705100] px-2 py-0.5 rounded-full font-bold">
                  चतुष्पाद
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2a170f] leading-snug">
                {panchang.karanaHi} करण
              </h3>
              <p className="text-xs text-[#5a4139] mt-2 font-medium">
                वार: <span className="text-[#9d2f00] font-semibold">{panchang.dayHi}</span>
              </p>
            </div>

          </div>

          {/* Section Navigation Tabs (Muhurat / Graha / Sankalpa) */}
          <div className="flex items-center justify-center gap-2 mt-7 mb-5 border-b border-[#ffe0d6] pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('muhurat')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'muhurat'
                  ? 'bg-[#9d2f00] text-white shadow-md'
                  : 'text-[#5a4139] hover:bg-[#ffe9e2]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">schedule</span>
              <span>{lang === 'hi' ? 'शुभ व अशुभ मुहूर्त' : 'Shubh & Ashubh Muhurat'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('graha')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'graha'
                  ? 'bg-[#9d2f00] text-white shadow-md'
                  : 'text-[#5a4139] hover:bg-[#ffe9e2]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">wb_sunny</span>
              <span>{lang === 'hi' ? 'सूर्य व चंद्र स्थिति' : 'Sun & Moon Timings'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sankalpa')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'sankalpa'
                  ? 'bg-[#9d2f00] text-white shadow-md'
                  : 'text-[#5a4139] hover:bg-[#ffe9e2]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">menu_book</span>
              <span>{lang === 'hi' ? 'दैनिक संकल्प मंत्र' : 'Daily Sankalpa Mantra'}</span>
            </button>
          </div>

          {/* Tab 1: Shubh & Ashubh Muhurats */}
          {activeTab === 'muhurat' && (
            <div className="space-y-6">
              {/* Shubh Muhurats */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <h4 className="font-serif text-sm font-bold text-[#2a170f] uppercase tracking-wide">
                    {lang === 'hi' ? 'सर्वोत्तम शुभ मुहूर्त (Auspicious Hours)' : 'Auspicious Timings (Shubh Muhurat)'}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  {/* Abhijit Muhurat - Highlighted */}
                  <div className="bg-gradient-to-br from-[#fff7e6] to-[#fff1d6] p-4.5 rounded-2xl border-2 border-[#b58a2a]/60 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#705100] uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#b58a2a]">workspace_premium</span>
                        {lang === 'hi' ? 'अभिजीत मुहूर्त' : 'Abhijit Muhurat'}
                      </span>
                      <span className="text-[10px] bg-[#9d2f00] text-white px-2 py-0.5 rounded-full font-bold">
                        सर्वश्रेष्ठ
                      </span>
                    </div>
                    <div className="text-xl font-extrabold text-[#390c00] mt-1 font-serif">
                      {panchang.abhijitMuhurat.start} – {panchang.abhijitMuhurat.end}
                    </div>
                    <p className="text-[11px] text-[#705100] mt-1 font-medium">
                      {panchang.abhijitMuhurat.status}
                    </p>
                  </div>

                  {/* Brahma Muhurat */}
                  <div className="bg-white p-4.5 rounded-2xl border border-[#ffe0d6] shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#5a4139] uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#9d2f00]">self_improvement</span>
                        {lang === 'hi' ? 'ब्रह्म मुहूर्त' : 'Brahma Muhurat'}
                      </span>
                      <span className="text-[10px] bg-[#ffe9e2] text-[#9d2f00] px-2 py-0.5 rounded-full font-semibold">
                        प्रातः काल
                      </span>
                    </div>
                    <div className="text-xl font-bold text-[#2a170f] mt-1 font-serif">
                      {panchang.brahmaMuhurat.start} – {panchang.brahmaMuhurat.end}
                    </div>
                    <p className="text-[11px] text-[#5a4139] mt-1 font-medium">
                      {panchang.brahmaMuhurat.status}
                    </p>
                  </div>

                  {/* Amrit Kaal */}
                  <div className="bg-white p-4.5 rounded-2xl border border-[#ffe0d6] shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#5a4139] uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#a82d68]">water_drop</span>
                        {lang === 'hi' ? 'अमृत काल' : 'Amrit Kaal'}
                      </span>
                      <span className="text-[10px] bg-[#ffd9e4] text-[#a82d68] px-2 py-0.5 rounded-full font-semibold">
                        अमृत योग
                      </span>
                    </div>
                    <div className="text-xl font-bold text-[#2a170f] mt-1 font-serif">
                      {panchang.amritKaal.start} – {panchang.amritKaal.end}
                    </div>
                    <p className="text-[11px] text-[#5a4139] mt-1 font-medium">
                      {panchang.amritKaal.status}
                    </p>
                  </div>

                  {/* Vijaya Muhurat */}
                  <div className="bg-white p-4.5 rounded-2xl border border-[#ffe0d6] shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#5a4139] uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#705100]">military_tech</span>
                        {lang === 'hi' ? 'विजय मुहूर्त' : 'Vijaya Muhurat'}
                      </span>
                      <span className="text-[10px] bg-[#ffdea3]/50 text-[#705100] px-2 py-0.5 rounded-full font-semibold">
                        विजय प्राप्ति
                      </span>
                    </div>
                    <div className="text-xl font-bold text-[#2a170f] mt-1 font-serif">
                      {panchang.vijayaMuhurat.start} – {panchang.vijayaMuhurat.end}
                    </div>
                    <p className="text-[11px] text-[#5a4139] mt-1 font-medium">
                      {panchang.vijayaMuhurat.status}
                    </p>
                  </div>

                  {/* Godhuli Muhurat */}
                  <div className="bg-white p-4.5 rounded-2xl border border-[#ffe0d6] shadow-sm sm:col-span-2 lg:col-span-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#5a4139] uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#c63f02]">wb_twilight</span>
                        {lang === 'hi' ? 'गोधूलि मुहूर्त' : 'Godhuli Muhurat'}
                      </span>
                      <span className="text-[10px] bg-[#ffdbd0] text-[#9d2f00] px-2 py-0.5 rounded-full font-semibold">
                        संध्या दीपदान
                      </span>
                    </div>
                    <div className="text-xl font-bold text-[#2a170f] mt-1 font-serif">
                      {panchang.godhuliMuhurat.start} – {panchang.godhuliMuhurat.end}
                    </div>
                    <p className="text-[11px] text-[#5a4139] mt-1 font-medium">
                      {panchang.godhuliMuhurat.status}
                    </p>
                  </div>

                </div>
              </div>

              {/* Ashubh Kaal (Caution / Inauspicious) */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  <h4 className="font-serif text-sm font-bold text-[#2a170f] uppercase tracking-wide">
                    {lang === 'hi' ? 'अशुभ समय (त्याज्य / सावधानी काल)' : 'Inauspicious Timings (Avoid Key Ventures)'}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  
                  {/* Rahu Kaal */}
                  <div className="bg-[#fff4f2] p-4 rounded-xl border border-red-200">
                    <div className="flex items-center justify-between text-red-800 font-bold mb-1">
                      <span>{lang === 'hi' ? 'राहु काल' : 'Rahu Kaal'}</span>
                      <span className="text-[10px] bg-red-100 px-1.5 py-0.5 rounded font-bold">वर्जित</span>
                    </div>
                    <div className="text-base font-bold text-red-900 font-serif">
                      {panchang.rahuKaal.start} – {panchang.rahuKaal.end}
                    </div>
                    <p className="text-[10px] text-red-700/80 mt-1">
                      इस काल में कोई नया शुभ कार्य अथवा यात्रा न करें
                    </p>
                  </div>

                  {/* Yamaganda */}
                  <div className="bg-white p-4 rounded-xl border border-[#ffe0d6]">
                    <div className="text-[#5a4139] font-bold mb-1">
                      {lang === 'hi' ? 'यमगण्ड' : 'Yamaganda'}
                    </div>
                    <div className="text-base font-bold text-[#2a170f] font-serif">
                      {panchang.yamaganda.start} – {panchang.yamaganda.end}
                    </div>
                    <p className="text-[10px] text-[#7d564a] mt-1">अशुभ फलदायी काल</p>
                  </div>

                  {/* Gulika Kaal */}
                  <div className="bg-white p-4 rounded-xl border border-[#ffe0d6]">
                    <div className="text-[#5a4139] font-bold mb-1">
                      {lang === 'hi' ? 'गुलिक काल' : 'Gulika Kaal'}
                    </div>
                    <div className="text-base font-bold text-[#2a170f] font-serif">
                      {panchang.gulikaKaal.start} – {panchang.gulikaKaal.end}
                    </div>
                    <p className="text-[10px] text-[#7d564a] mt-1">शनि पुत्र गुलिक प्रभाव</p>
                  </div>

                  {/* Durmuhurat */}
                  <div className="bg-white p-4 rounded-xl border border-[#ffe0d6]">
                    <div className="text-[#5a4139] font-bold mb-1">
                      {lang === 'hi' ? 'दुर्मुहूर्त' : 'Durmuhurat'}
                    </div>
                    <div className="text-base font-bold text-[#2a170f] font-serif">
                      {panchang.durMuhurat.start} – {panchang.durMuhurat.end}
                    </div>
                    <p className="text-[10px] text-[#7d564a] mt-1">सावधानी आवश्यक</p>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Sun & Moon Timings */}
          {activeTab === 'graha' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Sun Details */}
              <div className="bg-gradient-to-br from-[#fff6ed] to-[#fff0e1] p-5 rounded-2xl border border-[#ffdbce] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffdea3] text-[#705100] flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[22px]">wb_sunny</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#2a170f]">
                      {lang === 'hi' ? 'भगवान सूर्य नारायण' : 'Solar Calculations'}
                    </h4>
                    <span className="text-xs text-[#705100] font-semibold">
                      सूर्य राशि: {panchang.sunSignHi} ({panchang.sunSignEn})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/80 p-3.5 rounded-xl border border-[#ffdbce]">
                    <span className="text-[11px] font-bold uppercase text-[#5a4139] block">सूर्योदय (Sunrise)</span>
                    <span className="font-serif text-lg font-bold text-[#9d2f00]">{panchang.sunrise}</span>
                  </div>
                  <div className="bg-white/80 p-3.5 rounded-xl border border-[#ffdbce]">
                    <span className="text-[11px] font-bold uppercase text-[#5a4139] block">सूर्यास्त (Sunset)</span>
                    <span className="font-serif text-lg font-bold text-[#9d2f00]">{panchang.sunset}</span>
                  </div>
                </div>

                <div className="text-xs text-[#5a4139] leading-relaxed bg-white/60 p-3 rounded-xl border border-white/80">
                  <span className="font-bold text-[#9d2f00]">अयन एवं ऋतु: </span>
                  दक्षिणायन • शरद ऋतु। सूर्य आराधना एवं गायत्री जप हेतु सर्वोत्तम समय सूर्योदय काल है।
                </div>
              </div>

              {/* Moon Details */}
              <div className="bg-gradient-to-br from-[#f9f5ff] to-[#f0e8ff] p-5 rounded-2xl border border-[#e5d5ff] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e8dcff] text-[#55278d] flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[22px]">bedtime</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#2a170f]">
                      {lang === 'hi' ? 'चंद्रदेव स्थिति' : 'Lunar Calculations'}
                    </h4>
                    <span className="text-xs text-[#55278d] font-semibold">
                      चंद्र राशि: {panchang.moonSignHi} ({panchang.moonSignEn})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/80 p-3.5 rounded-xl border border-[#e5d5ff]">
                    <span className="text-[11px] font-bold uppercase text-[#5a4139] block">चंद्रोदय (Moonrise)</span>
                    <span className="font-serif text-lg font-bold text-[#55278d]">{panchang.moonrise}</span>
                  </div>
                  <div className="bg-white/80 p-3.5 rounded-xl border border-[#e5d5ff]">
                    <span className="text-[11px] font-bold uppercase text-[#5a4139] block">चंद्रास्त (Moonset)</span>
                    <span className="font-serif text-lg font-bold text-[#55278d]">{panchang.moonset}</span>
                  </div>
                </div>

                <div className="text-xs text-[#5a4139] leading-relaxed bg-white/60 p-3 rounded-xl border border-white/80">
                  <span className="font-bold text-[#55278d]">चंद्र बल: </span>
                  {panchang.moonSignHi} राशि में चंद्र संचार। मानसिक शांति व शिव अभिषेक हेतु शुभ संयोग।
                </div>
              </div>

            </div>
          )}

          {/* Tab 3: Daily Vedic Sankalpa */}
          {activeTab === 'sankalpa' && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#ffe0d6] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#2a170f] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#9d2f00]">menu_book</span>
                    <span>{lang === 'hi' ? 'आज का वैदिक पूजा संकल्प' : 'Vedic Puja Sankalpa for Today'}</span>
                  </h4>
                  <p className="text-xs text-[#5a4139] mt-0.5">
                    {lang === 'hi'
                      ? 'घर या मंदिर में पूजन प्रारंभ करने से पूर्व हाथ में जल, अक्षत व पुष्प लेकर यह संकल्प करें:'
                      : 'Take water, akshat, and flowers in right hand and chant before commencing puja:'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopySankalpa}
                  className="px-3.5 py-1.5 rounded-full bg-[#fff1ec] hover:bg-[#ffdbd0] text-[#9d2f00] text-xs font-bold transition-all flex items-center gap-1 border border-[#ffd2c4]"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {copiedMantra ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedMantra ? 'कॉपी हुआ!' : 'मंत्र कॉपी करें'}</span>
                </button>
              </div>

              <div className="bg-[#fffaf8] p-4 sm:p-5 rounded-xl border border-[#ffe0d6] text-xs sm:text-sm text-[#390c00] font-serif leading-relaxed tracking-wide select-all">
                {panchang.sankalpaMantra}
              </div>

              <div className="text-[11px] text-[#705100] bg-[#fff6e6] p-3 rounded-xl border border-[#ffe7ba] flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">info</span>
                <span>
                  संकल्प के उपरांत अपना नाम एवं गोत्र का उच्चारण करें तथा भगवान श्री सोमेश्वर महादेव एवं माँ दुर्गा के चरणों में पुष्प-अक्षत अर्पित करें।
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Devotional Note Strip */}
        <div className="bg-[#fff1ec] border-t border-[#ffe0d6] px-5 sm:px-7 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5a4139]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#9d2f00]">temple_hindu</span>
            <span className="font-semibold text-[#9d2f00]">
              श्री १००८ नवचेतना शिव शक्ति मंदिर पंचांग सभा
            </span>
            <span className="hidden md:inline">• दिल्ली अक्षांश (28.7360° N, 77.2625° E) पर आधारित</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => playTempleBell()}
              className="text-[#705100] hover:text-[#9d2f00] font-bold flex items-center gap-1 text-[11px]"
            >
              <span className="material-symbols-outlined text-[16px]">notifications_active</span>
              <span>{lang === 'hi' ? 'घंटी बजाएं (Bell)' : 'Ring Temple Bell'}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
