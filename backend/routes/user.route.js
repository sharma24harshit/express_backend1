const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../db");

const userRouter = express.Router();

//-------------------------------------  REGISTER page  -----------------------------------------//
userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ name, email, pass: secure_password });
        await user.save();
        res.send({ msg: "user is registered successfully" });
      }
    });
  } catch (error) {
    res.send({ msg: error, message });
  }
});
//-------------------------------------  LOGIN page  -----------------------------------------//

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign({userID:user[0]._id}, "masai");
          res.send({ msg: "Logged In successfully", token: token });
        } else {
          res.send({ msg: "Invalid Credentials" });
        }
      });
    } else {
      res.send({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    res.send({ msg: error, message });
  }
});

module.exports = { userRouter };
