import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { requireLogin } from "./utils/require_login";
import { Link } from "react-router-dom";
import "./styles/home.css";
import { intToColor } from "./utils/intToColor";
import { Schedule } from "./Schedule";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


export const Home = () => {
  requireLogin();
  const [user, setUser] = useState(null);
  const [reptiles, setReptiles] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [popup, setPopup] = useState(false);
  const [delRep, setDelRep] = useState({});
  const api = useApi();

  async function getUser() {
    const user = await api.get("/users/me");
    setUser(user);
    setReptiles(user.reptiles);
    setSchedules(user.schedules);
  }

  useEffect(() => {
    getUser();
  }, [popup])

  function clickDelete(id) {
    reptiles.forEach(reptile => {
      if (reptile.id === id) {
        setDelRep(reptile);
      }
    })
    setPopup(true);
  }

  function stopDelete() {
    setPopup(false);
  }

  async function confirmDelete() {
    const res = await api.del(`/reptile/${delRep.id}`)
    setReptiles(reptiles.filter((reptile) => {
      reptile.id !== delRep.id
    }))
    setPopup(false);
  }

  return (
    <>
      <h1 style={{display: "flex", justifyContent: "center"}}>Welcome, {user && user.firstName}</h1>

      <div style={{display: "flex"}}>
        {reptiles ? <div className="reptile-container" >
          {popup && <div className="popup">
          Are you sure you want to delete {delRep.name}? This will also delete their corresponding information.
          <button onClick={stopDelete}>No</button>
          <button onClick={confirmDelete}>Yes</button>
          </div>}
          {reptiles.map(reptile => (
          <Link 
          style={{backgroundColor: `${intToColor(reptile.id)}`}} 
          className="reptile"
          key={reptile.id} 
          to={`/reptile/${reptile.id}`}>
            <div className="name">{reptile.name} ({reptile.sex.toUpperCase()})</div>
            <div className="species">{reptile.species}</div>
            <div className="can-container">
              <button onClick={(e) => {
                e.preventDefault()
                clickDelete(reptile.id)
                }}
                className="delete-reptile">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
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