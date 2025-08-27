'use client';

import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { ContentManagerProvider } from './ContentManagerContext';
import { MessageAlert } from './MessageAlert';
import { EditFormModal } from './EditFormModal';
import { SectionTabs } from './SectionTabs';
import { ContentHeader } from './ContentHeader';
import { ContentList } from './ContentList';

const ContentManagerInner: React.FC = () => {
  return (
    <TabsContent value="content" className="space-y-6">
      <MessageAlert />
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
  return (
    <ContentManagerProvider>
      <ContentManagerInner />
    </ContentManagerProvider>
  );
};
