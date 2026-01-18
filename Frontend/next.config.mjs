/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export", // ✅ enable static export
  trailingSlash: true, // ✅ good for GitHub Pages
  // basePath: "/Task-Manager",
  // assetPrefix: "/Task-Manager/", // ✅ your repo name
};

export default nextConfig;
