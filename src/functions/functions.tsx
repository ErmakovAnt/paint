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

export const functions = (args: functionsArgs) => {
  const { item, undoArr, redoArr, setUndoArr, setRedoArr, canvas } = args;

  switch (item) {
    case "undo":
      handleUndo({ undoArr, redoArr, setUndoArr, setRedoArr, canvas });
      break;
    case "redo":
      handleRedo({ undoArr, redoArr, setUndoArr, setRedoArr, canvas });
      break;
  }
};
