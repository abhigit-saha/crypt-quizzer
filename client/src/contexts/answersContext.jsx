import React, { createContext, useState, useEffect } from "react";

export const AnswersContext = createContext();

export const AnswersProvider = ({ children }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/answer", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        const answersData = await response.json();
        setAnswers(answersData);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchAnswers();
  }, []); // Removed 'answers' from dependencies array

  return (
    <AnswersContext.Provider value={{ answers }}>
      {children}
    </AnswersContext.Provider>
  );
};
