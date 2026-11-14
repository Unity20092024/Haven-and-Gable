import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { merchantUrl, type VerifiedMerchantLink } from "@/lib/affiliate";
export function AffiliateLink({
  productName,
  merchant,
}: {
  productName: string;
  merchant?: VerifiedMerchantLink;
}) {
  const href = merchantUrl(merchant);
  if (!href || !merchant)
    return (
      <span className="affiliate-preview" aria-disabled="true">
        <LockKeyhole size={14} aria-hidden="true" />
        View at Retailer <small>Preview</small>
      </span>
    );
  return (
    <a
      className="retailer-link"
      href={href}
      target="_blank"
      rel={
        merchant.sponsored
          ? "sponsored noopener noreferrer"
          : "noopener noreferrer"
      }
      aria-label={`View ${productName} at ${merchant.merchantName} (opens in a new tab)`}
    >
      View at Retailer
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
