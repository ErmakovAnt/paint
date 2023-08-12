import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  canvas: null,
};
const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setCanvas(state, action) {
      state.canvas = action.payload;
    },
  },
});

export const { setCanvas } = canvasSlice.actions;
export default canvasSlice.reducer;
