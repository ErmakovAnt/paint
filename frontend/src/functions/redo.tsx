interface redoArgs {
  undoArr: string[] | any[];
  redoArr: string[] | any[];
  setUndoArr: (undoArr: string[]) => void;
  setRedoArr: (redoArr: string[]) => void;
  canvas: HTMLCanvasElement | null | undefined;
}

export const handleRedo = (args: redoArgs) => {
  const { undoArr, redoArr, setUndoArr, setRedoArr, canvas } = args;
  const lastRedo = redoArr[redoArr.length - 1];
  if (lastRedo) {
    setRedoArr(redoArr.slice(0, -1));
    if (canvas) setUndoArr([...undoArr, canvas?.toDataURL()]);
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
