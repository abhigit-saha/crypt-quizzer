const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true,
  },
  scores: [
    {
      username: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
