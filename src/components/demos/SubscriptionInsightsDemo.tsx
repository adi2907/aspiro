import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { AlertCircle, X, Play, Music, Film, BookOpen } from 'lucide-react';

interface Subscription {
  id: string;
  name: string;
  cost: number;
  lastUsed: string;
  icon: React.ElementType;
  color: string;
}

export const SubscriptionInsightsDemo = () => {
  const [showInitialPrompt, setShowInitialPrompt] = useState(false);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [showUserResponse, setShowUserResponse] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const subscriptions: Subscription[] = [
    {
      id: 'netflix',
      name: 'Netflix',
      cost: 499,
      lastUsed: '2 months ago',
      icon: Film,
      color: '#E50914'
    },
    {
      id: 'spotify',
      name: 'Spotify',
      cost: 199,
      lastUsed: '2 days ago',
      icon: Music,
      color: '#1DB954'
    },
    {
      id: 'kindle',
      name: 'Kindle Unlimited',
      cost: 169,
      lastUsed: '3 months ago',
      icon: BookOpen,
      color: '#FF9900'
    }
  ];

  const handleCancelClick = () => {
    setShowUserResponse(true);
    setTimeout(() => setShowConfirmation(true), 1000);
  };

  useEffect(() => {
    setTimeout(() => setShowInitialPrompt(true), 1000);
    setTimeout(() => setShowSubscriptions(true), 2500);
  }, []);

  return (
    <div className="space-y-4">
      {showInitialPrompt && (
        <div className="flex justify-start animate-fade-in">
          <div className="max-w-[80%] rounded-lg p-4 bg-gray-100">
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Subscription Alert</span>
            </div>
            <p>I noticed you haven't used Netflix in 2 months. Want to cancel and save ₹499/month?</p>
          </div>
        </div>
      )}

      {showSubscriptions && (
        <div className="animate-fade-in">
          <Card className="p-4">
            <div className="space-y-4">
              {subscriptions.map((sub) => (
                <div 
                  key={sub.id}
                  className={`p-4 rounded-lg border ${
                    sub.id === 'netflix' ? 'bg-red-50 border-red-100' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${sub.color}20` }}
                      >
                        <sub.icon 
                          className="h-5 w-5" 
                          style={{ color: sub.color }}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{sub.name}</p>
                        <p className="text-sm text-gray-500">Last used: {sub.lastUsed}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{sub.cost}/mo</p>
                      {sub.id === 'netflix' && !showUserResponse && (
                        <button
                          onClick={handleCancelClick}
                          className="mt-2 text-sm text-red-600 hover:text-red-700"
                        >
                          Cancel subscription
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Monthly Cost</span>
                <span className="font-medium">₹867</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showUserResponse && (
        <div className="flex justify-end animate-fade-in">
          <div className="max-w-[80%] rounded-lg p-4 bg-blue-500 text-white">
            Yes, please cancel my Netflix subscription
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="flex justify-start animate-fade-in">
          <div className="max-w-[80%] rounded-lg p-4 bg-gray-100">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <Play className="h-5 w-5" />
              <span className="font-medium">Subscription Cancelled</span>
            </div>
            <p>I've cancelled your Netflix subscription. You'll save ₹499 monthly going forward. Your subscription will remain active until the end of the current billing period.</p>
          </div>
        </div>
      )}
    </div>
  );
};