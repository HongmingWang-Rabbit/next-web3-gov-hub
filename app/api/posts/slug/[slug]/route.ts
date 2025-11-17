import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            walletAddress: true,
            isAdmin: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                walletAddress: true,
                isAdmin: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Calculate vote score for post
    const postVotes = await prisma.vote.findMany({
      where: {
        targetType: 'post',
        targetId: post.id,
      },
      select: { value: true },
    });

    const postScore = postVotes.reduce((sum, vote) => sum + vote.value, 0);

    // Calculate vote scores for comments
    const commentsWithScores = await Promise.all(
      post.comments.map(async (comment) => {
        const commentVotes = await prisma.vote.findMany({
          where: {
            targetType: 'comment',
            targetId: comment.id,
          },
          select: { value: true },
        });

        const score = commentVotes.reduce((sum, vote) => sum + vote.value, 0);

        return {
          ...comment,
          score,
        };
      })
    );

    return NextResponse.json({
      post: {
        ...post,
        score: postScore,
        comments: commentsWithScores,
      },
    });
  } catch (error) {
    console.error('Get post error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}
