'use client';

import dynamic from 'next/dynamic';

// Dynamically import the actual button component to avoid SSR issues with wagmi hooks
const UnifiedAuthButtonInner = dynamic(
  () => import('./unified-auth-button-inner'),
  { ssr: false }
);

export function UnifiedAuthButton() {
  return <UnifiedAuthButtonInner />;
}
