import Image from 'next/image';
import EditProfileButton from './EditProfileButton';
import { getSingleUser } from '@/lib/supabaseHelpers';

export default async function ProfileCard() {
  const user = await getSingleUser();

  return (
    <div className="facebook-card overflow-hidden">
      <div className="flex flex-col">
        {/* Profile Picture */}
        <div className="relative w-full h-80 bg-[var(--facebook-gray-dark)]">
          {user.profile_pic ? (
            <Image
              src={user.profile_pic}
              alt={user.name || 'Profile'}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[var(--facebook-gray-dark)] flex items-center justify-center">
              <span className="text-6xl text-[var(--facebook-text-secondary)]">👤</span>
            </div>
          )}
        </div>
        
        {/* Profile Content */}
        <div className="p-4">
          <EditProfileButton user={user} />

          {/* Information Section */}
          <div className="mt-4 space-y-3">
            <div className="border-b border-[var(--facebook-border)] pb-2">
              <h2 className="text-sm font-semibold text-[var(--facebook-text-secondary)] uppercase tracking-wide">
                Information
              </h2>
            </div>
            
            <div className="space-y-2">
              <div>
                <h3 className="text-xs font-semibold text-[var(--facebook-text-secondary)] uppercase">
                  Name:
                </h3>
                <p className="text-sm text-[var(--facebook-text)] mt-1">
                  {user.name || 'Anonymous'}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-[var(--facebook-text-secondary)] uppercase">
                  Birthday:
                </h3>
                <p className="text-sm text-[var(--facebook-text)] mt-1">
                  {user.birthday ? new Date(user.birthday).toLocaleDateString() : 'Not specified'}
                </p>
              </div>
                
              <div>
                <h3 className="text-xs font-semibold text-[var(--facebook-text-secondary)] uppercase">
                  Current City:
                </h3>
                <p className="text-sm text-[var(--facebook-text)] mt-1">
                  {user.city || 'Not specified'}
                </p>
              </div>
              
              {user.networks && user.networks.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-[var(--facebook-text-secondary)] uppercase">
                    Networks:
                  </h3>
                  <div className="mt-1 space-y-1">
                    {user.networks.map((network, index) => (
                      <p key={index} className="text-sm text-[var(--facebook-blue)] hover:underline cursor-pointer">
                        {network}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}