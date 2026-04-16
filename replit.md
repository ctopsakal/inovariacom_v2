# i-novaria - xpoda No-Code/Low-Code Platform Partner Website

## Overview

This is a marketing website for i-novaria, a Turkish company that serves as an official partner for the xpoda no-code/low-code platform. The application showcases the company's services, platform advantages, global market trends, use cases, and provides a contact form for potential customers.

The project follows a full-stack TypeScript architecture with a React frontend and Express backend, designed to run on Replit with PostgreSQL database support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for section animations
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite

The frontend is a single-page application with smooth-scrolling navigation between sections. All UI components are located in `client/src/components/ui/` following the shadcn/ui pattern with customizable variants.

### Backend Architecture
- **Framework**: Express.js 5 running on Node.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Development**: Vite middleware for HMR in development
- **Production**: Static file serving from built assets

The server handles:
- Contact form submissions via POST `/api/contact`
- Contact message retrieval via GET `/api/contact` (requires admin authentication)
- Admin login via POST `/api/admin/login`

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Migrations**: Drizzle Kit with `db:push` command
- **Storage**: PostgreSQL database via `DatabaseStorage` class

### Admin Panel
- **URL**: `/admin`
- **Password**: Stored in `ADMIN_PASSWORD` environment variable (default: `inovaria2026`)
- **Features**: View all contact form submissions with date, subject, and full message details
- **Authentication**: Backend token-based auth with Authorization header

Database tables:
- `users`: Basic user authentication (id, username, password)
- `contact_messages`: Contact form submissions (name, email, phone, company, subject, message, createdAt)

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # Page sections and UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and query client
│   │   └── pages/        # Route page components
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data storage interface
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared code between frontend/backend
│   └── schema.ts     # Drizzle schema and Zod types
└── migrations/       # Database migrations
```

### Build System
- Development: `npm run dev` runs tsx with Vite middleware
- Production: `npm run build` uses custom build script that:
  - Builds client with Vite
  - Bundles server with esbuild (selected dependencies bundled for cold start optimization)
- Type checking: `npm run check` runs TypeScript compiler

## External Dependencies

### Database
- **PostgreSQL**: Primary database via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database query builder and schema management
- **connect-pg-simple**: PostgreSQL session store (available but not currently used)

### UI/UX Libraries
- **Radix UI**: Accessible component primitives (dialog, dropdown, forms, etc.)
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Framer Motion**: Animation library

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation (shared with drizzle-zod for type safety)
- **@hookform/resolvers**: Zod resolver for React Hook Form

### Development Tools
- **Vite**: Frontend build tool with HMR
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Production server bundling
- **Replit plugins**: Runtime error overlay, cartographer, dev banner

### Fonts
- Google Fonts: Inter, Plus Jakarta Sans, JetBrains Mono (loaded via CDN)