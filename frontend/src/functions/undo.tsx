interface undoArgs {
  undoArr: string[] | any[];
  redoArr: string[] | any[];
  setUndoArr: (undoArr: string[]) => void;
  setRedoArr: (redoArr: string[]) => void;
  canvas: HTMLCanvasElement | null | undefined;
}

export const handleUndo = (args: undoArgs) => {
  const { undoArr, redoArr, setUndoArr, setRedoArr, canvas } = args;
  const lastUndo = undoArr[undoArr.length - 1];
  if (lastUndo) {
    setUndoArr(undoArr.slice(0, -1));
    if (canvas) setRedoArr([...redoArr, canvas?.toDataURL()]);
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
