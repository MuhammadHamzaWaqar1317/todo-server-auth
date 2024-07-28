const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

router.post("/add-todo", user.addTodo);
router.get("/get-todo", user.getTodo);
router.delete("/delete-todo/:id", user.removeTodo);
router.patch("/update-todo/:id", user.updateTodo);

module.exports = router;
