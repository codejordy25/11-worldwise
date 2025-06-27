import { Link, NavLink } from "react-router-dom";

function PageNav() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/Product">Product</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PageNav;
