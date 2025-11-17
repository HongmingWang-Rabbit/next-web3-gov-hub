# Configuration Guide

This project uses a modular configuration system located in the `app/config/` directory. All hardcoded values for branding, colors, chains, and admin settings are centralized in these config files.

## Configuration Files

### 1. Site Configuration (`app/config/site.ts`)

Controls all site-wide settings and branding:

```typescript
export const siteConfig = {
  name: 'Web3 Gov Hub',
  description: 'A Web3-enabled blog platform...',
  tagline: 'Decentralized governance...',

  // URLs
  url: process.env.NEXT_PUBLIC_APP_URL,

  // Social links
  links: {
    github: 'https://github.com/...',
    twitter: '',
    discord: '',
  },

  // Logo and branding
  logo: {
    text: 'Web3 Gov Hub',
    icon: '/logo.png',
    image: '/logo-full.png',
  },

  // Navigation
  navigation: {
    main: [
      { name: 'Blog', href: '/' },
      { name: 'About', href: '/about' },
    ],
    admin: [
      { name: 'Admin', href: '/admin' },
    ],
  },

  // Homepage content
  homepage: {
    title: 'Welcome to Web3 Gov Hub',
    subtitle: 'Decentralized governance...',
  },
}
```

**To customize:**
- Change `name` to update the site title everywhere
- Modify `homepage.title` and `homepage.subtitle` for homepage text
- Add/remove navigation items in `navigation.main`
- Update social links

### 2. Theme Configuration (`app/config/theme.ts`)

Controls all colors, fonts, and styling:

```typescript
export const themeConfig = {
  // Font family
  fonts: {
    base: 'Manrope, sans-serif',
    heading: 'Manrope, sans-serif',
    googleFontsUrl: 'https://fonts.googleapis.com/...',
  },

  // Color palette (RGB values)
  colors: {
    primary: '251 154 27',
    primaryLight: '252 186 92',
    primaryDarken: '200 123 22',
    danger: '245 97 139',
    success: '41 233 169',
    // ... more colors
  },

  // Border radius
  radius: {
    sm: '2px',
    default: '4px',
    lg: '8px',
    // ... more sizes
  },
}
```

**To customize:**
- Change color values in `colors` object (use RGB format: "R G B")
- Update font family in `fonts.base`
- Modify border radius values
- Update the corresponding CSS variables in `app/globals.css` to match

**Important:** When changing theme colors, you must update BOTH:
1. The config file (`app/config/theme.ts`)
2. The CSS file (`app/globals.css`)

### 3. Chains Configuration (`app/config/chains.ts`)

Controls blockchain settings:

```typescript
export const chainsConfig = {
  // Supported chains
  chains: [mainnet, sepolia, polygon, polygonAmoy],

  // Default chain
  defaultChain: mainnet,

  // WalletConnect settings
  walletConnect: {
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  },

  // App metadata
  appMetadata: {
    name: 'Web3 Gov Hub',
    description: '...',
    url: 'https://web3govhub.com',
    icon: 'https://web3govhub.com/logo.png',
  },

  // ConnectKit theme
  connectKit: {
    theme: 'midnight',
    customTheme: {
      '--ck-font-family': 'Manrope, sans-serif',
      '--ck-connectbutton-background': 'rgb(251, 154, 27)',
      // ... more styling
    },
  },
}
```

**To customize:**
- Add/remove chains from `chains` array
- Change `defaultChain`
- Customize ConnectKit button colors in `connectKit.customTheme`
- Update app metadata for wallet displays

### 4. Admin Configuration (`app/config/admin.ts`)

Controls admin-related settings:

```typescript
export const adminConfig = {
  // Admin wallet addresses (from environment)
  addresses: process.env.ADMIN_ADDRESSES.split(','),

  // Admin panel settings
  panel: {
    postsPerPage: 20,
    allowPostDrafts: true,
  },

  // Content restrictions
  content: {
    maxPostTitleLength: 200,
    maxCommentLength: 2000,
  },
}
```

**To customize:**
- Change pagination in `panel.postsPerPage`
- Modify content length limits
- Add new admin-specific settings

## How to Use Config in Your Code

### Import entire config:
```typescript
import { siteConfig, themeConfig, chainsConfig, adminConfig } from '@/config';

// Or import individually:
import { siteConfig } from '@/config/site';
```

### Examples:

**Using site config:**
```typescript
import { siteConfig } from '@/config/site';

export default function Header() {
  return <h1>{siteConfig.name}</h1>;
}
```

**Using theme config:**
```typescript
import { themeConfig } from '@/config/theme';

const buttonColor = `rgb(${themeConfig.colors.primary})`;
```

**Using chains config:**
```typescript
import { chainsConfig } from '@/config/chains';

const supportedChains = chainsConfig.chains;
```

**Using admin config:**
```typescript
import { isAdminAddress } from '@/config/admin';

if (isAdminAddress(walletAddress)) {
  // User is admin
}
```

## Common Customization Tasks

### Change Site Name
1. Edit `app/config/site.ts`
2. Update `name` property
3. Site name updates everywhere automatically

### Change Color Scheme
1. Edit `app/config/theme.ts`
2. Update color values in `colors` object
3. Edit `app/globals.css`
4. Update corresponding CSS variables

### Add a New Blockchain
1. Edit `app/config/chains.ts`
2. Import the chain: `import { arbitrum } from 'wagmi/chains'`
3. Add to `chains` array: `chains: [mainnet, arbitrum, ...]`

### Change Homepage Text
1. Edit `app/config/site.ts`
2. Update `homepage.title` and `homepage.subtitle`

### Add Navigation Items
1. Edit `app/config/site.ts`
2. Add to `navigation.main` array:
```typescript
navigation: {
  main: [
    { name: 'Blog', href: '/' },
    { name: 'Docs', href: '/docs' },  // New item
  ],
}
```

## Environment Variables

Some config values come from environment variables:

- `NEXT_PUBLIC_APP_URL` → `siteConfig.url`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` → `chainsConfig.walletConnect.projectId`
- `ADMIN_ADDRESSES` → `adminConfig.addresses`

Set these in your `.env` file.

## Best Practices

1. **Never hardcode values** - Always use config files
2. **Keep CSS in sync** - When changing theme config, update `globals.css`
3. **Use TypeScript** - Config is fully typed for autocomplete
4. **Document changes** - Add comments for custom values
5. **Test after changes** - Verify the app works after config changes

## Troubleshooting

**Colors not updating?**
- Check both `theme.ts` and `globals.css` are updated
- Clear browser cache
- Restart dev server

**Chain not showing?**
- Verify chain is imported from `wagmi/chains`
- Check transport is added for the chain
- Ensure WalletConnect supports the chain

**Admin access not working?**
- Verify wallet address is in `.env` `ADMIN_ADDRESSES`
- Address must be lowercase
- Restart server after changing `.env`
