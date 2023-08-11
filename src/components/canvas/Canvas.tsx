import { useEffect, useRef } from "react";

import style from "../../styles/Canvas.module.css";
import Toolbar from "../toolbar/ToolBar";
import { setCanvas } from "../../features/canvasSlice";
import { tools } from "../../tools/tools";
import { useAppDispatch, useAppSelector } from "../../features/hook";

interface CanvasProps {
  width: number;
  height: number;
}
const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useAppDispatch();
  const { tool } = useAppSelector((state) => state.tool);

  useEffect(() => {
    // dispatch(setCanvas(canvasRef.current));
    tools(tool, canvasRef.current);
  }, [tools, tool]);

  return (
    <div className={style.canvasWrapper}>
      <Toolbar canvas={canvasRef.current} />
      <div className={style.canvas}>
        <canvas ref={canvasRef} width={width} height={height}></canvas>
      </div>
    </div>
  );
};

export default Canvas;
