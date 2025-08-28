'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  imageId?: string;
  selectedImage: File | null;
  onImageSelect: (file: File | null) => void;
  onImageUpload: (imageId: string) => void;
  activeSection: string;
  label?: string;
  onUploadingChange?: (isUploading: boolean) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  imageId,
  selectedImage,
  onImageSelect,
  onImageUpload,
  activeSection,
  label = "Image",
  onUploadingChange
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Only show image upload for relevant sections
  if (!['projects', 'personal', 'hero', 'achievements'].includes(activeSection)) {
    return null;
  }

  const handleFileSelect = async (file: File | null) => {
    if (!file) {
      onImageSelect(null);
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    onImageSelect(file);
    onUploadingChange?.(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();

      // Call the callback to update the form field with the image ID
      onImageUpload(result.id);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Failed to upload image. Please try again.');
      onImageSelect(null);
    } finally {
      setIsUploading(false);
      onUploadingChange?.(false);
    }
  };

  return (
    <div className="col-span-2">
      <Label className="text-base font-medium mb-3 block">{label}</Label>
      <div className="space-y-4">
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
          className="hidden"
          id="image-upload"
          disabled={isUploading}
        />

        {imageId ? (
          <div className="relative group">
            <div className="aspect-video w-full max-w-md bg-muted rounded-lg overflow-hidden">
              <img
                src={`/api/files/${imageId}`}
                alt={`${label} preview`}
                className="w-full h-full object-cover"
              />
            </div>
            <Label
              htmlFor="image-upload"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg"
            >
              <div className="text-white text-center">
                {isUploading ? (
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                ) : (
                  <>
                    <Upload className="h-6 w-6 mx-auto mb-2" />
                    <span>Change {label}</span>
                  </>
                )}
              </div>
            </Label>
          </div>
        ) : (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center w-full max-w-md h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            ) : (
              <>
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click to upload {label.toLowerCase()}</span>
              </>
            )}
          </Label>
        )}

        {uploadError && (
          <span className="text-sm text-red-500">
            {uploadError}
          </span>
        )}
      </div>
    </div>
  );
};
