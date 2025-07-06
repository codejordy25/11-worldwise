//Il s'agit de la page de mise en page principale de l'application

import AppNav from "../components/AppNav";

import Map from "../components/Map";

import styles from "./AppLayout.module.css";
import Sidbar from "../components/Sidbar";
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidbar />
      <Map />
    </div>
  );
}

export default AppLayout;
