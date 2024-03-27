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
    const {user} = await api.get("/users/me");
    setUser(user);
  }

  async function getReptiles() {
    const reptiles = await api.get("/reptile");
    setReptiles(reptiles.reptiles);
  }

  useEffect(() => {
    getUser();
    getReptiles();
  }, [])

  return (
    <>
      <div>{user && <h1>Welcome, {user.firstName}</h1>}</div>
      <div>{reptiles ? <div>{reptiles.map(reptile => (
        <Link className="reptile" key={reptile.id} to={`/reptile/${reptile.id}`}>
          <div>{reptile.name}</div>
          <div>{reptile.species}</div>
          <div>{reptile.sex}</div>
        </Link>
      ))}
      </div> 
      :
      <div>No reptiles yet, create one!</div>}</div>
    </>
  )
}