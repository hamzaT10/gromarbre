# Gromarbre - Luxury Marble Company Website

## Overview

Gromarbre is a luxury marble company website built with React and Express, showcasing premium marble solutions from Casablanca, Morocco. The application features a comprehensive multi-page company website with an elegant splash screen, detailed service offerings, project portfolios, marble product catalogs, and client contact functionality. The site emphasizes the company's 20+ years of experience in custom marble design projects for hotels, universities, residences, and commercial spaces.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing across multiple pages (Home, Services, Projects, Products, Contact)
- **State Management**: TanStack React Query for server state management and API interactions
- **Styling**: Tailwind CSS with custom color variables for brand consistency (gold/blue theme)
- **UI Components**: Radix UI primitives with shadcn/ui component library for accessible, customizable components
- **Animations**: Framer Motion for smooth page transitions and scroll-based reveals
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Server**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API endpoints for contact form submissions
- **Request Handling**: Express middleware for JSON parsing, URL encoding, and error handling
- **Development**: Hot module replacement with Vite integration for seamless development experience

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database interactions
- **Database**: PostgreSQL with Neon serverless connection
- **Schema**: Structured tables for users and contact form submissions
- **Validation**: Zod schemas for runtime type validation and data integrity
- **Storage Interface**: Abstracted storage layer supporting both in-memory (development) and database persistence

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Model**: Basic user authentication structure with username/password fields
- **Security**: Input validation and sanitization through Zod schemas

### External Dependencies
- **Database**: Neon PostgreSQL serverless database
- **Email Integration**: Contact form submissions stored in database (ready for email service integration)
- **Maps**: Google Maps integration for showroom location display
- **Fonts**: Google Fonts (Cormorant Garamond for headings, Raleway for body text)
- **Icons**: Font Awesome 6.4.0 for consistent iconography
- **Image Hosting**: Unsplash for high-quality marble and interior photography

The architecture follows a monorepo structure with shared TypeScript definitions, enabling type safety across client and server boundaries. The design emphasizes performance with code splitting, lazy loading, and optimized build processes through Vite.