import React, { useState, useEffect } from 'react';
import { playTempleBell } from '../utils/audioEngine';

export interface TempleArticle {
  id: string;
  titleHi: string;
  titleEn: string;
  category: 'event' | 'spiritual' | 'history' | 'seva';
  authorHi: string;
  authorEn: string;
  date: string;
  summaryHi: string;
  summaryEn: string;
  contentHi: string;
  contentEn: string;
  imageUrl?: string;
  isPinned?: boolean;
  tagsHi: string[];
  tagsEn: string[];
}

interface TempleUpdatesBlogProps {
  lang: 'hi' | 'en';
}

const DEFAULT_ARTICLES: TempleArticle[] = [
  {
    id: 'article-1',
    titleHi: 'आगामी शरद नवरात्रि एवं श्री श्री १०८ दुर्गा पूजा महामहोत्सव की भव्य तैयारियां',
    titleEn: 'Grand Preparations Begin for Sharad Navratri & Shri Shri 1008 Durga Puja',
    category: 'event',
    authorHi: 'मंदिर ट्रस्ट समिति',
    authorEn: 'Mandir Trust Committee',
    date: '05 Oct 2026',
    isPinned: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAym5VD7az5hJ53RLq3YvqUUqVH-gBRwlOQyBdGV4Juw85L-jhlUjhd6ACsY86dAAWvCUdH3NSc7o66kx6BXJvwKOmp2F3gc4xfztFDTK_0u3U1SU2R4BLvdO7Q9ECnNXLzKGrM0ljqTdeOj-DnCYEda1SuijVw3taBxtviT11JgwVqOGE1Gz5RVLj0UHNzJIM28xuBklmC7aEKcRGNzlltNyW95ahkFBzSRnD4bTXLBSUkoLfHsrMIRYpv8Bn67_6koOw',
    summaryHi: 'मंदिर परिसर में शारदीय नवरात्र के उपलक्ष्य में अखंड ज्योति, शतचंडी महायज्ञ एवं भव्य पंडाल निर्माण का कार्य प्रारंभ हो चुका है।',
    summaryEn: 'Grand celebrations for Sharad Navratri including Akhand Jyoti, Shatchandi Yagya, and ornate sanctum arrangements have officially commenced.',
    contentHi: `॥ जय माता दी ॥

श्री १००८ नवचेतना शिव शक्ति मंदिर परिसर, सभापुर, नई दिल्ली में आगामी शारदीय नवरात्र एवं दुर्गा पूजा महोत्सव को अत्यंत गरिमामय और अलौकिक रूप से मनाने की तैयारियां जोर-शोर से चल रही हैं।

महोत्सव के मुख्य आकर्षण:
१. प्रथम दिवस (प्रतिपदा) को प्रात: ०७:०० बजे कलश स्थापना एवं अखंड ज्योति प्रज्ज्वलन।
२. प्रतिदिन प्रात: ०८:०० बजे एवं सायं ०९:०० बजे विशेष शंखनाद महाआरती।
३. नवदिवसीय शतचंडी पाठ एवं वैदिक आचार्यों द्वारा महायज्ञ।
४. अष्टमी एवं नवमी तिथि पर कन्या पूजन तथा विशाल भंडारा।

समस्त श्रद्धालु भक्तों से सादर निवेदन है कि वे सपरिवार पधारकर माँ जगदम्बा की कृपा प्राप्त करें। मुख्य यजमान एवं अन्नदान सेवा हेतु मंदिर कार्यालय में संपर्क कर सकते हैं।`,
    contentEn: `॥ Jai Mata Di ॥

Preparations are in full swing at Shri 1008 Nav Chetna Shiv Shakti Mandir, Sabhapur, New Delhi for the auspicious Sharad Navratri Durga Puja celebrations.

Key Highlights:
1. Kalash Sthapana & Akhand Jyoti on Pratipada at 07:00 AM.
2. Daily Vedic Shatchandi Paath with consecrated Havans.
3. Grand Kanya Pujan and Maha Bhandara on Ashtami & Navami.
4. Maha Aarti with sacred conch blowing daily.

All devotees are cordially invited to participate with family and receive divine blessings of Maa Jagdamba.`,
    tagsHi: ['दुर्गा पूजा', 'नवरात्रि', 'उत्सव', 'शतचंडी यज्ञ'],
    tagsEn: ['Durga Puja', 'Navratri', 'Festivals', 'Vedic Yagya'],
  },
  {
    id: 'article-2',
    titleHi: 'शिव और शक्ति का तात्विक रहस्य: अद्वैत चेतना और वैदिक साधना',
    titleEn: 'The Philosophical Essence of Shiva & Shakti: Non-Dual Cosmic Energy',
    category: 'spiritual',
    authorHi: 'आचार्य मदन मोहन (मुख्य पुरोहित)',
    authorEn: 'Acharya Madan Mohan (Head Priest)',
    date: '03 Oct 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYQaxoehqM9vcz-Bypqypeef1HT115TsmCNVuAtOb7XAHxX4i7mQmnCri1CENx1FJBY5bSH20e3ZFjJ4shZ0npvVFPZFTJM5scHo6g3iJuKKAxWv4kMRw2VbytacAKAhgwn0ttcjRG8PikYjUAAGn05U9AfBWmnTvEEciSQgOMTGw60-Kh8y2nOshNQDrgIraKZQzg-KqJnFpljDd1ko1iaKrFUCsh30HGW-48HLLm',
    summaryHi: 'भगवान शिव चेतना हैं और माँ भगवती शक्ति उस चेतना की अनवरत क्रियाशीलता हैं। दोनों एक ही परम तत्व के दो अविभाज्य स्वरूप हैं।',
    summaryEn: 'Lord Shiva is pure consciousness and Goddess Shakti is the vibrant dynamic power of that consciousness. They constitute one unified cosmic truth.',
    contentHi: `॥ ॐ नमः शिवाय ॥

हमारे सनातन दर्शन में शिव और शक्ति का संबंध जल और तरंग, अग्नि और उसकी उष्णता जैसा है। जिस प्रकार अग्नि से उसके ताप को अलग नहीं किया जा सकता, उसी प्रकार शिव और शक्ति अभिन्न हैं।

शिव 'शव' हैं शक्ति के बिना — अर्थात चेतना क्रियाशील नहीं हो सकती यदि उसमें शक्ति का स्पंदन न हो। मंदिर में जब भक्त श्री सोमेश्वर महादेव का जलाभिषेक करते हैं और माँ दुर्गा के श्रीचरणों में दीप अर्पित करते हैं, तब वे वास्तव में अपने भीतर के संतुलन को साधते हैं।

साधना का मर्म:
- सोमवार का उपवास और शिव पंचाक्षर मंत्र (ॐ नमः शिवाय) का जप मन को एकाग्र करता है।
- माँ भगवती की अर्चना संकल्प शक्ति और आत्मबल को जागृत करती है।

इस मंदिर का नाम "नवचेतना" इसी दर्शन को समर्पित है — भक्त यहाँ आकर एक नई दिव्य चेतना का अनुभव करें।`,
    contentEn: `॥ Om Namah Shivaya ॥

In Sanatana Dharma, Shiva and Shakti are as inseparable as water and waves, fire and heat. Without Shakti, Shiva is transcendent stillness; with Shakti, existence vibrates in divine play.

By performing Rudrabhishek of Someshwar Mahadev and lighting lamps for Maa Durga, devotees harmonize intellect, devotion, and spiritual action. This is the inner meaning behind 'Nav Chetna' (awakening of new consciousness).`,
    tagsHi: ['आध्यात्मिक ज्ञान', 'शिव तत्व', 'शक्ति साधना', 'वेदांत'],
    tagsEn: ['Spiritual Insights', 'Shiva', 'Shakti', 'Vedanta'],
  },
  {
    id: 'article-3',
    titleHi: 'मंदिर का इतिहास: मिलन गार्डन, सभापुर में आध्यात्मिक चेतना का प्राकट्य',
    titleEn: 'History of the Mandir: Emergence of Divine Sanctum in Sabhapur',
    category: 'history',
    authorHi: 'ट्रस्ट अभिलेखागार',
    authorEn: 'Trust Archives',
    date: '28 Sep 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM19FnY_6yPhufZQGUZGTJgpAwcxwgKIYrSDPezzEwWhTUbqO3BZh-cXGWx3Nftm7MI9DUslNLzdMd_vg-e0NnZ3kxc1NqkiJMcLP-i8TheKNlPhYZlsQv9xEuI71hZi7jf7VIf1Gpn_HdIcC9-GuGk24NsqBUSAiX35jN76RAyzpKbVdQIdYPGyIs6pcLgCjatKHpwaFTejPy6XS6vc2PpRoagT1mW_2E7ZHQ4mlS',
    summaryHi: 'वर्ष २०२१ में स्थापित इस पावन स्थल ने अल्प समय में ही लाखों भक्तों के हृदय में अटूट श्रद्धा का केंद्र स्थापित किया है।',
    summaryEn: 'Established in 2021, this holy temple campus has blossomed into an anchor of faith, Vedic learning, and community service in North East Delhi.',
    contentHi: `श्री १००८ नवचेतना शिव शक्ति मंदिर की स्थापना वर्ष २०२१ में स्थानीय संतों, आचार्यों एवं धर्मनिष्ठ भक्तों के पावन संकल्प से हुई।

स्थापना का उद्देश्य:
यमुना पार क्षेत्र के सभापुर, मिलन गार्डन एवं निकटवर्ती क्षेत्रों में एक ऐसा पावन तीर्थ निर्मित करना, जहाँ सनातन परंपरा के अनुसार नित्य षोडशोपचार पूजा, सात्विक अन्नक्षेत्र, गौशाला सेवा तथा वैदिक संस्कारों का संरक्षण हो सके।

वास्तु एवं शिल्प:
मंदिर का मुख्य तोरण द्वार राजस्थानी गुलाबी बलुआ पत्थर के भाव को दर्शाता है, जिसके शिखर पर स्वर्ण कलश एवं पावन ॐ ध्वज लहराता है। मुख्य गर्भगृह में पारद शिवलिंग सदृश श्री सोमेश्वर महादेव एवं अष्टभुजा माँ दुर्गा की भव्य प्रतिष्ठा की गई है।`,
    contentEn: `The foundation of Shri 1008 Nav Chetna Shiv Shakti Mandir was laid in 2021 with the pious vision of local saints, acharyas, and devotees.

Its purpose was to create a sanctuary where authentic Vedic rituals, free satvik annakshetra, cow protection, and community welfare flourish together under one sacred canopy.`,
    tagsHi: ['मंदिर इतिहास', 'स्थापना २०२१', 'वास्तु शिल्प', 'धार्मिक धरोहर'],
    tagsEn: ['History', 'Founded 2021', 'Architecture', 'Heritage'],
  },
  {
    id: 'article-4',
    titleHi: 'नित्य सात्विक अन्नक्षेत्र एवं गौशाला संरक्षण सेवा का विस्तार',
    titleEn: 'Expansion of Daily Satvik Annakshetra & Gaushala Seva',
    category: 'seva',
    authorHi: 'सेवा प्रकल्प प्रमुख',
    authorEn: 'Seva Outreach Head',
    date: '22 Sep 2026',
    summaryHi: 'प्रतिदिन दोपहर १२:३० से ०३:०० बजे तक सैकड़ों श्रद्धालुओं एवं जरूरतमंदों को निशुल्क शुद्ध सात्विक महाप्रसाद वितरित किया जा रहा है।',
    summaryEn: 'Daily free distribution of freshly prepared satvik mahaprasad to hundreds of devotees and needy from 12:30 PM to 03:00 PM.',
    contentHi: `॥ परोपकाराय पुण्याय ॥

"अन्नदानं परं दानं विद्यादानात् परं न हि।"
श्री १००८ नवचेतना शिव शक्ति मंदिर ट्रस्ट द्वारा संचालित अन्नक्षेत्र सेवा में विस्तार करते हुए अब प्रतिदिन ५००+ श्रद्धालुओं एवं स्थानीय जरूरतमंदों के लिए महाप्रसाद की सुचारु व्यवस्था की गई है।

गौशाला संरक्षण:
मंदिर परिसर से संबद्ध गौशाला में निराश्रित एवं बीमार गौमाताओं के लिए शुद्ध जल, हरा चारा, गुड़ एवं आयुर्वेदिक औषधियों की निःशुल्क व्यवस्था की गई है। श्रद्धालु अपने जन्मदिन, वैवाहिक वर्षगांठ अथवा पूर्वजों के स्मृति दिवस पर अन्नदान व गौसेवा का संकल्प ले सकते हैं।`,
    contentEn: `॥ Service to Humanity is Service to God ॥

Under the guidance of the Mandir Trust, the daily Annakshetra has expanded to serve over 500 meals daily with purity and devotion. Our Gaushala wing also shelters, feeds, and treats indigenous cows with organic fodder and medical care. Devotees can sponsor meals or cow fodder to commemorate family milestones.`,
    tagsHi: ['अन्नदान', 'गौशाला', 'मानव सेवा', 'महाप्रसाद'],
    tagsEn: ['Annakshetra', 'Gaushala', 'Seva', 'Community'],
  },
];

