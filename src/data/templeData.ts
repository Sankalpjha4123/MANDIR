export interface Deity {
  id: string;
  nameHi: string;
  nameEn: string;
  titleHi: string;
  titleEn: string;
  mantra: string;
  descriptionHi: string;
  descriptionEn: string;
  specialTimingHi: string;
  specialTimingEn: string;
  specialDayHi: string;
  specialDayEn: string;
  imageUrl: string;
  offerings: string[];
}

export interface AartiItem {
  id: string;
  nameHi: string;
  nameEn: string;
  time: string;
  session: 'morning' | 'evening';
  noteHi: string;
  noteEn: string;
  isMajor?: boolean;
}

export interface FestivalItem {
  id: string;
  titleHi: string;
  titleEn: string;
  dateHi: string;
  dateEn: string;
  badgeHi: string;
  badgeEn: string;
  descriptionHi: string;
  descriptionEn: string;
  imageUrl: string;
  highlightsHi: string[];
  highlightsEn: string[];
}

export interface GalleryImage {
  id: string;
  titleHi: string;
  titleEn: string;
  category: 'temple' | 'deities' | 'festivals' | 'rituals';
  imageUrl: string;
  captionHi: string;
  captionEn: string;
}

export interface DonationTier {
  amount: number;
  labelHi: string;
  labelEn: string;
  benefitHi: string;
  benefitEn: string;
}

export const TEMPLE_INFO = {
  nameHi: 'श्री १००८ नवचेतना शिव शक्ति',
  nameEn: 'SHRI 1008 NAV CHETNA SHIV SHAKTI',
  taglineHi: 'श्रद्धा • सेवा • संस्कार',
  taglineEn: 'Devotion • Service • Values',
  establishedYear: '2021',
  trustNameHi: 'श्री १००८ नवचेतना शिव शक्ति ट्रस्ट',
  trustNameEn: 'Shri 1008 Nav Chetna Shiv Shakti Trust',
  addressHi: 'श्री १००८ नवचेतना शिव शक्ति परिसर, गली नं. ३, राम रहीम चौक, मिलन गार्डन, सभापुर, नई दिल्ली - ११००९४',
  addressEn: 'Shri 1008 Nav Chetna Shiv Shakti Campus, Street No. 3, Ram Rahim Chowk, Milan Garden, Sabhapur, New Delhi - 110094',
  landmarkHi: 'राम रहीम चौक, मिलन गार्डन के समीप, सभापुर',
  landmarkEn: 'Near Ram Rahim Chowk, Milan Garden, Sabhapur',
  phones: ['+91 8470092721', '+91 7982758754'],
  whatsapp: '+918470092721',
  email: 'shri1008navchetnashivshakti4123@gmail.com',
  darshanTimingsHi: 'प्रात: 05:30 बजे से सायं 09:30 बजे तक (दोपहर 12:30 से 04:30 विश्राम)',
  darshanTimingsEn: '05:30 AM to 09:30 PM (Sanctum rest 12:30 PM – 04:30 PM)',
  merchantName: 'SHRI SHRI ONE THOUSAND EIGHT',
  upiId: 'SHRISHRI1008@NCBSOURGAPUJA@SBI',
  qrImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNzOD5gT10HUFirtusv5EoG-Q2VaIhoPgOmC44mzV5KIsUw4Cx5u2-TsuZMm7nd97Y7yoSS7SMrneGZy80YbvSkjW6WG4Noqx_AkIZzXXr8T44yWrQA30M2mzPTbxI84LsBJTQJYCRYPKy-FixlYksrP94We4DJLC28wTHPeluOov3jPzXriPVlvZ-Sjm5owglwDyAbeFp5QBEL8Q_DZyDwP3QOFaqMqbFr3cyhuAiF0GcKUMsUq2D77CPzk3jwEsis3M',
  templeBuildingImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAym5VD7az5hJ53RLq3YvqUUqVH-gBRwlOQyBdGV4Juw85L-jhlUjhd6ACsY86dAAWvCUdH3NSc7o66kx6BXJvwKOmp2F3gc4xfztFDTK_0u3U1SU2R4BLvdO7Q9ECnNXLzKGrM0ljqTdeOj-DnCYEda1SuijVw3taBxtviT11JgwVqOGE1Gz5RVLj0UHNzJIM28xuBklmC7aEKcRGNzlltNyW95ahkFBzSRnD4bTXLBSUkoLfHsrMIRYpv8Bn67_6koOw',
  omLogoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYQaxoehqM9vcz-Bypqypeef1HT115TsmCNVuAtOb7XAHxX4i7mQmnCri1CENx1FJBY5bSH20e3ZFjJ4shZ0npvVFPZFTJM5scHo6g3iJuKKAxWv4kMRw2VbytacAKAhgwn0ttcjRG8PikYjUAAGn05U9AfBWmnTvEEciSQgOMTGw60-Kh8y2nOshNQDrgIraKZQzg-KqJnFpljDd1ko1iaKrFUCsh30HGW-48HLLm',
  heroBgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM19FnY_6yPhufZQGUZGTJgpAwcxwgKIYrSDPezzEwWhTUbqO3BZh-cXGWx3Nftm7MI9DUslNLzdMd_vg-e0NnZ3kxc1NqkiJMcLP-i8TheKNlPhYZlsQv9xEuI71hZi7jf7VIf1Gpn_HdIcC9-GuGk24NsqBUSAiX35jN76RAyzpKbVdQIdYPGyIs6pcLgCjatKHpwaFTejPy6XS6vc2PpRoagT1mW_2E7ZHQ4mlS',
};

