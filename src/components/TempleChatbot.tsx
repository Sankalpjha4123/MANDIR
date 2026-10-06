import React, { useState, useEffect, useRef } from 'react';
import { TEMPLE_INFO } from '../data/templeData';
import { playTempleBell } from '../utils/audioEngine';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

interface TempleChatbotProps {
  lang: 'hi' | 'en';
}

export const TempleChatbot: React.FC<TempleChatbotProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Model & Persona configurations
  const [selectedModel, setSelectedModel] = useState<'gemini-3.5-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview'>('gemini-3.5-flash');
  const [rolePreset, setRolePreset] = useState<'general' | 'priest' | 'manager' | 'guide'>('general');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content:
        lang === 'hi'
          ? '॥ ॐ नमो भगवते वासुदेवाय ॥\nसादर प्रणाम! मैं "देववाणी" - श्री १००८ नवचेतना शिव शक्ति मंदिर का पावन AI सहायक हूँ। दर्शन, आरती समय, विशेष पूजा संकल्प, उत्सव अथवा दान के विषय में आप मुझसे कुछ भी पूछ सकते हैं। मैं आपकी क्या सेवा करूँ?'
          : '॥ Om Namo Bhagavate Vasudevaya ॥\nWelcome! I am "Devavani", the sacred AI assistant for Shri 1008 Nav Chetna Shiv Shakti Mandir. How may I assist you with darshan timings, rituals, aarti schedules, or seva bookings today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.5-flash',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat thread
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  const quickQuestions = lang === 'hi'
    ? [
        'दैनिक दर्शन एवं आरती का समय क्या है?',
        'दुर्गा पूजा एवं आगामी उत्सवों का विवरण दें',
        'अन्नक्षेत्र व गौशाला में दान कैसे करें?',
        'रुद्राभिषेक या विशेष पूजा की विधि क्या है?',
        'मंदिर तक पहुँचने का सबसे निकटतम मार्ग क्या है?',
      ]
    : [
        'What are the daily darshan & aarti timings?',
        'Tell me about upcoming festivals & Durga Puja',
        'How can I donate for Annakshetra & Gaushala?',
        'What is the procedure for special Rudrabhishek?',
        'How do I reach the mandir from Delhi metro?',
      ];

  const handleSendMessage = async (userTextToSend?: string) => {
    const text = (userTextToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          model: selectedModel,
          rolePreset: rolePreset,
        }),
      });

      const data = await response.json();

      const botReplyText = data.reply || (lang === 'hi' ? 'क्षमा करें, उत्तर प्राप्त नहीं हो सका।' : 'Sorry, could not get a response.');

      const modelMessage: ChatMessage = {
        id: 'model-' + Date.now(),
        role: 'model',
        content: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || selectedModel,
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'model',
        content:
          lang === 'hi'
            ? 'तकनीकी कारणवश उत्तर देने में त्रुटि हुई। कृपया थोड़ी देर बाद पुनः प्रयास करें या मंदिर हेल्पलाइन +91 8470092721 पर संपर्क करें।'
            : 'Error connecting to Gemini API. Please try again shortly or contact mandir helpline at +91 8470092721.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    playTempleBell();
    setMessages([
      {
        id: 'reset-' + Date.now(),
        role: 'model',
        content:
          lang === 'hi'
            ? 'बातचीत पुनः आरंभ की गई है। कृपया अपना नया प्रश्न या जिज्ञासा पूछें।'
            : 'Conversation history reset. Please ask your question.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button on Bottom Right */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
            playTempleBell();
          }}
          className="fixed bottom-24 right-6 z-40 flex items-center gap-2.5 bg-gradient-to-r from-[#9d2f00] to-[#c63f02] text-white px-4 py-3 rounded-full shadow-[0_4px_24px_rgba(157,47,0,0.4)] hover:shadow-[0_8px_32px_rgba(157,47,0,0.6)] hover:scale-105 transition-all group print:hidden border border-[#ffdea3]/40"
          aria-label="Open Devavani AI Chatbot"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[24px] text-[#ffdea3]">forum</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-300 rounded-full animate-ping" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif-devanagari text-xs font-bold leading-tight text-[#ffdea3]">
              {lang === 'hi' ? 'देववाणी AI' : 'Devavani AI'}
            </span>
            <span className="text-[10px] text-white/90">
              {lang === 'hi' ? 'मंदिर सहायक' : 'Temple Guide'}
            </span>
          </div>
        </button>
      )}

      {/* Chat Window Modal / Dock */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 print:hidden ${
            isMinimized
              ? 'bottom-6 right-6 w-80'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[420px] max-w-[440px] h-[82vh] max-h-[640px]'
          }`}
        >
          <div className="w-full h-full bg-[#fff8f6] rounded-3xl shadow-[0_12px_48px_rgba(42,23,15,0.28)] border-2 border-[#b58a2a] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#9d2f00] to-[#c63f02] text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-[#ffe9e2]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-[#ffdea3]/40 text-[#ffdea3] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">temple_hindu</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif-devanagari text-sm font-bold leading-tight text-[#ffdea3]">
                      {lang === 'hi' ? 'देववाणी AI • मंदिर सहायक' : 'Devavani AI • Mandir Guide'}
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-white/80">
                    {TEMPLE_INFO.nameHi} • Powered by Gemini
                  </p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1 text-white/80">
                <button
                  type="button"
                  onClick={handleClearChat}
                  title={lang === 'hi' ? 'बातचीत साफ करें' : 'Clear Chat'}
                  className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? 'Expand' : 'Minimize'}
                  className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isMinimized ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Chat Body (When Not Minimized) */}
            {!isMinimized && (
              <>
                {/* Configuration Bar: Persona & Model Selection */}
                <div className="bg-[#fff1ec] px-3 py-2 border-b border-[#ffe9e2] flex items-center justify-between text-xs gap-2">
                  {/* Persona Selector */}
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#705100]">psychology</span>
                    <select
                      value={rolePreset}
                      onChange={(e) => setRolePreset(e.target.value as any)}
                      className="bg-white border border-[#ffe9e2] rounded-lg text-[11px] font-semibold text-[#2a170f] px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#9d2f00]"
                    >
                      <option value="general">{lang === 'hi' ? 'सामान्य सहायक' : 'General Guide'}</option>
                      <option value="priest">{lang === 'hi' ? 'मुख्य आचार्य (पूजा विधि)' : 'Head Priest (Rituals)'}</option>
                      <option value="manager">{lang === 'hi' ? 'ट्रस्ट प्रबंधक (पास/दान)' : 'Manager (Pass/Seva)'}</option>
                      <option value="guide">{lang === 'hi' ? 'तीर्थ मार्गदर्शक' : 'Pilgrim Guide'}</option>
                    </select>
                  </div>

                  {/* Model Selector */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[#8e7167] uppercase font-bold">मॉडल:</span>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value as any)}
                      className="bg-white border border-[#ffe9e2] rounded-lg text-[10px] font-semibold text-[#9d2f00] px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#9d2f00]"
                    >
                      <option value="gemini-3.5-flash">Gemini 3.5 Flash (सामान्य)</option>
                      <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash Lite (तेज़)</option>
                      <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (गहन)</option>
                    </select>
                  </div>
                </div>

                {/* Scrollable Message Thread */}
                <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 text-xs sm:text-sm bg-[#fff8f6]">
                  {messages.map((msg) => {
                    const isUser = msg.role === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isUser && (
                          <div className="w-7 h-7 rounded-full bg-[#ffe9e2] border border-[#b58a2a]/40 text-[#9d2f00] flex items-center justify-center shrink-0 text-xs font-bold shadow-sm mt-0.5">
                            ॐ
                          </div>
                        )}

                        <div className={`max-w-[82%] sm:max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                          <div
                            className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                              isUser
                                ? 'bg-[#9d2f00] text-white rounded-br-xs shadow-md'
                                : 'bg-white text-[#2a170f] rounded-bl-xs border border-[#ffe9e2] shadow-sm'
                            }`}
                          >
                            {msg.content}
                          </div>

                          <div className="flex items-center gap-1.5 mt-1 px-1 text-[10px] text-[#8e7167]">
                            <span>{msg.timestamp}</span>
                            {!isUser && msg.modelUsed && (
                              <span>• {msg.modelUsed.replace('gemini-', '')}</span>
                            )}
                          </div>
                        </div>

                        {isUser && (
                          <div className="w-7 h-7 rounded-full bg-[#ffdbd0] text-[#9d2f00] flex items-center justify-center shrink-0 mt-0.5">
                            <span className="material-symbols-outlined text-[16px]">person</span>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-xs text-[#705100] bg-white p-2.5 rounded-xl border border-[#ffe9e2] w-fit shadow-sm">
                      <div className="w-4 h-4 rounded-full border-2 border-[#9d2f00] border-t-transparent animate-spin" />
                      <span>{lang === 'hi' ? 'देववाणी चिंतन कर रही है...' : 'Devavani is contemplating...'}</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Inquiries Carousel */}
                <div className="bg-[#fff1ec] px-3 py-2 border-t border-[#ffe9e2] overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-[#705100] uppercase shrink-0">
                    {lang === 'hi' ? 'सुझाव:' : 'Quick:'}
                  </span>
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(q)}
                      className="px-2.5 py-1 bg-white hover:bg-[#ffe9e2] text-[#9d2f00] text-[11px] rounded-full border border-[#ffe9e2] shrink-0 transition-colors font-medium"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Input Bar */}
                <div className="p-3 bg-white border-t border-[#ffe9e2]">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={
                        lang === 'hi'
                          ? 'पूजा, दर्शन या दान संबंधी प्रश्न पूछें...'
                          : 'Ask about puja, darshan, timings or seva...'
                      }
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#ffe9e2] text-xs sm:text-sm bg-[#fff8f6] focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                    />

                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="w-10 h-10 rounded-xl bg-[#9d2f00] hover:bg-[#c63f02] disabled:opacity-40 text-white flex items-center justify-center transition-all shadow shrink-0"
                      title={lang === 'hi' ? 'संदेश भेजें' : 'Send'}
                    >
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </button>
                  </form>
                  <p className="text-[9px] text-[#8e7167] text-center mt-1.5">
                    {lang === 'hi'
                      ? 'AI द्वारा जनित जानकारी। विशेष पूजन हेतु मंदिर कार्यालय +91 8470092721 पर पुष्टि करें।'
                      : 'AI generated information. For special pujas, please verify with mandir office.'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
