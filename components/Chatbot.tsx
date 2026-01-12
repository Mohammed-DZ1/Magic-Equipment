
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatIcon, CloseIcon, SendIcon } from './icons';
import { Language } from '../types';

interface ChatbotProps {
  t: {
    title: string;
    welcome: string;
    placeholder: string;
    aria_open: string;
    aria_close: string;
  };
  currentService: 'equipment' | 'realEstate' | 'hydraulics';
  language: Language;
}

const Chatbot: React.FC<ChatbotProps> = ({ t, currentService, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    const typingIndicator: Message = { id: 'typing', text: '...', sender: 'bot', isTyping: true };
    
    setMessages(prev => [...prev, userMessage, typingIndicator]);
    const currentInput = input;
    setInput('');

    const botResponseText = await sendMessageToGemini(currentInput, currentService, language);
    
    // Calculate a realistic typing delay based on response length
    const words = botResponseText.split(/\s+/).length;
    // A base delay plus time per word. Capped to avoid long waits.
    const typingDelay = Math.min(500 + words * 80, 4000);

    setTimeout(() => {
        const botMessage: Message = { id: (Date.now() + 1).toString(), text: botResponseText, sender: 'bot' };

        setMessages(prev => {
            const newMessages = prev.filter(msg => !msg.isTyping);
            return [...newMessages, botMessage];
        });
    }, typingDelay);

  }, [input, currentService, language]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    // Shift+Enter allows line break (default behavior)
  };

  return (
    <>
      <div className={`fixed bottom-4 sm:bottom-5 right-4 sm:right-5 z-50 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-b from-gray-500 to-gray-700 text-white rounded-full p-3 sm:p-4 shadow-xl shadow-black/50 ring-1 ring-gray-400/50 hover:shadow-2xl transition-all duration-300"
          aria-label={t.aria_open}
        >
          <ChatIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      <div className={`fixed bottom-4 sm:bottom-5 right-4 sm:right-5 z-50 w-[calc(100%-2rem)] sm:w-[calc(100%-2.5rem)] max-w-md h-[80vh] sm:h-[70vh] max-h-[600px] flex flex-col bg-zinc-900 rounded-2xl shadow-2xl shadow-black/30 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <header className="flex items-center justify-between p-3 sm:p-4 border-b border-zinc-700">
          <h3 className="text-base sm:text-lg font-bold text-white">{t.title}</h3>
          <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white" aria-label={t.aria_close}>
            <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-2 sm:p-3 rounded-2xl text-sm sm:text-base ${msg.sender === 'user' ? 'bg-gray-600 text-white rounded-br-none' : 'bg-zinc-700 text-zinc-200 rounded-bl-none'}`}>
                {msg.isTyping ? (
                  <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse"></span>
                  </div>
                ) : (
                  <p className="break-words whitespace-pre-wrap" style={{ direction: 'auto', textAlign: 'auto' }}>{msg.text}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="p-3 sm:p-4 border-t border-zinc-700 flex items-end gap-2 sm:gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.placeholder}
            rows={1}
            style={{ maxHeight: '100px', overflowY: 'auto' }}
            className="flex-1 bg-zinc-800 text-white rounded-xl py-2 px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
          />
          <button onClick={handleSendMessage} className="bg-gradient-to-b from-gray-500 to-gray-700 text-white p-2 rounded-full hover:shadow-lg shadow-lg shadow-black/40 ring-1 ring-gray-400/50 transition-all duration-300 disabled:bg-zinc-600 disabled:from-zinc-600 disabled:to-zinc-700 flex-shrink-0" disabled={!input.trim()}>
            <SendIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;