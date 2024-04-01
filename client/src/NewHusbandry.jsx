import { useState } from "react";
import { requireLogin } from "./utils/require_login"
import { useApi } from "./utils/use_api";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";


export function NewHusbandry() {
    requireLogin();
    const api = useApi();
    const [length, setLength] = useState(0);
    const [weight, setWeight] = useState(0);
    const [temperature, setTemp] = useState(0);
    const [humidity, setHumidity] = useState(0)
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams()
    const name = searchParams.get("name")


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
                placeholder="length (ft.)"
                type="number"
                value={length === 0 ? "" : length}
                min={0}
                step={0.01}
                required
                onChange={e => setLength(parseFloat(e.target.value))}
                />
                <input
                placeholder="weight (g. or lbs.)"
                type="number"
                value={weight === 0 ? "" : weight}
                min={0}
                step={0.01}
                required
                onChange={e => setWeight(parseFloat(e.target.value))}
                />
                <input
                placeholder="temperature (°F)"
                type="number"
                value={temperature === 0 ? "" : temperature}
                min={0}
                step={0.01}
                required
                onChange={e => setTemp(parseFloat(e.target.value))}
                />
                <input
                placeholder="humidity (%)"
                type="number"
                value={humidity === 0 ? "" : humidity}
                min={0}
                step={0.01}
                required
                onChange={e => setHumidity(parseFloat(e.target.value))}
                />
                <button>Log record for {name}</button>
            </form>
        </div>
    )

}