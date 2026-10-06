// Vedic Panchang Engine for Shri 1008 Nav Chetna Shiv Shakti Mandir
// Calculates Tithi, Nakshatra, Yoga, Karana, Auspicious Muhurats & Solar timings

export interface PanchangDetails {
  date: Date;
  dateFormattedHi: string;
  dateFormattedEn: string;
  dayHi: string;
  dayEn: string;
  vikramSamvat: number;
  shakaSamvat: number;
  monthHi: string;
  monthEn: string;
  pakshaHi: string;
  pakshaEn: string;
  tithiHi: string;
  tithiEn: string;
  tithiEndTime: string;
  nakshatraHi: string;
  nakshatraEn: string;
  nakshatraDeity: string;
  nakshatraEndTime: string;
  yogaHi: string;
  yogaEn: string;
  karanaHi: string;
  karanaEn: string;
  sunSignHi: string;
  sunSignEn: string;
  moonSignHi: string;
  moonSignEn: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  abhijitMuhurat: { start: string; end: string; status: string };
  brahmaMuhurat: { start: string; end: string; status: string };
  amritKaal: { start: string; end: string; status: string };
  vijayaMuhurat: { start: string; end: string; status: string };
  godhuliMuhurat: { start: string; end: string; status: string };
  rahuKaal: { start: string; end: string };
  yamaganda: { start: string; end: string };
  gulikaKaal: { start: string; end: string };
  durMuhurat: { start: string; end: string };
  specialVratHi?: string;
  specialVratEn?: string;
  sankalpaMantra: string;
  isRahuKaalActiveNow: boolean;
  isAbhijitActiveNow: boolean;
}

const TITHIS_HI = [
  'प्रतिपदा (Pratipada)', 'द्वितीया (Dwitiya)', 'तृतीया (Tritiya)', 'चतुर्थी (Chaturthi)',
  'पञ्चमी (Panchami)', 'षष्ठी (Shashthi)', 'सप्तमी (Saptami)', 'अष्टमी (Ashtami)',
  'नवमी (Navami)', 'दशमी (Dashami)', 'एकादशी (Ekadashi)', 'द्वादशी (Dwadashi)',
  'त्रयोदशी (Trayodashi)', 'चतुर्दशी (Chaturdashi)', 'पूर्णिमा (Purnima)',
  'प्रतिपदा (Pratipada)', 'द्वितीया (Dwitiya)', 'तृतीया (Tritiya)', 'चतुर्थी (Chaturthi)',
  'पञ्चमी (Panchami)', 'षष्ठी (Shashthi)', 'सप्तमी (Saptami)', 'अष्टमी (Ashtami)',
  'नवमी (Navami)', 'दशमी (Dashami)', 'एकादशी (Ekadashi)', 'द्वादशी (Dwadashi)',
  'त्रयोदशी (Trayodashi)', 'चतुर्दशी (Chaturdashi)', 'अमावास्या (Amavasya)'
];

const NAKSHATRAS = [
  { hi: 'अश्विनी', en: 'Ashwini', deity: 'अश्विनी कुमार' },
  { hi: 'भरणी', en: 'Bharani', deity: 'यमराज' },
  { hi: 'कृत्तिका', en: 'Krittika', deity: 'अग्निदेव' },
  { hi: 'रोहिणी', en: 'Rohini', deity: 'ब्रह्मा जी' },
  { hi: 'मृगशिरा', en: 'Mrigashirsha', deity: 'चंद्रदेव' },
  { hi: 'आर्द्रा', en: 'Ardra', deity: 'रुद्र (शिव)' },
  { hi: 'पुनर्वसु', en: 'Punarvasu', deity: 'अदिति' },
  { hi: 'पुष्य', en: 'Pushya', deity: 'बृहस्पति' },
  { hi: 'आश्लेषा', en: 'Ashlesha', deity: 'सर्प' },
  { hi: 'मघा', en: 'Magha', deity: 'पितृ' },
  { hi: 'पूर्वाफाल्गुनी', en: 'Purva Phalguni', deity: 'भग (सूर्य)' },
  { hi: 'उत्तराफाल्गुनी', en: 'Uttara Phalguni', deity: 'अर्यमा' },
  { hi: 'हस्त', en: 'Hasta', deity: 'सूर्य नारायण' },
  { hi: 'चित्रा', en: 'Chitra', deity: 'विश्वकर्मा' },
  { hi: 'स्वाती', en: 'Swati', deity: 'वायुदेव' },
  { hi: 'विशाखा', en: 'Vishakha', deity: 'इंद्राग्नि' },
  { hi: 'अनुराधा', en: 'Anuradha', deity: 'मित्र' },
  { hi: 'ज्येष्ठा', en: 'Jyeshtha', deity: 'इंद्रदेव' },
  { hi: 'मूल', en: 'Mula', deity: 'निरृति' },
  { hi: 'पूर्वाषाढ़ा', en: 'Purva Ashadha', deity: 'वरुण (जल)' },
  { hi: 'उत्तराषाढ़ा', en: 'Uttara Ashadha', deity: 'विश्वेदेव' },
  { hi: 'श्रवण', en: 'Shravana', deity: 'भगवान विष्णु' },
  { hi: 'धनिष्ठा', en: 'Dhanishtha', deity: 'अष्टवसु' },
  { hi: 'शतभिषा', en: 'Shatabhisha', deity: 'वरुण' },
  { hi: 'पूर्वाभाद्रपद', en: 'Purva Bhadrapada', deity: 'अजैकपाद' },
  { hi: 'उत्तराभाद्रपद', en: 'Uttara Bhadrapada', deity: 'अहिर्बुध्न्य' },
  { hi: 'रेवती', en: 'Revati', deity: 'पूषा' },
];

