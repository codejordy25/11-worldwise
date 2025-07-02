import styles from "./AppNav.module.css";
// import {nav} from "./AppNav.module.css";
//className={nav} C'est Pour Lier un objet à un style.

function AppNav() {
  //styles.nav C'est Pour Lier un objet à un style.
  return <nav className={styles.nav}>App navigation</nav>;
}

export default AppNav;
