export function brush(canvas: HTMLCanvasElement | null) {
  let ctx = canvas?.getContext("2d");
  if (canvas) {
    canvas.onclick = function () {};
    canvas.onmousedown = function (e: MouseEvent) {
      canvas.onmousemove = function (e: MouseEvent) {
        let x = e.offsetX;
        let y = e.offsetY;
        ctx?.fillRect(x, y, 10, 10);
      };
      canvas.onmouseup = function () {
        canvas.onmousemove = null;
      };
    };
  }
}
