import { supabase } from '@/lib/supabase';
import { Post, User } from '@/lib/types';


// there is only a single user in the database so its just here to get that user
export const getSingleUser = async (): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .limit(1)
    .single();

  return error ? null : data;
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

  return error ? null : data;
};

export const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    // .order('created_at', { ascending: false });

  return error ? [] : data;
};