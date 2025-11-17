/**
 * Blockchain Configuration
 *
 * Supported chains and Web3 settings
 */

import { mainnet, sepolia, polygon, polygonAmoy } from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';

export const chainsConfig = {
  // Supported chains
  chains: [mainnet, sepolia, polygon, polygonAmoy] as readonly [Chain, ...Chain[]],

  // Default chain
  defaultChain: mainnet,

  // WalletConnect settings
  walletConnect: {
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    // Optional: Add more WalletConnect options here
  },

  // App metadata for wallet connections
  appMetadata: {
    name: 'Web3 Gov Hub',
    description: 'A Web3-enabled blog platform with voting and governance',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://web3govhub.com',
    icon: 'https://web3govhub.com/logo.png',
  },

  // ConnectKit theme settings
  connectKit: {
    theme: 'midnight' as const,
    customTheme: {
      '--ck-font-family': 'Manrope, sans-serif',
      '--ck-border-radius': '8px',
      '--ck-connectbutton-background': 'rgb(251, 154, 27)',
      '--ck-connectbutton-hover-background': 'rgb(200, 123, 22)',
      '--ck-connectbutton-color': 'rgb(255, 255, 255)',
    },
  },
} as const;

export type ChainsConfig = typeof chainsConfig;
