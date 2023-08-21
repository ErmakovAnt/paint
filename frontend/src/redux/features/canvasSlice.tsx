import { createSlice } from "@reduxjs/toolkit";
interface CanvasState {
  canvas: HTMLCanvasElement | null;
}

const initialState: CanvasState = {
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
