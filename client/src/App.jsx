import React, { useState, useEffect } from "react";
import Signout from "./Signout";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const userData = await response.json();
        setUser(userData.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Logged in user: {user.username}</p>
      {/* Access other user properties similarly */}
      <Signout />
    </div>
  );
}

export default App;
