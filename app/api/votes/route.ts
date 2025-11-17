import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

// POST /api/votes - Create or update a vote
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await request.json();

    const { targetType, targetId, value } = body;

    // Validate inputs
    if (!targetType || !targetId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (targetType !== 'post' && targetType !== 'comment') {
      return NextResponse.json(
        { error: 'Invalid targetType. Must be "post" or "comment"' },
        { status: 400 }
      );
    }

    if (value !== 1 && value !== -1) {
      return NextResponse.json(
        { error: 'Invalid vote value. Must be 1 (upvote) or -1 (downvote)' },
        { status: 400 }
      );
    }

    // Check if target exists
    if (targetType === 'post') {
      const post = await prisma.post.findUnique({
        where: { id: targetId },
      });

      if (!post) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        );
      }
    } else if (targetType === 'comment') {
      const comment = await prisma.comment.findUnique({
        where: { id: targetId },
      });

      if (!comment) {
        return NextResponse.json(
          { error: 'Comment not found' },
          { status: 404 }
        );
      }
    }

    // Upsert vote (create or update if exists)
    const vote = await prisma.vote.upsert({
      where: {
        userId_targetType_targetId: {
          userId: session.userId,
          targetType,
          targetId,
        },
      },
      update: {
        value,
      },
      create: {
        userId: session.userId,
        targetType,
        targetId,
        value,
      },
    });

    // Calculate new score
    const allVotes = await prisma.vote.findMany({
      where: {
        targetType,
        targetId,
      },
      select: { value: true },
    });

    const score = allVotes.reduce((sum, v) => sum + v.value, 0);

    return NextResponse.json({
      vote,
      score,
    });
  } catch (error: any) {
    console.error('Vote error:', error);

    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    );
  }
}

// DELETE /api/votes - Remove a vote
export async function DELETE(request: NextRequest) {
  try {
    const session = await requireAuth();
    const { searchParams } = new URL(request.url);
    const targetType = searchParams.get('targetType');
    const targetId = searchParams.get('targetId');

    if (!targetType || !targetId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    await prisma.vote.delete({
      where: {
        userId_targetType_targetId: {
          userId: session.userId,
          targetType,
          targetId,
        },
      },
    });

    // Calculate new score
    const allVotes = await prisma.vote.findMany({
      where: {
        targetType,
        targetId,
      },
      select: { value: true },
    });

    const score = allVotes.reduce((sum, v) => sum + v.value, 0);

    return NextResponse.json({ score });
  } catch (error: any) {
    console.error('Delete vote error:', error);

    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to remove vote' },
      { status: 500 }
    );
  }
}
