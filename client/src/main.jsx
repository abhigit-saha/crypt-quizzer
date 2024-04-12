import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Signup from "./views/Signup.jsx";
import Login from "./views/Login.jsx";
import HostQuiz from "./views/HostQuiz.jsx";
import Quizzes from "./views/Quizzes.jsx";
import Dashboard from "./views/Dashboard.jsx";
import "./index.css";
import { UserProvider } from "./contexts/userContext.jsx";
import { QuizzesProvider } from "./contexts/quizzesContext.jsx";
import { AnswersProvider } from "./contexts/answersContext.jsx";
import AnswerQuiz from "./views/AnswerQuiz.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "host-quiz",
    element: <HostQuiz />,
  },
  {
    path: "quiz/:index",
    element: <AnswerQuiz />,
  },
  {
    path: "users/:id",
    element: <Dashboard />,
  },
  // <Route path="/quiz/:id" element={<AnswerQuiz />} />
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuizzesProvider>
      <UserProvider>
        <AnswersProvider>
          <RouterProvider router={router} />
        </AnswersProvider>
      </UserProvider>
    </QuizzesProvider>
  </React.StrictMode>
);
