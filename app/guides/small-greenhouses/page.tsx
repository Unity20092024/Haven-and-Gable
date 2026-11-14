import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Leaf,
  UserRound,
} from "lucide-react";
import { ArticleFrame } from "@/components/article/article-frame";
import { TableOfContents } from "@/components/article/table-of-contents";
import { ProductComparison } from "@/components/article/product-comparison";
import { RelatedGuides } from "@/components/article/related-guides";
import { AdPlacement } from "@/components/article/ad-placement";
import {
  smallGreenhouseArticle as article,
  comparisonExamples,
} from "@/lib/articles/small-greenhouses";
import {
  articleCanonical,
  articleStructuredData,
  breadcrumbStructuredData,
  serializeStructuredData,
  siteOrigin,
} from "@/lib/article-seo";
import "./reading.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
export const metadata: Metadata = {
  title: `${article.title} | Haven & Gable — Editorial Preview`,
  description: article.introduction,
  alternates: { canonical: articleCanonical(article.slug) },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    type: "website",
    title: article.title,
    description: article.introduction,
    url: articleCanonical(article.slug),
    images: [
      {
        url: siteOrigin + article.image,
        width: 1448,
        height: 1086,
        alt: article.imageAlt,
      },
    ],
  },
};

export default function SmallGreenhousesPage() {
  const publishedSchema = articleStructuredData(article);
  return (
    <ArticleFrame>
      <main id="main" className="article-page">
        <div className="article-container">
          <nav className="article-breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <ChevronRight aria-hidden="true" />
                <Link href="/#featured-guides">Greenhouses</Link>
              </li>
              <li>
                <ChevronRight aria-hidden="true" />
                <span aria-current="page">Article</span>
              </li>
            </ol>
          </nav>
          <article aria-labelledby="article-title">
            <header className="reading-header">
              <div className="reading-kicker">
                <Link href="/#featured-guides">Greenhouses</Link>
                <span>Sample editorial</span>
              </div>
              <h1 id="article-title">{article.title}</h1>
              <p className="article-introduction">{article.introduction}</p>
              <div className="article-byline">
                <span>
                  <UserRound aria-hidden="true" />
                  {article.author ?? "Author to be confirmed"}
                </span>
                <span>
                  <CalendarDays aria-hidden="true" />
                  {article.publishedAt ? (
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          timeZone: "UTC",
                        },
                      )}
                    </time>
                  ) : (
                    "Not published"
                  )}
                </span>
                <span>
                  <Clock3 aria-hidden="true" />
                  {article.readingMinutes
                    ? `${article.readingMinutes} min read`
                    : "Reading time pending"}
                </span>
              </div>
              <p className="demo-note">
                A frontend demonstration article, not a finished published
                buying guide.
              </p>
            </header>
            <figure className="article-featured-image">
              <div>
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  priority
                  sizes="(max-width:1239px) calc(100vw - 48px), 1184px"
                />
              </div>
              <figcaption>
                AI-generated editorial photograph. No commercial product model
                or product test is represented.
              </figcaption>
            </figure>
            <div className="reading-layout">
              <TableOfContents />
              <div className="article-copy">
                <div className="reading-callout">
                  <Leaf aria-hidden="true" />
                  <div>
                    <strong>Start with what you want to grow.</strong>
                    <p>
                      Seed trays, tall crops, and a potting bench each need a
                      different kind of space. Plan those first, then compare
                      footprints.
                    </p>
                  </div>
                </div>
                <section aria-labelledby="what-is-a-small-greenhouse">
                  <h2 id="what-is-a-small-greenhouse" tabIndex={-1}>
                    What Is a Small Greenhouse?
                  </h2>
                  <p>
                    A small greenhouse is a sheltered growing space that fits
                    the scale of your garden. The useful question is less about
                    a size label and more about what you can comfortably do
                    inside it.
                  </p>
                  <p>
                    For this sample guide, think of a place to start seedlings,
                    tend a few crops, or keep a compact collection of plants. A
                    narrow structure with plenty of shelves serves a different
                    purpose from one with room for tall plants and a bench.
                  </p>
                </section>
                <section aria-labelledby="choosing-the-right-size">
                  <h2 id="choosing-the-right-size" tabIndex={-1}>
                    Choosing the Right Greenhouse Size
                  </h2>
                  <p>
                    Measure the garden space, then sketch the inside. The
                    outside footprint does not tell you how much room remains
                    once plants, staging, and a doorway are accounted for.
                  </p>
                  <h3>Think beyond the footprint</h3>
                  <ul>
                    <li>
                      <strong>Growing space:</strong> list the trays, pots, and
                      beds you would like to fit.
                    </li>
                    <li>
                      <strong>Working space:</strong> leave an aisle that you
                      can use comfortably.
                    </li>
                    <li>
                      <strong>Headroom:</strong> consider where you will stand
                      and where taller crops will grow.
                    </li>
                    <li>
                      <strong>Access:</strong> allow the door to open and leave
                      room to look after the outside.
                    </li>
                  </ul>
                  <p>
                    Mark a possible outline on the ground before committing to a
                    size. Walk around it with a watering can or tray. The{" "}
                    <a href="#greenhouse-comparison">
                      illustrative comparison below
                    </a>{" "}
                    shows how to organize your notes; it does not recommend a
                    particular product.
                  </p>
                </section>
                <AdPlacement slot="after-size" />
                <section aria-labelledby="common-materials">
                  <h2 id="common-materials" tabIndex={-1}>
                    Common Greenhouse Materials
                  </h2>
                  <p>
                    Frame and glazing should be considered together. Ask for the
                    actual material specification, how the glazing is secured,
                    and what care the finished structure needs.
                  </p>
                  <h3>Frame and glazing are separate choices</h3>
                  <p>
                    Aluminum and timber are two frame options you may encounter.
                    Glass and polycarbonate are glazing options. They are useful
                    categories for comparison, but the category alone is not
                    proof of a product’s strength, insulation, or lifespan.
                  </p>
                  <figure className="article-inline-image">
                    <div>
                      <Image
                        src="/images/greenhouse-panels.webp"
                        alt="Close-up of translucent ribbed polycarbonate panels secured in aluminum greenhouse framing"
                        fill
                        sizes="(max-width:1023px) calc(100vw - 48px), 720px"
                      />
                    </div>
                    <figcaption>
                      Illustrative polycarbonate detail. This image does not
                      verify panel thickness or performance.
                    </figcaption>
                  </figure>
                  <p>
                    Look for clear answers about panel thickness, ventilation,
                    replacement parts, and the base required. Keep those answers
                    beside your <a href="#before-you-buy">buying checklist</a>{" "}
                    rather than comparing photographs alone.
                  </p>
                </section>
                <section aria-labelledby="where-to-place-it">
                  <h2 id="where-to-place-it" tabIndex={-1}>
                    Where to Place Your Greenhouse
                  </h2>
                  <p>
                    Watch how light and shade move through your garden. Then
                    consider access, drainage, nearby trees, and the practical
                    route from your water source. A convenient spot is one you
                    are more likely to use and maintain.
                  </p>
                  <div className="reading-callout compact">
                    <Leaf aria-hidden="true" />
                    <div>
                      <strong>
                        Give the base as much thought as the frame.
                      </strong>
                      <p>
                        Check the supplier’s foundation and fixing instructions
                        for the specific structure. Local conditions and
                        permission requirements need to be checked for your own
                        site.
                      </p>
                    </div>
                  </div>
                  <p>
                    Before ordering, check current local rules. The{" "}
                    <a href="#sources-and-notes">further-reading links</a>{" "}
                    include general UK gardening and planning resources;
                    requirements elsewhere may differ.
                  </p>
                </section>
                <section aria-labelledby="before-you-buy">
                  <h2 id="before-you-buy" tabIndex={-1}>
                    What to Check Before Buying
                  </h2>
                  <p>
                    A useful shortlist records what is included as well as what
                    still needs an answer.
                  </p>
                  <ol>
                    <li>
                      <strong>Confirm the measurements.</strong> Ask for
                      external dimensions, usable height, door opening, and base
                      measurements.
                    </li>
                    <li>
                      <strong>Read the included-parts list.</strong> Check
                      whether staging, fixings, vents, and a base are supplied
                      or separate.
                    </li>
                    <li>
                      <strong>Plan delivery and assembly.</strong> Measure the
                      route into the garden and understand the work required.
                    </li>
                    <li>
                      <strong>Check care and support.</strong> Look for
                      maintenance guidance, replacement parts, and written
                      warranty terms.
                    </li>
                    <li>
                      <strong>Record unanswered questions.</strong> Seek
                      clarification before treating an attractive photograph as
                      a complete specification.
                    </li>
                  </ol>
                </section>
                <AdPlacement slot="before-comparison" />
                <section
                  className="article-comparison"
                  aria-labelledby="greenhouse-comparison"
                >
                  <h2 id="greenhouse-comparison" tabIndex={-1}>
                    Greenhouse Comparison
                  </h2>
                  <p>
                    Here is a sample comparison layout for a future buying
                    guide. Open either image card to inspect the example;
                    retailer actions are deliberately not connected.
                  </p>
                  <ProductComparison examples={comparisonExamples} />
                </section>
                <section
                  className="article-faq"
                  aria-labelledby="frequently-asked-questions"
                >
                  <h2 id="frequently-asked-questions" tabIndex={-1}>
                    Frequently Asked Questions
                  </h2>
                  <details>
                    <summary>How small can a useful greenhouse be?</summary>
                    <p>
                      That depends on what you want to grow and how you want to
                      work. Start with your trays, pots, and access needs, then
                      use the{" "}
                      <a href="#choosing-the-right-size">
                        size-planning checklist
                      </a>{" "}
                      to test a possible layout.
                    </p>
                  </details>
                  <details>
                    <summary>
                      Is glass or polycarbonate the better choice?
                    </summary>
                    <p>
                      There is no single answer for every garden. Compare the
                      actual glazing specification, frame, ventilation, care
                      requirements, and supplier guidance together. This
                      demonstration does not rank or test either material.
                    </p>
                  </details>
                  <details>
                    <summary>Does a greenhouse need a prepared base?</summary>
                    <p>
                      Check the instructions for the structure you are
                      considering. The base and fixing requirements should be
                      confirmed before ordering; do not assume that one
                      example’s installation details apply to another.
                    </p>
                  </details>
                </section>
                <section
                  className="article-sources"
                  aria-labelledby="sources-and-notes"
                >
                  <h2 id="sources-and-notes" tabIndex={-1}>
                    Sources &amp; Editorial Notes
                  </h2>
                  <p>
                    This sample demonstrates a reading-page layout. It contains
                    no product testing, pricing, reviews, or verified
                    manufacturer specifications. Author, date, and reading-time
                    fields are intentionally unpublished.
                  </p>
                  <ul>
                    <li>
                      <a
                        href="https://www.rhs.org.uk/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Royal Horticultural Society — gardening advice{" "}
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.planningportal.co.uk/permission/common-projects/outbuildings/planning-permission"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Planning Portal — general outbuilding planning guidance{" "}
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  </ul>
                  <p>
                    These are further-reading resources, not endorsements of the
                    sample examples. A published guide would need its own
                    editorial review and current, directly relevant references.
                  </p>
                </section>
              </div>
            </div>
          </article>
          <RelatedGuides />
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(
            breadcrumbStructuredData(article.title, article.slug),
          ),
        }}
      />
      {publishedSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData(publishedSchema),
          }}
        />
      )}
    </ArticleFrame>
  );
}
