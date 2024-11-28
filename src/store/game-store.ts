import { create } from 'zustand';

interface GameStore {
  searchResults: any[];
  setSearchResults: (results: any[]) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
}));
