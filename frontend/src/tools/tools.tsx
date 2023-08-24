import { brush, drawBrush } from "./brush";
import { circle, drawCirlce } from "./circle";
import { eraser, drawEraser } from "./eraser";
import { line, drawLine } from "./line";
import { pencil, drawPencil } from "./pencil";
import { rect, drawRect } from "./rect";

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

interface Figure {
  type: string;
  x: number;
  y: number;
  width?: number | undefined;
  height?: number | undefined;
  radius?: number | undefined;
  currentX?: number | undefined;
  currentY?: number | undefined;
}

interface Message {
  id: string;
  username: string;
  method: string;
  figure: Figure;
}

type ActionsCallback = (
  type: string,
  x: number,
  y: number,
  width?: number | undefined,
  height?: number | undefined,
  radius?: number | undefined,
  currentX?: number | undefined,
  currentY?: number | undefined
) => void;

type Actions = { [action: string]: ActionsCallback };

export const drawHandler = (canvas: HTMLCanvasElement | null, msg: Message) => {
  const figure = msg.figure;
  const ctx = canvas?.getContext("2d");

  const { type, x, y, width, height, radius, currentX, currentY } = figure;

  const actions: Actions = {
    brush: () => drawBrush(ctx, x, y),
    rect: () => width && height && drawRect(ctx, x, y, width, height),
    circle: () => radius && drawCirlce(ctx, x, y, radius),
    eraser: () => drawEraser(ctx, x, y),
    line: () =>
      currentX &&
      currentY &&
      drawLine(ctx, figure.x, figure.y, currentX, currentY),
    pencil: () => drawPencil(ctx, x, y),
    finish: () => ctx?.beginPath(),
  };

  const action = actions[type];

  action(type, x, y, width, height, radius, currentX, currentY);
};
