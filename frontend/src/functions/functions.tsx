import {
  functionsArgs,
  ActionMap,
  FunctionHandler,
  FuncsMap,
} from "../types/functionsType";
import { handleRedo, redoHandler } from "./redo";
import { handleUndo, undoHandler } from "./undo";

export const functions = (args: functionsArgs) => {
  const { msg, setUndoArr, setRedoArr, canvas } = args;
  const { undoArr, redoArr, type } = msg.function;
  const items: ActionMap = {
    undo: handleUndo,
    redo: handleRedo,
  };

  const action = items[type];
  if (canvas)
    action({
      undoArr: undoArr,
      redoArr: redoArr,
      setUndoArr,
      setRedoArr,
      canvas,
    });
};

export const functionsHandler: FunctionHandler = (args) => {
  const { funcName, socket, id, undoArr, redoArr } = args;

  const funcsMap: FuncsMap = {
    undo: undoHandler,
    redo: redoHandler,
  };

  const action = funcsMap[funcName];
  action({ socket, id, undoArr, redoArr });
};
