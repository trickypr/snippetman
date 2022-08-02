import { configureStore } from "@reduxjs/toolkit";

import { filterReducer } from "./slicers/filter";
import { snippetReducer } from "./slicers/snippets";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    snippet: snippetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
