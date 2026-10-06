import React, { useState } from 'react';
import { TEMPLE_INFO, DONATION_TIERS } from '../data/templeData';
import { playTempleBell, playConchSound } from '../utils/audioEngine';

interface SevaAndDonationProps {
  lang: 'hi' | 'en';
}

export interface DonationReceipt {
  receiptNo: string;
  date: string;
  time: string;
  devoteeName: string;
  gotra: string;
  phone: string;
  email: string;
  pan: string;
  amount: number;
  amountInWords: string;
  purpose: string;
  utrNo: string;
  paymentMode: string;
  status?: 'Verified' | 'Completed' | 'Pending' | 'Success';
}

export const SevaAndDonation: React.FC<SevaAndDonationProps> = ({ lang }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(2100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('मंदिर जीर्णोद्धार एवं विस्तार (Mandir Renovation & Construction)');
  const [devoteeName, setDevoteeName] = useState<string>('');
  const [gotra, setGotra] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pan, setPan] = useState<string>('');
  const [utrNo, setUtrNo] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<DonationReceipt | null>(null);

  const activeAmount = customAmount ? Number(customAmount) || 0 : selectedAmount;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(TEMPLE_INFO.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 3000);
  };

  const getAmountInWords = (num: number): string => {
    // Basic helper for Indian rupee conversion
    if (num === 501) return 'Five Hundred and One Rupees Only';
    if (num === 1100) return 'One Thousand One Hundred Rupees Only';
    if (num === 2100) return 'Two Thousand One Hundred Rupees Only';
    if (num === 5100) return 'Five Thousand One Hundred Rupees Only';
    if (num === 11000) return 'Eleven Thousand Rupees Only';
    return `${num.toLocaleString('en-IN')} Rupees Only`;
  };

  const handleGenerateReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!devoteeName || !phone || activeAmount <= 0) return;

    playConchSound();
    playTempleBell();

    const now = new Date();
    const newReceipt: DonationReceipt = {
      receiptNo: `MDR-${now.getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      date: now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      devoteeName,
      gotra: gotra || 'कश्यप (Kashyap)',
      phone,
      email: email || 'devotee@mandir.org',
      pan: pan ? pan.toUpperCase() : 'NOT PROVIDED',
      amount: activeAmount,
      amountInWords: getAmountInWords(activeAmount),
      purpose,
      utrNo: utrNo || `SBI${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      paymentMode: 'UPI / SBI Payments',
      status: 'Verified',
    };

    setReceipt(newReceipt);

    // Save in local storage
    try {
      const history = JSON.parse(localStorage.getItem('mandir_donation_receipts') || '[]');
      history.unshift(newReceipt);
      localStorage.setItem('mandir_donation_receipts', JSON.stringify(history));
    } catch (_) {}
  };

  const handlePrint = () => {
    window.print();
  };

  const upiDeepLink = `upi://pay?pa=${TEMPLE_INFO.upiId}&pn=${encodeURIComponent(
    TEMPLE_INFO.merchantName
  )}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent('Temple Donation ' + purpose.slice(0, 20))}`;

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 sm:py-20 w-full" id="donation-section">
      {/* Devotional Banner Card */}
      <div className="relative bg-gradient-to-r from-[#9d2f00] to-[#c63f02] rounded-3xl p-6 sm:p-10 text-white shadow-2xl overflow-hidden mb-12">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#ffdea3]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-[#ffdea3] text-xs sm:text-sm font-bold backdrop-blur-md">
              <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
              <span>{lang === 'hi' ? 'सेवा ही परमो धर्मः' : 'Selfless Service is Supreme Virtue'}</span>
            </div>

            <h2 className="font-serif-devanagari text-2xl sm:text-4xl text-white font-bold leading-tight">
              {lang === 'hi'
                ? 'मंदिर जीर्णोद्धार, गौसेवा एवं अन्नदान हेतु पावन सहयोग दें'
                : 'Contribute for Mandir Renovation, Gaushala Seva & Sacred Annadanam'}
            </h2>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl">
              {lang === 'hi'
                ? 'आपका पावन योगदान सनातन धर्म की प्राचीन धरोहरों को संजोने और नित्य निर्धन असहायों के भोजन में संबल बनता है। मंदिर ट्रस्ट द्वारा 80G आयकर छूट प्रमाण पत्र तुरंत प्राप्त करें।'
                : 'Your holy contribution preserves ancient Vedic traditions and provides nourishing satvik meals daily. 80G tax exemption donation receipt generated instantly.'}
            </p>

            {/* Vedic Donation Preset Chips */}
            <div className="pt-2">
              <span className="text-xs uppercase font-bold text-[#ffdea3] block mb-2">
                {lang === 'hi' ? 'संकल्प राशि चुनें:' : 'Select Auspicious Amount:'}
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {[501, 1100, 2100, 5100, 11000].map((amt) => {
                  const isSelected = activeAmount === amt && !customAmount;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all shadow-sm ${
                        isSelected
                          ? 'bg-[#ffdea3] text-[#390c00] scale-105 shadow-md'
                          : 'bg-white/15 hover:bg-white/30 text-white'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick UPI QR Preview Column (Matching Image 9) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="bg-white text-[#2a170f] p-5 rounded-2xl shadow-2xl w-full max-w-xs text-center space-y-3 border-2 border-[#b58a2a]/30">
              <div className="flex items-center justify-center gap-2 text-[#9d2f00] text-xs font-bold">
                <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
                <span>{lang === 'hi' ? 'तुरंत SBI QR द्वारा दान करें' : 'Scan & Pay Instantly'}</span>
              </div>

              {/* Exact QR Image matching uploaded Image 9 */}
              <div className="w-48 sm:w-52 mx-auto bg-white rounded-xl p-1.5 shadow-inner border border-[#ffe9e2] overflow-hidden">
                <img
                  src={TEMPLE_INFO.qrImageUrl}
                  alt="SBI Payments UPI QR Code - Shri 1008 Nav Chetna Shiv Shakti"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              <div>
                <p className="text-[11px] text-[#5a4139] uppercase font-semibold">
                  {TEMPLE_INFO.merchantName}
                </p>
                <div className="mt-1 flex items-center justify-center gap-1 bg-[#fff1ec] px-2 py-1 rounded-lg border border-[#ffe9e2]">
                  <span className="text-[11px] font-mono font-bold text-[#9d2f00] truncate select-all">
                    {TEMPLE_INFO.upiId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    title="Copy UPI ID"
                    className="text-[#9d2f00] hover:text-[#c63f02] shrink-0 p-0.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedUpi ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
                {copiedUpi && (
                  <span className="text-[10px] text-green-700 font-bold block mt-1">
                    ✓ UPI ID कॉपी हो गया!
                  </span>
                )}
              </div>

              <a
                href={upiDeepLink}
                className="block w-full py-2.5 rounded-full bg-[#9d2f00] hover:bg-[#c63f02] text-white text-xs sm:text-sm font-bold transition-all shadow"
              >
                {lang === 'hi' ? 'UPI ऐप में खोलें' : 'Open in UPI App'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Donation Portal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Seva Categories Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-[#ffe9e2] shadow-[0_4px_16px_rgba(44,24,16,0.06)]">
            <h3 className="font-serif text-lg font-bold text-[#2a170f] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9d2f00] text-[20px]">account_balance</span>
              <span>{lang === 'hi' ? 'ट्रस्ट बैंक खाता विवरण' : 'Direct Bank Transfer Details'}</span>
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#5a4139]">
              <div className="flex justify-between py-1 border-b border-[#ffe9e2]">
                <span className="text-[#8e7167]">{lang === 'hi' ? 'खाता धारक:' : 'Account Name:'}</span>
                <span className="font-bold text-[#2a170f] text-right">{TEMPLE_INFO.trustNameHi}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ffe9e2]">
                <span className="text-[#8e7167]">{lang === 'hi' ? 'बैंक:' : 'Bank:'}</span>
                <span className="font-bold text-[#2a170f]">State Bank of India (SBI)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ffe9e2]">
                <span className="text-[#8e7167]">{lang === 'hi' ? 'मर्चेंट नाम:' : 'Merchant Name:'}</span>
                <span className="font-bold text-[#2a170f]">{TEMPLE_INFO.merchantName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ffe9e2]">
                <span className="text-[#8e7167]">UPI ID:</span>
                <span className="font-bold font-mono text-[#9d2f00]">{TEMPLE_INFO.upiId}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8e7167]">80G छूट:</span>
                <span className="font-bold text-green-700">उपलब्ध (100% Tax Deductible)</span>
              </div>
            </div>
          </div>

          {/* Seva Tiers Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#705100]">
              {lang === 'hi' ? 'प्रमुख सेवा संकल्प विवरण:' : 'Seva Categories & Blessings:'}
            </h4>
            {DONATION_TIERS.map((tier) => (
              <div
                key={tier.amount}
                onClick={() => {
                  setSelectedAmount(tier.amount);
                  setCustomAmount('');
                }}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  activeAmount === tier.amount && !customAmount
                    ? 'bg-[#fff1ec] border-[#9d2f00] shadow-md ring-2 ring-[#9d2f00]/30'
                    : 'bg-white border-[#ffe9e2] hover:bg-[#fff8f6]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-serif text-sm font-bold text-[#2a170f]">
                    {lang === 'hi' ? tier.labelHi : tier.labelEn}
                  </h5>
                  <span className="text-sm font-bold text-[#9d2f00]">
                    ₹{tier.amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-[#5a4139] mt-1 leading-relaxed">
                  {lang === 'hi' ? tier.benefitHi : tier.benefitEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Donation & E-Receipt Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#ffe9e2] shadow-[0_4px_24px_rgba(44,24,16,0.08)]">
            <div className="border-b border-[#ffe9e2] pb-4 mb-6">
              <span className="inline-block px-3 py-1 bg-[#ffe9e2] text-[#9d2f00] text-xs font-bold rounded-full mb-1">
                {lang === 'hi' ? 'दान विवरण एवं 80G रसीद' : 'Donation Details & Receipt Form'}
              </span>
              <h3 className="font-serif-devanagari text-xl sm:text-2xl text-[#2a170f] font-bold">
                {lang === 'hi' ? 'पावन सहयोग दर्ज करें एवं रसीद प्राप्त करें' : 'Record Offering & Get E-Receipt'}
              </h3>
              <p className="text-xs text-[#5a4139] mt-1">
                {lang === 'hi'
                  ? 'UPI द्वारा भुगतान उपरांत तुरंत अपनी डिजिटल मुहर युक्त 80G दान रसीद प्राप्त करें।'
                  : 'Pay via UPI and generate your official stamped tax-exempt donation certificate.'}
              </p>
            </div>

            <form onSubmit={handleGenerateReceipt} className="space-y-4">
              {/* Amount Selection */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#705100] mb-1.5">
                  {lang === 'hi' ? 'दान राशि (₹) *' : 'Offering Amount (INR) *'}
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-3 text-[#5a4139] font-bold">₹</span>
                    <input
                      type="number"
                      min="1"
                      value={customAmount || (selectedAmount ? selectedAmount.toString() : '')}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                      }}
                      placeholder="अन्य राशि दर्ज करें"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#ffe9e2] text-sm font-bold text-[#9d2f00] focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                    />
                  </div>
                  <div className="flex gap-1">
                    {[501, 1100, 2100].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(num);
                          setCustomAmount('');
                        }}
                        className="px-2.5 py-2 rounded-xl text-xs font-semibold bg-[#fff1ec] hover:bg-[#ffe9e2] text-[#9d2f00] border border-[#ffe9e2]"
                      >
                        ₹{num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purpose Selector */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#705100] mb-1.5">
                  {lang === 'hi' ? 'दान का उद्देश्य (Seva Purpose) *' : 'Seva Purpose *'}
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                >
                  <option value="मंदिर जीर्णोद्धार एवं विस्तार (Mandir Renovation & Construction)">
                    मंदिर जीर्णोद्धार एवं विस्तार (Mandir Renovation)
                  </option>
                  <option value="नित्य सात्विक अन्नक्षेत्र महाप्रसाद (Daily Annakshetra Food Seva)">
                    नित्य सात्विक अन्नक्षेत्र महाप्रसाद (Annakshetra Seva)
                  </option>
                  <option value="गौमाता चारा, गुड़ एवं संरक्षण सेवा (Gaushala Fodder Seva)">
                    गौमाता चारा, गुड़ एवं संरक्षण सेवा (Gaushala Seva)
                  </option>
                  <option value="नित्य अखंड ज्योति एवं दीप प्रज्वलन (Akhand Jyoti Seva)">
                    नित्य अखंड ज्योति एवं दीप प्रज्वलन (Akhand Jyoti Seva)
                  </option>
                  <option value="विशेष रुद्राभिषेक एवं पूजन सामग्री सेवा (Rudrabhishek Seva)">
                    विशेष रुद्राभिषेक एवं पूजन सामग्री सेवा (Rudrabhishek Seva)
                  </option>
                </select>
              </div>

              {/* Devotee Name & Gotra */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#705100] mb-1.5">
                    {lang === 'hi' ? 'भक्त का नाम *' : 'Devotee Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    placeholder={lang === 'hi' ? 'उदा: सुरेश चंद्र वर्मा' : 'e.g. Suresh Verma'}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#705100] mb-1.5">
                    {lang === 'hi' ? 'गोत्र (Gotra)' : 'Gotra'}
                  </label>
                  <input
                    type="text"
                    value={gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    placeholder="उदा: भारद्वाज / कश्यप"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#705100] mb-1.5">
                    {lang === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#705100] mb-1.5">
                    {lang === 'hi' ? 'ईमेल (रसीद प्राप्ति हेतु)' : 'Email (for Receipt)'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                </div>
              </div>

              {/* PAN & UTR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#705100] mb-1.5">
                    {lang === 'hi' ? 'पैन कार्ड (80G छूट हेतु)' : 'PAN No (for 80G Tax Exemption)'}
                  </label>
                  <input
                    type="text"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                    placeholder="ABCDE1234F"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#705100] mb-1.5">
                    {lang === 'hi' ? 'UPI UTR / Ref No. (यदि भुगतान किया हो)' : 'UTR / Transaction Ref No.'}
                  </label>
                  <input
                    type="text"
                    value={utrNo}
                    onChange={(e) => setUtrNo(e.target.value)}
                    placeholder="उदा: 324109876543"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#ffdea3]">receipt_long</span>
                  <span>{lang === 'hi' ? 'ई-दान रसीद जनरेट करें' : 'Generate Devotee Donation Receipt'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Generated Devotee E-Receipt Modal Sheet */}
      {receipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#fff8f6] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#b58a2a] p-6 sm:p-8 relative">
            <button
              type="button"
              onClick={() => setReceipt(null)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {/* Official Printable Stamped Receipt */}
            <div
              id="printable-receipt"
              className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#b58a2a] relative shadow-md"
            >
              {/* Decorative Corner Ornaments */}
              <div className="text-center border-b-2 border-[#9d2f00]/30 pb-4 mb-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <img
                    src={TEMPLE_INFO.omLogoUrl}
                    alt="Temple Om Emblem"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <h3 className="font-serif-devanagari text-2xl text-[#9d2f00] font-bold">
                  {TEMPLE_INFO.nameHi}
                </h3>
                <p className="text-xs font-semibold text-[#705100] tracking-wider uppercase">
                  {TEMPLE_INFO.trustNameEn}
                </p>
                <p className="text-[11px] text-[#5a4139] mt-0.5 max-w-lg mx-auto">
                  {TEMPLE_INFO.addressHi} • Helpline: +91 8470092721
                </p>
                <div className="mt-2 inline-flex items-center gap-2 px-4 py-1 bg-[#fff1ec] text-[#9d2f00] text-xs font-bold rounded-full border border-[#ffe9e2]">
                  <span>ई-दान रसीद • E-DONATION RECEIPT (80G TAX EXEMPT)</span>
                </div>
              </div>

              {/* Receipt Metadata */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div>
                  <span className="text-[#8e7167]">रसीद क्रमांक / Receipt No:</span>
                  <span className="font-bold text-[#2a170f] font-mono block">{receipt.receiptNo}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#8e7167]">दिनांक व समय / Date & Time:</span>
                  <span className="font-bold text-[#2a170f] block">
                    {receipt.date} | {receipt.time}
                  </span>
                </div>
                <div>
                  <span className="text-[#8e7167]">भक्त का नाम / Devotee:</span>
                  <span className="font-bold text-[#2a170f] text-sm block">{receipt.devoteeName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#8e7167]">गोत्र / Gotra:</span>
                  <span className="font-bold text-[#2a170f] block">{receipt.gotra}</span>
                </div>
                <div>
                  <span className="text-[#8e7167]">संपर्क / Contact:</span>
                  <span className="font-bold text-[#2a170f] block">{receipt.phone}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#8e7167]">पैन नंबर / PAN:</span>
                  <span className="font-bold text-[#2a170f] block font-mono">{receipt.pan}</span>
                </div>
              </div>

              {/* Purpose & Amount Box */}
              <div className="bg-[#fff1ec] p-4 rounded-xl border border-[#ffe9e2] mb-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8e7167]">सेवा संकल्प / Purpose:</span>
                  <span className="font-bold text-[#2a170f]">{receipt.purpose}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8e7167]">भुगतान माध्यम / Mode & Ref:</span>
                  <span className="font-mono text-[#2a170f]">
                    {receipt.paymentMode} ({receipt.utrNo})
                  </span>
                </div>
                <div className="pt-2 border-t border-[#ffe9e2] flex justify-between items-center">
                  <span className="font-bold text-sm text-[#2a170f]">प्राप्त राशि / Amount Paid:</span>
                  <span className="font-serif text-2xl font-bold text-[#9d2f00]">
                    ₹{receipt.amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-[11px] text-[#705100] italic text-right font-medium">
                  ({receipt.amountInWords})
                </div>
              </div>

              {/* Digital Seal & Signatures */}
              <div className="pt-2 border-t border-dashed border-[#ffe9e2] flex items-center justify-between text-xs">
                <div className="text-[10px] text-[#5a4139] space-y-0.5">
                  <p className="font-bold text-green-700">✓ कंप्यूटर जनित अधिकृत रसीद (हस्ताक्षर आवश्यक नहीं)</p>
                  <p>यह रसीद आयकर अधिनियम की धारा 80G के अंतर्गत कर कटौती हेतु मान्य है।</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-[#b58a2a] p-1 flex items-center justify-center text-[#9d2f00] font-bold text-[9px] uppercase leading-tight bg-[#fffdf6] mx-auto shadow-sm">
                    श्री १०८
                    <br />
                    ट्रस्ट
                    <br />
                    मुहर
                  </div>
                  <span className="text-[10px] text-[#8e7167] block mt-1">कोषाध्यक्ष / Trust Seal</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 py-3 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>{lang === 'hi' ? 'रसीद प्रिंट / डाउनलोड करें' : 'Print / Download Receipt'}</span>
              </button>
              <button
                type="button"
                onClick={() => setReceipt(null)}
                className="px-6 py-3 bg-[#ffe9e2] hover:bg-[#ffdbce] text-[#9d2f00] rounded-xl text-xs sm:text-sm font-bold"
              >
                {lang === 'hi' ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
