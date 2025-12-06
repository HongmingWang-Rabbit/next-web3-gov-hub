'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { VoteButtons } from '@/components/vote-buttons';
import { CommentSection } from '@/components/comment-section';
import { formatDate } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

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
        <p className="text-gray-400">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Post not found</p>
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mt-4">
          <ChevronLeft className="w-4 h-4" />
          back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-8">
        <ChevronLeft className="w-4 h-4" />
        back
      </Link>

      {/* Date */}
      <p className="text-center text-sm text-gray-400 mb-4">
        {formatDate(post.createdAt)}
      </p>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
        {post.title}
      </h1>

      {/* Description/Summary - first paragraph or first 200 chars */}
      <p className="text-center text-gray-400 mb-8 px-4">
        {post.content.split('\n')[0].substring(0, 200)}
      </p>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Discussion Section */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-[rgb(var(--border))]">
          <h2 className="text-2xl font-bold">Discussion</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
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
