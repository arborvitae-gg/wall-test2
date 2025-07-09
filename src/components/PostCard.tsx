import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

type PostCardProps = {
  post: {
    id: string;
    body: string;
    image_url: string | null;
    created_at: string;
    user: {
      name: string | null;
      profile_pic: string | null;
    };
  };
};

export default function PostCard({ post }: PostCardProps) {

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (err) {
      console.error('Invalid date format:', err);
      return 'Just now';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-start mb-3">
        {post.user.profile_pic ? (
          <div className="relative h-10 w-10 flex-shrink-0 mr-3">
            <Image
              src={post.user.profile_pic}
              alt={post.user.name || 'User'}
              className="rounded-full object-cover"
              width={40}
              height={40}
            />
          </div>
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 mr-3" />
        )}
        <div>
          <div className="font-medium text-gray-900">{post.user.name || 'Anonymous'}</div>
          <div className="text-xs text-gray-500">
            {formatTime(post.created_at)}
          </div>
        </div>
      </div>
      
      <p className="text-gray-800 mb-3 whitespace-pre-line">{post.body}</p>
      
      {post.image_url && (
        <div className="mb-3">
          <div className="relative w-full h-80">
            <Image
              src={post.image_url}
              alt="Post attachment"
              className="rounded-lg object-contain"
              width={120}
              height={120}
            />
          </div>
        </div>
      )}
    </div>
  );
}