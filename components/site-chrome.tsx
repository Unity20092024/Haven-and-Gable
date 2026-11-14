"use client";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { Announcement, Brand } from "@/components/brand";
export type InfoTitle = "About us" | "Privacy" | "Contact";
export function SiteHeader({
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  onSearch,
  homePrefix = "",
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onSearch: () => void;
  homePrefix?: string;
}) {
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
          <Brand href={homePrefix ? "/" : "#top"} />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href={`${homePrefix}#featured-guides`}>Greenhouses</a>
            <a href={`${homePrefix}#categories`}>Garden &amp; Growing</a>
            <a href={`${homePrefix}#editors-picks`}>Outdoor Living</a>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Search guides"
              onClick={onSearch}
            >
              <Search />
            </button>
            <button
              className="icon-button menu-button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={onToggleMenu}
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
                href={`${homePrefix}${link.href}`}
                onClick={onCloseMenu}
              >
                {link.title}
                <ArrowRight aria-hidden="true" />
              </a>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
export function SiteFooter({
  onInfo,
  homePrefix = "",
}: {
  onInfo: (title: InfoTitle) => void;
  homePrefix?: string;
}) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-intro">
          <Brand href={homePrefix ? "/" : "#top"} />
          <p>A little more joy in the places you call home.</p>
        </div>
        <nav aria-label="Footer guides">
          <strong>Find your inspiration</strong>
          <a href={`${homePrefix}#featured-guides`}>Greenhouses</a>
          <a href={`${homePrefix}#categories`}>Garden &amp; Growing</a>
          <a href={`${homePrefix}#editors-picks`}>
            Outdoor Living &amp; Cooking
          </a>
        </nav>
        <nav aria-label="About Haven and Gable">
          <strong>Haven &amp; Gable</strong>
          <button onClick={() => onInfo("About us")}>About us</button>
          <button onClick={() => onInfo("Contact")}>Contact</button>
          <button onClick={() => onInfo("Privacy")}>Privacy</button>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Haven &amp; Gable</span>
        <span>Better Living, Inside &amp; Out.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
