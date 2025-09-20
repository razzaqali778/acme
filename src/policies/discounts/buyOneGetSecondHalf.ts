import type { DiscountPolicy, ProductCatalog, ProductCode } from "../../domain/types.js";
import { assert } from "../../utils/assert.js";

export class BuyOneGetSecondHalfPrice implements DiscountPolicy {
  private readonly code: ProductCode;

  constructor(code: ProductCode) {
    this.code = code;
  }

  calculateDiscount(qtyByCode: ReadonlyMap<ProductCode, number>, catalog: ProductCatalog): number {
    const count = qtyByCode.get(this.code) ?? 0;
    if (count < 2) return 0;
    const product = catalog.get(this.code);
    assert(product, `Discount target not in catalog: ${this.code}`);
    const pairs = Math.floor(count / 2);
    const half = Math.round(product!.unitPriceCents / 2);
    return Math.max(0, pairs * half);
  }
}