export const DEITIES_DATA: Deity[] = [
  {
    id: 'shiva',
    nameHi: 'श्री सोमेश्वर महादेव',
    nameEn: 'Shree Someshwar Mahadev',
    titleHi: 'प्रमुख गर्भगृह • देवाधिदेव',
    titleEn: 'Primary Sanctum • Lord Shiva',
    mantra: '॥ ॐ नमः शिवाय ॥',
    descriptionHi: 'त्रिकाल संध्या एवं सोमवार को विशेष पंचामृत रुद्राभिषेक। समस्त कष्टों, भय एवं व्याधियों का समूल निवारण करने वाले देवाधिदेव महादेव।',
    descriptionEn: 'Special Panchamrit Rudrabhishek on Mondays and Trikal Sandhya. The eternal destroyer of sorrow and bestower of bliss.',
    specialTimingHi: 'नित्य अभिषेक: 07:00 AM | महाआरती: 09:00 PM',
    specialTimingEn: 'Daily Abhishek: 07:00 AM | Maha Aarti: 09:00 PM',
    specialDayHi: 'प्रत्येक सोमवार एवं प्रदोष व्रत',
    specialDayEn: 'Every Monday & Pradosham',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmgN0ZRHi8o5nEJckLnqdkKq-YYSIODIWiK0YWKKbMAOGpgAnczCPfrO2denurXutmGDel1JwOUmD7PYDPh6l-oRtIWZSk5an9l84ePzMbzUQcPt-boXV13ZMh5XNTVCjTcco87oWOr2m-p5rL_3u0iCQJIndVO8m2I_vTDlcgWB_UtuCHs4-VAWIIxIU9yK6vrnHKhW7E9InGfy7OIQSG9odA7JGaDmEQJbJ8xYEI',
    offerings: ['बिल्वपत्र', 'गंगाजल', 'धतूरा', 'पंचामृत', 'भस्म'],
  },
  {
    id: 'durga',
    nameHi: 'माँ दुर्गा जगदम्बा',
    nameEn: 'Maa Durga Jagdamba',
    titleHi: 'शक्तिपीठ धाम • आद्याशक्ति',
    titleEn: 'Shaktipeeth Sanctum • Divine Mother',
    mantra: '॥ ॐ दुं दुर्गायै नमः ॥',
    descriptionHi: 'नवरात्र एवं प्रत्येक अष्टमी पर शतचंडी महायज्ञ एवं कुमकुम अर्चना। भक्तों को सर्व अभय, तेज एवं ऐश्वर्य प्रदान करने वाली माँ जगदम्बा।',
    descriptionEn: 'Grand Shat Chandi Yajna on Navratri & Ashtami. The primordial mother protecting devotees and granting fearlessness.',
    specialTimingHi: 'श्रृंगार दर्शन: 08:30 AM | संध्या आरती: 07:30 PM',
    specialTimingEn: 'Shringar Darshan: 08:30 AM | Sandhya Aarti: 07:30 PM',
    specialDayHi: 'प्रत्येक शुक्रवार, अष्टमी एवं नवरात्र',
    specialDayEn: 'Every Friday, Ashtami & Navratri',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHCZ1ar0i_RTbDpKVTioPxNMc_GhdrcGC0-KIZR9YreUubKggDtwil2iRyRfD2rsZXpYUy6oeU7vJB5LEasDzayG9EvlFW76dZRq0-2rpa3qNh00gWiSWZFy3XHZjgslXeuJoho4Sx3xYCGF09X_7eN-fenAAa-vIu1BweWgFzx-BlaoPn3OkriKeORqONHy0LXfcpyIowmQIUoMEPHfriHhhexuwRDk7IJiJepflm',
    offerings: ['लाल चुनरी', 'कुमकुम', 'गुड़हल पुष्प', 'नारियल', 'खीर'],
  },
  {
    id: 'ganesha',
    nameHi: 'श्री सिद्धि विनायक',
    nameEn: 'Shree Siddhi Vinayak',
    titleHi: 'विघ्नहर्ता • प्रथम पूज्य',
    titleEn: 'Remover of Obstacles • Lord Ganesha',
    mantra: '॥ ॐ गं गणपतये नमः ॥',
    descriptionHi: 'प्रत्येक संकष्टी चतुर्थी पर दुर्वांकुर अभिषेक एवं महामोदक भोग। सभी नूतन कार्यों एवं जीवन में विघ्नों का समूल नाश करने वाले देव।',
    descriptionEn: 'Durva archana and Mahamodak offerings on Sankashti Chaturthi. The harbinger of auspicious beginnings and wisdom.',
    specialTimingHi: 'मोदक भोग: 11:30 AM | आरती: 08:00 AM',
    specialTimingEn: 'Modak Bhog: 11:30 AM | Aarti: 08:00 AM',
    specialDayHi: 'प्रत्येक बुधवार एवं संकष्टी चतुर्थी',
    specialDayEn: 'Every Wednesday & Chaturthi',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0mBYEoPRkwQMh9jcsLZ-dfeWJB24nngqsdXyChVtoDCvg9z0BaeM4TnABZBUT5sdLTyymVQW0WZUFcS0Ls1pn3_vIN_YhrUQeEhqlVidxyywt6Z7g4CN97o6N3Fkt6MhP7clIR3evpk-Mw-Ptdl3-9KOfp3qhYyHEdlFqzdCLEu1s015eqceexLG6vMGjISuFfOjF8zHr5VPOZoa-O4Y6iSaZ_yy8tR1ub-FHkDfw',
    offerings: ['दूर्वा', 'मोदक', 'सिंदूर', 'पीले पुष्प', 'लड्डू'],
  },
  {
    id: 'hanuman',
    nameHi: 'श्री संकटमोचन हनुमान',
    nameEn: 'Shree Sankat Mochan Hanuman',
    titleHi: 'संकटमोचन • महावीर',
    titleEn: 'Courage & Strength • Lord Hanuman',
    mantra: '॥ जय श्री राम ॥',
    descriptionHi: 'प्रत्येक मंगलवार एवं शनिवार को सामूहिक सुंदरकांड पाठ एवं सिंदूर चोला अर्पण। अतुलित बल, निर्मल बुद्धि एवं आरोग्य प्रदाता।',
    descriptionEn: 'Collective Sundarkand recitation and vermilion chola on Tuesdays and Saturdays. Bestower of strength and devotion.',
    specialTimingHi: 'सुंदरकांड पाठ: सायं 06:00 PM | चोला दर्शन: प्रात: 09:00 AM',
    specialTimingEn: 'Sundarkand: 06:00 PM | Chola Darshan: 09:00 AM',
    specialDayHi: 'प्रत्येक मंगलवार एवं शनिवार',
    specialDayEn: 'Every Tuesday & Saturday',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAELmNmdsVOkuDfkFGG5EcFhfTRgFE9cu1G2olLja7wYMJZmgc3UUdPcI1t3I-5P1LzxOVYYjyNBywVSKKLykfjQA3D7DauUEEA0UhJQILV6iVdqZT5n9081ggYR_a5NDHO6OqpiqCt5WGyVtasQtDlBYyUWgqJav_n_0ckUz7Vq-1djNfZE0op-R7iyRPzZjWOo4S0OQVAQD3YbPdQVCg6uyESAjAEZXLlswkkddTi',
    offerings: ['सिंदूर चोला', 'तुलसी दल', 'बूंदी लड्डू', 'चमेली तेल', 'केला'],
  },
  {
    id: 'lakshmi',
    nameHi: 'माता महालक्ष्मी',
    nameEn: 'Mata Mahalakshmi',
    titleHi: 'धन-धान्य प्रदायिनी • कमलासना',
    titleEn: 'Goddess of Fortune & Grace',
    mantra: '॥ ॐ श्रीं महालक्ष्म्यै नमः ॥',
    descriptionHi: 'शुक्रवार को विशेष श्रीसूक्त पठन एवं कमल पुष्प अर्चना। घर में सुख, शांति, समृद्धि और अखंड ऐश्वर्य की अधिष्ठात्री माँ लक्ष्मी।',
    descriptionEn: 'Sri Suktam chanting and lotus flower archana on Fridays. The deity of prosperity, pure wealth and peace.',
    specialTimingHi: 'श्रीसूक्त पाठ: 10:00 AM | कुमकुम अर्चना: 06:30 PM',
    specialTimingEn: 'Sri Suktam: 10:00 AM | Archana: 06:30 PM',
    specialDayHi: 'प्रत्येक शुक्रवार एवं पूर्णिमा',
    specialDayEn: 'Every Friday & Purnima',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvlmXtWkA5sYd3Pr0ZwxA5GcwNNOpduQOp2400MBlLF_58BPi4y6xgEISW1_3Zld0ZGtLz1bQtUYpn3Qz4EmZlYoDKHHB8B4sU9uLgOqdKd7qwr2sfzh8oAf2yNABBRRWIwZpylR3n9y1cZwiNNmm25auCWyvggYM2BNMFlJAdlvecPTYX9yJ-KEAJjYms2HTFyPnw6bINnAdICi4wjyYL6zWywzISJUp2CP6piExk',
    offerings: ['कमल पुष्प', 'मखाना खीर', 'सफेद मिष्ठान', 'इत्र', 'तांबूल'],
  },
  {
    id: 'vishnu',
    nameHi: 'भगवान श्री लक्ष्मीनारायण',
    nameEn: 'Bhagwan Shree Lakshmi Narayan',
    titleHi: 'जगतपालक • परमेश्वर',
    titleEn: 'Preserver of Universe • Lord Vishnu',
    mantra: '॥ ॐ नमो नारायणाय ॥',
    descriptionHi: 'प्रत्येक एकादशी पर श्री विष्णु सहस्रनाम जप एवं तुलसी दल अर्पण। चराचर जगत के पालनहार, करुणा के सागर परमपिता परमेश्वर।',
    descriptionEn: 'Vishnu Sahasranama chanting and sacred basil offerings on every Ekadashi. The benevolent preserver of cosmos.',
    specialTimingHi: 'राजभोग दर्शन: 12:00 PM | तुलसी अर्पण: 07:30 AM',
    specialTimingEn: 'Rajbhog Darshan: 12:00 PM | Tulsi Seva: 07:30 AM',
    specialDayHi: 'प्रत्येक एकादशी एवं गुरुवार',
    specialDayEn: 'Every Ekadashi & Thursday',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNI-mIDxLn5Su0lW3lXHuiGVDomi6WxuqLOuciNHAkDBgJhqzDeVOVcVXNZgfqYmPyV7fEZcfKATlh_XKe-pfn99R_Ea6A-UFS36VYvLxU_zbrECg_OIOVr0Fm4myvk24w3yxgp6hPLqKemFuoz-NryoT5Ej_3kwOuZHecb9HiB8_r0eXQZAGDFmmiN__Us6unFvztLmod4DhfbGdatHo8gEe02cSqwsiWzsXR3nID',
    offerings: ['तुलसी माला', 'पीले वस्त्र', 'पंचामृत', 'माखन मिश्री', 'कदली फल'],
  },
];

