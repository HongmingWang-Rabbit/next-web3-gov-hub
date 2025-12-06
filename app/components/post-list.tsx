'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useAuth } from '@/providers/auth-provider';
import { cn } from '@/lib/utils';

interface Post {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
  content: string;
  createdAt: string;
  author: {
    walletAddress: string;
    isAdmin: boolean;
  };
  score: number;
  _count: {
    comments: number;
  };
}

interface PostListProps {
  showCancelled?: boolean;
}

export function PostList({ showCancelled = false }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [userVotes, setUserVotes] = useState<Record<string, 1 | -1 | null>>({});
  const [votingId, setVotingId] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (isAuthenticated && posts.length > 0) {
      fetchUserVotes();
    }
  }, [isAuthenticated, posts]);

  async function fetchPosts() {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserVotes() {
    const votes: Record<string, 1 | -1 | null> = {};
    for (const post of posts) {
      try {
        const response = await fetch(`/api/votes/user?targetType=post&targetId=${post.id}`);
        const data = await response.json();
        if (data.votes && data.votes.length > 0) {
          votes[post.id] = data.votes[0].value;
        }
      } catch (error) {
        console.error('Failed to fetch user vote:', error);
      }
    }
    setUserVotes(votes);
  }

  async function handleVote(postId: string, value: 1 | -1) {
    if (!isAuthenticated) {
      alert('Please sign in to vote');
      return;
    }

    if (votingId) return;
    setVotingId(postId);

    try {
      const currentVote = userVotes[postId];

      if (currentVote === value) {
        const response = await fetch(`/api/votes?targetType=post&targetId=${postId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(prev => prev.map(p => p.id === postId ? { ...p, score: data.score } : p));
          setUserVotes(prev => ({ ...prev, [postId]: null }));
        }
      } else {
        const response = await fetch('/api/votes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetType: 'post', targetId: postId, value }),
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(prev => prev.map(p => p.id === postId ? { ...p, score: data.score } : p));
          setUserVotes(prev => ({ ...prev, [postId]: value }));
        }
      }
    } catch (error) {
      console.error('Vote failed:', error);
    } finally {
      setVotingId(null);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Loading proposals...</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No proposals yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post, index) => (
        <Link key={post.id} href={`/posts/${post.slug}`} className="block">
          <div className="p-4 rounded-xl bg-[#271A0C] border border-[#3B2712] hover:border-[#4a3320] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Top row: votes and status badge */}
            <div className="flex items-center gap-3 mb-2">
              {/* Vote buttons stacked vertically */}
              <div className="flex flex-col items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleVote(post.id, 1);
                  }}
                  disabled={votingId === post.id || !isAuthenticated}
                  className={cn(
                    'p-0.5 hover:text-[rgb(var(--color-success))] transition-colors',
                    userVotes[post.id] === 1 && 'text-[rgb(var(--color-success))]'
                  )}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-400 font-medium">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleVote(post.id, -1);
                  }}
                  disabled={votingId === post.id || !isAuthenticated}
                  className={cn(
                    'p-0.5 hover:text-[rgb(var(--color-danger))] transition-colors',
                    userVotes[post.id] === -1 && 'text-[rgb(var(--color-danger))]'
                  )}
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              {/* Status badge */}
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-full bg-[#9AF0BD33] text-[#9AF0BD]">
                <span className="w-2 h-2 rounded-full bg-[#9AF0BD]"></span>
                Voting Period
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-white mb-1">
              #{posts.length - index} {post.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-400 line-clamp-2">
              {post.content.substring(0, 150)}...
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
