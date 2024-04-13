import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NB from "./NB";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
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
    <>
      <NB />
      {/* <div>
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
      </div> */}
      <Container>
        <h2 className="text-center mt-4 mb-4">Host Quizzes</h2>
        <hr className="my-4"></hr>
        {quizzes.map((quiz, quizIndex) => (
          <div key={quizIndex} className="mb-4">
            <h3>Quiz {quizIndex + 1}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Header:</Form.Label>
                <Form.Control
                  type="text"
                  value={quiz.header}
                  onChange={(e) => handleHeaderChange(e, quizIndex)}
                />
              </Form.Group>
              {quiz.questions.map((questionObj, questionIndex) => (
                <div key={questionIndex} className="mb-3">
                  <Form.Group>
                    <Form.Label>Question {questionIndex + 1}:</Form.Label>
                    <Form.Control
                      type="text"
                      value={questionObj.question}
                      onChange={(e) =>
                        handleQuestionChange(e, quizIndex, questionIndex)
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Answer:</Form.Label>
                    <Form.Control
                      type="text"
                      value={questionObj.answer}
                      onChange={(e) =>
                        handleAnswerChange(e, quizIndex, questionIndex)
                      }
                    />
                  </Form.Group>
                </div>
              ))}
              <div className="d-flex justify-content-between mb-2">
                <Button
                  variant="primary"
                  onClick={() => addQuestion(quizIndex)}
                  className="mr-2"
                >
                  Add Question
                </Button>
                <Button variant="danger" onClick={() => removeQuiz(quizIndex)}>
                  Remove Quiz
                </Button>
              </div>
            </Form>
          </div>
        ))}

        <div className="mb-4">
          <Button variant="primary" onClick={addQuiz}>
            Add Quiz
          </Button>
        </div>
        <div>
          <Button variant="success" onClick={hostQuiz}>
            Host the Quizzes
          </Button>
        </div>
      </Container>
    </>
  );
};

export default HostQuiz;
