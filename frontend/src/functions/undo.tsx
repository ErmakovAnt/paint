import { UndoAndRedoHandler, UndoandRedoArgs } from "../types/functionsType";

export const handleUndo = (args: UndoandRedoArgs) => {
  const { undoArr, redoArr, setUndoArr, setRedoArr, canvas } = args;
  const lastUndo = undoArr[undoArr.length - 1];
  if (lastUndo) {
    setUndoArr(undoArr.slice(0, -1));
    if (canvas) setRedoArr([...redoArr, canvas.toDataURL()]);
    let img = new Image();
    img.src = lastUndo;
    img.onload = () => {
      if (canvas) {
        let ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };
  }
};

export const undoHandler: UndoAndRedoHandler = (args) => {
  const { socket, id, undoArr, redoArr } = args;

  socket?.send(
    JSON.stringify({
      method: "func",
      id,
      function: {
        type: "undo",
        undoArr,
        redoArr,
      },
    })
  );
};
