import { useEffect, useRef, useState } from "react";

import style from "../../styles/Canvas.module.css";
import Toolbar from "../toolbar/ToolBar";
import { tools } from "../../tools/tools";
import { useAppDispatch, useAppSelector } from "../../redux/features/hook";
import { setCanvas } from "../../redux/features/canvasSlice";

interface CanvasProps {
  width: number;
  height: number;
}
const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useAppDispatch();
  const { tool } = useAppSelector((state) => state.tool);
  const [undoArr, setUndoArr] = useState<string[]>([]);
  const [redoArr, setRedoArr] = useState<string[]>([]);

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current));
    tools({ tool, canvas: canvasRef.current });
  }, [tool]);

  const mouseDownHandler = () => {
    if (canvasRef.current) {
      setUndoArr([...undoArr, canvasRef?.current?.toDataURL()]);
    }
  };

  return (
    <div className={style.canvasWrapper}>
      <Toolbar
        undoArr={undoArr}
        redoArr={redoArr}
        setUndoArr={setUndoArr}
        setRedoArr={setRedoArr}
      />
      <div className={style.canvas}>
        <canvas
          onMouseDown={mouseDownHandler}
          ref={canvasRef}
          width={width}
          height={height}
        ></canvas>
      </div>
    </div>
  );
};

export default Canvas;
