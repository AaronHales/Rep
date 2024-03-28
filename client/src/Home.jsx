import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { requireLogin } from "./utils/require_login";
import { Link } from "react-router-dom";
import "./styles/home.css";

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

  function intToColor(id) {
    // Simple hashing function to map an integer to a color
    const hash = (id * 2654435761) % (2 ** 32); // Knuth's multiplicative hash
    const color = '#' + ('00000' + (hash & 0xFFFFFF).toString(16)).slice(-6); // Extract RGB components
    return color;
  }

  console.log(user);
  console.log(schedules)

  return (
    <>
      <div>{user && <h1>Welcome, {user.firstName}</h1>}</div>
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
        {schedules ? <div className="schedule-container" >{schedules.map(schedule => (
          <Link 
          style={{backgroundColor: `${intToColor(schedule.reptileId)}`}} 
          className="reptile"
          key={schedule.id} 
          to={`/schedule/${schedule.id}`}>
            
            <div className="name">{schedule.type}</div>
            <div className="species">{schedule.description}</div>
          </Link>
        ))}
        </div>
        :
        <div>No schedules yet, create one!</div>}
      </div>
    </>
  )
}