import { useState } from "react";
import { requireLogin } from "./utils/require_login"
import { useApi } from "./utils/use_api";
import { useNavigate } from "react-router-dom";


export function NewReptile() {
    requireLogin();
    const api = useApi();
    const [species, setSpecies] = useState("");
    const [name, setName] = useState("");
    const [sex, setSex] = useState("");
    const navigate = useNavigate();


    async function createReptile(e) {
        e.preventDefault();
        const res = await api.post("/reptile/create", {
          species,
          name,
          sex,
        });
        navigate("/");
      }

    return (
        <div className="form-container">
            <form className="form" onSubmit={createReptile}>
                <input
                placeholder="Species"
                type="text"
                value={species}
                required
                onChange={e => setSpecies(e.target.value)}
                />
                <input
                placeholder="Name"
                type="text"
                value={name}
                required
                onChange={e => setName(e.target.value)}
                />
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
                <button>Create Reptile</button>
            </form>
        </div>
    )

}