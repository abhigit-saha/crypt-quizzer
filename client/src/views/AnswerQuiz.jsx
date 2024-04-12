import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizzesContext } from "../contexts/quizzesContext";
import { UserContext } from "../contexts/userContext";

function AnswerQuiz() {
  const { quizzes } = useContext(QuizzesContext);
  const { id } = useParams();
  const { user } = useContext(UserContext);
  // console.log("user.username : ", user.username);
  // console.log("quizzes[id].header :", quizzes[id].header);
  const [answers, setAnswers] = useState({
    username: user.username,
    header: quizzes[id].header,
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
      if (answers.answers[i] === quizzes[id].questions[i].answer) {
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
      } else {
        console.error("Failed to submit answers");
      }
    } catch (error) {
      console.error("Failed to submit answers:", error);
    }
  };

  return (
    <div>
      <h2>Answer the Quiz</h2>
      <form onSubmit={handleSubmit}>
        {quizzes[id].questions.map((questionData, index) => (
          <div key={index}>
            <p>{questionData.question}</p>
            <input
              type="text"
              value={answers[index]}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
        ))}
        <button type="submit">Submit Answers</button>
      </form>
      {/* <form onSubmit = {handleSubmit}>
        {quizzes[id].questions}
      </form> */}
    </div>
  );
}

export default AnswerQuiz;
