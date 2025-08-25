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
- **Analytics**: Track portfolio performance and engagement

### API & Backend
- **RESTful API**: Complete API for managing portfolio data
- **Database Integration**: PostgreSQL with Prisma ORM
- **Authentication**: Secure admin authentication
- **File Upload**: Image upload and management

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
