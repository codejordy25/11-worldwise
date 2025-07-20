import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
// import {nav} from "./AppNav.module.css";
//className={nav} C'est Pour Lier un objet à un style ok.

function AppNav() {
  //styles.nav C'est Pour Lier un objet à un style
  //avec Navlink nous naviguons vers une autre page mais de manière déclérative
  //------------------------------------------------------------------------------->
  //Mais avec useNavigate, nous naviguons de manière impérative
  //NavLink est un composant de react-router-dom qui permet de créer des liens de navigation
  //Il est similaire à Link, mais il ajoute des classes CSS actives aux liens en fonction de l'URL actuelle

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
