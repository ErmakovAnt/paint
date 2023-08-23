export function line(
  canvas: HTMLCanvasElement | null | undefined,
  ctx: CanvasRenderingContext2D | null | undefined,
  socket: WebSocket | null | undefined,
  id: string | null | undefined
) {
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
    if (mouseDown && canvas) {
      const img = new Image();
      img.src = saved;
      img.onload = () => {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawLine(ctx, e.offsetX, e.offsetY, currentX, currentY);
      };
    }
  }
}

export function drawLine(
  ctx: CanvasRenderingContext2D | null | undefined,
  x: number,
  y: number,
  currentX: number,
  currentY: number
) {
  ctx?.beginPath();
  ctx?.moveTo(currentX, currentY);
  ctx?.lineTo(x, y);
  ctx?.stroke();
}
