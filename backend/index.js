const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { noteRouter } = require("./routes/note.route");
const {Authenticate} = require("./middleware/authenticate.middleware");
const cors = require("cors");

const app = express();
app.use(cors({
  origin:"*"
}))
app.use(express.json());

app.use("/users", userRouter);
 app.use(Authenticate)
app.use("/notes", noteRouter);

//-------------------------------------  HOME page  -----------------------------------------//
app.get("/", (req, res) => {
  res.send("Home page");
});

//-------------------------------------  SERVER  -----------------------------------------//
app.listen(4200, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("server is runnig at 4200");
});
