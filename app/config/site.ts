/**
 * Site Configuration
 *
 * All branding and site-wide settings
 * Based on Honeypot Finance branding
 */

// Centralized URL mapping
const urls = {
  // Main site
  main: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  // Product URLs
  dex: "https://perp.honeypotfinance.xyz/",
  earn: "https://honeypotfinance.xyz/earn",
  docs: "https://docs.honeypotfinance.xyz/",
  pot2pump: "https://pot2pump.honeypotfinance.xyz/",
  honeygenesis: "https://magiceden.io/collections/berachain/honeygenesis-44",

  // Social & Community
  github: "https://github.com/Honeypot-Finance",
  twitter: "https://x.com/honeypotfinance",
  discord: "https://discord.gg/NfnK78KJxH",
  telegram: "https://t.me/+tE1KgsD-GxJhOTg0",
  medium: "https://medium.com/@HoneypotFinance1",

  // Assets
  logo: "https://honeypotfinance.xyz/images/honeypot-logo.svg",
} as const;

export const siteConfig = {
  name: "Honeypot Finance",
  description:
    "All-In-One Liquidity Hub Building Next-Generation DeFi Infrastructure",
  tagline:
    "Next-Gen Dex++ combining pro trading tools and behaviour-driven incentives",

  // Extended description
  fullDescription:
    "Honeypot combines pro trading tools and behaviour-driven incentives, solving idle TVL, inefficient incentives & market fragmentation across DeFi",

  // URLs - using centralized mapping
  url: urls.main,
  urls,

  // Logo and branding assets
  logo: {
    text: "Honeypot Finance",
    icon: urls.logo,
    image: urls.logo,
  },

  // Navigation
  navigation: {
    main: [
      { name: "Governance", href: "/" },
      {
        name: "Trade",
        href: urls.dex,
        external: true,
      },
      {
        name: "Earn",
        href: urls.earn,
        external: true,
      },
      {
        name: "Docs",
        href: urls.docs,
        external: true,
      },
    ],
    admin: [{ name: "Admin", href: "/admin" }],
  },

  // Homepage content
  homepage: {
    title: "Honeypot Finance Governance",
    subtitle: "Community-driven governance for the All-In-One Liquidity Hub",
    cta: "🔥 Vote on proposals and shape the future of DeFi 🔥",
  },

  // Features list
  features: [
    "Perp Trading - Trade perpetual futures with real on-chain depth",
    "Spot Trading - Instant token swaps with deep liquidity",
    "Automated AMM - Optimized market making",
    "Multichain - Seamless cross-chain trading",
  ],

  // Product highlights
  products: {
    perpDex: {
      name: "Perp DEX",
      features: [
        "Vault-Based Risk Engine",
        "Isolated Senior & Junior vaults",
        "AMM-Native Matching",
        "100% on-chain liquidity",
      ],
    },
  },

  // Footer content
  footer: {
    copyright: `© ${new Date().getFullYear()} Honeypot Finance. All rights reserved.`,
    tagline: "Next-Generation DeFi Infrastructure",
    links: [
      { name: "Docs", href: urls.docs },
      { name: "Trade", href: urls.dex },
      { name: "Discord", href: urls.discord },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
