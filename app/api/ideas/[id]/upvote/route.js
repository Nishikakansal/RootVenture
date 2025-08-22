import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import connectDB from '@/lib/mongoose';
import Idea from '@/models/Idea';

export async function POST(request, { params }) {
  try {
    await connectDB();
    
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    const { id } = params;
    const userId = decoded.userId;

    const idea = await Idea.findById(id);
    if (!idea) {
      return NextResponse.json(
        { message: 'Idea not found' },
        { status: 404 }
      );
    }

    const hasUpvoted = idea.upvotedBy.includes(userId);

    if (hasUpvoted) {
      // Remove upvote
      idea.upvotedBy.pull(userId);
      idea.upvotes = Math.max(0, idea.upvotes - 1);
    } else {
      // Add upvote
      idea.upvotedBy.push(userId);
      idea.upvotes += 1;
    }

    await idea.save();

    // Populate author info for response
    await idea.populate('authorId', 'name');

    const response = {
      ...idea.toObject(),
      author: {
        _id: idea.authorId._id,
        name: idea.authorId.name
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Upvote error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}