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
const quizController = require("../controllers/quizController");
const Quiz = require("../models/quiz");
const Answer = require("../models/answer");

const userController = {
  signup: async (req, res) => {
    const { username, password, answeredQuizzes } = req.body; // Corrected from res.body to req.body
    console.log(username, " ", password);
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      try {
        const user = await User.create({
          username,
          password: hashedPassword,
          answeredQuizzes,
        });
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ error: error.message });
        console.log("there was an error", error);
      }
    });
  },

  login: (req, res, next) => {
    console.log("post successful");
    res.json({ success: true, user: req.user });
    next();
  },

  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
};

module.exports = userController;
