import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, PhoneCall, Sparkles, Bot, User, ChevronDown } from 'lucide-react';

const QUICK_QUESTIONS = [
  { id: 'call', label: '📞 Call / Connect Support' },
  { id: 'track', label: '🚚 Track Order / Shipping' },
  { id: 'bulk', label: '🎁 Corporate Bulk Gifting' },
  { id: 'bestseller', label: '🍃 Best Seller Products' },
  { id: 'offers', label: '✨ Discount Offers' },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Namaste! 🙏 Welcome to Hapsman Natural Foods & Sweets. How can we assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showQuickOptions: true,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const chatbotWindowRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Click / Touch outside handler to close chat window
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen &&
        chatbotWindowRef.current &&
        !chatbotWindowRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const generateBotReply = (userQuery) => {
    const queryLower = userQuery.toLowerCase();

    if (
      queryLower.includes('call') ||
      queryLower.includes('connect') ||
      queryLower.includes('number') ||
      queryLower.includes('phone') ||
      queryLower.includes('contact') ||
      queryLower.includes('helpline') ||
      queryLower.includes('talk') ||
      queryLower.includes('agent')
    ) {
      return {
        type: 'contact_numbers',
        text: 'You can connect directly with our Hapsman customer support team at any of the following phone numbers:',
        numbers: ['9653129079', '6388239986', '6393919546'],
      };
    }

    if (
      queryLower.includes('track') ||
      queryLower.includes('order') ||
      queryLower.includes('delivery') ||
      queryLower.includes('shipping') ||
      queryLower.includes('status')
    ) {
      return {
        type: 'text',
        text: '🚚 Orders are dispatched within 24 hours of placement! Delivery takes 3 to 5 business days pan-India. Live tracking details are sent via SMS/WhatsApp as soon as your parcel ships.',
      };
    }

    if (
      queryLower.includes('gift') ||
      queryLower.includes('bulk') ||
      queryLower.includes('corporate') ||
      queryLower.includes('diwali') ||
      queryLower.includes('hamper')
    ) {
      return {
        type: 'contact_numbers',
        text: '🎁 We offer gold-embossed luxury rigid gift boxes with custom branding for corporate events & festive gifting. Call our bulk order desk directly at:',
        numbers: ['9653129079', '6388239986', '6393919546'],
      };
    }

    if (
      queryLower.includes('best') ||
      queryLower.includes('makhana') ||
      queryLower.includes('sweet') ||
      queryLower.includes('millet') ||
      queryLower.includes('biscuit') ||
      queryLower.includes('dry fruit') ||
      queryLower.includes('recommend')
    ) {
      return {
        type: 'text',
        text: '🍃 Our top customer favorites include:\n1. Slow-Roasted Peri-Peri Makhana Puffs\n2. Pure Desi Ghee Kaju Katli & Dooda Barfi\n3. Ragi & Beetroot Jowar Millet Snacks\n4. Artisanal Makhana Biscuits\n5. Grade-A Royal Jumbo Cashews & Badam',
      };
    }

    if (
      queryLower.includes('offer') ||
      queryLower.includes('discount') ||
      queryLower.includes('coupon') ||
      queryLower.includes('deal')
    ) {
      return {
        type: 'text',
        text: '✨ Current Hapsman Offers:\n• Use code HAPSMAN10 for 10% OFF on your first order\n• Free Express Shipping on all orders above ₹499\n• Up to 20% OFF on Festive & Corporate Hampers!',
      };
    }

    return {
      type: 'contact_numbers',
      text: 'Thank you for reaching out to Hapsman! For instant help or order assistance, please connect with our team directly at:',
      numbers: ['9653129079', '6388239986', '6393919546'],
    };
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');

    // Simulate bot thinking response
    setTimeout(() => {
      const botResponse = generateBotReply(text);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...botResponse,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 400);
  };

  return (
    <>
      {/* Floating Toggle Icon (Absolute Bottom Right Corner) */}
      <div className="fixed -bottom-3 -right-3 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer focus:outline-none"
            aria-label="Open Hapsman Live Support Chat"
          >
            <img
              src="/images/bot.png"
              alt="Hapsman Bot Icon"
              className="w-32 h-32 sm:w-36 sm:h-36 object-contain drop-shadow-2xl"
            />
            <span className="absolute top-5 right-5 sm:top-6 sm:right-6 w-4.5 h-4.5 bg-amber-400 rounded-full animate-ping" />
            <span className="absolute top-5 right-5 sm:top-6 sm:right-6 w-4.5 h-4.5 bg-amber-400 rounded-full border-2 border-white shadow-md" />
          </button>
        )}
      </div>

      {/* Floating Chatbot Window with Smooth Expand/Collapse Transition */}
      <div
        ref={chatbotWindowRef}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden overscroll-contain transition-all duration-300 ease-out origin-bottom-right transform ${
          isOpen
            ? 'scale-100 opacity-100 translate-y-0 pointer-events-auto shadow-2xl'
            : 'scale-0 opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{ overscrollBehavior: 'contain' }}
      >
        
        {/* Header */}
        <div className="bg-[#0F2C23] text-white p-4 flex items-center justify-between border-b border-amber-400/30">
          <div className="flex items-center space-x-3.5">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-amber-400 p-0.5 flex items-center justify-center shadow-lg overflow-hidden shrink-0">
                <img src="/images/bot.png" alt="Hapsman Assistant" className="w-full h-full object-contain scale-150 drop-shadow-md" />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0F2C23]" />
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <h4 className="font-serif font-bold text-amber-200 text-base sm:text-lg">Hapsman Assistant</h4>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xs text-stone-300 font-medium">Online • Instant Support</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body (Isolated Scroll - Stops Background Scrolling) */}
        <div
          className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAF7F2]/60 text-xs overscroll-contain"
          style={{ overscrollBehavior: 'contain' }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start space-x-2.5 max-w-[85%]">
                {msg.sender === 'bot' && (
                  <div className="w-10 h-10 rounded-full bg-white border border-amber-400/60 flex items-center justify-center shrink-0 mt-0.5 shadow-sm overflow-hidden p-0.5">
                    <img src="/images/bot.png" alt="Bot Avatar" className="w-full h-full object-contain scale-140" />
                  </div>
                )}

                  <div>
                    <div
                      className={`p-3.5 rounded-2xl leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#1B4D3E] text-white rounded-br-none shadow-sm'
                          : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Render Clickable Phone Numbers if type is contact_numbers */}
                      {msg.type === 'contact_numbers' && msg.numbers && (
                        <div className="mt-3 space-y-1.5 pt-2 border-t border-stone-100">
                          {msg.numbers.map((num, i) => (
                            <a
                              key={i}
                              href={`tel:${num}`}
                              className="flex items-center space-x-2 p-2 bg-emerald-50 rounded-xl text-[#1B4D3E] font-bold text-xs hover:bg-emerald-100 transition-colors border border-emerald-800/15"
                            >
                              <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                              <span>📞 +91 {num}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className="text-[9px] text-stone-400 mt-1 block px-1">
                      {msg.timestamp}
                    </span>

                    {/* Quick Options Chips */}
                    {msg.showQuickOptions && (
                      <div className="mt-3 space-y-1.5">
                        <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                          Select a quick option:
                        </p>
                        <div className="flex flex-col space-y-1.5">
                          {QUICK_QUESTIONS.map((q) => (
                            <button
                              key={q.id}
                              onClick={() => handleSend(q.label)}
                              className="text-left px-3 py-2 bg-white text-[#1B4D3E] font-bold text-[11px] rounded-xl border border-emerald-800/20 hover:bg-[#1B4D3E] hover:text-white transition-all shadow-xs active:scale-98 cursor-pointer"
                            >
                              {q.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Persistent Suggestion Question Chips (Always Visible at Bottom) */}
          <div
            className="bg-stone-50 border-t border-stone-200/80 py-2 px-3 overflow-x-auto scrollbar-none flex space-x-2 shrink-0 overscroll-contain"
            style={{ overscrollBehavior: 'contain' }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q.id}
                onClick={() => handleSend(q.label)}
                className="shrink-0 px-3 py-1.5 bg-white text-[#1B4D3E] font-extrabold text-[10.5px] rounded-full border border-emerald-800/20 hover:bg-[#1B4D3E] hover:text-white transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-stone-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type 'call' or ask a question..."
                className="flex-1 px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E] focus:bg-white"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 bg-[#1B4D3E] text-amber-200 rounded-xl hover:bg-[#0F2C23] disabled:opacity-40 transition-colors shrink-0 cursor-pointer shadow-xs"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
    </>
  );
}
