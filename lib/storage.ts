import { type Item } from "./items";

export interface GameState {
  balance: number;
  inventory: Item[];
}

// This interface defines what storage methods we need
export interface StorageService {
  getState: () => Promise<GameState>;
  setState: (state: GameState) => Promise<void>;
  updateBalance: (balance: number) => Promise<void>;
  updateInventory: (inventory: Item[]) => Promise<void>;
}

// Local Storage implementation
class LocalStorageService implements StorageService {
  private readonly STORAGE_KEY = "game_state";

  private getInitialState(): GameState {
    return {
      balance: 100,
      inventory: [],
    };
  }

  async getState(): Promise<GameState> {
    if (typeof window === "undefined") return this.getInitialState();

    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return this.getInitialState();

    try {
      return JSON.parse(stored) as GameState;
    } catch {
      return this.getInitialState();
    }
  }

  async setState(state: GameState): Promise<void> {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  async updateBalance(balance: number): Promise<void> {
    const state = await this.getState();
    await this.setState({ ...state, balance });
  }

  async updateInventory(inventory: Item[]): Promise<void> {
    const state = await this.getState();
    await this.setState({ ...state, inventory });
  }
}

// Export a single instance to use throughout the app
export const storage: StorageService = new LocalStorageService();
