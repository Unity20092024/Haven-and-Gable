"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Leaf, Menu, Search, X, Mail } from "lucide-react";
import { Announcement, Brand } from "@/components/brand";
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
  const searchResults = allArticles.filter((item) =>
    `${item.title} ${item.badge}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div id="top">
        <Announcement />
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#featured-guides">Greenhouses</a>
            <a href="#categories">Garden &amp; Growing</a>
            <a href="#editors-picks">Outdoor Living</a>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Search guides"
              onClick={() => searchRef.current?.showModal()}
            >
              <Search />
            </button>
            <button
              className="icon-button menu-button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            className="mobile-nav"
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            {[
              { href: "#featured-guides", title: "Featured Guides" },
              { href: "#categories", title: "Browse by Category" },
              { href: "#editors-picks", title: "Editor's Picks" },
              { href: "#newsletter", title: "The Haven Letter" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.title}
                <ArrowRight aria-hidden="true" />
              </a>
            ))}
          </nav>
        )}
      </header>
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
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-intro">
            <Brand />
            <p>A little more joy in the places you call home.</p>
          </div>
          <nav aria-label="Footer guides">
            <strong>Find your inspiration</strong>
            <a href="#featured-guides">Greenhouses</a>
            <a href="#categories">Garden &amp; Growing</a>
            <a href="#editors-picks">Outdoor Living &amp; Cooking</a>
          </nav>
          <nav aria-label="About Haven and Gable">
            <strong>Haven &amp; Gable</strong>
            <button onClick={() => openInfo("About us")}>About us</button>
            <button onClick={() => openInfo("Contact")}>Contact</button>
            <button onClick={() => openInfo("Privacy")}>Privacy</button>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Haven &amp; Gable</span>
          <span>Better Living, Inside &amp; Out.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
      <dialog
        ref={searchRef}
        className="site-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) searchRef.current?.close();
        }}
        aria-labelledby="search-title"
      >
        <div className="dialog-heading">
          <h2 id="search-title">Find your next good idea.</h2>
          <button
            className="icon-button"
            aria-label="Close search"
            onClick={() => searchRef.current?.close()}
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
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="search-results">
          {searchResults.length ? (
            searchResults.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  searchRef.current?.close();
                  openArticle(item);
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
      <dialog
        ref={articleRef}
        className="site-dialog article-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) articleRef.current?.close();
        }}
        aria-labelledby="article-preview-title"
      >
        <div className="dialog-heading">
          <span className="eyebrow">Guide preview</span>
          <button
            className="icon-button"
            aria-label="Close guide preview"
            onClick={() => articleRef.current?.close()}
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
            <h2 id="article-preview-title">{article.title}</h2>
            <p>{article.description}</p>
            <span className="preview-note">
              A first look from Haven &amp; Gable. Full guides are coming soon.
            </span>
          </>
        )}
      </dialog>
      <dialog
        ref={infoRef}
        className="site-dialog"
        aria-labelledby="info-title"
      >
        <div className="dialog-heading">
          <h2 id="info-title">{info}</h2>
          <button
            className="icon-button"
            aria-label="Close information"
            onClick={() => infoRef.current?.close()}
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
    </>
  );
}
