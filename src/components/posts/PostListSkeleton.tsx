export default function PostListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </div>
  );
}

function PostCardSkeleton() {
  return (
    <div className="facebook-card p-4">
      {/* Post Header Skeleton */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {/* Profile Picture Skeleton */}
          <div className="w-10 h-10 rounded-full bg-[var(--facebook-gray-dark)] animate-pulse"></div>
          
          {/* User Info Skeleton */}
          <div className="flex flex-col space-y-1">
            <div className="w-24 h-4 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
            <div className="w-16 h-3 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
          </div>
        </div>

        {/* More Options Skeleton */}
        <div className="w-6 h-6 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
      </div>

      {/* Post Content Skeleton */}
      <div className="mb-3 space-y-2">
        <div className="w-full h-4 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
        <div className="w-3/4 h-4 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
      </div>

      {/* Post Image Skeleton (randomly show/hide) */}
      {Math.random() > 0.5 && (
        <div className="mb-3 -mx-4">
          <div className="w-full h-64 bg-[var(--facebook-gray-dark)] animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
      )}

      {/* Action Buttons Skeleton */}
      <div className="pt-3 border-t border-[var(--facebook-border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <div className="w-4 h-4 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
            <div className="w-8 h-3 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
          </div>
          
          <div className="flex items-center space-x-2 flex-1">
            <div className="w-4 h-4 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
            <div className="w-12 h-3 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
          </div>
          
          <div className="flex items-center space-x-2 flex-1">
            <div className="w-4 h-4 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
            <div className="w-10 h-3 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}