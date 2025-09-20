import type { DeliveryFeePolicy } from "../../domain/types.js";
import { assert } from "../../utils/assert.js";

export interface DeliveryTier {
  upperBoundExclusiveCents: number;
  feeCents: number;
}

export class TieredDeliveryFeePolicy implements DeliveryFeePolicy {
  private readonly tiers: DeliveryTier[];

  constructor(tiers: ReadonlyArray<DeliveryTier>) {
    assert(tiers.length > 0, "At least one delivery tier required");

    this.tiers = [...tiers].sort((a, b) => a.upperBoundExclusiveCents - b.upperBoundExclusiveCents);

    assert(
      this.tiers.at(-1)!.upperBoundExclusiveCents === Number.POSITIVE_INFINITY,
      "Final tier must cover Infinity",
    );

    let prev = -Infinity;
    for (let i = 0; i < this.tiers.length; i++) {
      const t = this.tiers[i];
      const isLast = i === this.tiers.length - 1;

      if (!isLast) {
        assert(
          Number.isFinite(t.upperBoundExclusiveCents),
          "Non-final tier upper bound must be finite",
        );
      }
      assert(t.upperBoundExclusiveCents > prev, "Tiers must have strictly increasing bounds");
      assert(Number.isInteger(t.feeCents) && t.feeCents >= 0, "Fee must be >= 0");

      prev = t.upperBoundExclusiveCents;
    }
  }

  calculateFee(discountedSubtotalCents: number, itemCount: number): number {
    if (itemCount === 0) return 0;
    const match = this.tiers.find((t) => discountedSubtotalCents < t.upperBoundExclusiveCents);
    assert(match, "No delivery tier matched subtotal");
    return match.feeCents;
  }
}
