import { Leaf } from "lucide-react";
export function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Haven and Gable home">
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M3 23 24 5l21 18M9 20v23h30V20M4 44h40M20 43V31h9v12M27 9V5h7v10"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 34c0-9 11-12 17-10-1 7-6 11-13 10m-3 6 11-12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span>
        <strong>HAVEN &amp; GABLE</strong>
        <small>Better Living, Inside &amp; Out.</small>
      </span>
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
