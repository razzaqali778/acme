export type ProductCode = "R01" | "G01" | "B01";

export interface Product {
  code: ProductCode;
  name: string;
  unitPriceCents: number;
}

export interface ProductCatalog {
  get(_code: ProductCode): Product | undefined;
  has(_code: ProductCode): boolean;
  list(): ReadonlyArray<Product>;
}

export interface DiscountPolicy {
  calculateDiscount(_qtyByCode: ReadonlyMap<ProductCode, number>, _catalog: ProductCatalog): number;
}

export interface DeliveryFeePolicy {
  calculateFee(_discountedSubtotalCents: number, _itemCount: number): number;
}

export interface BasketBreakdown {
  itemSubtotalCents: number;
  discountCents: number;
  deliveryFeeCents: number;
  grandTotalCents: number;
}
