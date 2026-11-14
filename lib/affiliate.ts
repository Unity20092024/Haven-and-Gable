export interface VerifiedMerchantLink {
  url: string;
  merchantName: string;
  verified: true;
  sponsored: boolean;
}
export function merchantUrl(merchant?: VerifiedMerchantLink): string | null {
  if (merchant?.verified !== true || !merchant.merchantName.trim()) return null;
  try {
    const url = new URL(merchant.url);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}
