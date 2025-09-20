import type { ProductCode } from "../domain/types.js";

export const ACME_PRODUCTS_USD = [
  { code: "R01", name: "Red Widget", priceUSD: 32.95 },
  { code: "G01", name: "Green Widget", priceUSD: 24.95 },
  { code: "B01", name: "Blue Widget", priceUSD: 7.95 },
] as const;

export const ACME_DELIVERY_RULES_USD = [
  { upperBoundExclusiveUSD: 50, feeUSD: 4.95 },
  { upperBoundExclusiveUSD: 90, feeUSD: 2.95 },
  { upperBoundExclusiveUSD: Number.POSITIVE_INFINITY, feeUSD: 0 },
] as const;

export const ACME_OFFERS = {
  redBogoHalfCode: "R01" as ProductCode,
} as const;
