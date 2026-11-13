"use client";

import type { ImageLoaderProps } from "next/image";

/** Static export: select locally generated variants, with the approved native
 * image as the largest candidate. No runtime image service or upscaling. */
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  if (width > 1280) return src;
  return src.replace(/\/([^/]+)\.webp$/, `/responsive/$1-${width}.webp`);
}
