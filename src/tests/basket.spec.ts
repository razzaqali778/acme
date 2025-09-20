import { describe, it, expect } from "vitest";
import { ShoppingBasket, createAcmeDefaults, formatUsd } from "../index";

function newBasket() {
  const { catalog, deliveryPolicy, discountPolicy } = createAcmeDefaults();
  return new ShoppingBasket(catalog, deliveryPolicy, discountPolicy);
}

function totalOf(codes: string[]) {
  const b = newBasket();
  for (const c of codes) b.add(c as any);
  return formatUsd(b.getBreakdown().grandTotalCents);
}

describe("Example baskets", () => {
  it("B01, G01 -> $37.85", () => {
    expect(totalOf(["B01", "G01"])).toBe("$37.85");
  });
  it("R01, R01 -> $54.37", () => {
    expect(totalOf(["R01", "R01"])).toBe("$54.37");
  });
  it("R01, G01 -> $60.85", () => {
    expect(totalOf(["R01", "G01"])).toBe("$60.85");
  });
  it("B01, B01, R01, R01, R01 -> $98.27", () => {
    expect(totalOf(["B01", "B01", "R01", "R01", "R01"])).toBe("$98.27");
  });
});

describe("Edges", () => {
  it("Empty -> $0.00 and no delivery", () => {
    expect(totalOf([])).toBe("$0.00");
  });
  it("Invalid code throws", () => {
    const b = newBasket();
    expect(() => b.add("X99" as any)).toThrow(/Unknown product code/);
  });
});
