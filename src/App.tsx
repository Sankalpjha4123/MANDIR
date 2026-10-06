/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { QuickTimings } from './components/QuickTimings';
import { DailyPanchang } from './components/DailyPanchang';
import { WelcomeSection } from './components/WelcomeSection';
import { DeitiesSanctum } from './components/DeitiesSanctum';
import { DarshanSchedule } from './components/DarshanSchedule';
import { EventsAndFestivals } from './components/EventsAndFestivals';
import { TempleUpdatesBlog } from './components/TempleUpdatesBlog';
import { GallerySection } from './components/GallerySection';
import { SevaAndDonation } from './components/SevaAndDonation';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { LiveDarshanModal } from './components/LiveDarshanModal';
import { AudioChantPlayer } from './components/AudioChantPlayer';
import { UserProfileModal } from './components/UserProfileModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { TempleChatbot } from './components/TempleChatbot';
import { TEMPLE_INFO } from './data/templeData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [liveDarshanOpen, setLiveDarshanOpen] = useState<boolean>(false);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);
  const [userProfileOpen, setUserProfileOpen] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState<boolean>(false);

  // Google Maps Platform Quota Defense listener
  useEffect(() => {
    const handleQuotaExceeded = () => {
      setGmpQuotaExceeded(true);
    };
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleOpenImage = (url: string, title: string) => {
    setLightboxImage({ url, title });
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#2a170f] font-sans flex flex-col selection:bg-[#ffdbd0] selection:text-[#390c00]">
      {/* Google Maps Quota Warning Banner (if triggered) */}
      {gmpQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        onOpenLiveDarshan={() => setLiveDarshanOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenUserProfile={() => setUserProfileOpen(true)}
        onOpenChatbot={() => {
          // Trigger the chatbot
          const btn = document.querySelector('button[aria-label="Open Devavani AI Chatbot"]') as HTMLButtonElement;
          if (btn) btn.click();
        }}
      />

      {/* Main Content Area */}
      <main className="w-full pt-[120px] flex-1">
        {currentTab === 'home' && (
          <div className="flex flex-col w-full -mt-[120px]">
            {/* Sacred Hero */}
            <Hero
              setCurrentTab={setCurrentTab}
              lang={lang}
              onOpenLiveDarshan={() => setLiveDarshanOpen(true)}
            />

            {/* Quick 4 Timings Strip */}
            <QuickTimings
              onViewSchedule={() => setCurrentTab('darshan')}
              lang={lang}
            />

            {/* Daily Vedic Panchang & Shubh Muhurat */}
            <DailyPanchang lang={lang} />

            {/* Welcome & Architectural Essence */}
            <WelcomeSection
              onLearnMore={() => setCurrentTab('about')}
              onOpenImage={handleOpenImage}
              lang={lang}
            />

            {/* Deities Sanctum Preview */}
            <DeitiesSanctum lang={lang} />

            {/* Daily Darshan & Aarti Schedule with E-Pass */}
            <DarshanSchedule lang={lang} />

            {/* Latest Announcements & Upcoming Festivals */}
            <EventsAndFestivals
              lang={lang}
              onDonateForEvent={() => setCurrentTab('donation')}
            />

            {/* Temple Updates, Historical Facts & Spiritual Blog */}
            <TempleUpdatesBlog lang={lang} />

            {/* Dedicated Seva & Donation Strip with SBI QR Code (Image 9) */}
            <SevaAndDonation lang={lang} />

            {/* Sacred Photo Gallery */}
            <GallerySection lang={lang} />

            {/* Mandir Contact & Location Guide */}
            <ContactSection lang={lang} />
          </div>
        )}

        {currentTab === 'about' && (
          <AboutSection
            lang={lang}
            onNavigateTab={setCurrentTab}
            onOpenImage={handleOpenImage}
          />
        )}

        {currentTab === 'panchang' && (
          <div className="pt-4">
            <DailyPanchang lang={lang} />
          </div>
        )}

        {currentTab === 'deities' && (
          <div className="pt-4">
            <DeitiesSanctum lang={lang} />
          </div>
        )}

        {currentTab === 'darshan' && (
          <div className="pt-4">
            <DarshanSchedule lang={lang} />
          </div>
        )}

        {currentTab === 'festivals' && (
          <div className="pt-4">
            <EventsAndFestivals
              lang={lang}
              onDonateForEvent={() => setCurrentTab('donation')}
            />
          </div>
        )}

        {currentTab === 'updates' && (
          <div className="pt-4">
            <TempleUpdatesBlog lang={lang} />
          </div>
        )}

        {currentTab === 'gallery' && (
          <div className="pt-4">
            <GallerySection lang={lang} />
          </div>
        )}

        {currentTab === 'donation' && (
          <div className="pt-4">
            <SevaAndDonation lang={lang} />
          </div>
        )}

        {currentTab === 'contact' && (
          <div className="pt-4">
            <ContactSection lang={lang} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        lang={lang}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 print:hidden">
        {/* Live Darshan Floating Pill */}
        <button
          type="button"
          onClick={() => setLiveDarshanOpen(true)}
          className="flex items-center gap-2 bg-white border border-[#ffe9e2] text-[#9d2f00] hover:bg-[#ffe2d8] px-4 py-2.5 rounded-full shadow-[0_4px_16px_rgba(44,24,16,0.12)] hover:scale-105 transition-all text-xs sm:text-sm font-bold"
        >
          <span className="material-symbols-outlined text-[20px] text-[#9d2f00] animate-pulse">
            videocam
          </span>
          <span className="hidden sm:inline">
            {lang === 'hi' ? 'लाइव दर्शन' : 'Live Darshan'}
          </span>
        </button>

        {/* WhatsApp Direct Chat */}
        <a
          href={`https://wa.me/${TEMPLE_INFO.whatsapp}?text=${encodeURIComponent(
            'जय श्री राधे! श्री १००८ नवचेतना शिव शक्ति मंदिर के बारे में जानकारी चाहिए।'
          )}`}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Support"
          className="flex items-center justify-center w-12 h-12 bg-[#a82d68] hover:bg-[#890f50] text-white rounded-full shadow-[0_4px_20px_rgba(168,45,104,0.35)] hover:scale-110 transition-all"
        >
          <span className="material-symbols-outlined text-[24px]">chat</span>
        </a>
      </div>

      {/* Bottom Floating Audio Mantra Chanting Widget */}
      <AudioChantPlayer lang={lang} />

      {/* Live Darshan & Virtual Aarti Modal */}
      <LiveDarshanModal
        isOpen={liveDarshanOpen}
        onClose={() => setLiveDarshanOpen(false)}
        lang={lang}
      />

      {/* Devotee User Profile & Receipts Modal */}
      <UserProfileModal
        isOpen={userProfileOpen}
        onClose={() => setUserProfileOpen(false)}
        lang={lang}
        onNavigateToDonation={() => setCurrentTab('donation')}
      />

      {/* Trust Admin Portal Modal */}
      <AdminPortalModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        lang={lang}
      />

      {/* Global Lightbox Image Viewer */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#fff8f6] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#b58a2a]/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="max-h-[75vh] flex items-center justify-center bg-black/10">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>
            <div className="p-4 bg-white border-t border-[#ffe9e2] text-center">
              <h4 className="font-serif text-lg font-bold text-[#9d2f00]">
                {lightboxImage.title}
              </h4>
            </div>
          </div>
        </div>
      )}
      {/* Devavani Gemini AI Chatbot */}
      <TempleChatbot lang={lang} />
    </div>
  );
}
