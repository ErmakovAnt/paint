import { DrawArgs, ToolType } from "../types/toolsType";

export const line: ToolType = (args) => {
  const { canvas, ctx, socket, id, fillColor, strokeColor, lineWidth } = args;

  let mouseDown: boolean;
  let currentX: number;
  let currentY: number;
  let saved: string;

  function listen() {
    if (canvas) {
      canvas.onmousemove = mouseMoveHandler;
      canvas.onmousedown = mouseDownHandler;
      canvas.onmouseup = mouseUpHandler;
    }
  }
  listen();
  function mouseUpHandler(e: MouseEvent) {
    mouseDown = false;
    socket?.send(
      JSON.stringify({
        method: "draw",
        id,
        figure: {
          type: "line",
          x: e.offsetX,
          y: e.offsetY,
          currentX,
          currentY,
          fillColor,
          strokeColor,
          lineWidth,
        },
      })
    );
  }
  function mouseDownHandler(e: MouseEvent) {
    if (canvas) {
      ctx?.beginPath();
      currentX = e.offsetX;
      currentY = e.offsetY;
      saved = canvas.toDataURL();
    }
    mouseDown = true;
  }
  function mouseMoveHandler(e: MouseEvent) {
    if (ctx) {
      ctx.fillStyle = fillColor || "black";
      ctx.strokeStyle = strokeColor || "black";
      ctx.lineWidth = lineWidth || 10;
    }

    if (mouseDown && canvas) {
      const img = new Image();
      img.src = saved;
      img.onload = () => {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawLine({ ctx, y: e.offsetX, x: e.offsetY, currentX, currentY });
      };
    }
  }
};

export function drawLine(args: DrawArgs) {
  const {
    ctx,
    x,
    y,
    currentX = 0,
    currentY = 0,
    fillColor,
    strokeColor,
    lineWidth,
  } = args;
  if (ctx) {
    ctx.fillStyle = fillColor || "black";
    ctx.strokeStyle = strokeColor || "black";
    ctx.lineWidth = lineWidth || 10;
  }

  ctx?.beginPath();
  ctx?.moveTo(currentX, currentY);
  ctx?.lineTo(x, y);
  ctx?.stroke();
}
