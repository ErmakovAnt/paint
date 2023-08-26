interface A {
  canvas: HTMLCanvasElement | null | undefined;
  ctx: CanvasRenderingContext2D | null | undefined;
  socket: WebSocket | null | undefined;
  id: string | null | undefined;
  fillColor?: string | undefined;
  strokeColor?: string | undefined;
  lineWidth?: number | undefined;
}

export type ToolType = (args: A) => void;

export interface toolsArgs {
  tool: string;
  canvas: HTMLCanvasElement | null;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
  socket?: WebSocket | null | undefined;
  id?: string | null | undefined;
}
export type ActionCallback = (args: A) => void;

export type ToolsMap = { [action: string]: ActionCallback };

export interface Message {
  id: string;
  username: string;
  method: string;
  figure: Figure;
}

interface Figure {
  ctx: CanvasRenderingContext2D | null | undefined;
  type: string;
  x: number;
  y: number;
  w?: number | undefined;
  h?: number | undefined;
  r?: number | undefined;
  currentX?: number | undefined;
  currentY?: number | undefined;
  fillColor?: string | undefined;
  strokeColor?: string | undefined;
  lineWidth?: number | undefined;
}

export type ActionsCallback = (args: Figure) => void;

export type DrawFunctionsMap = { [action: string]: ActionsCallback };

export type DrawArgs = {
  ctx: CanvasRenderingContext2D | null | undefined;
  x: number;
  y: number;
  w?: number;
  h?: number;
  r?: number | undefined;
  currentX?: number | undefined;
  currentY?: number | undefined;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
};
