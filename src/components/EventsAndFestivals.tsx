import React, { useState } from 'react';
import { FESTIVALS_DATA, FestivalItem } from '../data/templeData';
import { playTempleBell, playConchSound } from '../utils/audioEngine';

interface EventsAndFestivalsProps {
  lang: 'hi' | 'en';
  onDonateForEvent?: (eventTitle: string) => void;
}

export const EventsAndFestivals: React.FC<EventsAndFestivalsProps> = ({
  lang,
  onDonateForEvent,
}) => {
  const [selectedFestival, setSelectedFestival] = useState<FestivalItem | null>(null);
  const [showYajmanModal, setShowYajmanModal] = useState(false);
  const [activeEventTitle, setActiveEventTitle] = useState('');
  const [yajmanForm, setYajmanForm] = useState({
    name: '',
    gotra: '',
    phone: '',
    rashi: '',
    sevaType: 'मुख्य यजमान (Chief Sponsor)',
  });
  const [yajmanSuccess, setYajmanSuccess] = useState(false);

  const handleOpenYajman = (eventTitle: string) => {
    setActiveEventTitle(eventTitle);
    setShowYajmanModal(true);
    setYajmanSuccess(false);
  };

  const handleYajmanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yajmanForm.name || !yajmanForm.phone) return;

    playConchSound();
    playTempleBell();
    setYajmanSuccess(true);

    try {
      const records = JSON.parse(localStorage.getItem('mandir_yajman_registrations') || '[]');
      records.unshift({
        id: 'YJM-' + Date.now(),
        eventTitle: activeEventTitle,
        ...yajmanForm,
        date: new Date().toLocaleDateString(),
      });
      localStorage.setItem('mandir_yajman_registrations', JSON.stringify(records));
    } catch (_) {}
  };

  return (
    <section className="w-full bg-[#fff1ec] py-16 sm:py-20" id="events-section">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#9d2f00] font-bold">
              {lang === 'hi' ? 'सत्संग व उत्सव' : 'Spiritual Gatherings & Utsav'}
            </span>
            <h2 className="font-serif-devanagari text-2xl sm:text-4xl text-[#2a170f] font-bold mt-1">
              {lang === 'hi' ? 'मंदिर की नवीनतम सूचना एवं आगामी उत्सव' : 'Upcoming Festivals & Announcements'}
            </h2>
          </div>
          <span className="text-xs font-semibold text-[#705100] bg-white px-3.5 py-1.5 rounded-full border border-[#ffe9e2] shadow-sm">
            {lang === 'hi' ? 'वर्ष २०२६-२७ पावन पर्व' : 'Sanatana Calendar 2026-27'}
          </span>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FESTIVALS_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(44,24,16,0.06)] hover:shadow-[0_12px_28px_rgba(44,24,16,0.12)] hover:-translate-y-1 transition-all flex flex-col justify-between border border-[#ffe9e2]"
            >
              <div className="h-52 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={item.titleHi}
                  src={item.imageUrl}
                />
                <div className="absolute top-3 left-3 bg-[#a82d68] text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                  {lang === 'hi' ? item.badgeHi : item.badgeEn}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[#9d2f00] text-xs font-bold shadow">
                  {lang === 'hi' ? item.dateHi : item.dateEn}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-base sm:text-lg text-[#2a170f] font-bold hover:text-[#9d2f00] transition-colors leading-snug">
                    {lang === 'hi' ? item.titleHi : item.titleEn}
                  </h3>
                  <p className="text-xs text-[#5a4139] mt-2 line-clamp-3 leading-relaxed">
                    {lang === 'hi' ? item.descriptionHi : item.descriptionEn}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#ffe9e2]">
                  <button
                    type="button"
                    onClick={() => handleOpenYajman(lang === 'hi' ? item.titleHi : item.titleEn)}
                    className="w-full py-2 bg-[#fff1ec] hover:bg-[#ffe9e2] text-[#9d2f00] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <span>{lang === 'hi' ? 'पंजीकरण एवं सेवा संकल्प' : 'Register as Yajman'}</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFestival(item)}
                    className="w-full text-center text-[11px] text-[#705100] hover:text-[#9d2f00] font-semibold underline"
                  >
                    {lang === 'hi' ? 'विस्तृत कार्यक्रम विवरण देखें' : 'View Full Schedule'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Festival Details Modal */}
      {selectedFestival && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#fff8f6] rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#b58a2a]/40 p-6 relative">
            <button
              type="button"
              onClick={() => setSelectedFestival(null)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="h-56 rounded-2xl overflow-hidden mb-4 relative">
              <img
                src={selectedFestival.imageUrl}
                alt={selectedFestival.titleHi}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#9d2f00] text-white text-xs px-3 py-1 rounded-full font-bold">
                {lang === 'hi' ? selectedFestival.badgeHi : selectedFestival.badgeEn}
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#2a170f] font-bold mb-2">
              {lang === 'hi' ? selectedFestival.titleHi : selectedFestival.titleEn}
            </h3>
            <p className="text-xs text-[#705100] font-semibold mb-3">
              📅 {lang === 'hi' ? selectedFestival.dateHi : selectedFestival.dateEn}
            </p>
            <p className="text-sm text-[#5a4139] leading-relaxed mb-4">
              {lang === 'hi' ? selectedFestival.descriptionHi : selectedFestival.descriptionEn}
            </p>

            <div className="bg-white p-4 rounded-2xl border border-[#ffe9e2] mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9d2f00] mb-2">
                {lang === 'hi' ? 'मुख्य आकर्षण एवं अनुष्ठान:' : 'Key Highlights:'}
              </h4>
              <ul className="space-y-1.5 text-xs text-[#2a170f]">
                {(lang === 'hi' ? selectedFestival.highlightsHi : selectedFestival.highlightsEn).map(
                  (hl, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#9d2f00]">✦</span>
                      <span>{hl}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedFestival(null);
                  handleOpenYajman(lang === 'hi' ? selectedFestival.titleHi : selectedFestival.titleEn);
                }}
                className="flex-1 py-3 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-xl text-xs sm:text-sm font-bold shadow transition-colors"
              >
                {lang === 'hi' ? 'यजमान / सेवा संकल्प लें' : 'Enroll as Yajman'}
              </button>

              {onDonateForEvent && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFestival(null);
                    onDonateForEvent(lang === 'hi' ? selectedFestival.titleHi : selectedFestival.titleEn);
                  }}
                  className="px-5 py-3 bg-[#ffe9e2] text-[#9d2f00] rounded-xl text-xs sm:text-sm font-bold hover:bg-[#ffdbce] transition-colors"
                >
                  {lang === 'hi' ? 'सहयोग दान' : 'Contribute'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Yajman Registration Modal */}
      {showYajmanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#fff8f6] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#b58a2a]/40 p-6 relative">
            <button
              type="button"
              onClick={() => setShowYajmanModal(false)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="text-center mb-5">
              <span className="text-xs uppercase tracking-widest text-[#9d2f00] font-bold">
                ॥ यजमान संकल्प ॥
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#2a170f] font-bold mt-1">
                {lang === 'hi' ? 'उत्सव यजमान / सेवा पंजीयन' : 'Festival Yajman Registration'}
              </h3>
              <p className="text-xs text-[#705100] mt-1 font-semibold">{activeEventTitle}</p>
            </div>

            {!yajmanSuccess ? (
              <form onSubmit={handleYajmanSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                    {lang === 'hi' ? 'यजमान / भक्त का नाम *' : 'Yajman Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={yajmanForm.name}
                    onChange={(e) => setYajmanForm({ ...yajmanForm, name: e.target.value })}
                    placeholder="उदा: आचार्य रमेश उपाध्याय"
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
                      value={yajmanForm.gotra}
                      onChange={(e) => setYajmanForm({ ...yajmanForm, gotra: e.target.value })}
                      placeholder="उदा: शांडिल्य / कश्यप"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                      {lang === 'hi' ? 'राशि (Rashi)' : 'Rashi / Nakshatra'}
                    </label>
                    <input
                      type="text"
                      value={yajmanForm.rashi}
                      onChange={(e) => setYajmanForm({ ...yajmanForm, rashi: e.target.value })}
                      placeholder="उदा: मेष / रोहिणी"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                    {lang === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={yajmanForm.phone}
                    onChange={(e) => setYajmanForm({ ...yajmanForm, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                    {lang === 'hi' ? 'सेवा संकल्प श्रेणी' : 'Seva Category'}
                  </label>
                  <select
                    value={yajmanForm.sevaType}
                    onChange={(e) => setYajmanForm({ ...yajmanForm, sevaType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  >
                    <option value="मुख्य यजमान (Chief Sponsor - महापूजन व आहुति)">
                      मुख्य यजमान (Chief Sponsor - महापूजन व आहुति)
                    </option>
                    <option value="सह-यजमान (Co-Yajman - सपरिवार संकल्प)">
                      सह-यजमान (Co-Yajman - सपरिवार संकल्प)
                    </option>
                    <option value="महाप्रसाद अन्नदान यजमान (Annakshetra Sponsor)">
                      महाप्रसाद अन्नदान यजमान (Annakshetra Sponsor)
                    </option>
                    <option value="पुष्प एवं श्रृंगार सेवा (Floral Decor Seva)">
                      पुष्प एवं श्रृंगार सेवा (Floral Decor Seva)
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-xl text-sm font-bold shadow-lg transition-colors mt-2"
                >
                  {lang === 'hi' ? 'यजमान संकल्प पुष्टि करें' : 'Confirm Yajman Registration'}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h4 className="font-serif text-xl font-bold text-[#2a170f]">
                  {lang === 'hi' ? 'यजमान संकल्प सफलतापूर्वक दर्ज हुआ!' : 'Yajman Registration Confirmed!'}
                </h4>
                <p className="text-xs text-[#5a4139] leading-relaxed">
                  {lang === 'hi'
                    ? 'मंदिर मुख्य पुजारी एवं ट्रस्ट समिति द्वारा आपके नाम एवं गोत्र से पावन संकल्प उच्चारित किया जाएगा। आपको एसएमएस द्वारा विवरण भेजा जाएगा।'
                    : 'Your name and gotra will be invoked in the sacred ritual sankalpa by the temple head priests.'}
                </p>
                <button
                  type="button"
                  onClick={() => setShowYajmanModal(false)}
                  className="px-6 py-2.5 bg-[#9d2f00] text-white rounded-xl text-xs font-bold"
                >
                  {lang === 'hi' ? 'समाप्त करें' : 'Done'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
