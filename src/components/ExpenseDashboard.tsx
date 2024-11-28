"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Plus, ArrowUpRight, ArrowDownRight, Wallet, Loader2, X } from 'lucide-react';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
  merchant: string;
  type: string;
}

interface Summary {
  totalSpent: number;
  totalIncome: number;
  categorySplit: Record<string, number>;
}

interface DashboardData {
  transactions: Transaction[];
  summary: Summary;
}

interface LoadingStep {
  title: string;
  detail: string;
}

interface MerchantConfig {
  name: string;
  items: string[];
}

interface MerchantCategories {
  [key: string]: MerchantConfig[];
}

const MERCHANTS: MerchantCategories = {
  'Food & Dining': [
    { name: 'Swiggy', items: ['Burger King', 'McDonalds', 'Pizza Hut', 'Dominos', 'Bowl Company'] },
    { name: 'Zomato', items: ['Behrouz Biryani', 'Subway', 'KFC', 'Chinese Box', 'Mad Over Donuts'] }
  ],
  'Entertainment': [
    { name: 'Netflix', items: ['Monthly Subscription'] },
    { name: 'Spotify', items: ['Premium Subscription'] },
    { name: 'Amazon Prime', items: ['Annual Subscription'] },
    { name: 'BookMyShow', items: ['Movie Tickets', 'Event Tickets'] }
  ],
  'Shopping': [
    { name: 'Amazon', items: ['Electronics', 'Books', 'Home Appliances', 'Clothing'] },
    { name: 'Myntra', items: ['Clothing', 'Shoes', 'Accessories'] },
    { name: 'Flipkart', items: ['Electronics', 'Home Goods', 'Fashion'] }
  ],
  'Transport': [
    { name: 'Uber', items: ['Ride'] },
    { name: 'Ola', items: ['Ride'] },
    { name: 'Rapido', items: ['Bike Ride'] }
  ],
  'Utilities': [
    { name: 'BESCOM', items: ['Electricity Bill'] },
    { name: 'Airtel', items: ['Mobile Bill', 'Broadband Bill'] },
    { name: 'Jio', items: ['Mobile Recharge'] }
  ],
  'Groceries': [
    { name: 'BigBasket', items: ['Monthly Groceries', 'Fresh Vegetables'] },
    { name: 'Blinkit', items: ['Quick Groceries', 'Daily Essentials'] },
    { name: 'Zepto', items: ['Instant Delivery', 'Daily Needs'] }
  ]
};

const LOADING_STEPS: LoadingStep[] = [
  {
    title: "Initiating Account Aggregator connection",
    detail: "Connecting to HDFC Bank via AA..."
  },
  {
    title: "Fetching consent details",
    detail: "Getting your consent for financial data access..."
  },
  {
    title: "Processing bank statements",
    detail: "Analyzing your transactions..."
  },
  {
    title: "Organizing your data",
    detail: "Creating personalized insights..."
  }
];

export default function ExpenseDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const generateSyntheticData = (): DashboardData => {
    const transactions: Transaction[] = [];
    const startDate = new Date('2024-03-01');
    const endDate = new Date('2024-03-31');
    let id = 1;

    // Salary credit
    transactions.push({
      id: id++,
      date: '2024-03-01',
      description: 'Salary Credit - March 2024',
      amount: 65000,
      category: 'Income',
      merchant: 'Employer',
      type: 'Bank Transfer'
    });

    // Generate random transactions
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const numTransactions = Math.floor(Math.random() * 3) + 2;
      
      for (let i = 0; i < numTransactions; i++) {
        const categories = Object.keys(MERCHANTS);
        const category = categories[Math.floor(Math.random() * categories.length)];
        const merchantGroup = MERCHANTS[category][Math.floor(Math.random() * MERCHANTS[category].length)];
        const item = merchantGroup.items[Math.floor(Math.random() * merchantGroup.items.length)];
        
        let amount: number;
        switch(category) {
          case 'Food & Dining':
            amount = -(Math.floor(Math.random() * 500) + 200);
            break;
          case 'Entertainment':
            amount = -(Math.floor(Math.random() * 300) + 200);
            break;
          case 'Shopping':
            amount = -(Math.floor(Math.random() * 3000) + 500);
            break;
          case 'Transport':
            amount = -(Math.floor(Math.random() * 200) + 100);
            break;
          case 'Utilities':
            amount = -(Math.floor(Math.random() * 1000) + 500);
            break;
          case 'Groceries':
            amount = -(Math.floor(Math.random() * 2000) + 300);
            break;
          default:
            amount = -Math.floor(Math.random() * 1000);
        }

        transactions.push({
          id: id++,
          date: d.toISOString().split('T')[0],
          description: `${merchantGroup.name} - ${item}`,
          amount,
          category,
          merchant: merchantGroup.name,
          type: Math.random() > 0.5 ? 'UPI' : 'Card'
        });
      }
    }

    const categorySplit = transactions.reduce<Record<string, number>>((acc, t) => {
      if (t.amount < 0) {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      }
      return acc;
    }, {});

    return {
      transactions: transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      summary: {
        totalSpent: Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)),
        totalIncome: transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0),
        categorySplit
      }
    };
  };

  useEffect(() => {
    const simulateAAFlow = async () => {
      for (let i = 0; i < LOADING_STEPS.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      setData(generateSyntheticData());
      setIsLoading(false);
    };

    simulateAAFlow();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
              
              <div className="space-y-4 w-full">
                {LOADING_STEPS.map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-4 ${
                      index === currentStep ? 'text-blue-500' : 
                      index < currentStep ? 'text-gray-400' : 'text-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${
                      index === currentStep ? 'bg-blue-500 animate-pulse' : 
                      index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-gray-500">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pieData = Object.entries(data.summary.categorySplit).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#FF0000'];

  const filteredTransactions = selectedCategory 
    ? data.transactions.filter(t => t.category === selectedCategory)
    : data.transactions;

  const handlePieClick = (data: { name: string } | undefined) => {
    if (data?.name) {
      setSelectedCategory(data.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-2xl font-bold">₹{data.summary.totalSpent.toLocaleString()}</p>
                </div>
                <ArrowDownRight className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Income</p>
                  <p className="text-2xl font-bold">₹{data.summary.totalIncome.toLocaleString()}</p>
                </div>
                <ArrowUpRight className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Categories</p>
                  <p className="text-2xl font-bold">{Object.keys(data.summary.categorySplit).length}</p>
                </div>
                <Wallet className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Transactions</p>
                  <p className="text-2xl font-bold">{data.transactions.length}</p>
                </div>
                <Plus className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      onClick={(data) => handlePieClick(data)}
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]}
                          stroke="none"
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Category Legend */}
              <div className="mt-4 space-y-2">
                {pieData.map((entry, index) => (
                  <div 
                    key={entry.name}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
                    onClick={() => setSelectedCategory(entry.name)}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span>{entry.name}</span>
                    </div>
                    <span>₹{entry.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Recent Transactions</CardTitle>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" /> Clear filter
                </button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.slice(0, 10).map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()} • {transaction.type}
                      </p>
                    </div>
                    <p className={`font-medium ${
                      transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {transaction.amount < 0 ? '-' : '+'}₹{Math.abs(transaction.amount).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}