import React, { useContext, useState, useEffect } from "react";
import { QuizzesContext } from "../contexts/quizzesContext";
import { UserContext } from "../contexts/userContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AnswerQuiz from "./AnswerQuiz";
import { AnswersContext } from "../contexts/answersContext";

const Quizzes = () => {
  const { quizzes } = useContext(QuizzesContext);
  const { user } = useContext(UserContext);
  const { answers } = useContext(AnswersContext);
  const answeredQuizzes = answers.filter(
    (answer) => answer.username === user.username
  );

  console.log(answeredQuizzes);

  // const handleAttemptQuiz = async (e) => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/answer", {
  //       method: "PUT",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username: user.username, answeredQuizzes }),
  //     });
  //     console.log("success fetch");
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       console.log("login successful");
  //     } else {
  //       console.error("Login failed");
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  // };

  return (
    <div>
      <h1>Quizzes</h1>
      <hr className="my-4"></hr>

      <ul>
        <div className="container">
          <div className="row">
            {quizzes.map(
              (quiz, index) =>
                quiz.username !== user.username &&
                !answeredQuizzes.find(
                  (answered) => answered.quizId === quiz._id
                ) && (
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

                  <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
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
                        <p className="card-text">{quiz.createdAt}</p>
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
    </div>
  );
};

export default Quizzes;
