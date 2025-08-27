'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  imageId?: string;
  selectedImage: File | null;
  onImageSelect: (file: File | null) => void;
  activeSection: string;
  label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  imageId,
  selectedImage,
  onImageSelect,
  activeSection,
  label = "Image"
}) => {
  // Only show image upload for relevant sections
  if (!['projects', 'personal', 'hero', 'achievements'].includes(activeSection)) {
    return null;
  }

  return (
    <div className="col-span-2">
      <Label className="text-base font-medium mb-3 block">{label}</Label>
      <div className="space-y-4">
        {imageId && (
          <div className="aspect-video w-full max-w-md bg-muted rounded-lg overflow-hidden">
            <img
              src={`/api/files/${imageId}`}
              alt={`${label} preview`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => onImageSelect(e.target.files?.[0] || null)}
            className="hidden"
            id="image-upload"
          />
          <Label
            htmlFor="image-upload"
            className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            Choose {label}
          </Label>
          {selectedImage && (
            <span className="text-sm text-muted-foreground">
              {selectedImage.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
