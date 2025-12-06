'use client';

import { useState, useEffect, useMemo } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { getConfig } from '@/lib/wagmi';
import { chainsConfig } from '@/config/chains';
import { AuthProvider } from './auth-provider';

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    setMounted(true);
  }, []);

  const wagmiConfig = useMemo(() => {
    if (typeof window !== 'undefined') {
      return getConfig();
    }
    return null;
  }, []);

  if (!mounted || !wagmiConfig) {
    return <>{children}</>;
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme={chainsConfig.connectKit.theme}
          customTheme={chainsConfig.connectKit.customTheme}
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
