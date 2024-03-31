import { useState } from "react";
import { requireLogin } from "./utils/require_login"
import { useApi } from "./utils/use_api";
import { useNavigate, useParams } from "react-router-dom";


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
                <input
                placeholder="type of schedule, feed, record, or clean"
                type="text"
                value={type}
                required
                onChange={e => setType(e.target.value)}
                />
                <input
                placeholder="description"
                type="text"
                value={description}
                required
                onChange={e => setDescription(e.target.value)}
                />
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
                <button>Create Schedule</button>
            </form>
        </div>
    )

}