export function line(
  canvas: HTMLCanvasElement | null | undefined,
  ctx: CanvasRenderingContext2D | null | undefined
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
      draw(e.offsetX, e.offsetY);
    }
  }

  function draw(x: number, y: number) {
    const img = new Image();
    img.src = saved;
    img.onload = () => {
      if (canvas) {
        ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
        ctx?.drawImage(img, 0, 0, canvas?.width, canvas?.height);
        ctx?.beginPath();
        ctx?.moveTo(currentX, currentY);
        ctx?.lineTo(x, y);
        ctx?.fill();
        ctx?.stroke();
      }
    };
  }
}
