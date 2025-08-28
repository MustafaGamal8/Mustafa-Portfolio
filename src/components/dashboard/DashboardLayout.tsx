'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  LogOut,
  Globe,
  User,
  Briefcase,
  Award,
  Mail,
  Star,
  Image
} from 'lucide-react';

interface DashboardLayoutProps {
  onLogout: () => void;
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  stats?: {
    totalViews: number;
    totalMessages: number;
    totalProjects: number;
    totalSkills: number;
    unreadMessages: number;
  };
}

export const DashboardLayout = ({ onLogout, children, activeTab: controlledActiveTab, onTabChange, stats }: DashboardLayoutProps) => {
  const [internalActiveTab, setInternalActiveTab] = useState('overview');
  const activeTab = controlledActiveTab || internalActiveTab;

  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold  mx-2">Mustafa Portfolio Dashboard</h1>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Admin Panel
              </Badge>
            </div>

            <div className="flex items-center space-x-4 gap-5">
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                View Site
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Welcome
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>



          {/* Other tab contents will be passed as children */}
          {children}
        </Tabs>
      </div>
    </div>
  );
};
