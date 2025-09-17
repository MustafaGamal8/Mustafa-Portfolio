'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, Palette, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const predefinedColors = [
  { name: 'Blue', value: '#3b82f6', class: 'bg-blue-500' },
  { name: 'Purple', value: '#8b5cf6', class: 'bg-purple-500' },
  { name: 'Pink', value: '#ec4899', class: 'bg-pink-500' },
  { name: 'Red', value: '#ef4444', class: 'bg-red-500' },
  { name: 'Orange', value: '#f97316', class: 'bg-orange-500' },
  { name: 'Green', value: '#10b981', class: 'bg-green-500' },
  { name: 'Teal', value: '#14b8a6', class: 'bg-teal-500' },
  { name: 'Indigo', value: '#6366f1', class: 'bg-indigo-500' },
];

export default function EmbedDemoPage() {
  const [language, setLanguage] = useState('AR');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [customColor, setCustomColor] = useState('#3b82f6');
  const { toast } = useToast();

  const generateEmbedUrl = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const params = new URLSearchParams({
      lang: language,
      color: primaryColor
    });
    return `${baseUrl}/embed?${params.toString()}`;
  };

  const generateIframeCode = () => {
    const embedUrl = generateEmbedUrl();
    return `<iframe 
  src="${embedUrl}" 
  width="400" 
  height="600" 
  frameborder="0" 
  style="border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);"
  allowtransparency="true">
</iframe>`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: 'Copied!',
        description: `${type} copied to clipboard`,
      });
    });
  };

  const openPreview = () => {
    const url = generateEmbedUrl();
    window.open(url, '_blank', 'width=450,height=650,scrollbars=yes,resizable=yes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Portfolio Embed Widget Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Customize and test your embeddable portfolio card. Perfect for adding to other websites,
            blogs, or social media profiles.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Customize Your Widget
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Language Selection */}
                <div className="space-y-2">
                  <Label>Language</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={language === 'AR' ? 'default' : 'outline'}
                      onClick={() => setLanguage('AR')}
                      className="flex-1"
                    >
                      العربية
                    </Button>
                    <Button
                      variant={language === 'EN' ? 'default' : 'outline'}
                      onClick={() => setLanguage('EN')}
                      className="flex-1"
                    >
                      English
                    </Button>
                  </div>
                </div>

                {/* Predefined Colors */}
                <div className="space-y-3">
                  <Label>Primary Color</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setPrimaryColor(color.value)}
                        className={`relative w-full h-12 rounded-lg ${color.class} transition-all duration-200 hover:scale-105 ${primaryColor === color.value
                            ? 'ring-4 ring-offset-2 ring-gray-400 dark:ring-gray-600'
                            : ''
                          }`}
                        title={color.name}
                      >
                        {primaryColor === color.value && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Color */}
                <div className="space-y-2">
                  <Label>Custom Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="w-16 h-10 p-1 border"
                    />
                    <Input
                      type="text"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      placeholder="#3b82f6"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setPrimaryColor(customColor)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Preview Button */}
                <Button
                  onClick={openPreview}
                  className="w-full"
                  size="lg"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Preview
                </Button>
              </CardContent>
            </Card>

            {/* Generated Code */}
            <Card>
              <CardHeader>
                <CardTitle>Embed Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Direct URL */}
                <div className="space-y-2">
                  <Label>Direct URL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={generateEmbedUrl()}
                      readOnly
                      className="flex-1 font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(generateEmbedUrl(), 'URL')}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Iframe Code */}
                <div className="space-y-2">
                  <Label>Iframe Code</Label>
                  <div className="relative">
                    <textarea
                      value={generateIframeCode()}
                      readOnly
                      className="w-full h-32 p-3 text-sm font-mono bg-gray-50 dark:bg-gray-800 border rounded-lg resize-none"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generateIframeCode(), 'Iframe code')}
                      className="absolute top-2 right-2"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>

                {/* Usage Instructions */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    How to Use
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Copy the iframe code above</li>
                    <li>• Paste it into your website or blog</li>
                    <li>• Customize width/height as needed</li>
                    <li>• The card will automatically match your theme</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                  <iframe
                    src={generateEmbedUrl()}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    className="rounded-lg shadow-lg"
                    allowTransparency={true}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Color Indicator */}
            <Card>
              <CardHeader>
                <CardTitle>Current Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Language:</span>
                    <Badge variant="secondary">
                      {language === 'AR' ? 'العربية' : 'English'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Primary Color:</span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: primaryColor }}
                      ></div>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {primaryColor}
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}