'use client';

import { useState } from 'react';
import { User } from '@/lib/types';

import EditProfileModal from './EditProfileModal';

export default function EditProfileButton({ user }: { user: User }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(user);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="facebook-button text-xs px-4 py-2 min-w-[80px]"
      >
        Edit Profile
      </button>
      
      <EditProfileModal
        user={currentUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={(updatedUser) => setCurrentUser(updatedUser)}
      />
    </>
  );
}