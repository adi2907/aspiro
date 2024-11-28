// src/components/demos/PeerComparisonDemo.tsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, Target, Users } from 'lucide-react';

const savingsData = [
  { name: 'Top 10%', amount: 12000, color: '#FFD700' },
  { name: 'You', amount: 10000, color: '#4CAF50' },
  { name: 'Peer Average', amount: 8000, color: '#90CAF9' }
];

const leaderboardData = [
  { rank: 1, name: 'Finance Wizard', savings: 14000, percentile: "Top 1%" },
  { rank: 2, name: 'Money Master', savings: 12500, percentile: "Top 5%" },
  { rank: 3, name: 'You', savings: 10000, percentile: "Top 25%", isUser: true },
  { rank: 4, name: 'Budget Pro', savings: 9000, percentile: "Top 30%" },
  { rank: 5, name: 'Savings Rookie', savings: 8000, percentile: "Top 40%" }
];

interface Message {
  type: 'bot' | 'user';
  text: string;
  showChart?: boolean;
  showLeaderboard?: boolean;
  showChallenge?: boolean;
}

export const PeerComparisonDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'user',
      text: "How do I compare to others like me?"
    }
  ]);

  useEffect(() => {
    // Add bot response after initial render
    const timer1 = setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: "You're in the top 25% of savers in your age group, with ₹10,000 saved this month! Most peers save ₹8,000. Let's look at how you stack up:",
        showChart: true,
        showLeaderboard: true
      }]);

      // Add challenge message after showing stats
      const timer2 = setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Want to aim for the top 10% next month? That's just ₹2,000 more in savings! 🎯",
          showChallenge: true
        }]);
      }, 2000);

      return () => clearTimeout(timer2);
    }, 1000);

    return () => clearTimeout(timer1);
  }, []);

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
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Savings Comparison</span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={savingsData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" prefix="₹" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip 
                        formatter={(value) => `₹${value.toLocaleString()}`}
                        cursor={{ fill: 'transparent' }}
                      />
                      <Bar 
                        dataKey="amount" 
                        radius={[0, 4, 4, 0]}
                      >
                        {savingsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {message.showLeaderboard && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">Savings Leaderboard</span>
                </div>
                <div className="space-y-3">
                  {leaderboardData.map((entry, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        entry.isUser ? 'bg-blue-50 border border-blue-100' : 'bg-white border border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full ${
                          index < 3 ? 'bg-yellow-500 text-white' : 'bg-gray-200'
                        }`}>
                          {entry.rank}
                        </div>
                        <div>
                          <p className="font-medium">{entry.name}</p>
                          <p className="text-sm text-gray-500">{entry.percentile}</p>
                        </div>
                      </div>
                      <p className="font-medium">₹{entry.savings.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {message.showChallenge && (
              <div className="mt-4">
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                  <Target className="h-5 w-5" />
                  Accept Top 10% Challenge
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};