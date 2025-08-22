import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';
import Idea from '@/models/Idea';

export async function GET() {
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

    const user = await User.findById(decoded.userId).populate({
      path: 'savedIdeas',
      populate: {
        path: 'authorId',
        select: 'name'
      },
      options: { sort: { createdAt: -1 } }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Transform the data to match the expected format
    const savedIdeas = user.savedIdeas.map(idea => ({
      ...idea.toObject(),
      author: {
        _id: idea.authorId._id,
        name: idea.authorId.name
      }
    }));

    return NextResponse.json(savedIdeas);
  } catch (error) {
    console.error('Get saved ideas error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}