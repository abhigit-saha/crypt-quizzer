import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (response.ok) {
      console.log("user was successfully put in the database");
    } else {
      console.log("user wasn't put in the database");
    }

    navigate("/login");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Enter Username</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label>Enter Password</label>
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button>Submit</button>
      </form>
    </>
  );
}

export default Signup;
