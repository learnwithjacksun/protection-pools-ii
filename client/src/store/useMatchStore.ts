import { create } from "zustand";

interface MatchStore {
  selectedMatches: IMatch[];
  setSelectedMatches: (matches: IMatch[]) => void;
}

const useMatchStore = create<MatchStore>((set) => ({
  selectedMatches: [],
  setSelectedMatches: (matches: IMatch[]) => set({ selectedMatches: matches }),
}));

export default useMatchStore;
