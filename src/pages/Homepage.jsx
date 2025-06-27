import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

function Homepage() {
  return (
    <div>
      <PageNav />
      <h1>WorldWise</h1>

      <Link to="/AppLayout">Go to the app</Link>
    </div>
  );
}

export default Homepage;
