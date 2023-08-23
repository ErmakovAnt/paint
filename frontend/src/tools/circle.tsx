export function circle(
  canvas: HTMLCanvasElement | null | undefined,
  ctx: CanvasRenderingContext2D | null | undefined,
  socket: WebSocket | null | undefined,
  id: string | null | undefined
) {
  let mouseDown: boolean;
  let startX: number;
  let startY: number;
  let saved: string;
  let radius: number;

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
          type: "circle",
          x: startX,
          y: startY,
          radius,
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
    if (mouseDown && canvas) {
      let currentX = e.offsetX;
      let currentY = e.offsetY;
      let width = currentX - startX;
      let height = currentY - startY;
      radius = Math.sqrt(width ** 2 + height ** 2);
      const img = new Image();
      img.src = saved;
      img.onload = () => {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawCirlce(ctx, startX, startY, radius);
      };
    }
  }
}

export function drawCirlce(
  ctx: CanvasRenderingContext2D | null | undefined,
  x: number,
  y: number,
  r: number
) {
  let pi = Math.PI;
  ctx?.beginPath();
  ctx?.arc(x, y, r, 0, 2 * pi, false);
  ctx?.fill();
  ctx?.stroke();
}
