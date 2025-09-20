import type { Product, ProductCatalog, ProductCode } from "../domain/types.js";
import { assert } from "../utils/assert.js";

export class InMemoryProductCatalog implements ProductCatalog {
  private readonly byCode = new Map<ProductCode, Product>();

  constructor(products: ReadonlyArray<Product>) {
    assert(products.length > 0, "Catalog must have at least one product");
    const seen = new Set<string>();
    for (const p of products) {
      assert(p.code && typeof p.code === "string", "Product code required");
      assert(!seen.has(p.code), `Duplicate product code: ${p.code}`);
      assert(p.name.trim().length > 0, `Product name required for ${p.code}`);
      assert(
        Number.isInteger(p.unitPriceCents) && p.unitPriceCents >= 0,
        `Price must be >= 0 for ${p.code}`,
      );
      this.byCode.set(p.code, { ...p });
      seen.add(p.code);
    }
  }

  get(code: ProductCode): Product | undefined {
    return this.byCode.get(code);
  }
  has(code: ProductCode): boolean {
    return this.byCode.has(code);
  }
  list(): ReadonlyArray<Product> {
    return [...this.byCode.values()];
  }
}
