import React, { useState, useEffect } from 'react';
import { TEMPLE_INFO } from '../data/templeData';
import { playTempleBell, playConchSound } from '../utils/audioEngine';

interface LiveDarshanModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'hi' | 'en';
}

export const LiveDarshanModal: React.FC<LiveDarshanModalProps> = ({ isOpen, onClose, lang }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAartiRotating, setIsAartiRotating] = useState(false);
  const [flowerShower, setFlowerShower] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);
  const [viewerCount, setViewerCount] = useState(1482);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    let animFrame: number;
    if (isAartiRotating) {
      const step = () => {
        setRotationAngle((prev) => (prev + 3) % 360);
        animFrame = requestAnimationFrame(step);
      };
      animFrame = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animFrame);
  }, [isAartiRotating]);

  if (!isOpen) return null;

  const handleRingBell = () => {
    setBellRinging(true);
    playTempleBell();
    setTimeout(() => setBellRinging(false), 1200);
  };

  const handleBlowConch = () => {
    playConchSound();
  };

  const handleShowerFlowers = () => {
    playTempleBell();
    setFlowerShower(true);
    setTimeout(() => setFlowerShower(false), 3000);
  };

  const toggleAartiRotation = () => {
    if (!isAartiRotating) {
      playTempleBell();
    }
    setIsAartiRotating(!isAartiRotating);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#2a170f] text-white rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl border-2 border-[#b58a2a] flex flex-col relative">
        {/* Flower Shower Animation */}
        {flowerShower && (
          <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden flex justify-around">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="text-2xl sm:text-3xl animate-bounce"
                style={{
                  animationDuration: `${0.9 + (i % 6) * 0.3}s`,
                  transform: `translateY(${Math.random() * 40}px)`,
                }}
              >
                {i % 2 === 0 ? '🌸' : '🌼'}
              </span>
            ))}
          </div>
        )}

        {/* Modal Top Bar */}
        <div className="p-4 bg-[#1f1009] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-600 animate-ping shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#ffdea3] tracking-wider uppercase">
                  {lang === 'hi' ? 'लाइव गर्भगृह दर्शन' : 'LIVE SANCTUM STREAM'}
                </span>
                <span className="bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  LIVE HD
                </span>
              </div>
              <p className="text-xs text-white/70">
                {TEMPLE_INFO.nameHi} • {viewerCount.toLocaleString('en-IN')}{' '}
                {lang === 'hi' ? 'भक्त जुड़े हैं' : 'Devotees Watching'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Live Video / Sanctum Area */}
        <div className="relative flex-1 bg-black min-h-[350px] sm:min-h-[440px] flex items-center justify-center overflow-hidden">
          <img
            src={TEMPLE_INFO.templeBuildingImageUrl}
            alt="Sanctum Darshan"
            className="w-full h-full object-cover opacity-85"
          />

          {/* Golden Ambient Glow */}
          <div className="absolute inset-0 bg-radial from-amber-500/20 via-transparent to-black/70 pointer-events-none" />

          {/* Hanging Bell Top Left */}
          <div
            onClick={handleRingBell}
            className={`absolute top-4 left-6 z-20 cursor-pointer transition-transform ${
              bellRinging ? 'scale-125 rotate-12 text-[#ffdea3]' : 'text-amber-400 hover:scale-110'
            }`}
            title="घंटी बजाएं (Click to Ring Bell)"
          >
            <div className="bg-black/40 backdrop-blur-md p-2 rounded-2xl flex flex-col items-center border border-white/10">
              <span className="material-symbols-outlined text-[36px]">notifications_active</span>
              <span className="text-[10px] font-bold mt-0.5">{lang === 'hi' ? 'घंटानाद' : 'Ring'}</span>
            </div>
          </div>

          {/* Interactive Rotating Aarti Thali in Center-Bottom */}
          <div className="absolute bottom-6 z-30 flex flex-col items-center">
            <div
              onClick={toggleAartiRotation}
              className="relative w-44 h-44 sm:w-52 sm:h-52 cursor-pointer transition-transform"
              style={{ transform: `rotate(${rotationAngle}deg)` }}
              title="दीपक आरती घुमाएं (Click to Rotate Aarti Thali)"
            >
              {/* Golden Brass Plate */}
              <div className="w-full h-full rounded-full border-4 border-amber-400 bg-gradient-to-tr from-amber-700 via-yellow-600 to-amber-500 shadow-[0_0_40px_rgba(255,180,0,0.6)] flex items-center justify-center p-3">
                {/* Inner Ring with Marigold Petals simulation */}
                <div className="w-full h-full rounded-full border-2 border-dashed border-amber-200 flex items-center justify-center relative">
                  {/* Central Flaming Diya */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-t from-red-600 via-amber-500 to-yellow-300 shadow-[0_0_25px_#ff9900] flex items-center justify-center animate-diya">
                    <span className="text-2xl">🔥</span>
                  </div>

                  {/* 4 Corner Small Diyas */}
                  <span className="absolute top-2 text-sm">🪔</span>
                  <span className="absolute bottom-2 text-sm">🪔</span>
                  <span className="absolute left-2 text-sm">🪔</span>
                  <span className="absolute right-2 text-sm">🪔</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#ffdea3] font-bold mt-2 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
              {isAartiRotating
                ? lang === 'hi'
                  ? '॥ आरती परिक्रमा चालू है (क्लिक कर रोकें) ॥'
                  : 'Aarti Circling (Click to Pause)'
                : lang === 'hi'
                ? '👆 आरती थाली पर क्लिक कर दीप घुमाएं'
                : '👆 Click Aarti Plate to Rotate'}
            </p>
          </div>
        </div>

        {/* Live Interaction Controls Bottom Strip */}
        <div className="p-4 bg-[#1f1009] border-t border-white/10 flex flex-wrap items-center justify-around gap-2">
          <button
            type="button"
            onClick={toggleAartiRotation}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow ${
              isAartiRotating
                ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">rotate_right</span>
            <span>{isAartiRotating ? (lang === 'hi' ? 'आरती रोकें' : 'Stop Aarti') : (lang === 'hi' ? 'आरती घुमाएं' : 'Rotate Aarti')}</span>
          </button>

          <button
            type="button"
            onClick={handleRingBell}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffdea3]">notifications</span>
            <span>{lang === 'hi' ? 'घंटी बजाएं' : 'Ring Bell'}</span>
          </button>

          <button
            type="button"
            onClick={handleShowerFlowers}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow"
          >
            <span>🌸</span>
            <span>{lang === 'hi' ? 'पुष्प वर्षा' : 'Flower Shower'}</span>
          </button>

          <button
            type="button"
            onClick={handleBlowConch}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffdea3]">volume_up</span>
            <span>{lang === 'hi' ? 'शंखनाद' : 'Sacred Conch'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
