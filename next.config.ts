import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const { hostname } = new URL(supabaseUrl);

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname, 
        pathname: '/storage/v1/object/public/**', 
      }
    ],
  },

};

export default nextConfig;
