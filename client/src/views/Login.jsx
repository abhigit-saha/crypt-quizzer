import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <h3>Login to an existing account</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Enter Username</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </div>
                  <div className="form-group">
                    <label>Enter Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{ margin: "10px" }}
                  >
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
