import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("trying fetch");
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      console.log("success fetch");
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Assuming server responds with user data upon successful login
        console.log("login successful");
        navigate("/"); // Redirect
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
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

        <button>Login</button>
      </form>
    </>
  );
}

export default Login;
