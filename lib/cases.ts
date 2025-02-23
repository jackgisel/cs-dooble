import {
  legendaryItems,
  premiumItems,
  standardItems,
  type Item,
} from "./items";

export interface Case {
  id: number;
  name: string;
  price: number;
  color: string;
  items: Item[];
  expectedValue: number; // Average return value
}

export const cases: Case[] = [
  {
    id: 1,
    name: "Standard Case",
    price: 2.49,
    color: "bg-blue-500",
    items: standardItems,
    expectedValue: standardItems.reduce(
      (sum, item) => sum + item.value * (item.weight / 100),
      0
    ),
  },
  {
    id: 2,
    name: "Premium Case",
    price: 4.99,
    color: "bg-purple-500",
    items: premiumItems,
    expectedValue: premiumItems.reduce(
      (sum, item) => sum + item.value * (item.weight / 100),
      0
    ),
  },
  {
    id: 3,
    name: "Legendary Case",
    price: 9.99,
    color: "bg-yellow-500",
    items: legendaryItems,
    expectedValue: legendaryItems.reduce(
      (sum, item) => sum + item.value * (item.weight / 100),
      0
    ),
  },
];
