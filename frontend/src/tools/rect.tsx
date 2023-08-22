export function rect(
  canvas: HTMLCanvasElement | null | undefined,
  ctx: CanvasRenderingContext2D | null | undefined,
  socket: WebSocket | null | undefined,
  id: string | null | undefined
) {
  let mouseDown: boolean;
  let startX: number;
  let startY: number;
  let width: number;
  let height: number;

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
          type: "rect",
          x: startX,
          y: startY,
          width,
          height,
        },
      })
    );
  }
  function mouseDownHandler(e: MouseEvent) {
    if (canvas) {
      ctx?.beginPath();
      startX = e.offsetX;
      startY = e.offsetY;
    }
    mouseDown = true;
  }
  function mouseMoveHandler(e: MouseEvent) {
    if (mouseDown && canvas) {
      let currentX = e.offsetX;
      let currentY = e.offsetY;
      width = currentX - startX;
      height = currentY - startY;
    }
  }
}
