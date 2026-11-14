import Image from "next/image";
import { Leaf } from "lucide-react";

export function Brand({ href = "#top" }: { href?: string }) {
  return (
    <a className="brand" href={href} aria-label="Haven and Gable home">
      <Image
        src="/branding/haven-and-gable-logo.png"
        alt="Haven & Gable — Better Living, Inside & Out."
        width={2172}
        height={724}
        unoptimized
        loading="eager"
      />
    </a>
  );
}

export function Announcement() {
  return (
    <div className="announcement">
      <Leaf aria-hidden="true" />
      Smart guides for home, garden &amp; outdoor living.
    </div>
  );
}
