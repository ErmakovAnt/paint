import style from "../../styles/ToolBar.module.css";
import erase from "../../icons/eraser 1.svg";
import brush from "../../icons/paintbrush 1.svg";
import circle from "../../icons/circle.svg";
import line from "../../icons/line.svg";
import rect from "../../icons/rect.svg";
import redo from "../../icons/redo-arrow-symbol 1.svg";
import undo from "../../icons/undo-circular-arrow 1.svg";
import diskette from "../../icons/diskette 1.svg";
const Toolbar = () => {
  return (
    <div className={style.toolbar}>
      <div className={style.toolbar_top}>
        <div>
          <img src={brush} alt="brush" />
        </div>

        <div>
          <img src={line} alt="line" />
        </div>

        <div>
          <img src={rect} alt="rect" />
        </div>

        <div>
          <img src={circle} alt="circle" />
        </div>

        <div>
          <img src={erase} alt="erase" />
        </div>
      </div>
      <div className={style.toolbar_bot}>
        <div>
          <img src={undo} alt="undo" />
        </div>
        <div>
          <img src={redo} alt="redo" />
        </div>
        <div>
          <img src={diskette} alt="diskette" />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
