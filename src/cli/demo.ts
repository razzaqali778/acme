import { ShoppingBasket } from "../basket/shoppingBasket.js";
import { createAcmeDefaults } from "../acme/wiring.js";
import { formatUsd } from "../utils/money.js";

const { catalog, deliveryPolicy, discountPolicy } = createAcmeDefaults();

const basket = new ShoppingBasket(catalog, deliveryPolicy, discountPolicy);

for (const code of process.argv.slice(2)) basket.add(code as any);
console.log(formatUsd(basket.getBreakdown().grandTotalCents));
