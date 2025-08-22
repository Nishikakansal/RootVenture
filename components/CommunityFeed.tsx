'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, TrendingUp, Bookmark, BookmarkCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Lightbulb } from "lucide-react";


export default function CommunityFeed({ user }) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedIdeas, setSavedIdeas] = useState(new Set());

  useEffect(() => {
    fetchIdeas();
    fetchSavedIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const response = await fetch('/api/ideas');
      if (response.ok) {
        const data = await response.json();
        setIdeas(data);
      }
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedIdeas = async () => {
    try {
      const response = await fetch('/api/ideas/saved');
      if (response.ok) {
        const data = await response.json();
        setSavedIdeas(new Set(data.map(idea => idea._id)));
      }
    } catch (error) {
      console.error('Error fetching saved ideas:', error);
    }
  };

  const handleUpvote = async (ideaId) => {
    try {
      const response = await fetch(`/api/ideas/${ideaId}/upvote`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const updatedIdea = await response.json();
        setIdeas(prev => prev.map(idea => 
          idea._id === ideaId ? updatedIdea : idea
        ));
      }
    } catch (error) {
      console.error('Error upvoting idea:', error);
    }
  };

  const handleSave = async (ideaId) => {
    try {
      const response = await fetch(`/api/ideas/${ideaId}/save`, {
        method: 'POST'
      });
      
      if (response.ok) {
        setSavedIdeas(prev => {
          const newSet = new Set(prev);
          if (newSet.has(ideaId)) {
            newSet.delete(ideaId);
          } else {
            newSet.add(ideaId);
          }
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error saving idea:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Community Ideas</h2>
        <Badge variant="secondary" className="px-3 py-1">
          <TrendingUp className="h-4 w-4 mr-1" />
          {ideas.length} Ideas
        </Badge>
      </div>

      <div className="space-y-6">
        {ideas.map((idea) => (
          <Card key={idea._id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {idea.author?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{idea.title}</CardTitle>
                    <CardDescription>
                      by {idea.author?.name || 'Anonymous'} • {formatDistanceToNow(new Date(idea.createdAt))} ago
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline">{idea.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{idea.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {idea.tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpvote(idea._id)}
                    className={`flex items-center space-x-1 ${
                      idea.upvotedBy?.includes(user._id) ? 'text-red-600' : 'text-gray-600'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${
                      idea.upvotedBy?.includes(user._id) ? 'fill-current' : ''
                    }`} />
                    <span>{idea.upvotes || 0}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-600">
                    <MessageCircle className="h-4 w-4" />
                    <span>0</span>
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSave(idea._id)}
                  className={`${savedIdeas.has(idea._id) ? 'text-blue-600' : 'text-gray-600'}`}
                >
                  {savedIdeas.has(idea._id) ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {ideas.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No ideas yet</h3>
            <p className="text-gray-600">Be the first to share an innovative startup idea!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}