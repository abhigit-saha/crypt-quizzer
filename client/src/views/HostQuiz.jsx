import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HostQuiz = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([
    {
      username: user.username,
      header: "",
      questions: [{ question: "", answer: "" }],
    },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleHeaderChange = (e, quizIndex) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].header = e.target.value;
    setQuizzes(newQuizzes);
  };

  const handleQuestionChange = (e, quizIndex, questionIndex) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].questions[questionIndex].question = e.target.value;
    setQuizzes(newQuizzes);
  };

  const handleAnswerChange = (e, quizIndex, questionIndex) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].questions[questionIndex].answer = e.target.value;
    setQuizzes(newQuizzes);
  };

  const addQuestion = (quizIndex) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].questions.push({ question: "", answer: "" });
    setQuizzes(newQuizzes);
  };

  const addQuiz = () => {
    setQuizzes([
      ...quizzes,
      {
        username: user.username,
        header: "",
        questions: [{ question: "", answer: "" }],
      },
    ]);
  };

  const removeQuiz = (quizIndex) => {
    const newQuizzes = [...quizzes];
    newQuizzes.splice(quizIndex, 1);
    setQuizzes(newQuizzes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const hostQuiz = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/host", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quizzes }),
      });

      if (!response.ok) {
        throw new Error("Failed to host quiz");
      }

      const data = await response.json();
      console.log("Quiz hosted successfully:", data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error hosting quiz:", error);
    }
    navigate("/");
    console.log(quizzes);
  };

  return (
    <div>
      <h2>Host Quizzes</h2>
      {quizzes.map((quiz, quizIndex) => (
        <div key={quizIndex}>
          <h3>Quiz {quizIndex + 1}</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Header:</label>
              <input
                type="text"
                value={quiz.header}
                onChange={(e) => handleHeaderChange(e, quizIndex)}
              />
            </div>
            {quiz.questions.map((questionObj, questionIndex) => (
              <div key={questionIndex}>
                <label>Question {questionIndex + 1}:</label>
                <input
                  type="text"
                  value={questionObj.question}
                  onChange={(e) =>
                    handleQuestionChange(e, quizIndex, questionIndex)
                  }
                />
                <label>Answer:</label>
                <input
                  type="text"
                  value={questionObj.answer}
                  onChange={(e) =>
                    handleAnswerChange(e, quizIndex, questionIndex)
                  }
                />
              </div>
            ))}
            <button type="button" onClick={() => addQuestion(quizIndex)}>
              Add Question
            </button>
            <button type="submit">Submit</button>
          </form>
          {submitted && <p>Submitted</p>}
          <button onClick={() => removeQuiz(quizIndex)}>Remove Quiz</button>
        </div>
      ))}
      <button onClick={addQuiz}>Add Quiz</button>
      <button onClick={hostQuiz}>Host the Quizzes</button>
    </div>
  );
};

export default HostQuiz;
