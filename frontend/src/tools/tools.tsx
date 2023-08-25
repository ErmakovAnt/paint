import {
  ActionCallback,
  ActionMap,
  Actions,
  Message,
  toolsArgs,
} from "../types/toolsType";
import { brush, drawBrush } from "./brush";
import { circle, drawCirlce } from "./circle";
import { eraser, drawEraser } from "./eraser";
import { line, drawLine } from "./line";
import { pencil, drawPencil } from "./pencil";
import { rect, drawRect } from "./rect";

export function tools(args: toolsArgs) {
  const { tool, canvas, fillColor, strokeColor, lineWidth, socket, id } = args;

  let ctx = canvas?.getContext("2d");
  const toolsMap: ActionMap = {
    pencil,
    brush,
    rect,
    circle,
    line,
    eraser,
  };

  const action: ActionCallback = toolsMap[tool];

  action({ canvas, ctx, socket, id, fillColor, strokeColor, lineWidth });
}

export const drawHandler = (canvas: HTMLCanvasElement | null, msg: Message) => {
  const figure = msg.figure;
  const ctx = canvas?.getContext("2d");

  const {
    type,
    x,
    y,
    width,
    height,
    r,
    currentX,
    currentY,
    fillColor,
    strokeColor,
    lineWidth,
  } = figure;

  const actions: Actions = {
    brush: () => drawBrush({ ctx, x, y, fillColor, strokeColor, lineWidth }),
    rect: () =>
      width &&
      height &&
      drawRect({ ctx, x, y, w: width, h: height, fillColor, strokeColor }),
    circle: () => r && drawCirlce({ ctx, x, y, r, fillColor, strokeColor }),
    eraser: () => drawEraser({ ctx, x, y, fillColor, strokeColor, lineWidth }),
    line: () =>
      currentX &&
      currentY &&
      drawLine({
        ctx,
        x: figure.x,
        y: figure.y,
        currentX,
        currentY,
        fillColor,
        strokeColor,
        lineWidth,
      }),
    pencil: () => drawPencil({ ctx, x, y, fillColor, strokeColor }),
    finish: () => ctx?.beginPath(),
  };

  const action = actions[type];

  action({ type, x, y, width, height, r, currentX, currentY });
};
