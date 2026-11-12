"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotchedProjectCardProps {
  href: string;
  title: string;
  image: string;
  imageAlt: string;
  badge?: string;
  sizes?: string;
  variant?: "guide" | "category" | "editor";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

/** Adapted from the supplied 21st.dev card. The image and its text overlay
 * share a real SVG clip, with a circular cut and tangent fillets. No page-color
 * overlays: the pocket is transparent on any surface. The disc and circular
 * cut share a center; their radii differ by --notch-gap (6–10px).
 */
export function NotchedProjectCard({
  href,
  title,
  image,
  imageAlt,
  badge,
  sizes: imageSizes,
  variant = "guide",
  className,
  onClick,
}: NotchedProjectCardProps) {
  const sizes =
    imageSizes ??
    (variant === "category"
      ? "(max-width: 699px) calc((100vw - 72px) / 4), (max-width: 1239px) calc((100vw - 110px) / 4), 282.5px"
      : variant === "editor"
        ? "(max-width: 699px) 336px, (max-width: 1239px) calc((100vw - 104px) / 3), 378.7px"
        : "(max-width: 699px) calc((100vw - 63px) / 2), (max-width: 1239px) calc((100vw - 78px) / 2), 581px");
  const id = `notch-${React.useId().replace(/:/g, "")}`;
  const ref = React.useRef<HTMLAnchorElement>(null);
  const [geometry, setGeometry] = React.useState({
    width: 330,
    height: 180,
    disc: 36,
    gap: 8,
    fillet: 12,
    corner: 22,
  });
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => {
      const style = getComputedStyle(element);
      const value = (name: string) => parseFloat(style.getPropertyValue(name));
      setGeometry({
        width: element.clientWidth,
        height: element.clientHeight,
        disc: value("--disc"),
        gap: value("--notch-gap"),
        fillet: value("--fillet"),
        corner: value("--corner"),
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const { width: w, height: h, disc, gap, fillet: f, corner: c } = geometry;
  const radius = disc / 2 + gap;
  const cx = w - disc / 2,
    cy = h - disc / 2;
  // Clockwise outer silhouette; the counterclockwise circular arc is the cut.
  const path = `M ${c} 0 H ${w - c} Q ${w} 0 ${w} ${c}
    V ${cy - radius - f} Q ${w} ${cy - radius} ${w - f} ${cy - radius}
    H ${cx} A ${radius} ${radius} 0 0 0 ${cx - radius} ${cy}
    V ${h - f} Q ${cx - radius} ${h} ${cx - radius - f} ${h}
    H ${c} Q 0 ${h} 0 ${h - c} V ${c} Q 0 0 ${c} 0 Z`;
  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className={cn("notched-card", `notched-card--${variant}`, className)}
    >
      <svg className="clip-definitions" aria-hidden="true" width="0" height="0">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path d={path} transform={`scale(${1 / w} ${1 / h})`} />
          </clipPath>
        </defs>
      </svg>
      <div className="card-cover" style={{ clipPath: `url(#${id})` }}>
        <Image src={image} alt={imageAlt} fill sizes={sizes} />
        <div className="card-shade" />
        <div className="card-copy">
          {badge && <span className="card-badge">{badge}</span>}
          <h3>{title}</h3>
        </div>
      </div>
      {/* The arrow shares the full card link; its 44px hit box stays inside it. */}
      <span className="card-arrow" aria-hidden="true">
        <ArrowUpRight />
      </span>
    </a>
  );
}
export default NotchedProjectCard;
