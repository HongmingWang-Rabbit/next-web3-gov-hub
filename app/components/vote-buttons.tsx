'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import { cn } from '@/lib/utils';

interface VoteButtonsProps {
  targetType: 'post' | 'comment';
  targetId: string;
  initialScore: number;
  onVoteChange?: () => void;
}

export function VoteButtons({
  targetType,
  targetId,
  initialScore,
  onVoteChange,
}: VoteButtonsProps) {
  const { isAuthenticated } = useAuth();
  const [score, setScore] = useState(initialScore);
  const [userVote, setUserVote] = useState<1 | -1 | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserVote();
    }
  }, [isAuthenticated, targetId]);

  async function fetchUserVote() {
    try {
      const response = await fetch(
        `/api/votes/user?targetType=${targetType}&targetId=${targetId}`
      );
      const data = await response.json();
      if (data.votes && data.votes.length > 0) {
        setUserVote(data.votes[0].value);
      }
    } catch (error) {
      console.error('Failed to fetch user vote:', error);
    }
  }

  async function handleVote(value: 1 | -1) {
    if (!isAuthenticated) {
      alert('Please sign in to vote');
      return;
    }

    if (isVoting) return;

    setIsVoting(true);

    try {
      // If clicking the same vote, remove it
      if (userVote === value) {
        const response = await fetch(
          `/api/votes?targetType=${targetType}&targetId=${targetId}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          const data = await response.json();
          setScore(data.score);
          setUserVote(null);
          onVoteChange?.();
        }
      } else {
        // Otherwise, create or update vote
        const response = await fetch('/api/votes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            targetType,
            targetId,
            value,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setScore(data.score);
          setUserVote(value);
          onVoteChange?.();
        }
      }
    } catch (error) {
      console.error('Vote failed:', error);
    } finally {
      setIsVoting(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'h-8 w-8',
          userVote === 1 && 'text-[rgb(var(--color-success))]'
        )}
        onClick={() => handleVote(1)}
        disabled={isVoting || !isAuthenticated}
      >
        <ArrowUp className="w-5 h-5" />
      </Button>

      <span
        className={cn(
          'font-bold text-sm min-w-[2ch] text-center',
          score > 0 && 'text-[rgb(var(--color-success))]',
          score < 0 && 'text-[rgb(var(--color-danger))]'
        )}
      >
        {score}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'h-8 w-8',
          userVote === -1 && 'text-[rgb(var(--color-danger))]'
        )}
        onClick={() => handleVote(-1)}
        disabled={isVoting || !isAuthenticated}
      >
        <ArrowDown className="w-5 h-5" />
      </Button>
    </div>
  );
}
