import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Send, Target, ChevronRight, Trophy, Gift, Rocket } from 'lucide-react';


const TOPIC_GROUPS = {
  popular: {
    title: "POPULAR TOPICS",
    topics: [
      "where's my money going?",
      "any bills upcoming",
      "talk spending"
    ]
  },
  money: {
    title: "YOUR MONEY",
    topics: [
      "add to savings",
      "withdraw from savings", 
      "set a spend challenge",
      "get a quick cover"
    ]
  },
  games: {
    title: "GAMES",
    topics: [
      "hype me",
      "roast me",
      "play spendr",
      "make Ignis smarter"
    ]
  }
};

interface SpendingDataPoint {
  month: string;
  budget: number;
  actual: number;
  underBudget: number;
  overBudget: number;
}

// Process the raw data to calculate under/over budget values
const processSpendingData = (data: { month: string; budget: number; actual: number }[]): SpendingDataPoint[] => {
  return data.map(item => ({
    ...item,
    underBudget: item.actual < item.budget ? item.actual : 0,
    overBudget: item.actual > item.budget ? item.actual : 0
  }));
};

const rawSpendingData = [
  { month: 'Jan', budget: 30000, actual: 28000 },
  { month: 'Feb', budget: 30000, actual: 34000 },
  { month: 'Mar', budget: 30000, actual: 35000 }
];

const spendingData = processSpendingData(rawSpendingData);

const peerComparisonData = [
  { category: 'Top Savers', amount: 8000 },
  { category: 'Your Friends', amount: 12000 },
  { category: 'You', amount: 15000 }
];

const savingsGoalData = [
  { month: 'Jan', goal: 10000, actual: 8000 },
  { month: 'Feb', goal: 10000, actual: 9000 },
  { month: 'Mar', goal: 10000, actual: 9500 }
];

const purchaseOptions = [
  {
    name: "Gaming Laptop",
    price: 85000,
    savings: 15000,
    pros: "Best performance, future-proof",
    cons: "Higher power consumption"
  },
  {
    name: "Mid-range Laptop",
    price: 65000,
    savings: 20000,
    pros: "Good value, sufficient for most tasks",
    cons: "May need upgrade sooner"
  }
];

const creditCardOptions = [
  {
    bank: "HDFC Bank",
    card: "Regalia",
    benefits: "5% cashback, 6 months no-cost EMI",
    effectivePrice: 80750
  },
  {
    bank: "Axis Bank",
    card: "Flipkart",
    benefits: "₹2000 instant discount, 9 months no-cost EMI",
    effectivePrice: 83000
  },
  {
    bank: "ICICI Bank",
    card: "Amazon Pay",
    benefits: "₹2500 instant discount, 12 months no-cost EMI",
    effectivePrice: 82500
  }
];

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: string[];
  chart?: 'spending' | 'peer' | 'savings' | null;
  purchaseOptions?: typeof purchaseOptions;
  celebration?: boolean;
}

interface GoalTracker {
  current: number;
  target: number;
  percentage: number;
}

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: string[];
  chart?: 'spending' | 'peer' | 'savings' | null;
  purchaseOptions?: typeof purchaseOptions;
  celebration?: boolean;
  creditCards?: typeof creditCardOptions;
  goalTracker?: GoalTracker;
}

