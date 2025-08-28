# ALX Poll - Next.js Polling Application

A modern polling application built with Next.js, Supabase, and Shadcn UI components. Create, share, and analyze polls with ease.

## Features

- User authentication (login/register)
- Create polls with multiple options
- Vote on polls
- View poll results with charts
- Share polls via links and QR codes
- Dashboard to manage your polls

## Tech Stack

- **Frontend**: Next.js 15.5.2 with App Router, React 19.1.0, TypeScript
- **UI Components**: Shadcn UI (built on Radix UI)
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Backend**: Supabase (Auth and Database) - to be integrated

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/alx_poll.git
cd alx_poll
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Installing Shadcn UI Components

This project uses Shadcn UI components. The core components are already included, but if you need to add more, you can use the following commands:

```bash
# Install the Shadcn CLI
npm install -D @shadcn/ui

# Initialize Shadcn UI (if not already done)
npx shadcn-ui init

# Add specific components
npx shadcn-ui add button
npx shadcn-ui add form
npx shadcn-ui add input
# etc.
```

## Setting Up Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Set up authentication providers in the Supabase dashboard
3. Create the necessary database tables for polls, options, and votes
4. Update your environment variables with your Supabase credentials

## Project Structure

```
/app                  # Next.js App Router pages
  /auth               # Authentication pages
    /login
    /register
  /dashboard          # User dashboard
  /polls              # Poll pages
    /[id]             # View specific poll
    /create           # Create new poll
  layout.tsx          # Root layout with navigation
  page.tsx            # Homepage

/components           # React components
  /auth               # Auth-related components
  /ui                 # Shadcn UI components

/lib                  # Utility functions
  utils.ts            # Helper functions

/public               # Static assets
```

## Future Enhancements

- Real-time updates for poll results
- Social media sharing
- Advanced poll options (multiple choice, date ranges)
- Analytics dashboard
- Export poll results

## License

MIT
