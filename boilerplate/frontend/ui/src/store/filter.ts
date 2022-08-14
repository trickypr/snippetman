import create from "zustand";

export const enum PrimaryFilterType {
  ALL,
  TAG,
  LANG,
  HEADER,
}

export interface PrimaryFilter {
  type: PrimaryFilterType;
  value?: string;
}

export interface FilterState {
  filter: PrimaryFilter;

  setAll: () => void;
  setFilter: (filter: PrimaryFilter) => void;
}

export const useFilterStore = create<FilterState>()((set, get) => ({
  filter: {
    type: PrimaryFilterType.ALL,
  },

  setAll: () => set({ filter: { type: PrimaryFilterType.ALL } }),
  setFilter: (filter: PrimaryFilter) => set({ filter: filter }),
}));
