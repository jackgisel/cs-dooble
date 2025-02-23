"use client";

import CaseSelection from "@/components/case-selection";
import Header from "@/components/header";
import Inventory from "@/components/inventory";
import { cases } from "@/lib/cases";
import { useGameState } from "@/lib/hooks/useGameState";

export default function Home() {
  const { balance, inventory, updateBalance, updateInventory } = useGameState();

  const handleDeposit = async (amount: number) => {
    await updateBalance(balance + amount);
  };

  const handleSellItem = async (itemId: number) => {
    const itemToSell = inventory.find((item) => item.id === itemId);
    if (itemToSell) {
      await updateBalance(balance + itemToSell.value);
      await updateInventory(inventory.filter((item) => item.id !== itemId));
    }
  };

  const handleSellAll = async () => {
    const totalValue = inventory.reduce((sum, item) => sum + item.value, 0);
    await updateBalance(balance + totalValue);
    await updateInventory([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        balance={balance}
        inventory={inventory}
        onDeposit={handleDeposit}
      />
      <main className="container mx-auto px-4 py-8">
        <CaseSelection cases={cases} balance={balance} />
        <Inventory
          items={inventory}
          onSellItem={handleSellItem}
          onSellAll={handleSellAll}
        />
      </main>
    </div>
  );
}
