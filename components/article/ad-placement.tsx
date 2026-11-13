import type { ReactNode } from "react";
/** Reserved integration boundary. Disabled slots render nothing; no ad script,
 * fake offer, or empty advertisement is included in Frontend B. */
export function AdPlacement({
  slot,
  enabled = false,
  children,
}: {
  slot: string;
  enabled?: boolean;
  children?: ReactNode;
}) {
  if (!enabled || !children) return null;
  return (
    <aside
      className="article-ad-placement"
      data-ad-slot={slot}
      aria-label="Advertisement"
    >
      {children}
    </aside>
  );
}
