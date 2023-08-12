import style from "../../styles/ToolBar.module.css";
import SvgSelector from "../svgselector/SvgSelector";

import { tools as toolNames, functions } from "../../utils/toolNames";
import { setTool } from "../../features/toolSlice";
import { tools } from "../../tools/tools";
import { useAppDispatch, useAppSelector } from "../../features/hook";

interface toolBarProps {
  canvas: HTMLCanvasElement | null;
}

const Toolbar = ({ canvas }: toolBarProps) => {
  const dispatch = useAppDispatch();
  const { tool } = useAppSelector((state) => state.tool);

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
        {functions.map((item) => (
          <div
            key={item}
            onClick={() => {
              dispatch(setTool(item));
              tools(item, canvas);
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
