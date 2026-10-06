// Source: Google Maps Platform Code Assist
import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { TEMPLE_INFO } from '../data/templeData';

interface TempleLocationMapProps {
  lang: 'hi' | 'en';
}

const TEMPLE_COORDINATES = {
  lat: 28.7360,
  lng: 77.2625,
};

export const TempleLocationMap: React.FC<TempleLocationMapProps> = ({ lang }) => {
  const [infoOpen, setInfoOpen] = useState(true);
  const [copiedCoords, setCopiedCoords] = useState(false);

  // Maps API Key from environment or provisioned demo key
  const apiKey =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBiD6Y34XvzEtOu07eF_ilxIe6jl6MT7aY';

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Shri 1008 Nav Chetna Shiv Shakti, Street No. 3, Ram Rahim Chowk, Milan Garden, Sabhapur, Delhi 110094'
  )}`;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${TEMPLE_COORDINATES.lat}, ${TEMPLE_COORDINATES.lng}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 3000);
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden border-2 border-[#b58a2a]/40 shadow-xl bg-white">
      {/* Map Header Bar */}
      <div className="bg-gradient-to-r from-[#9d2f00] to-[#c63f02] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-[#ffdea3] shrink-0">
            <span className="material-symbols-outlined text-[24px]">pin_drop</span>
          </div>
          <div>
            <h3 className="font-serif-devanagari text-base sm:text-lg font-bold text-[#ffdea3] leading-tight">
              {lang === 'hi' ? 'मंदिर की वास्तविक स्थिति (Live Google Map)' : 'Live Mandir Location on Google Maps'}
            </h3>
            <p className="text-xs text-white/90">
              {TEMPLE_INFO.addressHi}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyCoords}
            className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-full text-xs font-semibold text-white transition-colors flex items-center gap-1 border border-white/20"
          >
            <span className="material-symbols-outlined text-[14px]">
              {copiedCoords ? 'check' : 'content_copy'}
            </span>
            <span>{copiedCoords ? (lang === 'hi' ? 'GPS कॉपी हुआ!' : 'Copied!') : (lang === 'hi' ? 'GPS निर्देशांक' : 'Copy GPS')}</span>
          </button>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-[#ffdea3] hover:bg-white text-[#390c00] rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px] text-[#9d2f00]">directions</span>
            <span>{lang === 'hi' ? 'मार्गदर्शन प्राप्त करें (Directions)' : 'Get Directions'}</span>
          </a>
        </div>
      </div>

      {/* Google Map Container with explicit height */}
      <div className="relative w-full h-[420px] sm:h-[480px]">
        <APIProvider apiKey={apiKey}>
          <Map
            defaultCenter={TEMPLE_COORDINATES}
            defaultZoom={16}
            mapId="DEMO_MAP_ID"
            gestureHandling="cooperative"
            disableDefaultUI={false}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
          >
            <AdvancedMarker
              position={TEMPLE_COORDINATES}
              onClick={() => setInfoOpen(true)}
              title={TEMPLE_INFO.nameHi}
            >
              <Pin
                background="#9d2f00"
                borderColor="#ffdea3"
                glyphColor="#ffdea3"
                scale={1.3}
              />
            </AdvancedMarker>

            {infoOpen && (
              <InfoWindow
                position={TEMPLE_COORDINATES}
                onCloseClick={() => setInfoOpen(false)}
                headerContent={
                  <div className="font-serif font-bold text-sm text-[#9d2f00]">
                    {TEMPLE_INFO.nameHi}
                  </div>
                }
              >
                <div className="p-1 max-w-xs text-xs space-y-2">
                  <div className="rounded-lg overflow-hidden h-24 w-full relative">
                    <img
                      src={TEMPLE_INFO.templeBuildingImageUrl}
                      alt="Mandir Spire"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[#2a170f] font-medium leading-relaxed">
                    {TEMPLE_INFO.addressHi}
                  </p>
                  <p className="text-[#705100] font-semibold">
                    ⏰ {lang === 'hi' ? 'दैनिक दर्शन:' : 'Darshan:'} 05:30 AM – 09:30 PM
                  </p>
                  <div className="pt-1">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#9d2f00] text-white rounded-md text-[11px] font-bold"
                    >
                      <span className="material-symbols-outlined text-[13px]">navigation</span>
                      <span>{lang === 'hi' ? 'नेविगेट करें' : 'Navigate Here'}</span>
                    </a>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>

      {/* Transit & Commute Guidance Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#ffe9e2] bg-[#fff8f6] p-4 sm:p-5 text-xs text-[#5a4139]">
        <div className="p-3 space-y-1">
          <div className="flex items-center gap-2 text-[#9d2f00] font-bold">
            <span className="material-symbols-outlined text-[18px]">subway</span>
            <span>{lang === 'hi' ? 'निकटतम मेट्रो स्टेशन' : 'Nearest Metro Stations'}</span>
          </div>
          <p className="leading-relaxed">
            गोकुलपुरी (Pink Line - 3.5 किमी) अथवा शिव विहार मेट्रो स्टेशन। दोनों स्टेशनों से सभापुर, राम रहीम चौक के लिए ई-रिक्शा सीधे उपलब्ध हैं।
          </p>
        </div>

        <div className="p-3 space-y-1">
          <div className="flex items-center gap-2 text-[#705100] font-bold">
            <span className="material-symbols-outlined text-[18px]">directions_bus</span>
            <span>{lang === 'hi' ? 'बस एवं सड़क मार्ग' : 'Bus & Road Routes'}</span>
          </div>
          <p className="leading-relaxed">
            कश्मीरी गेट / खजूरी खास से सोनिया विहार मार्ग होते हुए सभापुर बस स्टैंड। वजीराबाद रोड और करावल नगर से भी सुगम कनेक्टिविटी।
          </p>
        </div>

        <div className="p-3 space-y-1">
          <div className="flex items-center gap-2 text-[#a82d68] font-bold">
            <span className="material-symbols-outlined text-[18px]">local_parking</span>
            <span>{lang === 'hi' ? 'पार्किंग एवं सुविधा' : 'Parking & Facilities'}</span>
          </div>
          <p className="leading-relaxed">
            मंदिर परिसर में दर्शनार्थियों के दोपहिया एवं चारपहिया वाहनों हेतु सुरक्षित एवं निःशुल्क पार्किंग व्यवस्था। व्हीलचेयर रैंप उपलब्ध।
          </p>
        </div>
      </div>
    </div>
  );
};
