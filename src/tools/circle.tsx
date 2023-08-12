export function cirlce(
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
      let r = Math.sqrt(width ** 2 + height ** 2);
      draw(startX, startY, r);
    }
  }

  function draw(x: number, y: number, r: number) {
    const img = new Image();
    img.src = saved;
    img.onload = () => {
      if (canvas) {
        let pi = Math.PI;
        ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
        ctx?.drawImage(img, 0, 0, canvas?.width, canvas?.height);
        ctx?.beginPath();
        ctx?.arc(x, y, r, 0, 2 * pi, false);
        ctx?.fill();
        ctx?.stroke();
      }
    };
  }
}
