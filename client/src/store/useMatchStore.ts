import { create } from "zustand";

export type BetType = "perming" | "nap";

interface MatchStore {
  selectedMatches: IMatch[];
  setSelectedMatches: (matches: IMatch[]) => void;
  betType: BetType;
  setBetType: (betType: BetType) => void;
}

const useMatchStore = create<MatchStore>((set) => ({
  selectedMatches: [],
  setSelectedMatches: (matches: IMatch[]) => set({ selectedMatches: matches }),
  betType: "perming",
  setBetType: (betType: BetType) => set({ betType }),
}));

export default useMatchStore;
