//Il s'agit de la page de mise en page principale de l'applicatio
import Map from "../components/Map";
import Sidbar from "../components/Sidbar";
import User from "../components/User";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidbar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
