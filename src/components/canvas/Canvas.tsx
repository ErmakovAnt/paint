import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import style from "../../styles/Canvas.module.css";
import Toolbar from "../toolbar/ToolBar";
import { setCanvas } from "../../features/canvasSlice";
import { tools } from "../../tools/tools";

interface CanvasProps {
  width: number;
  height: number;
}
const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const canvas = canvasRef.current;
    dispatch(setCanvas(canvasRef.current));
    tools("brush", canvas);
  }, [dispatch]);

  return (
    <div className={style.canvasWrapper}>
      <Toolbar />
      <div className={style.canvas}>
        <canvas ref={canvasRef} width={width} height={height}></canvas>
      </div>
    </div>
  );
};

export default Canvas;
