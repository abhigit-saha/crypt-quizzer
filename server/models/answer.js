const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    quizId: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
