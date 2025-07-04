//Il s'agit de la page de mise en page principale de l'application

import AppNav from "../components/AppNav";
import SideBar from "../components/SideBar";
import Map from "../components/Map";

import styles from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
