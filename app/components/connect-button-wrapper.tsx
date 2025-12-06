'use client';

import { ConnectKitButton } from 'connectkit';
import { Wallet } from 'lucide-react';

export default function ConnectButtonWrapper() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address, ensName }) => {
        return (
          <button
            onClick={show}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-[rgb(var(--primary))] text-[rgb(var(--primary))] rounded-lg hover:bg-[rgb(var(--primary))] hover:text-white transition-colors"
          >
            <Wallet className="w-4 h-4" />
            {isConnected ? (ensName ?? `${address?.slice(0, 6)}...${address?.slice(-4)}`) : isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
