export function pencil(
  canvas: HTMLCanvasElement | null | undefined,
  ctx: CanvasRenderingContext2D | null | undefined
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
      draw(e.offsetX, e.offsetY);
    }
  }

  function draw(x: number, y: number) {
    ctx?.lineTo(x, y);
    ctx?.stroke();
  }
}
