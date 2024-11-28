// src/components/demos/RoastDemo.tsx
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Coffee, Send } from 'lucide-react';

const spendingData = [
  { name: 'Coffee', value: 8000, color: '#8B4513' },
  { name: 'Dining Out', value: 15000, color: '#FF8C00' },
  { name: 'Entertainment', value: 10000, color: '#4CAF50' },
  { name: 'Shopping', value: 7000, color: '#2196F3' }
];

interface Message {
  type: 'bot' | 'user';
  text: string;
  showChart?: boolean;
  showAction?: boolean;
}

export const RoastDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      text: "Whoa, ₹8,000 on coffee this month? Did you buy the entire Starbucks? ☕",
      showChart: true
    }
  ]);
  const [showResponseButton, setShowResponseButton] = useState(false);
  const [responded, setResponded] = useState(false);

  useEffect(() => {
    // Show the response button after 2 seconds
    const timer = setTimeout(() => {
      setShowResponseButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleUserResponse = () => {
    setShowResponseButton(false);
    setResponded(true);

    const newMessages: Message[] = [
      ...messages,
      {
        type: 'user',
        text: "haha, yes sorry i shot overboard"
      }
    ];
    
    setMessages(newMessages);
    
    // Add bot response after a delay
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          type: 'bot',
          text: "How about we set a ₹5,000 cap for next month's coffee spend? That still gets you your daily caffeine fix, but leaves more for your savings! ✨",
          showAction: true
        }
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-4 ${
              message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            <p className="whitespace-pre-line">{message.text}</p>
            
            {message.showChart && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Discretionary Expenses Breakdown</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={spendingData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {spendingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => `₹${value.toLocaleString()}`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {spendingData.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-gray-700">{entry.name}</span>
                      </div>
                      <span className="text-gray-700">₹{entry.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {message.showAction && (
              <div className="mt-4">
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                  <Coffee className="h-4 w-4" />
                  Set ₹5,000 Coffee Budget
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {showResponseButton && !responded && (
        <div className="flex justify-end opacity-0 animate-fade-in">
          <button
            onClick={handleUserResponse}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            "haha, yes sorry i shot overboard"
            <Send className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};