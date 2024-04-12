const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/user");
const Schema = mongoose.Schema;
const app = express();
const bcrypt = require("bcryptjs");
const Quiz = require("../models/quiz");
const Answer = require("../models/answer");

const quizController = {
  host: async (req, res) => {
    try {
      const { quizzes } = req.body;
      console.log(quizzes);
      console.log(quizzes.questions);
      // Assuming quizzes is an array of objects containing header and questions
      const createdQuizzes = await Quiz.create(quizzes);
      res.status(201).json({ success: true, quizzes: createdQuizzes });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  postAnswer: async (req, res) => {
    try {
      console.log("trying to get the answers");
      const answers = req.body;
      // console.log(answers);
      console.log("Got the answers");
      console.log(answers);
      // Assuming quizzes is an array of objects containing header and questions
      const createdAnswers = await Answer.create(answers);
      res.status(201).json({ success: true, answers: createdAnswers });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getAnswers: async (req, res) => {
    try {
      const answers = await Answer.find().sort({ createdAt: -1 });
      res.json(answers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  getQuizzes: async (req, res) => {
    try {
      const quizzes = await Quiz.find().sort({ createdAt: -1 });
      // console.log(quizzes);
      res.json(quizzes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
module.exports = quizController;
