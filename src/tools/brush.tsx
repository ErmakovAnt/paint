export function brush(
  canvas: HTMLCanvasElement | null | undefined,
  ctx: CanvasRenderingContext2D | null | undefined
) {
  let mouseDown: boolean;
  if (canvas || canvas) {
    canvas.onmousedown = null;
    canvas.onmousemove = null;
    canvas.onmouseup = null;
  }
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
    if (canvas) {
      ctx?.beginPath();
      ctx?.moveTo(e.offsetX, e.offsetY);
    }
    mouseDown = true;
  }
  function mouseMoveHandler(e: MouseEvent) {
    if (mouseDown && canvas) {
      draw(e.offsetX, e.offsetY);
    }
  }

  function draw(x: number, y: number) {
    ctx?.lineTo(x - 6, y - 6);
    ctx?.stroke();
  }
}
