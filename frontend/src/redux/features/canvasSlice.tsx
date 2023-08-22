import { createSlice } from "@reduxjs/toolkit";
interface CanvasState {
  canvas: HTMLCanvasElement | null;
  userName: string;
  socket: WebSocket | null;
  id: string | null;
}

const initialState: CanvasState = {
  canvas: null,
  socket: null,
  id: null,
  userName: "",
};
const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setCanvas(state, action) {
      state.canvas = action.payload;
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setSocket(state, action) {
      state.socket = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
  },
});

export const { setCanvas, setUserName, setSocket, setId } = canvasSlice.actions;
export default canvasSlice.reducer;
