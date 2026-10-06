import React, { useState } from 'react';
import { AARTI_SCHEDULE, TEMPLE_INFO } from '../data/templeData';
import { playTempleBell } from '../utils/audioEngine';

interface DarshanScheduleProps {
  lang: 'hi' | 'en';
}

interface DarshanPass {
  passId: string;
  devoteeName: string;
  gotra: string;
  phone: string;
  devoteesCount: number;
  date: string;
  timeSlot: string;
  specialSeva: string;
}

export const DarshanSchedule: React.FC<DarshanScheduleProps> = ({ lang }) => {
  const [showPassModal, setShowPassModal] = useState(false);
  const [passData, setPassData] = useState({
    name: '',
    gotra: '',
    phone: '',
    devoteesCount: 2,
    date: new Date().toISOString().split('T')[0],
    slot: '08:00 AM - मंगला आरती (Morning)',
    specialSeva: 'सामान्य सुगम दर्शन (General Darshan)',
  });
  const [generatedPass, setGeneratedPass] = useState<DarshanPass | null>(null);

  const morningAartis = AARTI_SCHEDULE.filter((a) => a.session === 'morning');
  const eveningAartis = AARTI_SCHEDULE.filter((a) => a.session === 'evening');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passData.name || !passData.phone) return;

    const newPass: DarshanPass = {
      passId: 'SDP-' + Math.floor(100000 + Math.random() * 900000),
      devoteeName: passData.name,
      gotra: passData.gotra || 'कश्यप (Kashyap)',
      phone: passData.phone,
      devoteesCount: Number(passData.devoteesCount),
      date: passData.date,
      timeSlot: passData.slot,
      specialSeva: passData.specialSeva,
    };

    setGeneratedPass(newPass);
    playTempleBell();

    // Save to localStorage for Devotee Profile records
    try {
      const existing = JSON.parse(localStorage.getItem('mandir_darshan_passes') || '[]');
      existing.unshift(newPass);
      localStorage.setItem('mandir_darshan_passes', JSON.stringify(existing));
    } catch (_) {}
  };

  const printPass = () => {
    window.print();
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 sm:py-20 w-full" id="darshan-schedule">
      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs sm:text-sm uppercase tracking-widest text-[#9d2f00] font-bold">
          {lang === 'hi' ? 'दैनिक समय सारिणी' : 'Daily Mandir Timings'}
        </span>
        <h2 className="font-serif-devanagari text-2xl sm:text-4xl text-[#2a170f] font-bold mt-2">
          {lang === 'hi' ? 'दर्शन एवं आरती का समय' : 'Darshan & Daily Aarti Timetable'}
        </h2>
        <p className="text-sm sm:text-base text-[#5a4139] mt-3">
          {lang === 'hi'
            ? 'दर्शनार्थी समय अनुसार मंदिर पधारें एवं दिव्य मंगल आरती का पुण्य लाभ प्राप्त करें।'
            : 'Pilgrims are warmly welcome during sanctum opening hours to experience sacred aartis.'}
        </p>

        {/* Quick VIP E-Pass Trigger */}
        <div className="mt-5">
          <button
            type="button"
            onClick={() => {
              setGeneratedPass(null);
              setShowPassModal(true);
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-full text-xs sm:text-sm font-bold shadow-md hover:scale-[1.02] transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffdea3]">qr_code</span>
            <span>{lang === 'hi' ? 'सुगम / विशेष दर्शन पास बुक करें' : 'Book VIP Darshan E-Pass'}</span>
          </button>
        </div>
      </div>

      {/* Two-Column Schedule Layout (Morning vs Evening) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Morning Session */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(44,24,16,0.06)] border border-[#ffe9e2] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 bg-[#fff1ec] -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 rounded-t-3xl mb-6 border-b border-[#ffe9e2]">
              <div className="flex items-center gap-2 text-[#9d2f00]">
                <span className="material-symbols-outlined text-[26px]">wb_sunny</span>
                <h3 className="font-serif text-lg sm:text-xl font-bold">
                  {lang === 'hi' ? 'प्रातःकालीन सत्र' : 'Morning Session'}
                </h3>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-[#ffdbd0] text-[#9d2f00] text-xs font-bold">
                05:30 AM – 12:30 PM
              </span>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm">
              {morningAartis.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    item.isMajor
                      ? 'bg-[#fff1ec] border border-[#ffdbce]'
                      : 'bg-[#fff8f6] hover:bg-[#fff1ec]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => playTempleBell()}
                      title={lang === 'hi' ? 'घंटी बजाएं' : 'Ring Bell'}
                      className="text-[#9d2f00] hover:scale-125 transition-transform"
                    >
                      <span className="material-symbols-outlined text-[16px]">notifications_active</span>
                    </button>
                    <div>
                      <span className="font-bold text-[#2a170f] block">
                        {lang === 'hi' ? item.nameHi : item.nameEn}
                      </span>
                      <span className="text-[11px] text-[#705100]">
                        {lang === 'hi' ? item.noteHi : item.noteEn}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#9d2f00] bg-white px-3 py-1 rounded-lg border border-[#ffe9e2] shrink-0">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Evening Session */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(44,24,16,0.06)] border border-[#ffe9e2] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 bg-[#ffd9e4] -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 rounded-t-3xl mb-6 border-b border-[#ffb0cc]">
              <div className="flex items-center gap-2 text-[#a82d68]">
                <span className="material-symbols-outlined text-[26px]">nights_stay</span>
                <h3 className="font-serif text-lg sm:text-xl font-bold">
                  {lang === 'hi' ? 'सांध्यकालीन सत्र' : 'Evening Session'}
                </h3>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-white text-[#a82d68] text-xs font-bold">
                04:30 PM – 09:30 PM
              </span>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm">
              {eveningAartis.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    item.isMajor
                      ? 'bg-[#fff1ec] border border-[#ffdbce]'
                      : 'bg-[#fff8f6] hover:bg-[#fff1ec]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => playTempleBell()}
                      title={lang === 'hi' ? 'घंटी बजाएं' : 'Ring Bell'}
                      className="text-[#a82d68] hover:scale-125 transition-transform"
                    >
                      <span className="material-symbols-outlined text-[16px]">notifications_active</span>
                    </button>
                    <div>
                      <span className="font-bold text-[#2a170f] block">
                        {lang === 'hi' ? item.nameHi : item.nameEn}
                      </span>
                      <span className="text-[11px] text-[#705100]">
                        {lang === 'hi' ? item.noteHi : item.noteEn}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#a82d68] bg-white px-3 py-1 rounded-lg border border-[#ffe9e2] shrink-0">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notice Footnote Banner */}
      <div className="mt-8 p-4 sm:p-5 bg-[#ffe9e2] rounded-2xl flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left justify-between border border-[#ffdbce]">
        <div className="flex items-center gap-3 text-[#5a4139] text-xs sm:text-sm">
          <span className="material-symbols-outlined text-[#9d2f00] text-[22px] shrink-0">info</span>
          <span>
            {lang === 'hi'
              ? 'समय विशेष पर्वों एवं ग्रहण काल पर परिवर्तित हो सकता है। विशेष पूजा एवं अभिषेक हेतु कम से कम 24 घंटे पूर्व पंजीकरण कराएं।'
              : 'Timings may adjust slightly during eclipses and grand festivals. For special abhishek ceremonies, register at least 24 hours prior.'}
          </span>
        </div>
        <a
          href={`tel:${TEMPLE_INFO.phones[0]}`}
          className="inline-flex items-center gap-1 text-xs sm:text-sm text-[#9d2f00] font-bold hover:underline shrink-0"
        >
          <span>{lang === 'hi' ? 'पूछताछ: +91 8470092721' : 'Inquiries: +91 8470092721'}</span>
          <span className="material-symbols-outlined text-[16px]">call</span>
        </a>
      </div>

      {/* VIP / Sugam Darshan E-Pass Booking Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#fff8f6] rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#b58a2a]/40 p-6 relative">
            <button
              type="button"
              onClick={() => setShowPassModal(false)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {!generatedPass ? (
              <div>
                <div className="text-center mb-6">
                  <span className="inline-block px-3 py-1 bg-[#ffe9e2] text-[#9d2f00] text-xs font-bold rounded-full mb-2">
                    {lang === 'hi' ? 'सुगम दर्शन ई-पास' : 'Sugam Darshan Pass'}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#2a170f] font-bold">
                    {lang === 'hi' ? 'विशेष दर्शन पास पंजीयन' : 'Register for Darshan Pass'}
                  </h3>
                  <p className="text-xs text-[#5a4139] mt-1">
                    {lang === 'hi'
                      ? 'गर्भगृह में सुगम प्रवेश एवं दर्शन हेतु निःशुल्क डिजिटल ई-पास प्राप्त करें।'
                      : 'Generate your free digital entry pass for seamless sanctum darshan.'}
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                      {lang === 'hi' ? 'भक्त का पूरा नाम *' : 'Devotee Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={passData.name}
                      onChange={(e) => setPassData({ ...passData, name: e.target.value })}
                      placeholder={lang === 'hi' ? 'उदा: राजेश शर्मा' : 'e.g. Rajesh Sharma'}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                        {lang === 'hi' ? 'गोत्र (Gotra)' : 'Gotra'}
                      </label>
                      <input
                        type="text"
                        value={passData.gotra}
                        onChange={(e) => setPassData({ ...passData, gotra: e.target.value })}
                        placeholder="उदा: भारद्वाज / कश्यप"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                        {lang === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={passData.phone}
                        onChange={(e) => setPassData({ ...passData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                        {lang === 'hi' ? 'दर्शन दिनांक' : 'Darshan Date'}
                      </label>
                      <input
                        type="date"
                        value={passData.date}
                        onChange={(e) => setPassData({ ...passData, date: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                        {lang === 'hi' ? 'भक्तों की संख्या' : 'Number of Persons'}
                      </label>
                      <select
                        value={passData.devoteesCount}
                        onChange={(e) =>
                          setPassData({ ...passData, devoteesCount: Number(e.target.value) })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {lang === 'hi' ? 'सदस्य' : 'Person(s)'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                      {lang === 'hi' ? 'आरती एवं समय स्लॉट' : 'Time & Aarti Slot'}
                    </label>
                    <select
                      value={passData.slot}
                      onChange={(e) => setPassData({ ...passData, slot: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                    >
                      <option value="08:00 AM - मंगला आरती (Morning)">08:00 AM - मंगला आरती (Morning)</option>
                      <option value="10:00 AM - अभिषेक दर्शन (Abhishek)">10:00 AM - अभिषेक दर्शन (Abhishek)</option>
                      <option value="12:00 PM - राजभोग आरती (Rajbhog)">12:00 PM - राजभोग आरती (Rajbhog)</option>
                      <option value="06:00 PM - सुंदरकांड / सांध्य (Evening)">06:00 PM - सुंदरकांड / सांध्य (Evening)</option>
                      <option value="09:00 PM - संध्या महाआरती (Maha Aarti)">09:00 PM - संध्या महाआरती (Maha Aarti)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-xl text-sm font-bold shadow-lg transition-colors flex items-center justify-center gap-2 mt-4"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>{lang === 'hi' ? 'ई-पास जारी करें' : 'Generate Digital E-Pass'}</span>
                  </button>
                </form>
              </div>
            ) : (
              /* Printable Generated Pass Card */
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border-2 border-[#b58a2a] shadow-lg relative print:shadow-none">
                  <div className="text-center border-b border-[#ffe9e2] pb-3 mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#9d2f00] font-bold">
                      ॥ ॐ नमो भगवते वासुदेवाय ॥
                    </span>
                    <h4 className="font-serif-devanagari text-lg text-[#9d2f00] font-bold mt-0.5">
                      {TEMPLE_INFO.nameHi}
                    </h4>
                    <p className="text-[10px] text-[#705100] font-semibold">{TEMPLE_INFO.nameEn}</p>
                    <div className="inline-block px-3 py-0.5 bg-[#ffdea3] text-[#705100] text-xs font-bold rounded-full mt-1">
                      सुगम दर्शन पास • SUGAM DARSHAN PASS
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <span className="text-[#8e7167] block">पास क्रमांक / Pass ID:</span>
                      <span className="font-bold text-[#2a170f] font-mono">{generatedPass.passId}</span>
                    </div>
                    <div>
                      <span className="text-[#8e7167] block">दर्शन दिनांक / Date:</span>
                      <span className="font-bold text-[#2a170f]">{generatedPass.date}</span>
                    </div>
                    <div>
                      <span className="text-[#8e7167] block">भक्त का नाम / Devotee:</span>
                      <span className="font-bold text-[#2a170f]">{generatedPass.devoteeName}</span>
                    </div>
                    <div>
                      <span className="text-[#8e7167] block">गोत्र / Gotra:</span>
                      <span className="font-bold text-[#2a170f]">{generatedPass.gotra}</span>
                    </div>
                    <div>
                      <span className="text-[#8e7167] block">कुल सदस्य / Persons:</span>
                      <span className="font-bold text-[#9d2f00]">{generatedPass.devoteesCount} सदस्य</span>
                    </div>
                    <div>
                      <span className="text-[#8e7167] block">समय स्लॉट / Slot:</span>
                      <span className="font-bold text-[#9d2f00]">{generatedPass.timeSlot}</span>
                    </div>
                  </div>

                  {/* QR & Barcode Simulation */}
                  <div className="border-t border-dashed border-[#ffe9e2] pt-3 flex items-center justify-between">
                    <div className="text-[10px] text-[#5a4139]">
                      <p className="font-semibold text-green-700">✓ वैध एवं प्रमाणित पास</p>
                      <p>प्रवेश द्वार पर यह पास मोबाइल में दिखाएं</p>
                    </div>
                    <div className="w-16 h-16 bg-[#fff1ec] p-1 rounded-lg border border-[#ffe9e2] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[36px] text-[#9d2f00]">qr_code_2</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={printPass}
                    className="flex-1 py-2.5 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    <span>{lang === 'hi' ? 'पास प्रिंट / सेव करें' : 'Print / Save Pass'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGeneratedPass(null)}
                    className="px-4 py-2.5 bg-[#ffe9e2] hover:bg-[#ffdbce] text-[#9d2f00] rounded-xl text-xs font-bold"
                  >
                    {lang === 'hi' ? 'नया पास बनाएं' : 'New Pass'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
