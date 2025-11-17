/**
 * Site Configuration
 *
 * All branding and site-wide settings
 */

export const siteConfig = {
  name: 'Web3 Gov Hub',
  description: 'A Web3-enabled blog platform with voting and governance features',
  tagline: 'Decentralized governance and community-driven content powered by Web3',

  // URLs
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  // Social links (optional)
  links: {
    github: 'https://github.com/yourusername/next-web3-gov-hub',
    twitter: '',
    discord: '',
  },

  // Logo and branding assets
  logo: {
    text: 'Web3 Gov Hub',
    icon: '/logo.png', // Path to logo icon
    image: '/logo-full.png', // Path to full logo image
  },

  // Navigation
  navigation: {
    main: [
      { name: 'Blog', href: '/' },
    ],
    admin: [
      { name: 'Admin', href: '/admin' },
    ],
  },

  // Homepage content
  homepage: {
    title: 'Welcome to Web3 Gov Hub',
    subtitle: 'Decentralized governance and community-driven content powered by Web3',
  },

  // Features list
  features: [
    'Web3 Wallet Authentication',
    'Community Voting System',
    'Decentralized Governance',
    'Transparent and Secure',
  ],

  // Footer content
  footer: {
    copyright: `© ${new Date().getFullYear()} Web3 Gov Hub. All rights reserved.`,
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
