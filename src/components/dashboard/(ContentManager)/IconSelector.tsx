'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import renderLucideIcon from '@/lib/frontend/utils/renderLucideIcon';

interface IconSelectorProps {
  value: string;
  onChange: (iconName: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

// Get all available Lucide icon names
const getAvailableIcons = () => {
  const iconNames = Object.keys(LucideIcons).filter(
    (key) =>
      key !== 'createLucideIcon' &&
      key !== 'Icon'
  );
  return iconNames;
};

export const IconSelector: React.FC<IconSelectorProps> = ({ value, onChange, isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const availableIcons = getAvailableIcons();

  const filteredIcons = availableIcons.filter(iconName =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Icon</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Current Selection */}
          {value && (
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
              <span className="text-sm font-medium">Selected:</span>
              {renderLucideIcon(value,20)}
              <Badge variant="secondary">{value}</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onChange('')}
              >
                Clear
              </Button>
            </div>
          )}

          {/* Icon Grid */}
          <div className="grid grid-cols-8 gap-2 max-h-96 overflow-y-auto p-2">
            {filteredIcons.slice(0, 100).map((iconName) => (
              <Button
                key={iconName}
                variant={value === iconName ? "default" : "outline"}
                className="h-12 w-12 p-2"
                onClick={() => {
                  onChange(iconName);
                  onClose();
                }}
                title={iconName}
              >
                {renderLucideIcon(iconName,20)}
              </Button>
            ))}
          </div>

          {filteredIcons.length > 100 && (
            <p className="text-sm text-gray-500 text-center">
              Showing first 100 results. Use search to find more specific icons.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
