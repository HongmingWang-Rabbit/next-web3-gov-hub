'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useState, useEffect } from 'react';

export function useAuth() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<{
    walletAddress: string;
    isAdmin: boolean;
  } | null>(null);

  // Check authentication status on mount and when address changes
  useEffect(() => {
    checkAuth();
  }, [address]);

  async function checkAuth() {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUserData(data.user);
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn() {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);

    try {
      // Get nonce from server
      const nonceResponse = await fetch('/api/auth/nonce');
      const { nonce } = await nonceResponse.json();

      // Create SIWE message
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in to Web3 Gov Hub',
        uri: window.location.origin,
        version: '1',
        chainId: 1,
        nonce,
      });

      const preparedMessage = message.prepareMessage();

      // Sign the message
      const signature = await signMessageAsync({
        message: preparedMessage,
      });

      // Verify signature and create session
      const verifyResponse = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: preparedMessage,
          signature,
        }),
      });

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        throw new Error(errorData.error || 'Authentication failed');
      }

      const data = await verifyResponse.json();
      setIsAuthenticated(true);
      setUserData(data.user);

      return data;
    } catch (error) {
      console.error('Sign-in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      setIsAuthenticated(false);
      setUserData(null);
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  }

  return {
    address,
    isConnected,
    isAuthenticated,
    isLoading,
    userData,
    signIn,
    signOut,
    checkAuth,
  };
}
