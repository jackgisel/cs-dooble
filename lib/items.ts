export interface Item {
  id?: number;
  name: string;
  rarity: string;
  color: string;
  value: number;
  weight: number;
}

// Define different item pools
export const standardItems: Item[] = [
  {
    name: "Common Grey",
    rarity: "Common",
    color: "bg-gray-400",
    value: 0.25,
    weight: 40, // 40% chance
  },
  {
    name: "Common Blue",
    rarity: "Common",
    color: "bg-gray-500",
    value: 0.5,
    weight: 35, // 35% chance
  },
  {
    name: "Uncommon Green",
    rarity: "Uncommon",
    color: "bg-green-500",
    value: 1.5,
    weight: 15, // 15% chance
  },
  {
    name: "Rare Blue",
    rarity: "Rare",
    color: "bg-blue-500",
    value: 3.0,
    weight: 10, // 10% chance
  },
];

export const premiumItems: Item[] = [
  {
    name: "Uncommon Green",
    rarity: "Uncommon",
    color: "bg-green-500",
    value: 1.5,
    weight: 40, // 40% chance
  },
  {
    name: "Rare Blue",
    rarity: "Rare",
    color: "bg-blue-500",
    value: 3.0,
    weight: 35, // 35% chance
  },
  {
    name: "Epic Purple",
    rarity: "Epic",
    color: "bg-purple-500",
    value: 7.5,
    weight: 20, // 20% chance
  },
  {
    name: "Legendary Gold",
    rarity: "Legendary",
    color: "bg-yellow-500",
    value: 15.0,
    weight: 5, // 5% chance
  },
];

export const legendaryItems: Item[] = [
  {
    name: "Rare Blue",
    rarity: "Rare",
    color: "bg-blue-500",
    value: 3.0,
    weight: 35, // 35% chance
  },
  {
    name: "Epic Purple",
    rarity: "Epic",
    color: "bg-purple-500",
    value: 7.5,
    weight: 30, // 30% chance
  },
  {
    name: "Legendary Gold",
    rarity: "Legendary",
    color: "bg-yellow-500",
    value: 15.0,
    weight: 25, // 25% chance
  },
  {
    name: "Ultra Red",
    rarity: "Ultra",
    color: "bg-red-500",
    value: 30.0,
    weight: 10, // 10% chance
  },
];

export function selectItemByWeight(items: Item[]): Item {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;

  for (const item of items) {
    random -= item.weight;
    if (random <= 0) {
      return item;
    }
  }
  return items[0];
}
