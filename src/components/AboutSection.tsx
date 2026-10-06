import React from 'react';
import { TEMPLE_INFO } from '../data/templeData';

interface AboutSectionProps {
  lang: 'hi' | 'en';
  onNavigateTab: (tab: string) => void;
  onOpenImage: (url: string, title: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  lang,
  onNavigateTab,
  onOpenImage,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 sm:py-20 w-full" id="about-section">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs sm:text-sm uppercase tracking-widest text-[#9d2f00] font-bold">
          {lang === 'hi' ? 'स्थापना एवं पावन परंपरा' : 'Consecration & Sacred Heritage'}
        </span>
        <h2 className="font-serif-devanagari text-2xl sm:text-4xl text-[#2a170f] font-bold mt-2">
          {lang === 'hi' ? 'मंदिर परिचय एवं दिव्य इतिहास' : 'About the Mandir & Sanctum History'}
        </h2>
        <p className="text-sm sm:text-base text-[#5a4139] mt-3">
          {lang === 'hi'
            ? 'श्री १००८ नवचेतना शिव शक्ति धाम सनातन धर्म, वैदिक संस्कारों और समाज सेवा का एक जागृत केंद्र है।'
            : 'Shri 1008 Nav Chetna Shiv Shakti is an active spiritual sanctuary fostering Vedic education and welfare.'}
        </p>
      </div>

      {/* Main Narrative with Temple Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#b58a2a]/30 group cursor-pointer"
            onClick={() => onOpenImage(TEMPLE_INFO.templeBuildingImageUrl, 'श्री १००८ नवचेतना शिव शक्ति मंदिर')}
          >
            <img
              src={TEMPLE_INFO.templeBuildingImageUrl}
              alt="Temple Spire"
              className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-[#ffe9e2] max-w-xs hidden sm:block">
            <p className="font-serif text-sm font-bold text-[#9d2f00]">स्थापना वर्ष: सन् २०२१</p>
            <p className="text-xs text-[#5a4139] mt-0.5">गुलाबी तोरण, स्वर्ण कलश एवं पावन गर्भगृह</p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-[#5a4139] leading-relaxed">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffe9e2] text-[#9d2f00] text-xs font-bold rounded-full">
            <span>✦ वैदिक वास्तु शास्त्र आधारित निर्माण</span>
          </div>

          <h3 className="font-serif-devanagari text-xl sm:text-2xl text-[#2a170f] font-bold">
            {lang === 'hi' ? 'आध्यात्मिक चेतना एवं जन-कल्याण का केंद्र' : 'A Center of Spiritual Consciousness'}
          </h3>

          <p>
            {lang === 'hi'
              ? 'श्री १००८ नवचेतना शिव शक्ति धाम की स्थापना पूज्य संतों एवं सनातन धर्म के निष्ठावान भक्तों के पावन संकल्प से सन् २०२१ में हुई। इस देवालय का मुख्य ध्येय सनातन मूल्यों का संवर्धन, नित्य वेद घोष, और दरिद्र नारायण की निःस्वार्थ सेवा है।'
              : 'Shri 1008 Nav Chetna Shiv Shakti was consecrated in 2021 through the sacred resolve of saints and devoted pilgrims. The core mission is to uphold Vedic rituals, daily chanting, and unconditional community service.'}
          </p>

          <p>
            {lang === 'hi'
              ? 'मंदिर का भव्य शिखर भारतीय स्थापत्य कला एवं नागर शैली के समन्वय का उत्कृष्ट उदाहरण है। गुलाबी मेहराबदार तोरण, स्वर्ण कलश एवं ध्वजा दूर से ही श्रद्धालुओं को आकर्षित करते हैं। गर्भगृह में देवाधिदेव महादेव, आद्याशक्ति माँ दुर्गा, सिद्धि विनायक, संकटमोचन हनुमान, माता महालक्ष्मी एवं भगवान लक्ष्मीनारायण के दिव्य विग्रह प्रतिष्ठित हैं।'
              : 'The temple architecture features elegant pink arches, sculpted lotus pillars, and a majestic golden kalash spire that welcomes devotees into an atmosphere of deep meditative silence.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab('deities')}
              className="px-5 py-2.5 bg-[#9d2f00] text-white rounded-full text-xs sm:text-sm font-bold hover:bg-[#c63f02] transition-colors"
            >
              {lang === 'hi' ? 'आराध्य देव दर्शन' : 'View Sanctum Deities'}
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('donation')}
              className="px-5 py-2.5 bg-[#ffe9e2] text-[#9d2f00] rounded-full text-xs sm:text-sm font-bold hover:bg-[#ffdbce] transition-colors"
            >
              {lang === 'hi' ? 'सेवा संकल्प' : 'Participate in Seva'}
            </button>
          </div>
        </div>
      </div>

      {/* Trust Principles & Core Missions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-6 rounded-2xl border border-[#ffe9e2] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#ffdbd0] text-[#9d2f00] flex items-center justify-center">
            <span className="material-symbols-outlined text-[26px]">volunteer_activism</span>
          </div>
          <h4 className="font-serif text-lg text-[#2a170f] font-bold">
            {lang === 'hi' ? 'नित्य अन्नक्षेत्र सेवा' : 'Nitya Annakshetra'}
          </h4>
          <p className="text-xs sm:text-sm text-[#5a4139] leading-relaxed">
            {lang === 'hi'
              ? 'मंदिर में प्रतिदिन दोपहर निःशुल्क महाप्रसाद वितरण किया जाता है जहाँ बिना किसी भेद-भाव के हजारों भक्त भोजन ग्रहण करते हैं।'
              : 'Nutritious satvik meals are served free of charge to thousands of pilgrims daily.'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#ffe9e2] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#ffdea3] text-[#705100] flex items-center justify-center">
            <span className="material-symbols-outlined text-[26px]">auto_stories</span>
          </div>
          <h4 className="font-serif text-lg text-[#2a170f] font-bold">
            {lang === 'hi' ? 'वैदिक गुरुकुल व संस्कार' : 'Vedic Education & Sanskar'}
          </h4>
          <p className="text-xs sm:text-sm text-[#5a4139] leading-relaxed">
            {lang === 'hi'
              ? 'युवा पीढ़ी में सनातन संस्कृति, श्रीमद्भगवद्गीता, सुंदरकांड एवं नैतिक मूल्यों के संचार हेतु नियमित सत्संग व कक्षाएं।'
              : 'Regular satsang and study sessions teaching Gita, Upanishads, and moral values to youth.'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#ffe9e2] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#ffd9e4] text-[#a82d68] flex items-center justify-center">
            <span className="material-symbols-outlined text-[26px]">pets</span>
          </div>
          <h4 className="font-serif text-lg text-[#2a170f] font-bold">
            {lang === 'hi' ? 'गौमाता संवर्धन एवं संरक्षण' : 'Cow Protection & Gaushala'}
          </h4>
          <p className="text-xs sm:text-sm text-[#5a4139] leading-relaxed">
            {lang === 'hi'
              ? 'आश्रम गौशाला में बेसहारा एवं वृद्ध देशी गौमाताओं की सेवा, पौष्टिक चारा, चिकित्सा एवं वात्सल्यपूर्ण देखभाल।'
              : 'Dedicated shelter providing medical care, nutritious fodder and shelter for indigenous cows.'}
          </p>
        </div>
      </div>

      {/* Trust Governance & Contact Note */}
      <div className="bg-[#fff1ec] p-6 sm:p-8 rounded-3xl border border-[#ffe9e2] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#9d2f00] uppercase tracking-wider">
            {TEMPLE_INFO.trustNameHi}
          </span>
          <h4 className="font-serif text-xl text-[#2a170f] font-bold mt-1">
            {lang === 'hi' ? 'पारदर्शी व्यवस्थापन एवं जन-सहभागिता' : 'Transparent Trust Governance'}
          </h4>
          <p className="text-xs sm:text-sm text-[#5a4139] mt-1 max-w-xl">
            {lang === 'hi'
              ? 'ट्रस्ट द्वारा प्राप्त प्रत्येक दान की रसीद निर्गत की जाती है और वार्षिक ऑडिट रिपोर्ट सार्वजनिक रूप से उपलब्ध रहती है।'
              : 'Every donation is officially receipted with audited accounts maintained under legal guidelines.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigateTab('contact')}
          className="px-6 py-3 bg-[#9d2f00] text-white rounded-full text-xs sm:text-sm font-bold shrink-0 hover:bg-[#c63f02] transition-colors shadow"
        >
          {lang === 'hi' ? 'ट्रस्ट से संपर्क करें' : 'Contact Temple Board'}
        </button>
      </div>
    </section>
  );
};
