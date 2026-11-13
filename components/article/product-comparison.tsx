"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
import { AffiliateLink } from "@/components/article/affiliate-link";
import type { ComparisonExample } from "@/lib/articles/small-greenhouses";

export function ProductComparison({
  examples,
}: {
  examples: ComparisonExample[];
}) {
  const [selected, setSelected] = useState<ComparisonExample | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <p className="comparison-disclosure" id="comparison-disclosure">
        <strong>Sample comparisons, not buying recommendations.</strong>{" "}
        Dimensions and materials below are illustrative. No manufacturer
        specifications, retailer links, prices, testing, or affiliate
        commissions are configured.
      </p>
      <div className="product-grid">
        {examples.map((example) => (
          <div className="comparison-entry" key={example.id} id={example.id}>
            <NotchedProjectCard
              href={`#${example.id}`}
              className="product-cover"
              title={example.name}
              badge={example.label}
              image={example.image}
              imageAlt={example.imageAlt}
              sizes="(max-width: 699px) calc(100vw - 48px), (max-width: 1023px) 44vw, 350px"
              onClick={(event) => {
                event.preventDefault();
                setSelected(example);
                dialog.current?.showModal();
              }}
            />
            <div className="product-information">
              <p className="sample-spec-note">
                Illustrative dimensions · Not manufacturer-stated
              </p>
              <dl>
                <div>
                  <dt>Footprint</dt>
                  <dd>{example.dimensions}</dd>
                </div>
                <div>
                  <dt>Frame</dt>
                  <dd>
                    {example.frame} <small>(example)</small>
                  </dd>
                </div>
                <div>
                  <dt>Glazing</dt>
                  <dd>
                    {example.glazing} <small>(example)</small>
                  </dd>
                </div>
              </dl>
              <h3>What this layout makes you consider</h3>
              <ul>
                {example.advantages.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
              <h3>Check carefully</h3>
              <ul>
                {example.limitations.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
              <AffiliateLink
                productName={example.name}
                merchant={example.merchant}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className="comparison-table-scroll"
        role="region"
        aria-label="Illustrative greenhouse comparison; scroll horizontally on small screens"
        tabIndex={0}
      >
        <table>
          <caption>
            Example configurations only. Photos do not establish dimensions or
            specifications.
          </caption>
          <thead>
            <tr>
              <th scope="col">Planning detail</th>
              {examples.map((e) => (
                <th scope="col" key={e.id}>
                  {e.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Illustrative footprint", ...examples.map((e) => e.dimensions)],
              ["Example frame", ...examples.map((e) => e.frame)],
              ["Example glazing", ...examples.map((e) => e.glazing)],
              [
                "Manufacturer specifications",
                ...examples.map(() => "Not supplied"),
              ],
              ["Retailer connection", ...examples.map(() => "Preview only")],
            ].map((row) => (
              <tr key={row[0]}>
                <th scope="row">{row[0]}</th>
                {row.slice(1).map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="table-hint">
        On a small screen, swipe the table to compare both examples.
      </p>
      <dialog
        ref={dialog}
        className="site-dialog sample-product-dialog"
        aria-labelledby="sample-product-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="dialog-heading">
          <span className="eyebrow">
            Illustrative example · Not a product offer
          </span>
          <button
            className="icon-button"
            aria-label="Close example details"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        {selected && (
          <>
            <Image
              src={selected.image}
              alt={selected.imageAlt}
              width={900}
              height={675}
              sizes="(max-width:559px) calc(100vw - 74px), 506px"
              className="preview-image"
            />
            <h2 id="sample-product-title">{selected.name}</h2>
            <p>{selected.note}</p>
            <p>
              No commercial model has been identified or tested. Retailer
              actions are not connected.
            </p>
          </>
        )}
      </dialog>
    </>
  );
}
