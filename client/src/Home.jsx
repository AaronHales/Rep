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

  function getRandomColorWithContrast() {
    let color;
    let brightness;
    do {
        // Generate random RGB values
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        // Calculate brightness using relative luminance formula
        brightness = (red * 299 + green * 587 + blue * 114) / 1000;

        // Construct and return the color string in hexadecimal format
        color = '#' + ('00' + red.toString(16)).slice(-2) +
                      ('00' + green.toString(16)).slice(-2) +
                      ('00' + blue.toString(16)).slice(-2);
        
    // Ensure that the brightness of the color is sufficiently different from black (brightness > 64)
    } while (brightness <= 64); // Ensure color is bright enough for black text
    return color;
  }

  return (
    <>
      <div>{user && <h1>Welcome, {user.firstName}</h1>}</div>
      {reptiles ? <div className="reptile-container" >{reptiles.map(reptile => (
        <Link 
        style={{backgroundColor: `${getRandomColorWithContrast()}`}} 
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
    </>
  )
}