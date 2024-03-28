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
        setReptile(reptile);
    }

    useEffect(() => {
        getReptile();
      }, [])

    return (
        <>
            {reptile ?
             <div 
             className="reptile-title"
             style={{
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center"}}>
                <div 
                style={{
                    fontSize: "35px", 
                    fontWeight: "bold"}}>
                    {reptile.name}({reptile.sex.toUpperCase()})
                </div>
                <div 
                style={{
                    fontSize: "20px", 
                    fontStyle: "italic"}}>
                    {reptile.species}
                </div>
             </div>
             :
            <h1>Couldn't find that reptile!</h1>}
        </>
    )

}