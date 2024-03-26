import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "./store/application_slice";
import './styles/nav.css';

function Nav() {
  const authToken = useSelector(state => state.application.authToken);
  const dispatch = useDispatch();

  function logout() {
    dispatch(setAuthToken(null));
  }


  return (
    <div id="page">
      <nav>
        <h2>Reptile Tracker</h2>
        {authToken && <div>
          <Link to="/">Home</Link>
          <Link to="/reptile">New Reptile</Link>
          <button className="logout" onClick={logout}>Logout</button>
          </div>
        }
        {
        !authToken && (
          <div>
            <Link to="/login">Sign In</Link>
            <Link to="/sign_up">Create Account </Link>
          </div>
        )
        }
      </nav>
      <Outlet />
    </div>
  );
}

export default Nav
