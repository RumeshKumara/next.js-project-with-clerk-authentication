# Next.js Auth App with Clerk and Prisma RBAC

[![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-orange?style=flat&logo=clerk)](https://clerk.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5+-blue?style=flat&logo=prisma)](https://prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat&logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-green?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

A full-stack Next.js application demonstrating user authentication with Clerk, role-based access control (RBAC) for "customer" and "admin" roles, and data persistence with Prisma (PostgreSQL). Users are synced between Clerk and the database via webhooks.

## Description

This app provides:
- Secure sign-up, sign-in, and sign-out via Clerk.
- Role detection and enforcement (default: "customer"; admin set manually).
- Protected routes (e.g., `/dashboard`, `/admin/dashboard`).
- User profile management with database storage (e.g., bio, full name).
- Automatic syncing of Clerk user data to Prisma on creation/update.

Ideal for learning or bootstrapping auth-heavy apps. Built with Next.js 13+ App Router.

## Features

- **Authentication**: Email/password + social logins via Clerk.
- **RBAC**: Server-side role checks; admin-only routes.
- **Database**: Prisma ORM for PostgreSQL; webhooks for Clerk sync.
- **UI**: Tailwind CSS for styling; Clerk's pre-built components.
- **Security**: Middleware for route protection; private metadata for roles.

## Tech Stack

- **Frontend/Backend**: Next.js 13+ (App Router, TypeScript).
- **Auth**: Clerk.
- **Database**: Prisma + PostgreSQL.
- **Styling**: Tailwind CSS.
- **Linting**: ESLint.
- **Deployment**: Vercel (recommended).

## Prerequisites

- Node.js (v18+).
- [Clerk Account](https://clerk.com): Create an app and note API keys.
- [PostgreSQL Database](https://neon.tech) (free tier): Get `DATABASE_URL`.
- Git (optional).

## Installation & Setup

1. **Clone the Repo**:
   ```bash
   git clone <your-repo-url>
   cd my-auth-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Copy `.env.example` to `.env.local` and fill in:
   ```
   # Clerk (from Dashboard > API Keys)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-publishable-key
   CLERK_SECRET_KEY=sk_test_your-secret-key
   CLERK_WEBHOOK_SECRET=whsec_your-webhook-secret  # From Dashboard > Webhooks

   # Next.js Clerk URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/profile/setup

   # Database
   DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
   ```

4. **Database Setup**:
   ```bash
   npx prisma db push  # Apply schema
   npx prisma generate  # Generate client
   ```

5. **Clerk Webhooks**:
   - In Clerk Dashboard > Webhooks > Add Endpoint: URL = `/api/webhooks/clerk`.
   - Select events: `user.created`, `user.updated`.
   - Copy Signing Secret to `CLERK_WEBHOOK_SECRET`.

6. **Run Locally**:
   ```bash
   npm run dev
   ```
   - Visit `http://localhost:3000`.
   - Sign up → Auto-set role → View profile (synced to DB).

## Usage

- **Sign Up/In**: `/sign-up` or `/sign-in`.
- **Homepage (`/`)**: Role-specific UI (customer: orders link; admin: manage users).
- **Profile (`/profile`)**: View/edit DB-stored data (e.g., bio).
- **Dashboard (`/dashboard`)**: Basic protected page.
- **Admin (`/admin/dashboard`)**: Admin-only; redirects others to `/unauthorized`.
- **Test Roles**: After sign-up, edit user in Clerk Dashboard > Users > Metadata > `private_metadata: { "role": "admin" }`.

For local webhook testing: Use `ngrok http 3000` and update Clerk endpoint to ngrok URL.

## Folder Structure

```
my-auth-app/
├── .env.local                  # Env vars (Clerk keys, DB URL)
├── middleware.ts               # Auth middleware + role checks
├── prisma/
│   └── schema.prisma           # DB models (User)
├── src/
│   ├── app/                    # Routes & pages
│   │   ├── api/webhooks/clerk/route.ts  # Clerk sync webhook
│   │   ├── globals.css         # Tailwind styles
│   │   ├── layout.tsx          # Root layout (ClerkProvider)
│   │   ├── page.tsx            # Homepage (/)
│   │   ├── profile/
│   │   │   ├── page.tsx        # /profile (DB fetch)
│   │   │   └── setup/page.tsx  # /profile/setup (post-sign-up)
│   │   ├── sign-in/[[...sign-in]]/page.tsx  # Sign-in
│   │   ├── sign-up/[[...sign-up]]/page.tsx  # Sign-up
│   │   ├── dashboard/page.tsx  # /dashboard
│   │   ├── admin/dashboard/page.tsx  # /admin/dashboard
│   │   └── unauthorized/page.tsx  # Access denied
│   └── lib/
│       └── prisma.ts           # Prisma Client singleton
└── ... (standard Next.js files)
```

## Available Scripts

- `npm run dev`: Start dev server.
- `npm run build`: Build for production.
- `npm run start`: Run production server.
- `npm run lint`: Lint code.
- `npx prisma db push`: Sync schema to DB.
- `npx prisma generate`: Regenerate Prisma Client.
- `npx prisma studio`: Open DB GUI.

## Deployment

1. Push to GitHub.
2. Import to [Vercel](https://vercel.com).
3. Add env vars in Vercel Dashboard.
4. Deploy: Auto-builds; Prisma schema applies via `db push` in build script.

For other hosts (e.g., Railway), ensure `DATABASE_URL` and webhook endpoint.

## Contributing

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit changes (`git commit -m 'Add some amazing feature'`).
4. Push to branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Support

- Issues: [GitHub Issues](https://github.com/yourusername/my-auth-app/issues).
- Docs: [Clerk Next.js](https://clerk.com/docs/quickstarts/nextjs), [Prisma](https://prisma.io/docs).

Built with ❤️ by [Your Name] – October 2025. Questions? Open an issue!
