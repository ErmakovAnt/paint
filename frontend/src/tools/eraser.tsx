import { DrawArgs, ToolType } from "../types/toolsType";

export const eraser: ToolType = (args) => {
  const { canvas, ctx, socket, id, lineWidth } = args;
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
    if (canvas && ctx) {
      ctx.fillStyle = "white";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 10;
      ctx?.beginPath();
      ctx?.moveTo(e.offsetX, e.offsetY);
      mouseDown = true;
    }
  }
  function mouseMoveHandler(e: MouseEvent) {
    if (!mouseDown) return;

    socket?.send(
      JSON.stringify({
        method: "draw",
        id,
        figure: {
          type: "eraser",
          x: e.offsetX,
          y: e.offsetY,
          fillColor: "white",
          strokeColor: "white",
          lineWidth,
        },
      })
    );
  }
};

export function drawEraser(args: DrawArgs) {
  const { ctx, x, y, fillColor, strokeColor, lineWidth } = args;
  if (ctx) {
    ctx.fillStyle = fillColor || "black";
    ctx.strokeStyle = strokeColor || "black";
    ctx.lineWidth = lineWidth || 10;
  }
  ctx?.lineTo(x, y);
  ctx?.stroke();
}