export const AARTI_SCHEDULE: AartiItem[] = [
  {
    id: 'kapat_open',
    nameHi: 'मंदिर कपाट खुलना',
    nameEn: 'Temple Sanctum Opening',
    time: '05:30 AM',
    session: 'morning',
    noteHi: 'प्रातःकालीन प्रभात फेरी एवं घंटानाद',
    noteEn: 'Dawn bells and sanctum opening',
  },
  {
    id: 'mangala_aarti',
    nameHi: 'मंगला आरती',
    nameEn: 'Mangala Aarti',
    time: '08:00 AM',
    session: 'morning',
    noteHi: 'दिव्य शंखनाद एवं कपूर आरती',
    noteEn: 'Sacred conch blowing and camphor aarti',
    isMajor: true,
  },
  {
    id: 'balbhog',
    nameHi: 'बालभोग दर्शन',
    nameEn: 'Balbhog Darshan',
    time: '08:00 AM',
    session: 'morning',
    noteHi: 'माखन-मिश्री एवं ऋतु फल भोग',
    noteEn: 'Offering of fresh butter and seasonal fruits',
  },
  {
    id: 'abhishek_pujan',
    nameHi: 'अभिषेक एवं विशेष पूजन',
    nameEn: 'Daily Abhishek & Pujas',
    time: '09:00 AM – 11:30 AM',
    session: 'morning',
    noteHi: 'भक्तों द्वारा शिवलिंग व देवताओं का पूजन',
    noteEn: 'Devotee ritual offerings and archana',
  },
  {
    id: 'rajbhog_aarti',
    nameHi: 'राजभोग आरती',
    nameEn: 'Rajbhog Maha Aarti',
    time: '12:00 PM',
    session: 'morning',
    noteHi: 'विशाल महाभोग अर्पण',
    noteEn: 'Full traditional meal offering',
    isMajor: true,
  },
  {
    id: 'kapat_rest',
    nameHi: 'दोपहर विश्राम (कपाट बंद)',
    nameEn: 'Afternoon Rest (Sanctum Closes)',
    time: '12:30 PM',
    session: 'morning',
    noteHi: 'अपराह्न 04:30 तक विश्राम काल',
    noteEn: 'Sanctum rest till 04:30 PM',
  },
  {
    id: 'sandhya_open',
    nameHi: 'अपराह्न कपाट खुलना',
    nameEn: 'Evening Sanctum Reopening',
    time: '04:30 PM',
    session: 'evening',
    noteHi: 'सांध्य दर्शन आरंभ',
    noteEn: 'Evening darshan begins',
  },
  {
    id: 'utthapan_dhoop',
    nameHi: 'उत्थापन एवं धूप आरती',
    nameEn: 'Utthapan & Dhoop Aarti',
    time: '05:15 PM',
    session: 'evening',
    noteHi: 'सुगंधित गुग्गल व धूप दीप सेवा',
    noteEn: 'Incense and dhoop ritual offering',
  },
  {
    id: 'bhajan_kirtan',
    nameHi: 'भजन कीर्तन एवं सत्संग',
    nameEn: 'Bhajan Kirtan & Satsang',
    time: '07:45 PM – 08:45 PM',
    session: 'evening',
    noteHi: 'सामूहिक सुंदरकांड एवं राम-शिव संकीर्तन',
    noteEn: 'Collective devotional chanting and hymns',
  },
  {
    id: 'sandhya_maha_aarti',
    nameHi: 'संध्या महाआरती',
    nameEn: 'Sandhya Maha Aarti',
    time: '09:00 PM',
    session: 'evening',
    noteHi: 'दीपावली स्वरूप भव्य आरती व शंखनाद',
    noteEn: 'Grand evening light aarti with conch sound',
    isMajor: true,
  },
  {
    id: 'shayan_aarti',
    nameHi: 'शयन आरती',
    nameEn: 'Shayan Aarti',
    time: '09:15 PM',
    session: 'evening',
    noteHi: 'दिव्य लोरी व विश्राम शयन सेवा',
    noteEn: 'Night resting lullaby and shayan seva',
  },
  {
    id: 'kapat_close',
    nameHi: 'मंदिर कपाट विश्राम',
    nameEn: 'Temple Sanctum Closing',
    time: '09:30 PM',
    session: 'evening',
    noteHi: 'विश्राम आरती उपरांत कपाट बंद',
    noteEn: 'Sanctum closes for the night',
  },
];

