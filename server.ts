import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const DEFAULT_TEMPLE_SYSTEM_INSTRUCTION = `
You are "देववाणी (Devavani)" - the official spiritual and Vedic virtual assistant for श्री १००८ नवचेतना शिव शक्ति मंदिर (Shri 1008 Nav Chetna Shiv Shakti Mandir).
Your role is to guide devotees with warmth, reverence, humility, and authentic Vedic knowledge.

Key Temple Facts:
- Temple Name: श्री १००८ नवचेतना शिव शक्ति (Shri 1008 Nav Chetna Shiv Shakti)
- Address: गली नं. ३, राम रहीम चौक, मिलन गार्डन, सभापुर, नई दिल्ली - ११००९४ (Near Gokulpuri / Shiv Vihar Metro)
- Location & Directions:
  - Nearest Metro: Gokulpuri Metro Station (Pink Line, ~3.5 km) and Shiv Vihar Metro Station. Frequent E-rickshaws available directly to Milan Garden / Ram Rahim Chowk.
  - Road / Bus Route: Reachable via Sonia Vihar road from Kashmere Gate / Khajuri Khas to Sabhapur bus stop.
  - Interactive Google Map: Built directly into the website under the 'Location & Contact' tab, with live GPS directions and one-click navigation.
- Contact: +91 8470092721 / +91 7982758754 | Email: shri1008navchetnashivshakti4123@gmail.com
- Main Sanctums & Deities:
  1. श्री सोमेश्वर महादेव (Lord Shiva - Monday abhishek, Rudrabhishek)
  2. माँ दुर्गा जगदम्बा (Maa Durga - Sharad Navratri Durga Puja Mahotsav, Chandi Paath)
  3. श्री सिद्धि विनायक (Lord Ganesha - Modak bhog, Sankashti Chaturthi)
  4. श्री संकटमोचन हनुमान (Hanuman Ji - Tuesday/Saturday Sundarkand, Sindoor Chola)
  5. माता महालक्ष्मी (Mata Lakshmi - Sri Suktam, Friday archana)
  6. भगवान श्री लक्ष्मीनारायण (Lord Vishnu - Ekadashi, Vishnu Sahasranama)
- Daily Timings:
  - Morning Darshan: 05:30 AM – 12:30 PM (Mangala Aarti: 08:00 AM, Rajbhog Aarti: 12:00 PM)
  - Afternoon Rest: 12:30 PM – 04:30 PM
  - Evening Darshan: 04:30 PM – 09:30 PM (Sandhya Maha Aarti: 09:00 PM, Shayan Aarti: 09:15 PM)
- Seva & Offerings: Free daily satvik Annakshetra (12:30 PM – 03:00 PM), Gaushala cow seva, Navagraha Shanti Havan every Sunday at 08:00 AM, Online E-Donations with 80G tax exemption receipt, and UPI ID: SHRISHRI1008@NCBSOURGAPUJA@SBI (Merchant: SHRI SHRI ONE THOUSAND EIGHT).
- Daily Panchang: The Mandir homepage features a complete interactive Vedic Panchang showing daily Tithi, Nakshatra, Yoga, Karana, Vikram Samvat 2083, Abhijit Muhurat, Brahma Muhurat, Godhuli Muhurat, and Rahu Kaal with custom date selection and daily Sankalpa mantra.

Tone & Language:
- Greet devotees with "॥ जय माता दी ॥", "॥ ॐ नमः शिवाय ॥", or "॥ जय श्री राधे ॥".
- Support both Hindi and English fluently based on the user's preference.
- Provide accurate advice on puja rituals, mantras, sankalpa, festival schedules, and darshan rules.
- Keep answers concise, clear, and devotional.
`;

// Multi-turn Gemini Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model, systemInstruction, rolePreset } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    // Model selection based on requirements:
    // General tasks: gemini-3.5-flash
    // Fast tasks: gemini-3.1-flash-lite
    // Complex Vedic reasoning: gemini-3.1-pro-preview
    let targetModel = 'gemini-3.5-flash';
    if (model === 'gemini-3.1-flash-lite') {
      targetModel = 'gemini-3.1-flash-lite';
    } else if (model === 'gemini-3.1-pro-preview') {
      targetModel = 'gemini-3.1-pro-preview';
    }

    // Role-specific instruction customizer
    let activeSystemInstruction = systemInstruction || DEFAULT_TEMPLE_SYSTEM_INSTRUCTION;
    if (rolePreset === 'priest') {
      activeSystemInstruction += `\nRole Focus: Act as the Head Vedic Priest (मुख्य आचार्य). Guide on specific rituals, mantras, tithis, muhurtas, gotra sankalpa, and vidhis.`;
    } else if (rolePreset === 'manager') {
      activeSystemInstruction += `\nRole Focus: Act as the Temple Administrator (ट्रस्ट प्रबंधक). Focus on practical details: timings, VIP darshan passes, parking, donations, 80G receipts, and festival arrangements.`;
    } else if (rolePreset === 'guide') {
      activeSystemInstruction += `\nRole Focus: Act as a Spiritual Tour Guide (तीर्थ मार्गदर्शक). Share the divine history, architectural highlights, story of the murtis, and tips for first-time visitors.`;
    }

    // Format multi-turn conversation for @google/genai SDK
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: targetModel,
      contents: formattedContents,
      config: {
        systemInstruction: activeSystemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'क्षमा करें, मुझे इस समय उत्तर प्राप्त नहीं हो सका। कृपया पुनः प्रयास करें।';
    res.json({ reply, modelUsed: targetModel });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({
      error: error?.message || 'Gemini API call failed',
      reply: 'क्षमा करें, तकनीकी कारण से उत्तर देने में व्यवधान हुआ। कृपया थोड़ी देर बाद पुनः प्रयास करें।',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Temple server running on http://0.0.0.0:${port}`);
  });
}

startServer();
