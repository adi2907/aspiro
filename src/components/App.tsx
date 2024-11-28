"use client";
import React from 'react';
import { useState } from 'react';
import { LayoutDashboard, MessageSquare, Target, Trophy } from 'lucide-react';

// Import all our screens
import ExpenseDashboard from './ExpenseDashboard';
import ConversationalUI from './ConversationalUI';
import GamificationScreen from './GamificationScreen';
import DemoFlow from './DemoFlow';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  const renderScreen = () => {
    switch(currentScreen) {
      case 'dashboard':
        return <ExpenseDashboard />;
      case 'chat':
        return <ConversationalUI />;
      case 'gamification':
        return <GamificationScreen />;
      case 'flows':
        return <DemoFlow />;
      default:
        return <ExpenseDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-around py-2">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className={`flex flex-col items-center p-2 rounded-lg ${
                currentScreen === 'dashboard' ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              <LayoutDashboard className="h-6 w-6" />
              <span className="text-xs mt-1">Dashboard</span>
            </button>
            
            <button
              onClick={() => setCurrentScreen('chat')}
              className={`flex flex-col items-center p-2 rounded-lg ${
                currentScreen === 'chat' ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs mt-1">Chat</span>
            </button>
            
            <button
              onClick={() => setCurrentScreen('gamification')}
              className={`flex flex-col items-center p-2 rounded-lg ${
                currentScreen === 'gamification' ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              <Trophy className="h-6 w-6" />
              <span className="text-xs mt-1">Achievements</span>
            </button>

            <button
              onClick={() => setCurrentScreen('flows')}
              className={`flex flex-col items-center p-2 rounded-lg ${
                currentScreen === 'flows' ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              <Target className="h-6 w-6" />
              <span className="text-xs mt-1">Demo Flows</span>
            </button>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-16">
        {renderScreen()}
      </div>
    </div>
  );
}