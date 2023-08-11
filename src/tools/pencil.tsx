export function pencil(
  canvas: HTMLCanvasElement | null,
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
    if (canvas) {
      ctx?.beginPath();
      ctx?.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
    }
    mouseDown = true;
  }
  function mouseMoveHandler(e: MouseEvent) {
    if (mouseDown && canvas) {
      draw(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
    }
  }

  function draw(x: number, y: number) {
    ctx?.lineTo(x, y);
    ctx?.stroke();
  }
}
