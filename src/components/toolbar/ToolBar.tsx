import style from "../../styles/ToolBar.module.css";
import SvgSelector from "../svgselector/SvgSelector";

import {
  tools as toolNames,
  functions as functionNames,
} from "../../utils/toolNames";
import { setTool } from "../../features/toolSlice";
import { tools } from "../../tools/tools";
import { useAppDispatch, useAppSelector } from "../../features/hook";

interface Props {
  undoArr: string[] | any[];
  redoArr: string[] | any[];
  setUndoArr: (undoArr: string[]) => void;
  setRedoArr: (redoArr: string[]) => void;
}
const Toolbar = ({ undoArr, redoArr, setUndoArr, setRedoArr }: Props) => {
  const dispatch = useAppDispatch();
  const {
    tool: { tool },
    canvas: { canvas },
  } = useAppSelector((state) => state);

  function handleAddToRedo(dataUrl: string) {
    if (dataUrl) {
      setRedoArr([...redoArr, dataUrl]);
    }
  }

  function handleAddToUndo(dataUrl: string) {
    if (dataUrl) {
      setUndoArr([...undoArr, dataUrl]);
    }
  }
  const handleUndo = () => {
    const lastUndo = undoArr[undoArr.length - 1];
    if (lastUndo) {
      setUndoArr(undoArr.slice(0, -1));
      if (canvas) handleAddToRedo(canvas?.toDataURL());
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

  const handleRedo = () => {
    const lastRedo = redoArr[redoArr.length - 1];
    if (lastRedo) {
      setRedoArr(redoArr.slice(0, -1));
      if (canvas) handleAddToUndo(canvas?.toDataURL());
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

  return (
    <div className={style.toolbar}>
      <div className={style.toolbar_top}>
        {toolNames.map((item) => (
          <div
            className={tool === item ? style.activeSvg : style.svg}
            key={item}
            onClick={() => {
              dispatch(setTool(item));
              tools(item, canvas);
            }}
          >
            <SvgSelector tool={item} />
          </div>
        ))}
      </div>
      <div className={style.toolbar_bot}>
        {functionNames.map((item) => (
          <div
            key={item}
            onClick={() => {
              if (item === "undo") {
                handleUndo();
              } else {
                handleRedo();
              }
            }}
            className={tool === item ? style.activeSvg : style.svg}
          >
            <SvgSelector tool={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
