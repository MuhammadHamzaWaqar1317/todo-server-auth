const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/todoUser");
const constant = require("../constant/constant");

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const secPassword = await bcrypt.hash(password, constant.salt);
    const result = await User.create({
      email,
      password: secPassword,
      todos: [],
    });
    const authToken = jwt.sign(
      { email, password: secPassword },
      constant.jwtSecret
    );
    console.log("Here Signin", result);
    res.send(authToken);
  } catch (error) {
    console.log(error);
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "Incorrect Username or Password" });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res
        .status(404)
        .send({ message: "Incorrect Username or Password" });
    }

    const authToken = jwt.sign({ email, password }, constant.jwtSecret);
    res.send({ authToken, todos: user.todos });
  } catch (error) {
    console.log(error);
  }
};

exports.addTodo = async (req, res) => {
  try {
    const email = res.locals.email;
    const todo = req.body;
    const result = await User.updateOne(
      { email },
      {
        $push: {
          todos: todo,
        },
      }
    );
    res.status(200).send({ message: "Record Created Successfully" });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

exports.getTodo = async (req, res) => {
  try {
    const email = res.locals.email;

    const result = await User.findOne({ email });
    res.status(200).send({ result, message: "Fetched Successfully" });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    console.log("in update Todo", req.body);
    const email = res.locals.email;
    const id = req.params.id;
    const updatedTodo = req.body;
    // const { id } = req.params;
    console.log(req.params.id);
    const result = await User.updateOne(
      { email, "todos.id": id },
      {
        $set: {
          "todos.$": updatedTodo,
        },
      }
    );
    res.status(200).send({ message: "Record Updated Successfully" });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

exports.removeTodo = async (req, res) => {
  try {
    const email = res.locals.email;
    const id = req.params.id;
    // const { id } = req.params;
    console.log(req.params.id);
    const result = await User.updateOne(
      { email },
      {
        $pull: {
          todos: { id },
        },
      }
    );
    console.log(result);
    res.status(200).send({ message: "Record Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};
