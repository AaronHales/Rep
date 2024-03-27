import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { requireLogin } from "./utils/require_login";
import { Link } from "react-router-dom";
import "./styles/home.css";

export const Home = () => {
  requireLogin();
  const [user, setUser] = useState(null);
  const [reptiles, setReptiles] = useState([]);
  const api = useApi();

  async function getUser() {
    const user = await api.get("/users/me");
    setUser(user);
    setReptiles(user.reptiles);
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <div>{user && <h1>Welcome, {user.firstName}</h1>}</div>
      {reptiles ? <div className="reptile-container">{reptiles.map(reptile => (
        <Link className="reptile" key={reptile.id} to={`/reptile/${reptile.id}`}>
          <div className="name">{reptile.name} ({reptile.sex})</div>
          <div className="species">{reptile.species}</div>
        </Link>
      ))}
      </div>
      :
      <div>No reptiles yet, create one!</div>}
    </>
  )
}