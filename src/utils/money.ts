import { assert } from "./assert.js";

export function toCents(value: number | string): number {
  if (typeof value === "number") return Math.round(value * 100);
  const s = String(value).trim();
  assert(/^\d+(\.\d{1,2})?$/.test(s), `Invalid money: ${value}`);
  const [whole, frac = "0"] = s.split(".");
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  assert(Number.isFinite(cents) && cents >= 0, `Money out of range: ${value}`);
  return cents;
}
export function formatUsd(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const v = Math.abs(cents);
  const dollars = Math.floor(v / 100);
  const remainder = v % 100;
  return `${sign}$${dollars}.${String(remainder).padStart(2, "0")}`;
}
