import { Link, useParams } from "react-router-dom"
import { useApi } from "./utils/use_api";
import { useEffect, useState } from "react";
import { requireLogin } from "./utils/require_login";
import "./styles/reptile.css";
import { intToColor } from "./utils/intToColor";
import { Schedule } from "./Schedule";

export function Reptile() {
    requireLogin();
    const { id } = useParams();
    const api = useApi();
    const [reptile, setReptile] = useState(null);
    const [feedings, setFeedings] = useState([{}]);
    const [schedules, setSchedules] = useState([{}]);
    const [husbandryRecords, setHusbandryRecords] = useState([{}]);
    const [popup, setPopup] = useState(false);
    const [species, setSpecies] = useState("");
    const [name, setName] = useState("");
    const [sex, setSex] = useState("");
    const [units, setUnits] = useState("");
    
    async function getReptile() {
        const { reptile } = await api.get(`/reptile/${id}`);
        setReptile(reptile);
        setFeedings(reptile.feedings);
        setSchedules(reptile.schedules);
        setHusbandryRecords(reptile.husbandryRecords);
        if (reptile.species !== "Redtail Boa") {
            setUnits("g.")
        } else {
            setUnits("lbs.");
        }
    }
    useEffect(() => {
        getReptile();

      }, [])

    const dateOptions = {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };

    let color;

    if (reptile) {
        color = intToColor(reptile.id);
    }

    async function updateReptile(e) {
        e.preventDefault();
        const res = await api.put(`/reptile/${id}`, {
            species,
            name,
            sex,
        });
        setReptile(res.reptile);
        setPopup(false);
    }
    
    return (
        <>
            {reptile ?
            <>
             <div className="reptile-title">
                <div className="name">
                    {reptile.name}({reptile.sex.toUpperCase()})
                </div>
                <div className="species">
                    {reptile.species}
                </div>
                <button onClick={() => setPopup(!popup)}>{popup ? "Close update form" : `Update ${reptile.name}`}</button>
                {popup && 
                <form className="form" onSubmit={updateReptile}>
                    <input
                    placeholder="Name"
                    type="text"
                    value={name}
                    required
                    onChange={e => setName(e.target.value)}
                    />
                    <div className="species-selection">
                        Species
                        <div className="radio">
                            <input
                            id="ball_python"
                            type="radio"
                            name="species"
                            value="Ball Python"
                            onChange={e => setSpecies(e.target.value)}
                            required
                            />
                            <label htmlFor="ball_python">Ball Python</label>
                        </div>
                        <div className="radio">
                            <input
                            id="king_snake"
                            type="radio"
                            name="species"
                            value="King Snake"
                            onChange={e => setSpecies(e.target.value)}
                            />
                            <label htmlFor="king_snake">King Snake</label>
                        </div>
                        <div className="radio">
                            <input
                            id="corn_snake"
                            type="radio"
                            name="species"
                            value="Corn Snake"
                            onChange={e => setSpecies(e.target.value)}
                            required
                            />
                            <label htmlFor="corn_snake">Corn Snake</label>
                        </div>
                        <div className="radio">
                            <input
                            id="redtail_boa"
                            type="radio"
                            name="species"
                            value="Redtail Boa"
                            onChange={e => setSpecies(e.target.value)}
                            />
                            <label htmlFor="redtail_boa">Redtail Boa</label>
                        </div>
                    </div>
                    <div>
                        Sex
                        <div className="radio">
                            <input
                            id="M"
                            type="radio"
                            name="sex"
                            value="M"
                            onChange={e => setSex(e.target.value)}
                            required
                            />
                            <label htmlFor="M">Male</label>
                        </div>
                        <div className="radio">
                            <input
                            id="F"
                            type="radio"
                            name="sex"
                            value="F"
                            onChange={e => setSex(e.target.value)}
                            />
                            <label htmlFor="F">Female</label>
                        </div>
                    </div>
                <button>Update {reptile.name}</button>
                </form>
                }
             </div>
             <div className="info-container">
                <div className="inside-info">
                    <h2 className="info-title">Feedings</h2>
                    <Link className="info-link" to={`/feeding/${id}?name=${encodeURIComponent(reptile.name)}`}>New Feeding</Link>
                    {feedings && feedings.map(feeding => (
                        <div className="info" key={feeding.id} style={{backgroundColor: `${color}`}}>
                            <div>Food: {feeding.foodItem}</div>
                            <div>Recorded: {new Date(feeding.createdAt).toLocaleDateString("en-us", dateOptions)}</div>
                        </div>
                    ))}
                </div>
                <div className="inside-info">
                    <h2 className="info-title">Husbandry Records</h2>
                    <Link className="info-link" to={`/husbandry/${id}?name=${encodeURIComponent(reptile.name)}`}>New Husbandry Record</Link>
                    {husbandryRecords.map(record => (
                        <div className="info" key={record.id} style={{backgroundColor: `${color}`}}>
                            <div>Length: {record.length} ft.</div>
                            <div>Weight: {record.weight} {units}</div>
                            <div>Temperature: {record.temperature} °F</div>
                            <div>Humidity: {record.humidity}%</div>
                            <div>Recorded: {new Date(record.createdAt).toLocaleDateString("en-us", dateOptions)}</div>
                        </div>
                    ))}
                </div>
                <div className="inside-info">
                    <h2 className="info-title">Schedules</h2>
                    <Link className="info-link" to={`/schedule/${id}?name=${encodeURIComponent(reptile.name)}`}>New Schedule</Link>
                    <Schedule schedules={schedules} intToColor={intToColor} wrapper={false}/>
                </div>
             </div>
             </>
             :
            <h1>Couldn't find that reptile!</h1>}
        </>
    )

}