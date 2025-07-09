import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
// import { getSingleUser } from '@/lib/supabaseHelpers';

export default async function Home() {
  // const user = await getSingleUser();

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Message Board</h1>
      
      <div className="mb-10">
        <PostForm />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Timeline</h2>
        <PostList />
      </div>
    </main>
  );
}