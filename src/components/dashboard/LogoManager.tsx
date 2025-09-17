'use client';

import { useState, useRef } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Trash2, Eye, Edit, RefreshCw, Info, Moon, Sun, Type, Home, Box } from 'lucide-react';
import { useAllLogos, type LogoType, type ThemeType } from '@/hooks/useLogo';
import { useToast } from '@/hooks/use-toast';

type ActiveTab = 'dark' | 'light';

const LogoManager = () => {
  const allLogos = useAllLogos();
  const [activeTab, setActiveTab] = useState<ActiveTab>('dark');
  const [uploading, setUploading] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const { toast } = useToast();

  const logoTypes: { key: LogoType; name: string; icon: React.ReactNode; description: string }[] = [
    { key: 'main', name: 'Main Logo', icon: <Home className="h-4 w-4" />, description: 'Primary brand logo' },
    { key: 'word', name: 'Word Mark', icon: <Type className="h-4 w-4" />, description: 'Text-based logo' },
    { key: 'icon', name: 'Icon Only', icon: <Box className="h-4 w-4" />, description: 'Symbol/icon logo' },
  ];

  const getLogoKey = (type: LogoType, theme: ThemeType): string => `${type}-${theme}`;

  const getLogo = (type: LogoType, theme: ThemeType) => {
    return allLogos[theme][type];
  };

  const handleFileUpload = async (type: LogoType, theme: ThemeType, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type (including SVG)
    if (!file.type.startsWith('image/') && file.type !== 'image/svg+xml') {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select an image file (PNG, JPG, SVG, GIF, WebP, etc.)",
      });
      return;
    }

    // Validate file size (max 10MB for SVG and other formats)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please select an image smaller than 10MB",
      });
      return;
    }

    const logoKey = getLogoKey(type, theme);
    const logo = getLogo(type, theme);

    try {
      setUploading(logoKey);
      await logo.uploadLogo(file);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(null);
      const inputRef = fileInputRefs.current[logoKey];
      if (inputRef) {
        inputRef.value = '';
      }
    }
  };

  const handleImagePreview = (type: LogoType, theme: ThemeType, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoKey = getLogoKey(type, theme);
        setPreviewImages(prev => ({
          ...prev,
          [logoKey]: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSave = async (type: LogoType, theme: ThemeType) => {
    const logoKey = getLogoKey(type, theme);
    const previewImage = previewImages[logoKey];

    if (!previewImage) {
      toast({
        variant: "destructive",
        title: "No image selected",
        description: "Please select an image to update the logo",
      });
      return;
    }

    const logo = getLogo(type, theme);

    try {
      setUploading(logoKey);
      await logo.updateLogo(previewImage);
      setEditing(null);
      setPreviewImages(prev => {
        const newPrev = { ...prev };
        delete newPrev[logoKey];
        return newPrev;
      });
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setUploading(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCurrentImageSrc = (type: LogoType, theme: ThemeType) => {
    const logoKey = getLogoKey(type, theme);
    if (editing === logoKey && previewImages[logoKey]) return previewImages[logoKey];
    const logo = getLogo(type, theme);
    if (logo.logo?.url) return logo.logo.url;
    return '/Icon.svg'; // fallback
  };

  const LogoCard = ({ type, theme }: { type: LogoType; theme: ThemeType }) => {
    const logoKey = getLogoKey(type, theme);
    const logo = getLogo(type, theme);
    const logoTypeInfo = logoTypes.find(t => t.key === type)!;
    const isEditing = editing === logoKey;
    const isUploading = uploading === logoKey;
    const previewImage = previewImages[logoKey];

    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            {logoTypeInfo.icon}
            {logoTypeInfo.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{logoTypeInfo.description}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Logo Display */}
          <div className="border rounded-lg p-3 bg-muted/30">
            <div className="flex items-center justify-center h-24 mb-3">
              <img
                src={getCurrentImageSrc(type, theme)}
                alt={`${logoTypeInfo.name} - ${theme} theme`}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {logo.logo && (
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{formatFileSize(logo.logo.size)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span>{logo.logo.type}</span>
                </div>
              </div>
            )}

            {!logo.logo && (
              <p className="text-xs text-muted-foreground text-center">No custom logo uploaded</p>
            )}
          </div>

          {/* Upload/Edit Section */}
          <div className="space-y-3">
            <Input
              ref={(el) => { fileInputRefs.current[logoKey] = el; }}
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleImagePreview(type, theme, e);
                if (!isEditing) {
                  handleFileUpload(type, theme, e);
                }
              }}
              disabled={isUploading}
              className="cursor-pointer text-xs"
            />

            {isEditing && previewImage && (
              <div className="space-y-2">
                <div className="border rounded-lg p-2 bg-muted/30">
                  <div className="flex items-center justify-center h-16">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleEditSave(type, theme)}
                    disabled={isUploading}
                    className="flex-1 text-xs"
                  >
                    {isUploading ? 'Saving...' : 'Save'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(null);
                      setPreviewImages(prev => {
                        const newPrev = { ...prev };
                        delete newPrev[logoKey];
                        return newPrev;
                      });
                      const inputRef = fileInputRefs.current[logoKey];
                      if (inputRef) {
                        inputRef.value = '';
                      }
                    }}
                    disabled={isUploading}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => logo.refreshLogo()}
                disabled={logo.loading}
                className="flex-1 text-xs"
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${logo.loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              {logo.logo && !isEditing && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditing(logoKey)}
                  className="flex-1 text-xs"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Logo Management
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your brand logos for different themes and use cases
          </p>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ActiveTab)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dark" className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                Dark Theme
              </TabsTrigger>
              <TabsTrigger value="light" className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                Light Theme
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dark" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {logoTypes.map(({ key }) => (
                  <LogoCard key={`${key}-dark`} type={key} theme="dark" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="light" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {logoTypes.map(({ key }) => (
                  <LogoCard key={`${key}-light`} type={key} theme="light" />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          {/* Usage Information */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Logo Usage:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• <strong>Main:</strong> Primary logo for navigation and footer</li>
                <li>• <strong>Word:</strong> Text-based logo for headers and branding</li>
                <li>• <strong>Icon:</strong> Small symbol for favicons and compact spaces</li>
                <li>• Logos automatically switch based on the current theme</li>
                <li>• Supported formats: PNG, JPG, SVG, GIF, WebP (max 10MB)</li>
                <li>• No image compression - files uploaded as-is for best quality</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogoManager;