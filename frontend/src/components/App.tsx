import Canvas from "./canvas/Canvas";
import style from "../styles/App.module.css";
import SettingBar from "./settingbar/SettingBar";
import MyModal from "./UI/modal";

function App() {
  return (
    <div className={style.App}>
      <MyModal />
      <SettingBar />
      <Canvas height={576} width={996} />
    </div>
  );
}

export default App;
