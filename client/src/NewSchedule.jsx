import { useState } from "react";
import { requireLogin } from "./utils/require_login"
import { useApi } from "./utils/use_api";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";


export function NewSchedule() {
    requireLogin();
    const api = useApi();
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [monday, setMonday] = useState(false);
    const [tuesday, setTuesday] = useState(false);
    const [wednesday, setWednesday] = useState(false);
    const [thursday, setThursday] = useState(false);
    const [friday, setFriday] = useState(false);
    const [saturday, setSaturday] = useState(false);
    const [sunday, setSunday] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams()
    const name = searchParams.get("name")


    async function createSchedule(e) {
        e.preventDefault();
        const res = await api.post(`/schedule/${id}`, {
            type,
            description,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday

        });
        navigate(`/reptile/${id}`);
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={createSchedule}>
                <div className="radio-options">

            <div className="type-selection">
                    Type of Schedule
                    <div className="radio">
                        <input
                        id="feed"
                        type="radio"
                        name="type"
                        value="Feed"
                        onChange={e => setType(e.target.value)}
                        required
                        />
                        <label htmlFor="feed">Feed</label>
                    </div>
                    <div className="radio">
                        <input
                        id="record"
                        type="radio"
                        name="type"
                        value="Record"
                        onChange={e => setType(e.target.value)}
                        />
                        <label htmlFor="record">Record</label>
                    </div>
                    <div className="radio">
                        <input
                        id="clean"
                        type="radio"
                        name="type"
                        value="Clean"
                        onChange={e => setType(e.target.value)}
                        required
                        />
                        <label htmlFor="clean">Clean</label>
                    </div>
                </div>
                <div className="day-selection">
                    <label>
                    <input
                    type="checkbox"
                    value={monday}
                    onChange={e => setMonday(e.target.checked)}
                    />
                    Monday
                    </label>
                    <label>
                    <input
                    type="checkbox"
                    value={tuesday}
                    onChange={e => setTuesday(e.target.checked)}
                    />
                    Tuesday
                    </label>
                    <label >
                    <input
                    type="checkbox"
                    value={wednesday}
                    onChange={e => setWednesday(e.target.checked)}
                    />
                    Wednesday
                    </label>
                    <label>
                    <input
                    type="checkbox"
                    value={thursday}
                    onChange={e => setThursday(e.target.checked)}
                    />
                    Thursday
                    </label>
                    <label>
                    <input
                    type="checkbox"
                    value={friday}
                    onChange={e => setFriday(e.target.checked)}
                    />
                    Friday
                    </label>
                    <label>

                    <input
                    type="checkbox"
                    value={saturday}
                    onChange={e => setSaturday(e.target.checked)}
                    />
                    Saturday
                    </label>
                    <label>
                    <input
                    type="checkbox"
                    value={sunday}
                    onChange={e => setSunday(e.target.checked)}
                    />
                    Sunday
                    </label>
                </div>
                </div>
            
                <input
                placeholder="description of tasks"
                type="text"
                value={description}
                required
                onChange={e => setDescription(e.target.value)}
                />
                <button>Create Schedule for {name}</button>
            </form>
        </div>
    )

}