'use client';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

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
  const [imageLoading, setImageLoading] = useState(true);
  const [profilePicLoading, setProfilePicLoading] = useState(true);
  const [imageExpanded, setImageExpanded] = useState(false);

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
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--facebook-gray-dark)] flex-shrink-0 relative">
            {post.user.profile_pic ? (
              <>
                {profilePicLoading && (
                  <div className="absolute inset-0 bg-[var(--facebook-gray-dark)] animate-pulse rounded-full" />
                )}
                <Image
                  src={post.user.profile_pic}
                  alt={post.user.name || 'User'}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  onLoad={() => setProfilePicLoading(false)}
                  onError={() => setProfilePicLoading(false)}
                />
              </>
            ) : (
              <div className="w-full h-full bg-[var(--facebook-gray-dark)] flex items-center justify-center">
                <span className="text-4xl text-[var(--facebook-text-secondary)]">👤</span>
              </div>
            )}
          </div>
          
          {/* User Info */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[var(--facebook-text)] hover:underline cursor-pointer">
              {post.user.name || 'Anonymous'}
            </span>
            <span className="text-xs text-[var(--facebook-text-secondary)]">
              {formatTime(post.created_at)}
            </span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="m-4">
        <p className="text-sm text-[var(--facebook-text)] break-words whitespace-pre-wrap">
          {post.body}
        </p>
      </div>

      {/* Post Image */}
      {post.image_url && (
        <div className="w-full relative">
          {/* Loading skeleton */}
          {imageLoading && (
            <div className="absolute inset-0 bg-[var(--facebook-gray-dark)] animate-pulse">
              <div className="w-full h-80 bg-[var(--facebook-gray-dark)]" />
            </div>
          )}
          
          {/* Actual image */}
          <div 
            className={`cursor-pointer transition-all duration-300 ${
              imageExpanded ? 'max-h-none' : 'max-h-96'
            }`}
            onClick={() => setImageExpanded(!imageExpanded)}
          >
            <Image
              src={post.image_url}
              alt="Post attachment"
              width={500}
              height={imageExpanded ? 1000 : 300}
              className={`w-full object-cover transition-all duration-300 ${
                imageExpanded ? 'object-contain' : 'object-cover'
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              priority={false}
            />
          </div>
          
          {/* Expand/Collapse indicator */}
          {!imageLoading && (
            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {imageExpanded ? 'Click to collapse' : 'Click to expand'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}