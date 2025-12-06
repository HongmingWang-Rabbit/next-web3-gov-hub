'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PostList } from '@/components/post-list';
import { useAuth } from '@/providers/auth-provider';

export function ProposalsSection() {
  const [showCancelled, setShowCancelled] = useState(false);
  const { userData } = useAuth();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Proposals</h2>
        {userData?.isAdmin && (
          <Link
            href="/admin"
            className="px-4 py-2 text-sm font-medium border border-[rgb(var(--primary))] text-[rgb(var(--primary))] rounded-lg hover:bg-[rgb(var(--primary))] hover:text-white transition-colors"
          >
            Create Proposal
          </Link>
        )}
      </div>

      {/* Show cancelled toggle */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-400">Show cancelled</span>
        <button
          onClick={() => setShowCancelled(!showCancelled)}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            showCancelled ? 'bg-[rgb(var(--primary))]' : 'bg-[rgb(var(--color-base-3))]'
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
              showCancelled ? 'left-6' : 'left-1'
            }`}
          />
        </button>
      </div>

      {/* Proposals list */}
      <PostList showCancelled={showCancelled} />
    </div>
  );
}
