import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';
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

    // Check if idea exists
    const idea = await Idea.findById(id);
    if (!idea) {
      return NextResponse.json(
        { message: 'Idea not found' },
        { status: 404 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const hasSaved = user.savedIdeas.includes(id);

    if (hasSaved) {
      // Remove from saved
      user.savedIdeas.pull(id);
    } else {
      // Add to saved
      user.savedIdeas.push(id);
    }

    await user.save();

    return NextResponse.json({ 
      message: hasSaved ? 'Idea removed from saved' : 'Idea saved successfully',
      saved: !hasSaved
    });
  } catch (error) {
    console.error('Save idea error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}