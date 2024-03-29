import { configureStore } from "@reduxjs/toolkit";
import canvasSlice from "../features/canvasSlice";
import toolSlice from "../features/toolSlice";

export const store = configureStore({
  reducer: {
    canvas: canvasSlice,
    tool: toolSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
