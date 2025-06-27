import { Link } from "react-router-dom";

function PageNav() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/Product">Product</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PageNav;
