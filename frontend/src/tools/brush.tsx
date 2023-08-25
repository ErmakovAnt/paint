import { DrawArgs, ToolType } from "../types/toolsType";

export const brush: ToolType = (args) => {
  const { canvas, ctx, socket, id, fillColor, strokeColor, lineWidth } = args;

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
    if (canvas) {
      ctx?.beginPath();
      ctx?.moveTo(e.offsetX, e.offsetY);
    }
    mouseDown = true;
  }
  function mouseMoveHandler(e: MouseEvent) {
    if (mouseDown) {
      socket?.send(
        JSON.stringify({
          method: "draw",
          id,
          figure: {
            type: "brush",
            x: e.offsetX,
            y: e.offsetY,
            fillColor,
            strokeColor,
            lineWidth,
          },
        })
      );
    }
  }
};

export function drawBrush(args: DrawArgs) {
  const { ctx, x, y, fillColor, strokeColor, lineWidth } = args;

  if (ctx) {
    ctx.fillStyle = fillColor || "black";
    ctx.strokeStyle = strokeColor || "black";
    ctx.lineWidth = lineWidth || 10;
  }

  ctx?.lineTo(x - 6, y - 6);
  ctx?.stroke();
}
