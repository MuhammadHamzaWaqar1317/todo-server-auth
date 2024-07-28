const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/todo")
  .then(() => console.log("Connected DB"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

app.use(
  "/authenticated",
  require("./middleware/authToken"),
  require("./routes/authenticated")
);
app.use("/unauthenticated", require("./routes/unauthenticated"));

app.listen(3000, () => console.log("server statted"));
