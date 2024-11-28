"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Send, Loader2 } from 'lucide-react';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
  merchant: string;
  type: string;
}

interface ShoppingItem {
  item: string;
  amount: number;
  merchant: string;
}

interface Insights {
  foodCount: number;
  foodTotal: number;
  entertainmentTotal: number;
  quickCommerceTotal: number;
  shoppingItems: ShoppingItem[];
}

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

// Synthetic data generator
const generateSyntheticData = (): Transaction[] => {
  const transactions = [
    // Food & Dining
    { id: 1, date: '2024-03-01', description: 'Swiggy - Burger King', amount: -450, category: 'Food & Dining', merchant: 'Swiggy', type: 'UPI' },
    { id: 2, date: '2024-03-03', description: 'Zomato - Pizza Hut', amount: -899, category: 'Food & Dining', merchant: 'Zomato', type: 'Card' },
    { id: 3, date: '2024-03-05', description: 'Swiggy - Bowl Company', amount: -350, category: 'Food & Dining', merchant: 'Swiggy', type: 'UPI' },
    { id: 4, date: '2024-03-08', description: 'Blinkit - Groceries', amount: -1200, category: 'Food & Dining', merchant: 'Blinkit', type: 'UPI' },
    
    // Entertainment
    { id: 5, date: '2024-03-01', description: 'Netflix - Monthly Subscription', amount: -649, category: 'Entertainment', merchant: 'Netflix', type: 'Card' },
    { id: 6, date: '2024-03-01', description: 'Spotify - Premium Subscription', amount: -199, category: 'Entertainment', merchant: 'Spotify', type: 'Card' },
    { id: 7, date: '2024-03-01', description: 'Amazon Prime - Monthly', amount: -179, category: 'Entertainment', merchant: 'Amazon Prime', type: 'Card' },
    
    // Shopping
    { id: 8, date: '2024-03-15', description: 'Blinkit - Air Fryer', amount: -4999, category: 'Shopping', merchant: 'Blinkit', type: 'UPI' },
    { id: 9, date: '2024-03-18', description: 'Amazon - Electronics', amount: -2999, category: 'Shopping', merchant: 'Amazon', type: 'Card' },
    { id: 10, date: '2024-03-20', description: 'Myntra - Clothing', amount: -3499, category: 'Shopping', merchant: 'Myntra', type: 'UPI' },
    
    // Income
    { id: 11, date: '2024-03-01', description: 'Salary Credit - March 2024', amount: 65000, category: 'Income', merchant: 'Employer', type: 'Bank Transfer' },
  ];

  return transactions;
};

const generateInsights = (transactions: Transaction[]): Insights => {
  const foodDelivery = transactions.filter(t => 
    (t.merchant === 'Swiggy' || t.merchant === 'Zomato') && t.amount < 0
  );
  
  const entertainment = transactions.filter(t => 
    t.category === 'Entertainment' && t.amount < 0
  );

  const shopping = transactions.filter(t => 
    t.category === 'Shopping' && t.amount < 0
  );

  const quickCommerce = transactions.filter(t =>
    ['Blinkit', 'Zepto', 'Dunzo'].includes(t.merchant)
  );

  return {
    foodCount: foodDelivery.length,
    foodTotal: Math.abs(foodDelivery.reduce((sum, t) => sum + t.amount, 0)),
    entertainmentTotal: Math.abs(entertainment.reduce((sum, t) => sum + t.amount, 0)),
    quickCommerceTotal: Math.abs(quickCommerce.reduce((sum, t) => sum + t.amount, 0)),
    shoppingItems: shopping.map(t => ({
      item: t.description.split('-')[1].trim(),
      amount: Math.abs(t.amount),
      merchant: t.merchant
    }))
  };
};

export default function ConversationalUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [transactions] = useState<Transaction[]>(generateSyntheticData);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initial greeting
    const insights = generateInsights(transactions);
    const initialMessages: Message[] = [
      {
        type: 'bot',
        content: "Hey there! 👋 I've been looking at your March spending and... well, let's just say there's room for improvement! 😅",
        timestamp: new Date()
      },
      {
        type: 'bot',
        content: `I notice you've ordered food delivery ${insights.foodCount} times this month. 
          Your cooking skills can't be THAT bad! 👩‍🍳 Want some money-saving tips?`,
        timestamp: new Date()
      }
    ];
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (input: string, insights: Insights): string => {
    const query = input.toLowerCase();

    // Money saving advice
    if (query.includes('save') || query.includes('saving') || query.includes('cheaper')) {
      const airFryer = insights.shoppingItems.find(item => 
        item.item.toLowerCase().includes('air fryer')
      );
      
      if (airFryer) {
        return `Oh boy, about that Air Fryer you bought from ${airFryer.merchant} for ₹${airFryer.amount}... 
          I found the exact same model on Amazon for ₹3,499! 😱 
          That's ₹${airFryer.amount - 3499} you could've saved by waiting a day for delivery.
          Quick commerce is convenient but expensive! Want me to check prices before your next big purchase? 🛒`;
      }
      
      return `Here's where your money's going: 
        🍕 Food delivery: ₹${insights.foodTotal}
        🎬 Entertainment: ₹${insights.entertainmentTotal}
        🚀 Quick Commerce: ₹${insights.quickCommerceTotal}
        
        Pro tip: Quick commerce apps charge 20-30% more than regular stores.
        Maybe wait a day for delivery next time? 😉`;
    }

    // Food spending
    if (query.includes('food') || query.includes('eating')) {
      return `You've spent ₹${insights.foodTotal} on food delivery this month! 
        That's about ${Math.floor(insights.foodTotal/500)} home-cooked meals! 🍳
        
        Want some quick and easy recipes that could save you money? 
        Or should we look at some meal prep ideas? 👩‍🍳`;
    }

    // Shopping analysis
    if (query.includes('shopping') || query.includes('spent')) {
      const items = insights.shoppingItems;
      return `Let's talk about your shopping! 🛍️
        Recent purchases:
        ${items.map(i => `${i.item}: ₹${i.amount} from ${i.merchant}`).join('\n')}
        
        Pro tip: Always compare prices across Amazon, Flipkart, and offline stores.
        Want me to help you track prices for your wishlist? 📉`;
    }

    return "Ask me about your food spending, shopping habits, or where you could save money! 💡";
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));

    const insights = generateInsights(transactions);
    const response = generateResponse(inputMessage, insights);

    setMessages(prev => [...prev, {
      type: 'bot',
      content: response,
      timestamp: new Date()
    }]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="h-[80vh] flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your spending..."
                className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Card>
        
        {/* Quick prompts */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button 
            onClick={() => setInputMessage("Where can I save money?")}
            className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
          >
            Saving opportunities
          </button>
          <button 
            onClick={() => setInputMessage("How much did I spend on food?")}
            className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
          >
            Food spending
          </button>
          <button 
            onClick={() => setInputMessage("Show my recent purchases")}
            className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
          >
            Shopping analysis
          </button>
        </div>
      </div>
    </div>
  );
}