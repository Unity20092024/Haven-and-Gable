import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  devIndicators: false,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [360, 480, 640, 780, 960, 1280, 1536],
    imageSizes: [96, 160, 240, 320],
  },
};
export default nextConfig;
