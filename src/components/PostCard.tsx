import { Post } from '@/lib/types';
import Image from 'next/image';

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <p className="text-gray-800 mb-3">{post.body}</p>
      {/* <div className="mb-3">
        {post.image_url ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/post_images/${post.image_url}`} 
            alt="Post attachment"
            className="rounded-lg max-w-full h-auto max-h-96 object-contain"
            height={250}
            width={250}
          />
        ): ''
        }
      </div> */}
      
      <div className="text-xs text-gray-500">
        {new Date(post.created_at).toLocaleString()}
      </div>
    </div>
  );
}