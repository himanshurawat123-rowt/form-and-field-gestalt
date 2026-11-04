/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // CRITICAL for this assignment: allow <Image> / remote loaders to pull the
  // Unsplash mirror cut-outs. Without these remotePatterns, next/image will
  // throw and the garment images will render broken.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "*.unsplash.com" },
      { protocol: "https", hostname: "*.pexels.com" },
    ],
    // Transparent PNG/WebP cut-outs keep their alpha; don't force a format.
    dangerouslyAllowSVG: false,
  },
};

export default nextConfig;
