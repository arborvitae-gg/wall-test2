'use client';

import { useState, ChangeEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { uploadImage, createPost } from '@/lib/supabaseHelpers';
import ImageUpload, { ImageUploadHandle } from './ImageUpload';

export default function PostForm() {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageUploadRef = useRef<ImageUploadHandle>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 280) {
      setBody(text);
      setError(null);
    } else {
      setError('Post exceeds character limit');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (body.length > 280) {
      setError('Post exceeds character limit');
      return;
    }
    
    if (!body.trim() && !image) {
      setError('Please enter some text or add an image');
      return;
    }
    
    setIsSubmitting(true);

    try {
      let imageUrl: string | undefined;
      
      if (image) {
        const uploadedUrl = await uploadImage(image);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          throw new Error('Image upload failed');
        }
      }

      const post = await createPost({ 
        body, 
        image_url: imageUrl 
      });

      if (!post) {
        throw new Error('Failed to create post');
      }

      setBody('');
      setImage(null);
      imageUploadRef.current?.reset();
      router.refresh();
    } 
    catch (error) {
      console.error('Post creation error:', error);
      setError('Failed to create post. Please try again.');
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  const remainingChars = 280 - body.length;
  const isNearLimit = remainingChars <= 20;
  const isAtLimit = remainingChars <= 0;

  return (
    <div className="space-y-4">
        
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Textarea */}
        <textarea
          value={body}
          onChange={handleTextChange}
          placeholder="What's on your mind?"
          className="facebook-input resize-none text-sm"
          rows={3}
          disabled={isSubmitting}
        />
        
        {/* Character Count and Error */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">

              <span className={`text-sm font-medium ${
                isAtLimit ? 'text-red-500' : 
                isNearLimit ? 'text-orange-500' : 
                'text-[var(--facebook-text-secondary)]'
              }`}>
                {body.length} / 280
              </span>
          
          </div>

          {error && (
            <div className="text-red-500 text-sm font-medium">
              {error}
            </div>
          )}
        </div>
        
        {/* Image Upload */}
        <ImageUpload
          ref={imageUploadRef} 
          onImageChange={setImage}
          className="mb-4"
        />
        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={isSubmitting || (!body.trim() && !image) || isAtLimit}
            className="facebook-button text-sm px-4 py-2 min-w-[80px]"
          >
            {isSubmitting ? 'Posting...' : 'Share'}
          </button>
        </div>
        

      </form>
    </div>
  );
}