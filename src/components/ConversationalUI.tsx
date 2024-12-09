import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineChart,PieChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar,Pie, Cell } from 'recharts';
import { Send, Target, ChevronRight, Trophy, Gift, Rocket } from 'lucide-react';
let messageIdCounter = 0;

interface ChartDataEntry {
  name: string;
  value: number;
  fill: string;
}

const HIGHLIGHTED_OPTIONS = [
  'talk spending',
  'Roast me',
  'Set a Challenge',
  'merchant insights',
  'spending breakdown for March',
  'show saving tips',
  'set savings target',
  'Track long term saving',
  'Actionable steps',
  'Set up savings plan',
  'Set up RD now',
  'Credit card options',
];

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
  { month: 'Mar', budget: 30000, actual: 42500 }
];
const monthlyBreakdown = [
  { name: 'Groceries', value: 15000, fill: '#4CAF50' },  // 35%
  { name: 'Food & Dining', value: 12000, fill: '#FF8042' }, // 28%
  { name: 'Apparel', value: 8000, fill: '#0088FE' },   // 19%
  { name: 'Others', value: 7500, fill: '#FFBB28' }    // 18%
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
  { month: 'Mar', goal: 10000, actual: 9500 },
  { month: 'Apr', goal: 12000, actual: 0 },
  { month: 'May', goal: 12000, actual: 0 },
  { month: 'Jun', goal: 12000, actual: 0 },
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
  chart?: 'spending' | 'peer' | 'savings' | 'breakdown' | null;
  data?: ChartDataEntry[];
  purchaseOptions?: typeof purchaseOptions;
  celebration?: boolean;
  creditCards?: typeof creditCardOptions;
  goalTracker?: GoalTracker;
}

interface GoalTracker {
  current: number;
  target: number;
  percentage: number;
}


export default function ConversationalDemo() {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    type: 'bot',
    content: "Hey! I'm Ignis, your financial guide.Here's a breakdown of your spending patterns",
  }]);

  const [inputMessage, setInputMessage] = useState('');
  const [showHomeScreen, setShowHomeScreen] = useState(true);

  const addMessage = (message: Message) => {
    const uniqueId = `msg-${++messageIdCounter}`;
    setMessages(prev => [...prev, {
      ...message,
      id: uniqueId
    }]);
  };
  
  const handleOptionClick = (option: string) => {
    setShowHomeScreen(false);
    if (option === 'talk spending') {
      addMessage({
        id: Date.now().toString(),
        type: 'bot',
        content: "Let me show you how your spending looks compared to your plan:",
        chart: 'spending',
        options: ['spending breakdown for March', 'spending breakdown for Feb', 'Spending trends']
      });
    } else {
      // For other options, keep existing behavior
      addMessage({
        id: Date.now().toString(),
        type: 'user',
        content: option
      });
    }

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
          
      case 'spending breakdown for March':
        addMessage({
          id: Date.now().toString(),
          type: 'bot',
          content: "Here's your spending breakdown for this month:",
          chart: 'breakdown',
          data: monthlyBreakdown,
          options: ['Roast me', 'Category Insights', 'Spending trends']
        });
        break;
        case 'Roast me':
          setTimeout(() => {
            addMessage({
              id: Date.now().toString(),
              type: 'bot',
              content: `🔥 Wow, ₹15,000 on groceries? Your fridge must think you have a five-star! Here's your luxury list:\n\n🥑 Organic Produce: ₹4,200\n🍪 Imported Snacks: ₹3,500\n☕️ Premium Coffee: ₹2,800\n\nWant to dive deeper into this?`,
              options: ['peer comparison', 'category insights', 'merchant insights']
            });
          }, 500);
          break;
        

        case 'peer comparison':
          setTimeout(() => {
            addMessage({
              id: Date.now().toString(),
              type: 'bot',
              content: "Here's how your grocery spending compares with others in your income group:",
              chart: 'peer',
              data: [
                { category: 'Top Savers', amount: 8000 },
                { category: 'Average', amount: 12000 },
                { category: 'You', amount: 15000 }
              ],
              options: ['set a budget goal', 'show saving tips', 'view best deals']
            });
          }, 500);
          break;

        case 'category insights':
          setTimeout(() => {
            addMessage({
              id: Date.now().toString(),
              type: 'bot',
              content: "Here's your grocery spending by category:",
              chart: 'breakdown',
              data: [
                { name: 'Fresh Produce', value: 6000, fill: '#4CAF50' },
                { name: 'Packaged Foods', value: 4500, fill: '#FF8042' },
                { name: 'Beverages', value: 2500, fill: '#0088FE' },
                { name: 'Household', value: 2000, fill: '#FFBB28' }
              ],
              options: ['merchant insights', 'Compare prices', 'set budget']
            });
          }, 500);
          break;

        case 'merchant insights':
          setTimeout(() => {
            addMessage({
              id: Date.now().toString(),
              type: 'bot',
              content: "Here's where your grocery money is going:",
              chart: 'breakdown',
              data: [
                { name: 'BigBasket', value: 7000, fill: '#4CAF50' },
                { name: 'Natures Basket', value: 4000, fill: '#FF8042' },
                { name: 'Local Market', value: 2500, fill: '#0088FE' },
                { name: 'Other Stores', value: 1500, fill: '#FFBB28' }
              ],
              options: ['category insights', 'show saving tips', 'set budget']
            });
          }, 500);
          break;
          case 'show saving tips':
          setTimeout(() => {
            addMessage({
              id: Date.now().toString(),
              type: 'bot',
              content: "💡 Based on your ₹15,000 monthly grocery spend, let me show you how you could save more:",
              creditCards: [
                {
                  bank: "Tata",
                  card: "Neu Credit Card",
                  benefits: "10% NeuCoins on grocery (₹1,500 monthly savings), 15% on Tata brands",
                  effectivePrice: 10500
                },
                {
                  bank: "HDFC",
                  card: "Diners Black",
                  benefits: "2% reward points on grocery (₹300 monthly savings), Airport lounges",
                  effectivePrice: 13700
                },
                {
                  bank: "ICICI",
                  card: "Amazon Pay",
                  benefits: "5% on Amazon Fresh (₹750 monthly savings), 5% on Amazon shopping",
                  effectivePrice: 14550
                }
              ],
              options: ['apply for Tata Neu','show all cards','set savings target']
            });
          }, 500);
          break;

      case 'set savings target':
        setTimeout(() => {
          addMessage({
            id: Date.now().toString(),
            type: 'bot',
            content: "Let's target to increase your savings by 20%! Here's your savings progress till date:",
            chart: 'savings',
            options: ['Attain savings goals', 'Plan my month', 'Track long term saving']
          });
        }, 500);
        break;

      case 'Track long term saving':
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
                className={`bg-white border rounded-full px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  topic === 'talk spending' ? 'border-blue-500 border-2 animate-pulse' : ''
                }`}
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

                  {message.chart === 'breakdown' && message.data && (
                    <div className="mt-4"> {/* Add wrapper div with mt-4 like spending chart */}
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={message.data}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {message.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-4 space-y-2">
                        {message.data.map((entry, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.fill }}
                              />
                              <span>{entry.name}</span>
                            </div>
                            <span>₹{entry.value.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
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
                          className={`bg-white border rounded-full px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                            HIGHLIGHTED_OPTIONS.includes(option) ? 'border-blue-500 border-2 animate-pulse' : ''
                          }`}
                        >
                          {option}
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