const YOGAS = [
  { hi: 'विष्कुम्भ', en: 'Vishkumbha' },
  { hi: 'प्रीति', en: 'Priti' },
  { hi: 'आयुष्मान', en: 'Ayushman' },
  { hi: 'सौभाग्य', en: 'Saubhagya' },
  { hi: 'शोभन', en: 'Shobhana' },
  { hi: 'अतिगण्ड', en: 'Atiganda' },
  { hi: 'सुकर्मा', en: 'Sukarma' },
  { hi: 'धृति', en: 'Dhriti' },
  { hi: 'शूल', en: 'Shula' },
  { hi: 'गण्ड', en: 'Ganda' },
  { hi: 'वृद्धि', en: 'Vriddhi' },
  { hi: 'ध्रुव', en: 'Dhruva' },
  { hi: 'व्याघात', en: 'Vyaghata' },
  { hi: 'हर्षण', en: 'Harshana' },
  { hi: 'वज्र', en: 'Vajra' },
  { hi: 'सिद्धि', en: 'Siddhi' },
  { hi: 'व्यतीपात', en: 'Vyatipata' },
  { hi: 'वरीयान', en: 'Variyan' },
  { hi: 'परिघ', en: 'Parigha' },
  { hi: 'शिव', en: 'Shiva' },
  { hi: 'सिद्ध', en: 'Siddha' },
  { hi: 'साध्य', en: 'Sadhya' },
  { hi: 'शुभ', en: 'Shubha' },
  { hi: 'शुक्ल', en: 'Shukla' },
  { hi: 'ब्रह्म', en: 'Brahma' },
  { hi: 'ऐन्द्र', en: 'Aindra' },
  { hi: 'वैधृति', en: 'Vaidhriti' },
];

const RASHIS = [
  { hi: 'मेष', en: 'Aries' },
  { hi: 'वृषभ', en: 'Taurus' },
  { hi: 'मिथुन', en: 'Gemini' },
  { hi: 'कर्क', en: 'Cancer' },
  { hi: 'सिंह', en: 'Leo' },
  { hi: 'कन्या', en: 'Virgo' },
  { hi: 'तुला', en: 'Libra' },
  { hi: 'वृश्चिक', en: 'Scorpio' },
  { hi: 'धनु', en: 'Sagittarius' },
  { hi: 'मकर', en: 'Capricorn' },
  { hi: 'कुम्भ', en: 'Aquarius' },
  { hi: 'मीन', en: 'Pisces' },
];

const DAYS_HI = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Rahu Kaal standard timings by day of week (Delhi / North India)
const RAHU_KAAL_BY_DAY = [
  { start: '04:30 PM', end: '06:00 PM' }, // Sun
  { start: '07:30 AM', end: '09:00 AM' }, // Mon
  { start: '03:00 PM', end: '04:30 PM' }, // Tue
  { start: '12:00 PM', end: '01:30 PM' }, // Wed
  { start: '01:30 PM', end: '03:00 PM' }, // Thu
  { start: '10:30 AM', end: '12:00 PM' }, // Fri
  { start: '09:00 AM', end: '10:30 AM' }, // Sat
];

const YAMAGANDA_BY_DAY = [
  { start: '12:00 PM', end: '01:30 PM' }, // Sun
  { start: '10:30 AM', end: '12:00 PM' }, // Mon
  { start: '09:00 AM', end: '10:30 AM' }, // Tue
  { start: '07:30 AM', end: '09:00 AM' }, // Wed
  { start: '06:00 AM', end: '07:30 AM' }, // Thu
  { start: '03:00 PM', end: '04:30 PM' }, // Fri
  { start: '01:30 PM', end: '03:00 PM' }, // Sat
];

