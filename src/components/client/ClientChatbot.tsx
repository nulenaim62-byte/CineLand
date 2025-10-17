import React, { useState } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ClientChatbotProps {
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

export function ClientChatbot({ onClose }: ClientChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '¡Hola! Soy el asistente virtual de Movieland. ¿En qué puedo ayudarte?', isBot: true },
  ]);
  const [input, setInput] = useState('');

  const quickReplies = [
    '¿Qué películas están en cartelera?',
    '¿Cuáles son los horarios?',
    '¿Cómo compro entradas?',
    'Precios de entradas',
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: 'Gracias por tu pregunta. Para obtener información detallada, por favor selecciona una de las opciones rápidas o navega por nuestro sitio web.',
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-slate-900 rounded-none sm:rounded-lg w-full h-full sm:h-[600px] sm:max-w-2xl flex flex-col border-0 sm:border border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-white">Asistente Virtual</h3>
              <p className="text-sm text-slate-400">En línea</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isBot
                    ? 'bg-slate-800 text-slate-200'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Replies */}
        <div className="p-4 border-t border-slate-800">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="text-sm px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors text-left"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-slate-800 border-slate-700 text-white"
            />
            <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
