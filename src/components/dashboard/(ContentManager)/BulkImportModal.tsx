'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { projectService } from '@/lib/frontend/services/project.service';
import { useContentManager } from './ContentManagerContext';

export const BulkImportModal: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void }> = ({ open, onOpenChange }) => {
  const [payload, setPayload] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loadCurrentSectionItems, showToast } = useContentManager();

  const handleImport = async () => {
    let parsed;
    try {
      parsed = JSON.parse(payload);
      if (!Array.isArray(parsed)) {
        showToast({ variant: 'destructive', title: 'Invalid JSON', description: 'Expected a JSON array of project objects.' });
        return;
      }
    } catch (err) {
      showToast({ variant: 'destructive', title: 'JSON parse error', description: (err as Error).message });
      return;
    }

    try {
      setIsLoading(true);
      const result = await projectService.bulkCreate(parsed as any);
      await loadCurrentSectionItems('projects', true);
      showToast({ title: 'Import successful', description: `Imported ${Array.isArray(parsed) ? parsed.length : 0} projects.` });
      setPayload('');
      onOpenChange(false);
    } catch (err) {
      showToast({ variant: 'destructive', title: 'Import failed', description: (err as Error).message || 'Check server logs.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Bulk import projects</h3>
          <p className="text-sm text-muted-foreground">Paste a JSON array of project objects (AR/EN localized structure). Example: <code>[{`{ AR: {...}, EN: {...}, status: 'COMPLETED', category: 'web', order: 1 }`} ]</code></p>
          <Textarea value={payload} onChange={(e) => setPayload(e.target.value)} className="h-56 font-mono" />

          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={isLoading}>Cancel</Button>
            <Button onClick={handleImport} disabled={isLoading}>
              {isLoading ? 'Importing...' : 'Import'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
