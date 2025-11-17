# Claude Prompt: Web3 Blog System (Next.js + Wallet Login + Voting + Comments)

> Save this whole reply as a single Markdown file. The project should use **PostgreSQL** as the database and the output should be suitable to paste into a `.md` file.

```
You are a senior full-stack engineer.
Build a complete Web3-enabled blog application using **Next.js (App Router)**, **TypeScript**, and **TailwindCSS**.

## 🏗️ Architecture Requirements
- Next.js 14+ App Router
- TypeScript everywhere
- TailwindCSS for styling
- **PostgreSQL** database (use Prisma ORM configured for Postgres)
- API routes in `/app/api/*`
- Use Wagmi + ConnectKit or RainbowKit for wallet login
- Users authenticate via a signed message (“Sign-in with Ethereum” flow)
- Store authenticated user sessions using JWT or NextAuth custom provider

## 📝 Core Features
### 1. Blog Post Management
- Admin-only UI to create, edit, and delete blog posts.
- Posts contain: title, slug, cover image, markdown body, timestamp.

### 2. Public Blog Reading
- Homepage lists posts.
- Post detail page shows:
  - content rendered with markdown
  - comments section
  - upvote/downvote score
  - user wallet address of commenters

### 3. Web3 Wallet Login
- Users connect wallet → sign a message → receive JWT auth session.
- Store users in DB with:
  - id
  - walletAddress
  - createdAt

### 4. Comments
- Authenticated users can comment.
- Each comment contains:
  - postId
  - userId
  - text
  - timestamp

### 5. Upvote / Downvote System
- Users can vote on:
  - posts
  - comments
- Each user can only vote once per item.
- Vote table schema:
  ```
  id
  userId
  targetType ("post" | "comment")
  targetId
  value (1 or -1)
  timestamp
  ```

### 6. UI/UX Requirements
- Clean minimal UI with Tailwind
- Use shadcn/ui components where appropriate
- Show user wallet address when authenticated
- Realtime updating (optional but recommended using SWR or React Query)

## 🗂️ Output Format
Provide the full codebase in **organized sections**, formatted so the entire output can be saved as **one Markdown file** (`web3-blog-nextjs.md`). Include the following sections and label them clearly with headings and fenced code blocks where appropriate:

1. Project structure tree
2. `package.json`
3. Tailwind config
4. Prisma schema (configured for PostgreSQL)
5. Next.js app router files & component code (all files with paths)
6. Wallet login implementation (Wagmi + ConnectKit / RainbowKit setup)
7. API route handlers (posts, comments, votes, auth)
8. Example `.env` file (with placeholders)
9. Database migration / seed scripts (Prisma migrations and seed script)
10. Deployment instructions (Vercel + Neon/Postgres)

Each code file should be provided as a fenced code block with its relative path as a header above the block, e.g.:

```
### /prisma/schema.prisma
```prisma
...schema...
```

## 🎯 Additional Notes
- All code must be production-ready and use PostgreSQL (Prisma datasource provider = "postgresql").
- Explain how each major part works (short explanations with each major section in the markdown).
- Use robust error handling.
- Include database migrations and seed scripts that populate an admin user and example posts.
- Use optimistic UI updates for voting where appropriate.
- Ensure the sign-in-with-Ethereum flow verifies signatures server-side and stores user sessions securely.
- Make admin actions protected (only an admin address or role in DB can create/edit/delete posts).

Now generate the full project as described above, and structure the Markdown so it can be saved directly to `web3-blog-nextjs.md`.
```

---

*End of prompt. Save this Markdown file and paste it as input to Claude.*



## Color Scheme Template
```css
:root {
  --oui-font-family: 'Manrope', sans-serif;
  --oui-font-size-base: 16px;
  /* colors */
  --oui-color-primary: 251 154 27;
  --oui-color-primary-light: 252 186 92;
  --oui-color-primary-darken: 200 123 22;
  --oui-color-primary-contrast: 255 255 255;
  --oui-color-link: 251 154 27;
  --oui-color-link-light: 252 186 92;
  --oui-color-secondary: 255 255 255;
  --oui-color-tertiary: 47 31 14;
  --oui-color-quaternary: 47 31 14;
  --oui-color-danger: 245 97 139;
  --oui-color-danger-light: 250 167 188;
  --oui-color-danger-darken: 237 72 122;
  --oui-color-danger-contrast: 255 255 255;
  --oui-color-success: 41 233 169;
  --oui-color-success-light: 101 240 194;
  --oui-color-success-darken: 0 161 120;
  --oui-color-success-contrast: 255 255 255;
  --oui-color-warning: 251 154 27;
  --oui-color-warning-light: 252 186 92;
  --oui-color-warning-darken: 200 123 22;
  --oui-color-warning-contrast: 255 255 255;
  --oui-color-fill: 12 8 4;
  --oui-color-fill-active: 20 13 6;
  --oui-color-base-1: 47 31 14;
  --oui-color-base-2: 42 28 12;
  --oui-color-base-3: 37 25 11;
  --oui-color-base-4: 32 21 9;
  --oui-color-base-5: 27 18 8;
  --oui-color-base-6: 22 15 6;
  --oui-color-base-7: 20 13 6;
  --oui-color-base-8: 16 11 5;
  --oui-color-base-9: 12 8 4;
  --oui-color-base-10: 8 5 3;
  --oui-color-base-foreground: 255 255 255;
  --oui-color-line: 47 31 14;
  --oui-color-trading-loss: 245 97 139;
  --oui-color-trading-loss-contrast: 255 255 255;
  --oui-color-trading-profit: 41 233 169;
  --oui-color-trading-profit-contrast: 255 255 255;
  /* gradients */
  --oui-gradient-primary-start: 20 13 6;
  --oui-gradient-primary-end: 251 154 27;
  --oui-gradient-secondary-start: 47 31 14;
  --oui-gradient-secondary-end: 251 154 27;
  --oui-gradient-success-start: 1 83 68;
  --oui-gradient-success-end: 41 223 169;
  --oui-gradient-danger-start: 153 24 76;
  --oui-gradient-danger-end: 245 97 139;
  --oui-gradient-brand-start: 252 186 92;
  --oui-gradient-brand-end: 200 123 22;
  --oui-gradient-brand-stop-start: 6.62%;
  --oui-gradient-brand-stop-end: 86.5%;
  --oui-gradient-brand-angle: 17.44deg;
  --oui-gradient-warning-start: 47 31 14;
  --oui-gradient-warning-end: 251 154 27;
  --oui-gradient-neutral-start: 12 8 4;
  --oui-gradient-neutral-end: 20 13 6;
  /* rounded */
  --oui-rounded-sm: 2px;
  --oui-rounded: 4px;
  --oui-rounded-md: 6px;
  --oui-rounded-lg: 8px;
  --oui-rounded-xl: 12px;
  --oui-rounded-2xl: 16px;
  --oui-rounded-full: 9999px;
  /* spacing */
  --oui-spacing-xs: 20rem;
  --oui-spacing-sm: 22.5rem;
  --oui-spacing-md: 26.25rem;
  --oui-spacing-lg: 30rem;
  --oui-spacing-xl: 33.75rem;
}
html, body {
  font-family: 'Manrope', sans-serif !important;
  font-size: 16px !important;
}
```