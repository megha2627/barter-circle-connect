import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    setUser(userJSON ? JSON.parse(userJSON) : null);

    // Listen for changes in localStorage (for multi-tab logout)
    const syncUser = () => {
      const userJSON = localStorage.getItem("user");
      setUser(userJSON ? JSON.parse(userJSON) : null);
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};