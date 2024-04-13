import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizzesContext } from "../contexts/quizzesContext";
import { UserContext } from "../contexts/userContext";
import NB from "./NB";
function AnswerQuiz() {
  const { quizzes } = useContext(QuizzesContext);
  const { index } = useParams();
  const { user } = useContext(UserContext);

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
  console.log(index);
  console.log(quizzes);
  // console.log("user.username : ", user.username);
  // console.log("quizzes[id].header :", quizzes[id].header);
  const [answers, setAnswers] = useState({
    username: user.username,
    header: quizzes[index].header,
    quizId: quizzes[index]._id,
    answers: [],
    score: 0,
  });

  const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const newAnswers = [...answers.answers];
    newAnswers[index] = event.target.value;
    setAnswers({ ...answers, answers: newAnswers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //calculate the score for the user
    for (var i = 0; i < answers.answers.length; i++) {
      if (answers.answers[i] === quizzes[index].questions[i].answer) {
        answers.score++;
      }
    }
    try {
      // const postData = {
      //   username: user.username, // Assuming user object contains the username
      //   header: "Answers for the Quiz", // You can adjust this header as needed
      //   answers: answers.map((answer, index) => ({ answer })),
      // };

      const response = await fetch("http://localhost:5000/api/answer", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      if (response.ok) {
        console.log("Answers submitted successfully");
        // Redirect to success page upon successful submission
        navigate("/");
        //to actually show the updated homescreen with quizzes that are given deleted
        //we need to refresh
        window.location.reload();
      } else {
        console.error("Failed to submit answers");
      }
    } catch (error) {
      console.error("Failed to submit answers:", error);
    }
  };

  return (
    <>
      <NB />
      <div className="container">
        <h2>Answer the Quiz</h2>
        <hr className="my-4"></hr>
        <form onSubmit={handleSubmit}>
          {quizzes[index].questions.map((questionData, index) => (
            <div key={index}>
              <div className="form-group">
                <label>{questionData.question}</label>
                <input
                  type="text"
                  className="form-control"
                  value={answers[index]}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
            </div>
          ))}
          <hr className="my-5"></hr>
          <button type="submit">Submit Answers</button>
        </form>
        {/* <form onSubmit = {handleSubmit}>
        {quizzes[id].questions}
      </form> */}
      </div>
    </>
  );
}

export default AnswerQuiz;
