export type User = {
  id: string;
  name: string | null;
  birthday: string | null; // ISO string format
  city: string | null;
  networks: string[] | null;
  profile_pic: string | null;
  created_at: string;
};

export type Post = {
  id: string;
  user_id: string;
  body: string;
  image_url: string | null;
  created_at: string;
};

export type PostWithUser = Post & {
  user: Pick<User, 'name' | 'profile_pic'>;
};