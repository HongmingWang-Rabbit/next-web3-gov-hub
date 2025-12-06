'use client';

import { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useAuth } from '@/providers/auth-provider';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ConnectButtonWrapper from './connect-button-wrapper';

export default function UnifiedAuthButtonInner() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { isAuthenticated, signIn, signOut } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Show sign-in modal when wallet is connected but not authenticated
  useEffect(() => {
    if (isConnected && !isAuthenticated) {
      setShowSignInModal(true);
    } else {
      setShowSignInModal(false);
    }
  }, [isConnected, isAuthenticated]);

  // Sign out when wallet is disconnected
  useEffect(() => {
    if (!isConnected && isAuthenticated) {
      signOut();
    }
  }, [isConnected, isAuthenticated, signOut]);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signIn();
      setShowSignInModal(false);
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleDisconnect = () => {
    if (isAuthenticated) {
      signOut();
    }
    disconnect();
    setShowSignInModal(false);
  };

  // If connected but not authenticated, show Sign In button
  if (isConnected && !isAuthenticated) {
    return (
      <>
        <Button onClick={() => setShowSignInModal(true)} size="sm">
          Sign In
        </Button>

        <Dialog open={showSignInModal} onOpenChange={setShowSignInModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign In Required</DialogTitle>
              <DialogDescription>
                Please sign the message to verify your wallet ownership and access all features.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-4">
              <Button onClick={handleSignIn} disabled={isSigningIn} size="lg">
                {isSigningIn ? 'Signing In...' : 'Sign In'}
              </Button>

              <Button
                onClick={handleDisconnect}
                variant="outline"
                size="sm"
              >
                Disconnect Wallet
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Otherwise show ConnectKit button (for not connected or authenticated states)
  return <ConnectButtonWrapper />;
}
