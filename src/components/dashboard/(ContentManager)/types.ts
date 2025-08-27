export interface ContentSection {
  type: 'personal' | 'hero' | 'about' | 'skills' | 'skill-categories' | 'projects' | 'achievements' | 'contact' | 'social';
  label: string;
  icon: React.ReactNode;
  service: any;
  dataKey: string;
}

export interface ContentData {
  [key: string]: {
    EN: any[];
    AR: any[];
  };
}

export interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: { value: string; label: string; }[];
  fields?: FieldConfig[]; // For object-array type
}

export interface ContentManagerState {
  contentData: ContentData;
  editingItem: any;
  activeSection: string;
  isLoading: boolean;
  message: { type: 'success' | 'error'; text: string } | null;
  isModalOpen: boolean;
  selectedImage: File | null;
  editLanguage: 'EN' | 'AR';
  showBothLanguages: boolean;
}

export interface ContentManagerActions {
  setContentData: React.Dispatch<React.SetStateAction<ContentData>>;
  setEditingItem: React.Dispatch<React.SetStateAction<any>>;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<{ type: 'success' | 'error'; text: string } | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  setEditLanguage: React.Dispatch<React.SetStateAction<'EN' | 'AR'>>;
  setShowBothLanguages: React.Dispatch<React.SetStateAction<boolean>>;
}
