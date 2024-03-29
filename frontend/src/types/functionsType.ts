interface Msg {
  method: string;
  id: string;
  function: {
    type: string;
    undoArr: string[] | any[];
    redoArr: string[] | any[];
  };
}

export interface functionsArgs {
  msg: Msg;
  id: string | undefined;
  undoArr: string[] | any[];
  redoArr: string[] | any[];
  setUndoArr: (undoArr: string[]) => void;
  setRedoArr: (redoArr: string[]) => void;
  canvas: HTMLCanvasElement | null | undefined;
}
export type ActionCallback = (args: {
  undoArr: string[] | any[];
  redoArr: string[] | any[];
  setUndoArr: (undoArr: string[]) => void;
  setRedoArr: (redoArr: string[]) => void;
  canvas: HTMLCanvasElement;
  id: string | undefined;
}) => void;

export type ActionMap = {
  [action: string]: ActionCallback;
};

export interface UndoandRedoArgs {
  undoArr: string[];
  redoArr: string[];
  setUndoArr: (undoArr: string[]) => void;
  setRedoArr: (redoArr: string[]) => void;
  canvas: HTMLCanvasElement | null | undefined;
  id: string | undefined;
}

type UndoAndRedoHandlerArgs = {
  socket: WebSocket | null | undefined;
  id: string | null | undefined;
  undoArr: string[];
  redoArr: string[];
  canvas?: HTMLCanvasElement | null | undefined;
};

export type UndoAndRedoHandler = (args: UndoAndRedoHandlerArgs) => void;

type FunctionHandlerArgs = {
  funcName: string;
  canvas: HTMLCanvasElement | null | undefined;
  socket: WebSocket | null | undefined;
  id: string | null | undefined;
  undoArr: string[];
  redoArr: string[];
};

export type FunctionHandler = (args: FunctionHandlerArgs) => void;

export type FuncsCallback = (args: {
  socket: WebSocket | null | undefined;
  id: string | null | undefined;
  undoArr: string[];
  redoArr: string[];
  canvas?: HTMLCanvasElement | null | undefined;
}) => void;

export interface FuncsMap {
  [action: string]: FuncsCallback;
}
