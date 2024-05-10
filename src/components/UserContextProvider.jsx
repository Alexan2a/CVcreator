import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("username") || null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log(username + "getlocal");
    setUser(username);
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user + "setlocal");
      localStorage.setItem("username", user);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, onChange: setUser }}>
      {children}
    </UserContext.Provider>
  );
}
