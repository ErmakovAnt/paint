import {
  ToolsMap,
  DrawFunctionsMap,
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
  const toolsMap: ToolsMap = {
    pencil,
    brush,
    rect,
    circle,
    line,
    eraser,
  };

  const action = toolsMap[tool];

  action({ canvas, ctx, socket, id, fillColor, strokeColor, lineWidth });
}

export const drawHandler = (canvas: HTMLCanvasElement | null, msg: Message) => {
  const figure = msg.figure;
  const ctx = canvas?.getContext("2d");

  const {
    type,
    x,
    y,
    w,
    h,
    r,
    currentX,
    currentY,
    fillColor,
    strokeColor,
    lineWidth,
  } = figure;

  const drawFunctionsMap: DrawFunctionsMap = {
    brush: drawBrush,
    rect: drawRect,
    circle: drawCirlce,
    eraser: drawEraser,
    line: drawLine,
    pencil: drawPencil,
    finish: () => ctx?.beginPath(),
  };

  const action = drawFunctionsMap[type];

  action({
    ctx,
    type,
    x,
    y,
    w,
    h,
    r,
    currentX,
    currentY,
    fillColor,
    strokeColor,
    lineWidth,
  });
};
