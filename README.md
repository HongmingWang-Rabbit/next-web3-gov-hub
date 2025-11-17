# Web3 Gov Hub

A decentralized governance and blogging platform powered by Web3 technology. Built with Next.js, TypeScript, PostgreSQL, and Web3 wallet authentication.

## Features

- **Web3 Wallet Authentication**: Sign in with Ethereum using SIWE (Sign-In with Ethereum)
- **Blog Post Management**: Admin-only interface to create, edit, and delete posts
- **Community Voting**: Upvote and downvote posts and comments
- **Comment System**: Authenticated users can comment on posts
- **Markdown Support**: Rich content formatting with markdown
- **Responsive Design**: Beautiful UI with custom color scheme
- **Modular Configuration**: All branding, colors, and settings in centralized config files

## Configuration System

This project features a **modular configuration system** that makes customization easy. All hardcoded values (branding, colors, chains, admin settings) are centralized in the `app/config/` directory:

- **`config/site.ts`** - Site name, branding, navigation, homepage content
- **`config/theme.ts`** - Color scheme, fonts, styling variables
- **`config/chains.ts`** - Blockchain networks, WalletConnect settings
- **`config/admin.ts`** - Admin permissions and content restrictions

**Quick customization example:**
```typescript
// Change site name - edit app/config/site.ts
export const siteConfig = {
  name: 'Your Custom Name',  // Updates everywhere!
  // ...
}
```

For detailed configuration instructions, see [CONFIG.md](./CONFIG.md).

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React 19, TypeScript
- **Styling**: TailwindCSS with custom color scheme
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Wagmi, ConnectKit, SIWE, JWT
- **UI Components**: shadcn/ui with Radix UI primitives

## Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- WalletConnect Project ID ([Get one here](https://cloud.walletconnect.com/))
- A Web3 wallet (MetaMask, Rainbow, etc.)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/next-web3-gov-hub.git
cd next-web3-gov-hub
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Update the `.env` file with your values:

```env
# Database (use your PostgreSQL connection string)
DATABASE_URL="postgresql://username:password@localhost:5432/web3_blog?schema=public"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your-walletconnect-project-id"

# Admin wallet addresses (comma-separated, lowercase)
ADMIN_ADDRESSES="0x1234...,0x5678..."

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Set up the database

Push the Prisma schema to your database:

```bash
pnpm db:push
```

Seed the database with sample data:

```bash
pnpm db:seed
```

**Important**: Update the admin wallet address in `prisma/seed.ts` before seeding!

### 5. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
next-web3-gov-hub/
├── app/
│   ├── admin/              # Admin panel for post management
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── posts/          # Post CRUD operations
│   │   ├── comments/       # Comment operations
│   │   └── votes/          # Voting operations
│   ├── components/         # React components
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configs
│   ├── posts/[slug]/       # Blog post detail pages
│   ├── providers/          # Context providers
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeding script
├── public/                 # Static assets
└── types/                  # TypeScript type definitions
```

## Database Schema

### User
- `id`: Unique identifier
- `walletAddress`: Ethereum wallet address (unique)
- `isAdmin`: Boolean flag for admin privileges
- `createdAt`: Timestamp

### Post
- `id`: Unique identifier
- `title`: Post title
- `slug`: URL-friendly slug (unique)
- `coverImage`: Optional cover image URL
- `content`: Markdown content
- `published`: Publication status
- `authorId`: Reference to User
- `createdAt`, `updatedAt`: Timestamps

### Comment
- `id`: Unique identifier
- `text`: Comment content
- `postId`: Reference to Post
- `userId`: Reference to User
- `createdAt`: Timestamp

### Vote
- `id`: Unique identifier
- `value`: 1 (upvote) or -1 (downvote)
- `targetType`: "post" or "comment"
- `targetId`: ID of the target
- `userId`: Reference to User
- Unique constraint: One vote per user per target

## Key Features Explained

### Authentication Flow

1. User connects their Web3 wallet via ConnectKit
2. User clicks "Sign In" to initiate SIWE flow
3. A nonce is generated and signed by the user's wallet
4. Server verifies the signature and creates a JWT session
5. JWT is stored in an HTTP-only cookie

### Voting System

- Users can upvote (+1) or downvote (-1) posts and comments
- Each user can only vote once per item
- Clicking the same vote again removes it
- Vote scores are calculated in real-time

### Admin Panel

- Only users with admin privileges can access `/admin`
- Admins can create, edit, and delete blog posts
- Admin addresses are configured via environment variables

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Database Hosting

Recommended PostgreSQL hosting options:
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Supabase](https://supabase.com) - PostgreSQL with additional features
- [Railway](https://railway.app) - Simple deployment platform

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform:
- `DATABASE_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `ADMIN_ADDRESSES`
- `NEXT_PUBLIC_APP_URL`

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:push` - Push Prisma schema to database
- `pnpm db:seed` - Seed database with sample data
- `pnpm db:studio` - Open Prisma Studio

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [TailwindCSS](https://tailwindcss.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Web3 integration with [Wagmi](https://wagmi.sh) and [ConnectKit](https://docs.family.co/connectkit)
