'use client';

import Image from 'next/image';
import { Camera, X } from 'lucide-react';
import { useState, useRef, useCallback, ChangeEvent, forwardRef, useImperativeHandle } from 'react';

export type ImageUploadHandle = {
  reset: () => void;
  openFilePicker?: () => void;
};

type ImageUploadProps = {
  initialImage?: string | null;
  onImageChange: (file: File | null) => void;
  className?: string;
};

const ImageUpload = forwardRef<ImageUploadHandle, ImageUploadProps>(({ 
  initialImage, 
  onImageChange, 
  className = '' 
}, ref) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Expose functions to parent
  useImperativeHandle(ref, () => ({
    reset: () => {
      setPreviewUrl(null);
      setError(null);
      onImageChange(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    openFilePicker: () => {
      fileInputRef.current?.click();
    }
  }));

  const processImageFile = (file: File | null) => {
    setError(null);
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError('File size must be less than 5MB');
        return;
      }
      
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageChange(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    processImageFile(file);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setError(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <div 
        className={`w-full min-h-[120px] border-2 rounded-lg border-dashed transition-all duration-200 cursor-pointer ${
          isDragging 
            ? 'border-[var(--facebook-blue)] bg-[var(--facebook-blue)]/5' 
            : 'border-[var(--facebook-border)] hover:border-[var(--facebook-blue)]/50'
        } ${previewUrl ? 'border-solid bg-[var(--facebook-white)]' : 'bg-[var(--facebook-gray-dark)]'}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={previewUrl ? undefined : openFilePicker}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="w-full h-max-64">
          {previewUrl ? (
          <div className="relative">
            <Image
              src={previewUrl}
              alt="Preview"
              width={800}
              height={800}
              className="w-full h-64 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-3 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              aria-label="Remove image"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[var(--facebook-blue)]/10 rounded-full mb-3">
                <Camera className="w-6 h-6 text-[var(--facebook-blue)]" />
              </div>
              <p className="text-sm text-[var(--facebook-text)] font-medium mb-1">
                {isDragging ? 'Drop image here' : 'Click to add photo'}
              </p>
              <p className="text-xs text-[var(--facebook-text-secondary)] text-center">
                or drag and drop
              </p>
              <p className="text-xs text-[var(--facebook-text-secondary)] mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          )}
        </div>

      </div>
      
      {error && (
        <div className="mt-2 text-xs text-red-500 font-medium">
          {error}
        </div>
      )}
    </div>
  );
});

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;