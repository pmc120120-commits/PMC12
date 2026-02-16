
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import { Message } from '../types';
import { getTutorResponse } from '../services/geminiService';

interface AIChatProps {
  initialSubject?: string;
}

const AIChat: React.FC<AIChatProps> = ({ initialSubject }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: initialSubject 
        ? `Bonjour ! Prêt à approfondir tes connaissances en **${initialSubject}** ? Pose-moi tes questions sur ce cours.`
        : "Bonjour ! Je suis ton tuteur PMC12. Sur quoi souhaites-tu travailler aujourd'hui ? Je peux t'aider sur tout ton programme académique.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const response = await getTutorResponse(history, input);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response || "Désolé, j'ai rencontré une erreur. Peux-tu reformuler ?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <header className="bg-slate-900 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold">Tuteur Personnel PMC12</h3>
            <p className="text-xs text-slate-400">{initialSubject ? `Spécialiste: ${initialSubject}` : 'En ligne • Propulsé par Gemini'}</p>
          </div>
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50"
      >
        {messages.map((m) => (
          <div 
            key={m.id}
            className={`flex items-start gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${m.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-slate-800 text-white'}`}>
              {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
            }`}>
              <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</div>
              <p className={`text-[10px] mt-2 ${m.role === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4 animate-pulse">
            <div className="p-2 rounded-xl bg-slate-800 text-white">
              <Bot size={20} />
            </div>
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <Loader2 className="animate-spin text-blue-600" size={16} />
              <span className="text-sm text-slate-500">L'IA réfléchit...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pose une question sur tes cours..."
            className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
