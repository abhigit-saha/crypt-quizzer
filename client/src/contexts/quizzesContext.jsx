import React, { createContext, useState, useEffect } from "react";

export const QuizzesContext = createContext();

export const QuizzesProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/quiz", {
          method: "GET",
          credentials: "include", // Include credentials in the request
        });
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        const quizzesData = await response.json();
        setQuizzes(quizzesData);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [quizzes]);

  return (
    <QuizzesContext.Provider value={{ quizzes }}>
      {children}
    </QuizzesContext.Provider>
  );
};
