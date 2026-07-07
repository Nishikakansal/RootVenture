'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Lightbulb, Bookmark, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function UserProfile({ user }) {
  const [userIdeas, setUserIdeas] = useState([]);
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [ideasResponse, savedResponse] = await Promise.all([
        fetch('/api/ideas/my-ideas'),
        fetch('/api/ideas/saved')
      ]);

      if (ideasResponse.ok) {
        const ideas = await ideasResponse.json();
        setUserIdeas(ideas);
      }

      if (savedResponse.ok) {
        const saved = await savedResponse.json();
        setSavedIdeas(saved);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const totalUpvotes = userIdeas.reduce((sum, idea) => sum + (idea.upvotes || 0), 0);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-2xl">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription className="text-base">{user.email}</CardDescription>
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {formatDistanceToNow(new Date(user.createdAt))} ago</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-6 w-6 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{userIdeas.length}</div>
                <div className="text-sm text-gray-600">Ideas Shared</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{totalUpvotes}</div>
                <div className="text-sm text-gray-600">Upvotes Received</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Bookmark className="h-6 w-6 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{savedIdeas.length}</div>
                <div className="text-sm text-gray-600">Ideas Saved</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ideas Tabs */}
      <Tabs defaultValue="my-ideas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-ideas">My Ideas ({userIdeas.length})</TabsTrigger>
          <TabsTrigger value="saved">Saved Ideas ({savedIdeas.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="my-ideas" className="space-y-4">
          {userIdeas.length > 0 ? (
            userIdeas.map((idea) => (
              <Card key={idea._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{idea.title}</CardTitle>
                      <CardDescription>
                        {formatDistanceToNow(new Date(idea.createdAt))} ago
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{idea.category}</Badge>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Heart className="h-4 w-4" />
                        <span>{idea.upvotes || 0}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">{idea.description}</p>
                  {idea.tags && idea.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {idea.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No ideas shared yet</h3>
                <p className="text-gray-600">Start sharing your innovative ideas with the community!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {savedIdeas.length > 0 ? (
            savedIdeas.map((idea) => (
              <Card key={idea._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{idea.title}</CardTitle>
                      <CardDescription>
                        by {idea.author?.name || 'Anonymous'} • {formatDistanceToNow(new Date(idea.createdAt))} ago
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{idea.category}</Badge>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Heart className="h-4 w-4" />
                        <span>{idea.upvotes || 0}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">{idea.description}</p>
                  {idea.tags && idea.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {idea.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No saved ideas yet</h3>
                <p className="text-gray-600">Save interesting ideas from the community to view them later!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}