export const FESTIVALS_DATA: FestivalItem[] = [
  {
    id: 'durga-puja',
    titleHi: 'श्री श्री १०८ दुर्गा पूजा का भव्य एवं अलौकिक महोत्सव',
    titleEn: 'Shri Shri 108 Durga Puja Grand Mahotsav',
    dateHi: 'शारदीय नवरात्र (आश्विन शुक्ल पक्ष)',
    dateEn: 'Sharad Navratri Festive Period',
    badgeHi: 'वार्षिक महापर्व',
    badgeEn: 'Annual Festival',
    descriptionHi: 'माता के नौ रूपों का आह्वान, महासप्तमी, महाअष्टमी, महानवमी पूजन, डांडिया-गरबा एवं विशाल महाप्रसाद वितरण। समस्त भक्तजन सपरिवार आमंत्रित हैं।',
    descriptionEn: 'Nine sacred nights of the Divine Mother, Mahasaptami, Mahaashtami, Navami puja, traditional cultural events and grand community mahaprasad.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHCZ1ar0i_RTbDpKVTioPxNMc_GhdrcGC0-KIZR9YreUubKggDtwil2iRyRfD2rsZXpYUy6oeU7vJB5LEasDzayG9EvlFW76dZRq0-2rpa3qNh00gWiSWZFy3XHZjgslXeuJoho4Sx3xYCGF09X_7eN-fenAAa-vIu1BweWgFzx-BlaoPn3OkriKeORqONHy0LXfcpyIowmQIUoMEPHfriHhhexuwRDk7IJiJepflm',
    highlightsHi: ['अखंड ज्योति स्थापना', 'शतचंडी महायज्ञ', 'दैनिक 5,000+ भक्तों का महाप्रसाद', 'विशेष डांडिया एवं भक्ति संध्या'],
    highlightsEn: ['Akhand Jyoti Installation', 'Shat Chandi Yajna', 'Mahaprasad for 5,000+ devotees', 'Devotional music nights'],
  },
  {
    id: 'annakshetra',
    titleHi: 'नित्य निःशुल्क अन्नक्षेत्र एवं महाप्रसाद वितरण सेवा',
    titleEn: 'Daily Free Annakshetra & Mahaprasad Seva',
    dateHi: 'प्रतिदिन दोपहर 12:30 से 03:00 बजे',
    dateEn: 'Daily 12:30 PM to 03:00 PM',
    badgeHi: 'नित्य सेवा',
    badgeEn: 'Daily Seva',
    descriptionHi: 'दोपहर 12:30 बजे से 03:00 बजे तक प्रतिदिन अन्नक्षेत्र भवन में 2,000+ श्रद्धालुओं हेतु शुद्ध सात्विक भोजन महाप्रसाद का निःशुल्क वितरण।',
    descriptionEn: 'Daily sanctified pure vegetarian nutritious meal served freely to over 2,000+ devotees and pilgrims in the Annakshetra hall.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADTkFUOkL1PrvYxqloRD62ntwcEcCFLZwKLoYB_7y-OepI-CVlARyKrFkF3SrxMucj5L6GWTpgrdhc49nQTUWPdlEHfKSyLfBoBHx7t59P0qDHjzEAvimV7xP2Eb5A4XHb77FsmdlGq87_-5KELoU3J6jFRppuZa6GKDin-0-K2mzK-boTMNxRPJlsQcu4t_izfpY4chltNLuVN0djWPLu6aB_HUoVJLdxX5AZ73M2',
    highlightsHi: ['पूर्णतः सात्विक एवं स्वच्छ भोजन', 'देशी घी से निर्मित हलवा व दाल', 'सभी वर्गों के लिए निःशुल्क', 'भक्त अपनी वर्षगांठ/पुण्यतिथि पर संकल्प ले सकते हैं'],
    highlightsEn: ['Pure satvik ingredients', 'Desi ghee prasad', 'Open to all without distinction', 'Sponsor on birthdays & anniversaries'],
  },
  {
    id: 'havan-gaushala',
    titleHi: 'प्रातःकालीन सामूहिक नवग्रह शांति हवन एवं गौमाता सेवा',
    titleEn: 'Morning Navagraha Shanti Havan & Holy Cow Seva',
    dateHi: 'प्रत्येक रविवार प्रात: 08:00 बजे',
    dateEn: 'Every Sunday at 08:00 AM',
    badgeHi: 'वैदिक अनुष्ठान',
    badgeEn: 'Vedic Ritual',
    descriptionHi: 'पारिवारिक सुख-शांति एवं ग्रहदोष निवारण हेतु प्रत्येक रविवार प्रात: 08:00 बजे मंदिर यज्ञशाला में आहुति दें। मंदिर गौशाला में हरा चारा एवं गुड़ सेवा उपलब्ध।',
    descriptionEn: 'Navagraha pacification yajna every Sunday morning followed by sacred cow seva (green fodder & jaggery) at the temple ashram gaushala.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv13TyL579wUgMmBCMzvGbbto8DDiN2EM8Wfqv5f_blbQhQU08m2sXzNSTEFaosKdFNQ7CYskmJaShAIHhmhklndQNpoLgKPJ1wqOmiQLS8FNhJpzxF9CbArlAqSqujbjcHjg61S77ANnXDqsIrGO6raCLFnUn1RZq97nK2U1vheVpx5IFVQYi5M-x0PYWiYOTWSUg8EFvUwBr9tHX9-O_LZizwAF_WnV59axQ7GDb',
    highlightsHi: ['वैदिक ब्राह्मणों द्वारा मंत्रोच्चार', 'सपरिवार यज्ञशाला में बैठने की सुविधा', 'देशी गायों का संवर्धन', 'गौ ग्रास एवं गुड़ सेवा संकल्प'],
    highlightsEn: ['Vedic mantra recitation', 'Family yajna seating', 'Indigenous cow preservation', 'Go-gras & fodder sankalpa'],
  },
  {
    id: 'mahashivratri',
    titleHi: 'महाशिवरात्रि महापर्व - अखंड चार पहर महापूजा',
    titleEn: 'Maha Shivratri Mahotsav - 4 Pahar Akhand Puja',
    dateHi: 'फाल्गुन कृष्ण त्रयोदशी / चतुर्दशी',
    dateEn: 'Phalguna Krishna Trayodashi',
    badgeHi: 'महोत्सव',
    badgeEn: 'Grand Festival',
    descriptionHi: '24 घंटे का अखंड रुद्राभिषेक, चार पहर की दिव्य आरती, महाभस्म अर्पण एवं विशाल शिव बारात संकीर्तन।',
    descriptionEn: 'Round-the-clock Rudrabhishek, four quarters nocturnal worship, holy bhasma offering and grand devotional procession.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmgN0ZRHi8o5nEJckLnqdkKq-YYSIODIWiK0YWKKbMAOGpgAnczCPfrO2denurXutmGDel1JwOUmD7PYDPh6l-oRtIWZSk5an9l84ePzMbzUQcPt-boXV13ZMh5XNTVCjTcco87oWOr2m-p5rL_3u0iCQJIndVO8m2I_vTDlcgWB_UtuCHs4-VAWIIxIU9yK6vrnHKhW7E9InGfy7OIQSG9odA7JGaDmEQJbJ8xYEI',
    highlightsHi: ['अखंड दुग्धाभिषेक', 'सहस्र बिल्वार्चन', 'रात्रि जागरण एवं भजन', 'विशेष फलाहार महाप्रसाद'],
    highlightsEn: ['Continuous milk abhishek', '1,000 bilva leaves offering', 'Night vigil & hymns', 'Fast-friendly prasad'],
  },
];

