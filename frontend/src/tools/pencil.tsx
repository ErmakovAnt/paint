import { DrawArgs, ToolType } from "../types/toolsType";

export const pencil: ToolType = (args) => {
  const { canvas, ctx, socket, id, fillColor, strokeColor } = args;

  if (canvas) {
    canvas.onmousemove = null;
    canvas.onmousedown = null;
    canvas.onmouseup = null;
  }

  let mouseDown: boolean;

  function listen() {
    if (canvas) {
      canvas.onmousemove = mouseMoveHandler;
      canvas.onmousedown = mouseDownHandler;
      canvas.onmouseup = mouseUpHandler;
    }
  }
  listen();
  function mouseUpHandler() {
    mouseDown = false;
    if (socket) {
      socket.send(
        JSON.stringify({
          method: "draw",
          id,
          figure: {
            type: "finish",
          },
        })
      );
    }
  }
  function mouseDownHandler(e: MouseEvent) {
    mouseDown = true;
    if (ctx) {
      ctx.fillStyle = fillColor || "black";
      ctx.strokeStyle = strokeColor || "black";
    }

    if (canvas && ctx) {
      ctx?.beginPath();
      ctx?.moveTo(e.offsetX, e.offsetY);
      ctx.lineWidth = 1;
    }
  }
  function mouseMoveHandler(e: MouseEvent) {
    if (mouseDown && canvas) {
      socket?.send(
        JSON.stringify({
          method: "draw",
          id,
          figure: {
            type: "pencil",
            x: e.offsetX,
            y: e.offsetY,
            fillColor,
            strokeColor,
          },
        })
      );
    }
  }
};

export function drawPencil(args: DrawArgs) {
  const { ctx, x, y, fillColor, strokeColor } = args;
  if (ctx) {
    ctx.fillStyle = fillColor || "black";
    ctx.strokeStyle = strokeColor || "black";
    ctx.lineWidth = 1;
  }

  ctx?.lineTo(x, y);
  ctx?.stroke();
}
