import React, { useState } from 'react';
import { TEMPLE_INFO } from '../data/templeData';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: 'hi' | 'en';
  setLang: (lang: 'hi' | 'en') => void;
  onOpenLiveDarshan: () => void;
  onOpenAdmin: () => void;
  onOpenUserProfile: () => void;
  onOpenChatbot?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  onOpenLiveDarshan,
  onOpenAdmin,
  onOpenUserProfile,
  onOpenChatbot,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelHi: 'होम', labelEn: 'Home' },
    { id: 'panchang', labelHi: 'दैनिक पंचांग', labelEn: 'Daily Panchang' },
    { id: 'about', labelHi: 'मंदिर परिचय', labelEn: 'About Mandir' },
    { id: 'deities', labelHi: 'आराध्य देव', labelEn: 'Deities Sanctum' },
    { id: 'darshan', labelHi: 'दर्शन व आरती', labelEn: 'Darshan & Aarti' },
    { id: 'festivals', labelHi: 'उत्सव व कार्यक्रम', labelEn: 'Events & Festivals' },
    { id: 'gallery', labelHi: 'छायाचित्र', labelEn: 'Gallery' },
    { id: 'donation', labelHi: 'सेवा एवं दान', labelEn: 'Seva & Donation' },
    { id: 'contact', labelHi: 'स्थान व संपर्क', labelEn: 'Location & Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_2px_12px_rgba(44,24,16,0.08)] bg-[#fff8f6]">
      {/* Top Auspicious Marquee / Info Bar */}
      <div className="bg-[#9d2f00] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-10 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
            <span className="material-symbols-outlined text-[16px] text-[#ffdea3]">wb_sunny</span>
            <span className="font-semibold text-[#ffdea3] tracking-wide">॥ ॐ नमो भगवते वासुदेवाय ॥</span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:inline text-white/90">
              {lang === 'hi' ? 'दैनिक दर्शन प्रात: 05:30 से सायं 09:30 बजे तक' : 'Daily Darshan: 05:30 AM to 09:30 PM'}
            </span>
            <span className="hidden lg:inline text-white/40">|</span>
            <span className="hidden lg:inline text-white/90">
              {lang === 'hi' ? 'संपर्क:' : 'Helpline:'} +91 8470092721 / +91 7982758754
            </span>
            <span className="hidden xl:inline text-white/40">|</span>
            <a
              href={`mailto:${TEMPLE_INFO.email}`}
              className="hidden xl:inline text-white/90 hover:text-[#ffdea3] transition-colors truncate"
            >
              {TEMPLE_INFO.email}
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-black/15 px-2 py-0.5 rounded-full text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`transition-colors px-1 rounded ${lang === 'hi' ? 'text-[#ffdea3] underline font-bold' : 'text-white/70 hover:text-white'}`}
              >
                हिंदी
              </button>
              <span className="text-white/30">/</span>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`transition-colors px-1 rounded ${lang === 'en' ? 'text-[#ffdea3] underline font-bold' : 'text-white/70 hover:text-white'}`}
              >
                EN
              </button>
            </div>

            {/* Quick Live Darshan Icon */}
            <button
              type="button"
              onClick={onOpenLiveDarshan}
              className="flex items-center gap-1 text-white/90 hover:text-[#ffdea3] transition-colors"
              title={lang === 'hi' ? 'लाइव दर्शन' : 'Live Darshan'}
            >
              <span className="material-symbols-outlined text-[17px] text-[#ffdea3] animate-pulse">videocam</span>
              <span className="hidden sm:inline text-xs font-medium">{lang === 'hi' ? 'लाइव दर्शन' : 'Live'}</span>
            </button>

            {/* Phone Quick Call */}
            <a
              href="tel:+918470092721"
              className="text-white/80 hover:text-[#ffdea3] transition-colors"
              title={lang === 'hi' ? 'फोन करें' : 'Call Mandir'}
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="h-20 bg-[#fff8f6]/95 backdrop-blur-xl border-b border-[#ffe9e2]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-full flex items-center justify-between gap-4">
          {/* Logo & Temple Branding */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 shrink-0 text-left group focus:outline-none"
          >
            <img
              alt="Temple Sacred Om Emblem"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              src={TEMPLE_INFO.omLogoUrl}
            />
            <div className="flex flex-col">
              <span className="font-serif-devanagari text-lg sm:text-xl font-bold text-[#9d2f00] leading-tight group-hover:text-[#c63f02] transition-colors">
                {TEMPLE_INFO.nameHi}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#705100] tracking-wider uppercase font-sans">
                {TEMPLE_INFO.nameEn}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 lg:gap-6 text-sm font-semibold">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`py-2 px-1 transition-all relative whitespace-nowrap ${
                    isActive
                      ? 'text-[#9d2f00] font-bold'
                      : 'text-[#5a4139] hover:text-[#9d2f00]'
                  }`}
                >
                  {lang === 'hi' ? item.labelHi : item.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9d2f00] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Donate CTA */}
            <button
              type="button"
              onClick={() => handleNavClick('donation')}
              className="inline-flex items-center gap-1.5 bg-[#9d2f00] hover:bg-[#c63f02] text-white px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-sm hover:shadow-md hover:scale-[1.02] transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#ffdea3]">volunteer_activism</span>
              <span>{lang === 'hi' ? 'दान करें' : 'Donate'}</span>
            </button>

            {/* Devotee / User Profile Button */}
            <button
              type="button"
              onClick={onOpenUserProfile}
              title={lang === 'hi' ? 'भक्त प्रोफाइल / रसीद' : 'Devotee Records'}
              className="w-9 h-9 rounded-full bg-[#ffe9e2] hover:bg-[#ffdbce] text-[#9d2f00] flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
            </button>

            {/* Devavani AI Assistant Button */}
            {onOpenChatbot && (
              <button
                type="button"
                onClick={onOpenChatbot}
                title={lang === 'hi' ? 'देववाणी AI मंदिर सहायक' : 'Devavani AI Assistant'}
                className="inline-flex items-center gap-1 bg-[#fff1ec] hover:bg-[#ffe2d8] text-[#9d2f00] px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold border border-[#ffe9e2] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-[#9d2f00]">forum</span>
                <span className="hidden md:inline">{lang === 'hi' ? 'AI सहायक' : 'AI Guide'}</span>
              </button>
            )}

            {/* Admin / Trust Portal Button */}
            <button
              type="button"
              onClick={onOpenAdmin}
              title={lang === 'hi' ? 'ट्रस्ट व्यवस्थापन (Admin Portal)' : 'Trust Admin'}
              className="w-9 h-9 rounded-full text-[#8e7167] hover:text-[#9d2f00] hover:bg-[#ffe9e2] flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
            </button>

            {/* Mobile Menu Toggle Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#2a170f] hover:bg-[#ffe9e2] transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fff8f6] border-b border-[#ffe9e2] shadow-xl px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-[#ffe9e2] text-[#9d2f00] font-bold'
                    : 'text-[#2a170f] hover:bg-[#fff1ec]'
                }`}
              >
                <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                <span className="material-symbols-outlined text-[16px] text-[#8e7167]">chevron_right</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#ffe9e2] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLiveDarshan();
              }}
              className="w-full py-2.5 px-4 bg-[#ffe2d8] text-[#9d2f00] rounded-xl font-bold text-sm flex items-center gap-2 justify-center"
            >
              <span className="material-symbols-outlined text-[18px]">videocam</span>
              <span>{lang === 'hi' ? 'लाइव दर्शन एवं आभासी आरती' : 'Live Darshan & Virtual Aarti'}</span>
            </button>
            <div className="text-center text-xs text-[#5a4139] pt-1">
              📞 +91 8470092721 | +91 7982758754
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
