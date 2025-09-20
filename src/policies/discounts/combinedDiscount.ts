import type { DiscountPolicy, ProductCatalog, ProductCode } from "../../domain/types.js";

export class CombinedDiscountPolicy implements DiscountPolicy {
  private readonly policies: ReadonlyArray<DiscountPolicy>;

  constructor(policies: ReadonlyArray<DiscountPolicy>) {
    this.policies = policies;
  }

  calculateDiscount(qtyByCode: ReadonlyMap<ProductCode, number>, catalog: ProductCatalog): number {
    return this.policies.reduce((sum, p) => sum + p.calculateDiscount(qtyByCode, catalog), 0);
  }
}
