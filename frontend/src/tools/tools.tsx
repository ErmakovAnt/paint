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

export const drawHandler = (
  canvas: HTMLCanvasElement | null,
  msg: {
    id: string;
    username: string;
    method: string;
    figure: {
      type: string;
      x: number;
      y: number;
      width?: number | undefined;
      height?: number | undefined;
      radius?: number | undefined;
      currentX?: number | undefined;
      currentY?: number | undefined;
    };
  }
) => {
  const figure = msg.figure;
  const ctx = canvas?.getContext("2d");
  switch (figure.type) {
    case "brush":
      drawBrush(ctx, figure.x, figure.y);
      break;
    case "rect":
      if (figure.width && figure.height)
        drawRect(ctx, figure.x, figure.y, figure.width, figure.height);
      break;
    case "circle":
      if (figure.radius) drawCirlce(ctx, figure.x, figure.y, figure.radius);
      break;
    case "eraser":
      drawEraser(ctx, figure.x, figure.y);
      break;
    case "line":
      if (figure.currentX && figure.currentY)
        drawLine(ctx, figure.x, figure.y, figure.currentX, figure.currentY);
      break;
    case "pencil":
      drawPencil(ctx, figure.x, figure.y);
      break;
    case "finish":
      ctx?.beginPath();
      break;
  }
};
