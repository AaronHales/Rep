import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { requireLogin } from "./utils/require_login";
import { Link } from "react-router-dom";
import "./styles/home.css";
import { intToColor } from "./utils/intToColor";


export const Home = () => {
  requireLogin();
  const [user, setUser] = useState(null);
  const [reptiles, setReptiles] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const api = useApi();
  const today = new Date().getDay();

  async function getUser() {
    const user = await api.get("/users/me");
    setUser(user);
    setReptiles(user.reptiles);
    setSchedules(user.schedules);
  }

  useEffect(() => {
    getUser();
  }, [])

  function isScheduleToday(schedule) {
    return (today === 1 && schedule.monday) || (today === 2 && schedule.tuesday) || (today === 3 && schedule.wednesday)
     || (today === 4 && schedule.thursday) || (today === 5 && schedule.friday) || (today === 6 && schedule.saturday)
      || (today === 7 && schedule.sunday);
  }

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
        {schedules ? <div className="schedule-container" >{schedules.map(schedule => (
          isScheduleToday(schedule) && 
          <Link 
          style={{backgroundColor: `${intToColor(schedule.reptileId)}`}} 
          className="schedule"
          key={schedule.id} 
          to={`/schedule/${schedule.id}`}>
            <div className="name">{schedule.type}</div>
            <div className="species">{schedule.description}</div>
            <div className="days">
              Days of the Week: 
              {schedule.monday && <div style={today === 1 ? {fontWeight: "bold"} : {}}>Monday</div>}
              {schedule.tuesday && <div style={today === 2 ? {fontWeight: "bold"} : {}}>Tuesday</div>}
              {schedule.wednesday && <div style={today === 3 ? {fontWeight: "bold"} : {}}>Wednesday</div>}
              {schedule.thursday && <div style={today === 4 ? {fontWeight: "bold"} : {}}>Thursday</div>}
              {schedule.friday && <div style={today === 5 ? {fontWeight: "bold"} : {}}>Friday</div>}
              {schedule.saturday && <div style={today === 6 ? {fontWeight: "bold"} : {}}>Saturday</div>}
              {schedule.sunday && <div style={today === 7 ? {fontWeight: "bold"} : {}}>Sunday</div>}
            </div>
          </Link>
        ))}
        </div>
        :
        <div>No schedules yet, create one!</div>}
      </div>
    </>
  )
}