import type { VerifiedMerchantLink } from "@/lib/affiliate";

/** Static editorial input. These fields can later be mapped from Sanity without
 * changing the reading-page components. Undefined publication fields stay absent. */
export const smallGreenhouseArticle = {
  slug: "small-greenhouses",
  title: "Small Greenhouses: How to Choose the Right Size",
  category: "Greenhouses",
  introduction:
    "A small greenhouse can give you more growing space without taking over your backyard. This guide explains the sizes, materials, and practical details to consider before choosing one.",
  isDemo: true,
  author: undefined as string | undefined,
  publishedAt: undefined as string | undefined,
  readingMinutes: undefined as number | undefined,
  image: "/images/greenhouse-small.webp",
  imageAlt:
    "A modest black aluminum-framed greenhouse with tomato plants, seed trays, and terracotta pots in a residential garden",
};

export const articleSections = [
  { id: "what-is-a-small-greenhouse", title: "What Is a Small Greenhouse?" },
  {
    id: "choosing-the-right-size",
    title: "Choosing the Right Greenhouse Size",
  },
  { id: "common-materials", title: "Common Greenhouse Materials" },
  { id: "where-to-place-it", title: "Where to Place Your Greenhouse" },
  { id: "before-you-buy", title: "What to Check Before Buying" },
  { id: "greenhouse-comparison", title: "Greenhouse Comparison" },
  { id: "frequently-asked-questions", title: "Frequently Asked Questions" },
];

export interface ComparisonExample {
  merchant?: VerifiedMerchantLink;
  id: string;
  name: string;
  label: string;
  image: string;
  imageAlt: string;
  dimensions: string;
  frame: string;
  glazing: string;
  advantages: string[];
  limitations: string[];
  note: string;
}
export const comparisonExamples: ComparisonExample[] = [
  {
    id: "compact-example",
    name: "A compact growing space",
    label: "Illustrative example A",
    image: "/images/greenhouse-small.webp",
    imageAlt:
      "Illustrative backyard greenhouse exterior; no specific model or dimensions are represented",
    dimensions: "1.8 × 1.2 m",
    frame: "Aluminum",
    glazing: "Glass",
    advantages: [
      "A smaller footprint to consider for a limited plot.",
      "A simple starting point for planning shelves and seed trays.",
    ],
    limitations: [
      "Check whether staging would leave a comfortable aisle.",
      "Compare door clearance and usable height before choosing.",
    ],
    note: "A sample compact layout for comparison. Dimensions and materials are illustrative, not specifications for the photograph.",
  },
  {
    id: "room-to-work-example",
    name: "A little more room to work",
    label: "Illustrative example B",
    image: "/images/greenhouse-timber.webp",
    imageAlt:
      "Illustrative timber and polycarbonate greenhouse; no specific model or dimensions are represented",
    dimensions: "2.4 × 1.8 m",
    frame: "Timber",
    glazing: "Polycarbonate",
    advantages: [
      "More floor area to plan a bench and separate growing space.",
      "A useful example for thinking about future growing needs.",
    ],
    limitations: [
      "Allow enough garden space for access around the structure.",
      "Check the frame's care requirements and panel fixings.",
    ],
    note: "A sample larger layout for comparison. Dimensions and materials are illustrative, not specifications for the photograph.",
  },
];
