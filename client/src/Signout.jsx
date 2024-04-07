import React from "react";
import { useNavigate } from "react-router-dom";

function Signout() {
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        // Logout successful, navigate to login page
        navigate("/login"); // Assuming your login page route is '/login'
      } else {
        // Handle error if logout fails
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return <button onClick={handleSignout}>Sign Out</button>;
}

export default Signout;