export const GALLERY_DATA: GalleryImage[] = [
  {
    id: 'temple-building',
    titleHi: 'भव्य मंदिर शिखर एवं मुख्य तोरण',
    titleEn: 'Main Temple Spire & Pink Torana',
    category: 'temple',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAym5VD7az5hJ53RLq3YvqUUqVH-gBRwlOQyBdGV4Juw85L-jhlUjhd6ACsY86dAAWvCUdH3NSc7o66kx6BXJvwKOmp2F3gc4xfztFDTK_0u3U1SU2R4BLvdO7Q9ECnNXLzKGrM0ljqTdeOj-DnCYEda1SuijVw3taBxtviT11JgwVqOGE1Gz5RVLj0UHNzJIM28xuBklmC7aEKcRGNzlltNyW95ahkFBzSRnD4bTXLBSUkoLfHsrMIRYpv8Bn67_6koOw',
    captionHi: 'श्री १००८ नवचेतना शिव शक्ति मंदिर का नवनिर्मित अलौकिक शिखर, गुलाबी तोरण, कमल नक्काशी एवं स्वर्ण कलश।',
    captionEn: 'The newly consecrated sacred pink arches, golden kalash spire and marble courtyard.',
  },
  {
    id: 'mandir-nirman-scaffolding',
    titleHi: 'मंदिर निर्माण कार्य - शिखर चिनाई व बांस मचान',
    titleEn: 'Temple Spire Construction & Scaffolding',
    category: 'temple',
    imageUrl: '/src/assets/images/mandir_shikhara_nirman_1791266666026.jpg',
    captionHi: '॥ जय माता दी ॥ सेवा • समर्पण • सहयोग - मंदिर शिखर निर्माण के दौरान कारीगरों एवं सेवादारों द्वारा ईंट चिनाई व ध्वज स्थापना।',
    captionEn: 'Sacred construction of the temple spire with bamboo scaffolding and saffron flag flying proudly.',
  },
  {
    id: 'mandir-durga-puja-pandal',
    titleHi: 'श्री श्री १००८ नवचेतना दुर्गा पूजा भव्य पंडाल व प्रतिमा',
    titleEn: 'Grand Durga Puja Pandal & Divine Deities',
    category: 'festivals',
    imageUrl: '/src/assets/images/mandir_durga_pandal_1791266679875.jpg',
    captionHi: 'माँ दुर्गा पूजा समिति द्वारा स्थापित महिषासुरमर्दिनी, गणेश, लक्ष्मी, सरस्वती व कार्तिकेय के दिव्य विग्रह एवं पुष्प श्रृंगार।',
    captionEn: 'Magnificent 10-armed Goddess Durga pandal celebration with colorful pleated canopy and floral garlands.',
  },
  {
    id: 'mandir-havan-circle',
    titleHi: 'सामूहिक वैदिक महायज्ञ एवं नवग्रह शांति हवन',
    titleEn: 'Community Vedic Yajna & Havan Ritual',
    category: 'rituals',
    imageUrl: '/src/assets/images/mandir_havan_ceremony_1791266693229.jpg',
    captionHi: 'मंदिर प्रांगण में गोलाकार क्रम में बैठकर वेद मंत्रोच्चार के साथ हवन कुंड में पावन हविष्य आहुति देते यजमान व भक्तजन।',
    captionEn: 'Sacred community Havan ritual in the temple courtyard with priests and devotees offering oblations into the holy fire.',
  },
  {
    id: 'mandir-sacred-brass-bell',
    titleHi: 'गर्भगृह हेतु पवित्र विशाल पीतल घंटा अर्पण',
    titleEn: 'Sacred Golden Brass Temple Bell Offering',
    category: 'temple',
    imageUrl: '/src/assets/images/mandir_brass_bell_1791266703457.jpg',
    captionHi: 'मंदिर गर्भगृह में स्थापना हेतु सेवादार द्वारा श्रद्धापूर्वक समर्पित विशाल स्वर्ण आभा युक्त पीतल घंटा।',
    captionEn: 'A devotee holding the consecrated heavy brass temple bell for sanctum installation.',
  },
  {
    id: 'mandir-evening-aarti',
    titleHi: 'सांध्य महाआरती एवं दीपोत्सव आभा',
    titleEn: 'Evening Maha Aarti & Lamp Illumination',
    category: 'rituals',
    imageUrl: '/src/assets/images/mandir_evening_aarti_1791266342089.jpg',
    captionHi: 'सैकड़ों पीतल दीपों की स्वर्ण आभा से जगमगाता मंदिर प्रांगण एवं भक्तिभाव में लीन श्रद्धालु।',
    captionEn: 'The temple sanctum courtyard aglow with hundreds of brass oil lamps and reverent devotees.',
  },
  {
    id: 'mandir-kalash-spire',
    titleHi: 'स्वर्ण कलश, पावन ॐ प्रतीक एवं भगवा ध्वज',
    titleEn: 'Golden Kalash, Sacred Om & Saffron Flag',
    category: 'temple',
    imageUrl: '/src/assets/images/mandir_kalash_shikhara_1791266354827.jpg',
    captionHi: 'नीले आकाश की पृष्ठभूमि में मंदिर शिखर पर सुशोभित पवित्र ॐ प्रतीक, स्वर्ण कलश एवं पावन भगवा ध्वज।',
    captionEn: 'Close-up of the temple shikhara with golden kalash, sacred Om carving, and fluttering holy saffron flag.',
  },
  {
    id: 'mandir-marble-pillars',
    titleHi: 'कमल नक्काशीदार संगमरमर स्तंभ व सभामंडप',
    titleEn: 'Lotus Carved Marble Pillars & Mandap',
    category: 'temple',
    imageUrl: '/src/assets/images/mandir_marble_courtyard_1791266365567.jpg',
    captionHi: 'शुद्ध श्वेत संगमरमर का आंतरिक प्रांगण, स्वर्ण कमल नक्काशीदार खंभे एवं शांत आध्यात्मिक वातावरण।',
    captionEn: 'Serene interior temple hall with carved lotus pillars, reflecting marble floor, and sacred temple bell.',
  },
  {
    id: 'mandir-festive-entrance',
    titleHi: 'उत्सव पुष्प श्रृंगार व मुख्य सिंहद्वार',
    titleEn: 'Festive Marigold Floral Gate & Toran',
    category: 'festivals',
    imageUrl: '/src/assets/images/mandir_festive_entrance_1791266377527.jpg',
    captionHi: 'दुर्गा पूजा एवं नवरात्र महापर्व पर गेंदा व चंपा पुष्प मालाओं से सुसज्जित भव्य मुख्य मंदिर द्वार।',
    captionEn: 'Grand temple entrance adorned with fresh orange marigold garlands, rangoli, and auspicious brass lanterns.',
  },
  {
    id: 'annakshetra-kitchen',
    titleHi: 'नित्य सात्विक अन्नक्षेत्र महाप्रसाद सेवा',
    titleEn: 'Daily Satvik Temple Annakshetra Kitchen',
    category: 'rituals',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADTkFUOkL1PrvYxqloRD62ntwcEcCFLZwKLoYB_7y-OepI-CVlARyKrFkF3SrxMucj5L6GWTpgrdhc49nQTUWPdlEHfKSyLfBoBHx7t59P0qDHjzEAvimV7xP2Eb5A4XHb77FsmdlGq87_-5KELoU3J6jFRppuZa6GKDin-0-K2mzK-boTMNxRPJlsQcu4t_izfpY4chltNLuVN0djWPLu6aB_HUoVJLdxX5AZ73M2',
    captionHi: 'विशाल तांबे-पीतल के पात्रों में शुद्ध देशी घी से तैयार महाप्रसाद नित्य सहस्रों भक्तों में वितरण।',
    captionEn: 'Hygienic traditional preparation of pure satvik mahaprasad for pilgrims.',
  },
  {
    id: 'yajna-havankund',
    titleHi: 'वैदिक नवग्रह यज्ञशाला व गौशाला सेवा',
    titleEn: 'Vedic Navagraha Yajnashala & Ashram Cow Seva',
    category: 'rituals',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv13TyL579wUgMmBCMzvGbbto8DDiN2EM8Wfqv5f_blbQhQU08m2sXzNSTEFaosKdFNQ7CYskmJaShAIHhmhklndQNpoLgKPJ1wqOmiQLS8FNhJpzxF9CbArlAqSqujbjcHjg61S77ANnXDqsIrGO6raCLFnUn1RZq97nK2U1vheVpx5IFVQYi5M-x0PYWiYOTWSUg8EFvUwBr9tHX9-O_LZizwAF_WnV59axQ7GDb',
    captionHi: 'मंत्रोच्चार के साथ पवित्र हविष्य एवं समिधा आहुति अनुष्ठान तथा गौमाता सेवा।',
    captionEn: 'Vedic priests chanting hymns with holy ghee offerings in the sacrificial pit.',
  },
  {
    id: 'shiva-lingam',
    titleHi: 'श्री सोमेश्वर महादेव गर्भगृह',
    titleEn: 'Someshwar Mahadev Sanctum',
    category: 'deities',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmgN0ZRHi8o5nEJckLnqdkKq-YYSIODIWiK0YWKKbMAOGpgAnczCPfrO2denurXutmGDel1JwOUmD7PYDPh6l-oRtIWZSk5an9l84ePzMbzUQcPt-boXV13ZMh5XNTVCjTcco87oWOr2m-p5rL_3u0iCQJIndVO8m2I_vTDlcgWB_UtuCHs4-VAWIIxIU9yK6vrnHKhW7E9InGfy7OIQSG9odA7JGaDmEQJbJ8xYEI',
    captionHi: 'स्वर्ण नाग एवं श्वेत बिल्वपत्रों से अलंकृत पावन शिवलिंग स्वरूप।',
    captionEn: 'Sacred Shiva Lingam adorned with golden serpent and bilva leaves.',
  },
  {
    id: 'durga-shrine',
    titleHi: 'माँ दुर्गा जगदम्बा शक्तिपीठ स्वरूप',
    titleEn: 'Maa Durga Jagdamba Shringar Darshan',
    category: 'deities',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHCZ1ar0i_RTbDpKVTioPxNMc_GhdrcGC0-KIZR9YreUubKggDtwil2iRyRfD2rsZXpYUy6oeU7vJB5LEasDzayG9EvlFW76dZRq0-2rpa3qNh00gWiSWZFy3XHZjgslXeuJoho4Sx3xYCGF09X_7eN-fenAAa-vIu1BweWgFzx-BlaoPn3OkriKeORqONHy0LXfcpyIowmQIUoMEPHfriHhhexuwRDk7IJiJepflm',
    captionHi: 'रक्तवर्णी दिव्य वस्त्रों एवं स्वर्ण आभूषणों में सुशोभित माँ भगवती।',
    captionEn: 'Goddess Durga resplendent in crimson silk and sacred ornaments.',
  },
  {
    id: 'ganesha-vigraha',
    titleHi: 'श्री सिद्धि विनायक स्वरूप',
    titleEn: 'Siddhi Vinayak Vigraha',
    category: 'deities',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0mBYEoPRkwQMh9jcsLZ-dfeWJB24nngqsdXyChVtoDCvg9z0BaeM4TnABZBUT5sdLTyymVQW0WZUFcS0Ls1pn3_vIN_YhrUQeEhqlVidxyywt6Z7g4CN97o6N3Fkt6MhP7clIR3evpk-Mw-Ptdl3-9KOfp3qhYyHEdlFqzdCLEu1s015eqceexLG6vMGjISuFfOjF8zHr5VPOZoa-O4Y6iSaZ_yy8tR1ub-FHkDfw',
    captionHi: 'सिंदूर लेप एवं दूर्वा से सुशोभित प्रथम पूज्य गणपति बप्पा।',
    captionEn: 'Lord Ganesha in auspicious saffron sindoor and fresh durva.',
  },
  {
    id: 'hanuman-chola',
    titleHi: 'श्री संकटमोचन हनुमान',
    titleEn: 'Sankat Mochan Hanuman Ji',
    category: 'deities',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAELmNmdsVOkuDfkFGG5EcFhfTRgFE9cu1G2olLja7wYMJZmgc3UUdPcI1t3I-5P1LzxOVYYjyNBywVSKKLykfjQA3D7DauUEEA0UhJQILV6iVdqZT5n9081ggYR_a5NDHO6OqpiqCt5WGyVtasQtDlBYyUWgqJav_n_0ckUz7Vq-1djNfZE0op-R7iyRPzZjWOo4S0OQVAQD3YbPdQVCg6uyESAjAEZXLlswkkddTi',
    captionHi: 'सिंदूर चोला एवं रजत गदा से सुसज्जित बलवीर पवनपुत्र।',
    captionEn: 'Veer Hanuman adorned with holy sindoor chola and silver mace.',
  },
  {
    id: 'lakshmi-darshan',
    titleHi: 'माता महालक्ष्मी कमल दर्शन',
    titleEn: 'Mata Mahalakshmi on Lotus',
    category: 'deities',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvlmXtWkA5sYd3Pr0ZwxA5GcwNNOpduQOp2400MBlLF_58BPi4y6xgEISW1_3Zld0ZGtLz1bQtUYpn3Qz4EmZlYoDKHHB8B4sU9uLgOqdKd7qwr2sfzh8oAf2yNABBRRWIwZpylR3n9y1cZwiNNmm25auCWyvggYM2BNMFlJAdlvecPTYX9yJ-KEAJjYms2HTFyPnw6bINnAdICi4wjyYL6zWywzISJUp2CP6piExk',
    captionHi: 'गुलाबी कमल पर विराजमान धन-वैभव प्रदायिनी माँ महालक्ष्मी।',
    captionEn: 'Mata Lakshmi showering boons from her divine pink lotus.',
  },
  {
    id: 'vishnu-vigraha',
    titleHi: 'भगवान लक्ष्मीनारायण श्यामल विग्रह',
    titleEn: 'Lakshmi Narayan Dark Stone Murti',
    category: 'deities',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNI-mIDxLn5Su0lW3lXHuiGVDomi6WxuqLOuciNHAkDBgJhqzDeVOVcVXNZgfqYmPyV7fEZcfKATlh_XKe-pfn99R_Ea6A-UFS36VYvLxU_zbrECg_OIOVr0Fm4myvk24w3yxgp6hPLqKemFuoz-NryoT5Ej_3kwOuZHecb9HiB8_r0eXQZAGDFmmiN__Us6unFvztLmod4DhfbGdatHo8gEe02cSqwsiWzsXR3nID',
    captionHi: 'पीताम्बरी वस्त्र एवं तुलसी माला में जगत के पालनहार।',
    captionEn: 'Lord Vishnu in yellow silk pitambar and basil garland.',
  },
];

