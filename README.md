# Rajaul's Portfolio

A modern, minimalist portfolio website built with Next.js 14, featuring a photography gallery with admin panel, blog, and visitor analytics.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)

## ✨ Features

- **Photography Gallery** - Pinterest-style masonry layout with auto card sizing
- **Admin Dashboard** - Password-protected photo management
- **Cloudinary Integration** - Image uploads and optimization
- **Visitor Analytics** - Track unique visitors, daily/weekly stats
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Responsive Design** - Mobile-first approach
- **Blog** - Technical articles with syntax highlighting
- **Contact Form** - With form validation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL (Neon)
- **Image Hosting**: Cloudinary
- **Authentication**: JWT (jose)
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/uddin-rajaul/my-portfolio.git
   cd my-portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create `.env.local` from the example:
   ```bash
   cp .env.example .env.local
   ```

4. Update `.env.local` with your credentials:
   ```env
   DATABASE_URL=postgresql://user:password@host:5432/database
   SECRET_KEY=your-secret-key
   JWT_SECRET=your-jwt-secret
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=1440
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ADMIN_PASSWORD=your-secure-password
   ```

5. Run the development server:
   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── (main)/           # Main route group with navigation
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── photography/
│   │   │   ├── admin/    # Protected admin dashboard
│   │   │   └── page.tsx  # Public gallery
│   │   └── projects/
│   ├── api/
│   │   ├── analytics/    # Visitor tracking
│   │   ├── auth/         # Login/logout/verify
│   │   └── photos/       # CRUD operations
│   └── page.tsx          # Homepage
├── components/
│   ├── home/             # Homepage components
│   ├── ui/               # shadcn/ui components
│   └── ...
├── lib/
│   ├── auth.ts           # JWT utilities
│   ├── cloudinary.ts     # Cloudinary config
│   ├── db.ts             # PostgreSQL connection
│   └── utils.ts
└── public/
    └── images/           # Static assets
```

## 🔐 Admin Access

Navigate to `/photography/admin` and enter your `ADMIN_PASSWORD` to:
- Upload new photos
- Edit photo details (title, location, description)
- Delete photos
- View visitor analytics

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Settings
4. Deploy!

### Environment Variables for Production

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (use Neon/Supabase) |
| `SECRET_KEY` | Random 32-byte hex string |
| `JWT_SECRET` | Random 32-byte hex string |
| `ALGORITHM` | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `1440` (24 hours) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `ADMIN_PASSWORD` | Strong password for admin access |

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 👤 Author

**Rajaul Uddin**
- GitHub: [@uddin-rajaul](https://github.com/uddin-rajaul)
- LinkedIn: [rajaul-uddin](https://linkedin.com/in/rajaul-uddin)
