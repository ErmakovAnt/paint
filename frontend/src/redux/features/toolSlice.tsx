import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface toolState {
  tool: string;
}
const initialState: toolState = {
  tool: "pencil",
};

export const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    setTool(state, action: PayloadAction<string>) {
      state.tool = action.payload;
    },
  },
});

export const { setTool } = toolSlice.actions;
export default toolSlice.reducer;
