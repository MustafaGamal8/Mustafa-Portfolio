'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

interface DynamicArrayFieldProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  editLanguage: 'EN' | 'AR';
  required?: boolean;
}

export const DynamicArrayField: React.FC<DynamicArrayFieldProps> = ({
  label,
  value = [],
  onChange,
  placeholder = 'Enter value',
  editLanguage,
  required = false
}) => {
  const handleAddItem = () => {
    onChange([...value, '']);
  };

  const handleRemoveItem = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const handleItemChange = (index: number, newValue: string) => {
    const updatedValue = [...value];
    updatedValue[index] = newValue;
    onChange(updatedValue);
  };

  return (
    <div className="col-span-2 space-y-2">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              placeholder={`${placeholder} ${index + 1}`}
              dir={editLanguage === 'AR' ? 'rtl' : 'ltr'}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleRemoveItem(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddItem}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add {label.slice(0, -1)} {/* Remove 's' from the end */}
        </Button>
      </div>
    </div>
  );
};
