import styles from "./AppNav.module.css";
function AppNav() {
  //styles.nav C'est Pour Lier un objet à un style.
  return <nav className={styles.nav}>App navigation</nav>;
}

export default AppNav;
