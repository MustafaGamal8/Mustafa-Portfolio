'use client';

import React, { useEffect, useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  ExternalLink,
  User,
  Code,
  Palette,
  Zap
} from 'lucide-react';

interface WelcomeTabProps {
  onTabChange: (tab: string) => void;
}

export const WelcomeTab: React.FC<WelcomeTabProps> = ({ onTabChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const quickActions = [
    { icon: Code, label: "Manage Content", action: () => onTabChange("content"), color: "bg-blue-500" },
    { icon: Palette, label: "Media Files", action: () => onTabChange("media"), color: "bg-purple-500" },
    { icon: User, label: "Settings", action: () => onTabChange("settings"), color: "bg-green-500" }
  ];

  return (
    <TabsContent value="overview" className="space-y-6">
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          {/* Main Welcome */}
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
            <div className="relative">
              <h1 className="text-6xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                {getGreeting()}
              </h1>
              <div className="absolute -top-2 -right-2 animate-pulse">
                <Sparkles className="h-8 w-8 text-yellow-500" />
              </div>
            </div>

            <h2 className="text-4xl font-semibold text-gray-800 mt-4">
              Welcome Back, <span className="text-primary">Mustafa</span>
            </h2>

            <p className="text-xl text-muted-foreground mt-4">
              Ready to craft something amazing today?
            </p>
          </div>

          {/* Animated Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
                onClick={action.action}
              >
                <CardContent className="p-6 text-center">
                  <div className={`${action.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:rotate-12`}>
                    <action.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">{action.label}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Click to {action.label.toLowerCase()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className={`transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => window.open('/', '_blank')}
              >
                <ExternalLink className="h-5 w-5" />
                View Live Portfolio
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="gap-2 hover:bg-primary/10"
                onClick={() => onTabChange("content")}
              >
                <Zap className="h-5 w-5" />
                Start Creating
              </Button>
            </div>
          </div>

          {/* Floating Animation Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-ping delay-2000"></div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};
