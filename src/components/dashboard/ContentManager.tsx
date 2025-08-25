'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  heroContentService,
  aboutCardService,
  skillService,
  skillCategoryService,
  projectService,
  achievementService,
  personalInfoService,
  contactInfoService,
  socialLinkService
} from '@/lib/frontend/services';
import {
  Save,
  Plus,
  Trash2,
  Edit3,
  Globe,
  User,
  Award,
  CheckCircle,
  AlertCircle,
  Settings,
  Users,
  Link,
  Phone,
  Upload,
  Image as ImageIcon,
  Briefcase
} from 'lucide-react'; interface ContentSection {
  type: 'personal' | 'hero' | 'about' | 'skills' | 'skill-categories' | 'projects' | 'achievements' | 'contact' | 'social';
  label: string;
  icon: React.ReactNode;
  service: any;
  dataKey: string;
}

export const ContentManager = () => {
  const [contentData, setContentData] = useState<any>({});
  const [editingItem, setEditingItem] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editLanguage, setEditLanguage] = useState<'EN' | 'AR'>('EN');
  const [showBothLanguages, setShowBothLanguages] = useState(false);

  const sections: ContentSection[] = [
    {
      type: 'personal',
      label: 'Personal Info',
      icon: <User className="h-4 w-4" />,
      service: personalInfoService,
      dataKey: 'personalInfo'
    },
    {
      type: 'hero',
      label: 'Hero Content',
      icon: <Settings className="h-4 w-4" />,
      service: heroContentService,
      dataKey: 'heroContent'
    },
    {
      type: 'about',
      label: 'About Cards',
      icon: <Users className="h-4 w-4" />,
      service: aboutCardService,
      dataKey: 'aboutCards'
    },
    {
      type: 'skill-categories',
      label: 'Skill Categories',
      icon: <Award className="h-4 w-4" />,
      service: skillCategoryService,
      dataKey: 'skillCategories'
    },
    {
      type: 'skills',
      label: 'Skills',
      icon: <Award className="h-4 w-4" />,
      service: skillService,
      dataKey: 'skills'
    },
    {
      type: 'projects',
      label: 'Projects',
      icon: <Briefcase className="h-4 w-4" />,
      service: projectService,
      dataKey: 'projects'
    },
    {
      type: 'achievements',
      label: 'Achievements',
      icon: <Award className="h-4 w-4" />,
      service: achievementService,
      dataKey: 'achievements'
    },
    {
      type: 'contact',
      label: 'Contact Info',
      icon: <Phone className="h-4 w-4" />,
      service: contactInfoService,
      dataKey: 'contactInfo'
    },
    {
      type: 'social',
      label: 'Social Links',
      icon: <Link className="h-4 w-4" />,
      service: socialLinkService,
      dataKey: 'socialLinks'
    }
  ];

  // Load content from API
  useEffect(() => {
    loadContentItems();
  }, []);

  const getCurrentSection = () => sections.find(s => s.type === activeSection);

  const loadContentItems = async () => {
    try {
      setIsLoading(true);
      const newContentData: any = {};

      // Load data for each section
      await Promise.all(sections.map(async (section) => {
        try {
          // Load both English and Arabic data separately
          const [enData, arData] = await Promise.all([
            section.service.getByLanguage('EN'),
            section.service.getByLanguage('AR')
          ]);

          const enItems = Array.isArray(enData) ? enData : [enData].filter(Boolean);
          const arItems = Array.isArray(arData) ? arData : [arData].filter(Boolean);

          newContentData[section.dataKey] = {
            EN: enItems,
            AR: arItems
          };
        } catch (error) {
          console.error(`Failed to load ${section.type}:`, error);
          newContentData[section.dataKey] = { EN: [], AR: [] };
        }
      }));

      setContentData(newContentData);
    } catch (error) {
      console.error('Failed to load content items:', error);
      setMessage({ type: 'error', text: 'Failed to load content items' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (item: any) => {
    setIsLoading(true);
    try {
      const currentSection = getCurrentSection();
      if (!currentSection) throw new Error('Invalid section');

      // Ensure the item has the correct language
      const itemWithLang = { ...item, lang: editLanguage };

      if (item.id) {
        // Update existing item
        await currentSection.service.update(itemWithLang);
        setMessage({ type: 'success', text: 'Content updated successfully!' });
      } else {
        // Create new item
        await currentSection.service.create(itemWithLang);
        setMessage({ type: 'success', text: 'Content added successfully!' });
      }

      // Reload data
      await loadContentItems();
      setEditingItem(null);
      setIsModalOpen(false);
      setSelectedImage(null);
    } catch (error) {
      console.error('Save error:', error);
      setMessage({ type: 'error', text: 'Failed to save content. Please try again.' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const currentSection = getCurrentSection();
        if (!currentSection) throw new Error('Invalid section');

        await currentSection.service.delete(id);
        setContentData((prev: any) => ({
          ...prev,
          [currentSection.dataKey]: prev[currentSection.dataKey].filter((item: any) => item.id !== id)
        }));
        setMessage({ type: 'success', text: 'Content deleted successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } catch (error) {
        console.error('Delete error:', error);
        setMessage({ type: 'error', text: 'Failed to delete content. Please try again.' });
        setTimeout(() => setMessage(null), 3000);
      }
    }
  };

  const getSectionItems = (sectionType: string, language: 'EN' | 'AR' = editLanguage) => {
    const section = sections.find(s => s.type === sectionType);
    if (!section) return [];
    const sectionData = contentData[section.dataKey] || { EN: [], AR: [] };
    const items = sectionData[language] || [];
    return items.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  };



  const renderFormField = (fieldName: string, label: string, type: string = 'text', isRequired: boolean = false) => {
    const value = editingItem[fieldName] || '';
    const isDescriptionField = fieldName.includes('description') || fieldName === 'answer' || fieldName === 'longDescription';

    if (type === 'textarea') {
      return (
        <div key={`${fieldName}-${editLanguage}`} className={`space-y-2 ${isDescriptionField ? 'col-span-2' : ''}`}>
          <Label htmlFor={fieldName} className="text-sm font-medium">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Textarea
            id={fieldName}
            value={value}
            onChange={(e) => setEditingItem((prev: any) => ({ ...prev, [fieldName]: e.target.value }))}
            placeholder={label}
            rows={3}
            dir={editLanguage === 'AR' ? 'rtl' : 'ltr'}
            className="w-full"
          />
        </div>
      );
    }

    if (type === 'select' && fieldName === 'level') {
      return (
        <div key={`${fieldName}-${editLanguage}`} className="space-y-2">
          <Label htmlFor={fieldName} className="text-sm font-medium">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <select
            id={fieldName}
            value={value}
            onChange={(e) => setEditingItem((prev: any) => ({ ...prev, [fieldName]: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Level</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
            <option value="EXPERT">Expert</option>
          </select>
        </div>
      );
    }

    if (type === 'select' && fieldName === 'status') {
      return (
        <div key={`${fieldName}-${editLanguage}`} className="space-y-2">
          <Label htmlFor={fieldName} className="text-sm font-medium">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <select
            id={fieldName}
            value={value}
            onChange={(e) => setEditingItem((prev: any) => ({ ...prev, [fieldName]: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option value="DRAFT">Draft</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      );
    }

    if (type === 'select' && fieldName === 'skillCategoryId') {
      // Get skill categories for dropdown
      const skillCategories = getSectionItems('skill-categories', editLanguage);
      return (
        <div key={`${fieldName}-${editLanguage}`} className="space-y-2">
          <Label htmlFor={fieldName} className="text-sm font-medium">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <select
            id={fieldName}
            value={value}
            onChange={(e) => setEditingItem((prev: any) => ({ ...prev, [fieldName]: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {skillCategories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={`${fieldName}-${editLanguage}`} className="space-y-2">
        <Label htmlFor={fieldName} className="text-sm font-medium">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
        <Input
          id={fieldName}
          type={type}
          value={value}
          onChange={(e) => setEditingItem((prev: any) => ({ ...prev, [fieldName]:  type == "number" ? Number(e.target.value) : e.target.value   }))}
          placeholder={label}
          dir={editLanguage === 'AR' ? 'rtl' : 'ltr'}
          className="w-full"
        />
      </div>
    );
  };

  const renderImageUpload = () => {
    if (activeSection !== 'projects') return null;

    return (
      <div className="col-span-2">
        <Label className="text-base font-medium mb-3 block">Project Image</Label>
        <div className="space-y-4">
          {editingItem.imageId && (
            <div className="aspect-video w-full max-w-md bg-muted rounded-lg overflow-hidden">
              <img
                src={`/api/files/${editingItem.imageId}`}
                alt="Project preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              className="hidden"
              id="image-upload"
            />
            <Label
              htmlFor="image-upload"
              className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <Upload className="h-4 w-4" />
              Choose Image
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

  const renderEditForm = () => {
    if (!editingItem) return null;

    const currentSection = getCurrentSection();
    if (!currentSection) return null; const getFieldsForSection = (sectionType: string) => {
      const fieldConfigs: any = {
        personal: [
          { name: 'firstName', label: 'First Name', required: true },
          { name: 'lastName', label: 'Last Name', required: true },
          { name: 'title', label: 'Job Title', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true }
        ],
        hero: [
          { name: 'name', label: 'Name', required: true },
          { name: 'mainTitle', label: 'Main Title', required: true },
          { name: 'subTitle', label: 'Subtitle' },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'ctaText', label: 'CTA Text' }
        ],
        about: [
          { name: 'title', label: 'Title', required: true },
          { name: 'question', label: 'Question', required: true },
          { name: 'answer', label: 'Answer', type: 'textarea', required: true },
          { name: 'order', label: 'Order', type: 'number' }
        ],
        'skill-categories': [
          { name: 'title', label: 'Title', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'experience', label: 'Experience' },
          { name: 'order', label: 'Order', type: 'number' }
        ],
        skills: [
          { name: 'name', label: 'Skill Name', required: true },
          { name: 'level', label: 'Level', type: 'select', required: true },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'skillCategoryId', label: 'Category', type: 'select', required: true },
          { name: 'order', label: 'Order', type: 'number' }
        ],
        projects: [
          { name: 'title', label: 'Title', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'longDescription', label: 'Long Description', type: 'textarea' },
          { name: 'status', label: 'Status', type: 'select' },
          { name: 'category', label: 'Category', required: true },
          { name: 'projectUrl', label: 'Project URL', type: 'url' },
          { name: 'githubUrl', label: 'GitHub URL', type: 'url' },
          { name: 'demoUrl', label: 'Demo URL', type: 'url' },
          { name: 'order', label: 'Order', type: 'number' }
        ],
        achievements: [
          { name: 'title', label: 'Title', required: true },
          { name: 'subtitle', label: 'Subtitle' },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'value', label: 'Value' },
          { name: 'order', label: 'Order', type: 'number' }
        ],
        contact: [
          { name: 'type', label: 'Contact Type', required: true },
          { name: 'label', label: 'Label', required: true },
          { name: 'value', label: 'Value', required: true },
          { name: 'link', label: 'Link', type: 'url' },
          { name: 'order', label: 'Order', type: 'number' }
        ],
        social: [
          { name: 'name', label: 'Platform Name', required: true },
          { name: 'url', label: 'URL', type: 'url', required: true },
          { name: 'order', label: 'Order', type: 'number' }
        ]
      };

      return fieldConfigs[sectionType] || [];
    };

    const fields = getFieldsForSection(currentSection.type);

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
              {fields.map((field: any) => renderFormField(field.name, field.label, field.type, field.required))}
              {renderImageUpload()}
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
                <Button variant="outline" onClick={() => {
                  setIsModalOpen(false);
                  setEditingItem(null);
                  setSelectedImage(null);
                }}>
                  Cancel
                </Button>
                <Button onClick={() => handleSave(editingItem)} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <TabsContent value="content" className="space-y-6">
      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          {message.type === 'success' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {editLanguage && renderEditForm()}

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map(section => (
          <Button
            key={section.type}
            variant={activeSection === section.type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveSection(section.type)}
            className="flex items-center gap-2"
          >
            {section.icon}
            {section.label}
            <Badge variant="secondary" className="ml-1">
              {getSectionItems(section.type, 'EN').length + getSectionItems(section.type, 'AR').length}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Content Management Area */}
      <div className="bg-white rounded-lg border">
        {/* Header with Language Tabs */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">
            {sections.find(s => s.type === activeSection)?.label || activeSection} Content
          </h3>

          <div className="flex items-center gap-4">
            {/* Language Tabs */}
            <div className="flex border rounded-md">
              <Button
                variant={editLanguage === 'EN' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setEditLanguage('EN')}
                className="rounded-r-none"
              >
                English ({getSectionItems(activeSection, 'EN').length})
              </Button>
              <Button
                variant={editLanguage === 'AR' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setEditLanguage('AR')}
                className="rounded-l-none"
              >
                Arabic ({getSectionItems(activeSection, 'AR').length})
              </Button>
            </div>

            {/* Add New Button */}
            <Button
              onClick={() => {
                const currentSection = getCurrentSection();
                if (currentSection) {
                  setEditingItem({
                    id: '',
                    lang: editLanguage,
                    order: getSectionItems(activeSection, editLanguage).length + 1,
                    isActive: true
                  });
                  setIsModalOpen(true);
                }
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>

      </div>

      {/* Content Items */}
      <div className="p-4">
        {getSectionItems(activeSection, editLanguage).length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              No {editLanguage === 'EN' ? 'English' : 'Arabic'} content found for {sections.find(s => s.type === activeSection)?.label.toLowerCase()}.
            </p>
            <Button
              onClick={() => {
                const currentSection = getCurrentSection();
                if (currentSection) {
                  setEditingItem({
                    id: '',
                    lang: editLanguage,
                    order: 1,
                    isActive: true
                  });
                  setIsModalOpen(true);
                }
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add First Item
            </Button>
          </div>
        ) : (
          <div className="grid gap-3">
            {getSectionItems(activeSection, editLanguage).map((item: any) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">
                          {item.title || item.name || item.firstName || `${activeSection} Item`}
                        </h4>
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
                        {item.description && (
                          <p className="text-muted-foreground">
                            {item.description.length > 100
                              ? `${item.description.slice(0, 100)}...`
                              : item.description
                            }
                          </p>
                        )}

                        {/* Show relevant fields based on section type */}
                        <div className="flex flex-wrap gap-2">
                          {item.category && (
                            <Badge variant="outline">Category: {item.category}</Badge>
                          )}
                          {item.level && (
                            <Badge variant="outline">Level: {item.level}</Badge>
                          )}
                          {item.status && (
                            <Badge variant="outline">Status: {item.status}</Badge>
                          )}
                          {item.value && (
                            <Badge variant="outline">Value: {item.value}</Badge>
                          )}
                          {item.type && activeSection === 'contact' && (
                            <Badge variant="outline">Type: {item.type}</Badge>
                          )}
                          {item.subtitle && (
                            <Badge variant="outline">Subtitle: {item.subtitle}</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingItem(item);
                          setIsModalOpen(true);
                        }}
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
            ))}
          </div>
        )}
      </div>
    </TabsContent>
  );
};
