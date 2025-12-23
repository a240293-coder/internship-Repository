/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable Webpack's persistent filesystem cache to avoid PackFileCacheStrategy OOM
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;
