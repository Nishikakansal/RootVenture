import mongoose from 'mongoose';

const IdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Technology',
      'Healthcare',
      'Finance',
      'Education',
      'E-commerce',
      'Entertainment',
      'Social',
      'Environment',
      'Food & Beverage',
      'Transportation',
      'Other'
    ]
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot be more than 30 characters']
  }],
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  upvotes: {
    type: Number,
    default: 0,
    min: 0
  },
  upvotedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
IdeaSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
IdeaSchema.index({ authorId: 1, createdAt: -1 });
IdeaSchema.index({ upvotes: -1, createdAt: -1 });
IdeaSchema.index({ category: 1 });

export default mongoose.models.Idea || mongoose.model('Idea', IdeaSchema);