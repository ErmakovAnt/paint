export function pencil(
  canvas: HTMLCanvasElement | null | undefined,
  ctx: CanvasRenderingContext2D | null | undefined,
  socket: WebSocket | null | undefined,
  id: string | null | undefined
) {
  let mouseDown: boolean;

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
      ctx?.beginPath();
      ctx?.moveTo(e.offsetX, e.offsetY);
      ctx.lineWidth = 1;
    }
    mouseDown = true;
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
          },
        })
      );
    }
  }
}

export function drawPencil(
  ctx: CanvasRenderingContext2D | null | undefined,
  x: number,
  y: number
) {
  ctx?.lineTo(x, y);
  ctx?.stroke();
}
