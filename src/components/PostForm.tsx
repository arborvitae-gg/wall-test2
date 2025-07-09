'use client';

import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { uploadImage, createPost } from '@/lib/supabaseHelpers';

export default function PostForm() {
  const [body, setBody] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 280) {
      setBody(text);
    } else {
      setError('Maximum 280 characters allowed');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    processImageFile(file);
  };

  const processImageFile = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    } else if (file) {
      setError('Please select a valid image file');
    }
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processImageFile(file);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (body.length > 280) {
      setError('Post exceeds 280 character limit');
      return;
    }
    
    setIsSubmitting(true);

    try {
      let imageUrl: string | undefined;
      
      if (image) {
        imageUrl = await uploadImage(image);
        if (!imageUrl) {
          throw new Error('Failed to upload image');
        }
      }

      const post = await createPost({ body, image_url: imageUrl });
      if (!post) {
        throw new Error('Failed to create post');
      }

      setBody('');
      setImage(null);
      setPreviewUrl(null);
      router.refresh();
    } catch (err) {
      console.error('Post creation error:', err);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded-lg shadow">
      <textarea
        value={body}
        onChange={handleTextChange}
        placeholder="What's on your mind?"
        className="w-full p-3 border rounded-lg mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
        required
      />
      
      <div className="flex justify-between items-center mb-3">
        <span className={`text-sm ${body.length === 280 ? 'text-red-500' : 'text-gray-500'}`}>
          {body.length}/280
        </span>
        {error && body.length > 280 && (
          <span className="text-red-500 text-sm">{error}</span>
        )}
      </div>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-4 mb-3 text-center cursor-pointer ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={openFilePicker}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-gray-600">
          {isDragging 
            ? 'Drop image here' 
            : 'Drag & drop an image here or click to select'}
        </p>
      </div>
      
      {previewUrl && (
        <div className="mb-3 relative">
          <Image
            src={previewUrl} 
            alt="Preview" 
            className="rounded-lg max-w-full h-auto max-h-80 object-contain"
            width={120}
            height={120}
          />
          <button
            type="button"
            onClick={() => {
              setImage(null);
              setPreviewUrl(null);
            }}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            aria-label="Remove image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
      
      {error && !previewUrl && (
        <div className="mb-3 text-red-500 text-sm">
          {error}
        </div>
      )}
      
      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
}