export default function ConversationalDemo() {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    type: 'bot',
    content: "Hey! I'm Ignis, your financial guide. What would you like to know?",
    options: ['Look up current balance', 'Check spending', 'View savings goals']
  }]);

  const [inputMessage, setInputMessage] = useState('');
  const [showHomeScreen, setShowHomeScreen] = useState(true);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleOptionClick = (option: string) => {
    setShowHomeScreen(false);
    addMessage({
      id: Date.now().toString(),
      type: 'user',
      content: option
    });

    switch(option) {
      case 'Look up current balance':
        setTimeout(() => {
          addMessage({
            id: Date.now().toString(),
            type: 'bot',
            content: "Your current balance is ₹45,000. Here's what you might want to check:",
            options: ['Spending overruns', 'Category insights', 'Recurring Charges']
          });
        }, 500);
        break;

      case 'Spending overruns':
        setTimeout(() => {
          addMessage({
            id: Date.now().toString(),
            type: 'bot',
            content: "Here's how your spending looks compared to your plan:",
            chart: 'spending',
            options: ['Future You Says...', 'Roast me', 'Plan adjustments']
          });
        }, 500);
        break;

      case 'Roast me':
        setTimeout(() => {
          addMessage({
            id: Date.now().toString(),
            type: 'bot',
            content: "🔥 Wow, ₹15,000 on food delivery? Your kitchen must be feeling pretty neglected! Want to see how your foodie habits compare to others?",
            chart: 'peer',
            options: ['Set a Challenge', 'Best practices', 'Budget tips']
          });
        }, 500);
        break;

      case 'Set a Challenge':
        setTimeout(() => {
          addMessage({
            id: Date.now().toString(),
            type: 'bot',
            content: "Let's set a goal to cut food delivery spending by 40%! Here's your savings progress:",
            chart: 'savings',
            options: ['Attain savings goals', 'Plan my month', 'Track my progress']
          });
        }, 500);
        break;

      case 'Attain savings goals':
        setTimeout(() => {
          addMessage({
            id: Date.now().toString(),
            type: 'bot',
            content: "You're getting close to your laptop savings goal! Here are your options:",
            options: ['Actionable steps', 'Automate my savings', 'Savings boost calculator']
          });
        }, 500);
        break;

      case 'Actionable steps':
        setTimeout(() => {
          addMessage({
            id: Date.now().toString(),
            type: 'bot',
            content: "I suggest creating an RD of ₹5,000/month. This will help you reach your goal faster! Want to see some recommendations for your laptop purchase?",
            options: ['Show me options', 'Set up RD now']
          });
        }, 500);
        break;

      case 'Show me options':
        setTimeout(() => {
          addMessage({
            id: Date.now().toString(),
            type: 'bot',
            content: "Here are some options I've found based on your preferences and budget:",
            purchaseOptions: purchaseOptions,
            options: ['Set up savings plan', 'Compare more options']
          });
        }, 500);
        break;

      case 'Set up savings plan':
        setTimeout(() => {
          addMessage({
            id: Date.now().toString(),
            type: 'bot',
            content: "🎉 Congratulations! You've reached 75% of your laptop savings goal!",
            celebration: true,
            options: ['Setup auto-debit', 'Remind me later']
          });
        }, 500);
        break;

        case 'Set up RD now':
    setTimeout(() => {
      addMessage({
        id: Date.now().toString(),
        type: 'bot',
        content: "🎉 Congratulations! RD setup successful. You're making great progress!",
        celebration: true,
        goalTracker: {
          current: 75000,
          target: 85000,
          percentage: 88
        },
        options: ['Compare prices', 'Credit card options', 'View all purchase options']
      });
    }, 500);
    break;

  case 'Credit card options':
    setTimeout(() => {
      addMessage({
        id: Date.now().toString(),
        type: 'bot',
        content: "Here are the best credit cards for your purchase:",
        creditCards: creditCardOptions,
        options: ['Apply now', 'Compare prices', 'Remind me later']
      });
    }, 500);
    break;
      }
  };

  
  const renderHomeScreen = () => (
    <div className="space-y-8 p-4">
      {Object.entries(TOPIC_GROUPS).map(([key, group]) => (
        <div key={key}>
          <h2 className="text-lg font-bold mb-4">{group.title}</h2>
          <div className="flex flex-wrap gap-2">
            {group.topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleOptionClick(topic)}
                className="bg-white border rounded-full px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="max-w-2xl mx-auto h-[80vh] flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-4">
        {showHomeScreen ? renderHomeScreen() : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} 
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-lg p-4 ${
                  message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}>
                  <p>{message.content}</p>

                  {message.chart === 'spending' && (
                    <div className="h-64 mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={spendingData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar 
                            dataKey="budget" 
                            fill="#3B82F6"
                            name="Budget" 
                          />
                          <Bar 
                            dataKey="underBudget" 
                            fill="#10B981"
                            stackId="actual"  // Add this
                            name="Actual (Under)" 
                          />
                          <Bar 
                            dataKey="overBudget" 
                            fill="#F97316"
                            stackId="actual"  // Add this
                            name="Actual (Over)" 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {message.chart === 'peer' && (
                    <div className="h-64 mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={peerComparisonData} layout="vertical">
                          <XAxis type="number" />
                          <YAxis dataKey="category" type="category" />
                          <Tooltip />
                          <Bar dataKey="amount" fill="#6366F1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {message.chart === 'savings' && (
                    <div className="h-64 mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={savingsGoalData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="goal" stroke="#10B981" name="Goal" />
                          <Line type="monotone" dataKey="actual" stroke="#6366F1" name="Actual" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {message.purchaseOptions && (
                    <div className="mt-4 space-y-3">
                      {message.purchaseOptions.map((option, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{option.name}</h3>
                            <span className="text-green-600">₹{option.price.toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-green-600 mt-1">Potential savings: ₹{option.savings.toLocaleString()}</p>
                          <div className="mt-2 text-sm">
                            <p className="text-green-600">✓ {option.pros}</p>
                            <p className="text-red-600">✗ {option.cons}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {message.celebration && (
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium text-yellow-800">Achievement Unlocked!</span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-yellow-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full w-[75%]"></div>
                        </div>
                        <p className="text-sm text-yellow-800 mt-1">75% of goal reached</p>
                      </div>
                    </div>
                  )}

                  {message.options && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm hover:bg-gray-50 border transition-colors flex items-center gap-1"
                        >
                          {option}
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      ))}
                    </div>
                  )}
                  {message.creditCards && (
                    <div className="mt-4 space-y-3">
                      {message.creditCards.map((card, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{card.bank} {card.card}</h3>
                              <p className="text-sm text-gray-600 mt-1">{card.benefits}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-green-600">₹{card.effectivePrice.toLocaleString()}</span>
                              <p className="text-xs text-gray-500">Effective price</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {message.goalTracker && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Laptop Savings Goal</span>
                        <span className="text-blue-600">{message.goalTracker.percentage}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-1000" 
                          style={{ width: `${message.goalTracker.percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span>₹{message.goalTracker.current.toLocaleString()}</span>
                        <span>₹{message.goalTracker.target.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
          )}
        </CardContent>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}