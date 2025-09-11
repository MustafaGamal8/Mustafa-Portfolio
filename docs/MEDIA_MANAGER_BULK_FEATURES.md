# Media Manager Bulk Operations & File URL Editing

This document describes the new bulk operations and file URL editing features added to the Media Manager in the dashboard.

## New Features

### 1. Bulk File Selection & Deletion

#### UI Components Added:
- **Select Button**: Toggle selection mode on/off
- **Select All/Deselect All**: Quickly select or deselect all visible files
- **Bulk Delete Button**: Delete multiple selected files at once
- **Selection Checkboxes**: Individual file selection indicators

#### How to Use:
1. Click the "Select" button to enter selection mode
2. Click on individual files to select them (checkboxes will appear)
3. Use "Select All" to select all files on the current page
4. Click "Delete (X)" button to delete selected files
5. Confirm deletion in the dialog

#### API Endpoints:
- **DELETE** `/api/files/bulk` - Bulk delete files
  ```json
  {
    "ids": ["file-id-1", "file-id-2", "file-id-3"]
  }
  ```

### 2. File URL Editing

#### UI Components Added:
- **Edit Button**: Opens inline URL editing for each file
- **URL Input Field**: Enter new base URL
- **Save/Cancel Buttons**: Confirm or cancel URL changes

#### How to Use:
1. Click the "Edit" button (pencil icon) on any file
2. Enter the new base URL (e.g., `https://new-domain.com`)
3. Click "Save" to update the file's URL
4. The file URL will be updated to: `{newBaseUrl}/api/files/{fileId}`

#### API Endpoints:
- **PUT** `/api/files/bulk` - Update file base URL
  ```json
  {
    "id": "file-id",
    "baseUrl": "https://new-domain.com"
  }
  ```

## Backend Changes

### File Service Methods Added:
```typescript
// Bulk delete files
async bulkDeleteFiles(ids: string[]): Promise<{
  success: boolean;
  deleted: number;
  deletedIds: string[];
}>

// Update file base URL
async updateFileBaseUrl(id: string, newBaseUrl: string): Promise<File>
```

### Frontend Service Methods Added:
```typescript
// Bulk delete files
async bulkDeleteFiles(ids: string[]): Promise<{
  success: boolean;
  deleted: number;
  deletedIds: string[];
}>

// Update file base URL  
async updateFileBaseUrl(id: string, baseUrl: string): Promise<FileData>
```

## User Interface Improvements

### Selection Mode:
- Visual indicators show which files are selected
- Bulk action buttons appear only when in selection mode
- Counter shows number of selected files
- Easy toggle between normal and selection modes

### URL Editing:
- Inline editing without modal dialogs
- Simple input field with save/cancel options
- Real-time validation and error handling
- Updated URLs reflected immediately

## Error Handling

### Bulk Delete:
- Validates all file IDs exist before deletion
- Returns detailed error for missing files
- Atomic operation (all succeed or all fail)
- User-friendly error messages

### URL Update:
- Validates URL format
- Checks file existence
- Handles network errors gracefully
- Success/error toast notifications

## Security & Validation

### Input Validation:
- File IDs validated as non-empty strings
- Base URLs validated as proper URLs
- Bulk operations limited to existing files
- SQL injection protection via Prisma

### Transaction Safety:
- Bulk operations use database transactions
- Rollback on any failure
- Consistent state maintained

## Usage Examples

### Example 1: Bulk Delete Files
```javascript
// Select files: file-1, file-2, file-3
// Click "Delete (3)" button
// Confirm in dialog
// Result: All 3 files deleted atomically
```

### Example 2: Update File URL
```javascript
// Click edit button on a file
// Enter: "https://cdn.example.com"
// Click "Save"
// Result: File URL becomes "https://cdn.example.com/api/files/{fileId}"
```

## Future Enhancements

Potential future improvements:
- Bulk URL updates for multiple files
- File moving between directories
- Batch file uploads
- Advanced filtering and sorting
- File preview improvements
