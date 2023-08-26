import style from "../../styles/ToolBar.module.css";
import SvgSelector from "../svgselector/SvgSelector";

import {
  tools as toolNames,
  functions as functionNames,
} from "../../utils/toolNames";
import { tools } from "../../tools/tools";
import { functions } from "../../functions/functions";
import { useAppDispatch, useAppSelector } from "../../redux/features/hook";
import { setTool } from "../../redux/features/toolSlice";

interface Props {
  undoArr: string[] | any[];
  redoArr: string[] | any[];
  setUndoArr: (undoArr: string[]) => void;
  setRedoArr: (redoArr: string[]) => void;
}
const Toolbar = (props: Props) => {
  const { undoArr, redoArr, setUndoArr, setRedoArr } = props;
  const dispatch = useAppDispatch();
  const {
    tool: { tool },
    canvas: { canvas },
  } = useAppSelector((state) => state);

  function handleClick(item: string) {
    functions({
      item,
      undoArr,
      redoArr,
      setUndoArr,
      setRedoArr,
      canvas,
    });
  }

  return (
    <div className={style.toolbar}>
      <div className={style.toolbar_top}>
        {toolNames.map((item) => (
          <div
            className={tool === item ? style.activeSvg : style.svg}
            key={item}
            onClick={() => {
              dispatch(setTool(item));
              tools({ tool: item, canvas });
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
              handleClick(item);
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
