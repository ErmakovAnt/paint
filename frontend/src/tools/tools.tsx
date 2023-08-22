import { brush } from "./brush";
import { circle } from "./circle";
import { eraser } from "./eraser";
import { line } from "./line";
import { pencil } from "./pencil";
import { rect } from "./rect";

interface toolsArgs {
  tool: string;
  canvas: HTMLCanvasElement | null;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
  socket?: WebSocket | null | undefined;
  id?: string | null | undefined;
}
type ActionCallback = (
  canvas: HTMLCanvasElement | null,
  ctx: CanvasRenderingContext2D | null | undefined,
  socket: WebSocket | null | undefined,
  id: string | null | undefined
) => void;

type ActionMap = { [action: string]: ActionCallback };

export function tools(args: toolsArgs) {
  const { tool, canvas, fillColor, strokeColor, lineWidth, socket, id } = args;

  let ctx = canvas?.getContext("2d");

  if (canvas && ctx && (fillColor || strokeColor || lineWidth)) {
    ctx.fillStyle = fillColor || "black";
    ctx.strokeStyle = strokeColor || "black";
    ctx.lineWidth = lineWidth || 10;
  }

  const toolsMap: ActionMap = {
    pencil,
    brush,
    rect,
    circle,
    line,
    eraser,
  };

  const action: ActionCallback = toolsMap[tool];

  action(canvas, ctx, socket, id);
}
