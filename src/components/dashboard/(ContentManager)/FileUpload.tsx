'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Loader2, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  fileId?: string;
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  onFileUpload: (fileId: string) => void;
  activeSection: string;
  label?: string;
  acceptedTypes?: string;
  fileType: 'image' | 'file';
  onUploadingChange?: (isUploading: boolean) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  fileId,
  selectedFile,
  onFileSelect,
  onFileUpload,
  activeSection,
  label = "File",
  acceptedTypes = "*/*",
  fileType = 'file',
  onUploadingChange
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];

      // Check file type if acceptedTypes is specified
      if (acceptedTypes !== "*/*") {
        const acceptedTypesArray = acceptedTypes.split(',').map(type => type.trim());
        const isAccepted = acceptedTypesArray.some(acceptedType => {
          if (acceptedType.includes('*')) {
            const baseType = acceptedType.split('/')[0];
            return file.type.startsWith(baseType);
          }
          return file.type === acceptedType;
        });

        if (!isAccepted) {
          setUploadError(`File type not supported. Accepted types: ${acceptedTypes}`);
          return;
        }
      }

      handleFileSelect(file);
    }
  };

  const handleFileSelect = async (file: File | null) => {
    if (!file) {
      onFileSelect(null);
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    onFileSelect(file);
    onUploadingChange?.(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();
      onFileUpload(result.id);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Failed to upload file. Please try again.');
      onFileSelect(null);
    } finally {
      setIsUploading(false);
      onUploadingChange?.(false);
    }
  };

  const renderFilePreview = () => {
    if (!fileId) return null;

    if (fileType === 'image') {
      return (
        <div
          className="relative group"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={`aspect-video w-full max-w-md bg-muted rounded-lg overflow-hidden transition-all ${isDragging ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
            <img
              src={`/api/files/${fileId}`}
              alt={`${label} preview`}
              className="w-full h-full object-cover"
            />
          </div>
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-primary bg-opacity-20 rounded-lg">
              <div className="text-primary text-center font-medium">
                <Upload className="h-8 w-8 mx-auto mb-2" />
                <span>Drop to replace {label}</span>
              </div>
            </div>
          )}
          <Label
            htmlFor="file-upload"
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
      );
    } else {
      // File preview (PDF, etc.)
      return (
        <div
          className={`flex items-center gap-3 p-4 border rounded-lg transition-all ${isDragging ? 'border-primary bg-primary/5' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FileText className="h-8 w-8 text-blue-500" />
          <div className="flex-1">
            <p className="text-sm font-medium">File uploaded</p>
            <p className="text-xs text-gray-500">{label}</p>
            {isDragging && (
              <p className="text-xs text-primary font-medium">Drop to replace file</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`/api/files/${fileId}`, '_blank')}
            >
              <Download className="h-4 w-4 mr-1" />
              View
            </Button>
            <Label
              htmlFor="file-upload"
              className="cursor-pointer"
            >
              <Button variant="outline" size="sm" asChild>
                <span>
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-1" />
                      Replace
                    </>
                  )}
                </span>
              </Button>
            </Label>
          </div>
        </div>
      );
    }
  };

  const renderUploadArea = () => {
    if (fileId) return null;

    return (
      <Label
        htmlFor="file-upload"
        className={`flex flex-col items-center justify-center w-full max-w-md h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all ${isDragging
            ? 'border-primary bg-primary/10 border-solid'
            : 'border-gray-300 hover:bg-gray-50'
          } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        ) : (
          <>
            {fileType === 'image' ? (
              <Upload className={`h-8 w-8 mb-2 ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
            ) : (
              <FileText className={`h-8 w-8 mb-2 ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
            )}
            <span className={`text-sm ${isDragging ? 'text-primary font-medium' : 'text-gray-500'}`}>
              {isDragging
                ? `Drop ${label.toLowerCase()} here`
                : `Click to upload or drag & drop ${label.toLowerCase()}`
              }
            </span>
            {!isDragging && (
              <span className="text-xs text-gray-400 mt-1">
                {acceptedTypes !== "*/*" ? `Supported: ${acceptedTypes}` : ''}
              </span>
            )}
          </>
        )}
      </Label>
    );
  };

  return (
    <div className="col-span-2">
      <Label className="text-base font-medium mb-3 block">{label}</Label>
      <div className="space-y-4">
        <Input
          type="file"
          accept={acceptedTypes}
          onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
          className="hidden"
          id="file-upload"
          disabled={isUploading}
        />

        {renderFilePreview()}
        {renderUploadArea()}

        {uploadError && (
          <span className="text-sm text-red-500">
            {uploadError}
          </span>
        )}
      </div>
    </div>
  );
};
