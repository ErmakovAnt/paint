export function brush(
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
          },
        })
      );
    }
  }
}

export function drawBrush(ctx: any, x: number, y: number) {
  ctx?.lineTo(x - 6, y - 6);
  ctx?.stroke();
}
