import { useState } from "react";
import { requireLogin } from "./utils/require_login"
import { useApi } from "./utils/use_api";
import { useNavigate, useParams } from "react-router-dom";


export function NewHusbandry() {
    requireLogin();
    const api = useApi();
    const [length, setLength] = useState(0);
    const [weight, setWeight] = useState(0);
    const [temperature, setTemp] = useState(0);
    const [humidity, setHumidity] = useState(0)
    const navigate = useNavigate();
    const { id } = useParams();


    async function createHusbandry(e) {
        e.preventDefault();
        const res = await api.post(`/husbandry/${id}`, {
            length,
            weight,
            temperature,
            humidity
        });
        navigate(`/reptile/${id}`);
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={createHusbandry}>
                <input
                placeholder="length"
                type="number"
                value={length}
                min={0}
                step={0.01}
                required
                onChange={e => setLength(parseFloat(e.target.value))}
                />
                <input
                placeholder="weight"
                type="number"
                value={weight}
                min={0}
                step={0.01}
                required
                onChange={e => setWeight(parseFloat(e.target.value))}
                />
                <input
                placeholder="temperature"
                type="number"
                value={temperature}
                min={0}
                step={0.01}
                required
                onChange={e => setTemp(parseFloat(e.target.value))}
                />
                <input
                placeholder="length"
                type="number"
                value={humidity}
                min={0}
                step={0.01}
                required
                onChange={e => setHumidity(parseFloat(e.target.value))}
                />
                <button>Log</button>
            </form>
        </div>
    )

}