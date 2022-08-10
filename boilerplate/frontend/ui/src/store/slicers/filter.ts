import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  primaryFilter: PrimaryFilter;
}

const initialState: FilterState = {
  primaryFilter: {
    type: PrimaryFilterType.ALL,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setAll(state) {
      delete state.primaryFilter.value;
      state.primaryFilter.type = PrimaryFilterType.ALL;
    },
    setPrimaryFilter(state, filter: PayloadAction<PrimaryFilter>) {
      state.primaryFilter = filter.payload;
    },
  },
});

export const { setAll, setPrimaryFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
