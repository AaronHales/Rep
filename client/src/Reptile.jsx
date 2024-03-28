import { useParams, useSearchParams } from "react-router-dom"
import { useApi } from "./utils/use_api";
import { useEffect, useState } from "react";
import { requireLogin } from "./utils/require_login";
import "./styles/reptile.css";

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

    function intToColor(id) {
        // Simple hashing function to map an integer to a color
        const hash = (id * 2654435761) % (2 ** 32); // Knuth's multiplicative hash
        const color = '#' + ('00000' + (hash & 0xFFFFFF).toString(16)).slice(-6); // Extract RGB components
        return color;
    }
    let color;

    if (reptile) {
        color = intToColor(reptile.id);
        console.log(color)
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
                        <div className="feeding" key={feeding.id} style={{backgroundColor: `${color}`}}>
                            <div>Food: {feeding.foodItem}</div>
                            <div>Recorded: {new Date(feeding.createdAt).toLocaleDateString("en-us", dateOptions)}</div>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>Husbandry Records</h2>
                    {reptile.husbandryRecords.map(record => (
                        <div className="record" key={record.id} style={{backgroundColor: `${color}`}}>
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
                        <div className="schedule" key={schedule.id} style={{backgroundColor: `${color}`}}>
                            <div>Type: {schedule.type}</div>
                            <div>Description: {schedule.description}</div>
                            <div>
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