import { getPostsWithUser } from '@/lib/supabaseHelpers';
import PostCard from './PostCard';

export const dynamic = 'force-dynamic';

export default async function PostList() {
  const posts = await getPostsWithUser();
  

  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <div className="facebook-card p-8 text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 bg-[var(--facebook-gray-dark)] rounded-full flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-[var(--facebook-text-secondary)] text-sm">
              No posts yet. Be the first to share something!
            </p>
          </div>
        </div>
      ) : (
        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
}