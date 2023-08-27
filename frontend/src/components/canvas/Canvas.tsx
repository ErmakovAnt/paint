import { useEffect, useRef, useState } from "react";
import { drawHandler, tools } from "../../tools/tools";
import { useAppDispatch, useAppSelector } from "../../redux/features/hook";
import { setCanvas, setId, setSocket } from "../../redux/features/canvasSlice";
import { useParams } from "react-router-dom";

import style from "../../styles/Canvas.module.css";
import Toolbar from "../toolbar/ToolBar";
import { functions } from "../../functions/functions";
import { socketActions } from "../../utils/socketAction";
import axios from "axios";

interface CanvasProps {
  width: number;
  height: number;
}
const Canvas = (props: CanvasProps) => {
  const { width, height } = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useAppDispatch();
  const {
    tool: { tool },
    canvas: { userName },
  } = useAppSelector((state) => state);
  const [undoArr, setUndoArr] = useState<string[]>([]);
  const [redoArr, setRedoArr] = useState<string[]>([]);
  const params = useParams();

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current));
    let ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.fillStyle = "#fff";
      ctx?.fillRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);
    }

    axios.get(`http://localhost:5000/image?id=${params.id}`).then((res) => {
      const img = new Image();
      img.src = res.data;
      console.log(res.data);
      img.onload = () => {
        if (canvasRef.current) {
          ctx?.fillRect(
            0,
            0,
            canvasRef.current?.width,
            canvasRef.current?.height
          );
          ctx?.drawImage(
            img,
            0,
            0,
            canvasRef.current?.width,
            canvasRef.current?.height
          );
          ctx?.stroke();
        }
      };
    });
  }, []);

  useEffect(() => {
    if (userName) {
      const socket: WebSocket = new WebSocket("ws://localhost:5000/");
      dispatch(setSocket(socket));
      dispatch(setId(params.id));
      tools({ tool, canvas: canvasRef.current });

      socketActions({
        socket,
        id: params.id,
        userName,
        canvas: canvasRef.current,
        drawHandler,
        functions,
        undoArr,
        redoArr,
        setUndoArr,
        setRedoArr,
      });
    }
  }, [userName, tool]);

  const mouseDownHandler = () => {
    if (canvasRef.current) {
      setUndoArr([...undoArr, canvasRef?.current?.toDataURL()]);
    }
    axios
      .post(`http://localhost:5000/image?id=${params.id}`, {
        img: canvasRef.current?.toDataURL(),
      })
      .then((res) => console.log(res));
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
