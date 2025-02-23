import { useEffect, useState } from "react";
import { type GameState, storage } from "../storage";

export function useGameState() {
  const [state, setState] = useState<GameState | null>(null);

  useEffect(() => {
    storage.getState().then(setState);
  }, []);

  const updateBalance = async (balance: number) => {
    await storage.updateBalance(balance);
    setState((prev) => (prev ? { ...prev, balance } : null));
  };

  const updateInventory = async (inventory: Item[]) => {
    await storage.updateInventory(inventory);
    setState((prev) => (prev ? { ...prev, inventory } : null));
  };

  return {
    balance: state?.balance ?? 0,
    inventory: state?.inventory ?? [],
    updateBalance,
    updateInventory,
  };
}
