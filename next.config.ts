import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL(supabaseUrl)],
  },

};

export default nextConfig;
