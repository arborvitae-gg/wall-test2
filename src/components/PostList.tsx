import { getPostsWithUser } from '@/lib/supabaseHelpers';
import PostCard from './PostCard';

export default async function PostList() {
  const posts = await getPostsWithUser();

  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No posts yet</p>
      ) : (
        posts.map(post => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}