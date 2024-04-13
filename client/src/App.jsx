import React, { useState, useEffect, useContext } from "react";
import Signout from "./Signout";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./contexts/userContext";
import { Outlet } from "react-router-dom";
import Quizzes from "./views/Quizzes";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { QuizzesContext } from "./contexts/quizzesContext";
import { AnswersContext } from "./contexts/answersContext";
import NB from "./views/NB";
function App() {
  // const [user, setUser] = useState({});
  const { user } = useContext(UserContext);
  const { quizzes } = useContext(QuizzesContext);

  const navigate = useNavigate();

  //refreshes the window on first render in order to
  //refresh to the current user
  //without it for some reason, on logging in we get the data of the past user
  //and we have to manually refresh it
  useEffect(() => {
    // Conditionally reload the page only when user data is not available
    if (typeof user === "undefined") {
      window.location.reload();
    }
  }, [user]);
  // useEffect(() => {
  //   const refresh = () => {};
  //   refresh();
  // }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/", {
  //         method: "GET",
  //         credentials: "include",
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const userData = await response.json();
  //       setUser(userData.user);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <NB />
      <div className="container" style={{ margin: "10px 0 0 0" }}>
        {typeof user === "undefined" ? (
          navigate("/login")
        ) : (
          <div>
            {console.log(user.username)}
            {/* Access other user properties similarly */}
            <button onClick={() => navigate("/host-quiz")}>Host Quiz</button>
            <Signout />

            <Quizzes />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
