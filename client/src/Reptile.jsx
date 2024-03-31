import { Link, useParams, useSearchParams } from "react-router-dom"
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
                <div className="inside-info">
                    <h2 className="info-title">Feedings</h2>
                    <Link className="info-link" to={`/feeding/${id}`}>New Feeding</Link>
                    {reptile.feedings.map(feeding => (
                        <div className="info" key={feeding.id} style={{backgroundColor: `${color}`}}>
                            <div>Food: {feeding.foodItem}</div>
                            <div>Recorded: {new Date(feeding.createdAt).toLocaleDateString("en-us", dateOptions)}</div>
                        </div>
                    ))}
                </div>
                <div className="inside-info">
                    <h2 className="info-title">Husbandry Records</h2>
                    <Link className="info-link" to={`/husbandry/${id}`}>New Husbandry Record</Link>
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
                <div className="inside-info">
                    <h2 className="info-title">Schedules</h2>
                    <Link className="info-link" to={`/schedule/${id}`}>New Schedule</Link>
                    <Schedule schedules={reptile.schedules} intToColor={intToColor} wrapper={false}/>
                </div>
             </div>
             </>
             :
            <h1>Couldn't find that reptile!</h1>}
        </>
    )

}