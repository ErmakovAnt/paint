import { handleRedo } from "./redo";
import { handleUndo } from "./undo";

interface functionsArgs {
  item: string;
  undoArr: string[] | any[];
  redoArr: string[] | any[];
  setUndoArr: (undoArr: string[]) => void;
  setRedoArr: (redoArr: string[]) => void;
  canvas: HTMLCanvasElement | null | undefined;
}
type ActionCallback = (args: {
  undoArr: string[] | any[];
  redoArr: string[] | any[];
  setUndoArr: (undoArr: string[]) => void;
  setRedoArr: (redoArr: string[]) => void;
  canvas: HTMLCanvasElement;
}) => void;

type ActionMap = {
  [action: string]: ActionCallback;
};

export const functions = (args: functionsArgs) => {
  const { item, undoArr, redoArr, setUndoArr, setRedoArr, canvas } = args;
  const items: ActionMap = {
    undo: handleUndo,
    redo: handleRedo,
  };
  const action = items[item];
  if (canvas) action({ undoArr, redoArr, setUndoArr, setRedoArr, canvas });
};
