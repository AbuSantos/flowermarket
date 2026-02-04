import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "storage.googleapis.com",
      "grannydoris.my",
      "oopsydaisyflowers.com.au",
      "www.themaevastore.com",
      "shop.sheridannurseries.com",
    ],
  },
};

export default nextConfig;