export const TempleUpdatesBlog: React.FC<TempleUpdatesBlogProps> = ({ lang }) => {
  const [articles, setArticles] = useState<TempleArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<TempleArticle | null>(null);
  const [isAdminPostModalOpen, setIsAdminPostModalOpen] = useState<boolean>(false);

  // New Article Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'event' | 'spiritual' | 'history' | 'seva'>('event');
  const [newAuthor, setNewAuthor] = useState('मंदिर ट्रस्ट समिति');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('मंदिर, धर्म');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newIsPinned, setNewIsPinned] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [formError, setFormError] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

  // Load articles from localStorage or fallback to defaults
  const loadArticles = () => {
    try {
      const stored = localStorage.getItem('mandir_blog_articles');
      if (stored) {
        const parsed: TempleArticle[] = JSON.parse(stored);
        setArticles(parsed);
      } else {
        localStorage.setItem('mandir_blog_articles', JSON.stringify(DEFAULT_ARTICLES));
        setArticles(DEFAULT_ARTICLES);
      }
    } catch (_) {
      setArticles(DEFAULT_ARTICLES);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  // Filter articles
  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      art.titleHi.toLowerCase().includes(q) ||
      art.titleEn.toLowerCase().includes(q) ||
      art.summaryHi.toLowerCase().includes(q) ||
      art.summaryEn.toLowerCase().includes(q) ||
      art.tagsHi.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const handlePostArticle = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Optional simple security pin verification (e.g. 1008 or empty)
    if (adminPin.trim() && adminPin.trim() !== '1008') {
      setFormError(lang === 'hi' ? 'गलत व्यवस्थापक पिन (Admin PIN)। कृपया पुनः प्रयास करें।' : 'Invalid Admin PIN. Please try again.');
      return;
    }

    if (!newTitle.trim() || !newSummary.trim() || !newContent.trim()) {
      setFormError(lang === 'hi' ? 'कृपया शीर्षक, सारांश एवं लेख विवरण भरें।' : 'Please fill title, summary, and content.');
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const parsedTags = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const createdArticle: TempleArticle = {
      id: `article-${Date.now()}`,
      titleHi: newTitle,
      titleEn: newTitle,
      category: newCategory,
      authorHi: newAuthor || 'मंदिर व्यवस्थापक',
      authorEn: newAuthor || 'Mandir Administrator',
      date: formattedDate,
      summaryHi: newSummary,
      summaryEn: newSummary,
      contentHi: newContent,
      contentEn: newContent,
      imageUrl: newImageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAym5VD7az5hJ53RLq3YvqUUqVH-gBRwlOQyBdGV4Juw85L-jhlUjhd6ACsY86dAAWvCUdH3NSc7o66kx6BXJvwKOmp2F3gc4xfztFDTK_0u3U1SU2R4BLvdO7Q9ECnNXLzKGrM0ljqTdeOj-DnCYEda1SuijVw3taBxtviT11JgwVqOGE1Gz5RVLj0UHNzJIM28xuBklmC7aEKcRGNzlltNyW95ahkFBzSRnD4bTXLBSUkoLfHsrMIRYpv8Bn67_6koOw',
      isPinned: newIsPinned,
      tagsHi: parsedTags.length > 0 ? parsedTags : ['मंदिर', 'समाचार'],
      tagsEn: parsedTags.length > 0 ? parsedTags : ['Mandir', 'Updates'],
    };

    const updated = [createdArticle, ...articles];
    setArticles(updated);
    try {
      localStorage.setItem('mandir_blog_articles', JSON.stringify(updated));
    } catch (_) {}

    playTempleBell();
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setIsAdminPostModalOpen(false);
      // Reset form
      setNewTitle('');
      setNewSummary('');
      setNewContent('');
      setNewImageUrl('');
      setAdminPin('');
    }, 1500);
  };

  const handleDeleteArticle = (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(lang === 'hi' ? 'क्या आप इस लेख को हटाना चाहते हैं?' : 'Are you sure you want to delete this article?')) {
      const updated = articles.filter((a) => a.id !== articleId);
      setArticles(updated);
      try {
        localStorage.setItem('mandir_blog_articles', JSON.stringify(updated));
      } catch (_) {}
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 w-full relative" id="temple-updates">
      {/* Decorative Aura background */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-[#ffdea3]/10 blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fff1ec] text-[#9d2f00] text-xs font-bold uppercase tracking-wider mb-2 border border-[#ffe0d6]">
            <span className="material-symbols-outlined text-[15px]">newspaper</span>
            <span>{lang === 'hi' ? 'समाचार, इतिहास एवं सत्संग' : 'News, History & Spiritual Wisdom'}</span>
          </div>
          <h2 className="font-serif-devanagari text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2a170f] tracking-tight">
            {lang === 'hi' ? 'मंदिर संवाद एवं आध्यात्मिक विचार' : 'Temple Updates & Spiritual Insights'}
          </h2>
          <p className="text-xs sm:text-sm text-[#5a4139] mt-1 max-w-2xl">
            {lang === 'hi'
              ? 'आगामी उत्सवों की सूचना, मंदिर का पावन इतिहास, वैदिक दर्शन एवं सेवा प्रकल्पों से संबंधित नवीनतम लेख व घोषणाएं।'
              : 'Read articles and news snippets on upcoming temple festivals, spiritual insights, historical facts, and community seva.'}
          </p>
        </div>

        {/* Admin Post Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsAdminPostModalOpen(true);
              playTempleBell();
            }}
            className="px-4 py-2.5 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">post_add</span>
            <span>{lang === 'hi' ? 'व्यवस्थापक: लेख पोस्ट करें' : 'Admin: Post Article'}</span>
          </button>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 bg-white p-3 rounded-2xl border border-[#ffe0d6] shadow-sm">
        
        {/* Categories Chips */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', labelHi: 'सभी लेख', labelEn: 'All Articles', icon: 'apps' },
            { id: 'event', labelHi: 'उत्सव व कार्यक्रम', labelEn: 'Festivals & Events', icon: 'event' },
            { id: 'spiritual', labelHi: 'आध्यात्मिक विचार', labelEn: 'Spiritual Insights', icon: 'self_improvement' },
            { id: 'history', labelHi: 'मंदिर इतिहास', labelEn: 'Temple History', icon: 'history_edu' },
            { id: 'seva', labelHi: 'सेवा एवं प्रकल्प', labelEn: 'Seva & Welfare', icon: 'volunteer_activism' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-[#9d2f00] text-white shadow-sm'
                  : 'text-[#5a4139] hover:bg-[#fff1ec]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{cat.icon}</span>
              <span>{lang === 'hi' ? cat.labelHi : cat.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <span className="material-symbols-outlined text-[17px] text-[#8e7167] absolute left-3 top-2.5">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'hi' ? 'लेख खोजें...' : 'Search updates...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#ffe9e2] bg-[#fff8f6] focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#ffd2c4] p-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#fff1ec] text-[#9d2f00] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[28px]">search_off</span>
          </div>
          <h4 className="font-serif text-base font-bold text-[#2a170f]">
            {lang === 'hi' ? 'कोई लेख या समाचार नहीं मिला' : 'No articles match your criteria'}
          </h4>
          <p className="text-xs text-[#5a4139]">
            {lang === 'hi' ? 'कृपया अन्य श्रेणी चुनें अथवा नया लेख पोस्ट करें।' : 'Please choose another category or post a new article.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const categoryBadge = {
              event: { labelHi: 'उत्सव समाचार', labelEn: 'Festival Event', bg: 'bg-[#fff1ec]', text: 'text-[#9d2f00]' },
              spiritual: { labelHi: 'आध्यात्मिक विचार', labelEn: 'Spiritual', bg: 'bg-[#ffd9e4]', text: 'text-[#a82d68]' },
              history: { labelHi: 'मंदिर इतिहास', labelEn: 'History', bg: 'bg-[#fff6e6]', text: 'text-[#705100]' },
              seva: { labelHi: 'सेवा घोषणा', labelEn: 'Seva News', bg: 'bg-emerald-50', text: 'text-emerald-800' },
            }[article.category];

            return (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-3xl border border-[#ffe0d6] shadow-[0_4px_20px_rgba(44,24,16,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col group cursor-pointer"
              >
                {/* Article Image (if available) */}
                {article.imageUrl && (
                  <div className="h-48 w-full overflow-hidden relative">
                    <img
                      src={article.imageUrl}
                      alt={lang === 'hi' ? article.titleHi : article.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Category and Pinned Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md ${categoryBadge.bg} ${categoryBadge.text} shadow-sm`}>
                        {lang === 'hi' ? categoryBadge.labelHi : categoryBadge.labelEn}
                      </span>
                      {article.isPinned && (
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#ffdea3] text-[#390c00] flex items-center gap-0.5 shadow-sm">
                          <span className="material-symbols-outlined text-[11px]">push_pin</span>
                          <span>प्रमुख</span>
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 left-3 text-[11px] text-white/90 font-medium flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                )}

                {/* Article Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {!article.imageUrl && (
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${categoryBadge.bg} ${categoryBadge.text}`}>
                          {lang === 'hi' ? categoryBadge.labelHi : categoryBadge.labelEn}
                        </span>
                        <span className="text-[11px] text-[#8e7167] font-medium">{article.date}</span>
                      </div>
                    )}

                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#2a170f] group-hover:text-[#9d2f00] transition-colors leading-snug line-clamp-2">
                      {lang === 'hi' ? article.titleHi : article.titleEn}
                    </h3>

                    <p className="text-xs text-[#5a4139] leading-relaxed line-clamp-3">
                      {lang === 'hi' ? article.summaryHi : article.summaryEn}
                    </p>
                  </div>

                  {/* Footer with author and read button */}
                  <div className="pt-4 mt-4 border-t border-[#fff1ec] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#705100] font-semibold">
                      <span className="material-symbols-outlined text-[14px]">edit_note</span>
                      <span className="truncate max-w-[120px]">{lang === 'hi' ? article.authorHi : article.authorEn}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Delete button (for admin control) */}
                      <button
                        type="button"
                        onClick={(e) => handleDeleteArticle(article.id, e)}
                        title={lang === 'hi' ? 'लेख हटाएं' : 'Delete Article'}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 transition-all text-xs"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>

                      <span className="text-xs font-bold text-[#9d2f00] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        <span>{lang === 'hi' ? 'विस्तार से पढ़ें' : 'Read More'}</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Modal: Full Article Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border-2 border-[#b58a2a]/40 relative text-[#2a170f]">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {/* Header with image */}
            {selectedArticle.imageUrl && (
              <div className="rounded-2xl overflow-hidden h-56 sm:h-64 w-full mb-5 relative">
                <img
                  src={selectedArticle.imageUrl}
                  alt={lang === 'hi' ? selectedArticle.titleHi : selectedArticle.titleEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-white text-xs font-semibold flex items-center gap-2">
                  <span className="bg-[#9d2f00] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    {selectedArticle.date}
                  </span>
                  <span>• {lang === 'hi' ? selectedArticle.authorHi : selectedArticle.authorEn}</span>
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="space-y-4">
              <div className="border-b border-[#ffe9e2] pb-4">
                <span className="text-[11px] font-bold text-[#9d2f00] uppercase tracking-wider block mb-1">
                  श्री १००८ नवचेतना शिव शक्ति मंदिर • संवाद स्तम्भ
                </span>
                <h3 className="font-serif-devanagari text-xl sm:text-2xl font-bold text-[#2a170f] leading-snug">
                  {lang === 'hi' ? selectedArticle.titleHi : selectedArticle.titleEn}
                </h3>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {(lang === 'hi' ? selectedArticle.tagsHi : selectedArticle.tagsEn).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-[#fff1ec] text-[#9d2f00] font-semibold px-2 py-0.5 rounded-full border border-[#ffe0d6]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Main Body Text */}
              <div className="text-xs sm:text-sm text-[#390c00] font-serif leading-relaxed space-y-3 whitespace-pre-line bg-[#fffaf8] p-4 sm:p-5 rounded-2xl border border-[#ffe0d6]">
                {lang === 'hi' ? selectedArticle.contentHi : selectedArticle.contentEn}
              </div>

              {/* Footer CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5a4139] border-t border-[#ffe0d6]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#9d2f00] text-[18px]">temple_hindu</span>
                  <span className="font-semibold text-[#9d2f00]">श्री १००८ नवचेतना शिव शक्ति ट्रस्ट</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${selectedArticle.titleHi}\n\n${selectedArticle.contentHi}\n\nश्री १००८ नवचेतना शिव शक्ति मंदिर, सभापुर`
                      );
                      alert(lang === 'hi' ? 'लेख का विवरण कॉपी हुआ!' : 'Article copied to clipboard!');
                    }}
                    className="px-3.5 py-1.5 bg-[#fff1ec] hover:bg-[#ffe0d6] text-[#9d2f00] rounded-xl font-bold transition-all flex items-center gap-1 border border-[#ffd2c4]"
                  >
                    <span className="material-symbols-outlined text-[15px]">share</span>
                    <span>{lang === 'hi' ? 'शेयर / कॉपी करें' : 'Share Article'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedArticle(null)}
                    className="px-4 py-1.5 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-xl font-bold transition-all shadow-sm"
                  >
                    {lang === 'hi' ? 'बंद करें' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Admin Post New Article Modal */}
      {isAdminPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-7 shadow-2xl border-2 border-[#b58a2a]/60 relative text-[#2a170f]">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsAdminPostModalOpen(false)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="mb-5 text-center">
              <div className="w-11 h-11 rounded-full bg-[#fff1ec] text-[#9d2f00] flex items-center justify-center mx-auto mb-2">
                <span className="material-symbols-outlined text-[24px]">post_add</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2a170f]">
                {lang === 'hi' ? 'नया मंदिर समाचार या लेख प्रकाशित करें' : 'Post New Temple Article or Snippet'}
              </h3>
              <p className="text-xs text-[#5a4139] mt-0.5">
                {lang === 'hi'
                  ? 'उत्सव घोषणा, मंदिर इतिहास अथवा आध्यात्मिक विचार सीधे होमपेज पर प्रकाशित करें।'
                  : 'Publish news snippets, historical milestones, or spiritual insights directly to the homepage.'}
              </p>
            </div>

            {postSuccess ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h4 className="font-serif text-lg font-bold text-[#2a170f]">
                  {lang === 'hi' ? 'लेख सफलतापूर्वक प्रकाशित हुआ!' : 'Article Successfully Published!'}
                </h4>
                <p className="text-xs text-[#5a4139]">
                  {lang === 'hi' ? 'यह लेख अब होमपेज पर सभी श्रद्धालुओं के लिए लाइव है।' : 'The update is now live on the homepage.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handlePostArticle} className="space-y-4">
                {formError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold">
                    {formError}
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#705100] mb-1">
                    {lang === 'hi' ? 'लेख का शीर्षक *' : 'Article Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="उदा. आगामी महाशिवरात्रि रुद्राभिषेक विशेष व्यवस्था"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-[#fff8f6] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                </div>

                {/* Category & Author Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#705100] mb-1">
                      {lang === 'hi' ? 'श्रेणी (Category) *' : 'Category *'}
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#ffe9e2] bg-[#fff8f6] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                    >
                      <option value="event">{lang === 'hi' ? 'उत्सव व कार्यक्रम (Events)' : 'Events'}</option>
                      <option value="spiritual">{lang === 'hi' ? 'आध्यात्मिक विचार (Spiritual)' : 'Spiritual'}</option>
                      <option value="history">{lang === 'hi' ? 'मंदिर इतिहास (History)' : 'History'}</option>
                      <option value="seva">{lang === 'hi' ? 'सेवा एवं घोषणा (Seva/News)' : 'Seva'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#705100] mb-1">
                      {lang === 'hi' ? 'लेखक / प्रेषक' : 'Author'}
                    </label>
                    <input
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="उदा. मंदिर ट्रस्ट समिति"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#ffe9e2] bg-[#fff8f6] text-xs focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                    />
                  </div>
                </div>

                {/* Short Summary */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#705100] mb-1">
                    {lang === 'hi' ? 'संक्षिप्त सारांश (Short Summary) *' : 'Short Summary *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="होमपेज कार्ड पर दिखने वाला १-२ पंक्तियों का संक्षिप्त सार"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-[#fff8f6] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                </div>

                {/* Full Content */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#705100] mb-1">
                    {lang === 'hi' ? 'सम्पूर्ण लेख विवरण (Full Article Content) *' : 'Full Content *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="लेख या समाचार का पूरा विवरण यहाँ लिखें..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-[#fff8f6] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                </div>

                {/* Optional Image URL & Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#705100] mb-1">
                      {lang === 'hi' ? 'चित्र यूआरएल (Image URL, ऐच्छिक)' : 'Image URL (Optional)'}
                    </label>
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://...jpg"
                      className="w-full px-3 py-2 rounded-xl border border-[#ffe9e2] bg-[#fff8f6] text-xs focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#705100] mb-1">
                      {lang === 'hi' ? 'टैग्स (Tags, कॉमा से अलग करें)' : 'Tags (Comma separated)'}
                    </label>
                    <input
                      type="text"
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                      placeholder="उदा. शिवरात्रि, रुद्राभिषेक, पूजा"
                      className="w-full px-3 py-2 rounded-xl border border-[#ffe9e2] bg-[#fff8f6] text-xs focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                    />
                  </div>
                </div>

                {/* Admin PIN & Pin to Top */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 bg-[#fff8f6] p-3 rounded-xl border border-[#ffe0d6]">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="pinArticle"
                      checked={newIsPinned}
                      onChange={(e) => setNewIsPinned(e.target.checked)}
                      className="w-4 h-4 text-[#9d2f00] rounded focus:ring-[#9d2f00]"
                    />
                    <label htmlFor="pinArticle" className="text-xs font-semibold text-[#5a4139] cursor-pointer">
                      {lang === 'hi' ? 'शीर्ष पर पिन करें (Pin to top)' : 'Pin to top'}
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#705100] font-bold">व्यवस्थापक पिन:</span>
                    <input
                      type="password"
                      value={adminPin}
                      onChange={(e) => setAdminPin(e.target.value)}
                      placeholder="PIN: 1008"
                      className="w-24 px-2 py-1 text-xs rounded-lg border border-[#ffe9e2] bg-white font-mono"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAdminPostModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    रद्द करें (Cancel)
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    <span>{lang === 'hi' ? 'प्रकाशित करें (Publish)' : 'Publish Update'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
