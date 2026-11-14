"use client";
import { useId, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { allArticles } from "@/lib/content";
import type { InfoTitle } from "@/components/site-chrome";
export type Guide = (typeof allArticles)[number];
type DialogRef = RefObject<HTMLDialogElement | null>;
export function SiteSearchDialog({
  dialogRef,
  query,
  onQuery,
  onSelect,
}: {
  dialogRef: DialogRef;
  query: string;
  onQuery: (value: string) => void;
  onSelect: (guide: Guide) => void;
}) {
  const searchResults = allArticles.filter((item) =>
    `${item.title} ${item.badge}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <dialog
      ref={dialogRef}
      className="site-dialog"
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      aria-labelledby="search-title"
    >
      <div className="dialog-heading">
        <h2 id="search-title">Find your next good idea.</h2>
        <button
          className="icon-button"
          aria-label="Close search"
          onClick={() => dialogRef.current?.close()}
        >
          <X />
        </button>
      </div>
      <label htmlFor="guide-search" className="sr-only">
        Search guides
      </label>
      <input
        id="guide-search"
        className="search-input"
        placeholder="Search greenhouses, gardens, outdoor living…"
        value={query}
        onChange={(event) => onQuery(event.target.value)}
      />
      <div className="search-results">
        {searchResults.length ? (
          searchResults.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                dialogRef.current?.close();
                onSelect(item);
              }}
            >
              <span>
                <small>{item.badge}</small>
                {item.title}
              </span>
              <ArrowRight aria-hidden="true" />
            </button>
          ))
        ) : (
          <p>No guides found. Try “garden” or “greenhouse”.</p>
        )}
      </div>
    </dialog>
  );
}
export function GuidePreviewDialog({
  dialogRef,
  article,
}: {
  dialogRef: DialogRef;
  article: Guide | null;
}) {
  const headingId = useId();
  return (
    <dialog
      ref={dialogRef}
      className="site-dialog article-dialog"
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      aria-labelledby={headingId}
    >
      <div className="dialog-heading">
        <span className="eyebrow">Guide preview</span>
        <button
          className="icon-button"
          aria-label="Close guide preview"
          onClick={() => dialogRef.current?.close()}
        >
          <X />
        </button>
      </div>
      {article && (
        <>
          <Image
            src={article.image}
            alt={article.imageAlt}
            width={900}
            height={600}
            className="preview-image"
            sizes="(max-width: 559px) calc(100vw - 74px), 506px"
          />
          <span className="eyebrow">{article.badge}</span>
          <h2 id={headingId}>{article.title}</h2>
          <p>{article.description}</p>
          <span className="preview-note">
            A first look from Haven &amp; Gable. Full guides are coming soon.
          </span>
          {article.id === "small-greenhouses" && (
            <Link
              href="/guides/small-greenhouses"
              prefetch={false}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground"
            >
              Read sample article <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </>
      )}
    </dialog>
  );
}
export function SiteInfoDialog({
  dialogRef,
  info,
}: {
  dialogRef: DialogRef;
  info: InfoTitle | null;
}) {
  return (
    <dialog
      ref={dialogRef}
      className="site-dialog"
      aria-labelledby="info-title"
    >
      <div className="dialog-heading">
        <h2 id="info-title">{info}</h2>
        <button
          className="icon-button"
          aria-label="Close information"
          onClick={() => dialogRef.current?.close()}
        >
          <X />
        </button>
      </div>
      <p>
        {info === "About us"
          ? "Haven & Gable brings together practical guidance and thoughtful inspiration for home, garden, and outdoor living. Our first collection of guides is taking shape."
          : info === "Privacy"
            ? "This frontend preview has no analytics, advertising, or newsletter subscription service. Search stays in your browser, and the newsletter preview does not send or store your email address."
            : "We're getting ready to welcome you. Contact details will be available when Haven & Gable launches."}
      </p>
    </dialog>
  );
}
