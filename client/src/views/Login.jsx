import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [answeredQuizzes, setAnsweredQuizzes] = useState([]);

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
        body: JSON.stringify({ username, password, answeredQuizzes }),
      });
      console.log("success fetch");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("login successful");
        navigate("/");
        // for some reason the previous users data was visible when we navigated after logging in
        // so we had to manually refresh
        // below is just a hacky way to prevent displaying the previous users data
        window.location.reload();
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    navigate("/");
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
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </>
  );
}

export default Login;
