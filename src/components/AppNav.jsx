import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
// import {nav} from "./AppNav.module.css";
//className={nav} C'est Pour Lier un objet à un style ok.

function AppNav() {
  //styles.nav C'est Pour Lier un objet à un style
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
