import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import connectDB from '@/lib/mongoose';
import Idea from '@/models/Idea';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();

    const ideas = await Idea.find()
      .populate('authorId', 'name')
      .sort({ upvotes: -1, createdAt: -1 })
      .lean();

    // Transform the data to match the expected format
    const transformedIdeas = ideas.map(idea => ({
      ...idea,
      author: {
        _id: idea.authorId._id,
        name: idea.authorId.name
      }
    }));

    return NextResponse.json(transformedIdeas);
  } catch (error) {
    console.error('Get ideas error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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

    const { title, description, category, tags } = await request.json();

    if (!title || !description || !category) {
      return NextResponse.json(
        { message: 'Title, description, and category are required' },
        { status: 400 }
      );
    }

    const idea = await Idea.create({
      title,
      description,
      category,
      tags: tags || [],
      authorId: decoded.userId
    });

    return NextResponse.json(
      { message: 'Idea created successfully', ideaId: idea._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create idea error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { message: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}