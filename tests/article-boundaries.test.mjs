function check(name, run) {
  run();
  console.log(`PASS: ${name}`);
}
import assert from "node:assert/strict";
import { merchantUrl } from "../lib/affiliate.ts";
import {
  articleStructuredData,
  serializeStructuredData,
  articleCanonical,
  breadcrumbStructuredData,
} from "../lib/article-seo.ts";

const merchant = {
  url: "https://retailer.example/item",
  merchantName: "Test fixture",
  verified: true,
  sponsored: true,
};
const publication = {
  isDemo: false,
  slug: "small-greenhouses",
  title: "Test fixture",
  image: "/images/greenhouse-small.webp",
  author: "Fixture author",
  publishedAt: "2025-01-10",
};

check(
  "retailer previews remain disconnected without explicitly verified configuration",
  () => {
    assert.equal(merchantUrl(), null);
    assert.equal(merchantUrl({ ...merchant, verified: false }), null);
    assert.equal(merchantUrl({ ...merchant, verified: "true" }), null);
    assert.equal(merchantUrl({ ...merchant, merchantName: "  " }), null);
  },
);
check(
  "retailer links reject script, data, insecure, relative, and credential-bearing URLs",
  () => {
    for (const url of [
      "javascript:alert(1)",
      "data:text/html,test",
      "http://retailer.example/item",
      "/item",
      "https://name:secret@retailer.example/item",
      "not a URL",
    ]) {
      assert.equal(merchantUrl({ ...merchant, url }), null, url);
    }
  },
);
check(
  "a verified HTTPS merchant URL is preserved without inventing tracking parameters",
  () => {
    assert.equal(merchantUrl(merchant), merchant.url);
  },
);
check("a demonstration never emits Article structured data", () => {
  assert.equal(articleStructuredData({ ...publication, isDemo: true }), null);
});
check(
  "missing authors and invalid or impossible publication dates suppress Article data",
  () => {
    for (const publishedAt of [
      undefined,
      "",
      "not a date",
      "2025-02-31",
      "2025-13-10",
    ]) {
      assert.equal(
        articleStructuredData({ ...publication, publishedAt }),
        null,
      );
    }
    assert.equal(
      articleStructuredData({ ...publication, author: undefined }),
      null,
    );
    assert.equal(articleStructuredData({ ...publication, author: "  " }), null);
  },
);
check(
  "future real publication fields can produce an Article without ratings or product claims",
  () => {
    const schema = articleStructuredData(publication);
    assert.equal(schema["@type"], "Article");
    assert.equal(schema.datePublished, publication.publishedAt);
    assert.equal(schema.url, articleCanonical(publication.slug));
    assert.equal(schema.aggregateRating, undefined);
  },
);
check("CMS text cannot break out of a JSON-LD script element", () => {
  const text = "</script><script>alert('fixture')</script>";
  const serialized = serializeStructuredData({ name: text });
  assert.equal(serialized.includes("<"), false);
  assert.equal(JSON.parse(serialized).name, text);
});
check(
  "breadcrumb URLs refer to the real home collection anchor and the sole article route",
  () => {
    const items = breadcrumbStructuredData(
      "Fixture title",
      "small-greenhouses",
    ).itemListElement;
    assert.equal(
      items[1].item,
      "https://haven-gable.vercel.app/#featured-guides",
    );
    assert.equal(
      items[2].item,
      "https://haven-gable.vercel.app/guides/small-greenhouses",
    );
  },
);
