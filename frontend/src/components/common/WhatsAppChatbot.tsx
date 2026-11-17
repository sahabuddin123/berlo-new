import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaWhatsapp, FaTimes, FaPaperPlane, FaCheckCircle, FaChevronDown } from 'react-icons/fa';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const WhatsAppChatbot: React.FC = () => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const whatsappNumber = '8801711268479'; // Berlo Official Advisory Hotline

  const initialBotMessage: Message = {
    id: 'welcome',
    sender: 'bot',
    text:
      lang === 'bn'
        ? 'আসসালামু আলাইকুম! বার্লো কমিউনিকেশন্সে আপনাকে স্বাগতম। আপনার প্রতিষ্ঠানের কৌশলগত জনসংযোগ, মিডিয়া কাভারেজ বা ক্রাইসিস ব্যবস্থাপনায় আমরা কীভাবে সহায়তা করতে পারি?'
        : 'Hello! Welcome to Berlo Communications Ltd. How can our strategic PR & executive advisory desk assist your organization today?',
    time: lang === 'bn' ? 'এইমাত্র' : 'Just now',
  };

  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);

  const quickPrompts = [
    {
      id: 'pr-consultation',
      label: lang === 'bn' ? '📅 পরামর্শ সেশন বুকিং' : '📅 Book PR Consultation',
      text:
        lang === 'bn'
          ? 'আমি বার্লোর সাথে একটি কৌশলগত জনসংযোগ পরামর্শ সেশন বুক করতে আগ্রহী।'
          : 'I would like to book an executive PR consultation session with Berlo.',
    },
    {
      id: 'crisis-support',
      label: lang === 'bn' ? '🚨 জরুরি ক্রাইসিস সাপোর্ট' : '🚨 Emergency Crisis Support',
      text:
        lang === 'bn'
          ? 'আমাদের প্রতিষ্ঠানে একটি জরুরি ক্রাইসিস পরিস্থিতি তৈরি হয়েছে, তাৎক্ষণিক সহায়তা প্রয়োজন।'
          : 'We require immediate 24/7 crisis communication and reputation advisory support.',
    },
    {
      id: 'media-coverage',
      label: lang === 'bn' ? '📰 মিডিয়া কাভারেজ ও প্রেস' : '📰 Media Relations & Press',
      text:
        lang === 'bn'
          ? 'আমাদের আসন্ন প্রেস কনফারেন্স এবং জাতীয় গণমাধ্যম কাভারেজ সম্পর্কিত আলোচনা করতে চাই।'
          : 'We would like to discuss nationwide press release distribution and media coverage.',
    },
    {
      id: 'events-activations',
      label: lang === 'bn' ? '🎪 কর্পোরেট ইভেন্ট ও এক্সপো' : '🎪 Corporate Event & Expo PR',
      text:
        lang === 'bn'
          ? 'আমরা একটি জাতীয় কর্পোরেট ইভেন্ট / বাণিজ্য মেলা প্যাভিলিয়ন পিআর পরিচালনা করতে চাই।'
          : 'We are planning a high-profile corporate summit / trade expo pavilion PR campaign.',
    },
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot immediate response before launching WhatsApp
    setTimeout(() => {
      setIsTyping(false);
      const botReply: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text:
          lang === 'bn'
            ? 'ধন্যবাদ! আমাদের সিনিয়র পিআর স্ট্র্যাটেজিস্টের সাথে সরাসরি সংযোগ স্থাপনের জন্য আপনাকে অফিসিয়াল হোয়াটসঅ্যাপ চ্যাটে নিয়ে যাওয়া হচ্ছে...'
            : 'Connecting you with our senior PR advisory desk on WhatsApp for direct real-time communication...',
        time: currentTime,
      };
      setMessages((prev) => [...prev, botReply]);

      // Open WhatsApp in clean new window
      const encoded = encodeURIComponent(text);
      const waUrl = `https://wa.me/${whatsappNumber}?text=${encoded}`;
      setTimeout(() => {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }, 700);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 select-none">
      {/* ========================================================================= */}
      {/* 01. CHATBOT WINDOW (POPOVER)                                              */}
      {/* ========================================================================= */}
      {isOpen && (
        <div className="relative mb-4 w-[330px] sm:w-[380px] max-w-[calc(100vw-32px)] bg-white dark:bg-[#12151D] border border-slate-200 dark:border-[#222838] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 transition-all">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1A305A] via-[#11813C] to-[#25D366] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                  <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-white ring-1 ring-emerald-400" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold tracking-tight text-white">
                    Berlo Communications
                  </h3>
                  <FaCheckCircle className="w-3.5 h-3.5 text-[#25D366]" title="Verified Official Account" />
                </div>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  {lang === 'bn' ? 'অনলাইন | তাৎক্ষণিক পরামর্শ ডেস্ক' : 'Online | Executive Advisory Desk'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/15 rounded-md transition-colors"
                aria-label="Close WhatsApp chat"
              >
                <FaChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/15 rounded-md transition-colors"
                aria-label="Close chat"
              >
                <FaTimes className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Subheader info note */}
          <div className="bg-slate-100 dark:bg-[#181D28] px-4 py-2 border-b border-slate-200 dark:border-white/5 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
            <span>{lang === 'bn' ? 'গোপনীয়তা নিশ্চিত — এনডিএ সুরক্ষিত' : 'Confidential — Governed by NDA'}</span>
            <span className="text-[#11813C] dark:text-[#22C55E] font-semibold">
              {lang === 'bn' ? 'গড় রেসপন্স: < ১৫ মিনিট' : 'Avg reply: < 15 mins'}
            </span>
          </div>

          {/* Chat Messages Body */}
          <div className="p-4 h-[300px] overflow-y-auto space-y-3 bg-[#F8FAFC] dark:bg-[#0B0D13]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#11813C] text-white rounded-l-xl rounded-tr-xl'
                      : 'bg-white dark:bg-[#191F2C] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-r-xl rounded-tl-xl'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[9.5px] mt-1 text-right ${
                      msg.sender === 'user'
                        ? 'text-emerald-100'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 bg-white dark:bg-[#191F2C] border border-slate-200 dark:border-white/10 rounded-r-xl rounded-tl-xl w-16">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Pills (Chatbot interactive prompts) */}
          <div className="p-3 bg-white dark:bg-[#12151D] border-t border-slate-200 dark:border-white/5 space-y-1.5">
            <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              {lang === 'bn' ? 'দ্রুত পরামর্শ বিষয়সমূহ:' : 'Quick Consultation Topics:'}
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-[88px] overflow-y-auto">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => handleSendMessage(prompt.text)}
                  className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-[#1A202C] hover:bg-[#11813C] hover:text-white dark:hover:bg-[#11813C] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 rounded-full transition-all text-left"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-50 dark:bg-[#0E1118] border-t border-slate-200 dark:border-white/10 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              maxLength={500}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={lang === 'bn' ? 'আপনার বার্তা লিখুন...' : 'Type your message...'}
              className="flex-1 px-3.5 py-2.5 bg-white dark:bg-[#181E2B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#25D366] rounded-full"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20BA5A] disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-md"
              aria-label="Send message to WhatsApp"
            >
              <FaPaperPlane className="w-3.5 h-3.5 translate-x-px" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 02. FLOATING TRIGGER BUTTON                                               */}
      {/* ========================================================================= */}
      <div className="relative group">
        {/* Tooltip on hover (when closed) */}
        {!isOpen && (
          <div className="hidden sm:block absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-slate-900 dark:bg-[#161B26] text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
            <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে সরাসরি পরামর্শ' : 'Chat with Advisory Desk'}</span>
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 dark:bg-[#161B26] rotate-45 border-t border-r border-white/10" />
          </div>
        )}

        {/* Ambient Ring Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

        {/* Main Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-2xl shadow-emerald-950/50 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
          aria-label="Open WhatsApp live advisory chatbot"
        >
          {isOpen ? (
            <FaTimes className="w-6 h-6 text-white" />
          ) : (
            <FaWhatsapp className="w-8 h-8 text-white filter drop-shadow-md" />
          )}

          {/* Unread Message Notification Badge */}
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#A302FF] text-white text-[10px] font-black rounded-full border-2 border-white dark:border-[#12151D] flex items-center justify-center shadow-md animate-bounce">
              1
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
