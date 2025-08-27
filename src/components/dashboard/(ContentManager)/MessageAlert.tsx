'use client';

import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useContentManager } from './ContentManagerContext';

export const MessageAlert: React.FC = () => {
  const { message } = useContentManager();

  if (!message) return null;

  return (
    <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
      {message.type === 'success' ? (
        <CheckCircle className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertDescription>{message.text}</AlertDescription>
    </Alert>
  );
};
