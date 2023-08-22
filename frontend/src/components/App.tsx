import Canvas from "./canvas/Canvas";
import style from "../styles/App.module.css";
import SettingBar from "./settingbar/SettingBar";
import MyModal from "./UI/modal";

function App() {
  return (
    <div className={style.App}>
      <MyModal />
      <SettingBar />
      <Canvas height={577} width={998} />
    </div>
  );
}

export default App;
