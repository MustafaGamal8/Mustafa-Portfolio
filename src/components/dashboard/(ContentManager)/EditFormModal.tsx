'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Save, Languages, ArrowRightLeft, Sparkles } from 'lucide-react';
import { useContentManager } from './ContentManagerContext';
import { FormField } from './FormField';
import { ImageUpload } from './ImageUpload';
import { FileUpload } from './FileUpload';
import {
  buildBilingualDraft,
  cleanDraft,
  getBilingualFieldGroups,
  syncLocalizedDraft,
  SupportedLanguage,
} from './bilingualContent';

const languageOrder: SupportedLanguage[] = ['EN', 'AR'];

export const EditFormModal: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [draft, setDraft] = useState<any>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatingFieldKey, setTranslatingFieldKey] = useState<string | null>(null);
  const draftInitKeyRef = useRef<string | null>(null);

  const {
    editingItem,
    setEditingItem,
    isModalOpen,
    setIsModalOpen,
    selectedImage,
    setSelectedImage,
    isLoading,
    getCurrentSection,
    contentData,
    loadCurrentSectionItems,
    showToast,
  } = useContentManager();

  const currentSection = getCurrentSection();

  const { sharedFields, localizedFields } = useMemo(() => {
    if (!currentSection) return { sharedFields: [], localizedFields: [] };
    return getBilingualFieldGroups(currentSection.type);
  }, [currentSection]);

  useEffect(() => {
    if (!currentSection || !editingItem || !isModalOpen) return;

    const draftKey = `${currentSection.type}:${editingItem.id || 'new'}`;
    if (draftInitKeyRef.current === draftKey) return;

    const sectionItems = contentData[currentSection.dataKey] || { EN: [], AR: [] };
    setDraft(buildBilingualDraft(currentSection.type, editingItem, sectionItems));
    draftInitKeyRef.current = draftKey;
  }, [currentSection, editingItem, isModalOpen, contentData]);

  useEffect(() => {
    if (!isModalOpen) {
      draftInitKeyRef.current = null;
    }
  }, [isModalOpen]);

  if (!editingItem || !isModalOpen || !currentSection || !draft) return null;

  const handleSharedChange = (fieldName: string, value: any) => {
    setDraft((prev: any) => ({
      ...prev,
      shared: {
        ...prev.shared,
        [fieldName]: value
      }
    }));
  };

  const handleLocalizedChange = (language: SupportedLanguage, fieldName: string, value: any) => {
    setDraft((prev: any) => ({
      ...prev,
      localized: {
        ...prev.localized,
        [language]: {
          ...prev.localized[language],
          [fieldName]: value
        }
      }
    }));
  };

  const handleCopyLanguage = (source: SupportedLanguage) => {
    const target: SupportedLanguage = source === 'EN' ? 'AR' : 'EN';
    setDraft((prev: any) => syncLocalizedDraft(currentSection.type, prev, source, target));

    showToast({
      title: 'Translation draft synced',
      description: `${source} content was copied into ${target}. Review the translated text before saving.`
    });
  };

  const handleTranslateLanguage = async (source: SupportedLanguage) => {
    const target: SupportedLanguage = source === 'EN' ? 'AR' : 'EN';
    const sourceValues = draft?.localized?.[source];

    if (!sourceValues || Object.keys(sourceValues).length === 0) {
      showToast({
        variant: 'destructive',
        title: 'No text to translate',
        description: `Fill ${source} fields first, then run translation.`,
      });
      return;
    }

    try {
      setIsTranslating(true);

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          direction: source === 'EN' ? 'EN_TO_AR' : 'AR_TO_EN',
          values: sourceValues,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'Translation service failed');
      }

      setDraft((prev: any) => ({
        ...prev,
        localized: {
          ...prev.localized,
          [target]: {
            ...(result.values || {}),
          },
        },
      }));

      showToast({
        title: 'Translated',
        description: `${source} text was translated to ${target}. Review before saving.`,
      });
    } catch (error) {
      showToast({
        variant: 'destructive',
        title: 'Translation failed',
        description: error instanceof Error ? error.message : 'Unable to translate right now',
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTranslateField = async (targetLanguage: SupportedLanguage, fieldName: string) => {
    const sourceLanguage: SupportedLanguage = targetLanguage === 'EN' ? 'AR' : 'EN';
    const sourceValue = draft?.localized?.[sourceLanguage]?.[fieldName];

    if (sourceValue === undefined || sourceValue === null || sourceValue === '') {
      showToast({
        variant: 'destructive',
        title: 'No source value',
        description: `Add ${sourceLanguage} value for ${fieldName} first, then translate.`,
      });
      return;
    }

    const currentFieldKey = `${targetLanguage}:${fieldName}`;

    try {
      setTranslatingFieldKey(currentFieldKey);

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          direction: sourceLanguage === 'EN' ? 'EN_TO_AR' : 'AR_TO_EN',
          values: {
            [fieldName]: sourceValue,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'Translation service failed');
      }

      const translatedValue = result?.values?.[fieldName];

      setDraft((prev: any) => ({
        ...prev,
        localized: {
          ...prev.localized,
          [targetLanguage]: {
            ...prev.localized[targetLanguage],
            [fieldName]: translatedValue ?? prev.localized[targetLanguage]?.[fieldName],
          },
        },
      }));

      showToast({
        title: 'Field translated',
        description: `${fieldName} was translated from ${sourceLanguage} to ${targetLanguage}.`,
      });
    } catch (error) {
      showToast({
        variant: 'destructive',
        title: 'Field translation failed',
        description: error instanceof Error ? error.message : 'Unable to translate field right now',
      });
    } finally {
      setTranslatingFieldKey(null);
    }
  };

  const handleSharedImageUpload = (fieldName: string, uploadedImageId: string) => {
    handleSharedChange(fieldName, uploadedImageId);
  };

  const handleSharedFileUpload = (fieldName: string, uploadedFileId: string) => {
    handleSharedChange(fieldName, uploadedFileId);
  };

  const normalizeForDiff = (value: any): string => {
    if (value instanceof Date) return value.toISOString();
    if (Array.isArray(value)) return JSON.stringify(value.map(normalizeForDiff));
    if (value && typeof value === 'object') {
      const normalized: Record<string, any> = {};
      Object.entries(value).forEach(([key, nestedValue]) => {
        normalized[key] = normalizeForDiff(nestedValue);
      });
      return JSON.stringify(normalized);
    }
    return JSON.stringify(value ?? null);
  };

  const buildProjectUpdatePayload = (language: SupportedLanguage, nextPayload: Record<string, any>) => {
    const original = draft.originals?.[language] || {};
    const diff: Record<string, any> = { id: draft.ids?.[language] };

    Object.entries(nextPayload).forEach(([key, nextValue]) => {
      if (key === 'id' || key === 'lang') return;

      const currentValue = original?.[key];
      if (normalizeForDiff(currentValue) !== normalizeForDiff(nextValue)) {
        diff[key] = nextValue;
      }
    });

    return diff;
  };

  const saveBilingualDraft = async () => {
    if (!currentSection) return;

    const baseShared = cleanDraft(draft.shared) || {};
    const baseMeta = cleanDraft(draft.meta) || {};

    for (const language of languageOrder) {
      const existingId = draft.ids?.[language];
      const localizedValues = cleanDraft(draft.localized?.[language]) || {};
      const payload = {
        ...baseMeta,
        ...baseShared,
        ...localizedValues,
        lang: language,
      };

      if (existingId) {
        const updatePayload = currentSection.type === 'projects'
          ? buildProjectUpdatePayload(language, { ...payload, id: existingId })
          : { id: existingId, ...payload };

        if (Object.keys(updatePayload).length > 1) {
          await currentSection.service.update(updatePayload as any);
        }
      } else {
        await currentSection.service.create(payload);
      }
    }

    await loadCurrentSectionItems(currentSection.type, true);
    setEditingItem(null);
    setIsModalOpen(false);
    setSelectedImage(null);
    setDraft(null);

    showToast({
      title: 'Success',
      description: 'Both languages were saved together successfully.'
    });
  };

  const renderSharedField = (field: any) => {
    if (field.type === 'image') {
      const imageFieldName = field.name;

      return (
        <ImageUpload
          key={field.name}
          imageId={draft.shared?.[imageFieldName]}
          selectedImage={selectedImage}
          onImageSelect={setSelectedImage}
          onImageUpload={(uploadedImageId) => handleSharedImageUpload(imageFieldName, uploadedImageId)}
          onUploadingChange={setIsUploading}
          activeSection={currentSection.type}
          label={field.label}
        />
      );
    }

    if (field.type === 'file') {
      return (
        <FileUpload
          key={field.name}
          fileId={draft.shared?.[field.name]}
          selectedFile={null}
          onFileSelect={() => { }}
          onFileUpload={(uploadedFileId) => handleSharedFileUpload(field.name, uploadedFileId)}
          onUploadingChange={setIsUploading}
          activeSection={currentSection.type}
          label={field.label}
          acceptedTypes="application/pdf,.pdf"
          fileType="file"
        />
      );
    }

    return (
      <FormField
        key={field.name}
        field={field}
        value={draft.shared?.[field.name]}
        onChange={(value) => handleSharedChange(field.name, value)}
        editLanguage={draft.fallbackLanguage}
      />
    );
  };

  const renderLocalizedField = (language: SupportedLanguage, field: any) => {
    const sourceLanguage: SupportedLanguage = language === 'EN' ? 'AR' : 'EN';
    const fieldKey = `${language}:${field.name}`;
    const isFieldTranslating = translatingFieldKey === fieldKey;

    return (
      <div
        key={`${language}-${field.name}`}
        className={`space-y-2 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">{field.label}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            disabled={isTranslating || isFieldTranslating}
            onClick={() => handleTranslateField(language, field.name)}
          >
            <ArrowRightLeft className="h-3 w-3 mr-1" />
            {isFieldTranslating ? 'Translating...' : `From ${sourceLanguage}`}
          </Button>
        </div>

        <FormField
          field={field}
          value={draft.localized?.[language]?.[field.name]}
          onChange={(value) => handleLocalizedChange(language, field.name, value)}
          editLanguage={language}
        />
      </div>
    );
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        setIsModalOpen(open);
        if (!open) {
          setEditingItem(null);
          setSelectedImage(null);
          setDraft(null);
        }
      }}
    >
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto" dir="ltr">
        <div className="space-y-6" key={`${editingItem?.id || 'new'}-${currentSection.type}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {currentSection.icon}
              <div>
                <h3 className="text-xl font-semibold">
                  {editingItem.id ? 'Edit' : 'Add New'} {currentSection.label}
                </h3>
                <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
                  <Languages className="h-4 w-4" />
                  Edit EN and AR together. Use Translate for real API translation or Sync to copy values.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="default"
                className="gap-2"
                disabled={isTranslating}
                onClick={() => handleTranslateLanguage('EN')}
              >
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Translate EN to AR
              </Button>
              <Button
                type="button"
                variant="default"
                className="gap-2"
                disabled={isTranslating}
                onClick={() => handleTranslateLanguage('AR')}
              >
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Translate AR to EN
              </Button>
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                disabled={isTranslating}
                onClick={() => handleCopyLanguage('EN')}
              >
                Sync EN to AR
              </Button>
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                disabled={isTranslating}
                onClick={() => handleCopyLanguage('AR')}
              >
                Sync AR to EN
              </Button>
            </div>
          </div>

          <div className="rounded-xl border bg-muted/30 p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h4 className="font-semibold">Shared fields</h4>
              <Badge variant="secondary">Saved to both languages</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {sharedFields.map((field) => renderSharedField(field))}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {languageOrder.map((language) => (
              <div key={language} className="space-y-4 rounded-xl border p-4" dir={language === 'AR' ? 'rtl' : 'ltr'}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-semibold">{language === 'EN' ? 'English' : 'Arabic'}</h4>
                    <p className="text-sm text-muted-foreground">Localized text for this language</p>
                  </div>
                  <Badge variant={language === 'EN' ? 'default' : 'secondary'}>{language}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localizedFields.length > 0 ? (
                    localizedFields.map((field) => renderLocalizedField(language, field))
                  ) : (
                    <div className="col-span-2 rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                      This section does not have language-specific text fields. Shared values will be copied to both languages on save.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t" dir="ltr">
            <div className="flex items-center space-x-3">
              <Switch
                checked={draft.shared?.isActive !== false}
                onCheckedChange={(checked) => handleSharedChange('isActive', checked)}
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
                  setDraft(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={saveBilingualDraft} disabled={isLoading || isUploading || isTranslating}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : isUploading ? 'Uploading...' : isTranslating ? 'Translating...' : 'Save both languages'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
