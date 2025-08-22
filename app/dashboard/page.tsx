'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users, Plus, User, LogOut, Settings, Lightbulb
} from 'lucide-react';
import CommunityFeed from '@/components/CommunityFeed';
import IdeaSubmission from '@/components/IdeaSubmission';
import UserProfile from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent } from '@/components/ui/tabs';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('community');
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      router.push('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col justify-between">
        <div>
          <div className="flex items-center px-6 py-4 border-b space-x-2">
            <Lightbulb className="text-blue-600 h-6 w-6" />
            <h2 className="text-xl font-semibold text-gray-800">RootVenture</h2>
          </div>
          <nav className="mt-6 flex flex-col space-y-2 px-4">
            <SideNavItem label="Community" icon={<Users className="h-4 w-4" />} onClick={() => setActiveTab('community')} active={activeTab === 'community'} />
            <SideNavItem label="Submit Idea" icon={<Plus className="h-4 w-4" />} onClick={() => setActiveTab('submit')} active={activeTab === 'submit'} />
            <SideNavItem label="Profile" icon={<User className="h-4 w-4" />} onClick={() => setActiveTab('profile')} active={activeTab === 'profile'} />
            <SideNavItem label="Settings" icon={<Settings className="h-4 w-4" />} onClick={() => setActiveTab('settings')} active={activeTab === 'settings'} />
          </nav>
        </div>

        {/* User Info + Logout */}
        <div className="border-t p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{user.name?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{user.name}</span>
          </div>
          <Button size="icon" variant="ghost" onClick={handleLogout}>
            <LogOut className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome back, {user.name}!</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="community">
            <CommunityFeed user={user} />
          </TabsContent>
          <TabsContent value="submit">
            <IdeaSubmission user={user} />
          </TabsContent>
          <TabsContent value="profile">
            <UserProfile user={user} />
          </TabsContent>
          {/* <TabsContent value="settings">
            <SettingsSection user={user} />
          </TabsContent> */}
        </Tabs>
      </main>
    </div>
  );
}

function SideNavItem({ label, icon, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
        active ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
