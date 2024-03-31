import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { requireLogin } from "./utils/require_login";
import { Link } from "react-router-dom";
import "./styles/home.css";
import { intToColor } from "./utils/intToColor";
import { Schedule } from "./Schedule";


export const Home = () => {
  requireLogin();
  const [user, setUser] = useState(null);
  const [reptiles, setReptiles] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const api = useApi();

  async function getUser() {
    const user = await api.get("/users/me");
    setUser(user);
    setReptiles(user.reptiles);
    setSchedules(user.schedules);
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <h1 style={{display: "flex", justifyContent: "center"}}>Welcome, {user && user.firstName}</h1>
      <div style={{display: "flex"}}>
        {reptiles ? <div className="reptile-container" >{reptiles.map(reptile => (
          <Link 
          style={{backgroundColor: `${intToColor(reptile.id)}`}} 
          className="reptile"
          key={reptile.id} 
          to={`/reptile/${reptile.id}`}>
            <div className="name">{reptile.name} ({reptile.sex.toUpperCase()})</div>
            <div className="species">{reptile.species}</div>
          </Link>
        ))}
        </div>
        :
        <div>No reptiles yet, create one!</div>}
      { schedules ? <Schedule schedules={schedules} intToColor={intToColor} className={"schedule-container"} wrapper={true}/> 
      :
      <div>No schedules yet, create one!</div> }
      </div>
    </>
  )
}