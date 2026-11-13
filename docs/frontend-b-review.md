# Frontend B — article reading page

## Scope and baseline

Frontend A was merged into `main` in commit `19ce878`. The branch
`feat/frontend-b-article` starts at that approved commit. Only one route is added:
`/guides/small-greenhouses`. No category pages or other article routes are built.

The official logo, hero and editorial imagery, homepage colors, layout, cards,
newsletter, and footer remain intact. Header, footer, search, information, and
short guide-preview dialogs are extracted from the homepage into shared
components. Their default behavior and rendered homepage appearance are retained.
The article uses the same components with working home-collection links. The
homepage retains its existing preview interaction; the small-greenhouse preview
now offers a clearly labeled link to the one available sample article.

## Reading page

- Clear sample-editorial status, exact requested title and introduction, and
  unpublished author/date/reading-time fields.
- Approved greenhouse exterior as the large featured image; approved panel detail
  inline. No new artwork. Captions explain that imagery is illustrative and no
  product model has been identified or tested.
- Seven anchored sample sections, H2/H3 headings, lists, callouts, figure captions,
  a comparison table, further-reading links, and expandable FAQs.
- Desktop sticky contents column; mobile/tablet native collapsible contents panel.
  The mobile panel closes before following its anchor. Global reduced-motion
  styles also apply to native anchor scrolling and image hover.
- Related guides reuse `NotchedProjectCard` and the existing preview dialog; these
  do not pretend to be additional published routes.

## Comparison and affiliate boundaries

`ProductComparison` receives typed generic examples. Dimensions and materials are
explicitly illustrative, with no manufacturer-stated specification, product test,
price, review score, availability, or commercial recommendation. The image,
headline, and sculpted arrow open the same accessible sample-details dialog.
The existing SVG notch component is reused unchanged, with an 8px radial gap.

`AffiliateLink` accepts only explicitly verified HTTPS merchant configuration.
Script/data/insecure/relative/credential-bearing URLs are rejected. Sponsored
external links receive `sponsored noopener noreferrer`, descriptive accessible
labels, and a new-tab announcement. No merchant URLs are configured in this
page: all retailer actions are noninteractive, clearly labeled previews. Future
production editors must verify the merchant configuration before supplying it.

`AdPlacement` is a disabled integration boundary after the size section and before
comparison. It renders nothing without both an enabled flag and real children.
There are no ad scripts, fake ad offers, or visible empty ad boxes.

## Metadata and future content

The demo has a unique title and description, a canonical URL under
`https://haven-gable.vercel.app`, and `noindex, nofollow, noarchive` metadata.
It is not added to a sitemap or submitted for indexing. Breadcrumb structured
data links to existing home/collection locations and this route. Article
structured data is deliberately omitted for demonstrations or incomplete
publication fields. JSON-LD text is escaped against script-tag injection.

`lib/articles/small-greenhouses.ts` supplies typed article and comparison inputs.
These inputs and the presentation components can be mapped to Sanity later;
there is no CMS connection or backend in this change.

## Validation

- `npm run test:article`: eight assertion groups covering merchant verification,
  URL safety, demonstration/publication schema gates, impossible dates, JSON-LD
  escaping, and accurate canonical/breadcrumb URLs.
- TypeScript, ESLint, and Next.js production build.
- Browser coverage: 360px, 390px, 430px, 768px, 1440px; mobile contents expansion,
  all heading anchors, sticky sidebar, table containment, FAQ toggles, card image/
  title/arrow actions, keyboard focus and dialog closure, related previews,
  shared search/navigation/footer, image loading and responsive sources.
- Automated axe WCAG A/AA/2.1/2.2 checks, plus manual text/crop/notch inspection.
  Article-only contrast and minimum footer-target spacing address audit findings;
  no homepage styles are changed.
- Homepage before/after pixel comparisons at all five widths to verify shared
  component extraction. Official PNG remains byte-identical to the approved file.

Final results: all five widths pass with nine loaded images, seven working
contents anchors, zero automated axe violations, no page overflow, and zero
observed cumulative layout shift. Keyboard, dialogs, product-card regions,
related previews, table scrolling, reduced motion, and touch checks pass. The
homepage is pixel-identical to its approved baseline at all five widths.

Review screenshots are in `screenshots/frontend-b/`. The article and product-card
screenshots show the real rendered route, not a component gallery.

## Remaining limitations

This is sample editorial content, not a published or tested buying guide. Real
publication information, verified recommendations and merchants, CMS, and ads
remain unconnected. Related guides remain short previews. Browser checks use
emulated viewports rather than physical Android/iPhone devices. The current
native-resolution approved photographs are reused without upscaling or generation.

Do not merge or begin Frontend C until the owner approves Frontend B.
