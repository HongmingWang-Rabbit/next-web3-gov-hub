'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { VoteButtons } from '@/components/vote-buttons';
import { useAuth } from '@/hooks/useAuth';
import { formatDate, formatAddress } from '@/lib/utils';
import { MessageSquare, Trash2 } from 'lucide-react';

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  userId: string;
  user: {
    id: string;
    walletAddress: string;
    isAdmin: boolean;
  };
  score: number;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onCommentChange: () => void;
}

export function CommentSection({
  postId,
  comments,
  onCommentChange,
}: CommentSectionProps) {
  const { isAuthenticated, userData } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmitComment() {
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          text: newComment,
        }),
      });

      if (response.ok) {
        setNewComment('');
        onCommentChange();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to post comment');
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
      alert('Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteComment(commentId: string) {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onCommentChange();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
      alert('Failed to delete comment');
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="w-6 h-6" />
        Comments ({comments.length})
      </h2>

      {isAuthenticated ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add a Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-4"
              rows={4}
            />
            <Button
              onClick={handleSubmitComment}
              disabled={isSubmitting || !newComment.trim()}
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardContent className="py-6">
            <p className="text-[rgb(var(--muted-foreground))] text-center">
              Please connect your wallet and sign in to comment
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-[rgb(var(--muted-foreground))] text-center">
                No comments yet. Be the first to comment!
              </p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="py-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <VoteButtons
                      targetType="comment"
                      targetId={comment.id}
                      initialScore={comment.score}
                      onVoteChange={onCommentChange}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                        <span>{formatAddress(comment.user.walletAddress)}</span>
                        {comment.user.isAdmin && (
                          <span className="text-xs bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] px-2 py-0.5 rounded">
                            Admin
                          </span>
                        )}
                        <span>•</span>
                        <span>{formatDate(comment.createdAt)}</span>
                      </div>

                      {(userData?.walletAddress === comment.user.walletAddress || userData?.isAdmin) && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Trash2 className="w-4 h-4 text-[rgb(var(--color-danger))]" />
                        </Button>
                      )}
                    </div>

                    <p className="whitespace-pre-wrap">{comment.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
