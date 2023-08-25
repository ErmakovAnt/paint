import { DrawArgs, ToolType } from "../types/toolsType";

export const rect: ToolType = (args) => {
  const { canvas, ctx, socket, id, fillColor, strokeColor } = args;

  let mouseDown: boolean;
  let startX: number;
  let startY: number;
  let width: number;
  let height: number;
  let saved: string;

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
    socket?.send(
      JSON.stringify({
        method: "draw",
        id,
        figure: {
          type: "rect",
          x: startX,
          y: startY,
          width,
          height,
          fillColor,
          strokeColor,
        },
      })
    );
  }
  function mouseDownHandler(e: MouseEvent) {
    if (canvas) {
      ctx?.beginPath();
      startX = e.offsetX;
      startY = e.offsetY;
      saved = canvas.toDataURL();
    }
    mouseDown = true;
  }
  function mouseMoveHandler(e: MouseEvent) {
    if (ctx) {
      ctx.fillStyle = fillColor || "black";
      ctx.strokeStyle = strokeColor || "black";
    }

    if (mouseDown && canvas) {
      let currentX = e.offsetX;
      let currentY = e.offsetY;
      width = currentX - startX;
      height = currentY - startY;

      const img = new Image();
      img.src = saved;
      img.onload = () => {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawRect({ ctx, x: startX, y: startY, w: width, h: height });
      };
    }
  }
};

export const drawRect = (args: DrawArgs) => {
  const { ctx, x, y, w = 0, h = 0, fillColor, strokeColor } = args;
  if (ctx && (fillColor || strokeColor)) {
    ctx.fillStyle = fillColor || "black";
    ctx.strokeStyle = strokeColor || "black";
  }

  ctx?.beginPath();
  ctx?.rect(x, y, w, h);
  ctx?.fill();
  ctx?.stroke();
};
