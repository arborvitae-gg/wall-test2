'use client';

import { useState } from 'react';
import { createPost } from '@/lib/supabaseHelpers';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function PostForm() {
  const [body, setBody] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrl: string | undefined;
    
    if (image) {
      const fileName = `post-images/${Date.now()}-${image.name}`;
      const { data, error } = await supabase.storage
        .from('post-images')
        .upload(fileName, image);

      if (!error) {
        imageUrl = data.path;
      }
    }

    await createPost({ body, image_url: imageUrl });
    
    setBody('');
    setImage(null);
    setIsSubmitting(false);
    router.refresh(); // Refresh page to show new post
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded-lg shadow">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
        maxLength={280}
        required
      />
      
      <div className="flex items-center justify-between">
        <label className="cursor-pointer text-blue-600 hover:text-blue-800">
          <input 
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="hidden"
          />
          Attach Image
        </label>
        
        <button 
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </div>
      
      {image && (
        <div className="mt-3">
          <span className="text-sm text-gray-600">{image.name}</span>
        </div>
      )}
    </form>
  );
}