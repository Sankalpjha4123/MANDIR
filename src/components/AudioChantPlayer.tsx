import React, { useState, useEffect } from 'react';
import { MANTRA_TRACKS } from '../data/templeData';
import { toggleOmDrone, playTempleBell } from '../utils/audioEngine';

interface AudioChantPlayerProps {
  lang: 'hi' | 'en';
}

export const AudioChantPlayer: React.FC<AudioChantPlayerProps> = ({ lang }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  const currentTrack = MANTRA_TRACKS[currentTrackIndex];

  const handleTogglePlay = () => {
    const nextPlayState = !isPlaying;
    setIsPlaying(nextPlayState);
    toggleOmDrone(nextPlayState);
    if (nextPlayState) {
      playTempleBell();
    }
  };

  const handleNextTrack = () => {
    playTempleBell();
    setCurrentTrackIndex((prev) => (prev + 1) % MANTRA_TRACKS.length);
  };

  const handlePrevTrack = () => {
    playTempleBell();
    setCurrentTrackIndex((prev) => (prev - 1 + MANTRA_TRACKS.length) % MANTRA_TRACKS.length);
  };

  // Periodic meditative bell during playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        playTempleBell();
      }, 12000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm w-full animate-fade-in print:hidden">
      <div className="bg-[#2a170f]/95 backdrop-blur-xl border border-[#b58a2a]/40 text-white rounded-2xl shadow-[0_8px_32px_rgba(42,23,15,0.4)] p-3">
        {isMinimized ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-serif font-bold text-[#ffdea3] truncate">
                {currentTrack.title}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleTogglePlay}
                className="w-7 h-7 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-xs"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(false)}
                className="text-white/60 hover:text-white p-1"
              >
                <span className="material-symbols-outlined text-[16px]">expand_less</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="material-symbols-outlined text-amber-400 text-[18px]">graphic_eq</span>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                  {lang === 'hi' ? 'मंत्र जप एवं तानपूरा ध्वनि' : 'Sacred Chants & Meditation'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="text-white/60 hover:text-white p-0.5"
                title="Minimize"
              >
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-sm font-bold text-[#ffdea3] leading-tight">
                  {currentTrack.title}
                </h4>
                <p className="text-[10px] text-white/70 mt-0.5">
                  {currentTrack.deity} • {currentTrack.notes}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevTrack}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs"
                  title="Previous"
                >
                  ⏮
                </button>
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow ${
                    isPlaying
                      ? 'bg-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button
                  type="button"
                  onClick={handleNextTrack}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs"
                  title="Next"
                >
                  ⏭
                </button>
              </div>
            </div>

            {isPlaying && (
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-2/3 animate-pulse rounded-full" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
