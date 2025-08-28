'use client';

import React, { useState, useEffect } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Users,
  FileText,
  Award,
  Briefcase,
  Image,
  Plus,
  Edit,
  ExternalLink,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  Star,
  FileImage,
  Settings,
  RefreshCw,
  Zap,
  Eye,
  MessageSquare
} from 'lucide-react';
import { dashboardService } from '@/lib/frontend/services/dashboard.service';
import { useToast } from '@/hooks/use-toast';

interface DashboardOverviewProps {
  onTabChange: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onTabChange }) => {
  const [overviewData, setOverviewData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadOverviewData();
  }, []);

  const loadOverviewData = async () => {
    try {
      setIsLoading(true);
      const data = await dashboardService.getDashboardOverview();
      setOverviewData(data);
    } catch (error) {
      console.error('Failed to load dashboard overview:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard overview"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      setIsRefreshing(true);
      const data = await dashboardService.getDashboardOverview();
      setOverviewData(data);
      toast({
        title: "Success",
        description: "Dashboard data refreshed successfully!"
      });
    } catch (error) {
      console.error('Failed to refresh dashboard:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to refresh dashboard data"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Briefcase className="h-4 w-4" />;
      case 'skill':
        return <Award className="h-4 w-4" />;
      case 'achievement':
        return <Star className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'text-blue-600';
      case 'skill':
        return 'text-green-600';
      case 'achievement':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return time.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <TabsContent value="overview" className="space-y-6">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </TabsContent>
    );
  }

  if (!overviewData) {
    return (
      <TabsContent value="overview" className="space-y-6">
        <div className="text-center py-8">
          <p className="text-gray-500">Failed to load dashboard data</p>
          <Button onClick={loadOverviewData} className="mt-4">
            Retry
          </Button>
        </div>
      </TabsContent>
    );
  }

  const { counters, recentUpdates, overviewStats } = overviewData;

  return (
    <TabsContent value="overview" className="space-y-6">
      {/* Header with Refresh */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your portfolio.
          </p>
        </div>
        <Button
          onClick={refreshData}
          disabled={isRefreshing}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">
              Portfolio Views
            </CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{overviewStats.totalViews}</div>
            <p className="text-xs text-green-700">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Portfolio visibility
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">
              Contact Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{overviewStats.totalMessages}</div>
            <p className="text-xs text-blue-700">
              <Activity className="inline h-3 w-3 mr-1" />
              Recent inquiries
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">
              Completion Rate
            </CardTitle>
            <Zap className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{overviewStats.completionRate}%</div>
            <p className="text-xs text-purple-700">
              <CheckCircle className="inline h-3 w-3 mr-1" />
              Project success rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Counters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counters.projects.total}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{counters.projects.active} active</span> • {counters.projects.featured} featured
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Skills & Categories
            </CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counters.skills.total}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{counters.skills.categories} categories</span> • {counters.skills.active} active
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Content Sections
            </CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(Object.values(counters.content) as number[]).reduce((a, b) => a + b, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{counters.content.achievements} achievements</span> • {counters.content.aboutCards} about cards
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Media Files
            </CardTitle>
            <Image className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counters.media.totalFiles}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{counters.media.images} images</span> • {counters.media.documents} documents
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Updates
            </CardTitle>
            <CardDescription>Latest changes to your portfolio content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUpdates.length > 0 ? (
                recentUpdates.map((update: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                    <div className={`${getActionColor(update.type)}`}>
                      {getActionIcon(update.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {update.title} {update.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimeAgo(update.timestamp)}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {update.type}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No recent updates</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-auto flex flex-col items-center p-4 space-y-2"
                onClick={() => onTabChange('content')}
              >
                <Plus className="h-6 w-6" />
                <span className="text-sm">Add Content</span>
              </Button>

              <Button
                variant="outline"
                className="h-auto flex flex-col items-center p-4 space-y-2"
                onClick={() => onTabChange('media')}
              >
                <FileImage className="h-6 w-6" />
                <span className="text-sm">Upload Media</span>
              </Button>

              <Button
                variant="outline"
                className="h-auto flex flex-col items-center p-4 space-y-2"
                onClick={() => onTabChange('content')}
              >
                <Edit className="h-6 w-6" />
                <span className="text-sm">Edit Projects</span>
              </Button>

              <Button
                variant="outline"
                className="h-auto flex flex-col items-center p-4 space-y-2"
                onClick={() => window.open('/', '_blank')}
              >
                <ExternalLink className="h-6 w-6" />
                <span className="text-sm">View Site</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Completion Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Portfolio Status
          </CardTitle>
          <CardDescription>Overview of your portfolio completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{counters.projects.active}</div>
              <p className="text-xs text-muted-foreground">Active Projects</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{counters.skills.active}</div>
              <p className="text-xs text-muted-foreground">Active Skills</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{counters.content.achievements}</div>
              <p className="text-xs text-muted-foreground">Achievements</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{overviewStats.completionRate}%</div>
              <p className="text-xs text-muted-foreground">Completion Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
