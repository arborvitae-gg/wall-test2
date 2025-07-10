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
    } catch (error) {
      console.error('Invalid date format:', error);
      return 'Just now';
    }
  };

  return (
    <div className="facebook-card overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between m-4">
        <div className="flex items-center space-x-3">
          {/* Profile Picture */}
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--facebook-gray-dark)] flex-shrink-0">
            {post.user.profile_pic ? (
              <Image
                src={post.user.profile_pic}
                alt={post.user.name || 'User'}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[var(--facebook-gray-dark)] flex items-center justify-center">
                <span className="text-4xl text-[var(--facebook-text-secondary)]">👤</span>
              </div>
            )}
          </div>
          
          {/* User Info */}
          <div className="flex flex-col">
            <span className="text-base font-semibold text-[var(--facebook-text)] hover:underline cursor-pointer">
              {post.user.name || 'Anonymous'}
            </span>
            <span className="text-sm text-[var(--facebook-text-secondary)]">
              {formatTime(post.created_at)}
            </span>
          </div>

        </div>
      </div>

      {/* Post Content */}
      <div className="m-4">
        <p className="text-base text-[var(--facebook-text)] break-words whitespace-pre-wrap">
          {post.body}
        </p>
      </div>

      {/* Post Image */}
      {post.image_url && (
        <div className="w-full max-h-96 bg-[var(--facebook-gray-dark)]">
          <Image
            src={post.image_url}
            alt="Post attachment"
            width={500}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}