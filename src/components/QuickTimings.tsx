import React from 'react';

interface QuickTimingsProps {
  onViewSchedule: () => void;
  lang: 'hi' | 'en';
}

export const QuickTimings: React.FC<QuickTimingsProps> = ({ onViewSchedule, lang }) => {
  const timings = [
    {
      icon: 'wb_twilight',
      labelHi: 'प्रात: दर्शन',
      labelEn: 'Morning Darshan',
      time: '05:30 AM – 12:30 PM',
      subHi: 'नित्य प्रात: काल',
      subEn: 'Daily Morning',
      bgColor: 'bg-[#ffdbd0]',
      textColor: 'text-[#9d2f00]',
    },
    {
      icon: 'local_fire_department',
      labelHi: 'मंगला आरती',
      labelEn: 'Mangala Aarti',
      time: '08:00 AM',
      subHi: 'दिव्य शंखनाद सहित',
      subEn: 'With Sacred Conch',
      bgColor: 'bg-[#ffdbd0]',
      textColor: 'text-[#9d2f00]',
    },
    {
      icon: 'bedtime',
      labelHi: 'संध्या महाआरती',
      labelEn: 'Sandhya Maha Aarti',
      time: '09:00 PM',
      subHi: 'मुख्य गर्भगृह में',
      subEn: 'In Main Sanctum',
      bgColor: 'bg-[#ffd9e4]',
      textColor: 'text-[#a82d68]',
    },
    {
      icon: 'lock_clock',
      labelHi: 'शयन दर्शन / कपाट',
      labelEn: 'Sanctum Closing',
      time: '09:30 PM',
      subHi: 'विश्राम आरती उपरांत',
      subEn: 'Post Resting Aarti',
      bgColor: 'bg-[#ffe9e2]',
      textColor: 'text-[#5a4139]',
    },
  ];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 lg:px-8 -mt-8 sm:-mt-10 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {timings.map((t, idx) => (
          <button
            key={idx}
            type="button"
            onClick={onViewSchedule}
            className="bg-white text-left rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(44,24,16,0.06)] border border-[#ffe9e2] flex items-center gap-4 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(44,24,16,0.12)] transition-all group"
          >
            <div
              className={`w-12 h-12 rounded-full ${t.bgColor} flex items-center justify-center ${t.textColor} shrink-0 group-hover:scale-110 transition-transform`}
            >
              <span className="material-symbols-outlined text-[26px]">{t.icon}</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#5a4139] font-medium block">
                {lang === 'hi' ? t.labelHi : t.labelEn}
              </span>
              <h2 className="font-serif text-base sm:text-lg text-[#2a170f] font-bold mt-0.5">
                {t.time}
              </h2>
              <span className={`text-xs font-semibold ${t.textColor} block mt-0.5`}>
                {lang === 'hi' ? t.subHi : t.subEn}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Panchang Indicator Strip */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-[#fff1ec] via-[#fff7e6] to-[#fff1ec] border border-[#ffdbce] px-4 py-2.5 rounded-2xl shadow-sm text-xs">
        <div className="flex items-center gap-2 text-[#9d2f00] font-bold">
          <span className="material-symbols-outlined text-[18px] text-[#c63f02]">auto_stories</span>
          <span>{lang === 'hi' ? 'आज का दैनिक पंचांग, तिथि, नक्षत्र एवं शुभ मुहूर्त उपलब्ध है' : 'Today\'s Vedic Panchang, Tithi, Nakshatra & Auspicious Muhurats are live'}</span>
        </div>
        <a
          href="#daily-panchang"
          className="text-[#705100] font-bold hover:text-[#9d2f00] flex items-center gap-1 hover:underline shrink-0"
        >
          <span>{lang === 'hi' ? 'पंचांग देखें' : 'View Panchang'}</span>
          <span className="material-symbols-outlined text-[15px]">arrow_downward</span>
        </a>
      </div>
    </section>
  );
};
