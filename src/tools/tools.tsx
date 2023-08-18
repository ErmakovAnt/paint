import { brush } from "./brush";
import { cirlce } from "./circle";
import { eraser } from "./eraser";
import { line } from "./line";
import { pencil } from "./pencil";
import { rect } from "./rect";

interface toolsArgs {
  tool: string | null;
  canvas: HTMLCanvasElement | null;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
}

export function tools(args: toolsArgs) {
  const { tool, canvas, fillColor, strokeColor, lineWidth } = args;
  let ctx = canvas?.getContext("2d");

  if (canvas && ctx && (fillColor || strokeColor || lineWidth)) {
    ctx.fillStyle = fillColor || "black";
    ctx.strokeStyle = strokeColor || "black";
    ctx.lineWidth = lineWidth || 10;
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
