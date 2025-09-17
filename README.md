# Portfolio App - Next.js

A modern, full-stack portfolio website built with Next.js, featuring both a public portfolio and an admin dashboard.

## 🚀 Features

### Public Portfolio
- **Responsive Design**: Beautiful, mobile-first portfolio design
- **Multi-language Support**: Arabic and English language support
- **Dark/Light Theme**: Theme switching with Next.js themes
- **Interactive Sections**: 
  - Hero section with animated text
  - About section with flip cards
  - Skills showcase
  - Projects gallery with filtering
  - Achievements timeline
  - Contact form

### Admin Dashboard
- **Project Management**: Create, edit, and manage portfolio projects
- **Contact Management**: View and respond to contact form submissions
- **Skills Management**: Add and organize technical skills
- **Logo Management**: Upload and manage custom logos with automatic compression
- **Analytics**: Track portfolio performance and engagement

### API & Backend
- **RESTful API**: Complete API for managing portfolio data
- **Database Integration**: PostgreSQL with Prisma ORM
- **Authentication**: Secure admin authentication
- **File Upload**: Image upload and management with automatic compression
- **Logo System**: Dynamic logo management with fallback support
- **Embeddable Widget**: Standalone portfolio card for embedding in other sites

### 🎴 Embeddable Portfolio Card
- **Multi-language**: Support for Arabic and English
- **Customizable Colors**: Dynamic primary color theming
- **Responsive Design**: Works perfectly on any website
- **Easy Integration**: Simple iframe embed with URL parameters

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
portfolio-app/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (public)/                 # Public portfolio pages
│   │   ├── (dashboard)/              # Admin dashboard (protected)
│   │   ├── api/                      # API endpoints
│   │   └── layout.tsx
│   ├── components/                   # Reusable UI components
│   │   ├── ui/                       # Generic UI components
│   │   ├── portfolio/                # Portfolio-specific components
│   │   └── dashboard/                # Dashboard-specific components
│   ├── lib/                          # Utility functions
│   ├── services/                     # API services
│   │   ├── backend/                  # Server-side services
│   │   └── frontend/                 # Client-side API calls
│   ├── hooks/                        # React hooks
│   └── styles/                       # CSS styles
├── prisma/                           # Database schema and migrations
├── public/                           # Static assets
└── package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database and other configuration
   ```

4. **Setup database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Create database tables
   npm run db:push
   
   # (Optional) Seed database with sample data
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Database Setup

The project uses PostgreSQL with Prisma. Make sure to:

1. Create a PostgreSQL database
2. Update the `DATABASE_URL` in your `.env` file
3. Run database migrations: `npm run db:push`

## 📊 Database Schema

The project includes models for:
- **Users**: Admin authentication and profiles
- **Projects**: Portfolio projects with metadata
- **Skills**: Technical skills with proficiency levels
- **Achievements**: Professional achievements and milestones
- **Contacts**: Contact form submissions
- **AboutCards**: About section Q&A cards

## 🔌 API Endpoints

### Projects API
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Contact API
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact messages (admin)

### Skills API
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create new skill

## 🎨 Customization

### Styling
- Modify `src/styles/globals.css` for global styles
- Update Tailwind configuration in `tailwind.config.js`
- Customize components in `src/components/`

### Content
- Update portfolio content in component files
- Modify database schema in `prisma/schema.prisma`
- Add new API endpoints in `src/app/api/`

### Logo Management
- Upload custom logos through the dashboard at `/dashboard`
- Logos are automatically compressed for optimal performance
- Supports PNG, JPG, SVG, GIF, and WebP formats (max 5MB)
- Logos appear in the navigation bar and footer
- Falls back to `/Icon.svg` if no custom logo is uploaded
- Use transparent background PNG with wide aspect ratio for best results

## 🔧 Key Features Explained

### Image Compression
- **Client-side compression**: Images are compressed in the browser for Vercel compatibility
- **Multiple formats**: Supports all common image formats
- **Automatic optimization**: Logos are resized and optimized automatically
- **Quality control**: Maintains good quality while reducing file size

### Logo System
- **Dynamic loading**: Logos are loaded dynamically using React hooks
- **Fallback support**: Graceful fallback to default logo if custom logo fails
- **Real-time updates**: Logo changes appear immediately across the site
- **Dashboard management**: Easy upload and editing through admin interface

## 🎴 Embeddable Portfolio Card

The portfolio includes an embeddable widget that can be integrated into any website.

### Usage Examples

#### Basic Embed (Arabic - Default):
```html
<iframe 
  src="https://yourportfolio.com/embed?lang=AR&color=%23e11d48" 
  width="100%" 
  height="400" 
  frameborder="0"
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
</iframe>
```

#### English with Custom Color:
```html
<iframe 
  src="https://yourportfolio.com/embed?lang=EN&color=%233b82f6" 
  width="100%" 
  height="400" 
  frameborder="0">
</iframe>
```

### Available Parameters

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `lang` | Language (AR/EN) | `AR` | `lang=EN` |
| `color` | Primary color (hex, URL encoded) | `#3b82f6` | `color=%23e11d48` |

### Testing & Demo

- **Live Demo**: Visit `/embed-demo` to test customizations
- **Examples**: View `/embed-examples.html` for implementation examples

### Features

- ✅ **Responsive Design**: Works on all devices
- ✅ **Multi-language**: Arabic (RTL) and English (LTR) support  
- ✅ **Customizable**: Dynamic colors and theming
- ✅ **Fast Loading**: Optimized for performance
- ✅ **Secure**: Isolated from main application
- ✅ **SEO Friendly**: Proper meta tags and structure

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🔗 Links

- **Portfolio**: [Your Live Portfolio URL]
- **Dashboard**: [Your Live Portfolio URL]/dashboard
- **API Docs**: [Your Live Portfolio URL]/api

---

Built with ❤️ using Next.js and modern web technologies.
