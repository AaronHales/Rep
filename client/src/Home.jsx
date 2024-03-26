import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { useCounter } from "./utils/use_counter";
import { requireLogin } from "./utils/require_login";

export const Home = () => {
  requireLogin();
  const [user, setUser] = useState(null);
  const api = useApi();

  async function getUser() {
    const {user} = await api.get("/users/me");
    setUser(user);
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <div>{user && <h1>Welcome, {user.firstName}</h1>}</div>
      <div>List of all reptiles for the user here</div>
      
      <div>View reptiles</div>
    </>
  )
}