export const DONATION_TIERS: DonationTier[] = [
  {
    amount: 501,
    labelHi: 'गौमाता चारा एवं दीप सेवा',
    labelEn: 'Gaushala Fodder & Deepam Seva',
    benefitHi: 'एक दिवस का हरा चारा एवं नित्य अखंड ज्योत में घृत अर्पण',
    benefitEn: '1 day green fodder for sacred cows & ghee for eternal flame',
  },
  {
    amount: 1100,
    labelHi: 'नित्य सात्विक अन्नदान सेवा',
    labelEn: 'Satvik Annakshetra Food Seva',
    benefitHi: 'अन्नक्षेत्र में 50+ भक्तों को शुद्ध देशी घी का महाप्रसाद',
    benefitEn: 'Nutritious pure satvik lunch for 50+ devotees in your name',
  },
  {
    amount: 2100,
    labelHi: 'विशेष रुद्राभिषेक एवं अर्चना',
    labelEn: 'Special Rudrabhishek & Archana',
    benefitHi: 'सपरिवार नाम एवं गोत्र द्वारा गर्भगृह में विशेष पंचामृत अभिषेक',
    benefitEn: 'Special Panchamrit Rudrabhishek with your family name & gotra',
  },
  {
    amount: 5100,
    labelHi: 'महायज्ञ एवं उत्सव यजमान संकल्प',
    labelEn: 'Yajna & Festival Yajman Seva',
    benefitHi: 'मासिक हवन में मुख्य यजमान बैठने का अधिकार एवं विशेष प्रसाद बॉक्स',
    benefitEn: 'Seat as Yajman in monthly Navagraha Havan & sanctified prasad kit',
  },
  {
    amount: 11000,
    labelHi: 'मंदिर जीर्णोद्धार एवं विस्तार सेवा',
    labelEn: 'Mandir Preservation & Trust Seva',
    benefitHi: 'शिलालेख पट्टिका पर नाम अंकित + 80G आयकर छूट प्रमाण पत्र',
    benefitEn: 'Donor name inscribed on stone plaque + 80G Tax exemption receipt',
  },
];

