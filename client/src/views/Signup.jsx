import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          ChainQ
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                AboutUs
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">
                Guide
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Connect with Us
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  Instagram
                </a>
                <a class="dropdown-item" href="#">
                  Twitter
                </a>
                <a class="dropdown-item" href="#">
                  Facebook
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
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
      <button onClick={() => navigate("/login")}>Login</button>
    </>
  );
}

export default Signup;
