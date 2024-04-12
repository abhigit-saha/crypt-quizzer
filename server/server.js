const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("./models/user");
const Schema = mongoose.Schema;
const app = express();
const bcrypt = require("bcryptjs");
const quizController = require("./controllers/quizController");
const Quiz = require("./models/quiz");
const Answer = require("./models/answer");
const userController = require("./controllers/userController");

const mongoDb =
  "mongodb+srv://abhi-auth:test1234@cluster0.mic4h.mongodb.net/crypt-quiz?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoDb);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "mongo connection error"));

//functions required for authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

//using some data to store a cookie
//passport.serializeUser takes a callback which contains the information we wish to store in the session data.

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
// Express middleware
app.use(express.json());
console.log("json used");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
console.log("sessions used");
app.use(passport.initialize());
passport.serializeUser((user, done) => {
  done(null, user.id);
});
console.log("serialized user");
//passport.deserializeUser called when retrieving a session: extract teh data we serialized, then attach something to the .user property for use in the rest of the request.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
    console.log("deserialized the user");
  } catch (err) {
    done(err);
  }
});
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes

app.post("/api/signup", userController.signup);

app.post("/api/login", passport.authenticate("local"), userController.login);

app.get("/", (req, res) => {
  res.json({ user: req.user });
  console.log();
});

app.get("/api/logout", userController.logout);

// app.post("/api/host", quizController.hostQuiz);
app.post("/api/host", quizController.host);

app.post("/api/answer", quizController.postAnswer);

app.get("/api/answer", quizController.getAnswers);

app.get("/api/quiz", quizController.getQuizzes);

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
