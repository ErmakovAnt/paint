import { UndoAndRedoHandler, UndoandRedoArgs } from "../types/functionsType";

export const handleRedo = (args: UndoandRedoArgs) => {
  const { undoArr, redoArr, setUndoArr, setRedoArr, canvas } = args;
  const lastRedo = redoArr[redoArr.length - 1];
  if (lastRedo) {
    setRedoArr(redoArr.slice(0, -1));
    if (canvas) setUndoArr([...undoArr, canvas.toDataURL()]);
    let img = new Image();
    img.src = lastRedo;
    img.onload = () => {
      if (canvas) {
        let ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };
  }
};

export const redoHandler: UndoAndRedoHandler = (args) => {
  const { socket, id, undoArr, redoArr } = args;

  socket?.send(
    JSON.stringify({
      method: "func",
      id,
      function: {
        type: "redo",
        undoArr,
        redoArr,
      },
    })
  );
};
