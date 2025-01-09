import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Wallet, Target, ArrowRight, CheckCircle2 } from 'lucide-react';

const PERSONALITY_TYPES = [
  { id: 'budget-boss', label: 'Budget Boss 📊', description: 'Detailed planner, loves control' },
  { id: 'yolo', label: 'YOLO Spender 🎉', description: 'Lives in the moment' },
  { id: 'balanced', label: 'Somewhere in Between ⚖️', description: 'Balanced approach' }
];

const SAVING_STYLES = [
  { id: 'safety', label: 'Safety Net Saver 🛡️', description: 'Focus on emergency funds' },
  { id: 'dreamer', label: 'Dream Chaser ✈️', description: 'Saving for experiences' },
  { id: 'investor', label: 'Investment Enthusiast 📈', description: 'Growth focused' }
];

export const BudgetPersonalityDemo = () => {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({
    personality: '',
    savingStyle: '',
    income: '',
    savingsGoal: ''
  });

  const [showBudget, setShowBudget] = useState(false);

  const handleSelection = (type: string, value: string) => {
    setSelections(prev => ({ ...prev, [type]: value }));
    if (type === 'personality') setTimeout(() => setStep(1), 1500);
    if (type === 'savingStyle') setTimeout(() => setStep(2), 1500);
    if (type === 'income') setTimeout(() => setStep(3), 1500);
    if (type === 'savingsGoal') {
      setTimeout(() => {
        setStep(4);
        setShowBudget(true);
      }, 500);
    }
  };

  const budgetData = [
    { name: 'Needs', value: 27500, color: '#4CAF50' },
    { name: 'Wants', value: 19500, color: '#2196F3' },
    { name: 'Savings', value: 8000, color: '#FFC107' }
  ];

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-4 bg-gray-100">
                <p>Hey there! Let's get started—no spreadsheets, no setup hassles. Just answer a few fun questions, and I'll create your smart budget and savings goals. Ready?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-lg p-4 bg-blue-500 text-white">
                <p>Sure, sounds easy!</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="font-medium">Which best describes your spending style?</p>
              {PERSONALITY_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => handleSelection('personality', type.id)}
                  className="w-full p-4 bg-white border rounded-lg hover:bg-gray-50 text-left"
                >
                  <p className="font-medium">{type.label}</p>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-3">
            <p className="font-medium">What's your vibe when it comes to saving?</p>
            {SAVING_STYLES.map(style => (
              <button
                key={style.id}
                onClick={() => handleSelection('savingStyle', style.id)}
                className="w-full p-4 bg-white border rounded-lg hover:bg-gray-50 text-left"
              >
                <p className="font-medium">{style.label}</p>
                <p className="text-sm text-gray-500">{style.description}</p>
              </button>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <p className="font-medium">What's your monthly take-home income? Don't worry this stays between us</p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Enter amount"
                className="flex-1 p-2 border rounded-lg"
                onChange={(e) => handleSelection('income', e.target.value)}
              />
              <button
                onClick={() => handleSelection('income', '55000')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <p className="font-medium">Let's set a monthly savings goal. Would you rather save:</p>
            <div className="space-y-3">
              {[
                { value: '10000', label: '₹10,000 for emergency funds' },
                { value: '8000', label: '₹8,000 for short-term goals like your trip' },
                { value: 'auto', label: 'Let me decide based on your answers' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => handleSelection('savingsGoal', option.value)}
                  className="w-full p-4 bg-white border rounded-lg hover:bg-gray-50 text-left"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-4 bg-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Your Personalized Budget</span>
                </div>
                
                {showBudget && (
                  <>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={budgetData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {budgetData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      {budgetData.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span>{entry.name}</span>
                          </div>
                          <span>₹{entry.value.toLocaleString()} ({Math.round((entry.value/55000)*100)}%)</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        I've linked your Maldives trip as your main goal. You can tweak this anytime!
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {renderStep()}
    </div>
  );
};

export default BudgetPersonalityDemo;