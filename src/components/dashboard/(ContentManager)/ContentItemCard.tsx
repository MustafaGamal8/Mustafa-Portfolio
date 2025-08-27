'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit3, Trash2, Globe } from 'lucide-react';
import { useContentManager } from './ContentManagerContext';
import * as LucideIcons from 'lucide-react';
import renderLucideIcon from '@/lib/frontend/utils/renderLucideIcon';

interface ContentItemCardProps {
  item: any;
}

export const ContentItemCard: React.FC<ContentItemCardProps> = ({ item }) => {
  const {
    activeSection,
    editLanguage,
    setEditingItem,
    setIsModalOpen,
    handleDelete
  } = useContentManager();

  const handleEdit = () => {
    setEditingItem(item);
    setIsModalOpen(true);
  };



  const getItemTitle = () => {
    return item.title || item.name || item.firstName || `${activeSection} Item`;
  };

  const getItemDescription = () => {
    if (!item.description) return null;
    return item.description.length > 100
      ? `${item.description.slice(0, 100)}...`
      : item.description;
  };

  const getRelevantBadges = () => {
    const badges = [];

    if (item.category) badges.push({ label: 'Category', value: item.category });
    if (item.level) badges.push({ label: 'Level', value: item.level });
    if (item.status) badges.push({ label: 'Status', value: item.status });
    if (item.value) badges.push({ label: 'Value', value: item.value });
    if (item.type && activeSection === 'contact') badges.push({ label: 'Type', value: item.type });
    if (item.subtitle) badges.push({ label: 'Subtitle', value: item.subtitle });

    return badges;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-2">
                {item.icon && renderLucideIcon(item.icon)}
                <h4 className="font-medium">{getItemTitle()}</h4>
              </div>
              <Badge variant={item.isActive !== false ? 'default' : 'secondary'}>
                {item.isActive !== false ? 'Active' : 'Inactive'}
              </Badge>
              {item.order && (
                <Badge variant="outline">#{item.order}</Badge>
              )}
              <Badge variant="outline" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {editLanguage}
              </Badge>
            </div>

            <div className="text-sm space-y-2">
              {getItemDescription() && (
                <p className="text-muted-foreground">
                  {getItemDescription()}
                </p>
              )}

              {/* Show relevant fields based on section type */}
              <div className="flex flex-wrap gap-2">
                {getRelevantBadges().map((badge, index) => (
                  <Badge key={index} variant="outline">
                    {badge.label}: {badge.value}
                  </Badge>
                ))}
                {item.isFeatured && (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                    Featured
                  </Badge>
                )}
                {item.isPrimary && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Primary
                  </Badge>
                )}

                {/* Display array fields */}
                {item.technologies && Array.isArray(item.technologies) && item.technologies.length > 0 && (
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Technologies: {item.technologies.slice(0, 2).join(', ')}{item.technologies.length > 2 ? '...' : ''}
                  </Badge>
                )}
                {item.features && Array.isArray(item.features) && item.features.length > 0 && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                    Features: {item.features.slice(0, 2).join(', ')}{item.features.length > 2 ? '...' : ''}
                  </Badge>
                )}
                {item.dynamicTexts && Array.isArray(item.dynamicTexts) && item.dynamicTexts.length > 0 && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Dynamic: {item.dynamicTexts.slice(0, 2).join(', ')}{item.dynamicTexts.length > 2 ? '...' : ''}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(item.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
