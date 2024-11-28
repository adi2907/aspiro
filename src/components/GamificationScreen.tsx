"use client";
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, Flame, Target, Star, TrendingUp, Zap, Crown, Shield } from 'lucide-react';

export default function GamificationScreen() {
  // Sample user stats
  const stats = {
    financialHealthScore: 78,
    currentStreak: 5,
    savingsRate: 24,
    budgetAdherence: 85,
    level: 8,
    xp: 760,
    nextLevelXp: 1000
  };

  // Recent achievements
  const achievements = [
    { 
      id: 1, 
      title: "Savings Superstar", 
      description: "Saved ₹5,000 this month",
      icon: Star,
      date: "2 days ago",
      xp: 100,
      achieved: true 
    },
    { 
      id: 2, 
      title: "Budget Master", 
      description: "Stayed under budget for 3 categories",
      icon: Shield,
      date: "1 week ago",
      xp: 150,
      achieved: true
    },
    { 
      id: 3, 
      title: "Investment Rookie", 
      description: "Made your first investment",
      icon: TrendingUp,
      date: "2 weeks ago",
      xp: 200,
      achieved: false
    }
  ];

  // Leaderboard data
  const leaderboard = [
    { rank: 1, name: "Savings Ninja", points: 2500, isUser: false },
    { rank: 2, name: "Budget Beast", points: 2200, isUser: false },
    { rank: 3, name: "You", points: 2100, isUser: true },
    { rank: 4, name: "Money Master", points: 2000, isUser: false },
    { rank: 5, name: "Finance Rookie", points: 1800, isUser: false }
  ];

  // Current challenges
  const challenges = [
    { 
      id: 1, 
      title: "No Food Delivery Week", 
      progress: 70, 
      reward: 200,
      endDate: "2 days left"
    },
    { 
      id: 2, 
      title: "Save ₹10,000", 
      progress: 45, 
      reward: 300,
      endDate: "12 days left"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-80">Financial Health Score</p>
                  <p className="text-3xl font-bold">{stats.financialHealthScore}</p>
                </div>
                <Trophy className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-80">Current Streak</p>
                  <p className="text-3xl font-bold">{stats.currentStreak} days</p>
                </div>
                <Flame className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-80">Savings Rate</p>
                  <p className="text-3xl font-bold">{stats.savingsRate}%</p>
                </div>
                <Target className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-80">Budget Score</p>
                  <p className="text-3xl font-bold">{stats.budgetAdherence}%</p>
                </div>
                <Zap className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Achievements */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map(achievement => (
                  <div 
                    key={achievement.id} 
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      achievement.achieved ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        achievement.achieved ? 'bg-green-500' : 'bg-gray-400'
                      }`}>
                        <achievement.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500">{achievement.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-600">+{achievement.xp} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Weekly Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      entry.isUser ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 flex items-center justify-center rounded-full ${
                        index < 3 ? 'bg-yellow-500 text-white' : 'bg-gray-200'
                      }`}>
                        {entry.rank}
                      </div>
                      <p className="font-medium">{entry.name}</p>
                    </div>
                    <p className="text-sm font-medium">{entry.points}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Challenges */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Active Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {challenges.map(challenge => (
                  <div key={challenge.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{challenge.title}</h3>
                        <p className="text-sm text-gray-500">{challenge.endDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-600">+{challenge.reward} XP</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{challenge.progress}% complete</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-gray-500">Level {stats.level}</p>
                <p className="font-medium">{stats.xp} / {stats.nextLevelXp} XP</p>
              </div>
              <p className="text-sm text-gray-500">Next: Level {stats.level + 1}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full"
                style={{ width: `${(stats.xp / stats.nextLevelXp) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}