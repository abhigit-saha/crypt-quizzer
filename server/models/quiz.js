const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
