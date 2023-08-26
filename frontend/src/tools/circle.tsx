import { DrawArgs, ToolType } from "../types/toolsType";

export const circle: ToolType = (args) => {
  const { canvas, ctx, socket, id, fillColor, strokeColor } = args;
  if (canvas) {
    canvas.onmousemove = null;
    canvas.onmousedown = null;
    canvas.onmouseup = null;
  }

  let mouseDown: boolean;
  let x: number;
  let y: number;
  let saved: string;
  let r: number;

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
          type: "circle",
          x,
          y,
          r,
          fillColor,
          strokeColor,
        },
      })
    );
  }
  function mouseDownHandler(e: MouseEvent) {
    if (canvas) {
      ctx?.beginPath();
      x = e.offsetX;
      y = e.offsetY;
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
      let width = currentX - x;
      let height = currentY - y;
      r = Math.sqrt(width ** 2 + height ** 2);
      const img = new Image();
      img.src = saved;
      img.onload = () => {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawCirlce({ ctx, x, y, r });
      };
    }
  }
};

export function drawCirlce(args: DrawArgs) {
  const { ctx, x, y, r = 0, fillColor, strokeColor } = args;
  if (ctx) {
    ctx.fillStyle = fillColor || "black";
    ctx.strokeStyle = strokeColor || "black";
  }
  let pi = Math.PI;
  ctx?.beginPath();
  ctx?.arc(x, y, r, 0, 2 * pi, false);
  ctx?.fill();
  ctx?.stroke();
}
