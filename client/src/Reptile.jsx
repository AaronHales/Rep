import { useParams, useSearchParams } from "react-router-dom"
import { useApi } from "./utils/use_api";
import { useEffect, useState } from "react";
import { requireLogin } from "./utils/require_login";

export function Reptile() {
    requireLogin();
    const { id } = useParams();
    const api = useApi();
    const [reptile, setReptile] = useState(null);
    
    async function getReptile() {
        const { reptile } = await api.get(`/reptile/${id}`);
        console.log(reptile);
        setReptile(reptile);
    }

    useEffect(() => {
        getReptile();
      }, [])

    return (
        <>
            {reptile ? <div>{reptile.name}</div> : <h1>Couldn't find that reptile!</h1>}
        </>
    )

}