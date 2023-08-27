import { Dispatch } from "@reduxjs/toolkit";
import { functionsArgs } from "../types/functionsType";
import { Message } from "../types/toolsType";

type SocketAction = {
  socket: WebSocket;
  id: string | undefined;
  userName: string;
  canvas: HTMLCanvasElement | null;
  drawHandler: (canvas: HTMLCanvasElement | null, msg: Message) => void;
  functions: (args: functionsArgs) => void;
  undoArr: string[];
  redoArr: string[];
  setUndoArr: any;
  setRedoArr: any;
};

export function socketActions(args: SocketAction) {
  const {
    socket,
    id,
    userName,
    canvas,
    drawHandler,
    functions,
    undoArr,
    redoArr,
    setRedoArr,
    setUndoArr,
  } = args;

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        id,
        username: userName,
        method: "connection",
      })
    );
  };
  socket.onmessage = (event: any) => {
    let msg = JSON.parse(event.data);
    switch (msg.method) {
      case "connection":
        console.log(`Пользователь ${msg.username} был подключен`);
        break;
      case "draw":
        drawHandler(canvas, msg);
        break;
      case "func":
        functions({
          msg,
          id,
          undoArr,
          redoArr,
          setUndoArr,
          setRedoArr,
          canvas,
        });
        break;
    }
  };
}
