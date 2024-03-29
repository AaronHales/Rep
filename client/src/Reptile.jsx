import { useParams, useSearchParams } from "react-router-dom"
import { useApi } from "./utils/use_api";
import { useEffect, useState } from "react";
import { requireLogin } from "./utils/require_login";
import "./styles/reptile.css";
import { intToColor } from "./utils/intToColor";

export function Reptile() {
    requireLogin();
    const { id } = useParams();
    const api = useApi();
    const [reptile, setReptile] = useState(null);
    
    async function getReptile() {
        const { reptile } = await api.get(`/reptile/${id}`);
        setReptile(reptile);
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
             </div>
             <div className="info-container">
                <div>
                    <h2>Feedings</h2>
                    {reptile.feedings.map(feeding => (
                        <div className="info" key={feeding.id} style={{backgroundColor: `${color}`}}>
                            <div>Food: {feeding.foodItem}</div>
                            <div>Recorded: {new Date(feeding.createdAt).toLocaleDateString("en-us", dateOptions)}</div>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>Husbandry Records</h2>
                    {reptile.husbandryRecords.map(record => (
                        <div className="info" key={record.id} style={{backgroundColor: `${color}`}}>
                            <div>Length: {record.length}</div>
                            <div>Weight: {record.weight}</div>
                            <div>Temperature: {record.temperature}</div>
                            <div>Humidity: {record.humidity}</div>
                            <div>Recorded: {new Date(record.createdAt).toLocaleDateString("en-us", dateOptions)}</div>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>Schedules</h2>
                    {reptile.schedules.map(schedule => (
                        <div className="info" key={schedule.id} style={{backgroundColor: `${color}`}}>
                            <div>Type: {schedule.type}</div>
                            <div>Description: {schedule.description}</div>
                            <div className="days">
                                Days of the Week: 
                                {schedule.monday && <div>Monday</div>}
                                {schedule.tuesday && <div>Tuesday</div>}
                                {schedule.wednesday && <div>Wednesday</div>}
                                {schedule.thursday && <div>Thursday</div>}
                                {schedule.friday && <div>Friday</div>}
                                {schedule.saturday && <div>Saturday</div>}
                                {schedule.sunday && <div>Sunday</div>}
                            </div>
                        </div>
                    ))}
                </div>
             </div>
             </>
             :
            <h1>Couldn't find that reptile!</h1>}
        </>
    )

}