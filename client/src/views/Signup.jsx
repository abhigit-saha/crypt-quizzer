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
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <h3>Create ChainQ Account</h3>
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
                    class="d-flex justify-content-between"
                    style={{ margin: "10px" }}
                  >
                    <button type="submit" className="btn btn-primary btn-block">
                      Submit
                    </button>
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => navigate("/login")}
                    >
                      Login
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

export default Signup;
