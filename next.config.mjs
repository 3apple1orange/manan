/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Build the site as finished static pages for Cloudflare
  output: "export",
  // Required with static export; keep images compressed (~200–500 KB) before adding them
  images: { unoptimized: true },
};

export default nextConfig;