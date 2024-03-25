import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import './styles/nav.css';

function Nav() {
  const authToken = useSelector(state => state.application.authToken)
  return (
    <div id="page">
      <nav><h2>Reptile Tracker</h2>{
        !authToken && (
          <div>
            <Link to="/login">Sign In</Link>
            <Link to="/sign_up">Create Account </Link>
          </div>
        )
      }</nav>
      <Outlet />
    </div>
  );
}

export default Nav
