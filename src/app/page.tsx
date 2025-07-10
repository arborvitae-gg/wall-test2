import { Suspense } from 'react';

import PostForm from '@/components/posts/PostForm';
import PostList from '@/components/posts/PostList';
import PostListSkeleton from '@/components/posts/PostListSkeleton';

import ProfileCard from '@/components/profile/ProfileCard';
import ProfileCardSkeleton from '@/components/profile/ProfileCardSkeleton';

export const revalidate = 0; // disables ISR

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--facebook-gray)]">
      
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Suspense fallback={<ProfileCardSkeleton />}>
                <ProfileCard />
              </Suspense>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post Creation Form */}
            <div className="facebook-card p-4">
              <PostForm />
            </div>
            
            {/* Posts Feed */}
            <div className="space-y-4">
              <Suspense fallback={<PostListSkeleton />}>
                <PostList />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}