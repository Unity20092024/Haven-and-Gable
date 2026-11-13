"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Leaf, X, Mail } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import {
  SiteSearchDialog,
  GuidePreviewDialog,
  SiteInfoDialog,
} from "@/components/site-dialogs";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
import { allArticles, categories, editors, guides } from "@/lib/content";

type Article = (typeof allArticles)[number];

export default function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const [info, setInfo] = useState<"About us" | "Privacy" | "Contact" | null>(
    null,
  );
  const [newsletterPreview, setNewsletterPreview] = useState(false);
  const searchRef = useRef<HTMLDialogElement>(null);
  const articleRef = useRef<HTMLDialogElement>(null);
  const infoRef = useRef<HTMLDialogElement>(null);
  const openArticle = (item: Article) => {
    setArticle(item);
    articleRef.current?.showModal();
  };
  const openInfo = (title: typeof info) => {
    setInfo(title);
    infoRef.current?.showModal();
  };
  const picks = category
    ? allArticles.filter((item) => item.category === category)
    : editors;

  return (
    <>
      <SiteHeader
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
        onCloseMenu={() => setMenuOpen(false)}
        onSearch={() => searchRef.current?.showModal()}
      />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <Image
            src="/images/hero-greenhouse.webp"
            alt="A sunlit glass greenhouse nestled in a lush garden with pink flowers and a wicker chair"
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <span className="hero-badge">Greenhouse buying guides</span>
            <h1 id="hero-title">
              Better Living
              <br />
              Starts Here.
            </h1>
            <p>
              Practical guides, thoughtful inspiration, and
              <br className="mobile-break" /> smarter buying advice for your
              home, garden,
              <br className="mobile-break" /> and everything outdoors.
            </p>
            <div className="hero-actions">
              <a className="button button-green" href="#featured-guides">
                Explore Greenhouses <ArrowRight aria-hidden="true" />
              </a>
              <a className="button button-ivory" href="#categories">
                Browse Our Guides
              </a>
            </div>
          </div>
        </section>
        <div className="page-content">
          <section
            className="section featured-section"
            id="featured-guides"
            aria-labelledby="featured-title"
          >
            <div className="section-heading">
              <h2 id="featured-title">Featured Guides</h2>
              <a
                className="view-all"
                href="#editors-picks"
                onClick={() => setCategory("Greenhouses")}
              >
                View All Guides <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <div className="featured-grid">
              {guides.map((item) => (
                <NotchedProjectCard
                  key={item.id}
                  {...item}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    openArticle(item);
                  }}
                />
              ))}
            </div>
          </section>
          <section
            className="section category-section"
            id="categories"
            aria-labelledby="category-title"
          >
            <div className="section-heading">
              <h2 id="category-title">Browse by Category</h2>
            </div>
            <div className="category-grid">
              {categories.map((item) => (
                <NotchedProjectCard
                  key={item.title}
                  {...item}
                  variant="category"
                  href="#editors-picks"
                  onClick={() => setCategory(item.title)}
                />
              ))}
            </div>
          </section>
          <section
            className="section editors-section"
            id="editors-picks"
            aria-labelledby="editors-title"
          >
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  Thoughtfully chosen. Simply useful.
                </span>
                <h2 id="editors-title">Editor&apos;s Picks</h2>
              </div>
              <span className="editor-note">
                A little inspiration for your next good idea.
              </span>
            </div>
            {category && (
              <div className="active-filter">
                Browsing: {category}
                <button onClick={() => setCategory(null)}>
                  Show all <X size={13} aria-hidden="true" />
                </button>
              </div>
            )}
            <div className="editors-grid">
              {picks.map((item, index) => (
                <div key={item.id} className="editor-item">
                  <NotchedProjectCard
                    {...item}
                    variant="editor"
                    sizes={
                      index === 0
                        ? "(max-width: 699px) calc(100vw - 54px), (max-width: 1239px) calc((100vw - 104px) / 3), 378.7px"
                        : "(max-width: 699px) calc((100vw - 64px) / 2), (max-width: 1239px) calc((100vw - 104px) / 3), 378.7px"
                    }
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      openArticle(item);
                    }}
                  />
                  <p>{item.description.split(". ")[0]}.</p>
                  <button
                    className="text-link"
                    onClick={() => openArticle(item)}
                  >
                    Read the preview <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </section>
          <section
            className="newsletter"
            id="newsletter"
            aria-labelledby="newsletter-title"
          >
            <div className="newsletter-art">
              <Leaf aria-hidden="true" />
              <span>The Haven Letter</span>
            </div>
            <div className="newsletter-content">
              <span className="eyebrow">Good things, growing.</span>
              <h2 id="newsletter-title">
                A little inspiration.
                <br />A better everyday.
              </h2>
              <p>
                Fresh ideas for your home and garden, thoughtful guides, and the
                occasional nudge to get outside.
              </p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setNewsletterPreview(true);
                }}
              >
                <label className="sr-only" htmlFor="newsletter-email">
                  Email address
                </label>
                <div className="email-field">
                  <Mail aria-hidden="true" />
                  <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    placeholder="Your email address"
                    required
                  />
                  <button aria-label="Preview newsletter signup">
                    <ArrowRight aria-hidden="true" />
                  </button>
                </div>
                <small aria-live="polite">
                  {newsletterPreview
                    ? "Thanks for trying the preview. Signups will open when we launch."
                    : "Newsletter preview · Signups opening soon."}
                </small>
              </form>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter onInfo={openInfo} />
      <SiteSearchDialog
        dialogRef={searchRef}
        query={query}
        onQuery={setQuery}
        onSelect={openArticle}
      />
      <GuidePreviewDialog dialogRef={articleRef} article={article} />
      <SiteInfoDialog dialogRef={infoRef} info={info} />
    </>
  );
}
