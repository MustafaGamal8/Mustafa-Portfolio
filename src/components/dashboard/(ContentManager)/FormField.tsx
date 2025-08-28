'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useContentManager } from './ContentManagerContext';
import { FieldConfig } from './types';
import { IconSelector } from './IconSelector';
import { DynamicArrayField } from './DynamicArrayField';
import * as LucideIcons from 'lucide-react';
import renderLucideIcon from '@/lib/frontend/utils/renderLucideIcon';

interface FormFieldProps {
  field: FieldConfig;
  value: any;
  onChange: (value: any) => void;
  editLanguage: 'EN' | 'AR';
}

export const FormField: React.FC<FormFieldProps> = ({ field, value, onChange, editLanguage }) => {
  const { getSectionItems } = useContentManager();
  const [iconSelectorOpen, setIconSelectorOpen] = useState(false);

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arrayValue = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
    onChange(arrayValue);
  };

  // Handle dynamic array fields (dynamicTexts, technologies, features)
  if (field.name === 'dynamicTexts') {
    return (
      <DynamicArrayField
        label={field.label}
        value={Array.isArray(value) ? value : []}
        onChange={onChange}
        placeholder="Enter dynamic text"
        editLanguage={editLanguage}
        required={field.required}
      />
    );
  }

  if (field.name === 'technologies' || field.name === 'features') {
    return (
      <DynamicArrayField
        label={field.label}
        value={Array.isArray(value) ? value : []}
        onChange={onChange}
        placeholder={field.name === 'technologies' ? 'Enter technology' : 'Enter feature'}
        editLanguage={editLanguage}
        required={field.required}
      />
    );
  }

  // Handle icon fields
  if (field.name === 'icon') {


    return (
      <div key={`${field.name}-${editLanguage}`} className="space-y-2">
        <Label className="text-sm font-medium">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </Label>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIconSelectorOpen(true)}
            className="flex items-center gap-2"
          >
            {value ? renderLucideIcon(value, 16) : null}
            {value ? (
              <Badge variant="secondary">{value}</Badge>
            ) : (
              'Select Icon'
            )}
          </Button>

          {value && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onChange('')}
            >
              Clear
            </Button>
          )}
        </div>

        <IconSelector
          value={value || ''}
          onChange={onChange}
          isOpen={iconSelectorOpen}
          onClose={() => setIconSelectorOpen(false)}
        />
      </div>
    );
  }

  // Handle object array fields (like stats)
  if (field.type === 'object-array' && field.fields) {
    const arrayValue = Array.isArray(value) ? value : [];

    const addItem = () => {
      const newItem: Record<string, any> = {};
      field.fields!.forEach(f => {
        newItem[f.name] = f.type === 'number' ? 0 : '';
      });
      onChange([...arrayValue, newItem]);
    };

    const removeItem = (index: number) => {
      const newArray = arrayValue.filter((_, i) => i !== index);
      onChange(newArray);
    };

    const updateItem = (index: number, fieldName: string, fieldValue: any) => {
      const newArray = [...arrayValue];
      newArray[index] = { ...newArray[index], [fieldName]: fieldValue };
      onChange(newArray);
    };

    return (
      <div key={`${field.name}-${editLanguage}`} className="space-y-4 col-span-2">
        <Label className="text-sm font-medium">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </Label>

        <div className="space-y-3">
          {arrayValue.map((item: any, index: number) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Item {index + 1}</span>
                <Button
                  type="button"
                  onClick={() => removeItem(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {field.fields!.map((subField) => (
                  <FormField
                    key={subField.name}
                    field={subField}
                    value={item[subField.name] || ''}
                    onChange={(val) => updateItem(index, subField.name, val)}
                    editLanguage={editLanguage}
                  />
                ))}
              </div>
            </div>
          ))}

          <Button
            type="button"
            onClick={addItem}
            variant="outline"
            className="w-full"
          >
            Add {field.label.slice(0, -1)}
          </Button>
        </div>
      </div>
    );
  }

  // Skip file/image upload fields - handled by separate components
  if (field.type === 'file' || field.type === 'image' || field.name.includes('Image') || field.name.includes('Resume')) {
    return null;
  }

  const renderField = () => {
    const commonProps = {
      id: field.name,
      value: value || '',
      dir: editLanguage === 'AR' ? 'rtl' : 'ltr',
      className: "w-full"
    };

    if (field.type === 'textarea') {
      return (
        <Textarea
          {...commonProps}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.label}
          rows={3}
        />
      );
    }

    if (field.type === 'checkbox') {
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={field.name}
            checked={value || false}
            onCheckedChange={(checked) => onChange(checked)}
          />
          <Label htmlFor={field.name} className="text-sm font-medium">
            {field.label}
          </Label>
        </div>
      );
    }

    if (field.type === 'select' && field.options) {
      return (
        <select
          {...commonProps}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select {field.label}</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === 'select-category') {
      const skillCategories = getSectionItems('skill-categories', editLanguage);
      return (
        <select
          {...commonProps}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          {skillCategories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      );
    }

    return (
      <Input
        {...commonProps}
        type={field.type || 'text'}
        onChange={(e) => {
          const newValue = field.type === 'number' ? Number(e.target.value) : e.target.value;
          onChange(newValue);
        }}
        placeholder={field.label}
      />
    );
  }; const isDescriptionField = field.name.includes('description') || field.name === 'answer' || field.name === 'longDescription';

  if (field.type === 'checkbox') {
    return (
      <div key={`${field.name}-${editLanguage}`} className="space-y-2">
        {renderField()}
      </div>
    );
  }

  return (
    <div key={`${field.name}-${editLanguage}`} className={`space-y-2 ${isDescriptionField ? 'col-span-2' : ''}`}>
      <Label htmlFor={field.name} className="text-sm font-medium">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </Label>
      {renderField()}
    </div>
  );
};
