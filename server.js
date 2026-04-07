const express = require("express");
const app = express();
const db = require("./db");

app.use(express.json());

app.get("/", (req, res) => {
  db.query("SELECT 'Hello from MySQL!' AS message", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
