export function rect(
  canvas: HTMLCanvasElement | null,
  ctx: CanvasRenderingContext2D | null | undefined
) {
  let mouseDown: boolean;
  let startX: number;
  let startY: number;
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
      draw(startX, startY, width, height);
    }
  }

  function draw(x: number, y: number, w: number, h: number) {
    const img = new Image();
    img.src = saved;
    img.onload = () => {
      if (canvas) {
        ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
        ctx?.drawImage(img, 0, 0, canvas?.width, canvas?.height);
        ctx?.beginPath();
        ctx?.rect(x, y, w, h);
        ctx?.fill();
        ctx?.stroke();
      }
    };
  }
}
