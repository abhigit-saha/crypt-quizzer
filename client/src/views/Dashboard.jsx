import React, { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { QuizzesContext } from "../contexts/quizzesContext";
import { AnswersContext } from "../contexts/answersContext";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NB from "./NB";

function Dashboard() {
  const { user } = useContext(UserContext);
  const { quizzes } = useContext(QuizzesContext);
  const { answers } = useContext(AnswersContext);

  return (
    <>
      <NB />
      <div className="container">
        <h2>{user.username}</h2>
        <hr className="my-4"></hr>
        <p>Quizzes participated in: </p>
        {/* {console.log(answers)} */}
        {answers.map(
          (answerData, index) =>
            answerData.username == user.username && (
              <div className="container" key={index}>
                <div className="row">
                  <div className="col">
                    <p>{answerData.header}</p>
                  </div>
                  <div className="col">
                    <p>
                      {answerData.score}/{answerData.answers.length}
                    </p>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}

export default Dashboard;
