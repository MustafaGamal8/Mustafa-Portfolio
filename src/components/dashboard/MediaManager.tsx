'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  Search,
  Trash2,
  Eye,
  Download,
  FileText,
  Image as ImageIcon,
  Video,
  File,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  Edit3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fileService, type FileData } from '@/lib/frontend/services/file.service';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface MediaManagerProps { }

export const MediaManager: React.FC<MediaManagerProps> = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [newBaseUrl, setNewBaseUrl] = useState('');
  const { toast } = useToast();

  const filesPerPage = 12;

  const loadFiles = useCallback(async (page = 1, search = '') => {
    try {
      setIsLoading(true);
      const response = await fileService.getFiles(page, filesPerPage);
      setFiles(response.files);
      setTotal(response.total);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load files"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, filesPerPage]);

  useEffect(() => {
    loadFiles(currentPage, searchTerm);
  }, [loadFiles, currentPage, searchTerm]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await fileService.uploadFile(file);
      toast({
        title: "Success",
        description: "File uploaded successfully!"
      });
      loadFiles(currentPage, searchTerm);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload file"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      await fileService.deleteFile(fileId);
      toast({
        title: "Success",
        description: "File deleted successfully!"
      });
      loadFiles(currentPage, searchTerm);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete file"
      });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedFiles.size === 0) return;

    try {
      const result = await fileService.bulkDeleteFiles(Array.from(selectedFiles));
      toast({
        title: "Success",
        description: `${result.deleted} files deleted successfully!`
      });
      setSelectedFiles(new Set());
      setIsSelectionMode(false);
      loadFiles(currentPage, searchTerm);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete files"
      });
    }
  };

  const handleSelectFile = (fileId: string) => {
    const newSelection = new Set(selectedFiles);
    if (newSelection.has(fileId)) {
      newSelection.delete(fileId);
    } else {
      newSelection.add(fileId);
    }
    setSelectedFiles(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedFiles.size === files.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(files.map(f => f.id)));
    }
  };

  const handleUpdateFileUrl = async (fileId: string) => {
    if (!newBaseUrl.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid base URL"
      });
      return;
    }

    try {
      await fileService.updateFileBaseUrl(fileId, newBaseUrl.trim());
      toast({
        title: "Success",
        description: "File URL updated successfully!"
      });
      setEditingFile(null);
      setNewBaseUrl('');
      loadFiles(currentPage, searchTerm);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update file URL"
      });
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    if (type.startsWith('video/')) return <Video className="h-4 w-4" />;
    if (type === 'application/pdf') return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const getFileTypeColor = (type: string) => {
    if (type.startsWith('image/')) return 'bg-green-100 text-green-800';
    if (type.startsWith('video/')) return 'bg-blue-100 text-blue-800';
    if (type === 'application/pdf') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const FilePreview: React.FC<{ file: FileData }> = ({ file }) => {
    if (file.type.startsWith('image/')) {
      return (
        <img
          src={`/api/files/${file.id}`}
          alt={file.name}
          className="w-full h-32 object-cover rounded-md"
        />
      );
    }

    return (
      <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center">
        {getFileIcon(file.type)}
        <span className="ml-2 text-sm text-gray-600">{file.type.split('/')[1]?.toUpperCase()}</span>
      </div>
    );
  };

  const FileGridView: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {files.map((file) => (
        <Card key={file.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="relative">
              {isSelectionMode && (
                <div className="absolute top-2 left-2 z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSelectFile(file.id)}
                    className="p-1 h-auto w-auto bg-white/80 hover:bg-white"
                  >
                    {selectedFiles.has(file.id) ? (
                      <CheckSquare className="h-4 w-4 text-primary" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
              <FilePreview file={file} />
            </div>
            <div className="mt-3 space-y-2">
              <h3 className="font-medium text-sm truncate" title={file.name}>
                {file.name}
              </h3>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className={getFileTypeColor(file.type)}>
                  {getFileIcon(file.type)}
                  <span className="ml-1 text-xs">
                    {file.type.split('/')[1]?.toUpperCase()}
                  </span>
                </Badge>
                <span className="text-xs text-gray-500">
                  {fileService.formatFileSize(file.size)}
                </span>
              </div>
              
              {/* URL Edit Section */}
              {editingFile === file.id ? (
                <div className="space-y-2">
                  <Input
                    placeholder="Enter new base URL"
                    value={newBaseUrl}
                    onChange={(e) => setNewBaseUrl(e.target.value)}
                    className="text-xs"
                  />
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      onClick={() => handleUpdateFileUrl(file.id)}
                      className="flex-1 text-xs"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingFile(null);
                        setNewBaseUrl('');
                      }}
                      className="flex-1 text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{file.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          {file.type.startsWith('image/') ? (
                            <img
                              src={`/api/files/${file.id}`}
                              alt={file.name}
                              className="max-h-96 object-contain"
                            />
                          ) : (
                            <div className="p-8 bg-gray-100 rounded-lg text-center">
                              {getFileIcon(file.type)}
                              <p className="mt-2">{file.name}</p>
                              <p className="text-sm text-gray-500">{file.type}</p>
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Size:</strong> {fileService.formatFileSize(file.size)}
                          </div>
                          <div>
                            <strong>Type:</strong> {file.type}
                          </div>
                          <div>
                            <strong>Created:</strong> {new Date(file.createdAt).toLocaleDateString()}
                          </div>
                          <div>
                            <strong>URL:</strong>
                            <code className="ml-1 text-xs bg-gray-100 px-1 rounded">
                              <a href={file.url}>
                                {file.url}
                              </a>
                            </code>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingFile(file.id);
                      setNewBaseUrl('');
                    }}
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete File</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{file.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteFile(file.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const FileListView: React.FC = () => (
    <div className="space-y-2">
      {files.map((file) => (
        <Card key={file.id} className="hover:shadow-sm transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate" title={file.name}>
                  {file.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {fileService.formatFileSize(file.size)} • {new Date(file.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Badge variant="secondary" className={getFileTypeColor(file.type)}>
                  {file.type.split('/')[1]?.toUpperCase()}
                </Badge>
              </div>
              <div className="flex-shrink-0 flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{file.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        {file.type.startsWith('image/') ? (
                          <img
                            src={`/api/files/${file.id}`}
                            alt={file.name}
                            className="max-h-96 object-contain"
                          />
                        ) : (
                          <div className="p-8 bg-gray-100 rounded-lg text-center">
                            {getFileIcon(file.type)}
                            <p className="mt-2">{file.name}</p>
                            <p className="text-sm text-gray-500">{file.type}</p>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Size:</strong> {fileService.formatFileSize(file.size)}
                        </div>
                        <div>
                          <strong>Type:</strong> {file.type}
                        </div>
                        <div>
                          <strong>Created:</strong> {new Date(file.createdAt).toLocaleDateString()}
                        </div>
                        <div>
                          <strong>URL:</strong>
                          <code className="ml-1 text-xs bg-gray-100 px-1 rounded">
                            {file.url}
                          </code>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete File</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{file.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteFile(file.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <TabsContent value="media" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Media Library
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <h3 className="font-medium mb-2">Upload Files</h3>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop files here, or click to select files
            </p>
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept="image/*,application/pdf"
              disabled={isUploading}
            />
            <label htmlFor="file-upload">
              <Button disabled={isUploading} asChild>
                <span>
                  {isUploading ? 'Uploading...' : 'Select Files'}
                </span>
              </Button>
            </label>
          </div>

          {/* Search and View Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Bulk Actions */}
              <Button
                variant={isSelectionMode ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setIsSelectionMode(!isSelectionMode);
                  setSelectedFiles(new Set());
                }}
              >
                <CheckSquare className="h-4 w-4 mr-1" />
                Select
              </Button>

              {isSelectionMode && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                  >
                    {selectedFiles.size === files.length ? 'Deselect All' : 'Select All'}
                  </Button>

                  {selectedFiles.size > 0 && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete ({selectedFiles.size})
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Files</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {selectedFiles.size} selected file(s)? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleBulkDelete}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </>
              )}

              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{total} files total</span>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {/* Files Display */}
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No files found</p>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? <FileGridView /> : <FileListView />}
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <span className="text-sm text-gray-500">
                {currentPage} / {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};
