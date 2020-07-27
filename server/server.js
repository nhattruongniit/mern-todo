const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// ROUTER
const TodoSchema = require("./models/todo.model");
const todoRoutes = express.Router();
app.use("/todos", todoRoutes);

todoRoutes.route("/").get(function (req, res) {
  TodoSchema.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

// mongo
mongoose.connect("mongodb://127.0.0.1:27017/todos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT, function () {
  console.log(`Server is running on Port:  ${PORT}`);
});
