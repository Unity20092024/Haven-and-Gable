"use client";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { articleSections } from "@/lib/articles/small-greenhouses";

export function TableOfContents() {
  const mobile = useRef<HTMLDetailsElement>(null);
  const links = (close: boolean) => (
    <ol>
      {articleSections.map((section, index) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            onClick={() => {
              if (close && mobile.current) mobile.current.open = false;
            }}
          >
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <nav className="article-toc" aria-label="Article contents">
        <span className="eyebrow">Your growing guide</span>
        <h2>On this page</h2>
        {links(false)}
        <p>A considered start to a greener space.</p>
      </nav>
      <details className="mobile-toc" ref={mobile}>
        <summary>
          On this page
          <ChevronDown aria-hidden="true" size={18} />
        </summary>
        <nav aria-label="Mobile article contents">{links(true)}</nav>
      </details>
    </>
  );
}
