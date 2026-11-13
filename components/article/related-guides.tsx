"use client";
import { useRef, useState } from "react";
import { guides } from "@/lib/content";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
import { GuidePreviewDialog, type Guide } from "@/components/site-dialogs";
export function RelatedGuides() {
  const [guide, setGuide] = useState<Guide | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <section className="article-related" aria-labelledby="related-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Keep growing your ideas</span>
          <h2 id="related-title">Related Guides</h2>
        </div>
      </div>
      <p>
        More from Haven &amp; Gable. These guides open as editorial previews.
      </p>
      <div className="article-related-grid">
        {guides.slice(1).map((item) => (
          <NotchedProjectCard
            key={item.id}
            {...item}
            href="#related-title"
            className="related-cover"
            sizes="(max-width:699px) calc(100vw - 48px), (max-width:1023px) 44vw, 378px"
            onClick={(event) => {
              event.preventDefault();
              setGuide(item);
              dialog.current?.showModal();
            }}
          />
        ))}
      </div>
      <GuidePreviewDialog dialogRef={dialog} article={guide} />
    </section>
  );
}
