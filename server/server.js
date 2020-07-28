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

// mongo
mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

todoRoutes.route("/").get(function (req, res) {
  TodoSchema.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route("/:id").get(function(req, res) {
  const id = req.params.id;
  TodoSchema.findById(id, (err, todo) => {
    res.json(todo)
  })
})

todoRoutes.route('/update/:id').post(function(req, res) {
  const id = req.params.id;
  TodoSchema.findById(id, function(err, todo) {
    if(!todo) {
      res.status(400).json('todo not found');
      return false;
    }

    todo.description = req.body.description;
    todo.responsible = req.body.responsible;
    todo.priority = req.body.priority;
    todo.completed = req.body.completed;

    todo.save().then(() => {
      res.json('Todo updated')
    }).catch(() => {
      res.status(400).send('Update not possible')
    })
  })
})


todoRoutes.route('/add').post(function (req, res) {
  const todo = new TodoSchema(req.body);
  todo.save().then(() => {
    res.status(200).json({ 'todo': 'todo added sucessfully'});
  })
  .catch(() => {
    res.status(400).send('adding new todo failed');
  })
})

app.use("/todos", todoRoutes);

app.listen(PORT, function () {
  console.log(`Server is running on Port:  ${PORT}`);
});
