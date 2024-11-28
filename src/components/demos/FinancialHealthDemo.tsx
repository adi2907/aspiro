import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import { Target, TrendingUp, CreditCard } from 'lucide-react';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

export const FinancialHealthDemo = () => {
  const [showUserPrompt, setShowUserPrompt] = useState(false);
  const [showBotResponse, setShowBotResponse] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const scoreData = [
    { name: 'Overall', value: 78, fill: '#4F46E5' },
    { name: 'Savings', value: 90, fill: '#22C55E' },
    { name: 'Spending', value: 60, fill: '#EF4444' },
    { name: 'Debt', value: 70, fill: '#F59E0B' }
  ];

  useEffect(() => {
    // Show user prompt after 1 second
    setTimeout(() => setShowUserPrompt(true), 1000);
    
    // Show bot response after 2.5 seconds
    setTimeout(() => setShowBotResponse(true), 2500);
    
    // Show score visualization after 3.5 seconds
    setTimeout(() => setShowScore(true), 3500);
  }, []);

  return (
    <div className="space-y-4">
      {showUserPrompt && (
        <div className="flex justify-end animate-fade-in">
          <div className="max-w-[80%] rounded-lg p-4 bg-blue-500 text-white">
            What's my financial health score?
          </div>
        </div>
      )}

      {showBotResponse && (
        <div className="flex justify-start animate-fade-in">
          <div className="max-w-[80%] rounded-lg p-4 bg-gray-100">
            Your score is 78/100. Let me break that down for you...
          </div>
        </div>
      )}

      {showScore && (
        <div className="animate-fade-in">
          <Card className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="30%"
                  outerRadius="100%"
                  data={scoreData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    minAngle={15}
                    background
                    clockWise={true}
                    dataKey="value"
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-4">
              {scoreData.map((score, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    {index === 1 && <TrendingUp className="h-5 w-5" style={{ color: score.fill }} />}
                    {index === 2 && <Target className="h-5 w-5" style={{ color: score.fill }} />}
                    {index === 3 && <CreditCard className="h-5 w-5" style={{ color: score.fill }} />}
                    <span className="font-medium">{score.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${score.value}%`,
                          backgroundColor: score.fill
                        }}
                      />
                    </div>
                    <span className="w-8 text-right">{score.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                You're doing great with savings! Want to set some monthly spending caps to boost your score further?
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};