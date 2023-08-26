import { useEffect, useRef, useState } from "react";
import { drawHandler, tools } from "../../tools/tools";
import { useAppDispatch, useAppSelector } from "../../redux/features/hook";
import { setCanvas, setId, setSocket } from "../../redux/features/canvasSlice";
import { useParams } from "react-router-dom";

import style from "../../styles/Canvas.module.css";
import Toolbar from "../toolbar/ToolBar";

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
    if (userName) {
      const socket: WebSocket = new WebSocket("ws://localhost:5000/");
      dispatch(setSocket(socket));
      dispatch(setId(params.id));
      dispatch(setCanvas(canvasRef.current));
      tools({ tool, canvas: canvasRef.current });

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: params.id,
            username: userName,
            method: "connection",
          })
        );
      };
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method) {
          case "connection":
            console.log(`Пользователь ${msg.username} был подключен`);
            break;
          case "draw":
            drawHandler(canvasRef.current, msg);
            break;
        }
      };
    }
  }, [userName, tool]);

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
