import {HardHat, HelpCircle, Info, MessageSquare, Send, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import React, {useEffect, useRef, useState} from 'react';
import {BRAND, CONTACT_INFO} from '../data';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

const WELCOME_TEXT = `Hi, welcome to ${BRAND.name}! I'm our virtual assistant. Ask me about our services — solar and backup power, house wiring, fault finding, appliance repairs, electric fencing, automation — or how to get a free quote.`;

const QUICK_QUESTIONS = [
  'Do you install solar systems?',
  'Can you repair my washing machine?',
  'How do I get a free quote?',
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {id: 'welcome', role: 'model', text: WELCOME_TEXT, timestamp: new Date()},
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    const userText = text.trim();
    if (!userText || isLoading) return;

    setInputValue('');
    setMessages((prev) => [
      ...prev,
      {id: `user-${Date.now()}`, role: 'user', text: userText, timestamp: new Date()},
    ]);
    setIsLoading(true);

    try {
      // The local welcome message isn't part of the model's history.
      const history = messages
        .filter((msg) => msg.id !== 'welcome')
        .map((msg) => ({role: msg.role, text: msg.text}));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: userText, history}),
      });

      if (!response.ok) {
        let detail = '';
        try {
          const errData = await response.json();
          detail = errData?.error ? ` (${errData.error})` : '';
        } catch {
          detail = ` (status ${response.status})`;
        }
        throw new Error(detail);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {id: `ai-${Date.now()}`, role: 'model', text: data.text, timestamp: new Date()},
      ]);
    } catch {
      // Never surface a raw error — always give the visitor a way through.
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model',
          text: `Sorry, I hit a network error just now. Please try again shortly, or call/WhatsApp us on ${CONTACT_INFO.phoneFormatted}.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(inputValue);
  };

  return (
    <>
      {/* Floating action button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          id="chat-toggle-button"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer relative group border border-blue-500/30"
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          aria-label="Toggle chat assistant"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <X key="close" className="w-6 h-6" />
            ) : (
              <MessageSquare key="chat" className="w-6 h-6" />
            )}
          </AnimatePresence>
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-[#F4F7FA] text-xs font-mono py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow border border-white/5">
            ASK US ANYTHING
          </span>
        </motion.button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-window-container"
            className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-[400px] max-w-[400px] h-[550px] max-h-[calc(100vh-8rem)] bg-white border border-gray-200/80 shadow-2xl z-50 flex flex-col overflow-hidden"
            initial={{opacity: 0, y: 30, scale: 0.95}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 30, scale: 0.95}}
            transition={{type: 'spring', damping: 25, stiffness: 350}}
          >
            <div
              className="bg-[#0e2a5e] text-[#F4F7FA] p-4 flex items-center justify-between border-b border-white/10"
              id="chat-header"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center border border-blue-500/30">
                  <HardHat className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold tracking-wide">ASSISTANT</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-gray-400 tracking-wider">
                      {BRAND.kicker}
                    </span>
                  </div>
                </div>
              </div>
              <button
                id="chat-close-button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#F4F7FA] border-b border-gray-100 p-2 px-4 flex items-center gap-2 text-gray-500 text-[11px] font-sans">
              <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>Ask about our services, process, or getting a quote.</span>
            </div>

            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
              id="chat-messages-thread"
            >
              {messages.map((msg) => {
                const isAI = msg.role === 'model';
                return (
                  <div key={msg.id} className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
                    <div className="max-w-[85%] flex flex-col">
                      <div
                        className={`rounded px-4 py-3 text-xs sm:text-sm font-sans leading-relaxed ${
                          isAI
                            ? 'bg-white text-gray-800 border border-gray-100 shadow-sm'
                            : 'bg-blue-600 text-white shadow-sm'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>
                      <span
                        className={`text-[9px] font-mono text-gray-400 mt-1 ${
                          isAI ? 'text-left' : 'text-right'
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-white border border-gray-100 rounded px-4 py-3 shadow-sm flex items-center gap-1">
                    <span
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{animationDelay: '0ms'}}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{animationDelay: '150ms'}}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{animationDelay: '300ms'}}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Only while the thread is untouched */}
            {messages.length === 1 && !isLoading && (
              <div className="p-3 bg-white border-t border-gray-100" id="chat-quick-suggestions">
                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-blue-500" />
                  Common Queries
                </p>
                <div className="flex flex-col gap-1.5">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => void sendMessage(q)}
                      className="text-left text-xs font-sans text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 py-2 px-3 border border-gray-200/60 rounded transition-colors duration-200 cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form
              id="chat-input-form"
              onSubmit={handleSubmit}
              className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center"
            >
              <input
                id="chat-message-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                maxLength={1000}
                className="flex-grow bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs sm:text-sm font-sans focus:outline-none focus:border-blue-500 transition-colors"
                disabled={isLoading}
              />
              <button
                id="chat-submit-button"
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-200 disabled:text-gray-400 text-white p-2.5 rounded transition-colors cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
