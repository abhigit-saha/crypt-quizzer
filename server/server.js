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
app.get("/api", (req, res) => {
  res.json({ users: ["1", "2"] });
});

app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body; // Corrected from res.body to req.body
  console.log(username, " ", password);
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log("there was an error", error);
    }
  });
});

app.post(
  "/api/login",
  passport.authenticate("local"),
  function (req, res, next) {
    console.log("post successful");
    res.json({ success: true, user: req.user });
    next();
  }
);

app.get("/", (req, res) => {
  res.json({ user: req.user });
  console.log();
});

app.get("/api/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/api");
  });
});

// app.post("/api/host", quizController.hostQuiz);
app.post("/api/host", async (req, res) => {
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
});

app.post("/api/answer", async (req, res) => {
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
});

app.get("/api/answer", async (req, res) => {
  try {
    const answers = await Answer.find().sort({ createdAt: -1 });
    res.json(answers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
app.get("/api/quiz", async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    // console.log(quizzes);
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
