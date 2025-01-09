import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Coffee, CreditCard, Home, ShoppingBag } from 'lucide-react';

interface Message {
  type: 'bot' | 'user';
  content: string;
  showSavings?: boolean;
  options?: string[];
}

export const RoastBudgetDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStage, setCurrentStage] = useState(0);

  const handleOption = (option: string) => {
    setMessages(prev => [...prev, { type: 'user', content: option }]);
    setCurrentStage(prev => prev + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([{
        type: 'bot',
        content: "You've officially crushed your eating-out budget for the month—by spending ₹5,000 on shawarma and coffee! Want to know how to get back on track?",
        options: ['Yeah, what do I do now?']
      }]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentStage > 0) {
      const timer = setTimeout(() => {
        let newMessage: Message;

        switch(currentStage) {
          case 1:
            newMessage = {
              type: 'bot',
              content: "Here's an idea: Swap out 2 dinners out for cooking at home and save ₹1,500 instantly. Plus, I've found an offer on BigBasket for grocery discounts—want me to share?",
              options: ['Yes, send me the link!'],
              showSavings: true
            };
            break;
          case 2:
            newMessage = {
              type: 'bot',
              content: "Also, for your next outing, use your XYZ credit card. It gives you 10% cashback on dining. That's ₹500 saved right there!",
              options: ["Wow, I didn't even know about that!"]
            };
            break;
          case 3:
            newMessage = {
              type: 'bot',
              content: "Keep an eye on your remaining budget for the month: ₹1,000. I'll check in next week to see how you're doing. You've got this!",
              options: ['Show budget breakdown', 'Set budget reminder']
            };
            break;
          default:
            return;
        }

        setMessages(prev => [...prev, newMessage]);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentStage]);

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
            <p>{message.content}</p>

            {message.showSavings && (
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-white rounded-lg border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Home className="h-4 w-4 text-green-600" />
                    </div>
                    <span>Home cooking savings</span>
                  </div>
                  <span className="text-green-600">₹1,500</span>
                </div>
                <div className="p-3 bg-white rounded-lg border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ShoppingBag className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>BigBasket offer</span>
                  </div>
                  <span className="text-blue-600">₹300</span>
                </div>
              </div>
            )}

            {message.options && (
              <div className="mt-4 flex flex-wrap gap-2">
                {message.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleOption(option)}
                    className="bg-white border rounded-full px-4 py-2 text-sm hover:bg-gray-50 transition-colors text-gray-900"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoastBudgetDemo;