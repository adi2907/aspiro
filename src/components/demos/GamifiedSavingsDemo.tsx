// src/components/demos/GamifiedSavingsDemo.tsx
import React, { useState } from 'react';
import { Rocket, Flame, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SavingsState {
  currentAmount: number;
  targetAmount: number;
  streakDays: number;
  isCompleted: boolean;
}

export const GamifiedSavingsDemo = () => {
  const [state, setState] = useState<SavingsState>({
    currentAmount: 18000,
    targetAmount: 20000,
    streakDays: 12,
    isCompleted: false
  });

  const [showTransferConfirmation, setShowTransferConfirmation] = useState(false);
  const [transferComplete, setTransferComplete] = useState(false);

  const fireConfetti = () => {
    // Fire confetti from both sides
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        scalar: 1.2
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      origin: { x: 0.2 }
    });

    fire(0.2, {
      spread: 60,
      origin: { x: 0.5 }
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      origin: { x: 0.8 }
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      origin: { x: 0.4 }
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      origin: { x: 0.6 }
    });
  };

  const handleTransfer = () => {
    setShowTransferConfirmation(true);
  };

  const confirmTransfer = () => {
    setShowTransferConfirmation(false);
    
    // Simulate loading and then show success with confetti
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        currentAmount: prev.currentAmount + 500,
        streakDays: prev.streakDays + 1,
        isCompleted: prev.currentAmount + 500 >= prev.targetAmount
      }));
      setTransferComplete(true);
      
      // Fire confetti after the state update
      fireConfetti();
    }, 500);
  };

  const getProgressPercentage = () => {
    return (state.currentAmount / state.targetAmount) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Initial message */}
      {!transferComplete && !showTransferConfirmation && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-lg p-4 bg-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Rocket className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Travel Fund Goal</span>
            </div>
            <p className="mb-4">
              You're ₹{state.targetAmount - state.currentAmount} away from completing your 'Travel Fund' savings goal. 
              Shall we transfer ₹500 today to keep your savings streak alive?
            </p>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{state.currentAmount.toLocaleString()}</span>
                <span>₹{state.targetAmount.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4 p-2 bg-orange-100 rounded-lg">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-sm">{state.streakDays} days streak! Keep it going!</span>
            </div>
            <button
              onClick={handleTransfer}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Transfer ₹500
            </button>
          </div>
        </div>
      )}

      {/* Transfer confirmation */}
      {showTransferConfirmation && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-lg p-4 bg-gray-100">
            <p className="mb-4">Transfer ₹500 to Travel Fund?</p>
            <div className="flex gap-3">
              <button
                onClick={confirmTransfer}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowTransferConfirmation(false)}
                className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success message */}
      {transferComplete && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-lg p-4 bg-gray-100">
            <div className="flex items-center gap-2 mb-3 text-green-500">
              <Check className="h-5 w-5" />
              <span className="font-medium">Transfer Complete!</span>
            </div>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{(state.currentAmount).toLocaleString()}</span>
                <span>₹{state.targetAmount.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4 p-2 bg-orange-100 rounded-lg">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-sm">{state.streakDays} days streak! You're on fire! 🔥</span>
            </div>
            {state.isCompleted && (
              <div className="p-3 bg-green-100 rounded-lg text-green-800">
                🎉 Congratulations! You've reached your Travel Fund goal! Time to plan that trip!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};