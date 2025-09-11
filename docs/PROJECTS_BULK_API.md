# Projects Bulk API

This document describes how to use the bulk operations for projects.

## Base URL
```
/api/projects/bulk
```

## Endpoints

### 1. Bulk Create Projects
**POST** `/api/projects/bulk`

Create multiple projects at once.

**Request Body:**
```json
{
  "projects": [
    {
      "lang": "EN",
      "title": "Project 1",
      "description": "Description for project 1",
      "category": "Web Development",
      "technologies": ["React", "Node.js"],
      "features": ["Feature 1", "Feature 2"],
      "status": "COMPLETED",
      "isFeatured": true,
      "isActive": true,
      "order": 1
    },
    {
      "lang": "EN", 
      "title": "Project 2",
      "description": "Description for project 2",
      "category": "Mobile Development",
      "technologies": ["Flutter", "Dart"],
      "features": ["Feature A", "Feature B"],
      "status": "IN_PROGRESS",
      "isFeatured": false,
      "isActive": true,
      "order": 2
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "created": 2,
  "projects": [
    {
      "id": "project-id-1",
      "title": "Project 1",
      // ... other project fields
    },
    {
      "id": "project-id-2", 
      "title": "Project 2",
      // ... other project fields
    }
  ]
}
```

### 2. Bulk Update Projects
**PUT** `/api/projects/bulk`

Update multiple projects at once.

**Request Body:**
```json
{
  "projects": [
    {
      "id": "project-id-1",
      "title": "Updated Project 1",
      "status": "COMPLETED",
      "isFeatured": true
    },
    {
      "id": "project-id-2",
      "title": "Updated Project 2", 
      "status": "ARCHIVED",
      "isFeatured": false
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "updated": 2,
  "projects": [
    {
      "id": "project-id-1",
      "title": "Updated Project 1",
      // ... other updated fields
    },
    {
      "id": "project-id-2",
      "title": "Updated Project 2",
      // ... other updated fields
    }
  ]
}
```

### 3. Bulk Delete Projects
**DELETE** `/api/projects/bulk`

Delete multiple projects at once.

**Request Body:**
```json
{
  "ids": ["project-id-1", "project-id-2", "project-id-3"]
}
```

**Response:**
```json
{
  "success": true,
  "deleted": 3,
  "deletedIds": ["project-id-1", "project-id-2", "project-id-3"]
}
```

## Error Responses

### Validation Error (400)
```json
{
  "error": "Validation failed",
  "details": {
    "field": "validation error message"
  }
}
```

### Not Found Error (404) - for bulk delete
```json
{
  "error": "Some projects not found",
  "details": {
    "missingIds": ["non-existent-id-1", "non-existent-id-2"]
  }
}
```

## Usage Examples

### Example 1: Bulk create projects with curl
```bash
curl -X POST http://localhost:3000/api/projects/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "projects": [
      {
        "lang": "EN",
        "title": "E-commerce Platform",
        "description": "Full-stack e-commerce solution",
        "category": "Web Development",
        "technologies": ["Next.js", "Prisma", "PostgreSQL"],
        "features": ["User Authentication", "Payment Integration", "Admin Panel"],
        "status": "COMPLETED",
        "isFeatured": true,
        "isActive": true,
        "order": 1
      }
    ]
  }'
```

### Example 2: Bulk update projects with fetch
```javascript
const response = await fetch('/api/projects/bulk', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    projects: [
      {
        id: 'project-1',
        status: 'COMPLETED',
        isFeatured: true
      },
      {
        id: 'project-2', 
        status: 'ARCHIVED',
        isActive: false
      }
    ]
  })
});

const result = await response.json();
console.log(result);
```

### Example 3: Bulk delete projects
```javascript
const response = await fetch('/api/projects/bulk', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ids: ['project-1', 'project-2', 'project-3']
  })
});

const result = await response.json();
console.log(result);
```
