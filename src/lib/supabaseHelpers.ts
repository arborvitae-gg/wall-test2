import { supabase } from '@/lib/supabase';
import { Post, PostWithUser, User } from '@/lib/types';

// there is only a single user in the database so its just here to get that user
export const getSingleUser = async (): Promise<User | null> => {

  try {
    const { data, error } = await supabase
    .from('users')
    .select('*')
    .limit(1)
    .single();

    if (error) throw error;
    return data;
  } 
  catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const bucket = 'post-images';
    const fileName = `${bucket}/${Date.now()}-${file.name}`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) {
      console.error('Image upload failed:', uploadError);
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  } 
  catch (error) {
    console.error('Image upload error:', error);
    return null;
  }
};

export const updateUserProfile = async (updates: Partial<User>): Promise<User | null> => {
  const user = await getSingleUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single();

  return error ? null : data;
};

export const createPost = async (post: { body: string; image_url?: string }): Promise<Post | null> => {

  try {
    const user = await getSingleUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('posts')
      .insert([{ 
        user_id: user.id, 
        body: post.body,
        image_url: post.image_url || null 
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
  catch (error) {
    console.error('Post creation failed:', error);
    return null;
  }
};

// Get all posts with user info
export const getPostsWithUser = async (): Promise<PostWithUser[]> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        user:user_id (name, profile_pic)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as PostWithUser[];
  } 
  catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};