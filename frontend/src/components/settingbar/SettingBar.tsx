import { ChangeEvent, useEffect, useState } from "react";
import { tools } from "../../tools/tools";
import { useAppSelector } from "../../redux/features/hook";

import style from "../../styles/SettingBar.module.css";

const SettingBar = () => {
  const [fillColor, setFillColor] = useState<string>("black");
  const [strokeColor, setStrokeColor] = useState<string>("black");
  const [lineWidth, setLineWidth] = useState<number>(10);

  const {
    canvas: { canvas, socket, id },
    tool: { tool },
  } = useAppSelector((state) => state);

  useEffect(() => {
    tools({ tool, canvas, fillColor, strokeColor, lineWidth, socket, id });
  }, [tool, canvas, fillColor, strokeColor, lineWidth, socket, id]);

  return (
    <div className={style.settingbar}>
      <label className={style.label} htmlFor="fill-color">
        Fill Color:
      </label>
      <input
        id="fill-color"
        type="color"
        value={fillColor}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setFillColor(e.target.value);
          setStrokeColor(e.target.value);
        }}
      />
      <label className={style.label} htmlFor="stroke-color">
        Stroke color:
      </label>
      <input
        id="stroke-color"
        type="color"
        value={strokeColor}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setStrokeColor(e.target.value);
        }}
      />
      <label className={style.label} htmlFor="lineWidth">
        Line width:
      </label>
      <input
        id="lineWidth"
        type="range"
        value={lineWidth}
        min="1"
        max="50"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setLineWidth(Number(e.target.value));
        }}
      ></input>
    </div>
  );
};

export default SettingBar;
