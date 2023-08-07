import { createSlice } from "@reduxjs/toolkit";

const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
    canvas: null,
  },
  reducers: {
    setCanvas(state, { payload }) {
      state.canvas = payload;
    },
  },
});

export const { setCanvas } = canvasSlice.actions;
export default canvasSlice.reducer;
