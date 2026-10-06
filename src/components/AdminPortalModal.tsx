import React, { useState, useEffect } from 'react';
import { TEMPLE_INFO } from '../data/templeData';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'hi' | 'en';
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose, lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'donations' | 'passes' | 'yajmans' | 'articles'>('donations');
  const [donations, setDonations] = useState<any[]>([]);
  const [passes, setPasses] = useState<any[]>([]);
  const [yajmans, setYajmans] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const d = JSON.parse(localStorage.getItem('mandir_donation_receipts') || '[]');
        const p = JSON.parse(localStorage.getItem('mandir_darshan_passes') || '[]');
        const y = JSON.parse(localStorage.getItem('mandir_yajman_registrations') || '[]');
        const a = JSON.parse(localStorage.getItem('mandir_blog_articles') || '[]');
        setArticles(a);

        // Seed demo records if empty for rich showcase
        if (d.length === 0) {
          const sampleD = [
            {
              receiptNo: 'MDR-2026-842190',
              date: '04 Oct, 2026',
              devoteeName: 'आचार्य मदन मोहन झा',
              gotra: 'शांडिल्य',
              amount: 5100,
              purpose: 'नित्य सात्विक अन्नक्षेत्र महाप्रसाद',
              utrNo: 'SBI738291029481',
              phone: '+91 9811234567',
            },
            {
              receiptNo: 'MDR-2026-618492',
              date: '03 Oct, 2026',
              devoteeName: 'श्रीमती सुनीता देवी',
              gotra: 'कश्यप',
              amount: 2100,
              purpose: 'गौमाता चारा, गुड़ एवं संरक्षण सेवा',
              utrNo: 'SBI928471039572',
              phone: '+91 9876501234',
            },
            {
              receiptNo: 'MDR-2026-109284',
              date: '02 Oct, 2026',
              devoteeName: 'श्री राजेश शर्मा',
              gotra: 'भारद्वाज',
              amount: 11000,
              purpose: 'मंदिर जीर्णोद्धार एवं विस्तार',
              utrNo: 'SBI382910485720',
              phone: '+91 9988776655',
            },
          ];
          setDonations(sampleD);
        } else {
          setDonations(d);
        }

        if (p.length === 0) {
          const sampleP = [
            {
              passId: 'SDP-847291',
              date: '2026-10-06',
              devoteeName: 'गौरव मिश्रा',
              gotra: 'वत्स',
              devoteesCount: 4,
              timeSlot: '08:00 AM - मंगला आरती',
              phone: '+91 9711223344',
            },
            {
              passId: 'SDP-592831',
              date: '2026-10-06',
              devoteeName: 'अमित कुमार सिंह',
              gotra: 'कश्यप',
              devoteesCount: 2,
              timeSlot: '09:00 PM - संध्या महाआरती',
              phone: '+91 9812345678',
            },
          ];
          setPasses(sampleP);
        } else {
          setPasses(p);
        }

        if (y.length === 0) {
          const sampleY = [
            {
              id: 'YJM-101',
              name: 'पं. रामानंद तिवारी',
              gotra: 'शांडिल्य',
              eventTitle: 'श्री श्री १०८ दुर्गा पूजा का भव्य एवं अलौकिक महोत्सव',
              sevaType: 'मुख्य यजमान (Chief Sponsor)',
              phone: '+91 9415012345',
              date: '04 Oct, 2026',
            },
          ];
          setYajmans(sampleY);
        } else {
          setYajmans(y);
        }
      } catch (_) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalDonationAmount = donations.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const filteredDonations = donations.filter(
    (item) =>
      item.devoteeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.receiptNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.includes(searchQuery)
  );

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ReceiptNo,Devotee,Gotra,Amount,Purpose,Phone,Date']
        .concat(
          donations.map(
            (d) =>
              `"${d.receiptNo}","${d.devoteeName}","${d.gotra}",${d.amount},"${d.purpose}","${d.phone}","${d.date}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'mandir_donations_audit.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-[#fff8f6] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border-2 border-[#b58a2a] flex flex-col relative">
        {/* Header */}
        <div className="p-5 bg-[#ffe9e2] border-b border-[#ffdbce] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#9d2f00] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2a170f]">
                {lang === 'hi' ? 'ट्रस्ट व्यवस्थापन एवं लेखा पोर्टल' : 'Temple Trust Administrative Dashboard'}
              </h3>
              <p className="text-xs text-[#705100] font-semibold">
                {TEMPLE_INFO.trustNameHi} • {TEMPLE_INFO.upiId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Analytics KPI Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white border-b border-[#ffe9e2]">
          <div className="bg-[#fff1ec] p-3 rounded-xl border border-[#ffe9e2]">
            <span className="text-[11px] text-[#8e7167] uppercase font-bold">कुल प्राप्त दान</span>
            <p className="font-serif text-xl font-bold text-[#9d2f00] mt-0.5">
              ₹{totalDonationAmount.toLocaleString('en-IN')}
            </p>
            <span className="text-[10px] text-green-700 font-semibold">100% 80G ऑडिट रिकॉर्ड</span>
          </div>

          <div className="bg-[#fff1ec] p-3 rounded-xl border border-[#ffe9e2]">
            <span className="text-[11px] text-[#8e7167] uppercase font-bold">कुल रसीदें</span>
            <p className="font-serif text-xl font-bold text-[#2a170f] mt-0.5">{donations.length}</p>
            <span className="text-[10px] text-[#705100] font-semibold">अधिकृत डिजिटल सील</span>
          </div>

          <div className="bg-[#fff1ec] p-3 rounded-xl border border-[#ffe9e2]">
            <span className="text-[11px] text-[#8e7167] uppercase font-bold">सुगम दर्शन पास</span>
            <p className="font-serif text-xl font-bold text-[#a82d68] mt-0.5">{passes.length}</p>
            <span className="text-[10px] text-[#5a4139] font-semibold">सक्रिय दर्शनार्थी</span>
          </div>

          <div className="bg-[#fff1ec] p-3 rounded-xl border border-[#ffe9e2]">
            <span className="text-[11px] text-[#8e7167] uppercase font-bold">पंजीकृत यजमान</span>
            <p className="font-serif text-xl font-bold text-[#705100] mt-0.5">{yajmans.length}</p>
            <span className="text-[10px] text-[#5a4139] font-semibold">आगामी उत्सव संकल्प</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#fff8f6] border-b border-[#ffe9e2]">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('donations')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'donations' ? 'bg-[#9d2f00] text-white shadow-sm' : 'bg-white text-[#5a4139] border border-[#ffe9e2]'
              }`}
            >
              दान रसीदें ({donations.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('passes')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'passes' ? 'bg-[#9d2f00] text-white shadow-sm' : 'bg-white text-[#5a4139] border border-[#ffe9e2]'
              }`}
            >
              दर्शन पास ({passes.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('yajmans')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'yajmans' ? 'bg-[#9d2f00] text-white shadow-sm' : 'bg-white text-[#5a4139] border border-[#ffe9e2]'
              }`}
            >
              यजमान सूची ({yajmans.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('articles')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'articles' ? 'bg-[#9d2f00] text-white shadow-sm' : 'bg-white text-[#5a4139] border border-[#ffe9e2]'
              }`}
            >
              समाचार व लेख ({articles.length})
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="भक्त का नाम / रसीद नं. खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#ffe9e2] text-xs bg-white flex-1 sm:w-60 focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
            />
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold shrink-0 flex items-center gap-1 shadow-sm"
              title="Download CSV"
            >
              <span className="material-symbols-outlined text-[15px]">download</span>
              <span>CSV</span>
            </button>
          </div>
        </div>

        {/* Table Records Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'donations' && (
            <div className="space-y-2">
              {filteredDonations.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3.5 rounded-2xl border border-[#ffe9e2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#9d2f00]">
                        {item.receiptNo}
                      </span>
                      <span className="text-[11px] text-[#8e7167]">📅 {item.date}</span>
                    </div>
                    <h5 className="font-serif text-sm font-bold text-[#2a170f] mt-0.5">
                      {item.devoteeName} ({item.gotra || 'कश्यप'})
                    </h5>
                    <p className="text-xs text-[#5a4139] mt-0.5">{item.purpose}</p>
                    <p className="text-[11px] text-[#705100] mt-0.5 font-mono">
                      📞 {item.phone} • UTR: {item.utrNo}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif text-lg font-bold text-[#9d2f00] block">
                      ₹{Number(item.amount).toLocaleString('en-IN')}
                    </span>
                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded mt-1">
                      सत्यापित दान
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'passes' && (
            <div className="space-y-2">
              {passes.map((pass, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3.5 rounded-2xl border border-[#ffe9e2] flex items-center justify-between shadow-sm"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-[#9d2f00]">{pass.passId}</span>
                    <h5 className="font-serif text-sm font-bold text-[#2a170f] mt-0.5">
                      {pass.devoteeName} ({pass.gotra})
                    </h5>
                    <p className="text-xs text-[#5a4139]">
                      दिनांक: {pass.date} • {pass.timeSlot}
                    </p>
                    <span className="text-[11px] text-[#705100]">📞 {pass.phone}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold bg-[#ffe9e2] text-[#9d2f00] px-3 py-1 rounded-full block">
                      {pass.devoteesCount} सदस्य
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'yajmans' && (
            <div className="space-y-2">
              {yajmans.map((y, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3.5 rounded-2xl border border-[#ffe9e2] flex items-center justify-between shadow-sm"
                >
                  <div>
                    <span className="text-xs font-bold text-[#a82d68] block">{y.eventTitle}</span>
                    <h5 className="font-serif text-sm font-bold text-[#2a170f] mt-0.5">
                      {y.name} (गोत्र: {y.gotra || 'वत्स'})
                    </h5>
                    <p className="text-xs text-[#705100] font-semibold">{y.sevaType}</p>
                    <span className="text-[11px] text-[#8e7167]">📞 {y.phone} • {y.date}</span>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full">
                    संकल्पित
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="space-y-3">
              {articles.length === 0 ? (
                <div className="text-center py-12 text-[#8e7167]">
                  <p className="text-xs">कोई लेख या समाचार नहीं मिला।</p>
                </div>
              ) : (
                articles.map((art, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-2xl border border-[#ffe9e2] flex items-center justify-between shadow-sm gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] bg-[#fff1ec] text-[#9d2f00] font-bold px-2 py-0.5 rounded-full">
                          {art.category === 'event' ? 'उत्सव' : art.category === 'spiritual' ? 'आध्यात्मिक' : art.category === 'history' ? 'इतिहास' : 'सेवा'}
                        </span>
                        <span className="text-[11px] text-[#8e7167] font-medium">{art.date}</span>
                        {art.isPinned && (
                          <span className="text-[10px] bg-[#ffdea3] text-[#390c00] font-bold px-1.5 py-0.2 rounded">
                            पिन किया गया
                          </span>
                        )}
                      </div>
                      <h5 className="font-serif text-sm font-bold text-[#2a170f]">
                        {art.titleHi}
                      </h5>
                      <p className="text-xs text-[#5a4139] mt-0.5 line-clamp-1">
                        {art.summaryHi}
                      </p>
                      <span className="text-[11px] text-[#705100] font-semibold">
                        लेखक: {art.authorHi}
                      </span>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('क्या आप इस लेख को हटाना चाहते हैं?')) {
                            const updated = articles.filter((a) => a.id !== art.id);
                            setArticles(updated);
                            localStorage.setItem('mandir_blog_articles', JSON.stringify(updated));
                          }
                        }}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition-all border border-red-200"
                      >
                        हटाएं
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
