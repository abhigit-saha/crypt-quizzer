import React, { useContext, useState, useEffect } from "react";
import { QuizzesContext } from "../contexts/quizzesContext";
import { UserContext } from "../contexts/userContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AnswerQuiz from "./AnswerQuiz";

const Quizzes = () => {
  const { quizzes } = useContext(QuizzesContext);
  const { user } = useContext(UserContext);
  // const [quizzes, setQuizzes] = useState([]);
  // useEffect(() => {
  //   const fetchQuizzes = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/quiz", {
  //         method: "GET",
  //         credentials: "include", // Include credentials in the request
  //       });
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch quizzes");
  //       }
  //       const quizzesData = await response.json();
  //       setQuizzes(quizzesData);
  //     } catch (error) {
  //       console.error("Error fetching quizzes:", error);
  //     }
  //   };

  //   fetchQuizzes();
  // }, []);
  // return (
  //   <>
  //     {quizzes.map((quiz, index) => (
  // <div key={index} className="card" style={{ margin: "10px 0 0 0" }}>
  // <div className="card-body">
  //   <h2 className="card-title">{quiz.header}</h2>
  //   <p className="card-text">{quiz.username}</p>
  // </div>
  // </div>
  //     ))}
  //   </>
  // );
  return (
    <div>
      <h1>Quizzes</h1>
      <hr className="my-4"></hr>
      {user.username !== quizzes.username && (
        <ul>
          <div className="container">
            <div className="row">
              {quizzes.map(
                (quiz, index) =>
                  quiz.username !== user.username && (
                    // <div
                    //   key={index}
                    //   className="card"
                    //   style={{ margin: "10px 0 0 0" }}
                    // >
                    // <Link to={`/quiz/${index}`}>
                    //   <div className="card-body text-reset">
                    //     <h2 className="card-title ">{quiz.header}</h2>
                    //     <p className="card-text ">{quiz.username}</p>
                    //   </div>
                    //   </Link>
                    // </div>

                    <div class="col-sm-6 col-md-4 col-lg-3 mb-3">
                      <div
                        className="card"
                        style={{ filter: "drop-shadow(0px 1px 2px #000000)" }}
                      >
                        <div className="card-body">
                          <h5 className="card-title">{quiz.header}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">
                            {quiz.username}
                          </h6>
                          <p className="card-text">
                            {quiz.questions.length} questions
                          </p>
                          <Link to={`/quiz/${index}`} className="card-link">
                            Answer Quiz
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </ul>
      )}
    </div>
  );
};

export default Quizzes;
