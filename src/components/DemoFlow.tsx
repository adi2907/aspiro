import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Play, ArrowRight, Rocket, Coffee, Users, Target, X } from 'lucide-react';
import { SpendingInsightsDemo } from './demos/SpendingInsightsDemo';
import {GamifiedSavingsDemo} from './demos/GamifiedSavingsDemo'
import {RoastDemo} from './demos/RoastDemo'
import { PeerComparisonDemo } from './demos/PeerComparison';
import { FinancialHealthDemo } from './demos/FinancialHealthDemo';
import { SubscriptionInsightsDemo } from './demos/SubscriptionInsightsDemo';
import { BudgetPersonalityDemo } from './demos/BudgetPersonalityQuizDemo';



const DEMOS = [
  {
    id: 'spending-insights',
    title: 'Spending Insights',
    component: SpendingInsightsDemo,
    icon: Play
  },
  {
    id: 'gamified-savings',
    title: 'Gamified Savings',
    component: GamifiedSavingsDemo,
    icon: Rocket
  },
  {
    id: 'roast-spending',
    title: 'Overspending',
    component: RoastDemo,
    icon: Coffee
  },
  {
    id: 'peer-comparison',
    title: 'Peer Comparison',
    component: PeerComparisonDemo,
    icon: Users
  },
  {
    id: 'financial-health',
    title: 'Financial Health Score',
    component: FinancialHealthDemo,
    icon: Target
  },
  {
    id: 'subscription-insights',
    title: 'Subscription Insights',
    component: SubscriptionInsightsDemo,
    icon: X
  },
  {
    id: 'budget-personality',
    title: 'Setup your Finance',
    component: BudgetPersonalityDemo,
    icon: Target,
    highlighted: true // We can add this property to show special styling
  },
];

const DemoFlow = () => {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {!selectedDemo ? (
          <Card>
            <CardHeader>
              <CardTitle>Demos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {DEMOS.map((demo) => (
                  <button
                    key={demo.id}
                    onClick={() => setSelectedDemo(demo.id)}
                    className="w-full flex items-center justify-between p-4 bg-white border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <demo.icon className="h-5 w-5 text-blue-500" />
                      <span>{demo.title}</span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedDemo(null)}
              className="text-blue-500 hover:text-blue-600"
            >
              ← Back to demos
            </button>
            <Card>
              <CardContent className="p-6">
                {selectedDemo && (
                  <DemoComponent 
                    demo={DEMOS.find(d => d.id === selectedDemo)?.component} 
                  />
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper component to handle dynamic component rendering
const DemoComponent = ({ demo }: { demo: React.ComponentType | undefined }) => {
  if (!demo) return null;
  const Demo = demo;
  return <Demo />;
};

export default DemoFlow;

// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { Play, ArrowRight, Coffee, UtensilsCrossed } from 'lucide-react';

// const demoData = {
//   "spending-insights": {
//     userPrompt: "How much did I spend on dining this month?",
//     conversation: [
//       {
//         type: 'user',
//         text: "How much did I spend on dining this month?"
//       },
//       {
//         type: 'bot',
//         text: "You've spent ₹4,500 on dining this month. Here's the breakdown:",
//         chartData: [
//           { name: 'Zomato', value: 2200, color: '#FF4B4B' },
//           { name: 'Swiggy', value: 1500, color: '#FF8C00' },
//           { name: 'Restaurants', value: 800, color: '#4CAF50' }
//         ],
//         followUp: "I noticed you ordered from Zomato twice for dinner this week. You could save around ₹800 by cooking at home on weekdays - that's enough for a weekend brunch at your favorite café! Want some quick dinner recipes that take less time than waiting for delivery? 👩‍🍳"
//       }
//     ]
//   }
// };

// const DemoFlow = () => {
//   const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
//   const [currentStep, setCurrentStep] = useState(0);

//   const renderDemoContent = () => {
//     if (!selectedDemo) return null;
//     const demo = demoData[selectedDemo as keyof typeof demoData];
    
//     return (
//       <div className="space-y-6">
//         <div className="space-y-4">
//           {demo.conversation.map((message, index) => (
//             <div
//               key={index}
//               className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-[80%] rounded-lg p-4 ${
//                   message.type === 'user'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-100'
//                 }`}
//               >
//                 <p className="whitespace-pre-line">{message.text}</p>
//                 {message.chartData && (
//                   <div className="mt-4">
//                     <div className="h-64">
//                       <ResponsiveContainer width="100%" height="100%">
//                         <PieChart>
//                           <Pie
//                             data={message.chartData}
//                             cx="50%"
//                             cy="50%"
//                             innerRadius={60}
//                             outerRadius={80}
//                             paddingAngle={5}
//                             dataKey="value"
//                           >
//                             {message.chartData.map((entry, index) => (
//                               <Cell key={`cell-${index}`} fill={entry.color} />
//                             ))}
//                           </Pie>
//                           <Tooltip />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                     <div className="mt-4 space-y-2">
//                       {message.chartData.map((entry, index) => (
//                         <div key={index} className="flex items-center justify-between">
//                           <div className="flex items-center gap-2">
//                             <div
//                               className="w-3 h-3 rounded-full"
//                               style={{ backgroundColor: entry.color }}
//                             />
//                             <span>{entry.name}</span>
//                           </div>
//                           <span>₹{entry.value}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {message.followUp && (
//                   <div className="mt-4 p-3 bg-blue-50 rounded-lg text-gray-800">
//                     {message.followUp}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex gap-3">
//           <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
//             Show me recipes
//             <UtensilsCrossed className="h-4 w-4" />
//           </button>
//           <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
//             Set dining budget
//             <Coffee className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-4xl mx-auto space-y-6">
//         {!selectedDemo ? (
//           <Card>
//             <CardHeader>
//               <CardTitle>Interactive Demos</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <button
//                   onClick={() => setSelectedDemo('spending-insights')}
//                   className="w-full flex items-center justify-between p-4 bg-white border rounded-lg hover:bg-gray-50"
//                 >
//                   <div className="flex items-center gap-3">
//                     <Play className="h-5 w-5 text-blue-500" />
//                     <span>Spending Insights</span>
//                   </div>
//                   <ArrowRight className="h-4 w-4" />
//                 </button>
//               </div>
//             </CardContent>
//           </Card>
//         ) : (
//           <div className="space-y-6">
//             <button
//               onClick={() => setSelectedDemo(null)}
//               className="text-blue-500 hover:text-blue-600"
//             >
//               ← Back to demos
//             </button>
//             <Card>
//               <CardContent className="p-6">
//                 {renderDemoContent()}
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DemoFlow;