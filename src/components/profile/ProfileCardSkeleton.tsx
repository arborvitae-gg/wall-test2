export default function ProfileCardSkeleton() {
  return (
    <div className="facebook-card overflow-hidden">
      <div className="flex flex-col">
        {/* Profile Picture Skeleton */}
        <div className="relative overflow-hidden w-full h-48 bg-[var(--facebook-gray-dark)]">
          <div className="w-full h-full bg-gradient-to-r from-[var(--facebook-gray-dark)] via-[var(--facebook-hover)] to-[var(--facebook-gray-dark)] animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        {/* Profile Content Skeleton */}
        <div className="p-4">
          {/* Edit Button Skeleton */}
          <div className="w-20 h-6 bg-[var(--facebook-gray-dark)] rounded animate-pulse mb-4"></div>

          {/* Information Section */}
          <div className="mt-4 space-y-3">
            <div className="border-b border-[var(--facebook-border)] pb-2">
              <div className="w-20 h-4 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
            </div>
            
            <div className="space-y-3">
              {/* Name Skeleton */}
              <div>
                <div className="w-10 h-3 bg-[var(--facebook-gray-dark)] rounded animate-pulse mb-2"></div>
                <div className="w-24 h-4 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
              </div>

              {/* Birthday Skeleton */}
              <div>
                <div className="w-16 h-3 bg-[var(--facebook-gray-dark)] rounded animate-pulse mb-2"></div>
                <div className="w-20 h-4 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
              </div>
                
              {/* Current City Skeleton */}
              <div>
                <div className="w-20 h-3 bg-[var(--facebook-gray-dark)] rounded animate-pulse mb-2"></div>
                <div className="w-28 h-4 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
              </div>
              
              {/* Networks Skeleton */}
              <div>
                <div className="w-16 h-3 bg-[var(--facebook-gray-dark)] rounded animate-pulse mb-2"></div>
                <div className="space-y-1">
                  <div className="w-32 h-4 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
                  <div className="w-28 h-4 bg-[var(--facebook-gray-dark)] rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}