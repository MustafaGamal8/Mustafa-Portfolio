'use client';

import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { ContentManagerProvider } from './ContentManagerContext';
import { EditFormModal } from './EditFormModal';
import { SectionTabs } from './SectionTabs';
import { ContentHeader } from './ContentHeader';
import { ContentList } from './ContentList';
import { useToast } from '@/hooks/use-toast';

const ContentManagerInner: React.FC = () => {
  return (
    <TabsContent value="content" className="space-y-6">
      <EditFormModal />

      {/* Section Tabs */}
      <SectionTabs />

      {/* Content Management Area */}
      <ContentHeader />

      {/* Content Items */}
      <ContentList />
    </TabsContent>
  );
};

export const ContentManager: React.FC = () => {
  const { toast } = useToast();

  const showToast = (toastData: { title: string; description: string; variant?: 'default' | 'destructive' }) => {
    toast(toastData);
  };

  return (
    <ContentManagerProvider showToast={showToast}>
      <ContentManagerInner />
    </ContentManagerProvider>
  );
};
