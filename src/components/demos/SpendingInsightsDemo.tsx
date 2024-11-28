import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Coffee, UtensilsCrossed } from 'lucide-react';

const demoData = {
  conversation: [
    {
      type: 'user',
      text: "How much did I spend on dining this month?"
    },
    {
      type: 'bot',
      text: "You've spent ₹4,500 on dining this month. Here's the breakdown:",
      chartData: [
        { name: 'Zomato', value: 2200, color: '#FF4B4B' },
        { name: 'Swiggy', value: 1500, color: '#FF8C00' },
        { name: 'Restaurants', value: 800, color: '#4CAF50' }
      ],
      followUp: "I noticed you ordered from Zomato twice for dinner this week. You could save around ₹800 by cooking at home on weekdays - that's enough for a weekend brunch at your favorite café! Want some quick dinner recipes that take less time than waiting for delivery? 👩‍🍳"
    }
  ]
};

export const SpendingInsightsDemo = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {demoData.conversation.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <p className="whitespace-pre-line">{message.text}</p>
              {message.chartData && (
                <div className="mt-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={message.chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {message.chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {message.chartData.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span>{entry.name}</span>
                        </div>
                        <span>₹{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {message.followUp && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-gray-800">
                  {message.followUp}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          Show me recipes
          <UtensilsCrossed className="h-4 w-4" />
        </button>
        <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          Set dining budget
          <Coffee className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};