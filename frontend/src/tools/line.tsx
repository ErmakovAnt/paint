export function line(
  canvas: HTMLCanvasElement | null | undefined,
  ctx: CanvasRenderingContext2D | null | undefined,
  socket: WebSocket | null | undefined,
  id: string | null | undefined
) {
  let mouseDown: boolean;
  let currentX: number;
  let currentY: number;

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
        },
      })
    );
  }
  function mouseDownHandler(e: MouseEvent) {
    if (canvas) {
      ctx?.beginPath();
      currentX = e.offsetX;
      currentY = e.offsetY;
    }
    mouseDown = true;
  }
  function mouseMoveHandler(e: MouseEvent) {
    // if (mouseDown && canvas) {
    //   draw(e.offsetX, e.offsetY);
    // }
  }
}
