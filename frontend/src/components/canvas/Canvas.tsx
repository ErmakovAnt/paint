import { useEffect, useRef, useState } from "react";

import style from "../../styles/Canvas.module.css";
import Toolbar from "../toolbar/ToolBar";
import { tools } from "../../tools/tools";
import { useAppDispatch, useAppSelector } from "../../redux/features/hook";
import { setCanvas, setId, setSocket } from "../../redux/features/canvasSlice";
import { useParams } from "react-router-dom";

interface CanvasProps {
  width: number;
  height: number;
}
const Canvas = ({ width, height }: CanvasProps) => {
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
  }, [tool]);

  useEffect(() => {
    if (userName) {
      const socket: WebSocket = new WebSocket("ws://localhost:5000/");
      dispatch(setSocket(socket));
      dispatch(setId(params.id));
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
          case "conntection":
            console.log(`Пользователь ${msg.username} был подключен`);
            break;
          case "draw":
            drawHandler(msg);
            break;
        }
      };
    }
  }, [userName]);

  function draw(ctx: any, x: number, y: number) {
    ctx?.lineTo(x - 6, y - 6);
    ctx?.stroke();
  }

  function drawRect(
    ctx: CanvasRenderingContext2D | null | undefined,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    ctx?.beginPath();
    ctx?.rect(x, y, w, h);
    ctx?.fill();
    ctx?.stroke();
  }

  function drawCirlce(
    ctx: CanvasRenderingContext2D | null | undefined,
    x: number,
    y: number,
    r: number
  ) {
    let pi = Math.PI;
    ctx?.beginPath();
    ctx?.arc(x, y, r, 0, 2 * pi, false);
    ctx?.fill();
    ctx?.stroke();
  }

  function drawEraser(
    ctx: CanvasRenderingContext2D | null | undefined,
    x: number,
    y: number
  ) {
    ctx?.lineTo(x, y);
    ctx?.stroke();
  }
  function drawLine(
    ctx: CanvasRenderingContext2D | null | undefined,
    x: number,
    y: number,
    currentX: number,
    currentY: number
  ) {
    ctx?.beginPath();
    ctx?.moveTo(currentX, currentY);
    ctx?.lineTo(x, y);
    ctx?.fill();
    ctx?.stroke();
  }

  function drawPencil(
    ctx: CanvasRenderingContext2D | null | undefined,
    x: number,
    y: number
  ) {
    ctx?.lineTo(x, y);
    ctx?.stroke();
  }

  const drawHandler = (msg: {
    id: string;
    username: string;
    method: string;
    figure: {
      type: string;
      x: number;
      y: number;
      width?: number | undefined;
      height?: number | undefined;
      radius?: number | undefined;
      currentX?: number | undefined;
      currentY?: number | undefined;
    };
  }) => {
    const figure = msg.figure;
    const ctx = canvasRef.current?.getContext("2d");
    switch (figure.type) {
      case "brush":
        draw(ctx, figure.x, figure.y);
        break;
      case "rect":
        if (figure.width && figure.height)
          drawRect(ctx, figure.x, figure.y, figure.width, figure.height);
        break;
      case "circle":
        if (figure.radius) drawCirlce(ctx, figure.x, figure.y, figure.radius);
        break;
      case "eraser":
        drawEraser(ctx, figure.x, figure.y);
        break;
      case "line":
        if (figure.currentX && figure.currentY)
          drawLine(ctx, figure.x, figure.y, figure.currentX, figure.currentY);
        break;
      case "pencil":
        drawPencil(ctx, figure.x, figure.y);
        break;
      case "finish":
        ctx?.beginPath();
        break;
    }
  };

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
