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
  Star
} from 'lucide-react';

interface DashboardLayoutProps {
  onLogout: () => void;
  children: React.ReactNode;
  stats?: {
    totalViews: number;
    totalMessages: number;
    totalProjects: number;
    totalSkills: number;
    unreadMessages: number;
  };
}

export const DashboardLayout = ({ onLogout, children, stats }: DashboardLayoutProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const defaultStats = [
    {
      title: 'Total Views',
      value: stats?.totalViews?.toLocaleString() || '0',
      change: 'Live Data',
      icon: <BarChart3 className="h-4 w-4" />,
      color: 'text-blue-600'
    },
    {
      title: 'Contact Messages',
      value: stats?.totalMessages?.toString() || '0',
      change: `${stats?.unreadMessages || 0} unread`,
      icon: <Mail className="h-4 w-4" />,
      color: 'text-green-600'
    },
    {
      title: 'Projects',
      value: stats?.totalProjects?.toString() || '0',
      change: 'Active',
      icon: <Briefcase className="h-4 w-4" />,
      color: 'text-purple-600'
    },
    {
      title: 'Skills',
      value: stats?.totalSkills?.toString() || '0',
      change: 'Categories',
      icon: <Star className="h-4 w-4" />,
      color: 'text-orange-600'
    }
  ];

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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
          
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {defaultStats.map((stat: any, index: number) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={stat.color}>
                      {stat.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">{stat.change}</span> from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates to your portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Hero section updated</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New project added</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Skills section updated</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-auto flex flex-col items-center p-4"
                      onClick={() => setActiveTab('content')}
                    >
                      <User className="h-6 w-6 mb-2" />
                      <span className="text-sm">Edit Profile</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto flex flex-col items-center p-4"
                      onClick={() => setActiveTab('projects')}
                    >
                      <Briefcase className="h-6 w-6 mb-2" />
                      <span className="text-sm">Add Project</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto flex flex-col items-center p-4"
                      onClick={() => setActiveTab('content')}
                    >
                      <Award className="h-6 w-6 mb-2" />
                      <span className="text-sm">Add Skill</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto flex flex-col items-center p-4"
                      onClick={() => setActiveTab('messages')}
                    >
                      <Mail className="h-6 w-6 mb-2" />
                      <span className="text-sm">Messages</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tab contents will be passed as children */}
          {children}
        </Tabs>
      </div>
    </div>
  );
};
