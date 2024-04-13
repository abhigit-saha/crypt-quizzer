import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { UserContext } from "../contexts/userContext";

function NB() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar bg="primary" expand="lg" variant="dark">
        <Navbar.Brand style={{ margin: "0 0 0 10px" }}>ChainQ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>

          <Navbar.Collapse
            className="justify-content-end"
            style={{ margin: "0 5px 0 0" }}
          >
            <Navbar.Text>
              <a href={`/users/${user._id}`}>
                <p>Logged in user: {user.username}</p>
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NB;
