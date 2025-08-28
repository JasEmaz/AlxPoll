# Installation Guide for ALX Poll

This document provides the necessary commands to install and set up all dependencies for the ALX Poll application.

## Core Dependencies

These commands will install the core dependencies for the Next.js application with Shadcn UI components.

```bash
# Create a new Next.js project (if not already done)
npx create-next-app@latest alx_poll --typescript --tailwind --eslint
cd alx_poll

# Install Shadcn UI dependencies
npm install @radix-ui/react-accordion
npm install @radix-ui/react-label
npm install @radix-ui/react-navigation-menu
npm install @radix-ui/react-slot
npm install @radix-ui/react-form

# Install form handling libraries
npm install react-hook-form zod @hookform/resolvers

# Install utility libraries
npm install class-variance-authority clsx tailwind-merge

# Install Recharts for data visualization
npm install recharts
```

## Setting up Shadcn UI

Shadcn UI is a collection of reusable components built using Radix UI and Tailwind CSS. Here's how to set it up:

```bash
# Install the Shadcn CLI
npm install -D @shadcn/ui

# Initialize Shadcn UI
npx shadcn-ui init
```

When prompted during initialization, choose the following options:
- Would you like to use TypeScript? **Yes**
- Which style would you like to use? **Default**
- Which color would you like to use as base color? **Slate**
- Where is your global CSS file? **app/globals.css**
- Do you want to use CSS variables for colors? **Yes**
- Where is your tailwind.config.js located? **tailwind.config.js**
- Configure the import alias for components? **@/components**
- Configure the import alias for utils? **@/lib/utils**
- Are you using React Server Components? **Yes**

## Installing Shadcn UI Components

Install the specific Shadcn UI components used in this project:

```bash
npx shadcn-ui add button
npx shadcn-ui add form
npx shadcn-ui add input
npx shadcn-ui add label
npx shadcn-ui add textarea
npx shadcn-ui add accordion
npx shadcn-ui add card
npx shadcn-ui add navigation-menu
```

## Supabase Integration

To integrate Supabase for authentication and database:

```bash
# Install Supabase client library
npm install @supabase/supabase-js

# For auth helpers with Next.js
npm install @supabase/auth-helpers-nextjs
```

## Additional UI Dependencies

For enhanced UI features:

```bash
# For icons
npm install lucide-react

# For QR code generation
npm install react-qr-code

# For toast notifications
npx shadcn-ui add toast
```

## Development Tools

Optional development tools that might be helpful:

```bash
# For better TypeScript DX
npm install -D typescript @types/node @types/react @types/react-dom

# For testing
npm install -D jest @testing-library/react @testing-library/jest-dom
```

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Running the Application

After installing all dependencies, you can run the application:

```bash
npm run dev
```

The application will be available at http://localhost:3000.