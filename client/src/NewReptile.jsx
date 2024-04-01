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
        const res = await api.post("/reptile", {
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
                <button>Create Reptile</button>
            </form>
        </div>
    )

}