import { useState } from "react";
import { requireLogin } from "./utils/require_login"
import { useApi } from "./utils/use_api";
import { useNavigate, useParams } from "react-router-dom";


export function NewFeeding() {
    requireLogin();
    const { id } = useParams();
    const api = useApi();
    const [foodItem, setFoodItem] = useState("");
    const navigate = useNavigate();


    async function createFeeding(e) {
        e.preventDefault();
        const res = await api.post(`/feeding/${id}`, {
            foodItem,
        });
        navigate(`/reptile/${id}`);
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={createFeeding}>
                <input
                placeholder="Food"
                type="text"
                value={foodItem}
                required
                onChange={e => setFoodItem(e.target.value)}
                />
                <button>Log Feeding</button>
            </form>
        </div>
    )

}