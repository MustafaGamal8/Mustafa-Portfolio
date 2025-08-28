'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';
import { useContentManager } from './ContentManagerContext';
import { FormField } from './FormField';
import { ImageUpload } from './ImageUpload';
import { FileUpload } from './FileUpload';
import { getFieldsForSection } from './fieldConfigs';

export const EditFormModal: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);

  const {
    editingItem,
    setEditingItem,
    isModalOpen,
    setIsModalOpen,
    selectedImage,
    setSelectedImage,
    editLanguage,
    isLoading,
    getCurrentSection,
    handleSave,
    activeSection
  } = useContentManager();

  if (!editingItem || !isModalOpen) return null;

  const currentSection = getCurrentSection();
  if (!currentSection) return null;

  const fields = getFieldsForSection(currentSection.type);

  const handleFieldChange = (fieldName: string, value: any) => {
    setEditingItem((prev: any) => ({ ...prev, [fieldName]: value }));
  };

  const renderFieldComponent = (field: any) => {
    // Handle image upload fields
    if (field.type === 'image') {
      const getImageFieldName = () => {
        switch (activeSection) {
          case 'projects':
            return 'imageId';
          case 'personal':
            return 'imageId';
          case 'hero':
            return 'profileImageId';
          case 'achievements':
            return 'iconId';
          default:
            return 'imageId';
        }
      };

      const handleImageUpload = (uploadedImageId: string) => {
        const fieldName = getImageFieldName();
        setEditingItem((prev: any) => ({ ...prev, [fieldName]: uploadedImageId }));
      };

      return (
        <ImageUpload
          key={field.name}
          imageId={editingItem[getImageFieldName()]}
          selectedImage={selectedImage}
          onImageSelect={setSelectedImage}
          onImageUpload={handleImageUpload}
          onUploadingChange={setIsUploading}
          activeSection={activeSection}
          label={currentSection.type === 'hero' ? 'Profile Image' :
            currentSection.type === 'achievements' ? 'Icon' : 'Image'}
        />
      );
    }

    // Handle file upload fields
    if (field.type === 'file') {
      const handleFileUpload = (uploadedFileId: string) => {
        setEditingItem((prev: any) => ({ ...prev, [field.name]: uploadedFileId }));
      };

      return (
        <FileUpload
          key={field.name}
          fileId={editingItem[field.name]}
          selectedFile={null}
          onFileSelect={() => { }} // Not needed for this implementation
          onFileUpload={handleFileUpload}
          onUploadingChange={setIsUploading}
          activeSection={activeSection}
          label={field.label}
          acceptedTypes="application/pdf,.pdf"
          fileType="file"
        />
      );
    }

    // Regular form field
    return (
      <FormField
        key={field.name}
        field={field}
        value={editingItem[field.name]}
        onChange={(value) => handleFieldChange(field.name, value)}
        editLanguage={editLanguage}
      />
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" dir={editLanguage === 'AR' ? 'rtl' : 'ltr'}>
        <div className="space-y-6" key={`${editingItem?.id || 'new'}-${editLanguage}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {currentSection.icon}
              <h3 className="text-xl font-semibold">
                {editingItem.id ? 'Edit' : 'Add New'} {currentSection.label}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" key={`form-${editLanguage}`}>
            {fields.map((field) => renderFieldComponent(field))}
          </div>

          <Separator />

          <div className="flex items-center justify-between pt-4 border-t" dir='ltr'>
            <div className="flex items-center space-x-3">
              <Switch
                checked={editingItem.isActive !== false}
                onCheckedChange={(checked) => setEditingItem((prev: any) => ({ ...prev, isActive: checked }))}
                className="data-[state=checked]:bg-primary"
              />
              <Label className="text-sm font-medium">Active</Label>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingItem(null);
                  setSelectedImage(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={() => handleSave(editingItem)} disabled={isLoading || isUploading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : isUploading ? 'Uploading...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
