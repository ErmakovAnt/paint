import { brush } from "./brush";
import { pencil } from "./pencil";

export function tools(tool: string | null, canvas: HTMLCanvasElement | null) {
  let ctx = canvas?.getContext("2d");

  if (canvas) {
    canvas.onmousedown = null;
    canvas.onmousemove = null;
    canvas.onmouseup = null;
  }

  switch (tool) {
    case "pencil":
      pencil(canvas, ctx);
      break;
    case "brush":
      brush(canvas, ctx);
      break;
    default:
      break;
  }
}
