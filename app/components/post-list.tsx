'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { VoteButtons } from '@/components/vote-buttons';
import { formatDate, formatAddress } from '@/lib/utils';
import { ArrowUp, MessageSquare } from 'lucide-react';

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

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

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

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-[rgb(var(--muted-foreground))]">Loading posts...</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[rgb(var(--muted-foreground))]">No posts yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                <VoteButtons
                  targetType="post"
                  targetId={post.id}
                  initialScore={post.score}
                  onVoteChange={fetchPosts}
                />
              </div>

              <div className="flex-1">
                <Link href={`/posts/${post.slug}`}>
                  <CardTitle className="text-2xl hover:text-[rgb(var(--primary))] transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                </Link>
                <div className="flex items-center gap-2 mt-2 text-sm text-[rgb(var(--muted-foreground))]">
                  <span>by {formatAddress(post.author.walletAddress)}</span>
                  {post.author.isAdmin && (
                    <span className="text-xs bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] px-2 py-0.5 rounded">
                      Admin
                    </span>
                  )}
                  <span>•</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>

              {post.coverImage && (
                <div className="relative w-32 h-24 rounded-lg overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-[rgb(var(--muted-foreground))] line-clamp-3">
              {post.content.substring(0, 200)}...
            </p>
          </CardContent>

          <CardFooter className="flex items-center gap-4 text-sm text-[rgb(var(--muted-foreground))]">
            <Link
              href={`/posts/${post.slug}`}
              className="flex items-center gap-2 hover:text-[rgb(var(--primary))] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{post._count.comments} comments</span>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
