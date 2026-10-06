import React, { useState, useEffect } from 'react';
import { playTempleBell } from '../utils/audioEngine';

interface InteractiveDiyaProps {
  lang: 'hi' | 'en';
}

export const InteractiveDiya: React.FC<InteractiveDiyaProps> = ({ lang }) => {
  const [isLit, setIsLit] = useState<boolean>(false);
  const [diyaCount, setDiyaCount] = useState<number>(1008);
  const [showShloka, setShowShloka] = useState<boolean>(false);
  const [flowerShower, setFlowerShower] = useState<boolean>(false);

  // Initialize and check session persistence
  useEffect(() => {
    try {
      // Check session storage
      const sessionLit = sessionStorage.getItem('mandir_session_diya_lit');
      if (sessionLit === 'true') {
        setIsLit(true);
      }

      // Check community counter
      const savedCount = localStorage.getItem('mandir_total_diyas_lit');
      if (savedCount) {
        setDiyaCount(parseInt(savedCount, 10));
      } else {
        localStorage.setItem('mandir_total_diyas_lit', '1008');
      }
    } catch (_) {}
  }, []);

  const handleLightDiya = () => {
    if (!isLit) {
      // Light the lamp
      setIsLit(true);
      const newCount = diyaCount + 1;
      setDiyaCount(newCount);

      try {
        sessionStorage.setItem('mandir_session_diya_lit', 'true');
        localStorage.setItem('mandir_total_diyas_lit', newCount.toString());
      } catch (_) {}

      // Play sacred bell chime
      playTempleBell();

      // Trigger flower shower & shloka
      setFlowerShower(true);
      setShowShloka(true);
      setTimeout(() => setFlowerShower(false), 3500);
    } else {
      // Devotee re-blessing / offering flowers
      playTempleBell();
      setFlowerShower(true);
      setShowShloka(true);
      setTimeout(() => setFlowerShower(false), 3000);
    }
  };

  const handleResetDiya = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLit(false);
    setShowShloka(false);
    try {
      sessionStorage.removeItem('mandir_session_diya_lit');
    } catch (_) {}
  };

  return (
    <div className="relative z-20 my-4 sm:my-6 flex flex-col items-center">
      {/* Falling Flower Shower Effect when lit */}
      {flowerShower && (
        <div className="absolute inset-x-0 -top-12 h-36 pointer-events-none overflow-hidden z-30 flex justify-center">
          <div className="flex gap-4 animate-bounce">
            <span className="text-xl animate-spin text-[#ffdea3]">🌸</span>
            <span className="text-2xl animate-pulse text-[#ffb400]">🌼</span>
            <span className="text-xl animate-spin text-[#ff73ae]">🌺</span>
            <span className="text-2xl animate-bounce text-[#ffdea3]">🌸</span>
            <span className="text-xl animate-pulse text-[#ffb400]">🌼</span>
          </div>
        </div>
      )}

      {/* Main Diya Card / Pedestal */}
      <div
        onClick={handleLightDiya}
        className={`group relative cursor-pointer px-5 sm:px-8 py-3.5 sm:py-4 rounded-3xl transition-all duration-500 backdrop-blur-md border ${
          isLit
            ? 'bg-gradient-to-b from-[#702100]/90 to-[#390c00]/95 border-[#ffb300]/60 shadow-[0_0_40px_rgba(255,179,0,0.45)] ring-2 ring-[#ffdea3]/30 scale-[1.02]'
            : 'bg-white/10 hover:bg-white/15 border-white/20 hover:border-[#ffdea3]/50 shadow-lg hover:scale-[1.01]'
        }`}
      >
        {/* Divine Background Radial Glow when lit */}
        {isLit && (
          <div className="absolute -inset-4 bg-radial from-[#ffb300]/25 via-transparent to-transparent blur-xl pointer-events-none rounded-full animate-pulse" />
        )}

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          
          {/* SVG Artistic Traditional Brass Diya with Flame */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
            
            {/* Pulsing Aura behind flame when lit */}
            {isLit && (
              <div className="absolute -top-3 w-12 h-16 rounded-full bg-gradient-to-t from-[#ff6b00]/60 via-[#ffb300]/80 to-[#fff8db] blur-md animate-pulse pointer-events-none" />
            )}

            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
            >
              <defs>
                {/* Brass gradients */}
                <linearGradient id="brassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd875" />
                  <stop offset="40%" stopColor="#d4af37" />
                  <stop offset="80%" stopColor="#9a7618" />
                  <stop offset="100%" stopColor="#674c05" />
                </linearGradient>

                <linearGradient id="oilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7a4700" />
                  <stop offset="100%" stopColor="#432400" />
                </linearGradient>

                {/* Flame gradients */}
                <radialGradient id="flameInner" cx="50%" cy="60%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#fff3a8" />
                  <stop offset="80%" stopColor="#ff9500" />
                  <stop offset="100%" stopColor="#e63900" />
                </radialGradient>
              </defs>

              {/* Diya Base Pedestal */}
              <ellipse cx="50" cy="85" rx="32" ry="7" fill="url(#brassGradient)" />
              <path
                d="M38 78 Q50 82 62 78 L58 84 Q50 86 42 84 Z"
                fill="#8f6e16"
              />

              {/* Diya Bowl (Traditional Clay / Brass Shape) */}
              <path
                d="M18 64 Q50 92 82 64 Q86 61 78 58 Q50 68 22 58 Q14 61 18 64 Z"
                fill="url(#brassGradient)"
                stroke="#ffe89e"
                strokeWidth="1"
              />

              {/* Oil Pool inside Diya */}
              <ellipse cx="50" cy="62" rx="26" ry="6" fill="url(#oilGradient)" />

              {/* Cotton Wick (रुई की बाती) */}
              <path
                d="M48 64 Q49 52 50 48 Q51 52 52 64"
                stroke={isLit ? '#ff4d00' : '#dcd6cd'}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Sacred Flame (Dynamic Animated when lit) */}
              {isLit ? (
                <g className="animate-pulse animate-diya origin-bottom">
                  {/* Outer Flame Glow */}
                  <path
                    d="M50 20 Q59 34 56 46 Q53 54 50 54 Q47 54 44 46 Q41 34 50 20 Z"
                    fill="url(#flameInner)"
                    opacity="0.95"
                  />
                  {/* Inner Hot Core */}
                  <path
                    d="M50 28 Q55 38 54 46 Q52 51 50 51 Q48 51 46 46 Q45 38 50 28 Z"
                    fill="#ffffff"
                    opacity="0.9"
                  />
                  {/* Tiny Tip Spark */}
                  <circle cx="50" cy="20" r="1.5" fill="#fffef0" />
                </g>
              ) : (
                /* Unlit Wick Tip */
                <circle cx="50" cy="48" r="1.8" fill="#4a423a" />
              )}
            </svg>
          </div>

          {/* Diya Text Information & Interaction Button */}
          <div className="text-left space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  isLit
                    ? 'bg-[#ffdea3] text-[#390c00] shadow-sm'
                    : 'bg-white/20 text-[#ffdea3]'
                }`}
              >
                <span className="material-symbols-outlined text-[13px] text-[#9d2f00]">
                  {isLit ? 'local_fire_department' : 'light_mode'}
                </span>
                <span>
                  {isLit
                    ? lang === 'hi'
                      ? 'दीप प्रज्ज्वलित है (Lit for Session)'
                      : 'Diya is Lit for Session'
                    : lang === 'hi'
                    ? 'अखंड दीप सेवा'
                    : 'Sacred Diya Offering'}
                </span>
              </span>

              {/* Devotee community count */}
              <span className="text-[11px] text-[#ffdbce] font-medium hidden sm:inline">
                🪔 {diyaCount.toLocaleString('en-IN')} {lang === 'hi' ? 'भक्तों द्वारा समर्पित' : 'Diyas Lit'}
              </span>
            </div>

            <h3 className="font-serif text-base sm:text-lg font-bold text-[#fff8f6] leading-tight">
              {isLit
                ? lang === 'hi'
                  ? '॥ शुभं करोति कल्याणम् ॥ दीप ज्योति नमोऽस्तु ते'
                  : 'May this Divine Light bring Peace & Prosperity'
                : lang === 'hi'
                ? 'पावन दीप प्रज्ज्वलित करें (Light a Diya)'
                : 'Light a Digital Diya at Mandir'}
            </h3>

            <p className="text-xs text-[#ffdbce]/90 max-w-sm">
              {isLit
                ? lang === 'hi'
                  ? 'यह पवित्र ज्योति आपके पूरे सत्र (session) में जगमगाती रहेगी। पुष्प अर्पित करने हेतु पुनः स्पर्श करें।'
                  : 'This holy lamp remains illuminated for your entire visit. Click again to offer flower petals.'
                : lang === 'hi'
                ? 'मंदिर के पावन प्रांगण में श्रद्धा भाव से अपनी मनोकामना सहित डिजिटल दीपक जलाएं।'
                : 'Offer an auspicious digital lamp to seek Lord Shiva & Maa Durga\'s divine blessings.'}
            </p>
          </div>

          {/* CTA Action Badge */}
          <div className="shrink-0 flex items-center gap-2 mt-2 sm:mt-0">
            <button
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
                isLit
                  ? 'bg-[#ffdea3] hover:bg-white text-[#390c00]'
                  : 'bg-[#c63f02] hover:bg-[#9d2f00] text-white animate-pulse'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isLit ? 'spa' : 'local_fire_department'}
              </span>
              <span>
                {isLit
                  ? lang === 'hi'
                    ? 'पुष्प अर्पित करें'
                    : 'Offer Flowers'
                  : lang === 'hi'
                  ? 'दीपक जलाएं'
                  : 'Light Diya'}
              </span>
            </button>

            {/* Extinguish / Reset button if lit */}
            {isLit && (
              <button
                type="button"
                onClick={handleResetDiya}
                title={lang === 'hi' ? 'दीपक पुनः विश्राम दें' : 'Reset Lamp'}
                className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 text-white/80 hover:text-white flex items-center justify-center transition-colors text-xs"
              >
                <span className="material-symbols-outlined text-[14px]">refresh</span>
              </button>
            )}
          </div>
        </div>

        {/* Shloka Popup Banner when lit */}
        {showShloka && isLit && (
          <div className="mt-3 pt-3 border-t border-white/15 text-center space-y-1 animate-fade-in">
            <p className="font-serif text-xs sm:text-sm text-[#ffdea3] font-semibold tracking-wide">
              ॥ शुभं करोति कल्याणमारोग्यं धनसंपदा । शत्रुबुद्धि-विनाशाय दीपज्योतिर्नमोऽस्तु ते ॥
            </p>
            <p className="text-[11px] text-[#ffdbce]/80 italic">
              {lang === 'hi'
                ? 'हे कल्याणकारी दीपज्योति! आपको नमन है। आपके जीवन में सुख, शांति एवं स्वास्थ्य का वास हो।'
                : 'Salutations to the divine flame that brings auspiciousness, health, and supreme peace.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
