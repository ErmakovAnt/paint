import style from "../../styles/ToolBar.module.css";
import SvgSelector from "../svgselector/SvgSelector";

import { tools, functions } from "../../utils/toolNames";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTool } from "../../features/toolSlice";

const Toolbar = () => {
  const [activeIcon, setActiveIcon] = useState<string>("brush");
  const dispatch = useDispatch();

  return (
    <div className={style.toolbar}>
      <div className={style.toolbar_top}>
        {tools.map((item) => (
          <div
            className={activeIcon === item ? style.activeSvg : style.svg}
            key={item}
            onClick={() => {
              dispatch(setTool(item));
              setActiveIcon(item);
            }}
          >
            <SvgSelector id={item} />
          </div>
        ))}
      </div>
      <div className={style.toolbar_bot}>
        {functions.map((item) => (
          <div
            key={item}
            onClick={() => {
              dispatch(setTool(item));
              setActiveIcon(item);
            }}
            className={activeIcon === item ? style.activeSvg : style.svg}
          >
            <SvgSelector id={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
