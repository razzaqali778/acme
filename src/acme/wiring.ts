import { InMemoryProductCatalog } from "../catalog/inMemoryCatalog.js";
import { TieredDeliveryFeePolicy, type DeliveryTier } from "../policies/delivery/tieredDelivery.js";
import { BuyOneGetSecondHalfPrice } from "../policies/discounts/buyOneGetSecondHalf.js";
import { CombinedDiscountPolicy } from "../policies/discounts/combinedDiscount.js";
import type {
  Product,
  ProductCatalog,
  DiscountPolicy,
  DeliveryFeePolicy,
} from "../domain/types.js";
import { toCents } from "../utils/money.js";
import { ACME_PRODUCTS_USD, ACME_DELIVERY_RULES_USD, ACME_OFFERS } from "../config/acme.js";

export interface AcmeSystem {
  readonly catalog: ProductCatalog;
  readonly deliveryPolicy: DeliveryFeePolicy;
  readonly discountPolicy: DiscountPolicy;
}

export function createAcmeDefaults(): AcmeSystem {
  const products: ReadonlyArray<Product> = ACME_PRODUCTS_USD.map((p) => ({
    code: p.code,
    name: p.name,
    unitPriceCents: toCents(p.priceUSD),
  }));

  const catalog = new InMemoryProductCatalog(products);

  const deliveryTiers: ReadonlyArray<DeliveryTier> = ACME_DELIVERY_RULES_USD.map((t) => ({
    upperBoundExclusiveCents: toCents(t.upperBoundExclusiveUSD),
    feeCents: toCents(t.feeUSD),
  }));

  const deliveryPolicy = new TieredDeliveryFeePolicy(deliveryTiers);

  const discountPolicy = new CombinedDiscountPolicy([
    new BuyOneGetSecondHalfPrice(ACME_OFFERS.redBogoHalfCode),
  ]);

  return { catalog, deliveryPolicy, discountPolicy } as const;
}
