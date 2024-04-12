const Quiz = require("../models/quiz");

// Controller to handle hosting quizzes
const hostQuiz = async (req, res) => {
  try {
    const { quizzes } = req.body;
    console.log(quizzes);
    // Assuming quizzes is an array of objects containing header and questions
    const createdQuizzes = await Quiz.create(quizzes);
    res.status(201).json({ success: true, quizzes: createdQuizzes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { hostQuiz };