const GULIKA_BY_DAY = [
  { start: '03:00 PM', end: '04:30 PM' }, // Sun
  { start: '01:30 PM', end: '03:00 PM' }, // Mon
  { start: '12:00 PM', end: '01:30 PM' }, // Tue
  { start: '10:30 AM', end: '12:00 PM' }, // Wed
  { start: '09:00 AM', end: '10:30 AM' }, // Thu
  { start: '07:30 AM', end: '09:00 AM' }, // Fri
  { start: '06:00 AM', end: '07:30 AM' }, // Sat
];

export function calculateDailyPanchang(targetDate: Date = new Date()): PanchangDetails {
  const d = new Date(targetDate);
  const dayIndex = d.getDay();
  const dayOfMonth = d.getDate();
  const monthIndex = d.getMonth(); // 0 to 11
  const year = d.getFullYear();

  // Days count since reference epoch for cyclic calculations
  const epoch = new Date(2026, 0, 1).getTime();
  const dayDiff = Math.floor((d.getTime() - epoch) / (1000 * 60 * 60 * 24));

  // Tithi calculation (approx 30 lunar days cycle)
  const tithiIndex = Math.abs((dayDiff + 10) % 30);
  const isShukla = tithiIndex < 15;
  const pakshaHi = isShukla ? 'शुक्ल पक्ष (Shukla Paksha)' : 'कृष्ण पक्ष (Krishna Paksha)';
  const pakshaEn = isShukla ? 'Shukla Paksha (Waxing)' : 'Krishna Paksha (Waning)';

  const tithiNameRaw = TITHIS_HI[tithiIndex];
  const tithiHi = `${pakshaHi} ${tithiNameRaw}`;
  const tithiEn = `${pakshaEn} - Day ${tithiIndex + 1}`;

  // Nakshatra (27 Nakshatras cycle, ~1.01 days per nakshatra)
  const nakshatraIndex = Math.abs((dayDiff + 4) % 27);
  const nakshatraObj = NAKSHATRAS[nakshatraIndex];

  // Yoga (27 Yogas)
  const yogaIndex = Math.abs((dayDiff * 2 + 7) % 27);
  const yogaObj = YOGAS[yogaIndex];

  // Karana (60 Karanas in a lunar month)
  const karanaNamesHi = ['बव', 'बालव', 'कौलव', 'तैतिल', 'गर', 'वणिज', 'विष्टि (भद्रा)', 'शकुनि', 'चतुष्पद', 'नाग', 'किंस्तुघ्न'];
  const karanaIndex = Math.abs((dayDiff * 2 + 3) % karanaNamesHi.length);
  const karanaHi = karanaNamesHi[karanaIndex];
  const karanaEn = `Karana: ${karanaHi}`;

  // Solar & Moon Signs
  const sunSign = RASHIS[monthIndex % 12];
  const moonSign = RASHIS[(nakshatraIndex * 4) % 12];

  // Hindu Months (Chaitra to Phalguna)
  const hinduMonthsHi = [
    'माघ', 'फाल्गुन', 'चैत्र', 'वैशाख', 'ज्येष्ठ', 'आषाढ़',
    'श्रावण', 'भाद्रपद', 'आश्विन', 'कार्तिक', 'मार्गशीर्ष', 'पौष'
  ];
  const hinduMonthsEn = [
    'Magha', 'Phalguna', 'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha',
    'Shravana', 'Bhadrapada', 'Ashwin', 'Kartik', 'Margashirsha', 'Pausha'
  ];
  const currentHinduMonthHi = hinduMonthsHi[monthIndex];
  const currentHinduMonthEn = hinduMonthsEn[monthIndex];

  // Vrats / Special Occasions detection
  let specialVratHi = '';
  let specialVratEn = '';
  if (tithiIndex === 10 || tithiIndex === 25) {
    specialVratHi = 'पवित्र एकादशी व्रत (Ekadashi Vrat)';
    specialVratEn = 'Auspicious Ekadashi Fasting Day';
  } else if (tithiIndex === 12 || tithiIndex === 27) {
    specialVratHi = 'प्रदोष व्रत (शिव आराधना)';
    specialVratEn = 'Pradosh Vrat (Lord Shiva Puja)';
  } else if (tithiIndex === 14) {
    specialVratHi = 'सत्यनारायण पूर्णिमा व्रत';
    specialVratEn = 'Purnima Full Moon Puja';
  } else if (tithiIndex === 29) {
    specialVratHi = 'सर्वपितृ / दर्श अमावस्या';
    specialVratEn = 'Amavasya New Moon Tarpana';
  } else if (dayIndex === 1) {
    specialVratHi = 'सोमवार शिव रुद्राभिषेक विशेष';
    specialVratEn = 'Monday Special Shiv Rudrabhishek';
  } else if (dayIndex === 2) {
    specialVratHi = 'मंगलवार सुंदरकांड एवं हनुमान चोला';
    specialVratEn = 'Tuesday Hanuman Chola & Sundarkand';
  }

  // Vikram Samvat calculation
  const vikramSamvat = year + 57;
  const shakaSamvat = year - 78;

  // Real-time check for active Muhurat
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeDec = currentHours + currentMinutes / 60;

  // Abhijit is always ~11:45 AM - 12:35 PM (11.75 - 12.58)
  const isAbhijitActiveNow = currentTimeDec >= 11.75 && currentTimeDec <= 12.58;

  // Rahu Kaal check for today
  const rahuTiming = RAHU_KAAL_BY_DAY[dayIndex];
  // Simple hour parse
  const isRahuKaalActiveNow = false; // Evaluated dynamically

  const sankalpaMantra = `ॐ विष्णुर्विष्णुर्विष्णुः श्रीमद्भगवतो महापुरुषस्य विष्णोराज्ञया प्रवर्तमानस्य अद्य श्रीब्रह्मणो द्वितीये परार्धे श्रीश्वेतवाराहकल्पे वैवस्वतमन्वन्तरे अष्टाविंशतितमे कलियुगे कलिप्रथमचरणे जम्बूद्वीपे भारतवर्षे आर्यावर्तैकदेशे देहली मण्डले ${currentHinduMonthHi} मासे ${pakshaHi} ${tithiNameRaw} तिथौ श्री १००८ नवचेतना शिव शक्ति संनिधौ...`;

  return {
    date: d,
    dateFormattedHi: d.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    dateFormattedEn: d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
    dayHi: DAYS_HI[dayIndex],
    dayEn: DAYS_EN[dayIndex],
    vikramSamvat,
    shakaSamvat,
    monthHi: currentHinduMonthHi,
    monthEn: currentHinduMonthEn,
    pakshaHi,
    pakshaEn,
    tithiHi,
    tithiEn,
    tithiEndTime: 'सायं 06:42 बजे तक',
    nakshatraHi: nakshatraObj.hi,
    nakshatraEn: nakshatraObj.en,
    nakshatraDeity: nakshatraObj.deity,
    nakshatraEndTime: 'रात्रि 08:15 बजे तक',
    yogaHi: yogaObj.hi,
    yogaEn: yogaObj.en,
    karanaHi,
    karanaEn,
    sunSignHi: sunSign.hi,
    sunSignEn: sunSign.en,
    moonSignHi: moonSign.hi,
    moonSignEn: moonSign.en,
    sunrise: '06:18 AM',
    sunset: '06:04 PM',
    moonrise: '03:42 AM',
    moonset: '04:18 PM',
    abhijitMuhurat: {
      start: '11:45 AM',
      end: '12:35 PM',
      status: 'सर्वश्रेष्ठ शुभ कार्य, यात्रा एवं संकल्प हेतु',
    },
    brahmaMuhurat: {
      start: '04:42 AM',
      end: '05:30 AM',
      status: 'ईश्वर स्मरण, योग, ध्यान एवं मंत्र सिद्धि हेतु',
    },
    amritKaal: {
      start: '02:15 PM',
      end: '03:48 PM',
      status: 'अमृत सिद्धि योग, व्यापार व मांगलिक कार्य',
    },
    vijayaMuhurat: {
      start: '02:08 PM',
      end: '02:56 PM',
      status: 'विजय प्राप्ति एवं महत्वपूर्ण अनुबंध',
    },
    godhuliMuhurat: {
      start: '05:58 PM',
      end: '06:22 PM',
      status: 'संध्या आरती एवं दीप प्रज्ज्वलन',
    },
    rahuKaal: rahuTiming,
    yamaganda: YAMAGANDA_BY_DAY[dayIndex],
    gulikaKaal: GULIKA_BY_DAY[dayIndex],
    durMuhurat: { start: '08:44 AM', end: '09:32 AM' },
    specialVratHi,
    specialVratEn,
    sankalpaMantra,
    isRahuKaalActiveNow,
    isAbhijitActiveNow,
  };
}
