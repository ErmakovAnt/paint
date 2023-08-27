import {
  functionsArgs,
  ActionMap,
  FunctionHandler,
  FuncsMap,
} from "../types/functionsType";
import { handleRedo, redoHandler } from "./redo";
import { saveImg } from "./saveImg";
import { handleUndo, undoHandler } from "./undo";

export const functions = (args: functionsArgs) => {
  const { msg, id, setUndoArr, setRedoArr, canvas } = args;
  const { undoArr, redoArr, type } = msg.function;
  const items: ActionMap = {
    undo: handleUndo,
    redo: handleRedo,
  };

  const action = items[type];
  if (canvas)
    action({
      id,
      undoArr: undoArr,
      redoArr: redoArr,
      setUndoArr,
      setRedoArr,
      canvas,
    });
};

export const functionsHandler: FunctionHandler = (args) => {
  const { funcName, socket, id, undoArr, redoArr, canvas } = args;

  const funcsMap: FuncsMap = {
    undo: undoHandler,
    redo: redoHandler,
    save: saveImg,
  };

  const action = funcsMap[funcName];
  action({ socket, id, undoArr, redoArr, canvas });
};
