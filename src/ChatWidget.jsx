import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// The URL of your deployed Cloudflare Worker. 
// Change this to your actual deployed worker URL!
const API_URL = import.meta.env.VITE_LLM_API_URL || "https://devbot-gemini-proxy.devbansal0905.workers.dev";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm DevBot, powered by Gemini 3.1. Ask me anything about Dev Bansal's experience!", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMsg = { text: inputValue, sender: 'user' };
    
    // Gemini API STRICTLY requires the chat history to start with a 'user' message.
    // We must filter out the initial default bot greeting.
    const currentHistory = messages.filter((msg, idx) => !(idx === 0 && msg.sender === 'bot'));
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          history: currentHistory,
          message: userMsg.text
        })
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
      
      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error("LLM Proxy Error:", error);
      setMessages(prev => [...prev, { 
        text: `Error: ${error.message} (Double check your API_URL and Worker!)`, 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="chat-window"
          >
            <div className="chat-header">
              <Bot size={20} /> DevBot (Gemini)
            </div>
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`message ${msg.sender}`}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="message bot"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Loader2 className="animate-spin" size={16} /> Typing...
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
              <input 
                type="text" 
                placeholder="Ask about Dev's experience..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
              />
              <button onClick={handleSend} disabled={isLoading}>
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="chat-button" onClick={() => setIsOpen(!isOpen)} style={{ marginTop: '1rem' }}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
