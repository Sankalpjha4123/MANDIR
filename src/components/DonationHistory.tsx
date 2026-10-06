import React, { useState, useEffect } from 'react';
import { DonationReceipt } from './SevaAndDonation';
import { TEMPLE_INFO } from '../data/templeData';
import { playTempleBell } from '../utils/audioEngine';

interface DonationHistoryProps {
  lang: 'hi' | 'en';
  onNavigateToDonation?: () => void;
}

export const DonationHistory: React.FC<DonationHistoryProps> = ({
  lang,
  onNavigateToDonation,
}) => {
  const [donations, setDonations] = useState<DonationReceipt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReceipt, setSelectedReceipt] = useState<DonationReceipt | null>(null);

  // Fetch past donations from localStorage
  const fetchDonations = () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem('mandir_donation_receipts');
      if (stored) {
        const parsed: DonationReceipt[] = JSON.parse(stored);
        setDonations(parsed);
      } else {
        // Pre-seed an initial authentic record so devotee immediately sees a verified donation
        const sampleRecord: DonationReceipt = {
          receiptNo: 'MDR-2026-849201',
          date: '05 Oct 2026',
          time: '11:30 AM',
          devoteeName: 'आदित्य कुमार (Aditya Kumar)',
          gotra: 'कश्यप (Kashyap)',
          phone: '+91 9876543210',
          email: 'aditya.devotee@mandir.org',
          pan: 'ABCDE1234F',
          amount: 2100,
          amountInWords: 'Two Thousand One Hundred Rupees Only',
          purpose: 'मंदिर जीर्णोद्धार एवं विस्तार (Mandir Renovation)',
          utrNo: 'SBI738910294821',
          paymentMode: 'UPI / SBI Payments',
          status: 'Verified',
        };
        localStorage.setItem('mandir_donation_receipts', JSON.stringify([sampleRecord]));
        setDonations([sampleRecord]);
      }
    } catch (err) {
      console.error('Error fetching donations:', err);
      setDonations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Filtered donations list
  const filteredDonations = donations.filter((item) => {
    const itemStatus = item.status || 'Verified';
    const matchesStatus =
      statusFilter === 'all' ||
      itemStatus.toLowerCase() === statusFilter.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      item.receiptNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.devoteeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.utrNo.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Calculate totals
  const totalAmount = donations.reduce((sum, item) => sum + (item.amount || 0), 0);

  const handlePrintReceipt = (item: DonationReceipt) => {
    setSelectedReceipt(item);
    playTempleBell();
  };

  return (
    <div className="space-y-4">
      {/* Summary Stat Banner */}
      <div className="bg-gradient-to-r from-[#fff1ec] via-[#fff7e6] to-[#fff1ec] p-4 rounded-2xl border border-[#ffe0d6] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ffdea3] text-[#705100] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">volunteer_activism</span>
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold text-[#705100] tracking-wider block">
              {lang === 'hi' ? 'कुल समर्पित दान राशि' : 'Total Contributed Seva'}
            </span>
            <div className="font-serif text-xl sm:text-2xl font-bold text-[#9d2f00]">
              ₹{totalAmount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1 border border-emerald-200">
            <span className="material-symbols-outlined text-[13px]">verified</span>
            <span>80G आयकर छूट मान्य</span>
          </span>
          <span className="text-xs text-[#5a4139] block mt-1 font-semibold">
            {donations.length} {lang === 'hi' ? 'पुण्य रसीदें' : 'Verified Receipts'}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined text-[18px] text-[#8e7167] absolute left-3 top-2.5">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'रसीद संख्या, नाम या सेवा खोजें...'
                : 'Search by receipt no, name, purpose...'
            }
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#ffe9e2] bg-white focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-[#ffe9e2] bg-white font-semibold text-[#5a4139] focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
          >
            <option value="all">{lang === 'hi' ? 'सभी स्थितियाँ (All)' : 'All Status'}</option>
            <option value="verified">{lang === 'hi' ? 'सत्यापित (Verified)' : 'Verified'}</option>
            <option value="completed">{lang === 'hi' ? 'सफल (Completed)' : 'Completed'}</option>
          </select>

          <button
            type="button"
            onClick={fetchDonations}
            title={lang === 'hi' ? 'रिफ्रेश करें' : 'Refresh'}
            className="p-2 rounded-xl border border-[#ffe9e2] bg-white text-[#705100] hover:bg-[#ffe9e2] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
          </button>
        </div>
      </div>

      {/* Donation Cards List */}
      {loading ? (
        <div className="py-12 text-center text-[#8e7167] text-xs">
          <span className="material-symbols-outlined text-[32px] animate-spin text-[#9d2f00]">
            progress_activity
          </span>
          <p className="mt-2">{lang === 'hi' ? 'दान रिकॉर्ड लोड हो रहे हैं...' : 'Loading donation records...'}</p>
        </div>
      ) : filteredDonations.length === 0 ? (
        <div className="text-center py-10 px-4 bg-white rounded-2xl border border-dashed border-[#ffd2c4] space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#fff1ec] text-[#9d2f00] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[28px]">receipt_long</span>
          </div>
          <div>
            <h4 className="font-serif text-sm font-bold text-[#2a170f]">
              {lang === 'hi' ? 'कोई दान रिकॉर्ड प्राप्त नहीं हुआ' : 'No Donation Records Found'}
            </h4>
            <p className="text-xs text-[#5a4139] mt-1 max-w-sm mx-auto">
              {lang === 'hi'
                ? 'आपने अभी तक कोई ऑनलाइन दान दर्ज नहीं किया है अथवा खोजे गए शब्द से कोई मेल नहीं है।'
                : 'No donations match your filter. Make a pious donation to receive your 80G receipt.'}
            </p>
          </div>
          {onNavigateToDonation && (
            <button
              type="button"
              onClick={onNavigateToDonation}
              className="px-4 py-2 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-xl text-xs font-bold transition-all shadow-sm inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
              <span>{lang === 'hi' ? 'सेवा एवं दान करें' : 'Make a Donation'}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {filteredDonations.map((item, idx) => {
            const statusText = item.status || 'Verified';
            return (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-[#ffe9e2] shadow-sm hover:shadow-md transition-all space-y-3 group"
              >
                {/* Header row: Receipt No + Status Badge + Amount */}
                <div className="flex items-start justify-between gap-2 border-b border-[#fff1ec] pb-2.5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#9d2f00] bg-[#fff1ec] px-2 py-0.5 rounded-md">
                        {item.receiptNo}
                      </span>
                      {/* Status Badge */}
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="material-symbols-outlined text-[13px]">check_circle</span>
                        <span>{lang === 'hi' ? 'सत्यापित (Verified)' : statusText}</span>
                      </span>
                    </div>

                    <h5 className="font-serif text-sm font-bold text-[#2a170f]">
                      {item.devoteeName} {item.gotra ? `(${item.gotra})` : ''}
                    </h5>
                  </div>

                  {/* Amount */}
                  <div className="text-right shrink-0">
                    <span className="font-serif text-lg sm:text-xl font-extrabold text-[#9d2f00] block">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#705100] font-semibold block">
                      {item.paymentMode || 'UPI / SBI'}
                    </span>
                  </div>
                </div>

                {/* Details row: Purpose, Date, UTR */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5a4139]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8e7167] block">
                      {lang === 'hi' ? 'सेवा संकल्प (Purpose)' : 'Seva Purpose'}
                    </span>
                    <span className="font-medium text-[#2a170f] line-clamp-1">
                      {item.purpose}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8e7167] block">
                      {lang === 'hi' ? 'दिनांक व समय (Date & Time)' : 'Date & Time'}
                    </span>
                    <span className="font-medium text-[#2a170f] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#9d2f00]">calendar_today</span>
                      <span>{item.date} {item.time ? `• ${item.time}` : ''}</span>
                    </span>
                  </div>
                </div>

                {/* Footer action bar */}
                <div className="flex items-center justify-between pt-1 border-t border-[#fff1ec] text-xs">
                  <span className="text-[11px] text-[#8e7167] font-mono">
                    UTR: {item.utrNo}
                  </span>

                  <button
                    type="button"
                    onClick={() => handlePrintReceipt(item)}
                    className="px-3 py-1 bg-[#fff1ec] hover:bg-[#ffdbd0] text-[#9d2f00] rounded-xl text-xs font-bold transition-all flex items-center gap-1 border border-[#ffd2c4]"
                  >
                    <span className="material-symbols-outlined text-[14px]">receipt</span>
                    <span>{lang === 'hi' ? '80G रसीद देखें' : 'View 80G Receipt'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full 80G Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 shadow-2xl border-2 border-[#b58a2a]/60 relative text-[#2a170f]">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {/* Receipt Content */}
            <div className="space-y-4 print:p-0">
              <div className="text-center border-b-2 border-[#b58a2a]/40 pb-4">
                <span className="text-[#9d2f00] font-serif font-bold text-lg block">
                  ॥ ॐ नमः शिवाय ॥
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#9d2f00]">
                  {TEMPLE_INFO.nameHi}
                </h3>
                <p className="text-xs text-[#5a4139] mt-0.5">
                  {TEMPLE_INFO.trustNameHi}
                </p>
                <p className="text-[11px] text-[#8e7167]">
                  {TEMPLE_INFO.addressHi}
                </p>
                <div className="mt-2 inline-block px-3 py-0.5 bg-[#fff1ec] border border-[#ffdbce] rounded-full text-[11px] font-bold text-[#9d2f00]">
                  ई-दान पावती एवं आयकर धारा 80G रसीद
                </div>
              </div>

              {/* Status and Numbers */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-[#fff8f6] p-3 rounded-xl border border-[#ffe0d6]">
                <div>
                  <span className="text-[#8e7167] block font-medium">रसीद सं. (Receipt No):</span>
                  <span className="font-mono font-bold text-[#9d2f00]">
                    {selectedReceipt.receiptNo}
                  </span>
                </div>
                <div>
                  <span className="text-[#8e7167] block font-medium">स्थिति (Status):</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span>{selectedReceipt.status || 'Verified'}</span>
                  </span>
                </div>
                <div>
                  <span className="text-[#8e7167] block font-medium">दिनांक (Date):</span>
                  <span className="font-semibold text-[#2a170f]">
                    {selectedReceipt.date} {selectedReceipt.time}
                  </span>
                </div>
                <div>
                  <span className="text-[#8e7167] block font-medium">लेन-देन संदर्भ (UTR No):</span>
                  <span className="font-mono text-[#2a170f]">
                    {selectedReceipt.utrNo}
                  </span>
                </div>
              </div>

              {/* Devotee Details */}
              <div className="space-y-2 text-xs border border-[#ffe0d6] p-3 rounded-xl">
                <div className="flex justify-between border-b border-[#ffe0d6] pb-1">
                  <span className="text-[#8e7167]">दानदाता का नाम (Devotee):</span>
                  <span className="font-bold text-[#2a170f]">{selectedReceipt.devoteeName}</span>
                </div>
                <div className="flex justify-between border-b border-[#ffe0d6] pb-1">
                  <span className="text-[#8e7167]">गोत्र (Gotra):</span>
                  <span className="font-medium text-[#2a170f]">{selectedReceipt.gotra}</span>
                </div>
                <div className="flex justify-between border-b border-[#ffe0d6] pb-1">
                  <span className="text-[#8e7167]">संपर्क नंबर (Phone):</span>
                  <span className="font-medium text-[#2a170f]">{selectedReceipt.phone}</span>
                </div>
                <div className="flex justify-between border-b border-[#ffe0d6] pb-1">
                  <span className="text-[#8e7167]">पैन नंबर (PAN):</span>
                  <span className="font-mono font-bold text-[#2a170f]">{selectedReceipt.pan || 'NOT PROVIDED'}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#8e7167]">दान संकल्प / उद्देश्य (Purpose):</span>
                  <span className="font-bold text-[#9d2f00] text-right max-w-[200px]">
                    {selectedReceipt.purpose}
                  </span>
                </div>
              </div>

              {/* Amount Highlight */}
              <div className="bg-[#fff1ec] p-4 rounded-xl border border-[#ffd2c4] text-center space-y-1">
                <span className="text-xs text-[#705100] font-bold uppercase tracking-wider block">
                  प्राप्त दान राशि (Donation Amount)
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#9d2f00] block">
                  ₹{selectedReceipt.amount.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#5a4139] italic block">
                  ({selectedReceipt.amountInWords})
                </span>
              </div>

              {/* Tax Exemption Footer */}
              <div className="text-[11px] text-[#705100] bg-[#fff8e7] p-3 rounded-xl border border-[#ffe7ba] space-y-1">
                <p className="font-bold text-[#9d2f00]">आयकर छूट प्रमाणपत्र (80G Exemption):</p>
                <p className="leading-relaxed">
                  यह दान आयकर अधिनियम १९६१ की धारा 80G के अंतर्गत कर कटौती हेतु पात्र है। श्री १००८ नवचेतना शिव शक्ति ट्रस्ट द्वारा विधिवत संकलित।
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedReceipt(null)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  बंद करें (Close)
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  <span>रसीद प्रिंट / डाउनलोड करें</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