export const MANTRA_TRACKS = [
  {
    id: 'om_namah_shivaya',
    title: '॥ ॐ नमः शिवाय ॥',
    deity: 'Lord Shiva',
    duration: '03:45',
    notes: 'पंचामृत रुद्राभिषेक शांति ध्वनि',
  },
  {
    id: 'gayatri_mantra',
    title: '॥ ॐ भूर्भुवः स्वः ॥',
    deity: 'Gayatri Mata',
    duration: '04:12',
    notes: 'दिव्य प्राण ऊर्जा एवं बुद्धि प्रकाश',
  },
  {
    id: 'mahamrityunjaya',
    title: '॥ ॐ त्र्यम्बकं यजामहे ॥',
    deity: 'Mahamrityunjaya',
    duration: '05:08',
    notes: 'आरोग्य, दीर्घायु एवं भयमुक्ति',
  },
  {
    id: 'vasudevaya',
    title: '॥ ॐ नमो भगवते वासुदेवाय ॥',
    deity: 'Lord Vishnu',
    duration: '04:30',
    notes: 'परम शांति एवं मोक्ष प्रदाता',
  },
  {
    id: 'hanuman_chalisa',
    title: '॥ श्री हनुमान चालीसा ॥',
    deity: 'Sankat Mochan',
    duration: '08:24',
    notes: 'संकटमोचन मंगलकारी स्तुति',
  },
];
