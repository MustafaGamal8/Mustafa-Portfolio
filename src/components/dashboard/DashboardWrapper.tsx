'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { ContentManager } from './(ContentManager)/ContentManager';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Trash2,
  Eye,
  Clock,
  ExternalLink,
  Settings,
  Save,
  Plus,
  Edit,
  BarChart3,
  Users,
  FolderOpen,
  Award,
  Key,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { authService } from '@/lib/frontend/services/auth.service';
import { portfolioService } from '@/lib/frontend/services/portfolio.service';
import { usePortfolioSection } from '@/hooks/usePortfolioSection';

export const DashboardWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Use portfolio service to get all sections at once
      const response = await portfolioService.getPortfolioSections({
        lang: 'EN',
        sections: [
          'personalInfo',
          'heroContent',
          'aboutCards',
          'skillCategories',
          'skills',
          'projects',
          'achievements',
          'contactInfo',
          'socialLinks'
        ]
      });

      if (response.success && response.data) {
        setPortfolioData(response.data);

        // Calculate stats from the loaded data
        const calculatedStats = {
          totalProjects: response.data.projects?.length || 0,
          activeProjects: response.data.projects?.filter((p: any) => p.isActive)?.length || 0,
          featuredProjects: response.data.projects?.filter((p: any) => p.isFeatured)?.length || 0,
          totalSkills: response.data.skills?.length || 0,
          activeSkills: response.data.skills?.filter((s: any) => s.isActive)?.length || 0,
          totalAboutCards: response.data.aboutCards?.length || 0,
          totalAchievements: response.data.achievements?.length || 0,
          totalSkillCategories: response.data.skillCategories?.length || 0,
          totalContactInfo: response.data.contactInfo?.length || 0,
          totalSocialLinks: response.data.socialLinks?.length || 0,
          personalInfoCount: response.data.personalInfo?.length || 0,
          heroContentCount: response.data.heroContent?.length || 0
        };

        setStats(calculatedStats);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleLogout = async () => {
    await authService.logout();
    window.location.reload();
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
      setTimeout(() => setPasswordMessage(null), 3000);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters long' });
      setTimeout(() => setPasswordMessage(null), 3000);
      return;
    }

    try {
      setIsChangingPassword(true);
      // Note: You may need to get the current user ID from your auth context or local storage
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      await authService.changePassword(user.id, passwordData.oldPassword, passwordData.newPassword);

      setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });

      setTimeout(() => {
        setPasswordMessage(null);
        setIsPasswordModalOpen(false);
      }, 2000);
    } catch (error: any) {
      console.error('Failed to change password:', error);
      const errorMessage = error.response?.data?.message || 'Failed to change password. Please try again.';
      setPasswordMessage({ type: 'error', text: errorMessage });
      setTimeout(() => setPasswordMessage(null), 3000);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const resetPasswordForm = () => {
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordMessage(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }



  return (
    <DashboardLayout onLogout={handleLogout} stats={stats}>
      <ContentManager />

      {/* Settings Tab */}
      <TabsContent value="settings" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Dashboard Settings
            </CardTitle>
            <CardDescription>
              Configure your dashboard preferences and portfolio settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Site Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Portfolio Status</span>
                    <Badge variant="default">Live</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Update</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Default Language</span>
                    <Badge variant="outline">English</Badge>
                  </div>
                  <Button size="sm" className="w-full" onClick={() => window.open('/', '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Portfolio
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Data Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Projects</span>
                    <Badge variant="secondary">{stats?.totalProjects || 0}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Projects</span>
                    <Badge variant="secondary">{stats?.activeProjects || 0}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Skills</span>
                    <Badge variant="secondary">{stats?.totalSkills || 0}</Badge>
                  </div>
                  <Button size="sm" variant="outline" className="w-full" onClick={loadDashboardData}>
                    <Save className="h-4 w-4 mr-2" />
                    Refresh Data
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" size="sm" onClick={loadDashboardData}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Refresh Stats
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open('/', '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Preview Site
                  </Button>
                  <Dialog open={isPasswordModalOpen} onOpenChange={(open) => {
                    setIsPasswordModalOpen(open);
                    if (!open) resetPasswordForm();
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Key className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Key className="h-5 w-5" />
                          Change Password
                        </DialogTitle>
                        <DialogDescription>
                          Enter your current password and choose a new one.
                        </DialogDescription>
                      </DialogHeader>

                      {passwordMessage && (
                        <Alert variant={passwordMessage.type === 'error' ? 'destructive' : 'default'}>
                          {passwordMessage.type === 'success' ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                          <AlertDescription>{passwordMessage.text}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="oldPassword">Current Password</Label>
                          <Input
                            id="oldPassword"
                            type="password"
                            value={passwordData.oldPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))}
                            placeholder="Enter current password"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            placeholder="Enter new password"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            placeholder="Confirm new password"
                          />
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsPasswordModalOpen(false);
                              resetPasswordForm();
                            }}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleChangePassword}
                            disabled={isChangingPassword || !passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                            className="flex-1"
                          >
                            {isChangingPassword ? 'Changing...' : 'Change Password'}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </TabsContent>

    </DashboardLayout>
  );
};
