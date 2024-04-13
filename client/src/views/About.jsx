import React from "react";
import NB from "./NB";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function About() {
  return (
    <>
      <div>
        <NB />
        <div className="container">
          <p>
            This is an app that is created for DevJam '24 organized by the CC
            Club. This app aims to reward the users sharpness, and reward them
            using ethereum using secure blockchain technology. Hope you like it!
            - Team ChainQuizzers
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
