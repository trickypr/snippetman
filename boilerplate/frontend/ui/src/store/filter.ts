import create from "zustand";

export enum PrimaryFilterType {
  ALL = "all",
  TAG = "tag",
  LANG = "language",
  HEADER = "header",
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
