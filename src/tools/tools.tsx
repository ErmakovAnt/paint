import { brush } from "./brush";
import { cirlce } from "./circle";
import { eraser } from "./eraser";
import { line } from "./line";
import { pencil } from "./pencil";
import { rect } from "./rect";

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
    case "rect":
      rect(canvas, ctx);
      break;
    case "circle":
      cirlce(canvas, ctx);
      break;
    case "line":
      line(canvas, ctx);
      break;
    case "erase":
      eraser(canvas, ctx);
      break;
    default:
      break;
  }
}
