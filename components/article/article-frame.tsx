"use client";
import { useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  SiteHeader,
  SiteFooter,
  type InfoTitle,
} from "@/components/site-chrome";
import {
  SiteSearchDialog,
  GuidePreviewDialog,
  SiteInfoDialog,
  type Guide,
} from "@/components/site-dialogs";

export function ArticleFrame({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [article, setArticle] = useState<Guide | null>(null);
  const [info, setInfo] = useState<InfoTitle | null>(null);
  const searchRef = useRef<HTMLDialogElement>(null);
  const articleRef = useRef<HTMLDialogElement>(null);
  const infoRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="article-screen">
      <SiteHeader
        homePrefix="/"
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
        onCloseMenu={() => setMenuOpen(false)}
        onSearch={() => searchRef.current?.showModal()}
      />
      {children}
      <SiteFooter
        homePrefix="/"
        onInfo={(title) => {
          setInfo(title);
          infoRef.current?.showModal();
        }}
      />
      <SiteSearchDialog
        dialogRef={searchRef}
        query={query}
        onQuery={setQuery}
        onSelect={(guide) => {
          if (guide.id === "small-greenhouses") {
            router.push("/guides/small-greenhouses");
            return;
          }
          setArticle(guide);
          articleRef.current?.showModal();
        }}
      />
      <GuidePreviewDialog dialogRef={articleRef} article={article} />
      <SiteInfoDialog dialogRef={infoRef} info={info} />
    </div>
  );
}
