# CV Deck - Modern Portfolio Website

A stunning, Apple-inspired CV Deck website built with Next.js 15, TypeScript, and modern web technologies. Features smooth scroll animations, a contact form with email notifications, and serverless database integration.

## Features

- 🎨 **Apple-inspired Design**: Clean, minimalist design with generous whitespace
- ✨ **Smooth Animations**: Framer Motion powered scroll reveals and transitions
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- 📧 **Contact Form**: Integrated form with Resend email notifications
- 🗄️ **Database Integration**: Neon Postgres for storing form submissions
- ⚡ **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS
- 🔒 **Type Safe**: Zod validation and TypeScript throughout

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Database**: Neon Postgres + Drizzle ORM
- **Email**: Resend
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Neon Postgres database (free tier available)
- A Resend account and API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd about
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
# Neon Postgres Database
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# Resend Email API
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Resend Email Configuration
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_TO_EMAIL=your-email@example.com
```

4. Set up the database:
```bash
# Generate migration files
npm run db:generate

# Push schema to database
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploying to Vercel

1. **Push to GitHub**: Push your code to a GitHub repository

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**:
   In Vercel project settings, add all environment variables from your `.env.local`:
   - `DATABASE_URL`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_TO_EMAIL`

4. **Deploy**: Vercel will automatically deploy your application

### Setting up Neon Database

1. **Create Account**: Sign up at [neon.tech](https://neon.tech)

2. **Create Project**: Create a new project in the Neon console

3. **Get Connection String**: Copy your connection string from the Neon dashboard

4. **Run Migrations**: After deployment, you can run migrations using:
   ```bash
   npm run db:push
   ```

### Setting up Resend

1. **Create Account**: Sign up at [resend.com](https://resend.com)

2. **Get API Key**: Create an API key in the Resend dashboard

3. **Verify Domain** (optional): For production, verify your sending domain

4. **Configure Emails**: Set `RESEND_FROM_EMAIL` to a verified email/domain

## Project Structure

```
about/
├── app/
│   ├── api/contact/route.ts    # Contact form API endpoint
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                # Main page
│   └── globals.css             # Global styles
├── components/
│   ├── animations/             # Scroll animation components
│   ├── sections/               # Page sections
│   └── ui/                     # Reusable UI components
├── lib/
│   ├── db/                     # Database schema and client
│   ├── email/                  # Email client
│   └── utils/                  # Utility functions
├── zod/                        # Zod validation schemas
└── types/                      # TypeScript types
```

## Customization

### Update Content

- **Hero Section**: Edit `components/sections/HeroSection.tsx`
- **About Section**: Edit `components/sections/AboutSection.tsx`
- **Skills**: Update the skills array in `AboutSection.tsx`

### Styling

The design system uses Tailwind CSS. Customize colors, spacing, and typography in `app/globals.css` and component files.

### Animations

Animation behavior can be adjusted in `components/animations/ScrollReveal.tsx`.

## License

This project is open source and available for use as a business card/portfolio template.

## Contributing

This is a personal portfolio project, but feel free to fork and customize for your own use!
