import type {
  BasketBreakdown,
  DeliveryFeePolicy,
  DiscountPolicy,
  ProductCatalog,
  ProductCode,
} from "../domain/types.js";
import { assert } from "../utils/assert.js";

export class ShoppingBasket {
  private readonly qtyByCode = new Map<ProductCode, number>();

  private readonly catalog: ProductCatalog;
  private readonly deliveryPolicy: DeliveryFeePolicy;
  private readonly discountPolicy: DiscountPolicy;

  constructor(
    catalog: ProductCatalog,
    deliveryPolicy: DeliveryFeePolicy,
    discountPolicy: DiscountPolicy,
  ) {
    this.catalog = catalog;
    this.deliveryPolicy = deliveryPolicy;
    this.discountPolicy = discountPolicy;
  }

  add(code: ProductCode): void {
    assert(typeof code === "string" && code.trim().length > 0, "Product code required");
    assert(this.catalog.has(code), `Unknown product code: ${code}`);
    this.qtyByCode.set(code, (this.qtyByCode.get(code) ?? 0) + 1);
  }

  getBreakdown(): BasketBreakdown {
    let subtotal = 0;
    let count = 0;
    for (const [code, qty] of this.qtyByCode) {
      const product = this.catalog.get(code)!;
      subtotal += product.unitPriceCents * qty;
      count += qty;
    }
    const discount = this.discountPolicy.calculateDiscount(this.qtyByCode, this.catalog);
    const discounted = Math.max(0, subtotal - discount);
    const delivery = this.deliveryPolicy.calculateFee(discounted, count);
    return {
      itemSubtotalCents: subtotal,
      discountCents: discount,
      deliveryFeeCents: delivery,
      grandTotalCents: discounted + delivery,
    };
  }
}
