import React, { useState, useEffect } from 'react';
import { DonationReceipt } from './SevaAndDonation';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'hi' | 'en';
}

interface SavedPass {
  passId: string;
  devoteeName: string;
  gotra: string;
  phone: string;
  devoteesCount: number;
  date: string;
  timeSlot: string;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, lang }) => {
  const [activeTab, setActiveTab] = useState<'receipts' | 'passes'>('receipts');
  const [receipts, setReceipts] = useState<DonationReceipt[]>([]);
  const [passes, setPasses] = useState<SavedPass[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const r = JSON.parse(localStorage.getItem('mandir_donation_receipts') || '[]');
        const p = JSON.parse(localStorage.getItem('mandir_darshan_passes') || '[]');
        setReceipts(r);
        setPasses(p);
      } catch (_) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#fff8f6] rounded-3xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl border-2 border-[#b58a2a]/40 p-6 flex flex-col relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#ffe9e2] text-[#9d2f00] flex items-center justify-center mx-auto mb-2">
            <span className="material-symbols-outlined text-[24px]">person</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#2a170f] font-bold">
            {lang === 'hi' ? 'भक्त सेवा रिकॉर्ड एवं रसीदें' : 'My Devotee Records & Receipts'}
          </h3>
          <p className="text-xs text-[#5a4139] mt-0.5">
            {lang === 'hi'
              ? 'आपके द्वारा बुक किए गए दर्शन पास एवं ऑनलाइन दान रसीदों का सुरक्षित विवरण'
              : 'View and reprint your verified passes and tax exemption receipts'}
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center gap-2 mt-4 bg-[#ffe9e2] p-1 rounded-xl w-fit mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('receipts')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'receipts' ? 'bg-white text-[#9d2f00] shadow-sm' : 'text-[#5a4139]'
              }`}
            >
              {lang === 'hi' ? 'ई-दान रसीदें' : 'Donation Receipts'} ({receipts.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('passes')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'passes' ? 'bg-white text-[#9d2f00] shadow-sm' : 'text-[#5a4139]'
              }`}
            >
              {lang === 'hi' ? 'दर्शन पास' : 'Darshan Passes'} ({passes.length})
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {activeTab === 'receipts' ? (
            receipts.length === 0 ? (
              <div className="text-center py-12 text-[#8e7167]">
                <span className="material-symbols-outlined text-[36px]">receipt_long</span>
                <p className="text-xs mt-2">
                  {lang === 'hi'
                    ? 'अभी तक कोई दान रसीद दर्ज नहीं है। आप "सेवा एवं दान" पृष्ठ से सहयोग कर सकते हैं।'
                    : 'No donation receipts found yet.'}
                </p>
              </div>
            ) : (
              receipts.map((rcpt, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-[#ffe9e2] shadow-sm flex items-center justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-[#9d2f00]">
                      {rcpt.receiptNo}
                    </span>
                    <h5 className="font-serif text-sm font-bold text-[#2a170f] mt-0.5">
                      {rcpt.devoteeName} ({rcpt.gotra})
                    </h5>
                    <p className="text-xs text-[#5a4139] mt-0.5">{rcpt.purpose}</p>
                    <span className="text-[11px] text-[#8e7167]">
                      {rcpt.date} • {rcpt.paymentMode}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif text-lg font-bold text-[#9d2f00] block">
                      ₹{rcpt.amount.toLocaleString('en-IN')}
                    </span>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="text-xs text-[#705100] underline font-bold mt-1"
                    >
                      {lang === 'hi' ? 'रसीद देखें' : 'Print'}
                    </button>
                  </div>
                </div>
              ))
            )
          ) : passes.length === 0 ? (
            <div className="text-center py-12 text-[#8e7167]">
              <span className="material-symbols-outlined text-[36px]">qr_code</span>
              <p className="text-xs mt-2">
                {lang === 'hi'
                  ? 'अभी तक कोई दर्शन पास बुक नहीं किया गया है।'
                  : 'No active darshan passes.'}
              </p>
            </div>
          ) : (
            passes.map((pass, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-[#ffe9e2] shadow-sm flex items-center justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#9d2f00]">
                    {pass.passId}
                  </span>
                  <h5 className="font-serif text-sm font-bold text-[#2a170f] mt-0.5">
                    {pass.devoteeName} ({pass.gotra})
                  </h5>
                  <p className="text-xs text-[#5a4139] mt-0.5">
                    📅 {pass.date} • {pass.timeSlot}
                  </p>
                  <span className="text-[11px] text-[#705100] font-semibold">
                    {pass.devoteesCount} सदस्य (Persons)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-[#fff1ec] hover:bg-[#ffe9e2] text-[#9d2f00] rounded-xl text-xs font-bold shrink-0"
                >
                  {lang === 'hi' ? 'पास देखें' : 'View Pass'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
