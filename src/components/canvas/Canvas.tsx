import style from "../../styles/Canvas.module.css";
import Toolbar from "../toolbar/ToolBar";
const Canvas = () => {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
      <Toolbar />
      <div className={style.canvas}>
        <canvas width={1000} height={580}></canvas>
      </div>
    </div>
  );
};

export default Canvas;
