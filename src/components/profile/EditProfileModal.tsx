'use client';

import { useState } from 'react';
import { updateUserProfile, uploadImage } from '@/lib/supabaseHelpers';
import { User } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Camera, X, ImageIcon } from 'lucide-react';
import Portal from '@/components/Portal';

type EditProfileModalProps = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
};

export default function EditProfileModal({ 
  user, 
  isOpen, 
  onClose, 
  onUpdate 
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    name: user.name || '',
    city: user.city || '',
    birthday: user.birthday || '',
    networks: user.networks || [],
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNetworkChange = (index: number, value: string) => {
    const newNetworks = [...(formData.networks || [])];
    newNetworks[index] = value;
    setFormData(prev => ({ ...prev, networks: newNetworks }));
  };

  const addNetwork = () => {
    setFormData(prev => ({
      ...prev,
      networks: [...(prev.networks || []), ''],
    }));
  };

  const removeNetwork = (index: number) => {
    const newNetworks = [...(formData.networks || [])];
    newNetworks.splice(index, 1);
    setFormData(prev => ({ ...prev, networks: newNetworks }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let profilePicUrl = user.profile_pic;
      
      if (profileImage) {
        const url = await uploadImage(profileImage);
        if (url) {
          profilePicUrl = url;
        }
      }

      const updates = {
        ...formData,
        profile_pic: profilePicUrl || null,
      };

      const updatedUser = await updateUserProfile(updates);
      if (!updatedUser) {
        throw new Error('Failed to update profile');
      }

      onUpdate(updatedUser);
      router.refresh();
      onClose();
    } catch (err) {
      console.error('Profile update error:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Portal><>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 z-40 bg-[var(--facebook-white)]/80 backdrop-blur-lg"
        onClick={handleBackdropClick}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="facebook-card facebook-white w-full max-w-md max-h-[90vh] overflow-hidden z-50"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 facebook-border">
            <h2 className="text-xl font-bold">
              Edit Profile
            </h2>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--facebook-hover)] cursor-pointer"
            >
              <X className="w-5 h-5 text-[var(--facebook-text)]" />
            </button>
          </div>
          
          {/* Body */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* Profile Picture */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden facebook-border">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : user.profile_pic ? (
                      <img
                        src={user.profile_pic}
                        alt="Current profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center"
                      >
                        <ImageIcon className="w-8 h-8 text-[var(--facebook-text)]" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full border-1 bg-[var(--facebook-white)]/10 flex items-center justify-center cursor-pointer hover:bg-[var(--facebook-hover)]">
                    <Camera className="w-4 h-4 text-[var(--facebook-text)]"/>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-base font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="facebook-input"
                  placeholder="Enter your name"
                />
              </div>

              {/* Birthday */}
              <div>
                <label className="block text-base font-medium mb-1" style={{ color: 'var(--facebook-text)' }}>
                  Birthday
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday?.toString().split('T')[0] || ''}
                  onChange={handleChange}
                  className="facebook-input"
                />
              </div>
              
              {/* City */}
              <div>
                <label className="block text-base font-medium mb-1" style={{ color: 'var(--facebook-text)' }}>
                  Current City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                  className="facebook-input"
                  placeholder="Enter your city"
                />
              </div>
              
              {/* Networks */}
              <div>
                <label className="block text-base font-medium mb-2" style={{ color: 'var(--facebook-text)' }}>
                  Networks
                </label>
                <div className="space-y-2">
                  {(formData.networks || []).map((network, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={network}
                        onChange={(e) => handleNetworkChange(index, e.target.value)}
                        className="facebook-input flex-1"
                        placeholder="Enter network"
                      />
                      <button
                        type="button"
                        onClick={() => removeNetwork(index)}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--facebook-hover)] cursor-pointer"
                      >
                        <X className="w-4 h-4 text-[var(--facebook-text)]" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addNetwork}
                    className="text-base font-medium mt-2 facebook-button"
                  >
                    + Add Network
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="p-3 rounded-md">
                  {error}
                </div>
              )}
            </form>
          </div>
          
          {/* Footer */}
          <div className="flex justify-end space-x-2 p-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-[var(--facebook-hover)] text-[var(--facebook-text)] cursor-pointer"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="facebook-button"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </></Portal>
    
  );
}

