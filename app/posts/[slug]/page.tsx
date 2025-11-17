'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { VoteButtons } from '@/components/vote-buttons';
import { CommentSection } from '@/components/comment-section';
import { formatDate, formatAddress } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Post {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
  content: string;
  createdAt: string;
  author: {
    id: string;
    walletAddress: string;
    isAdmin: boolean;
  };
  score: number;
  comments: any[];
}

export default function PostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  async function fetchPost() {
    try {
      const response = await fetch(`/api/posts/slug/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data.post);
      } else {
        console.error('Post not found');
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-[rgb(var(--muted-foreground))]">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-[rgb(var(--muted-foreground))]">Post not found</p>
        <Link href="/">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/">
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <VoteButtons
                targetType="post"
                targetId={post.id}
                initialScore={post.score}
                onVoteChange={fetchPost}
              />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
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
          </div>

          {post.coverImage && (
            <div className="relative w-full h-96 rounded-lg overflow-hidden mt-6">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-[rgb(var(--border))]">
          <h2 className="text-2xl font-bold">Discussion</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[rgb(var(--muted-foreground))]">
              Vote on this proposal:
            </span>
            <VoteButtons
              targetType="post"
              targetId={post.id}
              initialScore={post.score}
              onVoteChange={fetchPost}
            />
          </div>
        </div>

        <CommentSection
          postId={post.id}
          comments={post.comments}
          onCommentChange={fetchPost}
        />
      </div>
    </div>
  );
}
