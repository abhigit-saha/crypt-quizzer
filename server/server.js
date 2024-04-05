const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express());
app.get("/api", (req, res) => {
  res.json({ users: ["1", "2"] });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
